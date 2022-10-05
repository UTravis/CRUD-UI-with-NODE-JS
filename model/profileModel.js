const mongoose = require('mongoose')
const schema = mongoose.Schema;

const profileSchema = new schema({
    name : { type : String, required : true },
    email : { type : String, required : true },
    gender : { type : String, required : true },
    phone : { type : Number, required : true }
}, {timestamps : true});

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;