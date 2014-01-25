var os = require("os");

exports.get = function(){
    var l = os.loadavg();
    return {
        "1min": l[0],
        "5min": l[1],
        "10min": l[2]
    };
};
