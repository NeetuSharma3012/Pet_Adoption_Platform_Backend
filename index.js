const express = require('express');
const userRout = require('./routers/userRouter');
const petRout = require('./routers/petRouter')
const cors = require('cors');

//creating an express app

const app = express();

const port = 5001;

//middleware

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(express.json());
app.use('/user', userRout);
app.use('/pets', petRout );

//route or endpoint
app.get('/',(req, res) => {
    res.send('response from  new express');
})

app.get('/add', (req, res) => {
    res.send('response from add');
})


app.get('/getall', (req, res) => {
    res.send('response from getall');
})

app.get('/delete', (req, res) => {
    res.send('response from delete');
})


//starting the server

app.listen(port,() => {console.log('server start'); })