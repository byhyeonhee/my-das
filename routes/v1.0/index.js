const express = require('express');
const router = express.Router();

const users = require('./users');
const programs = require('./programs');
const todayPrograms = require('./todayPrograms');
const workWindow = require('./workWindow');


/* GET users listing. */

router.get('/', (req, res, next) => {
    res.send('can use /users, /programs, /todayPrograms, /workWindow')
});

router.use('/users', users);
router.use('/programs', programs);
router.use('/todayPrograms', todayPrograms);
router.use('/workWindow', workWindow);

module.exports = router;






