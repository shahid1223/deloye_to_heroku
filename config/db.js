const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, () => {
            console.log("Connected to MongoDB successfully");
        })
    } catch (error) {
        console.error(error);
    };
};

module.exports = connectToMongo;