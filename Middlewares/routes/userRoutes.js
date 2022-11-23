const express= require('express');
const router= express.Router();
const { createUser, viewUsers }= require('../../Controllers/manageUsers')

router.post('/users', createUser);
router.get('/users',viewUsers)

module.exports= router;