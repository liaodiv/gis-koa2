import {Sequelize,sequelzie} from "../db/dbSever";
import Util from '../db/geojson_util';

const ComLine = sequelzie
		.define('communication_line',{
			gid:{
				type:Sequelize.INTEGER,
				primaryKey:true,
				autoIncrement:true
			},
			location:{
				type:Sequelize.STRING
			},
			last_check:{
				type:Sequelize.STRING
			},
			condition:{
				type:Sequelize.STRING
			},
			geom:{
				type:Sequelize.GEOMETRY
			}
		},{
			freezeTableName:true,
			timestamps:false
		});

const Line = {
	async getAll() {
		let results = await ComLine.findAll();
		let Arr = results.map( result => {     ///转换为单个feature
			return Util.Togeojson(result);
		})
		return Util.FeaturesToCollection(Arr);
	},
	async insertOne(data){
		let obj = JSON.parse(data);
		obj.geom.crs={type: 'name',properties:{name: 'EPSG:4326'}};
		let result = await ComLine.create(obj);
		return Util.Togeojson(result);
	},
	async deleteOne(gid){
		let result = await ComLine.destroy({where:{gid:gid}});
		return result;
	},
	async updateOne(obj,id){
		let result = await ComLine.update(obj,{where:{gid:id}});
		return result;
	}
}

async function getdata() {
	let geojson = await Line.getAll();
	console.log(geojson);



}

getdata();

export default Line;