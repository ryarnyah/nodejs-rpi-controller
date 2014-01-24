'use strict';

// Declare app level module which depends on filters, and services
angular.module('nodejs-controller', [
  'ngRoute',
  'nodejs-controller.filters',
  'nodejs-controller.services',
  'nodejs-controller.directives',
  'nodejs-controller.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shutdown', {templateUrl:'partials/shutdown', controller: 'ShutdownCtrl'});
  $routeProvider.when('/info', {templateUrl:'partials/info', controller: 'InfoCtrl'});
  $routeProvider.when('/uptime', {templateUrl:'partials/uptime', controller: 'UptimeCtrl'});
  $routeProvider.when('/load', {templateUrl:'partials/load', controller: 'LoadCtrl'});
  $routeProvider.when('/mem', {templateUrl:'partials/mem', controller: 'MemCtrl'});
  $routeProvider.when('/mounts', {templateUrl:'partials/mounts', controller: 'MountsCtrl'});
  $routeProvider.when('/network', {templateUrl:'partials/network', controller: 'NetworkCtrl'});
  $routeProvider.when('/ps', {templateUrl:'partials/ps', controller: 'PsCtrl'});
  /* Default route */
  $routeProvider.otherwise({redirectTo: '/shutdown'});
}]);
