/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management routes
 */
export {};
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
 *               code:
 *                 type: string
 *                 description: Optional code for attendance marking
 *               start_in_minutes:
 *                 type: integer
 *                 description: Minutes from now when class starts
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
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
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
 *               course_id:
 *                 type: integer
 *               code:
 *                 type: string
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
 *               status:
 *                 type: string
 *                 enum: [present, late, absent]
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
//# sourceMappingURL=attendance.route.js.map