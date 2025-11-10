import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'jonas',
    password: '1234',
    database: 'registros'
});

export { connection };
