"use strict";

const router = require('koa-route');
const inscricaoService = require("../service/InscricaoService");

module.exports = {
    routes: [
        router.post('/inscricoes',
            (ctx) =>
                inscricaoService.registrar(ctx.request.body)
                    .then(() => {
                        ctx.status = 201;
                    })
        )
    ],
};
