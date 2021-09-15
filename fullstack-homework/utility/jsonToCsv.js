const { Parser } = require('json2csv');

function jsonToCsv(json){
   const json2csvParser = new Parser({fields:['id',
                                             'name',
                                             'description',
                                             'parent',
                                             'read_only'],
                                     delimiter: '\t' });
   const tsv = json2csvParser.parse(json);
   console.log(tsv);
   return tsv;
}

exports.jsonToCsv = jsonToCsv; 