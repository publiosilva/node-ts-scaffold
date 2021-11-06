import { URL } from 'url';

export function generateEvent(
  httpMethod: string,
  path: string,
  body: any = null,
  headers: Map<string, string>,
  isBase64Encoded: boolean = false,
): any {
  const { pathname, searchParams } = new URL(path);
  const queryStringParameters = Object.fromEntries(searchParams.entries());

  return {
    requestContext: {
      elb: {
        targetGroupArn: 'any_target_group_arn',
      },
    },
    httpMethod,
    path: pathname,
    queryStringParameters,
    headers: Object.fromEntries(headers),
    body,
    isBase64Encoded,
  };
}
