var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var parse = require('csv-parse');
const {Nodedata, Tree} = require('../public/javascripts/tree.js')
var csv2Json = require('../utility/csvToJson.js');
var json2Csv = require('../utility/jsonToCsv.js') 
var path = require('path'); 


const tree = new Tree();

(async function () {
    const file = __dirname +  "/tree_data.csv"
    const allNodes = await getParseData(file); 
    console.log(allNodes); 
    for (let node of allNodes) {
        tree.addNode(node, node.parent)
    } 
})();

router.get('/get_tree', async (req, res) =>  {
  let json = tree.root;
  res.json(json)
})

// Have Node serve the files 
router.use(express.static(path.resolve(__dirname)));
router.get('/export_csv', async( req,res) => {
  let jsondata = tree.convertToJson();
  try{
    let csvString= json2Csv.jsonToCsv(jsondata); 
    if(csvString.length!== 0){
      fs.writeFile('export.csv', csvString, function (err) {
        if (err) return console.log(err);
        console.log('export csv  > export.csv');
      });
    }
    res.sendFile(path.resolve(__dirname,'export.csv'));
  }catch{
    res.sendStatus(500);
  }
 
})

router.put('/update_node/:id/:name', async (req, res) =>  {
    const name = req.params.name
    const id = req.params.id
    let canUpdate = tree.updateNode(id, name)
    if (canUpdate === true)  {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})
  
router.delete('/delete_node/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    let canDelete = tree.deleteNode(id)
    if (canDelete === true){
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})

router.post('/create_node/:parentId', jsonParser, async (req, res) => {
    const parentId = req.params.parentId
    const body = req.body
    console.log(body)
    const name = body['name']
    const description = body['description']
    const read_only = body['read_only']
    let data = new Nodedata(uuidv4(), name, description,read_only, parentId)
    let result = tree.addNode(data, parentId)
    if (result === null) {
        res.sendStatus(400)
    } else {
        res.send(data.id)
    }
})


function getParseData(file) {
    let data = fs.readFileSync(file).toString();
    return csv2Json.csvToJson(data );
}

module.exports = router;
