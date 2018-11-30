'use strict';
var jsonexport =require('jsonexport');
var fs=require('fs');
var json2xls = require('json2xls');
var key=require('../../client/api');
var Json2csvParser = require('json2csv').Parser;
var mandrill = require('node-mandrill')(key.mandrill_key);
var request=require('request').defaults({encoding:null});


module.exports = function(Coffieshop) {
 Coffieshop.getCSV=function(fields,cb){
    Coffieshop.find(function(err,instance){
        var result=instance;
        var contacts=result;
     //// var fields=['first_name','last_name','age','email','address','id'];
      var myData=instance;
      var json2csvParser =new Json2csvParser({fields});
      var csv=json2csvParser.parse(myData);
      // console.log(csv);
      function sendEmail(fileName,fileType,fileContent){
        mandrill('/messages/send',{
            message:{
                to:[{
                    email:'prashant.dhankar@healtheoz.com',
                    name:'Mr prashant'
                }],
                from_email:'noReply@mentdoc.com',
                subject:'this is test email',
                text:'i sent this message using mandrill',
                attachments:[
                    {
                        "type":fileType,
                        "name":fileName,
                        "content":fileContent
                    }
                ]
            }
        },function(err,res){
            if(err){
                console.log(JSON.stringify(err));
                // response(err,null)
            }else{
                console.log(res)
                
            }
        })
    }


      sendEmail('data.csv',["content-type"], new Buffer(csv).toString('base64'));
        
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
   
};
