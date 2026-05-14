const mongoose = require('mongoose');
const uri = "";
mongoose.connect(uri)

.then(() => console.log('databse connected'))
.catch((err) => console.log('database is not connected:', err))

module.exports = mongoose;
