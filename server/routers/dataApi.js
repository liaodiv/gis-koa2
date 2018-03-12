
import Router from 'koa-router';
//import ApiController from '../controllers/dataApi'
import ApiController from '../controllers/modelApi';
const router = new Router();

export default router
	.get('/layer',ApiController.getLayer)
	.get('/config',ApiController.getConfig)
	.post('/layer',ApiController.addFeature)
	.delete('/layer',ApiController.deleteFeature)
	.put('/layer',ApiController.updateFeature)
    /// TODO 增加编辑接口的实现
	/*.post('/add',ApiController.addFeature)
	.delete('/feature',ApiController.deleteFeature)
	.put('/point',ApiController.updataFeature)
	.get('/communication_line',ApiController.getAllLine)
	.post('/communication_line')*/