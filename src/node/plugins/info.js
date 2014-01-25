var os = require("os");

exports.get = function(){
    return {
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        time: new Date()
    };

};