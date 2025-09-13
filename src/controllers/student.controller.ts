import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { student } from "../entity/Student.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const userId = Number(req.user!.user_id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const userRepository = AppDataSource.getRepository(student);
    const currentStudent = await userRepository.findOne({ where: { id: userId } });

    if (!currentStudent) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, data: currentStudent });
  } catch (err) {
    next(err);
  }
};

export const updateOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const userId = Number(req.user!.user_id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const userRepository = AppDataSource.getRepository(student);
    const studentToUpdate = await userRepository.findOne({ where: { id: userId } });

    if (!studentToUpdate) return res.status(404).json({ message: "Student not found" });


    const updatableFields = ["first_name", "father_name", "grand_father_name", "christian_name", "email", "phone_number", "gender"] as const;
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) studentToUpdate[field] = req.body[field];
    });


    if (req.file) {
      const idCardPath = await uploadToCloudinary(req.file, "id_card");
      studentToUpdate.id_card_image_path = idCardPath;
    }

    await userRepository.save(studentToUpdate);

    res.status(200).json({ success: true, data: studentToUpdate });
  } catch (err) {
    next(err);
  }
};
