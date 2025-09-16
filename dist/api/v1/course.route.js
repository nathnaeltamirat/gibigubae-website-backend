/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course management routes
 */
export {};
/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         course_name:
 *           type: string
 *         description:
 *           type: string
 *         enrollment_start_date:
 *           type: string
 *           format: date-time
 *         enrollment_deadline:
 *           type: string
 *           format: date-time
 *         start_date:
 *           type: string
 *           format: date-time
 *         end_date:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course (Admin/Super Admin only)
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *               description:
 *                 type: string
 *               enrollment_start_date:
 *                 type: string
 *                 format: date-time
 *               enrollment_deadline:
 *                 type: string
 *                 format: date-time
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - course_name
 *               - description
 *               - enrollment_start_date
 *               - enrollment_deadline
 *               - start_date
 *               - end_date
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: List of courses
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
 *                     $ref: '#/components/schemas/Course'
 */
/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course (Admin/Super Admin only)
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *               description:
 *                 type: string
 *               enrollment_start_date:
 *                 type: string
 *                 format: date-time
 *               enrollment_deadline:
 *                 type: string
 *                 format: date-time
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course (Admin/Super Admin only)
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
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
 *         description: Course not found
 *       403:
 *         description: Forbidden (Admins only)
 */
//# sourceMappingURL=course.route.js.map