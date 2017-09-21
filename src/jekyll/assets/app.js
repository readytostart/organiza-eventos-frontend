(function () {
    "use strict";

    window.App = {
        formLeadValidation: formLeadValidation
    };

    function formLeadValidation(form) {
        try {
            var $form = $(form);
            var lead = {
                nome: form.querySelector("#nome").value,
                email: form.querySelector("#email").value,
                ehDownload: form.getAttribute("data-js-form-download-link") != null
            };

            var queryParams = jQuery.param(lead);
            jQuery.post("https://organizaeventosapi.azurewebsites.net/api/leads?" + queryParams)
                .then(function () {
                    console.log("sucesso");
                    console.log(arguments);
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
    }
})();
