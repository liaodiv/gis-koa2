import {Sequelize,sequelzie} from '../db/dbSever';
import Util from '../db/geojson_util';

const TestPoint = sequelzie
	.define('new_point',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		},
		geom:{
			type:Sequelize.GEOMETRY
		}
	},{
		freezeTableName:true,
		timestamps:false
	})


const point = {
	async getAll() {
		let results = await TestPoint.findAll();
		let Arr = results.map( result => {     ///转换为单个feature
			return Util.Togeojson(result);
		})
		return Util.FeaturesToCollection(Arr);
	},
	async insertOne(data){
		let obj = JSON.parse(data);
		obj.geom.crs={type: 'name',properties:{name: 'EPSG:4326'}};
		let result = await TestPoint.create(obj);
		return Util.Togeojson(result);
	},
	async deleteOne(gid){
		let result = await TestPoint.destroy({where:{gid:gid}});
		return result;
	}
}

async function getdata() {
	let geojson = await point.getAll();

}

//getdata();

export default  point;
