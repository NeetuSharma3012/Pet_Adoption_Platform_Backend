const { Schema, model } = require('../connection');  // Ensure your connection.js file is correct

const PetSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    breed: { type: String, required: false }, // Add breed
    detailedDescription: { type: String, required: false }, // Add detailedDescription
    adopted: { type: Boolean, default: false },
});

module.exports = model('pets', PetSchema);