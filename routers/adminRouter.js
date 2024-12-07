const express = require('express');
const Adoption = require('../models/adoptionModel');

const router = express.Router();

//secret key for jwt
const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret_key';

//middleware to verify admin authentication
const verifyToken = (req, res, next) => {
    const token = req.headers['Authorization'];
    if(!token) {
        return res.status(403).json({ message: 'No token rovided' });
    }

    JWT_SECRET.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.adminId = decoded.id;
        next();
    });
};

// Admin login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
});

router.get('/getall', async (req, res) => {
    try {
      const adoptionRequests = await Adoption.find();
      res.status(200).json(adoptionRequests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving adoption requests' });
    }
  });

// Admin dashboard route (protected)
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        // Example: Fetch data for the admin dashboard
        const stats = {
            totalUsers: 100, // Replace with actual query logic
            totalPets: 50, // Replace with actual query logic
        };

        res.status(200).json({ message: 'Dashboard data', stats });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
});

module.exports = router;