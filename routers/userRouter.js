const express = require('express');
const Model = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/authMiddlleware');


const router = express.Router();

router.post('/add' , async (req,res) => {
    console.log(req.body);

    new Model (req.body).save()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        if(err?.code === 11000){
            res.status(500).json({message: 'email already registered'});
        }
        else{
            res.status(500).json({message: 'Internal server error'})
        }
        
    });
    
    
});

router.get('/getall', (req, res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.post('/authenticate',(req,res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result) {
            //email and passward matched
            //generate token
            const {_id, email, password} = result;
            const payload = {userId: _id, email, password}

            const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';

            jwt.sign(
                payload,
                secretKey,
                { expiresIn: '1h' },
                (err,token) => {
                    if(err){
                        console.log(err);
                        
                        res.status(500).json({message: 'Error generating token'});
                    }else{
                        res.status(200).json({ token });
                    }
                }
            )
        }else{
            res.status(401).json({ message: 'Invalid credentials'});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: ' Internal server error'});
        
    });
});


router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});


// router.get('/me', async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
//     const user = await Model.findById(decoded.userId).select('-password');
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Failed to fetch user info' });
//   }
// });

// Only protect specific routes:
router.get('/me', verifyToken, (req, res) => {
    res.status(200).json(req.user);
  });


module.exports = router;