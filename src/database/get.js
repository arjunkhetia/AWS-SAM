const AWS = require('aws-sdk');
const pg = require('pg');

AWS.config.update({
    region: 'ap-south-1'
});

const dbConfig = {
    user: 'postgres',
    password: '<password>',
    database: 'postgres',
    host: 'host.docker.internal',
    port: 5432
};

exports.handler = async (event) => {
    const { Client } = pg;
    const client = new Client(dbConfig);
    await client.connect();
    const res = await client.query('SELECT * FROM ' + process.env.TABLE_NAME);
    await client.end();
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify(res.rows[0]),
    };
};