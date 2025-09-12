import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { Student } from "../entity/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { AcademicInfo } from "../entity/AcademicInfo.js";
import { Department } from "../entity/Department.js";
interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

export interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined; // make it optional
}

export const signUp = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      fatherName,
      grandFatherName,
      christianName,
      email,
      password,
      gender,
      departmentName,
      phoneNumber,
    } = req.body;
    const userRepository = AppDataSource.getRepository(Student);
    const departmentRepository = AppDataSource.getRepository(Department);
    const academicInfoRepository = AppDataSource.getRepository(AcademicInfo);

    const existingUser = await userRepository.findOne({
      where: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      const error: CustomError = new Error("User already exists");
      error.statusCode = 500;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const requiredFields = [
      "firstName",
      "departmentName",
      "fatherName",
      "grandFatherName",
      "christianName",
      "email",
      "password",
      "gender",
      "phoneNumber",
    ] as const;

    let idCardImagePath = null;
    if (req.file) {
      idCardImagePath = await uploadToCloudinary(req.file, "student_ids");
    } else {
      const error: CustomError = new Error("ID card image is required");
      error.statusCode = 400;
      throw error;
    }
    let department = await departmentRepository.findOne({
      where: { departmentName },
    });
    if (!department) {
      const error: CustomError = new Error("Department is required");
      error.statusCode = 400;
      throw error;
    }
    const newStudent = userRepository.create({
      firstName,
      fatherName,
      grandFatherName,
      christianName,
      email,
      password: hashedPassword,
      gender,
      phoneNumber,
      idCardImagePath,
    });

    for (const field of requiredFields) {
      if (!req.body[field]) {
        const error: CustomError = new Error(
          `Missing required field: ${field}`
        );
        error.statusCode = 400;
        throw error;
      }
    }
    if (!JWT_SECRET) {
      const error: CustomError = new Error(
        "JWT_SECRET is not defined in environment variables"
      );
      error.statusCode = 500;
      throw error;
    }

    await userRepository.save(newStudent);
    const academicInfo = academicInfoRepository.create({
      user: newStudent,
      department,
    });
    await academicInfoRepository.save(academicInfo);
    const token = jwt.sign(
      { userId: newStudent.id, email: newStudent.email, role: newStudent.role },
      JWT_SECRET as string,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );
    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newStudent.id,
          firstName: newStudent.firstName,
          email: newStudent.email,
          barcode: newStudent.barcode,
          role: newStudent.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
export const signIn = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const userRepository = AppDataSource.getRepository(Student);
    if (!req.body.email && !req.body.phoneNumber) {
      const error: CustomError = new Error(
        "Either email or phoneNumber is required"
      );
      error.statusCode = 400;
      throw error;
    }
    const existingUser = await userRepository.findOne({
      where: [{ email }, { phoneNumber }],
    });
    if (!existingUser) {
      const error: CustomError = new Error("User doesn't exists");
      error.statusCode = 500;
      throw error;
    }
    if (!password) {
      const error: CustomError = new Error("Password is required");
      error.statusCode = 400;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      const error: CustomError = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    if (!JWT_SECRET) {
      const error: CustomError = new Error(
        "JWT_SECRET is not defined in environment variables"
      );
      error.statusCode = 500;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      JWT_SECRET as string,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );
    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: existingUser.id,
          firstName: existingUser.firstName,
          email: existingUser.email,
          role: existingUser.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
