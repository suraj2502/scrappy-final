
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected successfully")
});
var ListSchema = new mongoose.Schema({
  title: String,
  link: String,
   description:{
    author: String,
    age:String,
    points: Number,
    comments: String,
    rank: Number
  }
 
});
module.exports = mongoose.model('List', ListSchema);