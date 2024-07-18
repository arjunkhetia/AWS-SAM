const AWS = require('aws-sdk');
const middy = require('middy');
const { jsonBodyParser, validator, httpErrorHandler } = require('middy/middlewares');

AWS.config.update({
    region: 'ap-south-1'
});

const inputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        },
        required: ['name']
      }
    }
};

const lambdaHandler = async (event) => {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({ body: event.body }),
    };
};

exports.handler = middy(lambdaHandler)
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(httpErrorHandler())
    .use({
        onError: (handler) => {
            handler.response = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 500,
                body: JSON.stringify({ Error: handler.error }),
            };
            return Promise.resolve(handler);
        }
    });