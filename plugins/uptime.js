var os = require("os");

exports.get = function(){
    return {up: os.uptime()};
};