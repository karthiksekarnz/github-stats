'use strict';
var UserStats = angular.module('UserStats', []);

UserStats.factory('StatsService', function ($http, $rootScope, _){
	var StatsService = {};
	StatsService.repos = {};
	StatsService.languages = {};

	StatsService.getUserStats = function (username){
		var self = this;
		var url = "https://api.github.com/users/"+username+"/repos";
		$http({
			method: 'GET',
			url: url
		}).success(function (data){
			StatsService.repos = data;
			self.refreshRepositories();

		}).error(function (data){

		});
	};

StatsService.getLanguageStats = function (language_url){
		var self = this;
		$http({
			method: 'GET',
			url: language_url
		})
		.success(function (data){
			var languages = [];
			_.each(data, function (lines, language){
				var item = {};
				item.label = language;
				item.value = lines;
				item.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
				languages.push(item);
			});
			StatsService.languages = languages;
			self.refreshRepoStats();

		}).error(function (){

		});
	};

	StatsService.refreshRepositories = function (){
		$rootScope.$broadcast('refreshRepositories')
	};

	StatsService.refreshRepoStats = function (){
		$rootScope.$broadcast('refreshRepoStats');
	};

	return StatsService;
});

UserStats.controller('GitUserStatsController', function ($scope, StatsService){
	$scope.getUserStats = function (username){
		StatsService.getUserStats(username);
	};

	$scope.getRepoStats = function (repo){
		if(repo.languages_url != undefined)
			StatsService.getLanguageStats(repo.languages_url);
	};

	$scope.$on('refreshRepositories', function (){
		$scope.repos = StatsService.repos;
	});
});

UserStats.controller('RepoStatsController', function ($scope, $routeParams, _, StatsService){
	$scope.$on('refreshRepoStats', function (){
		_.each(StatsService.repos, function(repo){
			if(repo.id == $routeParams.id)
				$scope.repo = repo;
		});
		$scope.languages = StatsService.languages;
	});
});