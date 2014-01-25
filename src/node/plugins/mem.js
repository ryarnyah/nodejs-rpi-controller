var os = require("os");

exports.get = function(){
    return {
            memfree: os.freemem(),
            memtotal: os.totalmem()
          };
};
