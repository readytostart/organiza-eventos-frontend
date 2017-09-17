"use strict";

const router = require('koa-route');
const inscricaoService = require("../service/InscricaoService");

module.exports = {
    routes: [
        router.post('/inscricoes',
            async (ctx) => {
                await inscricaoService.registrar(ctx.request.body);
                ctx.status = 201;
            }
        ),
    ],
};
