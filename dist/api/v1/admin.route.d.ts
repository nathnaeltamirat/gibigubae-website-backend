/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin and Super Admin management routes
 */
export {};
/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all students (filter by verification status)
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: verified
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Optional filter by verification status
 *     responses:
 *       200:
 *         description: List of students
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
 *                     $ref: '#/components/schemas/Student'
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Update student information
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               father_name:
 *                 type: string
 *               grand_father_name:
 *                 type: string
 *               christian_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /admin/{id}/role:
 *   put:
 *     summary: Change student role
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: New role for the student
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /admin/{id}/verify:
 *   put:
 *     summary: Verify or unverify a student
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_verified:
 *                 type: boolean
 *                 description: Set verification status
 *     responses:
 *       200:
 *         description: Verification status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       403:
 *         description: Forbidden (Admins only)
 */
/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete a student (Super Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
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
 *         description: Student not found
 *       403:
 *         description: Forbidden (Super Admin only)
 */
//# sourceMappingURL=admin.route.d.ts.map