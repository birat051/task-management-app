import {Pool} from 'pg'

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_NAME,
    idleTimeoutMillis: 30000, 
    max: 3
});

// client.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL database');
//     // Execute SQL queries here
//   })
//   .catch((err) => {
//     console.error('Error connecting to PostgreSQL database', err);
// });

export {pool}