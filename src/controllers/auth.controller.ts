import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { Student } from "../entity/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { scanBarcode } from "../utils/barcodeScanner.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

export interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined; 
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
      phoneNumber,
    } = req.body;
    const userRepository = AppDataSource.getRepository(Student);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      const error: CustomError = new Error("User already exists");
      error.statusCode = 500;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const requiredFields = [
      "firstName",
      "fatherName",
      "grandFatherName",
      "christianName",
      "email",
      "password",
      "gender",
      "phoneNumber",
    ] as const;

    let idCardImagePath = null;
    let barcode = null;
    if (req.file) {
      idCardImagePath = await uploadToCloudinary(req.file, "student_ids");
    } else {
      const error: CustomError = new Error("ID card image is required");
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
          barcode:newStudent.barcode,
          role: newStudent.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
