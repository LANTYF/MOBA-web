module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise; 
  mongoose.connect('mongodb://localhost/test',{useMongoClient:true})

  require('require-all')(__dirname + '/../modules')
}