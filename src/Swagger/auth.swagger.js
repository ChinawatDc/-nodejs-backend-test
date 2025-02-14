/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication related operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Register a new user with their email, password, and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, email is already registered
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login to the application
 *     description: Login using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/request-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Request OTP for password change
 *     description: Request an OTP to change the user's password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *     responses:
 *       200:
 *         description: OTP sent successfully to email
 *       400:
 *         description: Bad request, invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     tags: [Auth]
 *     summary: Change the user's password using OTP
 *     description: Change the user's password after verifying OTP, new password, and confirm password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               otp:
 *                 type: string
 *                 description: OTP sent to email for verification
 *               password:
 *                 type: string
 *                 description: The user's old password
 *               confirmPassword:
 *                 type: string
 *                 description: The confirmation of the new password
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request, invalid data or passwords do not match
 *       404:
 *         description: User not found or OTP invalid
 *       500:
 *         description: Internal server error
 */
