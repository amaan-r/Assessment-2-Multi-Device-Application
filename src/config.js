const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/musicPortal";
mongoose.connect(uri)

.then(() => console.log('databse connected'))
.catch (() => console.log('database is not connected'))

module.exports = mongoose;

