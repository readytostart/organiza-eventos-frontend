"use strict";

const router = require('koa-route');
const leadService = require("../service/LeadService");

module.exports = {
    routes: [
        router.post('/leads',
            async (ctx) => {
                await leadService.create(ctx.request.body);
                ctx.status = 201;
            }
        ),
    ],
};
