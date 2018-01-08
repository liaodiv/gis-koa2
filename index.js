/*const Koa = require('koa');
const Router = require('koa-router');
i*/

import Koa from 'koa';
import views from 'koa-views';
import path from 'path';

const app = new Koa();


let router = new Router();

let api = new Router();

api
    .get('/',(ctx) => {
        ctx.body ='api hello'
    })
    .get('/task', async (ctx) => {
        ctx.body = 'api/task'
    }
)

router
    .get('/', (ctx,next) => {
        ctx.body ='hello World'
    })


router
    .use('/api',api.routes(),api.allowedMethods());

app
    .use(router.routes())
    .use(router.allowedMethods());

//http://nekomiao.me/2017/05/23/koa2-react-webpack-deployment/g

app.listen(3001)
console.log('[demo] start-quick is starting at port 3001')

module.exports = app;