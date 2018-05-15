$(document).ready(function() {
    console.log("jquery On");
    $("#enviar-form").click(function() {
       validar_form();
       
        
    });
});

function validar_form() {
        var expreg=/\S/;
        var valTextArea=document.getElementById('comentario').value;

    if (!valTextArea.match(expreg)) {
        alert("El campo de comentario no puede estar vacio.");
        $("#comentario").focus();
        $("#comentario").addClass("incorrecto")
        return false;
    } else {
        $.ajax({
            type: "POST",
            url: "/datos_track",
            data: $('#form_1').serialize(),
            success: function(data) {
                //funcion que se ejecutara en caso de que todo vaya bien
                $('#res_form').addClass('correcto');
                $('#form_success_error').removeClass('no-visible');
                $('#res_form').html("Los datos se enviaron correctamente");
                document.getElementById("form_1").reset();
                $("#run_tf").removeClass("hide");
                //document.getElementById("comentario").disabled = true;
                setTimeout(function(){
                    $("#comentario").addClass("hide");
                },1000);
               

              
                
            },
            error: function(data) {
                //funcion que se ejecutara en caso de que se haya producido un fallo
                $('#res_form').addClass('incorrecto');
                $('#form_success_error').removeClass('no-visible');
                $('#res_form').html("Los datos no se enviaron correctamente, intente nuevamente");
                document.getElementById("form_1").reset();
            }
        });
    }
};