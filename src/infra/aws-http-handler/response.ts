const BODY = Symbol('body');
const HEADERS = Symbol('headers');
const STATUS_CODE = Symbol('statusCode');
const IS_BASE64_ENCODED = Symbol('isBase64Encoded');

export class AWSHttpHandlerResponse {
  private readonly [BODY]: any;

  private readonly [HEADERS]: Map<string, string>;

  private readonly [STATUS_CODE]: number;

  private readonly [IS_BASE64_ENCODED]: boolean;

  constructor(
    statusCode: number,
    body: any,
    headers: Map<string, string> = new Map(),
    isBase64Encoded: boolean = false,
  ) {
    this[BODY] = body;
    this[HEADERS] = new Map(
      [
        ['content-type', 'application/json'],
        ['access-control-allow-origin', '*'],
        ...(headers?.entries() || []),
      ],
    );
    this[STATUS_CODE] = statusCode;
    this[IS_BASE64_ENCODED] = isBase64Encoded;
  }

  get body(): any {
    const body = this[BODY];

    if (this.isBase64Encoded && body instanceof Buffer) return body.toString('base64');

    if (this.isJson) return body ? JSON.stringify(body) : null;

    return body instanceof Buffer ? body.toString('utf8') : body;
  }

  get headers(): Map<string, string> {
    return this[HEADERS];
  }

  get statusCode(): number {
    return this[STATUS_CODE];
  }

  get isBase64Encoded(): boolean {
    return this[IS_BASE64_ENCODED];
  }

  get isJson() {
    const contentType = this.headers.get('content-type');

    return contentType === 'application/json';
  }

  toEvent(): any {
    const {
      statusCode, body, headers, isBase64Encoded,
    } = this;

    return {
      statusCode,
      body,
      headers: Object.fromEntries(headers.entries()),
      isBase64Encoded,
    };
  }
}
