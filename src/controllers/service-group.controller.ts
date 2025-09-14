import type { Request, Response,NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { service_group } from "../entity/ServiceGroup.js";

const serviceGroupRepo = AppDataSource.getRepository(service_group);

export const getServiceGroups = async (req: Request, res: Response) => {
  const groups = await serviceGroupRepo.find({
    relations: ["president", "vice_president", "secretary"],
  });

  return res.json({ success: true, data: groups });
};

export const getServiceGroupById = async (req: Request, res: Response) => {
  const group = await serviceGroupRepo.findOne({
    where: { id: Number(req.params.id) },
    relations: ["president", "vice_president", "secretary"],
  });

  if (!group) {
    return res.status(404).json({ success: false, message: "Service group not found" });
  }

  return res.json({ success: true, data: group });
};


export const createServiceGroup = async (req: Request, res: Response) => {
  const user = req.user as { role: string };

  if (user.role !== "admin" && user.role !== "super_admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Only Admins can create service groups" });
  }

  const newGroup = serviceGroupRepo.create(req.body);
  await serviceGroupRepo.save(newGroup);

  return res.status(201).json({ success: true, data: newGroup });
};


export const updateServiceGroup = async (req: Request, res: Response) => {
  const user = req.user as { role: string };

  if (user.role !== "admin" && user.role !== "super_admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Only Admins can update service groups" });
  }

  const group = await serviceGroupRepo.findOneBy({ id: Number(req.params.id) });
  if (!group) {
    return res.status(404).json({ success: false, message: "Service group not found" });
  }

  serviceGroupRepo.merge(group, req.body);
  await serviceGroupRepo.save(group);

  return res.json({ success: true, data: group });
};


export const deleteServiceGroup = async (req: Request, res: Response) => {
  const user = req.user as { role: string };

  if (user.role !== "admin" && user.role !== "super_admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Only Admins can delete service groups" });
  }

  const group = await serviceGroupRepo.findOneBy({ id: Number(req.params.id) });
  if (!group) {
    return res.status(404).json({ success: false, message: "Service group not found" });
  }

  await serviceGroupRepo.remove(group);

  return res.json({ success: true, message: "Service group deleted successfully" });
};
