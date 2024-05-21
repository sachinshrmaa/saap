import { getClient, getPool } from "../db/postgres.js";

export const addStudent = async (studentData) => {
    const client = await getClient();
    try {
        // Begin a transaction
        client.query('BEGIN');
        
        // Insert user data
        let query = 'INSERT INTO users (name, email, phone, password, role, email_verified, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        let values = [studentData.name, studentData.email, studentData.phone, studentData.password, studentData.role, studentData.emailVerified, studentData.status];
        const user = await client.query(query, values);
       
        // Insert student data
        query = 'INSERT INTO students(roll_number, user_id, gender, batch_code) VALUES ($1, $2, $3, $4) RETURNING *';
        values = [studentData.rollNumber, user.rows[0].id, studentData.gender, studentData.batchCode];
        const student = await client.query(query, values);
       
        // Commit the transaction
        client.query('COMMIT');
       
        return {...user.rows[0], ...student.rows[0]}
    } catch (error) {
        // If any error occurs, rollback the transaction
        client.query('ROLLBACK');
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export const getStudentPresentRollNumbersByBatchCode = async (batchCode, absentStudents) => {
    let query = `SELECT roll_number FROM students WHERE batch_code = $1 and roll_number NOT IN (`;
    for (let i = 0; i < absentStudents.length; i++) {
        query += `'${absentStudents[i]}',`;
    }
    query = query.slice(0, -1);
    query += ')';
    console.log("Query:", query);
    const { rows } = await getPool().query(query, [batchCode]);
    return rows.map(row => row.roll_number);
}

export const getStudentsByBatchCode = async (batchCode) => {
    const query = `select u."id", u."name", s.roll_number from students s inner join users u on u.id = s.user_id where s.batch_code ilike $1`;
    const { rows } = await getPool().query(query, [batchCode]);
    return rows;
}