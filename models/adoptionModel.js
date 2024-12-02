const { Schema, model } = require('../connection');

const adoptionSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required:true,
    },

    phoneNumber: {
        type: Number,
        required: true,
    },

    details: {
        type:String,
        required: true,
    },

    submittedAt: {
        type:Date,
        default: Date.now,
    }
});

module.exports = model('adoption',adoptionSchema);