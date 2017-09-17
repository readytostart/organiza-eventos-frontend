const Koa = require('koa');
const koaStatic = require('koa-static');
const fs = require('fs');
const app = new Koa();

app.use(koaStatic('target'));

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./target/404.html');
    }
});

app.listen(3000);
