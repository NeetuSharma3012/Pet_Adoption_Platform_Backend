
const { Schema, model } = require('../connection');

const PetSchema = new Schema({
    
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
    
});

module.exports = model('pets', PetSchema);