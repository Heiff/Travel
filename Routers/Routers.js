const { Router } = require('express');
const { PostTravel, GetTravel } = require('../Controller/Controller')
const router = Router()

router.post('/travel',PostTravel);
router.post('/',GetTravel)

module.exports = router