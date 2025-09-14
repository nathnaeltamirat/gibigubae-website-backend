import { AppDataSource } from "../data-source.js";
import { service_sub_group } from "../entity/ServiceSubGroup.js";
import { service_group } from "../entity/ServiceGroup.js";
const subGroupRepo = AppDataSource.getRepository(service_sub_group);
const groupRepo = AppDataSource.getRepository(service_group);
// GET all sub-groups
export const getSubGroups = async (req, res, next) => {
    try {
        const subGroups = await subGroupRepo.find({
            relations: ["service", "president", "vice_president", "secretary"],
        });
        res.json({ success: true, data: subGroups });
    }
    catch (err) {
        next(err);
    }
};
// GET sub-group by ID
export const getSubGroupById = async (req, res, next) => {
    try {
        const subGroup = await subGroupRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ["service", "president", "vice_president", "secretary"],
        });
        if (!subGroup) {
            const error = new Error("Sub-group not found");
            error.statusCode = 404;
            throw error;
        }
        res.json({ success: true, data: subGroup });
    }
    catch (err) {
        next(err);
    }
};
// CREATE sub-group (Admin only)
export const createSubGroup = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "super_admin") {
            const error = new Error("Forbidden: Only Admin or Super Admin");
            error.statusCode = 403;
            throw error;
        }
        const { serviceId, name, description, president, vice_president, secretary } = req.body;
        const parentGroup = await groupRepo.findOneBy({ id: serviceId });
        if (!parentGroup) {
            const error = new Error("Parent service group not found");
            error.statusCode = 404;
            throw error;
        }
        const newSubGroup = subGroupRepo.create({
            service: parentGroup,
            name,
            description,
            president,
            vice_president,
            secretary,
        });
        await subGroupRepo.save(newSubGroup);
        res.status(201).json({ success: true, data: newSubGroup });
    }
    catch (err) {
        next(err);
    }
};
// UPDATE sub-group
export const updateSubGroup = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "super_admin") {
            const error = new Error("Forbidden: Only Admin or Super Admin");
            error.statusCode = 403;
            throw error;
        }
        const subGroup = await subGroupRepo.findOneBy({ id: Number(req.params.id) });
        if (!subGroup) {
            const error = new Error("Sub-group not found");
            error.statusCode = 404;
            throw error;
        }
        subGroupRepo.merge(subGroup, req.body);
        await subGroupRepo.save(subGroup);
        res.json({ success: true, data: subGroup });
    }
    catch (err) {
        next(err);
    }
};
// DELETE sub-group
export const deleteSubGroup = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "super_admin") {
            const error = new Error("Forbidden: Only Super Admin can delete");
            error.statusCode = 403;
            throw error;
        }
        const subGroup = await subGroupRepo.findOneBy({ id: Number(req.params.id) });
        if (!subGroup) {
            const error = new Error("Sub-group not found");
            error.statusCode = 404;
            throw error;
        }
        await subGroupRepo.remove(subGroup);
        res.json({ success: true, message: "Sub-group deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=service_sub_group.controller.js.map