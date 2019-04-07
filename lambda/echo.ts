import { Handler } from 'aws-lambda';

/**
 * Echo utility to make sure the lambda is deployed
 */
export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'lambda for malcolmkee.com works' })
  };
};
