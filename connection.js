const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load env variables from .env

const url = process.env.MONGO_URL;  // Use the env variable


//asynchroneous function - returns promise
mongoose.connect(url)
.then((result)=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log('error');
    
});

module.exports = mongoose;