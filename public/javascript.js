$(document).ready(function() {
            $("#enviar-form").click(function() {
                    if (validar_form) {
                        $.get("datos_track", $('#form_exito').attr('class', "");
                        }
                    });
            });

        function validar_form() {
            if (("#comentario").value() = "") {
                console.log("Vacio");
                return false;
            } else {}
        };