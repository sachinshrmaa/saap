import { getPool } from "../db/postgres.js"
export const getSubjectsByTeacherAndBatchCode = async (teacherId, batchCode) => {
    const query = `select s.* from subjects s inner join subject_teacher_mapping stm on stm.subject_code = s.subject_code where stm.batch_code ilike $1 and stm.teacher_id = $2;`
    const values = [batchCode, teacherId];
    const { rows } = await getPool().query(query, values);
    return rows;
}