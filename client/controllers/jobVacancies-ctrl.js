var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope','$http', function($scope,$http) {
	$http.get('http://localhost:8080/user/56c849f20e0a9de465f80695/jobs').then(function(res) {
		// do stuff
		//$scope.offers = res;
		console.log(res.data);
	}, function(error){
		console.log('ops');
	});
}]);