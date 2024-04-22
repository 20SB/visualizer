const express = require("express");
const Data = require("../models/DataModel");
const router = express.Router();

// GET all data
router.get("/data", async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all data
router.post("/data", async (req, res) => {
    try {
        const data = await Data.create(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
