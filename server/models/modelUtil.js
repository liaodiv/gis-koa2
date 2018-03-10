import Util from '../db/geojson_util';

//多态的方式实现get insert的具体操作
export async function getAll(model) {
	if(model.findAll instanceof Function){
		let result = await model.findAll();
		let Arr = result.map( result => {     ///转换为单个feature
			return Util.Togeojson(result);
		})
		return Util.FeaturesToCollection(Arr);
	}
}

export async function insertOne(model,data) {
	if(model.create instanceof Function){
		let obj = JSON.parse(data);
		obj.geom.crs={type: 'name',properties:{name: 'EPSG:4326'}};
		let result = await model.create(obj);
		return Util.Togeojson(result);
	}
}

export async function deleteOne(model,gid) {
	if(model.destroy instanceof Function){
		let result = await model.destroy({where:{gid:gid}});
		return result;
	}
}

export async function updateOne(model,obj,id) {
	if(model.update instanceof Function){
		let result = await model.update(obj,{where:{gid:id}});
		return result;
	}
}