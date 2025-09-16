import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { enrollment } from "../entity/Enrollment.js";
import { student } from "../entity/Student.js";
import { course } from "../entity/Course.js";


const enrollmentRepo = AppDataSource.getRepository(enrollment);
const studentRepo = AppDataSource.getRepository(student);
const courseRepo = AppDataSource.getRepository(course);

// ------------------------------
// Student self-enrollment
// ------------------------------
export const enrollSelf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { user_id: string; role: string }; // from authenticator middleware
    const { course_id } = req.body;

    const studentEntity = await studentRepo.findOneBy({ id: Number(user.user_id) });
    const courseEntity = await courseRepo.findOneBy({ id: Number(course_id) });

    if (!studentEntity || !courseEntity) {
      throw { statusCode: 404, message: "Student or course not found" };
    }

    // Check enrollment window
    const now = new Date();
    if (now < courseEntity.enrollment_start_date) {
      throw { statusCode: 400, message: "Enrollment has not started yet" };
    }
    if (now > courseEntity.enrollment_deadline) {
      throw { statusCode: 400, message: "Enrollment deadline has passed" };
    }

    // Prevent duplicate enrollment
    const existingEnroll = await enrollmentRepo.findOne({
      where: { student: { id: studentEntity.id }, course: { id: courseEntity.id } },
    });
    if (existingEnroll) {
      throw { statusCode: 400, message: "Already enrolled in this course" };
    }

    const newEnroll = enrollmentRepo.create({ student: studentEntity, course: courseEntity });
    await enrollmentRepo.save(newEnroll);

    res.status(201).json({ success: true, data: newEnroll });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Admin / SuperAdmin enrollment
// ------------------------------
export const enrollByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { user_id: string; role: string };

    // Only admins or superadmins can use this route
    if (user.role !== "admin" && user.role !== "super_admin") {
      throw { statusCode: 403, message: "Forbidden: Only Admins can enroll students" };
    }

    const { student_id, course_id } = req.body;

    if (!student_id || !course_id) {
      throw { statusCode: 400, message: "student_id and course_id are required" };
    }

    const studentEntity = await studentRepo.findOneBy({ id: Number(student_id) });
    const courseEntity = await courseRepo.findOneBy({ id: Number(course_id) });

    if (!studentEntity || !courseEntity) {
      throw { statusCode: 404, message: "Student or course not found" };
    }

    // Prevent duplicate enrollment
    const existingEnroll = await enrollmentRepo.findOne({
      where: { student: { id: studentEntity.id }, course: { id: courseEntity.id } },
    });
    if (existingEnroll) {
      throw { statusCode: 400, message: "Student is already enrolled in this course" };
    }

    const newEnroll = enrollmentRepo.create({ student: studentEntity, course: courseEntity });
    await enrollmentRepo.save(newEnroll);

    res.status(201).json({ success: true, data: newEnroll });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Remove enrollment
// ------------------------------
export const removeEnrollment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const enrollmentEntity = await enrollmentRepo.findOneBy({ id: Number(id) });
    if (!enrollmentEntity) throw { statusCode: 404, message: "Enrollment not found" };

    await enrollmentRepo.remove(enrollmentEntity);
    res.json({ success: true, message: "Enrollment removed" });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// List enrollments
// ------------------------------
export const getEnrollments = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const enrollments = await enrollmentRepo.find({ relations: ["student", "course"] });
    res.json({ success: true, data: enrollments });
  } catch (err) {
    next(err);
  }
};

