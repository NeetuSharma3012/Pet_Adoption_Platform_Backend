const express = require('express');

const PetModel = require('../models/PetModel');


const router = express.Router();

//add a new pet

router.post('/add', async (req, res) => {
    const petData = req.body; //Array of pets
    try{
        const savedPets = await PetModel.insertMany(petData);
        res.status(201).json({ message: 'Pets added successfully!', pets: savedPets });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add pets.', details: err.message });
    }
});

router.get('/getbyid/:id', async (req, res) => {
    const petId = req.params.id;

    try {
        const pet = await PetModel.findById(petId);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch pet details.', details: err.message });
    }
});


// router.post('/add', async (req,res) => {
//     const {title, description, imageUrl} = req.body;

//     try{
//         const newpet = new PetModel({title, description, imageUrl});
//         await newpet.save();
//         res.status(201).json({message: 'Pet added successfully!',pet: newpet });
//     }catch(err){
//         res.status(500).json({error: 'Failed to add pet.',details: err.message });
//     }

// });

// router.post('/add', async (req, res) => {
//     const { title, description, imageUrl } = req.body;

//     try {
//         // Attempt to create a new pet document
//         const newPet = new PetModel({ title, description, imageUrl });
//         await newPet.save();
//         res.status(201).json({ message: 'Pet added successfully!', pet: newPet });
//     } catch (err) {
//         // Log the error for debugging
//         console.error('Validation Error:', err.message);
//         if (err.name === 'ValidationError') {
//             // Respond with specific validation error messages
//             res.status(400).json({ error: 'Validation failed', details: err.errors });
//         } else {
//             // Handle general errors
//             res.status(500).json({ error: 'Failed to add pet.', details: err.message });
//         }
//     }
// });

//getall pets
router.get('/getall', async (req, res) => {
  try {
    const pets = await PetModel.find({ adopted: false});  // Only non-adopted pets
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});


router.delete('/delete/:id', (req, res) => {
    PetModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

router.put('/adopt/:id', async (req, res) => {
  try {
    const updatedPet = await PetModel.findByIdAndUpdate(req.params.id, { adopted: true }, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark pet as adopted' });
  }
});


router.get('/adopted', async (req, res) => {
  try {
    const adoptedPets = await PetModel.find({ adopted: true });
    res.json(adoptedPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching adopted pets' });
  }
});





module.exports = router;