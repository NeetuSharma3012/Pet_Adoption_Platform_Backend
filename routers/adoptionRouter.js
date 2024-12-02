const express = require("express");
const Adoption = require('../models/adoptionModel');

const router = express.Router();

router.post('/submit', async (req, res) => {
    try{
        const { fullName, email, phoneNumber, details } = req.body;

        if( !fullName || !email || !phoneNumber || !details ) {
            return res.status(400).json({ message: 'All fields are required'});
        }

        const newRequest = new Adoption({ fullName, email, phoneNumber, details });
        await newRequest.save();

        res.status(200).json({ message: 'Form submitted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.get('/getall', (req, res) => {
    Adoption.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;

