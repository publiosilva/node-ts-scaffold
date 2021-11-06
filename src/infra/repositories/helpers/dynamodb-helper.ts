import AWS from 'aws-sdk';

export const createDocumentClient = (options: Object = {}) => {
  const config = {
    ...options,
    region: 'us-east-1',
  };

  return new AWS.DynamoDB.DocumentClient(config);
};
