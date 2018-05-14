$(document).ready(function() {
    console.log("jquery On");
    $("#enviar-form").click(function() {
        validar_form();
    });
});

function validar_form() {
    if ($("#comentario").val() == "") {
        alert("El campo de comentario no puede estar vacio.");
        //("#comentario").focus();
        return false;
    } else if ($("#comentario").val().match(/\S/)) {
        console.log(2)
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