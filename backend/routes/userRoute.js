const express = require('express');
const { loginUser, registerUser } = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
const taskRoute = require('./taskRoute')

const router = express.Router();


router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
// Use the taskRoute router for the /api/tasks route
router.use('/api/tasks', authMiddleware, taskRoute);

// router.route('/api/tasks')
//   .get(authMiddleware, (req, res) => {
//     // Access the authenticated user via req.user
//     const user = req.user;
//     res.json({ message: 'Access to protected route granted', user });
//   });

module.exports = router