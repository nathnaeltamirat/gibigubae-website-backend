import { AppDataSource } from "../data-source.js";
import { student } from "../entity/Student.js";
import { course } from "../entity/Course.js";
import { enrollment } from "../entity/Enrollment.js";
import { attendance } from "../entity/Attendance.js";
const handleError = (res, err) => {
    const error = err;
    const statusCode = error.statusCode || 500;
    const message = error.message ||
        (statusCode === 500
            ? "Internal Server Error"
            : "An unexpected error occurred");
    res.status(statusCode).json({
        success: false,
        message,
        errors: error.errors || null,
    });
};
// --------------------------------------
// 🗂️ Repositories
// --------------------------------------
const studentRepo = AppDataSource.getRepository(student);
const courseRepo = AppDataSource.getRepository(course);
const enrollmentRepo = AppDataSource.getRepository(enrollment);
const attendanceRepo = AppDataSource.getRepository(attendance);
// --------------------------------------
// 📊 Get overall analytics summary
// --------------------------------------
export const getOverallAnalytics = async (req, res) => {
    try {
        const totalStudents = await studentRepo.count();
        const totalCourses = await courseRepo.count();
        const totalEnrollments = await enrollmentRepo.count();
        const totalAttendance = await attendanceRepo.count();
        const attendanceStats = await attendanceRepo
            .createQueryBuilder("attendance")
            .select("attendance.status", "status")
            .addSelect("COUNT(attendance.id)", "count")
            .groupBy("attendance.status")
            .getRawMany();
        const statsSummary = {
            present: 0,
            late: 0,
            absent: 0,
        };
        attendanceStats.forEach((stat) => {
            statsSummary[stat.status] = Number(stat.count);
        });
        res.json({
            success: true,
            data: {
                totals: {
                    students: totalStudents,
                    courses: totalCourses,
                    enrollments: totalEnrollments,
                    attendanceRecords: totalAttendance,
                },
                attendanceSummary: statsSummary,
            },
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
// --------------------------------------
// 📈 Attendance percentage per course
// --------------------------------------
export const getCourseAttendanceStats = async (req, res) => {
    try {
        const { courseId } = req.params;
        const courseEntity = await courseRepo.findOne({
            where: { id: Number(courseId) },
        });
        if (!courseEntity)
            throw { statusCode: 404, message: "Course not found" };
        const totalRecords = await attendanceRepo.count({
            where: { course: { id: Number(courseId) } },
        });
        if (totalRecords === 0)
            throw { statusCode: 400, message: "No attendance records found" };
        const presentCount = await attendanceRepo.count({
            where: { course: { id: Number(courseId) }, status: "present" },
        });
        const lateCount = await attendanceRepo.count({
            where: { course: { id: Number(courseId) }, status: "late" },
        });
        const absentCount = await attendanceRepo.count({
            where: { course: { id: Number(courseId) }, status: "absent" },
        });
        const attendanceRate = ((presentCount + lateCount) / totalRecords) * 100;
        res.json({
            success: true,
            data: {
                course: {
                    id: courseEntity.id,
                    name: courseEntity.course_name,
                },
                totalRecords,
                present: presentCount,
                late: lateCount,
                absent: absentCount,
                attendanceRate: attendanceRate.toFixed(2) + "%",
            },
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
// --------------------------------------
// 👨‍🎓 Attendance summary per student
// --------------------------------------
export const getStudentAttendanceSummary = async (req, res) => {
    try {
        const { studentId } = req.params;
        const studentEntity = await studentRepo.findOneBy({
            id: Number(studentId),
        });
        if (!studentEntity)
            throw { statusCode: 404, message: "Student not found" };
        const totalRecords = await attendanceRepo.count({
            where: { student: { id: Number(studentId) } },
        });
        if (totalRecords === 0)
            throw { statusCode: 400, message: "No attendance records found" };
        const presentCount = await attendanceRepo.count({
            where: { student: { id: Number(studentId) }, status: "present" },
        });
        const lateCount = await attendanceRepo.count({
            where: { student: { id: Number(studentId) }, status: "late" },
        });
        const absentCount = await attendanceRepo.count({
            where: { student: { id: Number(studentId) }, status: "absent" },
        });
        const attendanceRate = ((presentCount + lateCount) / totalRecords) * 100;
        res.json({
            success: true,
            data: {
                student: {
                    id: studentEntity.id,
                    name: `${studentEntity.first_name} ${studentEntity.father_name}`,
                },
                totalRecords,
                present: presentCount,
                late: lateCount,
                absent: absentCount,
                attendanceRate: attendanceRate.toFixed(2) + "%",
            },
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
//# sourceMappingURL=analytics.controller.js.map