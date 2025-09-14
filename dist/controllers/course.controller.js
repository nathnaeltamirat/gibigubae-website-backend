import { AppDataSource } from "../data-source.js";
import { course } from "../entity/Course.js";
const courseRepo = AppDataSource.getRepository(course);
// Create course
export const createCourse = async (req, res, next) => {
    try {
        const { course_name, description } = req.body;
        const newCourse = courseRepo.create({ course_name, description });
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
        const { course_name, description } = req.body;
        const courseEntity = await courseRepo.findOneBy({ id: Number(id) });
        if (!courseEntity)
            throw { statusCode: 404, message: "Course not found" };
        courseEntity.course_name = course_name ?? courseEntity.course_name;
        courseEntity.description = description ?? courseEntity.description;
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