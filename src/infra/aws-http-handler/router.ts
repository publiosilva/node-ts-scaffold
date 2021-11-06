import { AWSHttpHandlerRequest } from './request';

const ROUTES = Symbol('routes');
const PREFIX = Symbol('prefix');

export interface AWSHttpHandlerRoute {
  get path(): string;

  get params(): Map<string, string>;

  get handler(): AWSHttpHandlerAction;
}

export interface AWSHttpHandlerActionParams {
  context: Map<string, any>;

  request: AWSHttpHandlerRequest;
}

export type AWSHttpHandlerAction = (params: AWSHttpHandlerActionParams) => any;

export class AWSHttpHandlerRouter {
  private readonly [ROUTES]: Map<string, Map<string, AWSHttpHandlerAction>>;

  private readonly [PREFIX]: string;

  constructor(prefix: string = '') {
    this[ROUTES] = new Map();
    this[PREFIX] = prefix;
  }

  get routes(): Map<string, Map<string, AWSHttpHandlerAction>> {
    return this[ROUTES];
  }

  get prefix(): string {
    return this[PREFIX];
  }

  private normalizePath(path: string): string {
    const trimed = `${this.prefix}${path.trim()}`;

    if (trimed.endsWith('/') && trimed.length > 1) {
      return trimed.substring(0, trimed.length - 1);
    }

    return trimed;
  }

  private registerAction(path: string, method: string, action: AWSHttpHandlerAction): void {
    const normalizedPath = this.normalizePath(path);
    const resource = this.routes.has(normalizedPath)
      ? this.routes.get(normalizedPath)
      : this.routes.set(normalizedPath, new Map()).get(normalizedPath);

    resource.set(method, action);
  }

  private compilePath(path: string): RegExp {
    const sanitizedPath = path.replace(/{(.*?)}/gi, '(?<$1>[^/]+?)');
    const regex = `^${sanitizedPath}(?:/)?$`;

    return new RegExp(regex);
  }

  private matchPath(path: string) {
    const paths = Array.from(this.routes.keys());

    return paths
      .map((resource) => {
        const regexp = this.compilePath(resource);
        const match = regexp.exec(path);

        if (!match) return null;

        const params = new Map(Object.entries(match.groups || {}));

        return {
          resource,
          path,
          params,
        };
      })
      .filter((matched) => matched)
      .shift();
  }

  get(path: string, action: AWSHttpHandlerAction): void {
    this.registerAction(path, 'GET', action);
  }

  post(path: string, action: AWSHttpHandlerAction): void {
    this.registerAction(path, 'POST', action);
  }

  put(path: string, action: AWSHttpHandlerAction): void {
    this.registerAction(path, 'PUT', action);
  }

  patch(path: string, action: AWSHttpHandlerAction): void {
    this.registerAction(path, 'PATCH', action);
  }

  delete(path: string, action: AWSHttpHandlerAction): void {
    this.registerAction(path, 'DELETE', action);
  }

  matchRoute(method: string, url: string): AWSHttpHandlerRoute {
    const matched = this.matchPath(url);

    if (!matched) return null;

    const { resource } = matched;
    const { routes } = this;
    const methods = routes.get(resource);
    const handler = methods.get(method);

    if (!handler) return null;

    return {
      handler,
      ...matched,
    };
  }
}
