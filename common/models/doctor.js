'use strict';

module.exports = function(Doctor) {
    Doctor.getData=function(cb){
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var OPEN_HOUR = 6;
        var CLOSE_HOUR = 20;
        console.log('Current hour is %d', currentHour);
        var response;
        Coffieshop.remoteMethod(
            'status', {
              http: {
                path: '/status',
                verb: 'get'
              },
              returns: {
                arg: 'status',
                type: 'string'
              }
            }
          );
    }
};
