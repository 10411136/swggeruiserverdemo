var express = require('express');
const swaggerUi = require('swagger-ui-express');


var app = express();
var options = {
    explorer: true
};
const ymapi_dev_tnt_1_0_0_Document = require('./ym_tnt-swagger.json');

const YAML = require('yaml')
const fs = require("fs")
const file  = fs.readFileSync('./swagger-petstore.yaml', 'utf8')
const swaggerDocument = YAML.parse(file) // parse yaml檔案

// 定義Router path http://localhost:3000/api-docs/petstore
app.use('/api-docs/petstore', swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup(swaggerDocument, options));

// 定義Router path http://localhost:3000/api-docs/ymapi_dev_tnt_1.0.0
app.use('/api-docs/ymapi_dev_tnt_1.0.0', swaggerUi.serveFiles(ymapi_dev_tnt_1_0_0_Document, options), swaggerUi.setup(ymapi_dev_tnt_1_0_0_Document, options));
/*
app.use('/api-docs', function(req, res, next){
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serveFiles(), swaggerUi.setup());
*/

app.listen(3000, function () {
  console.log("Listening on port 3000...");
});