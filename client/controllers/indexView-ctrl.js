var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope', function($scope) {
	$scope.name = "Carles Puigdemont Casamajó";
	$scope.email = "socpresi@gironamola.cat";
	$scope.phoneNumber = "633849504";
	$scope.houseAddress = "Avinguda Josep Tarradellas, 19, Barcelona, 08029";
}]);