
const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    name : {type: String, require: true},
    email : {type: String, require: true,unique:true},
    password:
})