require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = `${process.env.MONGODB_URI}visualizer-project`;

mongoose.connect(mongoURI, {});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on("error", function (err) {
    console.log(err.message);
});

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Use express router for routing
app.use("/", require("./routes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
