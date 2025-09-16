/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Student enrollment management routes
 */
export {};
/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         student:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             first_name:
 *               type: string
 *             email:
 *               type: string
 *         course:
 *           $ref: '#/components/schemas/Course'
 */
/**
 * @swagger
 * /enrollments/self:
 *   post:
 *     summary: Self-enroll a student in a course (requires student login)
 *     tags: [Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *             required:
 *               - course_id
 *     responses:
 *       201:
 *         description: Student enrolled successfully
 *       400:
 *         description: Invalid request (duplicate or outside enrollment period)
 *       404:
 *         description: Course not found
 */
/**
 * @swagger
 * /enrollments/admin:
 *   post:
 *     summary: Enroll a student in a course (Admin/Super Admin only)
 *     tags: [Enrollment]
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
 *             required:
 *               - student_id
 *               - course_id
 *     responses:
 *       201:
 *         description: Student enrolled successfully by Admin
 *       403:
 *         description: Forbidden (Admins only)
 *       404:
 *         description: Student or Course not found
 */
/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Remove a student from a course (Admin/Super Admin only)
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Student removed from course successfully
 *       404:
 *         description: Enrollment not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: List all enrollments
 *     tags: [Enrollment]
 *     responses:
 *       200:
 *         description: List of enrollments
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
 *                     $ref: '#/components/schemas/Enrollment'
 */
//# sourceMappingURL=enrollment.route.d.ts.map