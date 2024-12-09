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

        

        res.status(200).json({ message: 'Form submitted successfully'});
    } catch (err) {
        console.error('Error occurred:' ,err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.get('/getall', async (req, res) => {
    Adoption.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });

    // try {
    //     const adoptionRequests = await Adoption.aggregate([
    //         {
    //             $lookup: {
    //                 from: 'pets', // Collection name in the database
    //                 localField: 'petId', // Field in the adoption schema
    //                 foreignField: '_id', // Field in the pet schema
    //                 as: 'petDetails', // Output array field name
    //             },
    //         },
    //         {
    //             $unwind: '$petDetails', // Flatten the pet details
    //         },
    //         {
    //             $project: {
    //                 fullName: 1,
    //                 email: 1,
    //                 phoneNumber: 1,
    //                 details: 1,
    //                 submittedAt: 1,
    //                 'petDetails.title': 1,
    //                 'petDetails.imageUrl': 1,
    //             },
    //         },
    //     ]);
    //     res.status(200).json(adoptionRequests);
    // } catch (err) {
    //     res.status(500).json({ error: 'Failed to fetch adoption requests.', details: err.message });
    // }
});

router.delete('/delete/:id', (req, res) => {
    Adoption.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;

