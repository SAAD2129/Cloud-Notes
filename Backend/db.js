const mongoose = require("mongoose");
const mongoURI = 'mongodb://localhost/iNotebook';

const ConnectDb = () => {
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Data Base")
    })
};

module.exports = ConnectDb;
