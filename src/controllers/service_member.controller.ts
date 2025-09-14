import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { service_member } from "../entity/ServiceMember.js";
import { student } from "../entity/Student.js";
import { service_group } from "../entity/ServiceGroup.js";
import { service_sub_group } from "../entity/ServiceSubGroup.js";

const memberRepo = AppDataSource.getRepository(service_member);
const studentRepo = AppDataSource.getRepository(student);
const groupRepo = AppDataSource.getRepository(service_group);
const subGroupRepo = AppDataSource.getRepository(service_sub_group);

interface CustomError extends Error {
  statusCode?: number;
}

/**
 * GET all service members
 */
export const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const members = await memberRepo.find({
      relations: ["student", "group", "sub_group"],
    });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

export const getMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, group_id } = req.params;

    const member = await memberRepo.findOne({
      where: { user_id: Number(user_id), serviceGroup: Number(group_id) },
      relations: ["student", "group", "sub_group"],
    });

    if (!member) {
      const error: CustomError = new Error("Service member not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

/**
 * CREATE service member (Admin only)
 */
export const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as { role: string };
    if (user.role !== "admin" && user.role !== "super_admin") {
      const error: CustomError = new Error(
        "Forbidden: Only Admin or Super Admin"
      );
      error.statusCode = 403;
      throw error;
    }

    const { user_id, group_id, sub_group_id, service_role } = req.body;

    const existingStudent = await studentRepo.findOneBy({ id: user_id });
    if (!existingStudent) {
      const error: CustomError = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    const existingGroup = await groupRepo.findOneBy({ id: group_id });
    if (!existingGroup) {
      const error: CustomError = new Error("Service group not found");
      error.statusCode = 404;
      throw error;
    }

    let subGroupEntity: service_sub_group | null = null;
    if (sub_group_id) {
      subGroupEntity = await subGroupRepo.findOneBy({ id: sub_group_id });
      if (!subGroupEntity) {
        const error: CustomError = new Error("Service sub-group not found");
        error.statusCode = 404;
        throw error;
      }
    }

    const newMember = memberRepo.create({
      user_id,
      serviceGroup: group_id,
      student: existingStudent,
      group: existingGroup,
      service_role,
      ...(subGroupEntity ? { sub_group: subGroupEntity } : {}),
    });

    await memberRepo.save(newMember);
    res.status(201).json({ success: true, data: newMember });
  } catch (err) {
    next(err);
  }
};

export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (user.role !== "admin" && user.role !== "super_admin") {
      const error: CustomError = new Error("Forbidden: Only Admin or Super Admin");
      error.statusCode = 403;
      throw error;
    }

    const { user_id, group_id } = req.params;
    const { service_role, sub_group_id } = req.body;

    const member = await memberRepo.findOne({
      where: { user_id: Number(user_id), serviceGroup: Number(group_id) },
      relations: ["student", "group", "sub_group"],
    });

    if (!member) {
      const error: CustomError = new Error("Service member not found");
      error.statusCode = 404;
      throw error;
    }

    if (service_role) {
      member.service_role = service_role;
    }

    if (sub_group_id) {
      const subGroupEntity = await subGroupRepo.findOneBy({ id: sub_group_id });
      if (!subGroupEntity) {
        const error: CustomError = new Error("Sub-group not found");
        error.statusCode = 404;
        throw error;
      }
      member.sub_group = subGroupEntity;
    }

    await memberRepo.save(member);

    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE service member (Super Admin only)
 */
export const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as { role: string };
    if (user.role !== "super_admin") {
      const error: CustomError = new Error("Forbidden: Only Super Admin");
      error.statusCode = 403;
      throw error;
    }

    const { user_id, group_id } = req.params;
    const member = await memberRepo.findOneBy({
      user_id: Number(user_id),
      serviceGroup: Number(group_id),
    });

    if (!member) {
      const error: CustomError = new Error("Service member not found");
      error.statusCode = 404;
      throw error;
    }

    await memberRepo.remove(member);
    res.json({ success: true, message: "Service member deleted successfully" });
  } catch (err) {
    next(err);
  }
};
