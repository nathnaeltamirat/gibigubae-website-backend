/**
 * @swagger
 * tags:
 *   name: AcademicInfo
 *   description: Student academic information management
 */
export {};
/**
 * @swagger
 * /academic-info:
 *   post:
 *     summary: Add or update student academic info
 *     tags: [AcademicInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - departmentId
 *             properties:
 *               studentId:
 *                 type: integer
 *               departmentId:
 *                 type: integer
 *               year:
 *                 type: string
 *               dorm_block:
 *                 type: string
 *               room_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Academic info added or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/AcademicInfo'
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Student or department not found
 */
/**
 * @swagger
 * /academic-info/{studentId}:
 *   get:
 *     summary: Get academic info by student ID
 *     tags: [AcademicInfo]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: Academic info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/AcademicInfo'
 *       404:
 *         description: Academic info not found
 */
//# sourceMappingURL=academic_info.route.js.map