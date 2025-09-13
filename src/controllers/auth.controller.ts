import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { student } from "../entity/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { academic_info } from "../entity/AcademicInfo.js";
import { department } from "../entity/Department.js";

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
      first_name,
      father_name,
      grand_father_name,
      christian_name,
      email,
      password,
      gender,
      department_name,
      phone_number,
    } = req.body;

    const userRepository = AppDataSource.getRepository(student);
    const departmentRepository = AppDataSource.getRepository(department);
    const academicInfoRepository = AppDataSource.getRepository(academic_info);

    const requiredFields = [
      "first_name",
      "department_name",
      "father_name",
      "grand_father_name",
      "christian_name",
      "email",
      "password",
      "gender",
      "phone_number",
    ] as const;

    for (const field of requiredFields) {
      if (!req.body[field]) {
        const error: CustomError = new Error(
          `Missing required field: ${field}`
        );
        error.statusCode = 400;
        throw error;
      }
    }
    const formatted_email = email.toLowerCase();
    const existingUser = await userRepository.findOne({
      where: [{ email: formatted_email }, { phone_number }],
    });
    if (existingUser) {
      const error: CustomError = new Error("User already exists");
      error.statusCode = 500;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!req.file) {
      const error: CustomError = new Error("ID card image is required");
      error.statusCode = 400;
      throw error;
    }

    const id_card_image_path = await uploadToCloudinary(req.file, "id_card");

    const existing_department = await departmentRepository.findOne({
      where: { department_name },
    });
    if (!existing_department) {
      const error: CustomError = new Error("Department is required");
      error.statusCode = 400;
      throw error;
    }

    const newStudent = userRepository.create({
      first_name,
      father_name,
      grand_father_name,
      christian_name,
      email: formatted_email,
      password: hashedPassword,
      gender,
      phone_number,
      id_card_image_path,
    });

    await userRepository.save(newStudent);

    const newAcademicInfo = academicInfoRepository.create({
      user: newStudent,
      department: existing_department,
    });
    await academicInfoRepository.save(newAcademicInfo);

    if (!JWT_SECRET) {
      const error: CustomError = new Error(
        "JWT_SECRET is not defined in environment variables"
      );
      error.statusCode = 500;
      throw error;
    }

    const token = jwt.sign(
      {
        user_id: newStudent.id,
        email: newStudent.email,
        role: newStudent.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newStudent.id,
          first_name: newStudent.first_name,
          email: newStudent.email,
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
    const { phone_or_email, password } = req.body;

    if (!phone_or_email || !password) {
      const error: CustomError = new Error("Missing fields");
      error.statusCode = 400;
      throw error;
    }

    const userRepository = AppDataSource.getRepository(student);

    // Convert email to lowercase if it looks like an email
    const formattedInput = phone_or_email.includes("@")
      ? phone_or_email.toLowerCase()
      : phone_or_email;

    const existingUser = await userRepository.findOne({
      where: [{ email: formattedInput }, { phone_number: formattedInput }],
    });

    if (!existingUser) {
      const error: CustomError = new Error("User doesn't exist");
      error.statusCode = 404;
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
        user_id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: existingUser.id,
          first_name: existingUser.first_name,
          email: existingUser.email,
          role: existingUser.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
