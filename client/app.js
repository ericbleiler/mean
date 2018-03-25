var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'templates/list.html',
			controller:'empController'
		})
		.when('/employees', {
			templateUrl:'templates/list.html',
			controller:'empController'
		})
		.when('/employees/create', {
			templateUrl:'templates/add.html',
			controller:'empController'
		})
		.when('/employees/queue', {
			templateUrl:'templates/queue.html',
			controller:'empController'
		})
		.when('/employees/createGenre', {
			templateUrl:'templates/addGenre.html',
			controller:'empController'
		})
		.when('/employees/createChart', {
			templateUrl:'templates/addChart.html',
			controller:'empController'
		})
		.when('/employees/createPlaylist', {
			templateUrl:'templates/addPlaylist.html',
			controller:'empController'
		})
		.when('/employees/createMusic', {
			templateUrl:'templates/addMusic.html',
			controller:'empController'
		})
		.when('/employees/createArtist', {
			templateUrl:'templates/addArtist.html',
			controller:'empController'
		})
		.when('/employees/createAlbum', {
			templateUrl:'templates/addAlbum.html',
			controller:'empController'
		})
		.when('/employees/:id/edit', {
			templateUrl:'templates/edit.html',
			controller:'empController'
		})
		.when('/employees/:id/show', {
			templateUrl:'templates/show.html',
			controller:'empController'
		})
		.when('/employees/:id/playlist', {
			templateUrl:'templates/playlist.html',
			controller:'empController'
		})
		.when('/employees/:id/artist', {
			templateUrl:'templates/artist.html',
			controller:'empController'
		})
		.when('/employees/:id/radio', {
			templateUrl:'templates/radio.html',
			controller:'empController'
		})
		.when('/employees/:id/savedAlbums', {
			templateUrl:'templates/savedAlbums.html',
			controller:'empController'
		})
		.when('/employees/:id/savedArtists', {
			templateUrl:'templates/savedArtists.html',
			controller:'empController'
		})
		.when('/employees/music/:id/album', {
			templateUrl:'templates/album.html',
			controller:'empController'
		})
		.when('/employees/:id/search', {
			templateUrl:'templates/search.html',
			controller:'empController'
		});
});
