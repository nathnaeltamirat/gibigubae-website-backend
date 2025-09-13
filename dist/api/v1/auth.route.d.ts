/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */
export {};
/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Register a new student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - father_name
 *               - grand_father_name
 *               - christian_name
 *               - email
 *               - password
 *               - gender
 *               - department_name
 *               - phone_number
 *               - id_card
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
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               department_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               id_card:
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
 * /sign-in:
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
 *               phone_or_email:
 *                 type: string
 *                 description: User phone number or email (either required)
 *               password:
 *                 type: string
 *                 description: User password
 *             required:
 *               - password
 *             oneOf:
 *               - required: [email]
 *               - required: [phone_number]
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
//# sourceMappingURL=auth.route.d.ts.map