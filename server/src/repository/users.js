import { getPool } from '../db/postgres.js'

export const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    const { rows } = await getPool().query(query, values);
    if (rows.length) {
        return rows[0];
    } else {
        return null;
    }
}

export const isUserExists = async (email) => {
    return await getUserByEmail(email) !== null;
}

export const findUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    const { rows } = await getPool().query(query, values);
    if (rows.length) {
        return rows[0];
    } else {
        return null;
    }
}

export const createUser = async (userData) => {
    const query = 'INSERT INTO users (name, email, phone, password, role, email_verified, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [userData.name, userData.email, userData.phone, userData.password, userData.role, userData.emailVerified, userData.status];

    const { rows } = await getPool().query(query, values);
    return rows[0];
}
