import { AppDataSource } from "../data-source.js";
import { student } from "../entity/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_SECRET, } from "../config/env.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { academic_info } from "../entity/AcademicInfo.js";
import { department } from "../entity/Department.js";
// Helper for unified error responses
const handleError = (res, err) => {
    const error = err;
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
};
export const signUp = async (req, res) => {
    try {
        const { first_name, father_name, grand_father_name, email, password, id_number, gender, department_name, phone_number, } = req.body;
        const userRepository = AppDataSource.getRepository(student);
        const departmentRepository = AppDataSource.getRepository(department);
        const academicInfoRepository = AppDataSource.getRepository(academic_info);
        const requiredFields = [
            "first_name",
            "department_name",
            "father_name",
            "grand_father_name",
            "id_number",
            "email",
            "password",
            "gender",
            "phone_number",
        ];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                const error = new Error(`Missing required field: ${field}`);
                error.statusCode = 400;
                throw error;
            }
        }
        const formatted_email = email.toLowerCase();
        const existingUser = await userRepository.findOne({
            where: [{ email: formatted_email }, { phone_number }],
        });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (!req.file) {
            const error = new Error("ID card image is required");
            error.statusCode = 400;
            throw error;
        }
        const id_card_image_path = await uploadToCloudinary(req.file, "id_card");
        const existing_department = await departmentRepository.findOne({
            where: { department_name },
        });
        if (!existing_department) {
            const error = new Error("Department not found");
            error.statusCode = 400;
            throw error;
        }
        const newStudent = userRepository.create({
            first_name,
            father_name,
            grand_father_name,
            id_number,
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
            const error = new Error("JWT_SECRET is not defined in environment variables");
            error.statusCode = 500;
            throw error;
        }
        const token = jwt.sign({ user_id: newStudent.id, email: newStudent.email, role: newStudent.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ user_id: newStudent.id, email: newStudent.email, role: newStudent.role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
        // Set cookies
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: newStudent.id,
                    first_name: newStudent.first_name,
                    email: newStudent.email,
                    role: newStudent.role,
                },
            },
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
export const signIn = async (req, res) => {
    try {
        const { phone_or_email, password } = req.body;
        if (!phone_or_email || !password) {
            const error = new Error("Missing fields");
            error.statusCode = 400;
            throw error;
        }
        const userRepository = AppDataSource.getRepository(student);
        const formattedInput = phone_or_email.includes("@")
            ? phone_or_email.toLowerCase()
            : phone_or_email;
        const existingUser = await userRepository.findOne({
            where: [{ email: formattedInput }, { phone_number: formattedInput }],
        });
        if (!existingUser) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }
        if (!JWT_SECRET) {
            const error = new Error("JWT_SECRET is not defined in environment variables");
            error.statusCode = 500;
            throw error;
        }
        const token = jwt.sign({ user_id: existingUser.id, email: existingUser.email, role: existingUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ user_id: existingUser.id, email: existingUser.email, role: existingUser.role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: existingUser.id,
                    first_name: existingUser.first_name,
                    email: existingUser.email,
                    role: existingUser.role,
                },
            },
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
export const logout = (req, res) => {
    res.clearCookie("auth_token");
    res.clearCookie("refresh_token");
    res.json({ success: true, message: "Logged out successfully" });
};
export const refreshToken = (req, res) => {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken)
        return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newToken = jwt.sign({
            user_id: decoded.user_id,
            email: decoded.email,
            role: decoded.role,
        }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("auth_token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.json({ success: true, message: "Token refreshed" });
    }
    catch (err) {
        return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }
};
//# sourceMappingURL=auth.controller.js.map