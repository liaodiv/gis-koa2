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
	}
}