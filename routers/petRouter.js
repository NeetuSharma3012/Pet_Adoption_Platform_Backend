const express = require('express');

const PetModel = require('../models/PetModel');


const router = express.Router();

//add a new pet
router.post('/add', async (req,res) => {
    const {title, description, imageUrl} = req.body;

    try{
        const newpet = new PetModel({title, description, imageUrl});
        await newpet.save();
        res.status(201).json({message: 'Pet added successfully!',pet: newpet });
    }catch(err){
        res.status(500).json({error: 'Failed to add pet.',details: err.message });
    }
    
});

//getall pets
router.get('/getall',async(req,res) => {
    try{
        const pets = await PetModel.find();
        res.status(200).json(pets);
    }catch(err){
        res.status(500).json({error: err.message});
    }
    
});

module.exports = router;