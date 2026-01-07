const mongoose = require('mongoose');
const uri = "mongodb+srv://Tester:tester12345@cluster0.2osua9n.mongodb.net/?appName=Cluster0";
mongoose.connect(uri)

.then(() => console.log('databse connected'))
.catch (() => console.log('database is not connected'))

module.exports = mongoose;

