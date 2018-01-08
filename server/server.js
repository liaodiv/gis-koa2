import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import Router from 'koa-router';

const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, '../build')))
app.use(views(path.join(__dirname, '../views'), {
	extension: 'html'
}));
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
	.get('/', async (ctx,next) => {
		await ctx.render('index.html');
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