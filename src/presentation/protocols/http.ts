export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  params?: Map<string, string>
  queryParams?: Map<string, string>
  body?: any
}
