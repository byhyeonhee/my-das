const express = require('express');
const router = express.Router();

const users = require('./users');
const programs = require('./programs');

/* GET users listing. */

router.get('/', (req, res, next) => {
    res.send('can use /users, /programs')
})

router.use('/users', users); 
router.use('/programs', programs); 

module.exports = router;






