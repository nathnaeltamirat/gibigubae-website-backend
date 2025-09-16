import { AppDataSource } from "./data-source.js";
import { department } from "./entity/Department.js";
import { student } from "./entity/Student.js";
import bcrypt from "bcrypt";
import { GENDER, ROLE } from "./types/entity.js";
const departments = [
    "Electromechanical Engineering",
    "Chemical Engineering",
    "Software Engineering",
    "Mechanical Engineering",
    "Electrical and Computer Engineering",
    "Civil Engineering",
    "Architecture",
    "Applied Science",
    "Freshman Engineering",
    "Biotechnology",
    "Industrial Chemistry",
];
export const seedSuperAdmin = async () => {
    try {
        const studentRepo = AppDataSource.getRepository(student);
        const existingSuperAdmin = await studentRepo.findOne({
            where: { email: "superadmin@example.com" },
        });
        if (existingSuperAdmin) {
            console.log("Super Admin already exists.");
            return;
        }
        const password = "SuperAdmin123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const superAdmin = studentRepo.create({
            first_name: "Super",
            father_name: "Admin",
            grand_father_name: "code",
            email: "superadmin@example.com",
            password: hashedPassword,
            gender: GENDER.MALE,
            phone_number: "0000000000",
            id_card_image_path: "placeholder.png",
            id_number: "0000",
            role: ROLE.SUPER_ADMIN,
            is_verified: true,
        });
        await studentRepo.save(superAdmin);
        console.log("Super Admin created successfully!");
    }
    catch (err) {
        console.error("Error seeding Super Admin:", err);
    }
};
export const seedDepartments = async () => {
    try {
        const departmentRepository = AppDataSource.getRepository(department);
        for (const deptName of departments) {
            const existing = await departmentRepository.findOne({
                where: { department_name: deptName },
            });
            if (!existing) {
                const newDept = departmentRepository.create({
                    department_name: deptName,
                });
                await departmentRepository.save(newDept);
            }
        }
        console.log("✅ Departments seeded successfully!");
    }
    catch (err) {
        console.error("❌ Error seeding departments:", err);
    }
};
//# sourceMappingURL=seed.js.map