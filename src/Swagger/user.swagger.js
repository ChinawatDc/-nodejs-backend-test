/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Get a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     tags:
 *       - Users
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   put:
 *     tags:
 *       - Users
 *     description: Update a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email address
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *
 */
