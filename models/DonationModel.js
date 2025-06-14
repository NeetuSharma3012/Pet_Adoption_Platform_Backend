const { Schema, model } = require('../connection');  

const DonationSchema = new Schema({
    donerName: String,
    donarEmail: String,
    amount: Number,
    paymentId: String,
    status: {type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now},
});

module.exports = model('donations', DonationSchema);