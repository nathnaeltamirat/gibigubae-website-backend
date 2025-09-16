import { AppDataSource } from "../data-source.js";
import { course } from "../entity/Course.js";
const courseRepo = AppDataSource.getRepository(course);
// Create course
export const createCourse = async (req, res, next) => {
    try {
        const { course_name, description, start_date, end_date, enrollment_start_date, enrollment_deadline, } = req.body;
        if (!course_name || !description || !start_date || !end_date || !enrollment_start_date || !enrollment_deadline) {
            throw { statusCode: 400, message: "All fields are required" };
        }
        const newCourse = courseRepo.create({
            course_name,
            description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            enrollment_start_date: new Date(enrollment_start_date),
            enrollment_deadline: new Date(enrollment_deadline),
        });
        await courseRepo.save(newCourse);
        res.status(201).json({ success: true, data: newCourse });
    }
    catch (err) {
        next(err);
    }
};
// Get all courses
export const getCourses = async (_req, res, next) => {
    try {
        const courses = await courseRepo.find();
        res.json({ success: true, data: courses });
    }
    catch (err) {
        next(err);
    }
};
// Update course
export const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { course_name, description, start_date, end_date, enrollment_start_date, enrollment_deadline } = req.body;
        const courseEntity = await courseRepo.findOneBy({ id: Number(id) });
        if (!courseEntity)
            throw { statusCode: 404, message: "Course not found" };
        courseEntity.course_name = course_name ?? courseEntity.course_name;
        courseEntity.description = description ?? courseEntity.description;
        courseEntity.start_date = start_date ? new Date(start_date) : courseEntity.start_date;
        courseEntity.end_date = end_date ? new Date(end_date) : courseEntity.end_date;
        courseEntity.enrollment_start_date = enrollment_start_date
            ? new Date(enrollment_start_date)
            : courseEntity.enrollment_start_date;
        courseEntity.enrollment_deadline = enrollment_deadline
            ? new Date(enrollment_deadline)
            : courseEntity.enrollment_deadline;
        await courseRepo.save(courseEntity);
        res.json({ success: true, data: courseEntity });
    }
    catch (err) {
        next(err);
    }
};
// Delete course
export const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseEntity = await courseRepo.findOneBy({ id: Number(id) });
        if (!courseEntity)
            throw { statusCode: 404, message: "Course not found" };
        await courseRepo.remove(courseEntity);
        res.json({ success: true, message: "Course deleted" });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=course.controller.js.map