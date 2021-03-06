
/**
 * Module dependencies
 */

var express = require('express'),
  api = require('./src/node/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// JSON API
app.get('/api/name', api.name);
app.get('/api/info', api.info);
app.get('/api/uptime', api.uptime);
app.get('/api/load', api.load);
app.get('/api/mem', api.mem);
app.get('/api/mounts', api.mounts);
app.get('/api/network', api.network);
app.get('/api/ps', api.ps);
app.get('/api/shutdown', api.shutdown);
app.get('/api/reboot', api.reboot);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
  res.status(404).send('Not found!');
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
