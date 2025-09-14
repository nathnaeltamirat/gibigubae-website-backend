/**
 * @swagger
 * tags:
 *   name: ServiceGroup
 *   description: Service group management routes
 */
export {};
/**
 * @swagger
 * /service-groups:
 *   get:
 *     summary: Get all service groups
 *     tags: [ServiceGroup]
 *     responses:
 *       200:
 *         description: List of service groups
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
 *                     $ref: '#/components/schemas/ServiceGroup'
 */
/**
 * @swagger
 * /service-groups/{id}:
 *   get:
 *     summary: Get a service group by ID
 *     tags: [ServiceGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service group found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ServiceGroup'
 *       404:
 *         description: Service group not found
 */
/**
 * @swagger
 * /service-groups:
 *   post:
 *     summary: Create a new service group (Admin only)
 *     tags: [ServiceGroup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceGroupInput'
 *     responses:
 *       201:
 *         description: Service group created successfully
 *       403:
 *         description: Forbidden (Only Admin)
 */
/**
 * @swagger
 * /service-groups/{id}:
 *   put:
 *     summary: Update a service group (Admin only)
 *     tags: [ServiceGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceGroupInput'
 *     responses:
 *       200:
 *         description: Service group updated successfully
 *       403:
 *         description: Forbidden (Only Admin)
 *       404:
 *         description: Service group not found
 */
/**
 * @swagger
 * /service-groups/{id}:
 *   delete:
 *     summary: Delete a service group (Admin only)
 *     tags: [ServiceGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service group deleted successfully
 *       403:
 *         description: Forbidden (Only Admin)
 *       404:
 *         description: Service group not found
 */ 
//# sourceMappingURL=service_group.route.d.ts.map