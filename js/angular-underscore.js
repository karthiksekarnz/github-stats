var underscore = angular.module('angular-underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});