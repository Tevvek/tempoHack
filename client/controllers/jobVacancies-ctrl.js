var App = angular.module('tempoTeamApp', []);

App.controller('nuevaAppCtrl', ['$scope','$http', function($scope,$http) {
	$scope.offers = []
	
	$http.get('http://localhost:8080/user/56c835f9660eafedb99a409c/jobs').then(function(data, status, headers, config) {
		for (var i=0;i<data.data.length; ++i) {
			var offer = {
				labelnaam: data.data[i].content.labelnaam[0],
				plaats:  data.data[i].content.werklocatie[0].plaats[0],
				aantalurenperweek:  data.data[i].content.aantalurenperweek[0],
				publicatiedatum:  data.data[i].content.publicatiedatum[0]
			};
			console.log(offer)
			$scope.offers.push(offer);
		}
	}, function(error){
		console.log('ops');
	});
}]);