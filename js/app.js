'use strict';
var app = angular.module('GitUserStats',[
	'ngRoute',
	'UserStats',
	'angular-underscore',
	'chartjs'
]);

app.config(function ($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl: "views/home.html",
			controller: "GitUserStatsController"
		})
		.when('/home',{
			templateUrl:'views/home.html',
			controller:'GitUserStatsController'
		})
		.when('/repo/:id',{
			templateUrl: 'views/repo.html',
			controller: 'RepoStatsController'
		})
		.otherwise({
        	redirectTo: '/',
      	});
});