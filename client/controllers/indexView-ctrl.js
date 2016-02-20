var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope', '$http', function($scope,$http) {
	$scope.name = "Carles Puigdemont Casamajó";
	$scope.email = "socpresi@gironamola.cat";
	$scope.phoneNumber = "633849504";
	$scope.houseAddress = "Avinguda Josep Tarradellas, 19, Barcelona, 08029";
	$scope.tags = ""

	$http.get('http://localhost:8080/user/56c788a7f5e37750b493bc33').then(function(data, status, headers, config) {
		$scope.name = data.data.name;
		$scope.email = data.data.email;
		$scope.phoneNumber = data.data.phone;
		$scope.houseAddress = data.data.address;
		for(var i=0;i<data.data.tags.length;++i) {
			$scope.tags = $scope.tags + ' ' + data.data.tags[i]
			}
	}, function(error){
		console.log('ops');
	});
}]);