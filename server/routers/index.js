//整合所有路由
import Router from 'koa-router';
const router =new Router();

import api from './dataApi';

router
	.get('/', async (ctx,next) => {
		await ctx.render('index.html');
	});
router.use('/api',api.routes(),api.allowedMethods())

export default router;