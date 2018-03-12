import Models from '../models/Models';
import {getAll,insertOne,updateOne,deleteOne} from '../models/modelUtil';
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
	async getConfig(ctx){
		let message = await getFile();
		ctx.body = {data:message,code:1}
	},
	async getLayer(ctx){   //获取图层数据
		let data = ctx.query;
		const model = Models[data.layername];
		let geojson = await getAll(model);
		ctx.body = {data:geojson,code:1,name:data.layername}
	},
	async addFeature(ctx){
		let data = ctx.request.body;
		const model = Models[data.layername]; // 添加数据组织
		const result = await insertOne(model,data.data);
		ctx.body = {data:result,code:1};
	},
	async deleteFeature(ctx){
		let data = ctx.request.body;
		const model = Models[data.layername];
		const result = await deleteOne(model,data.data.gid);
		ctx.body = {data:result,code:1};
	},
	async updateFeature(ctx){
		let data = ctx.request.body;
		const model = Models[data.layername];
		const result = await  updateOne(model,data.data.obj,data.data.id);
		ctx.body ={data:'请求成功',code:result[0]}
	}

}