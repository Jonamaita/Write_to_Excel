var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Parser para recibir información del cliente http
var Excel = require('exceljs'); // Modulo para escribir en excel
var workbook = new Excel.Workbook(); // realizar una instancia

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
    //console.log(req.query); //query cuando es get y body cuando es post
    console.log(req.query.comentario);
    var problema=req.query.problema;
    var comentario=req.query.comentario;
	escrbir_excel(problema,comentario);
    res.sendfile(__dirname + '/public/index.html');
});
//Escucha servidor
app.listen(5555, () => {
    console.log("Servidor On");
});

function escrbir_excel(problema,comentario){

workbook.xlsx.readFile('track_mantenimiento.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var row = worksheet.getRow(2);
        row.getCell(1).value =problema; //
        row.getCell(2).value=comentario;
        row.commit();
        return workbook.xlsx.writeFile('track_mantenimiento.xlsx');
    })
	
	
	
}