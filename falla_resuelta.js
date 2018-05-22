var Excel = require('exceljs'); // Modulo para escribir en excel
var workbook = new Excel.Workbook(); // realizar una instancia
fail_sucess();

function fail_sucess() {
    workbook.xlsx.readFile('track_mantenimiento.xlsx').then(function() {
        var worksheet = workbook.getWorksheet("track_mantenimiento");
        var i = 0;
        var valores = [];
        worksheet.eachRow(function(row, index, arreglo) {
            console.log(index);
            //console.log(row.values);
            valores[index] = row.values;
        });
        console.log(valores[]);
        console.log(valores[1][1]);
        console.log(valores[2][1]);
    });
}