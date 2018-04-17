
import Router from 'koa-router';
//import ApiController from '../controllers/dataApi'
import ApiController from '../controllers/modelApi';
const router = new Router();

export default router
	.get   ('/layer', ApiController.getLayerAll)
	.get   ('/config',ApiController.getConfig)
	.post  ('/layer', ApiController.addFeature)
	.delete('/layer', ApiController.deleteFeature)
	.put   ('/layer', ApiController.updateFeature)
	.get   ('/login', ApiController.getUser)
	.post  ('/login', ApiController.verify)
	.post  ('/user',  ApiController.addUser)
	.post  ('/ulayer',ApiController.addLayer)
	.get   ('/ulayer',ApiController.getLayer)
	.get('/udata',ApiController.getLayerId) //user获取数据
    /// TODO 增加编辑接口的实现
	/*.post('/add',ApiController.addFeature)
	.delete('/feature',ApiController.deleteFeature)
	.put('/point',ApiController.updataFeature)
	.get('/communication_line',ApiController.getAllLine)
	.post('/communication_line')*/