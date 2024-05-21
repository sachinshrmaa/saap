import pg from 'pg'
const { Pool } = pg

 
let pool;

const getPool = () => {
    if (pool)
        return pool;

    pool = new Pool({
        host: 'localhost',
        user: 'sachin',
        password: 'root123',
        database: 'majorDB',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });
    pool = pool;
    return pool;
}

const getClient = async () => {
    return await getPool().connect();
}

export { getPool, getClient }

