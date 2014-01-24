var fs = require("fs");

exports.get = function(callback){
    return fs.readFile('/proc/meminfo', 'utf-8', function (err, meminfo) {
          if (err) throw err;
          var lines = meminfo.split("\n");
          meminfo = {};
          for(var i=0;i<lines.length; i++){
            var aline = lines[i].split(':');
            meminfo[aline[0]] = parseInt(aline[1], 10);
          }

          var mem = {
            "memfree": meminfo.MemFree,
            "memtotal": meminfo.MemTotal,
            "swapfree": meminfo.SwapFree
          };

          return callback(mem);
    });
};
