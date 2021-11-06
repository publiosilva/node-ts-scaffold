import {
  dynamoDBDeleteSpy, dynamoDBGetSpy, dynamoDBPutSpy, dynamoDBScanSpy,
} from '@/spec/unit/infra/mocks';
import { CrudDynamoDBRepository } from '@/infra/repositories/crud';
import {
  CreateModelStub, CRUDModelStub, DeleteModelStub, FindByIdModelStub, UpdateModelStub,
} from '@/spec/unit/domain/mocks';

class CrudDynamoDBRepositoryStub extends CrudDynamoDBRepository
  <CreateModelStub, DeleteModelStub, FindByIdModelStub, UpdateModelStub, CRUDModelStub> { }

const makeSut = (): CrudDynamoDBRepositoryStub => new CrudDynamoDBRepositoryStub('any_table');

describe('CrudDynamoDB Repository', () => {
  describe('Create', () => {
    test('Should call put with correct values', async () => {
      const sut = makeSut();

      await sut.create({
        name: 'any_name',
      });

      expect(dynamoDBPutSpy).toHaveBeenCalledWith({
        TableName: 'any_table',
        Item: {
          id: 'any_id',
          name: 'any_name',
        },
      });
    });

    test('Should throw if put throws', async () => {
      const sut = makeSut();
      dynamoDBPutSpy.mockImplementationOnce(() => { throw new Error(); });

      const promise = sut.create({
        name: 'any_name',
      });

      await expect(promise).rejects.toThrow();
    });

    test('Should return an entity on success', async () => {
      const sut = makeSut();

      const entity = await sut.create({
        name: 'any_name',
      });

      expect(entity).toBeTruthy();
      expect(entity.id).toBe('any_id');
      expect(entity.name).toBe('any_name');
    });
  });

  describe('Find All', () => {
    test('Should call scan with correct values', async () => {
      const sut = makeSut();

      await sut.findAll();

      expect(dynamoDBScanSpy).toHaveBeenCalledWith({
        TableName: 'any_table',
      });
    });

    test('Should throw if scan throws', async () => {
      const sut = makeSut();
      dynamoDBScanSpy.mockImplementationOnce(() => { throw new Error(); });

      const promise = sut.findAll();

      await expect(promise).rejects.toThrow();
    });

    test('Should return entities on success', async () => {
      const sut = makeSut();

      const entities = await sut.findAll();

      expect(entities).toBeTruthy();
      expect(Array.isArray(entities)).toBeTruthy();
      expect(entities.length).toBe(1);
      expect(entities).toEqual([{
        id: 'any_id',
        name: 'any_name',
      }]);
    });
  });

  describe('Update', () => {
    test('Should call put with correct values', async () => {
      const sut = makeSut();

      await sut.update({
        id: 'any_id',
        name: 'any_name',
      });

      expect(dynamoDBPutSpy).toHaveBeenCalledWith({
        TableName: 'any_table',
        Item: {
          id: 'any_id',
          name: 'any_name',
        },
      });
    });

    test('Should throw if put throws', async () => {
      const sut = makeSut();
      dynamoDBPutSpy.mockImplementationOnce(() => { throw new Error(); });

      const promise = sut.update({
        id: 'any_id',
        name: 'any_name',
      });

      await expect(promise).rejects.toThrow();
    });

    test('Should return an entity on success', async () => {
      const sut = makeSut();

      const entity = await sut.update({
        id: 'any_id',
        name: 'any_name',
      });

      expect(entity).toBeTruthy();
      expect(entity.id).toBe('any_id');
      expect(entity.name).toBe('any_name');
    });
  });

  describe('Find By Id', () => {
    test('Should call get with correct values', async () => {
      const sut = makeSut();

      await sut.findById({ id: 'any_id' });

      expect(dynamoDBGetSpy).toHaveBeenCalledWith({
        TableName: 'any_table',
        Key: { id: 'any_id' },
      });
    });

    test('Should throw if get throws', async () => {
      const sut = makeSut();
      dynamoDBGetSpy.mockImplementationOnce(() => { throw new Error(); });

      const promise = sut.findById({ id: 'any_id' });

      await expect(promise).rejects.toThrow();
    });

    test('Should return entity on success', async () => {
      const sut = makeSut();

      const entity = await sut.findById({ id: 'any_id' });

      expect(entity).toBeTruthy();
      expect(entity).toEqual({
        id: 'any_id',
        name: 'any_name',
      });
    });

    test('Should return null if entity not found', async () => {
      const sut = makeSut();
      dynamoDBGetSpy.mockImplementationOnce(() => ({
        promise: jest.fn(() => new Promise((resolve) => resolve({}))),
      }));

      const entity = await sut.findById({ id: 'any_id' });

      expect(entity).toBe(null);
    });
  });

  describe('Delete', () => {
    test('Should call delete with correct values', async () => {
      const sut = makeSut();

      await sut.delete({ id: 'any_id' });

      expect(dynamoDBDeleteSpy).toHaveBeenCalledWith({
        TableName: 'any_table',
        Key: { id: 'any_id' },
      });
    });

    test('Should throw if get throws', async () => {
      const sut = makeSut();
      dynamoDBDeleteSpy.mockImplementationOnce(() => { throw new Error(); });

      const promise = sut.delete({ id: 'any_id' });

      await expect(promise).rejects.toThrow();
    });
  });
});
