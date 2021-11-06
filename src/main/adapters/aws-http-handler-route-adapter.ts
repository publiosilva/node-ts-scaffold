import { AWSHttpHandlerAction, AWSHttpHandlerActionParams, AWSHttpHandlerResponse } from '@/infra/aws-http-handler';
import { Controller, HttpRequest } from '@/presentation/protocols';

export function adaptRoute(controller: Controller): AWSHttpHandlerAction {
  return async (params: AWSHttpHandlerActionParams) => {
    const { request } = params;
    const httpRequest: HttpRequest = {
      body: request.bodyParsed,
      params: request.params,
      queryParams: request.queryParams,
    };
    const httpResponse = await controller.handle(httpRequest);

    return new AWSHttpHandlerResponse(httpResponse.statusCode, httpResponse.body);
  };
}
