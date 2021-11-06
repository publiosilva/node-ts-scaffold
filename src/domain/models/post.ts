import { CRUDModel } from './crud';

export interface PostModel extends CRUDModel {
  subject: string
  body: string
}
