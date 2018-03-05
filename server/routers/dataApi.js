
import Router from 'koa-router';
import ApiController from '../controllers/dataApi'

const router = new Router();

export default router
	.get('/allPoint',ApiController.getAllPoint)
	.get('/config',ApiController.getConfig)
	.post('/add',ApiController.addFeature)