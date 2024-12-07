const express = require("express");
const Adoption = require('../models/adoptionModel');
const PetModel = require("../models/PetModel");

const router = express.Router();

router.post('/submit', async (req, res) => {
    try{
        const { fullName, email, phoneNumber, details, petId, petTitle, petImage } = req.body;

        if( !fullName || !email || !phoneNumber || !details || !petId || !petTitle || !petImage) {
            return res.status(400).json({ message: 'All fields are required'});
        }

        const newRequest = new Adoption({ 
            fullName,
             email, 
             phoneNumber, 
             details, 
             petId,
             petTitle, 
             petImage
             });
             
        await newRequest.save();

        // const pet = await PetModel.findById(petId);
        // if(!pet) {
        //     return res.status(404).json({ message: 'Pet not found' });
        // }

        // //create and save the adoption request
        // const newRequest = new Adoption({
        //     fullName,
        //     email,
        //     phoneNumber,
        //     details,
        //     pet: petId, //link the request to the pet
        // });
        // await newRequest.save();

        res.status(200).json({ message: 'Form submitted successfully'});
    } catch (err) {
        console.error('Error occurred:' ,err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.get('/getall', (req, res) => {
    Adoption.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;

