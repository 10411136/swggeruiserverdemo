var cors = require('cors');
var express = require('express');

const swaggerUi = require('swagger-ui-express');
var app = express();
var options = {
    explorer: true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Vary': 'Origin'
};

const YAML = require('yaml')
const fs = require("fs")
let file  = fs.readFileSync('./swagger-petstore.yaml', 'utf8')
const swaggerDocument = YAML.parse(file) // parse yaml檔案

const ymapi_dev_tnt_1_0_0_Document = require('./ym_tnt-swagger.json');

file = fs.readFileSync('./ym_tnt-swagger.yaml', 'utf8');
const swaggerDocument_1_1_0_Document = YAML.parse(file) // parse yaml檔案


// 定義Router path http://localhost:3000/api-docs/petstore
app.use('/api-docs/petstore', swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup(swaggerDocument, options));

// 允許跨來源請求（CORS）
app.use((req, res, next) => {
  console.log("允許跨來源請求（CORS）");
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允許所有來源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// 定義Router path http://localhost:3000/api-docs/ymapi_dev_tnt_1.0.0
app.use('/api-docs/ymapi_dev_tnt_1.0.0', swaggerUi.serveFiles(ymapi_dev_tnt_1_0_0_Document, options), swaggerUi.setup(ymapi_dev_tnt_1_0_0_Document, options));
app.use('/api-docs/ymapi_dev_tnt_1.1.1', swaggerUi.serveFiles(swaggerDocument_1_1_0_Document, options), swaggerUi.setup(swaggerDocument_1_1_0_Document, options));

app.listen(3000, function () {
  console.log("Listening on port 3000...");
});


/*
// 設定CORS中間件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '127.0.0.1'); // 允許所有來源，或指定你的前端應用程式的來源
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Max-Age', 86400); // 24 小時
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
/*
app.use(cors({
  origin: '*', // 允許所有來源，或指定你的前端應用程式的來源
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

// 使用swagger-ui-express中間件提供Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument_1_1_0_Document));

// 開始伺服器
app.listen(3000, function () {
  console.log("Listening on port 3000...");
});*/