var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Parser para recibir información del cliente http
var Excel = require('exceljs'); // Modulo para escribir en excel
var workbook = new Excel.Workbook(); // realizar una instancia
var path="/home/jjmc/Dropbox/Trazabilidad_Operaciones/track_mantenimiento.xlsx"
// Arcivhos estaticos
app.use(express.static(__dirname + '/public'));
//body parser para el fromulario
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
///////////////pagina principal/////////////////////////
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
//////////////////Petición formulario///////////////////
app.post("/datos_track", function(req, res) {
    //console.log(req.query); //query cuando es get y body cuando es post
    //console.log(req.body);
    var problema_produccion=req.body.problema_produccion;
    if(problema_produccion!=undefined){ // Si el problema es de producción se concatena los datos
        var problema = req.body.problema+" ("+problema_produccion+")";
    }else{
        var problema = req.body.problema
    }
    var comentario = req.body.comentario;
    escrbir_falla_excel(comentario,problema,res);
   
    
    
});
////Enviar Hora de falla resuelta mediante post///////
app.post("/falla_resuelta", function(req, res) {
   escribir_hora(res);
   /* escribir_hora(function(falla_resuelta) {
        if (falla_resuelta == true) {
            //res.sendFile(__dirname + '/public/falla_resuelta.html');
            console.log("Se registro hora");
            res.send(true);
        } else {
            console.log("No se ingreso un problema");
            res.send(false);
        }
    })*/
})
////////////////////////////////////////////////////
///////Peteiciones codigo QR mediante GET//////////////////////
app.get("/datos_track", function(req, res) {
    //console.log(req.query); //query cuando es get y body cuando es post
    res.sendFile(__dirname + '/public/Qr_Sucess_Fail.html'); // dentro de este html, se ejecuta jquery para reaizar petición post para identificar falla

   /* var problema_produccion=req.query.problema_produccion;
    if(problema_produccion!=undefined){
        var problema = req.query.problema+" ("+problema_produccion+")";
    }else{
        var problema = req.query.problema
    }
    var comentario = req.query.comentario;
    escrbir_falla_excel(problema, comentario);*/
     // res.send('form_sucess');
});
//////////////QR Falla Resuelta///////////////////////////
app.get("/falla_resuelta", function(req, res) { // Petición get para falla resuelta. Para codigo QR.
  res.sendFile(__dirname + '/public/Qr_Falla_Resuelta.html'); // dentro de este html, se ejecuta jquery para reaizar petición post para hora de la falla resuelta
})

////////////////////////////////////////////

///////////////////////
//Escucha servidor
app.listen(5555, () => {
    console.log("Servidor On");
});
/////////Escribir en excel problema y comentario////////////////
function escrbir_falla_excel(comentario,problema,res) {
       
        workbook.xlsx.readFile(path).then(function(){
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var i = 0;
        worksheet.eachRow(function(row, index, arreglo) {
            //console.log(index);
            //console.log(row.values);
            i = index;
        });
        var row = worksheet.getRow(i + 1);
        row.getCell(1).value = problema; //
        row.getCell(2).value = comentario;
        var date = new Date();
        row.getCell(3).value = date;
        hora = obtener_hora();
        row.getCell(4).value = hora;
        console.log(hora);
        //row.commit();
         return workbook.xlsx.writeFile(path);
         }).then(function(){
           
            res.send(true); // Envia true a la petición si el archivo se pudo escribir de manera correcta.

         }).catch(error => {
            console.error(error);//Envia false a la petición si el archivo se pudo escribir de manera correcta.
            res.send(false);
           
            
        });
        
}
/////////////////////////////////////////////////////////////////
/////////////////////Escribir en excel la hora de falla resuelta///
 function escribir_hora(res) {
    var a;
    var hora;
    workbook.xlsx.readFile(path).then(function() {
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var i = 0;
        var valores = [];
        worksheet.eachRow(function(row, index, arreglo) {
          //  console.log(index);
            //console.log(row.values);
            valores[index] = row.values;
            i = index;
        });
        //console.log(valores[2]);
        //console.log(valores[1][1]);
        //console.log(valores[6][5]);
        hora=obtener_hora();
        if (valores[i][5] == undefined) {
            var row = worksheet.getRow(i)
            //console.log(hora);
            row.getCell(5).value = hora;
            a=true;
            return workbook.xlsx.writeFile(path);
           }else{
            return a=false;
           }
    }).then(function(){
        if(a!=false)
        {
            console.log("Se ha registrado la hora de la falla resuelta correctamente " + hora);
        }else{
            console.log("No Se ha registrado la hora de la falla resuelta " + hora);
        }
        
        res.send(a);
    }).catch(error=>{
        console.log(error);
        res.send(error);
    });
}
//////////Función obtener Hora/////
function obtener_hora() {
    var date = new Date();
    hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return (hora);
}
/////////////////////////////////
