/**
 * @swagger
 * tags:
 *   name: ServiceMember
 *   description: Service member management routes
 */
export {};
/**
 * @swagger
 * /service-members:
 *   get:
 *     summary: Get all service members
 *     tags: [ServiceMember]
 *     responses:
 *       200:
 *         description: List of service members
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
 *                     $ref: '#/components/schemas/ServiceMember'
 */
/**
 * @swagger
 * /service-members/{user_id}/{group_id}:
 *   get:
 *     summary: Get a service member by user ID and group ID
 *     tags: [ServiceMember]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: group_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Service member found
 *       404:
 *         description: Service member not found
 */
/**
 * @swagger
 * /service-members:
 *   post:
 *     summary: Add a new service member (Admin or Super Admin only)
 *     tags: [ServiceMember]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - group_id
 *               - service_role
 *             properties:
 *               user_id:
 *                 type: integer
 *               group_id:
 *                 type: integer
 *               sub_group_id:
 *                 type: integer
 *               service_role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service member created successfully
 *       403:
 *         description: Forbidden
 */
/**
 * @swagger
 * /service-members/{user_id}/{group_id}:
 *   put:
 *     summary: Update a service member (Admin or Super Admin only)
 *     tags: [ServiceMember]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: group_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_role:
 *                 type: string
 *               sub_group_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Service member updated successfully
 *       404:
 *         description: Service member not found
 *       403:
 *         description: Forbidden
 */
/**
 * @swagger
 * /service-members/{user_id}/{group_id}:
 *   delete:
 *     summary: Delete a service member (Super Admin only)
 *     tags: [ServiceMember]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: group_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Service member deleted successfully
 *       404:
 *         description: Service member not found
 *       403:
 *         description: Forbidden
 */
//# sourceMappingURL=service_member.route.d.ts.map