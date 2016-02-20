var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope','$http', function($scope,$http) {
	$http.get('http://localhost:8080/user/56c835f9660eafedb99a409c/jobs').then(function(data, status, headers, config) {
		// do stuff
		console.log(data)
		console.log(status)
		//$scope.offers = res.data.content;
	}, function(error){
		console.log('ops');
	});
}]);