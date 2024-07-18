const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

AWS.config.update({
    region: 'ap-south-1'
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

exports.handler = async (event) => {
    const body = await parser.parse(event);
    const files = body.files;
    var response = [];
    await asyncForEach(files, async (file) => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: file.filename,
            Body: file.content
        };
        var s3response = await s3.putObject(params).promise();
        if (response) {
            response.push(s3response);
        }
    });
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify(response),
    };
};