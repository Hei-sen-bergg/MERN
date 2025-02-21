const express = require("express");
const router = express.Router();
const { getAllMobiles, getMobileById, createMobile, updateMobile, deleteMobile, searchMobile } = require("../controller/mobileController");
const validateMiddleware = require("../middleware/validateMiddleware");


router.get('/search', searchMobile); // Search route should come before /:id route
router.get('/', getAllMobiles); // Get all mobiles
router.get('/:id', getMobileById); // Get mobile by ID (should be after /search)
router.post('/', createMobile); // Create new mobile
router.put('/:id',validateMiddleware, updateMobile); // Upd,te mobile by ID
router.delete('/:id', deleteMobile); // Delete mobile by ID

module.exports = router;



