"use strict";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const fs = require('fs');

const leadEndpoint = require('./app/endpoint/LeadEndpoint');

const app = new Koa();

app.use(bodyParser());
app.use(koaStatic('target'));

leadEndpoint.routes.forEach((r) => app.use(r));

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./target/404.html');
    }
});

app.listen(3000);

console.log("server started at http://localhost:3000");
