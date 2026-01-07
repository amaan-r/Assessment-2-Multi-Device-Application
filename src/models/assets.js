const mongoose = require('mongoose');
const assetschema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String
    },
    link: {
        type:String,
        required: true
    },
    category: {
        type:String,
        enum:["Code","Visual","Audio"],
        required: true
    },
    createdAt:
    {
        type:Date, 
        default:Date.now
    },
    creator:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    creatorName: String
});

module.exports= mongoose.model("Asset", assetschema);

