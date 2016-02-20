var models = ['./user.model.js', './jobVacancy.model.js', './apply.model.js'];
exports.initialize = function() {
  models.forEach(function(model){
    require(model)();
  });
};