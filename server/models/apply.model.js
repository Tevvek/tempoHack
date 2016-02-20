var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

module.exports = function() {
   var applySchema = new Schema({
      job: {type: ObjectId, ref: 'JobVacancyModel'},
      users: [{type: ObjectId, ref: 'User'},{type: Number, default: 0}]
  });
  mongoose.model('Apply', applySchema, 'applies');
};
