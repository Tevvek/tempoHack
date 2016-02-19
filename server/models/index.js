var models = [ './user.model.js'];
exports.initialize = function() {
  models.forEach(function(model){
    require(model)();
  });
};