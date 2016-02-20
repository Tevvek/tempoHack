var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope', function($scope,$http) {
	$http.get('http://localhost:8080/user/id/jobs').then(function(res) {
		// do stuff
	}, function(error){
		console.log('ops');
	});
}]);