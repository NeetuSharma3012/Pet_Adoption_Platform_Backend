const express = require('express');

const PetModel = require('../models/PetModel');


const router = express.Router();

//add a new pet
router.post('/add',async(req,res) => {
    try{
        const pet = new PetModel(req.body);
        await pet.save();
        res.status(201).json(pet);
    }catch(err){
        res.status(500).json({error: err.message});
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