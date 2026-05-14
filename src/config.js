const mongoose = require('mongoose');
const uri = "mongodb+srv://amaanjamil6_db_user:hkdaNgUwshBWxyl1@cluster0.celpxdd.mongodb.net/?appName=Cluster0";
mongoose.connect(uri)

.then(() => console.log('databse connected'))
.catch((err) => console.log('database is not connected:', err))

module.exports = mongoose;
