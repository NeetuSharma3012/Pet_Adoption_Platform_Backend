const { Schema, model } = require('../connection');

const UserSchema = new Schema({
    name: String,
    email: { type : String, unique: true },
    password: {type: String, required: true,minlength: 8},
    
});

module.exports = model('users', UserSchema);