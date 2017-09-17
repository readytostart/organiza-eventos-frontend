"use strict";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const fs = require('fs');

initConfig();

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

app.listen(process.env.PORT);

console.log(`Server started at http://localhost:${process.env.PORT}`);

function initConfig() {
    require('dotenv').config({path: require('yargs').argv.envfile});
    process.env.PORT = process.env.PORT || 3000;
}
