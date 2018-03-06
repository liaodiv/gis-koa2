import Point from '../models/Point';
import fs from 'fs';

function getFile() {
	return new Promise((resolve,reject) => {
		fs.readFile('./Layer.json',function (err,data) {
			if(err){
				reject(err)
			}
			resolve(JSON.parse(data));
		})
	})
}

export default {
	async getAllPoint(ctx){
		let geojson = await Point.getAll();
		ctx.body = {data:geojson,code:1,name:'pointLayer'};
	},
	async getConfig(ctx){
		let message = await getFile();
		ctx.body = {data:message,code:1}
	},
	/// TODO 开发后台添加要素
	async addFeature(ctx){
		const data = JSON.stringify(ctx.request.body);
		const result =await Point.insertOne(data);
		ctx.body ={data:result,code:1}
		/*console.log('要素信息为',data);*/
	},
	async deleteFeature(ctx){
		const data = ctx.request.body;
		console.log('data',data);
		const result = await Point.deleteOne(data.gid);
		ctx.body ={data:'请求成功',code:result}
	}
}