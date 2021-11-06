import { dynamoDBDocumentClientMock } from '@/spec/unit/infra/mocks';
import { createDocumentClient } from '@/infra/repositories/helpers';

describe('DynamoDB Helper', () => {
  test('Should create instance with correct options', () => {
    createDocumentClient({
      anyOption: 'anyValue',
    });

    expect(dynamoDBDocumentClientMock).toHaveBeenCalledWith({
      anyOption: 'anyValue',
      region: 'us-east-1',
    });
  });
});
