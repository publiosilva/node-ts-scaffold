export const dynamoDBPutSpy = jest.fn(() => ({
  promise: jest.fn(() => new Promise((resolve) => resolve({
    Items: [{
      id: 'any_id',
      name: 'any_name',
    }],
  }))),
}));

export const dynamoDBScanSpy = jest.fn(() => ({
  promise: jest.fn(() => new Promise((resolve) => resolve({
    Items: [{
      id: 'any_id',
      name: 'any_name',
    }],
  }))),
}));

export const dynamoDBGetSpy = jest.fn(() => ({
  promise: jest.fn(() => new Promise((resolve) => resolve({
    Item: {
      id: 'any_id',
      name: 'any_name',
    },
  }))),
}));

export const dynamoDBDeleteSpy = jest.fn(() => ({
  promise: jest.fn(() => new Promise((resolve) => resolve({
    Item: {
      id: 'any_id',
      name: 'any_name',
    },
  }))),
}));

export const dynamoDBQuerySpy = jest.fn(() => ({
  promise: jest.fn(() => new Promise((resolve) => resolve({
    Items: [{
      id: 'any_id',
      name: 'any_name',
    }],
  }))),
}));

export const dynamoDBDocumentClientMock = jest.fn().mockImplementation(() => ({
  put: dynamoDBPutSpy,
  scan: dynamoDBScanSpy,
  get: dynamoDBGetSpy,
  delete: dynamoDBDeleteSpy,
  query: dynamoDBQuerySpy,
}));

export const dynamoDBMock = {
  DocumentClient: dynamoDBDocumentClientMock,
};

jest.mock('aws-sdk', () => ({
  DynamoDB: dynamoDBMock,
}));
