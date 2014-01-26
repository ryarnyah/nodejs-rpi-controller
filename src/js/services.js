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

services.factory('LocalisationFactory', ['$http', '$window',
	function ($http, $window) {
		var localise = {
			defaultLanguage: 'en',
			language : $window.navigator.userLanguage || $window.navigator.language,
			currentLanguage : undefined,
			languageLoaded : false,
			load: function(language, callback) {
				$http({method: 'GET', url: '/i18n/' + language + '.json'}).
					success(function(data, status, headers, config) {
						localise.currentLanguage = data;
						localise.languageLoaded = true;
						callback();
					}).
					error(function(data, status, headers, config) {
						if(localise.defaultLanguage != language)
						{
							$http({method: 'GET', url: '/i18n/' + localise.defaultLanguage + '.json'}).
								success(function(data, status, headers, config) {
									localise.currentLanguage = data;
									localise.languageLoaded = true;
									callback();
								});
						}
					});
			},
			translate : function(name, callback) {
				if(localise.languageLoaded) {
					callback(localise.currentLanguage[name]);
				} else {
					localise.currentLanguage = localise.load(localise.language, function(){
						callback(localise.currentLanguage[name]);
					});
				}
			}
		}
		return localise;
	}
]);
