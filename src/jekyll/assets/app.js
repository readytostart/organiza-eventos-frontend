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

            jQuery.post("https://organizaeventosapi.azurewebsites.net/api/leads/postfrombody", cadastro)
                .then(function () {
                    leadSuccess(isDownload);
                })
                .catch(function () {
                    console.log("erro");
                    console.log(arguments);
                });
        } catch (e) {
            console.log("exception");
            console.log(e);
        }
        return false;

        function leadSuccess(isDownload) {
            if (isDownload) {
                jQuery(form.querySelector(".js-form-inputs")).addClass("hide");
                jQuery(form.querySelector(".js-form-download")).removeClass("hide");
            }
        }
    }
})();
