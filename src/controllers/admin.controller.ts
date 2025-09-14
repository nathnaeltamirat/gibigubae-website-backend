import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { student } from "../entity/Student.js";

interface CustomError extends Error {
  statusCode?: number;
}

const studentRepo = AppDataSource.getRepository(student);

// Get all students (optional filters: verified, search by name/email/phone)
export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      const error: CustomError = new Error("Forbidden: Admins only");
      error.statusCode = 403;
      throw error;
    }

    const { verified, search } = req.query;
    let query = studentRepo.createQueryBuilder("student");

    if (verified === "true") query = query.andWhere("student.is_verified = true");
    if (verified === "false") query = query.andWhere("student.is_verified = false");

    if (search && typeof search === "string") {
      query = query.andWhere(
        `(student.first_name ILIKE :search OR student.father_name ILIKE :search OR student.grand_father_name ILIKE :search OR student.email ILIKE :search OR student.phone_number ILIKE :search)`,
        { search: `%${search}%` }
      );
    }

    const students = await query.getMany();
    res.json({ success: true, data: students });
  } catch (err) {
    next(err);
  }
};

// Get single student by ID
export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      const error: CustomError = new Error("Forbidden: Admins only");
      error.statusCode = 403;
      throw error;
    }

    const { id } = req.params;
    const studentEntity = await studentRepo.findOneBy({ id: Number(id) });
    if (!studentEntity) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: studentEntity });
  } catch (err) {
    next(err);
  }
};

// Update student information
export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      const error: CustomError = new Error("Forbidden: Admins only");
      error.statusCode = 403;
      throw error;
    }

    const { id } = req.params;
    const studentEntity = await studentRepo.findOneBy({ id: Number(id) });
    if (!studentEntity) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    studentRepo.merge(studentEntity, req.body);
    await studentRepo.save(studentEntity);

    res.json({ success: true, data: studentEntity });
  } catch (err) {
    next(err);
  }
};

// Change student role
export const changeStudentRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      const error: CustomError = new Error("Forbidden: Admins only");
      error.statusCode = 403;
      throw error;
    }

    const { id } = req.params;
    const { role } = req.body;

    const studentEntity = await studentRepo.findOneBy({ id: Number(id) });
    if (!studentEntity) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    studentEntity.role = role;
    await studentRepo.save(studentEntity);

    res.json({ success: true, data: studentEntity });
  } catch (err) {
    next(err);
  }
};

// Verify/unverify student
export const verifyStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      const error: CustomError = new Error("Forbidden: Admins only");
      error.statusCode = 403;
      throw error;
    }

    const { id } = req.params;
    const { is_verified } = req.body;

    const studentEntity = await studentRepo.findOneBy({ id: Number(id) });
    if (!studentEntity) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    studentEntity.is_verified = !!is_verified;
    await studentRepo.save(studentEntity);

    res.json({ success: true, data: studentEntity });
  } catch (err) {
    next(err);
  }
};

// Delete student (Super Admin only)
export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (user.role !== "super_admin") {
      const error: CustomError = new Error("Forbidden: Super Admin only");
      error.statusCode = 403;
      throw error;
    }

    const { id } = req.params;
    const studentEntity = await studentRepo.findOneBy({ id: Number(id) });
    if (!studentEntity) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    await studentRepo.remove(studentEntity);
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    next(err);
  }
};
