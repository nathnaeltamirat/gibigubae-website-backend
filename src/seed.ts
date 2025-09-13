import { AppDataSource } from "./data-source.js";
import { department } from "./entity/Department.js";

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

export const seedDepartments = async () => {
  try {
    const departmentRepository = AppDataSource.getRepository(department);

    for (const deptName of departments) {
  
      const existing = await departmentRepository.findOne({
        where: { department_name: deptName },
      });

      if (!existing) {
        const newDept = departmentRepository.create({ department_name: deptName });
        await departmentRepository.save(newDept);
      }
    }

    console.log("✅ Departments seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding departments:", err);
  }
};