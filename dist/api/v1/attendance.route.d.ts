/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management routes
 */
export {};
/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         student:
 *           type: object
 *           description: Student entity
 *           example:
 *             id: 5
 *             first_name: "John"
 *             email: "john@example.com"
 *         course:
 *           type: object
 *           description: Course entity
 *           example:
 *             id: 2
 *             course_name: "Intro to Theology"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T08:30:00.000Z"
 *         status:
 *           type: string
 *           enum: [present, late, absent]
 *           example: "present"
 *         code:
 *           type: string
 *           nullable: true
 *           example: "XYZ123"
 */
/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: Create attendance for a course (Admin/Super Admin only)
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *                 example: 2
 *               code:
 *                 type: string
 *                 description: Optional code for attendance marking
 *                 example: "XYZ123"
 *               start_in_minutes:
 *                 type: integer
 *                 description: Minutes from now when class starts
 *                 example: 10
 *             required:
 *               - course_id
 *               - start_in_minutes
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       403:
 *         description: Forbidden (Admins only)
 *       404:
 *         description: Course not found
 *       400:
 *         description: No students enrolled
 */
/**
 * @swagger
 * /attendance/mark/qr:
 *   get:
 *     summary: Mark attendance via QR code
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *         example: 5
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *         example: 2
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found
 */
/**
 * @swagger
 * /attendance/mark/code:
 *   post:
 *     summary: Mark attendance via code
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 example: 5
 *               course_id:
 *                 type: integer
 *                 example: 2
 *               code:
 *                 type: string
 *                 example: "XYZ123"
 *             required:
 *               - student_id
 *               - course_id
 *               - code
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Invalid code or attendance record not found
 */
/**
 * @swagger
 * /attendance/manual:
 *   put:
 *     summary: Manual attendance update (Admin only)
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attendance_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [present, late, absent]
 *                 example: "late"
 *             required:
 *               - attendance_id
 *               - status
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /attendance/course/{courseId}:
 *   get:
 *     summary: Get all attendance records for a course
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *         example: 2
 *     responses:
 *       200:
 *         description: List of attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 */
/**
 * @swagger
 * /attendance/course/{courseId}/student/{studentId}:
 *   get:
 *     summary: Get attendance records for a student in a course
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *         example: 2
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *         example: 5
 *     responses:
 *       200:
 *         description: Attendance records for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 */
//# sourceMappingURL=attendance.route.d.ts.map