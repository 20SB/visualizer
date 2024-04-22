const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    end_year: Number,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
});

// Create a model named 'Data' using the dataSchema
const Data = mongoose.model("Data", dataSchema);

// Export the 'Data' model to be used in other parts of the application
module.exports = Data;
