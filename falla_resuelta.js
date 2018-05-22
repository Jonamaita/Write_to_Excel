var Excel = require('exceljs'); // Modulo para escribir en excel
var workbook = new Excel.Workbook(); // realizar una instancia
falla_resuelta();

function falla_resuelta() {
    var a;
      workbook.xlsx.readFile('track_mantenimiento.xlsx').then(function() {
        console.log("entra");
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var i = 0;
        var valores = [];
        worksheet.eachRow(function(row, index, arreglo) {
            console.log(index);
            //console.log(row.values);
            valores[index] = row.values;
            i=index;
        });
        console.log(valores[2]);
        console.log(valores[1][1]);
        console.log(valores[6][5]);
        if(valores[i][5]==undefined){
            console.log("Se registro Fecha");
            a=true;

        }else{
            console.log("Debe ingresar un problema primeramente");
            b=false;
        }
        
       });
   
}
/* con callback 


    var escribir_falla= function(callback){
        workbook.xlsx.readFile('track_mantenimiento.xlsx').then(function() {
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var i = 0;
        var valores = [];
        worksheet.eachRow(function(row, index, arreglo) {
            console.log(index);
            //console.log(row.values);
            valores[index] = row.values;
            i=index;
        });
        console.log(valores[2]);
        console.log(valores[1][1]);
        console.log(valores[6][5]);
        if(valores[i][5]==undefined){
            console.log("Se registro Fecha");
            callback(true);
          
        }else{
            console.log("Debe ingresar un problema primeramente");
        }
    });
  
}
    

 escribir_falla(function(obteniendo){
        console.log(obteniendo);
    })*/