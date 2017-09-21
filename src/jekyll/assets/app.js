(function () {
    "use strict";

    window.App = {
        formLeadValidation: formLeadValidation
    };

    function formLeadValidation(form) {
        try {
            var isDownload = form.getAttribute("data-js-form-download-link") != null;
            var cadastro = {
                nome: form.querySelector("#nome").value,
                email: form.querySelector("#email").value,
                ehDownload: isDownload
            };

            jQuery
                .ajax({
                    type: "POST",
                    url: "https://organizaeventosapi.azurewebsites.net/api/leads/postfrombody",
                    data: JSON.stringify(cadastro),
                    contentType: 'application/json'
                })
                .then(function (data) {
                    checkSuccess(data, isDownload);
                })
                .catch(function () {
                    console.log("erro");
                    console.log(arguments);
                    error("Não foi possível finalizar a requisição, tente novamente.")
                });

        } catch (e) {
            console.log("exception");
            console.log(e);
            error("Não foi possível finalizar a requisição, tente novamente.")
        }
        return false;

        function checkSuccess(data, isDownload) {
            if(data.sucesso) {
                success(isDownload);
            } else {
                error(data.mensagem);
            }
        }

        function success(isDownload) {
            if (isDownload) {
                jQuery(form.querySelector(".js-form-inputs")).addClass("hide");
                jQuery(form.querySelector(".js-form-download")).removeClass("hide");
            }
        }

        function error(message) {
            jQuery(".js-form-errors")
                .text("Erro: " + message)
                .removeClass("hide")
                .show()
                .delay(4000)
                .fadeOut('slow');
        }
    }
})();
