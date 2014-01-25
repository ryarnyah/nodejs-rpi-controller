/*
 * Serve JSON to our AngularJS client
 */
 
var info = require('../plugins/info'),
	uptime = require('../plugins/uptime'),
	load = require('../plugins/load'),
	mem = require('../plugins/mem'),
	mounts = require('../plugins/mounts'),
	network = require('../plugins/network'),
	ps = require('../plugins/ps'),
	shutdown = require('../plugins/shutdown'),
	reboot = require('../plugins/reboot')
	;

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.info = function (req, res) {
	res.json(info.get());
}

exports.uptime = function (req, res) {
	res.json(uptime.get());
}


exports.load = function (req, res) {
	res.json(load.get());
}

exports.mem = function (req, res) {
	res.json(mem.get());
}

exports.mounts = function (req, res) {
	mounts.get(function(data) {
		res.json(data);
	});
}

exports.network = function (req, res) {
	res.json(network.get());
}

exports.ps = function (req, res) {
	ps.get(function(data) {
		res.json(data);
	});
}

exports.shutdown = function (req, res) {
	shutdown.get(function(data) {
		res.json(data);
	});
}

exports.reboot = function (req, res) {
	reboot.get(function(data) {
		res.json(data);
	});
}