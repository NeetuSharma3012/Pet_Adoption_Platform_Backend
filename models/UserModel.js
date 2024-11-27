const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type : String, unique: true },
    passward: {type: String, required: true}
    
});

module.exports = model('users', mySchema);