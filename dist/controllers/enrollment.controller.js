import { AppDataSource } from "../data-source.js";
import { enrollment } from "../entity/Enrollment.js";
import { student } from "../entity/Student.js";
import { course } from "../entity/Course.js";
const enrollmentRepo = AppDataSource.getRepository(enrollment);
const studentRepo = AppDataSource.getRepository(student);
const courseRepo = AppDataSource.getRepository(course);
// Enroll student
export const enrollStudent = async (req, res, next) => {
    try {
        const { student_id, course_id } = req.body;
        const studentEntity = await studentRepo.findOneBy({ id: Number(student_id) });
        const courseEntity = await courseRepo.findOneBy({ id: Number(course_id) });
        if (!studentEntity || !courseEntity)
            throw { statusCode: 404, message: "Student or course not found" };
        const newEnroll = enrollmentRepo.create({ student: studentEntity, course: courseEntity });
        await enrollmentRepo.save(newEnroll);
        res.status(201).json({ success: true, data: newEnroll });
    }
    catch (err) {
        next(err);
    }
};
// Remove student from course
export const removeEnrollment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const enrollmentEntity = await enrollmentRepo.findOneBy({ id: Number(id) });
        if (!enrollmentEntity)
            throw { statusCode: 404, message: "Enrollment not found" };
        await enrollmentRepo.remove(enrollmentEntity);
        res.json({ success: true, message: "Enrollment removed" });
    }
    catch (err) {
        next(err);
    }
};
// List enrollments
export const getEnrollments = async (_req, res, next) => {
    try {
        const enrollments = await enrollmentRepo.find({ relations: ["student", "course"] });
        res.json({ success: true, data: enrollments });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=enrollment.controller.js.map