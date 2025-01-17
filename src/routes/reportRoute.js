const express = require("express");
const { getHistoryCircuit } = require("../controllers/reportController");
const router = express.Router();


router.get("/generate", getHistoryCircuit);


module.exports = router;
