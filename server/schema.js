var mongoose = require('mongoose');
var mongodb = require('mongodb')
var mongoDB = 'mongodb://localhost/Handsonbooks';
var MongoClient = mongoDB.MongoClient;


var books= new mongoose.Schema({
  pdf:String,
  cover:String,
  title:String,
  author:String,
  genre:String,

  rating:String



})
var users=new mongoose.Schema({
  email:String,
  password:String,
  shelf:[String],
  quote:[String]
})
var books=mongoose.model('bookslists',books);
var users=mongoose.model('users',users);
module.exports={
 books:books,
 users:users
}
