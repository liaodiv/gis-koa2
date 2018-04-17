import Models from '../models/Models';
import {getAll,insertOne,updateOne,deleteOne,getById} from '../models/modelUtil';
import User from '../models/user';
import UserLayer from '../models/user-data';
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
	async getLayerAll(ctx){   //获取图层数据
		let data = ctx.query;
		const model = Models[data.layername];
		console.log(data.layername);
		let geojson = await getAll(model);
		ctx.body = {data:geojson,code:1,name:data.layername}
	},
	async getLayerId(ctx){
		let data = ctx.query;
		const model = Models[data.layername];
		let geojson = await getById(model,data.layerid);
		ctx.body = {data:geojson,code:1,model:data.layername}
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
	},
	//新建用户
	async addUser(ctx){
		let data =ctx.request.body;
		const result =await User.create(data);
		ctx.body = {data:'添加成功',code:1,mess:result};
	},
	async getUser(ctx){
		let data = ctx.query;
		const result = await User.findOne({where:{gid:data.gid}});
		ctx.body = {data:result,code:1};
	},
	async verify(ctx){
		let data = ctx.request.body;
		let result = await User.findOne({where:{name:data.name}}); //返回的一个复杂对象
		let {dataValues} = result;
		if(result.password === data.password){
			console.log(delete dataValues.password);
			//console.log(result);
			ctx.body = {data:dataValues,code:1}
		}else {
			delete delete dataValues.password;
			ctx.body = {data:dataValues,code:0}
		}
	},
	async addLayer(ctx){
		let data = ctx.request.body;
		const result = await UserLayer.create(data);
		ctx.body = {data:result,code:1}
	},
	//获取对应用户的图层
	async getLayer(ctx){
		let data = ctx.query;
		const result = await UserLayer.findAll({where:{userid:data.id}})
		ctx.body ={data:result,code:1}
		/// TODO 根据返回的结果获取字段的属性
		// TODO 新增图层的弹框
		// TODO 根据不同用户下的增删改
		// TODO 图层操作
	}

}