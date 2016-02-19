var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

module.exports = function() {
   var userSchema = new Schema({
    name: {type: String},
    password: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String},
    tags: [{type: String}],
    pic: {type: ObjectId, ref: 'Picture'},
    cv: {type: ObjectId, ref: 'Cv'}
  });

  mongoose.model('User', userSchema, 'users');
};
