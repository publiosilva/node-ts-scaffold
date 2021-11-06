export interface DeleteModel {
  id: string
}

export interface Delete<A extends DeleteModel> {
  call(data: A): Promise<void>;
}
