const mongoose = require('mongoose');

const url = "mongodb+srv://riyasharma:sharma16@cluster0.7reek.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";


//asynchroneous function - returns promise
mongoose.connect(url)
.then((result)=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log('error');
    
});

module.exports = mongoose;