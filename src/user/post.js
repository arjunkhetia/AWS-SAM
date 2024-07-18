const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-south-1'
});

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        return {
            headers: {'Access-Control-Allow-Origin': '*'},
            statusCode: 200,
            body: JSON.stringify(body),
        };
    } catch (error) {
        console.error(error);
        return {
            headers: {'Access-Control-Allow-Origin': '*'},
            statusCode: 500,
            body: JSON.stringify({ error: '🚧 Internal server error' }),
        };
    }
};