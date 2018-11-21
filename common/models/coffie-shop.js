'use strict';
var jsonexport =require('jsonexport');
var fs=require('fs');
var json2xls = require('json2xls');
var Json2csvParser = require('json2csv').Parser;

module.exports = function(Coffieshop) {
    Coffieshop.status = function(cb) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var OPEN_HOUR = 6;
        var CLOSE_HOUR = 20;
        console.log('Current hour is %d', currentHour);
        var response;
        if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
          response = 'We are open for business.';
        } else {
          response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
        }
        cb(null, response);
      };
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

      Coffieshop.getName=function(shopId,cb){
          Coffieshop.findById(shopId,function(err,instance){
              var response="name of Coffie shop is "+instance.name;
              cb(null,response);
              console.log(response)
          })
      }
      Coffieshop.remoteMethod(
          'getName',
          {
              http:{path:'/getname',verb:'get'},
              accepts:{arg:'id',type:'string',http:{source:'query'}},
              returns:{arg:'name',type:'string'}
          }
      )

      Coffieshop.getCSV=function(fields,cb){
        Coffieshop.find(function(err,instance){
            var result=instance;
            var contacts=result;
         //// var fields=['first_name','last_name','age','email','address','id'];
          var myData=instance;
          var json2csvParser =new Json2csvParser({fields});
          var csv=json2csvParser.parse(myData);
          console.log(csv);
          fs.writeFile('dataa.csv',csv,function(err,donee){
            if(err){
              console.log('error')
            }
            else{
              console.log('maybe done')
            }
          })



            // var json2csvParser= new Json2csvParser({fields,delimiter:'/t'});
            // var tsv=json2csvParser.parse(contacts)
            // console.log(tsv)
            
            // jsonexport(contacts,function(err,csv){
            //   if(err){
            //     console.log(err);
            //   }
            //   var data = csv;
            //   // console.log(data)
            //   // data=data.replace(/"/g,"");
            //   // data=data.replace(/__/g,"");

            //   // console.log(data)


            //   // fs.writeFile('temp.xlsx',data,function(err,ok){
            //   //   if(err){
            //   //     console.log(err)
            //   //   }else{
            //   //     console.log('ok done ')
            //   //   }
            //   // })
          


            // })
            // // var xls=  json2xls(contacts);
            // // fs.writeFileSync('data.txt', xls);
            // // console.log('done')

            
            // // cb(null,csv);
            
        })
    }
    Coffieshop.remoteMethod(
        'getCSV',
        {
            http:{path:'/getcsv',verb:'get'},
            accepts:{arg:'fields',type:'array',source:'body'},
            returns:{arg:'name',type:'string'}
        }
    )

    Coffieshop.getFilterData=function(filter,cb){
      var data={};
      data.where=filter;
      Coffieshop.find(data,function(err,result){
        if(err){
          cb(err,null)
        }else{
          cb(null,result)
        }
      })
    }

    
	Coffieshop.remoteMethod('getFilterData',{
		http:{path:'/getFilterData',verb:'get'},
		accepts:{arg:'filter',type:'object',source:'body'},
            returns:{arg:'value',type:'object'}
	})




};
