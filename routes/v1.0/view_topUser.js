const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('this is topUser view');
    res.send(['this is topUser view'])
})

module.exports = router;






