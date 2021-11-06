const BODY = Symbol('body');
const HEADERS = Symbol('headers');
const METHOD = Symbol('method');
const PARAMS = Symbol('params');
const QUERY_PARAMS = Symbol('queryParams');
const PATH = Symbol('path');
const IS_BASE64_ENCODED = Symbol('isBase64Encoded');
const REQUEST_ORIGIN = Symbol('requestOrigin');

export enum AWSHttpHandlerRequestOrigin {
  'AWS_API_GATEWAY',
  'AWS_ELASTIC_LOAD_BALANCING',
  'UNKNOWN',
}

export class AWSHttpHandlerRequest {
  private readonly [BODY]: any;

  private readonly [HEADERS]: Map<string, string>;

  private readonly [METHOD]: string;

  private readonly [PARAMS]: Map<string, string>;

  private readonly [PATH]: string;

  private readonly [IS_BASE64_ENCODED]: boolean;

  private readonly [REQUEST_ORIGIN]: AWSHttpHandlerRequestOrigin;

  constructor(
    method: string,
    path: string,
    body: any,
    headers: Map<string, string>,
    params: Map<string, string>,
    queryParams: Map<string, string>,
    requestOrigin: AWSHttpHandlerRequestOrigin = AWSHttpHandlerRequestOrigin.UNKNOWN,
    isBase64Encoded: boolean = false,
  ) {
    AWSHttpHandlerRequest.validateMethod(method);

    this[BODY] = body;
    this[HEADERS] = headers;
    this[METHOD] = method;
    this[PARAMS] = params;
    this[QUERY_PARAMS] = queryParams;
    this[PATH] = path;
    this[IS_BASE64_ENCODED] = isBase64Encoded;
    this[REQUEST_ORIGIN] = requestOrigin;
  }

  get body(): any {
    return this[BODY];
  }

  get bodyParsed() {
    const { body } = this;

    if (body && this.isJson) {
      return JSON.parse(body);
    }

    return body;
  }

  get headers(): Map<string, string> {
    return this[HEADERS];
  }

  get method(): string {
    return this[METHOD];
  }

  get params(): Map<string, string> {
    return this[PARAMS];
  }

  get queryParams(): Map<string, string> {
    return this[QUERY_PARAMS];
  }

  get path(): string {
    return this[PATH];
  }

  get isBase64Encoded(): boolean {
    return this[IS_BASE64_ENCODED];
  }

  get requestOrigin(): AWSHttpHandlerRequestOrigin {
    return this[REQUEST_ORIGIN];
  }

  get isJson() {
    const contentType = this.headers?.get('content-type');

    return contentType?.includes('application/json');
  }

  private static validateMethod(method: string): void {
    if (!['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      throw new Error('Invalid http method');
    }
  }

  private static validateEvent(event: any) {
    try {
      if (!event) throw Error();

      const {
        httpMethod: method,
        path,
        headers,
      } = event;

      AWSHttpHandlerRequest.validateMethod(method);

      const pathIsValid = !!path;
      const headersIsValid = !!headers && headers instanceof Object;

      if ([pathIsValid, headersIsValid].some((isValid) => !isValid)) {
        throw new Error();
      }
    } catch (error) {
      throw new Error('Invalid event');
    }
  }

  static fromEvent(event: any): AWSHttpHandlerRequest {
    AWSHttpHandlerRequest.validateEvent(event);

    const {
      httpMethod: method,
      path,
      queryStringParameters: queryParams,
      headers,
      isBase64Encoded,
      requestContext,
      body,
    } = event;
    const requestOrigin = AWSHttpHandlerRequest.getRequestOrigin(requestContext);
    const formattedHeaders = new Map<string, string>(
      Object
        .entries(headers)
        .map(([key, value]) => [String(key).toLowerCase(), String(value)]),
    );
    const formattedParams = new Map<string, string>();

    const formattedQueryParams = new Map<string, string>(Object.entries(queryParams || {}));
    const formattedBody = AWSHttpHandlerRequest.formatBody(body, isBase64Encoded);

    return new AWSHttpHandlerRequest(
      method,
      path,
      formattedBody,
      formattedHeaders,
      formattedParams,
      formattedQueryParams,
      requestOrigin,
      isBase64Encoded,
    );
  }

  private static getRequestOrigin(requestContext: any): AWSHttpHandlerRequestOrigin {
    const isElbEvent = requestContext && requestContext.elb;
    const isApiGatewayEvent = requestContext && requestContext.apiId;

    if (isElbEvent) return AWSHttpHandlerRequestOrigin.AWS_ELASTIC_LOAD_BALANCING;

    if (isApiGatewayEvent) return AWSHttpHandlerRequestOrigin.AWS_API_GATEWAY;

    return AWSHttpHandlerRequestOrigin.UNKNOWN;
  }

  private static formatBody(body: any, isBase64Encoded: boolean): Buffer {
    if (!body) return null;

    return Buffer.from(body, isBase64Encoded ? 'base64' : 'utf8');
  }
}
