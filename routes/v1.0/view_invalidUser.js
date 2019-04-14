const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('this is invalid view');
    //res.send(['this is invalid view'])
    res.sendResult(['this is invalid view']);
})

module.exports = router;






