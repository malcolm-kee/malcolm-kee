import { APIGatewayEvent, Handler } from 'aws-lambda';
import { sendMessage } from './integration/telegram';

function getBody(event: APIGatewayEvent) {
  try {
    return event.body && JSON.parse(event.body);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Call when the site deployment fails
 */
export const handler: Handler = async (event: APIGatewayEvent) => {
  const body = getBody(event);
  const commitUrl = body && body.payload && body.payload.commit_url;

  try {
    await sendMessage(
      `*Deploy Failure*
      [malcolmkee.com](https://malcolmkee.com) having problem to deploy!
      ${commitUrl ? `[Commit that causing the problem](${commitUrl})` : ''}`,
      {
        format: 'Markdown',
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Deploy Fail!' }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: e }),
    };
  }
};
