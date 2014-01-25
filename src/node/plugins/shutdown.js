var exec = require('child_process').exec;

exports.get = function(callback){
    return exec('sudo shutdown -h now', function(error, stdout, stderr){
        if(error) throw error;
        if(stderr) throw stderr;
    });
	return {status: 'ok'};
};
