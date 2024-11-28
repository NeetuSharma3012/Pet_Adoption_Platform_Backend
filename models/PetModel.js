
const { Schema, model } = require('../connection');

const PetSchema = new Schema({
    name : { type : String, required: true },
    breed: { type : String, required: true },
    age: { type : Number, required: true},
    description: { type : String}
    
});

module.exports = model('pets', PetSchema);