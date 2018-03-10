
import Router from 'koa-router';
//import ApiController from '../controllers/dataApi'
import ApiController from '../controllers/modelApi';
const router = new Router();

export default router
	.get('/layer',ApiController.getLayer)
	.get('/config',ApiController.getConfig)
	.post('/layer',ApiController.addFeature)

	/*.post('/add',ApiController.addFeature)
	.delete('/feature',ApiController.deleteFeature)
	.put('/point',ApiController.updataFeature)
	.get('/communication_line',ApiController.getAllLine)
	.post('/communication_line')*/