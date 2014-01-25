var os = require("os");

exports.get = function(){
	console.log(os.totalmem());
    return {
            memfree: os.freemem(),
            memtotal: os.totalmem()
          };
};
