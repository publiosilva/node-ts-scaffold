import {
  dynamoDBDeleteSpy, dynamoDBGetSpy, dynamoDBPutSpy, dynamoDBScanSpy,
} from '@/spec/unit/infra/mocks';
import { handle } from '@/main/handler';
import { generateEvent, generateUrl } from '@/spec/util';

describe('/posts', () => {
  const apiKey = process.env.API_KEY;
  const fakeItem = {
    id: 'any_id',
    subject: 'any_subject',
    body: 'any_body',
  };

  beforeAll(() => {
    dynamoDBPutSpy.mockImplementation(() => ({
      promise: jest.fn(() => new Promise((resolve) => resolve({
        Items: [fakeItem],
      }))),
    }));
    dynamoDBScanSpy.mockImplementation(() => ({
      promise: jest.fn(() => new Promise((resolve) => resolve({
        Items: [fakeItem],
      }))),
    }));
    dynamoDBGetSpy.mockImplementation(() => ({
      promise: jest.fn(() => new Promise((resolve) => resolve({
        Item: fakeItem,
      }))),
    }));
    dynamoDBDeleteSpy.mockImplementation(() => ({
      promise: jest.fn(() => new Promise((resolve) => resolve({
        Item: fakeItem,
      }))),
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create Post', () => {
    test('should create a post', async () => {
      const post = fakeItem;
      const event = generateEvent(
        'POST',
        generateUrl('/posts'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(201);
      expect(response.body).toBe('{"id":"any_id","subject":"any_subject","body":"any_body"}');
      expect(dynamoDBPutSpy).toHaveBeenCalledWith({
        TableName: process.env.POSTS_TABLE_NAME,
        Item: fakeItem,
      });
    });

    test('Should return 422 if there is missing params', async () => {
      const post = {
        ...fakeItem,
        subject: null,
      };
      const event = generateEvent(
        'POST',
        generateUrl('/posts'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(422);
      expect(response.body).toBe('{"name":"MissingParamError","message":"Missing param: subject"}');
    });

    test('Should return 500 if an unexpected error occurs', async () => {
      dynamoDBPutSpy.mockImplementationOnce(() => {
        throw new Error();
      });

      const post = fakeItem;
      const event = generateEvent(
        'POST',
        generateUrl('/posts'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
    });
  });

  describe('Find All Posts', () => {
    test('Should list posts', async () => {
      const event = generateEvent(
        'GET',
        generateUrl('/posts'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('[{"id":"any_id","subject":"any_subject","body":"any_body"}]');
      expect(dynamoDBScanSpy).toHaveBeenCalledWith({
        TableName: process.env.POSTS_TABLE_NAME,
      });
    });

    test('Should return 500 if an unexpected error occurs', async () => {
      dynamoDBScanSpy.mockImplementationOnce(() => {
        throw new Error();
      });

      const event = generateEvent(
        'GET',
        generateUrl('/posts'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
    });
  });

  describe('Update Post', () => {
    test('should update a post', async () => {
      const post = fakeItem;
      const event = generateEvent(
        'PUT',
        generateUrl('/posts/any_id'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('{"id":"any_id","subject":"any_subject","body":"any_body"}');
      expect(dynamoDBPutSpy).toHaveBeenCalledWith({
        TableName: process.env.POSTS_TABLE_NAME,
        Item: fakeItem,
      });
    });

    test('Should return 404 if post not found', async () => {
      dynamoDBGetSpy.mockImplementationOnce(() => ({
        promise: jest.fn(() => new Promise((resolve) => resolve({}))),
      }));

      const post = fakeItem;
      const event = generateEvent(
        'PUT',
        generateUrl('/posts/any_id'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(404);
      expect(response.body).toBe('{"name":"NotFoundError","message":"Entity not found"}');
    });

    test('Should return 422 if there is missing params', async () => {
      const post = {
        ...fakeItem,
        subject: null,
      };
      const event = generateEvent(
        'PUT',
        generateUrl('/posts/any_id'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(422);
      expect(response.body).toBe('{"name":"MissingParamError","message":"Missing param: subject"}');
    });

    test('Should return 500 if an unexpected error occurs', async () => {
      dynamoDBPutSpy.mockImplementationOnce(() => {
        throw new Error();
      });

      const post = fakeItem;
      const event = generateEvent(
        'PUT',
        generateUrl('/posts/any_id'),
        JSON.stringify(post),
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
    });
  });

  describe('Get Post By Id', () => {
    test('Should get post by id', async () => {
      const event = generateEvent(
        'GET',
        generateUrl('/posts/any_id'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('{"id":"any_id","subject":"any_subject","body":"any_body"}');
      expect(dynamoDBGetSpy).toHaveBeenCalledWith({
        TableName: process.env.POSTS_TABLE_NAME,
        Key: { id: 'any_id' },
      });
    });

    test('Should return 404 if post not found', async () => {
      dynamoDBGetSpy.mockImplementationOnce(() => ({
        promise: jest.fn(() => new Promise((resolve) => resolve({}))),
      }));

      const event = generateEvent(
        'GET',
        generateUrl('/posts/any_id'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(404);
      expect(response.body).toBe('{"name":"NotFoundError","message":"Entity not found"}');
    });

    test('Should return 500 if an unexpected error occurs', async () => {
      dynamoDBGetSpy.mockImplementationOnce(() => {
        throw new Error();
      });

      const event = generateEvent(
        'GET',
        generateUrl('/posts/any_id'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
    });
  });

  describe('Delete Post', () => {
    test('should delete a post', async () => {
      const event = generateEvent(
        'DELETE',
        generateUrl('/posts/any_id'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(204);
      expect(response.body).toBe(null);
      expect(dynamoDBDeleteSpy).toHaveBeenCalledWith({
        TableName: process.env.POSTS_TABLE_NAME,
        Key: {
          id: 'any_id',
        },
      });
    });

    test('Should return 404 if post not found', async () => {
      dynamoDBGetSpy.mockImplementationOnce(() => ({
        promise: jest.fn(() => new Promise((resolve) => resolve({}))),
      }));

      const event = generateEvent(
        'DELETE',
        generateUrl('/posts/any_id'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(404);
      expect(response.body).toBe('{"name":"NotFoundError","message":"Entity not found"}');
    });

    test('Should return 500 if an unexpected error occurs', async () => {
      dynamoDBDeleteSpy.mockImplementationOnce(() => {
        throw new Error();
      });

      const event = generateEvent(
        'DELETE',
        generateUrl('/posts/any_id'),
        null,
        new Map(
          [
            ['x-api-key', apiKey],
            ['content-type', 'application/json'],
          ],
        ),
      );

      const response = await handle(event);

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
    });
  });
});
