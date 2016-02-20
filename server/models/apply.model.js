var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

module.exports = function() {
   var applySchema = new Schema({
      job: {type: ObjectId, ref: 'JobVacancyModel'},
      userse: [{type: ObjectId, ref: 'User'}]
  });
  mongoose.model('Apply', applySchema, 'applies');
};
