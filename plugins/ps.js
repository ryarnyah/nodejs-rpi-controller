var exec = require('child_process').exec;

var command = 'ps ax';

exports.get = function(callback){
    return exec(command, function(error, stdout, stderr){
        if(error) throw error;
        if(stderr) throw stderr;
        var lines = stdout.split("\n");
        var info = {};
        for(var i=1;i<lines.length; i++){
            var aline = lines[i].split(/\s+/);
            if(!aline[0] || aline[0].length===0) continue;
            var pid = aline.shift();
            info[pid] = {
                    TTY: aline.shift(),
                    STAT: aline.shift(),
                    TIME: aline.shift(),
                    COMMAND: aline.join(' ')
            };
        }
        return callback(info);
    });

};
