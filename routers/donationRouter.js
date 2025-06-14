const express = require('express');
const Razorpay = require('razorpay');
const DonationModel = require('../models/DonationModel');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post('/create-order', async (req, res) => {
  const { amount, donorName, donorEmail } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: 'receipt_order_' + Math.random(),
  };

  try {
    const order = await instance.orders.create(options);

    const donation = new DonationModel({
      donorName,
      donorEmail,
      amount,
      paymentId: order.id,
      status: 'Pending',
    });
    await donation.save();

    res.json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// Save donation record
router.post('/record', (req, res) => {
  const { userId, transactionId, amount } = req.body;
  DonationModel.create({ userId, transactionId, amount, date: new Date() })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: 'Failed to save donation' }));
});

// Get user donations
router.get('/user/:userId', (req, res) => {
  DonationModel.find({ userId: req.params.userId })
    .sort({ date: -1 })
    .then(donations => res.json(donations))
    .catch(err => res.status(500).json({ message: 'Failed to fetch donations' }));
});


module.exports = router;
