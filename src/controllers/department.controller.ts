import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { department } from "../entity/Department.js";

const departmentRepo = AppDataSource.getRepository(department);

export const getDepartments = async (req: Request, res: Response) => {
  const departments = await departmentRepo.find();
  return res.json({
    success: true,
    data: departments,
  });
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const dept = await departmentRepo.findOneBy({ id: Number(req.params.id) });

  if (!dept) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  return res.json({
    success: true,
    data: dept,
  });
};

export const createDepartment = async (req: Request, res: Response) => {
  const user = req.user as { role: string };

  if (!["admin", "super_admin"].includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only Admin or Super Admin can create departments",
    });
  }

  const newDept = departmentRepo.create(req.body);
  await departmentRepo.save(newDept);

  return res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: newDept,
  });
};

export const updateDepartment = async (req: Request, res: Response) => {
  const user = req.user as { role: string };

  if (!["admin", "super_admin"].includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only Admin or Super Admin can update departments",
    });
  }

  const dept = await departmentRepo.findOneBy({ id: Number(req.params.id) });

  if (!dept) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  departmentRepo.merge(dept, req.body);
  await departmentRepo.save(dept);

  return res.json({
    success: true,
    message: "Department updated successfully",
    data: dept,
  });
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const user = req.user as { role: string };

  if (user.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only Super Admin can delete departments",
    });
  }

  const dept = await departmentRepo.findOneBy({ id: Number(req.params.id) });

  if (!dept) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  await departmentRepo.remove(dept);
  return res.json({
    success: true,
    message: "Department deleted successfully",
  });
};
