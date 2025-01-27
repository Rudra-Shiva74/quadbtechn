const mongoose = require("mongoose");
const URL = "mongodb+srv://quadbtechn:wEL36xOt4v2SXKCZ@cluster0.rriav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = async () => {
    try {
        await mongoose.connect(URL);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb;