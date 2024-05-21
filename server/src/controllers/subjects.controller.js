import { getSubjectsByTeacherAndBatchCode } from '../repository/subjects.repository.js';
export const listSubjectsByTeacherAndBatch = async (req, res) => {
    const { batchCode } = req.body;
    if (!batchCode) {
        return res.status(400).json({ message: "Batch code is required" });
    }
    try {
        const subjects = await getSubjectsByTeacherAndBatchCode(req.user.id, batchCode);
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}