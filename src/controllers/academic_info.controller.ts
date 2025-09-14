import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { academic_info } from "../entity/AcademicInfo.js";
import { student } from "../entity/Student.js";
import { department } from "../entity/Department.js";

interface CustomError extends Error {
  statusCode?: number;
}

const academicRepo = AppDataSource.getRepository(academic_info);
const studentRepo = AppDataSource.getRepository(student);
const departmentRepo = AppDataSource.getRepository(department);

// Add / Update Academic Info
export const addOrUpdateAcademicInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, departmentId, year, dorm_block, room_number } = req.body;

    if (!studentId || !departmentId) {
      const error: CustomError = new Error("Missing studentId or departmentId");
      error.statusCode = 400;
      throw error;
    }

    const studentEntity = await studentRepo.findOneBy({ id: Number(studentId) });
    if (!studentEntity) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    const departmentEntity = await departmentRepo.findOneBy({ id: Number(departmentId) });
    if (!departmentEntity) {
      const error: CustomError = new Error("Department not found");
      error.statusCode = 404;
      throw error;
    }

    let academic = await academicRepo.findOne({
      where: { user: { id: studentId } },
      relations: ["user", "department"]
    });

    if (!academic) {
      academic = academicRepo.create({
        user: studentEntity,
        department: departmentEntity,
        year,
        dorm_block,
        room_number
      });
    } else {
      academic.department = departmentEntity;
      academic.year = year;
      academic.dorm_block = dorm_block;
      academic.room_number = room_number;
    }

    await academicRepo.save(academic);

    res.status(200).json({ success: true, data: academic });
  } catch (err) {
    next(err);
  }
};

// Get Academic Info by student ID
export const getAcademicInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = Number(req.params.studentId);

    const academic = await academicRepo.findOne({
      where: { user: { id: studentId } },
      relations: ["user", "department"]
    });

    if (!academic) {
      const error: CustomError = new Error("Academic info not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: academic });
  } catch (err) {
    next(err);
  }
};
