/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */
export {};
/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               fatherName:
 *                 type: string
 *               grandFatherName:
 *                 type: string
 *               christianName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               departmentName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               idCard:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in a student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *             oneOf:
 *               - required: [email]
 *               - required: [phoneNumber]
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
//# sourceMappingURL=auth.route.js.map