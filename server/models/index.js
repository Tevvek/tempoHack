var models = ['./user.model.js', './jobVacancy.model.js'];
exports.initialize = function() {
  models.forEach(function(model){
    require(model)();
  });
};