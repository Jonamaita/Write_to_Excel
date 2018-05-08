var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Arcivhos estaticos
app.use(express.static(__dirname + '/public'));
//body parser para el fromulario
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//pagina principal
app.get("/", function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
//Petición formulario
app.get("/datos_track", function(req, res) {
    console.log(req.query); //query cuando es get y body cuando es post
    res.sendfile(__dirname + '/public/index.html');
});
//Escucha servidor
app.listen(5555,()=>{
	console.log("servidor");
});