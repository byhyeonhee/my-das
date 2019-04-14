const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('this is topUser view');
    res.sendResult('this is topUser view');
})

module.exports = router;






