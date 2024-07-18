const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-south-1'
});

exports.handler = async (event) => {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({message: '😃 Hello from Get User!'}),
    };
};