const { json } = require("express");

function csvToJson(csv){

   var lines=csv.split("\r\n");
 
   var result = [];
 
   var headers=lines[0].split('\t');
   for(var i=1;i<lines.length;i++){
 
      var obj = {};
      var currentline=lines[i].split("\t");
 
      for(var j=0;j<headers.length;j++){
         obj[headers[j]] = currentline[j];
      }
      let stringData = JSON.stringify(obj);
      let jsonData = JSON.parse(stringData);
      jsonData.children = [];
      result.push(jsonData);
      
   }
   return result; 
}
exports.csvToJson = csvToJson; 
 