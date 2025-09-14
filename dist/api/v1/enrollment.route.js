/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Student enrollment management routes
 */
export {};
/**
 * @swagger
 * /enrollments:
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
 *         description: Student enrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Enrollment'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Enrollment not found
 *       403:
 *         description: Forbidden (Admins only)
 */
//# sourceMappingURL=enrollment.route.js.map