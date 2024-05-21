import pg from 'pg'
const { Pool } = pg

 
const pool;

const initDb = () => {
    if (pool)
        return pool;

    pool = new Pool({
        
    });



new Pool({
    host: 'localhost',
    user: 'database-user',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })