/**
 * @swagger
 * tags:
 *   name: ServiceSubGroups
 *   description: APIs for managing service sub-groups
 */
export {};
/**
 * @swagger
 * /service-sub-groups:
 *   get:
 *     summary: List all service sub-groups
 *     tags: [ServiceSubGroups]
 *     responses:
 *       200:
 *         description: List of service sub-groups
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
 *                     $ref: '#/components/schemas/ServiceSubGroup'
 */
/**
 * @swagger
 * /service-sub-groups/{id}:
 *   get:
 *     summary: Get a service sub-group by ID
 *     tags: [ServiceSubGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sub-group ID
 *     responses:
 *       200:
 *         description: Service sub-group data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ServiceSubGroup'
 *       404:
 *         description: Sub-group not found
 */
/**
 * @swagger
 * /service-sub-groups:
 *   post:
 *     summary: Create a new service sub-group (Admin only)
 *     tags: [ServiceSubGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - name
 *               - description
 *             properties:
 *               serviceId:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               president:
 *                 type: integer
 *               vice_president:
 *                 type: integer
 *               secretary:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sub-group created successfully
 *       403:
 *         description: Forbidden (only Admin or Super Admin)
 *       404:
 *         description: Parent service group not found
 */
/**
 * @swagger
 * /service-sub-groups/{id}:
 *   put:
 *     summary: Update a service sub-group (Admin only)
 *     tags: [ServiceSubGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sub-group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               president:
 *                 type: integer
 *               vice_president:
 *                 type: integer
 *               secretary:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sub-group updated successfully
 *       403:
 *         description: Forbidden (only Admin or Super Admin)
 *       404:
 *         description: Sub-group not found
 */
/**
 * @swagger
 * /service-sub-groups/{id}:
 *   delete:
 *     summary: Delete a service sub-group (Super Admin only)
 *     tags: [ServiceSubGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sub-group ID
 *     responses:
 *       200:
 *         description: Sub-group deleted successfully
 *       403:
 *         description: Forbidden (only Super Admin)
 *       404:
 *         description: Sub-group not found
 */ 
//# sourceMappingURL=service_sub_group.route.d.ts.map