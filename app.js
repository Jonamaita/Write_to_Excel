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
    res.sendFile(__dirname + '/public/index.html');
});
//Petición formulario
app.post("/datos_track", function(req, res) {
    //console.log(req.query); //query cuando es get y body cuando es post
    console.log(req.body.comentario);
    var problema = req.body.problema;
    var comentario = req.body.comentario;
    escrbir_excel(problema, comentario);
    //res.sendFile(__dirname + '/public/succes.html');
    res.send('form_sucess');
});
///////////

//Escucha servidor
app.listen(5555,"192.168.1.114", () => {
    console.log("Servidor On");
});
/////////////////////////
function escrbir_excel(problema, comentario) {
    workbook.xlsx.readFile('track_mantenimiento.xlsx').then(function() {
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var i = 0;
        worksheet.eachRow(function(row, index, arreglo) {
            //console.log(index);
            //console.log(row.value);
            i = index;
        });
        var row = worksheet.getRow(i + 1);
        row.getCell(1).value = problema; //
        row.getCell(2).value = comentario;
        var date = new Date();
        row.getCell(3).value = date;
        hora = date.getHours() + ":" + date.getMinutes();
        row.getCell(4).value = hora;
        console.log(hora);
        //row.commit();
        return workbook.xlsx.writeFile('track_mantenimiento.xlsx');
    })
}