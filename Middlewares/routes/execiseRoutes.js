const express= require('express');
const router= express.Router();
const SaveExercise= require('../../Controllers/manageExercises')

router.post('/users/:_id/exercises', SaveExercise);


module.exports= router;