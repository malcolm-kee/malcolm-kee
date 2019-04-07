import { APIGatewayEvent, Handler } from 'aws-lambda';
import { sendMessage } from './integration/telegram';

/**
 * Call when the site deployment succeeds
 */
export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const response = await sendMessage(
      'malcolmkee.com has been deployed successfully!'
    );

    console.log({ response, eventBody: event.body && JSON.parse(event.body) });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Deploy Successful!' })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: e })
    };
  }
};
