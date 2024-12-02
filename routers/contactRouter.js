const express = require('express');
const Contact = require('../models/contactModel'); // Import your contact model

const router = express.Router();

// Route to handle contact form submission
router.post('/submit', async (req, res) => {
  try {
    const { firstName,lastName, email, phoneNumber, details  } = req.body;

    if (!firstName || !lastName || !email ||  !phoneNumber || !details ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({ firstName,lastName, email, details, phoneNumber });
    await newContact.save();

    res.status(200).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getall', (req, res) => {
    Contact.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;
