'use strict';

/* Services */
var services = angular.module('nodejs-controller.services', ['ngResource']);

services.factory('ApiFactory', function ($resource) {
	return $resource('/api/:action', {}, {
		info: { method: 'GET', params: {action: 'info'} },
		uptime: { method: 'GET', params: {action: 'uptime'} },
		load: { method: 'GET', params: {action: 'load'} },
		mem: { method: 'GET', params: {action: 'mem'} },
		mounts: { method: 'GET', params: {action: 'mounts'} },
		network: { method: 'GET', params: {action: 'network'} },
		ps: { method: 'GET', params: {action: 'ps'} },
		shutdown: { method: 'GET', params: {action: 'shutdown'} },
		reboot: { method: 'GET', params: {action: 'reboot'} }
	})
});
