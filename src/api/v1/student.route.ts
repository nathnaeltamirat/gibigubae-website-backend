/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student routes
 */
/**
 * @swagger
 * /students/me:
 *   get:
 *     summary: Get the logged-in student's profile
 *     tags: [Student]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Returns the student profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     first_name:
 *                       type: string
 *                     father_name:
 *                       type: string
 *                     grand_father_name:
 *                       type: string
 *                     christian_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     id_card_image_path:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
/**
 * @swagger
 * /students/me:
 *   put:
 *     summary: Update the logged-in student's profile
 *     tags: [Student]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               id_card:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Student profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     first_name:
 *                       type: string
 *                     father_name:
 *                       type: string
 *                     grand_father_name:
 *                       type: string
 *                     christian_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     id_card_image_path:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: auth_token
 */
