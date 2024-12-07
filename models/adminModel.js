const {Schema, model } = require('../connection');

AdminSchema = new Schema({
    username: { type: String, required: true, unique: true},
    passward: { type: String, required: true},
});

module.exports = model('admin', AdminSchema);