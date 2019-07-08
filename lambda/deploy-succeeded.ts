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
 * Call when the site deployment succeeds
 */
export const handler: Handler = async (event: APIGatewayEvent) => {
  const body = getBody(event);
  const commitUrl = body && body.payload && body.payload.commit_url;
  console.log('===body===');
  console.log(body);
  console.log('===body===');

  try {
    await sendMessage(
      `*Deploy Success*
      [malcolmkee.com](https://malcolmkee.com) has been deployed successfully!
      [Commit that triggers the deploy](${commitUrl})
      `,
      {
        format: 'Markdown'
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Deploy Successful!' })
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: e })
    };
  }
};
