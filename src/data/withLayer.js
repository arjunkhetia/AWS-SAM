const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: 'ap-south-1'
});

exports.handler = async (event) => {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({
            uuid: uuidv4(),
            message: '😃 Hello from UUID Layer!'
        }),
    };
};