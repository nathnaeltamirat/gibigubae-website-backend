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
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         first_name:
 *           type: string
 *           example: "John"
 *         father_name:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 *
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         course_name:
 *           type: string
 *           example: "Intro to Theology"
 *
 *     Attendance:
 *       type: object
 *       properties:
 *         attendance_id:
 *           type: integer
 *           example: 101
 *         student:
 *           $ref: '#/components/schemas/Student'
 *         status:
 *           type: string
 *           enum: [present, late, absent]
 *           example: "present"
 *
 *     AttendanceSession:
 *       type: object
 *       properties:
 *         session_id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: "XYZ123"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-11-28T13:53:07.222Z"
 *         attendances:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attendance'
 */
/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: Create attendance session for a course (Admin / Super Admin only)
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
 *                 example: "XYZ123"
 *               start_in_minutes:
 *                 type: integer
 *                 example: 10
 *             required:
 *               - course_id
 *               - code
 *               - start_in_minutes
 *     responses:
 *       201:
 *         description: Attendance session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 session_id:
 *                   type: integer
 *                   example: 1
 *                 attendances:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       403:
 *         description: Forbidden (Admins only)
 *       400:
 *         description: Missing required fields or no students enrolled
 *       404:
 *         description: Course not found
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
 *         example: 5
 *       - in: query
 *         name: attendance_id
 *         schema:
 *           type: integer
 *         required: true
 *         example: 101
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
 *       400:
 *         description: Missing required parameters
 *       404:
 *         description: Attendance record not found
 */
/**
 * @swagger
 * /attendance/mark/code:
 *   post:
 *     summary: Mark attendance using session code
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
 *               attendance_id:
 *                 type: integer
 *                 example: 101
 *               code:
 *                 type: string
 *                 example: "XYZ123"
 *             required:
 *               - student_id
 *               - attendance_id
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
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Invalid code or attendance record not found
 */
/**
 * @swagger
 * /attendance/manual:
 *   put:
 *     summary: Manually update attendance (Admin / Super Admin only)
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
 *                 example: 101
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
 *       400:
 *         description: Missing required fields or invalid status
 *       403:
 *         description: Forbidden (Admins only)
 *       404:
 *         description: Attendance not found
 */
/**
 * @swagger
 * /attendance/session/{sessionId}:
 *   get:
 *     summary: Get all attendance records for a session
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: List of attendance records for the session
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
 *       400:
 *         description: Missing sessionId
 */
/**
 * @swagger
 * /attendance/course/{course_id}/student/{student_id}:
 *   get:
 *     summary: Get attendance for a student in a course
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Attendance records for the student in the course
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
 *       400:
 *         description: Missing course_id or student_id
 */
/**
 * @swagger
 * /attendance/course/{course_id}/sessions:
 *   get:
 *     summary: Get all attendance sessions and student attendance for a course
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: List of attendance sessions with all student attendance
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
 *                     $ref: '#/components/schemas/AttendanceSession'
 *       400:
 *         description: Missing course_id
 */
//# sourceMappingURL=attendance.route.d.ts.map