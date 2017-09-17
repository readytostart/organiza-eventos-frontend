"use strict";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const enforceHttps = require('koa-sslify');
const koaStatic = require('koa-static');
const fs = require('fs');

initConfig();

const leadEndpoint = require('./app/endpoint/LeadEndpoint');

const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404 && ctx.request.url !== "/favicon.ico") {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./target/404.html');
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(enforceHttps({
        trustProtoHeader: true,
    }));
}

app.use(koaStatic('target'));
app.use(bodyParser());

leadEndpoint.routes.forEach((r) => app.use(r));

app.listen(process.env.PORT);

console.log(`Server started at http://localhost:${process.env.PORT}`);

function initConfig() {
    require('dotenv').config({path: require('yargs').argv.envfile});
    process.env.PORT = process.env.PORT || 3000;
}
