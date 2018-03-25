myApp.controller('empController', function($scope,$route,$routeParams,$http){
	$scope.get = function(){
		$http.get('/api/employees/').then(function(response){
			$scope.employees = response.data;
		});
		$http.get('/playlists').success(function(response) {
    		$scope.playlists = response;
    		$scope.play = "";
  		});
		
		$http.get('/genres').success(function(response) {   

			$scope.genres = response;
			});
		$http.get('/charts').success(function(response) {   

			$scope.charts = response;
		});
	
		
};

var refresh = function(id) {
  	$http.get('/api/employees/' + id).then(function(response){
			$scope.employees = response.data;
		});

	$http.get('/playlists').success(function(response) {
    	$scope.playlists = response;
    	$scope.play = "";
  	});
	$http.get('/music/' + id).then(function(response){
		$scope.music = response.data;
	});
	$http.get('/songs/' + id).then(function(response){
			$scope.songs = response.data;
		});
	$http.get('/artists/' + id).then(function(response){
		$scope.artists = response.data;
	});
	$http.get('/savedArtists/' + id).then(function(response){
		$scope.savedArtists = response.data;
	});
  	$http.get('/albums/' + id).then(function(response){
		$scope.albums = response.data;
		
	});
	$http.get('/related/' + id).then(function(response){
		$scope.related = response.data;
	});
	$http.get('/artistRating/' + id).then(function(response){
		$scope.artistRating = response.data

		for(i = 0; i < $scope.artistRating.rating;i++){
			document.getElementById('star').innerHTML += "<img src='images/star.png' height='50' width='50'/>";
		}
	});
	$http.get('/artistComments/' + id).then(function(response){
		$scope.Comments = response.data;
	});

	
};

		refresh("");
		
var album = function(id) {
	$http.get('/music/music/' + id).then(function(response){
		$scope.music = response.data;
	});
		$http.get('/music/albums/' + id).then(function(response){
		$scope.albums = response.data;
		var a = document.getElementById('back');
		var image = "images/" + id + ".jpeg";	
		a.style.background = '#c62828';
		a.style.backgroundImage = "url('"+image+"')";
		a.style.opacity      = 0.7;
		a.style.blur      = 0.5;

		var elements = document.getElementsByClassName('songs');
    		for (var i = 0; i < elements.length; i++) {
        		elements[i].style.color='#FFFFFF';
    		}
		var length = document.getElementsByClassName('length');
    		for (var i = 0; i < length.length; i++) {
        		length[i].style.color='#FFFFFF';
    		}
    			var artists = document.getElementsByClassName('artist');
    		for (var i = 0; i < artists.length; i++) {
        		artists[i].style.color='#FFFFFF';
    		}
    		
	});
}
	$scope.playlist = function(){
		var id = $routeParams.id;		
		refresh(id);
	};
	$scope.artist = function(){
		var id = $routeParams.id;
		refresh(id);
		if(document.getElementById("field").value != ""){
			document.getElementById("save").value == "Saved";
		};

	};
	$scope.album = function(){
		var id = $routeParams.id;
		album(id);
	};
	$scope.savedAlbums = function(){
	$http.get('/api/employees/savedAlbums/').then(function(response){
		$scope.savedAlbums = response.data;
	});
	};
	$scope.savedArtists = function(){
	$http.get('/api/employees/savedArtists/').then(function(response){
		$scope.savedArtists = response.data;
					console.log(response.data);

	});
	};
	$scope.queue = function(){
		$http.get('/api/employees/queue/').then(function(response){
		$scope.queue = response.data;
	});
	};
	$scope.show = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/'+ id).then(function(response){
			$scope.employee = response.data;
		});
	};
	$scope.radio = function(){
		var id = $routeParams.id;
		$http.get('/radio/'+ id).then(function(response){
			$scope.radio = response.data;
		});
	};
	$scope.search = function(){
		var id = $routeParams.id;
		$http.get('/search/' + id).then(function(response){
		$scope.search = response.data;
	});
	};

	$scope.addMusic = function(){
		//var id = $routeParams.id;
		$http.post('/music', $scope.music).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
		$scope.addQueue = function(){
		//var id = $routeParams.id;
		$http.post('/queue', $scope.music).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.addAlbum = function(){
		//var id = $routeParams.id;
		$http.post('/albums', $scope.albums).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.addArtist = function(){
		//var id = $routeParams.id;
		$http.post('/artists', $scope.artists).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.addPlaylist = function(){
		//var id = $routeParams.id;
		$http.post('/playlists', $scope.playlists).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.addGenre = function(){
		//var id = $routeParams.id;
		$http.post('/genres', $scope.genre).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.addChart = function(){
		//var id = $routeParams.id;
		$http.post('/charts', $scope.chart).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	
	$scope.update = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/'+ id , $scope.employee).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.add = function(){
	
		$http.post('/api/employees/', $scope.employee).then(function(response){
			$scope.employee = response.data;
			console.log($scope.employee);

		});
	};
	$scope.addArtistComment = function(artist, user, comment){
   		$http.post('/artistComments/' + artist + '/' + user + '/' + comment, $scope.artistComments).then(function(response){
			$scope.artistComments = response.data;
		});
	};
	$scope.addAlbum = function(){
	    user = document.getElementById("user").value;
	    name = document.getElementById("name").value;
		$http.post('/savedAlbums/' + user + '/' + name, $scope.albums).then(function(response){
			$scope.savedAlbums = response.data;

		});
	};
	$scope.addArtist = function(){
	    user = document.getElementById("user").value;
	    artist = document.getElementById("artist").value;
	    $http.get('/api/employees/savedArtists/').then(function(response){
			$scope.savedArtists = response.data;

		});
		

		$http.post('/savedArtists/' + user + '/' + artist, $scope.artists).then(function(response){
			$scope.savedArtists = response.data;

		});
	};
	$scope.addTo = function(id, album, artist, length, playlist){
        playlist = document.getElementById("playlist").value;
		$http.post('/api/employees/' + id + '/' + album+ '/' + artist + '/' + length + '/' + playlist, $scope.music).then(function(response){
			$scope.employee = response.data;
			console.log($scope.employee);

		});
	};
	$scope.delete = function(id){
		var id = id;
		$http.delete('/api/employees/'+ id).then(function(response){
			$route.reload();
		});
	};
	
});