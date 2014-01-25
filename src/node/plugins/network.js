var os = require("os");

exports.get = function(callback){
    return os.networkInterfaces();
};
