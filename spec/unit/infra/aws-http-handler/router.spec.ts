import { AWSHttpHandlerRouter } from '@/infra/aws-http-handler/router';

describe('AWSHttpHandlerRouter', () => {
  test('should register a get route', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};

    router.get('/any_path', action);

    expect(router.routes.has('/any_prefix/any_path')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').has('GET')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').get('GET')).toBe(action);
  });

  test('should register a post route', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};

    router.post('/any_path', action);

    expect(router.routes.has('/any_prefix/any_path')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').has('POST')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').get('POST')).toBe(action);
  });

  test('should register a put route', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};

    router.put('/any_path', action);

    expect(router.routes.has('/any_prefix/any_path')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').has('PUT')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').get('PUT')).toBe(action);
  });

  test('should register a patch route', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};

    router.patch('/any_path', action);

    expect(router.routes.has('/any_prefix/any_path')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').has('PATCH')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').get('PATCH')).toBe(action);
  });

  test('should register a delete route', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};

    router.delete('/any_path', action);

    expect(router.routes.has('/any_prefix/any_path')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').has('DELETE')).toBeTruthy();
    expect(router.routes.get('/any_prefix/any_path').get('DELETE')).toBe(action);
  });

  test('should register a root route correctly', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};

    router.get('/', action);

    expect(router.routes.has('/any_prefix')).toBeTruthy();
    expect(router.routes.get('/any_prefix').has('GET')).toBeTruthy();
    expect(router.routes.get('/any_prefix').get('GET')).toBe(action);
  });

  test('should match route', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action = () => {};
    router.get('/any_path', action);

    const matchedRoute = router.matchRoute('GET', '/any_prefix/any_path');

    expect(matchedRoute).toBeTruthy();
    expect(matchedRoute.handler).toBe(action);
    expect(matchedRoute.path).toBe('/any_prefix/any_path');
    expect(Array.from(matchedRoute.params.entries())).toEqual([]);
  });

  test('should match route with params', () => {
    const router = new AWSHttpHandlerRouter();
    const action = () => {};
    router.get('/any_path/{param}', action);

    const matchedRoute = router.matchRoute('GET', '/any_path/1');

    expect(matchedRoute).toBeTruthy();
    expect(matchedRoute.handler).toBe(action);
    expect(matchedRoute.path).toBe('/any_path/1');
    expect(Array.from(matchedRoute.params.entries())).toEqual([['param', '1']]);
  });

  test('should match route with multiple methods', () => {
    const router = new AWSHttpHandlerRouter('/any_prefix');
    const action1 = () => {};
    router.get('/any_path', action1);
    const action2 = () => {};
    router.post('/any_path', action2);

    const matchedRoute = router.matchRoute('GET', '/any_prefix/any_path');

    expect(matchedRoute).toBeTruthy();
    expect(matchedRoute.handler).toBe(action1);
    expect(matchedRoute.path).toBe('/any_prefix/any_path');
    expect(Array.from(matchedRoute.params.entries())).toEqual([]);
  });

  test('should return null if no matching route is found', () => {
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', () => {});

    const matchedRoute = router.matchRoute('GET', '/some_path');

    expect(matchedRoute).toBe(null);
  });

  test('should return null if the corresponding route does not have the specified method', () => {
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', () => {});

    const matchedRoute = router.matchRoute('POST', '/any_path');

    expect(matchedRoute).toBe(null);
  });
});
