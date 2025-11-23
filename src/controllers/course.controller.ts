import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { course } from "../entity/Course.js";
import type { AuthenticatedRequest } from "../types/express.js";

const courseRepo = AppDataSource.getRepository(course);

// Create course (Admin)
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      course_name,
      description,
      start_date,
      end_date,
      enrollment_start_date,
      enrollment_deadline,
    } = req.body;

    if (
      !course_name ||
      !description ||
      !start_date ||
      !end_date ||
      !enrollment_start_date ||
      !enrollment_deadline
    ) {
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
  } catch (err) {
    next(err);
  }
};

// Get all courses (Admin)
export const getCourses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await courseRepo.find();
    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
};

// Get course by ID (Admin/Student)
export const getCourseById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const courseId = Number(id);

    if (isNaN(courseId)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const courseEntity = await courseRepo.findOneBy({ id: courseId });
    if (!courseEntity) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: courseEntity });
  } catch (err) {
    next(err);
  }
};


// Get courses for logged-in student
export const getStudentCourses = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.user_id;

    const courses = await courseRepo
      .createQueryBuilder("course")
      .innerJoin("course.enrollments", "enrollment")
      .innerJoin("enrollment.student", "student")
      .where("student.id = :userId", { userId })
      .getMany();

    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
};

// Update course (Admin)
export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      course_name,
      description,
      start_date,
      end_date,
      enrollment_start_date,
      enrollment_deadline,
    } = req.body;

    const courseEntity = await courseRepo.findOneBy({ id: Number(id) });
    if (!courseEntity) throw { statusCode: 404, message: "Course not found" };

    courseEntity.course_name = course_name ?? courseEntity.course_name;
    courseEntity.description = description ?? courseEntity.description;
    courseEntity.start_date = start_date
      ? new Date(start_date)
      : courseEntity.start_date;
    courseEntity.end_date = end_date ? new Date(end_date) : courseEntity.end_date;
    courseEntity.enrollment_start_date = enrollment_start_date
      ? new Date(enrollment_start_date)
      : courseEntity.enrollment_start_date;
    courseEntity.enrollment_deadline = enrollment_deadline
      ? new Date(enrollment_deadline)
      : courseEntity.enrollment_deadline;

    await courseRepo.save(courseEntity);
    res.json({ success: true, data: courseEntity });
  } catch (err) {
    next(err);
  }
};

// Delete course (Admin)
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const courseEntity = await courseRepo.findOneBy({ id: Number(id) });
    if (!courseEntity) throw { statusCode: 404, message: "Course not found" };

    await courseRepo.remove(courseEntity);
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    next(err);
  }
};
