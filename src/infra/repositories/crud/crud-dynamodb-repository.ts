import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateRepository, DeleteRepository, FindAllRepository, FindByIdRepository, UpdateRepository,
} from '@/data/protocols/crud';
import { CRUDModel } from '@/domain/models';
import {
  CreateModel, DeleteModel, FindByIdModel, UpdateModel,
} from '@/domain/usecases/crud';
import { createDocumentClient } from '@/infra/repositories/helpers';

export class CrudDynamoDBRepository
  <
  A extends CreateModel,
  B extends DeleteModel,
  C extends FindByIdModel,
  D extends UpdateModel,
  E extends CRUDModel,
  > implements
  CreateRepository<A, E>,
  DeleteRepository<B>,
  FindAllRepository<E>,
  FindByIdRepository<C, E>,
  UpdateRepository<D, E> {
  protected readonly documentClient: DocumentClient;

  protected readonly tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.documentClient = createDocumentClient();
  }

  async update(data: D): Promise<E> {
    const params = {
      TableName: this.tableName,
      Item: data,
    };
    await this.documentClient.put(params).promise();

    return this.castAnyToE(data);
  }

  async findById(data: C): Promise<E> {
    const { id } = data;
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const { Item } = await this.documentClient.get(params).promise();

    if (!Item) return null;

    return this.castAnyToE(Item);
  }

  async findAll(): Promise<E[]> {
    const params = {
      TableName: this.tableName,
    };
    const { Items } = await this.documentClient.scan(params).promise();

    return Items.map((value) => this.castAnyToE(value));
  }

  async delete(data: B): Promise<void> {
    const { id } = data;
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    await this.documentClient.delete(params).promise();
  }

  async create(data: A): Promise<E> {
    const entity = {
      id: uuidv4(),
      ...data,
    };
    const params = {
      TableName: this.tableName,
      Item: entity,
    };
    await this.documentClient.put(params).promise();

    return this.castAnyToE(entity);
  }

  protected castAnyToE(data: any): E {
    return <E>data;
  }
}
