const mongoose = require('mongoose');
const loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model("users", loginschema);

