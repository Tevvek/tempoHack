var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope', function($scope) {
	$scope.name = "Carles Puigdemont Casamajó";
	$scope.email = "socpresi@gironamola.cat";
	$scope.phoneNumber = "633849504";
	$scope.houseAddress = "Avinguda Josep Tarradellas, 19, Barcelona, 08029";

	$http.get('http://localhost:8080/user/56c835f9660eafedb99a409c/jobs').then(function(data, status, headers, config) {
		$scope.name = data.name;
		$scope.email = data.email;
		$scope.phoneNumber = data.phone;
		$scope.houseAddress = data.address;
		}
	}, function(error){
		console.log('ops');
	});
}]);