const  mongoose = require('mongoose'); // Import Mongoose library for MongoDB interaction

const connectDB = async () => {  //wait for connection to be established
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            //useNewUrlParser: true,
           // useUnifiedTopology: true,
        });

        // debugging message to confirm connection
        console.log("MongoDB connected successfully");

    } catch (error) { // catch any connection errors
        console.error("MongoDB connection error:", error);
    }
} // mimimum connection code for database

module.exports = connectDB; // Export the connectDB function for use in other files