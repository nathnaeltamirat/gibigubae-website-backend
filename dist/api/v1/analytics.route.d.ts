/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: System analytics and attendance statistics
 */
export {};
/**
 * @swagger
 * /analytics/overall:
 *   get:
 *     summary: Get overall analytics summary
 *     description: Returns total counts of students, courses, enrollments, and attendance statistics.
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Overall analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totals:
 *                       type: object
 *                       properties:
 *                         students:
 *                           type: integer
 *                           example: 150
 *                         courses:
 *                           type: integer
 *                           example: 20
 *                         enrollments:
 *                           type: integer
 *                           example: 300
 *                         attendanceRecords:
 *                           type: integer
 *                           example: 4500
 *                     attendanceSummary:
 *                       type: object
 *                       properties:
 *                         present:
 *                           type: integer
 *                           example: 4000
 *                         late:
 *                           type: integer
 *                           example: 300
 *                         absent:
 *                           type: integer
 *                           example: 200
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /analytics/course/{courseId}:
 *   get:
 *     summary: Get attendance statistics for a specific course
 *     description: Returns total attendance counts and percentage for a given course.
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: Course attendance statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     course:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 5
 *                         name:
 *                           type: string
 *                           example: "Software Engineering"
 *                     totalRecords:
 *                       type: integer
 *                       example: 60
 *                     present:
 *                       type: integer
 *                       example: 50
 *                     late:
 *                       type: integer
 *                       example: 5
 *                     absent:
 *                       type: integer
 *                       example: 5
 *                     attendanceRate:
 *                       type: string
 *                       example: "91.67%"
 *       404:
 *         description: Course not found
 *       400:
 *         description: No attendance records found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /analytics/student/{studentId}:
 *   get:
 *     summary: Get attendance summary for a specific student
 *     description: Returns a student’s overall attendance statistics and percentage across all courses.
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: Student attendance summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 12
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                     totalRecords:
 *                       type: integer
 *                       example: 45
 *                     present:
 *                       type: integer
 *                       example: 40
 *                     late:
 *                       type: integer
 *                       example: 3
 *                     absent:
 *                       type: integer
 *                       example: 2
 *                     attendanceRate:
 *                       type: string
 *                       example: "95.56%"
 *       404:
 *         description: Student not found
 *       400:
 *         description: No attendance records found
 *       500:
 *         description: Internal server error
 */
//# sourceMappingURL=analytics.route.d.ts.map