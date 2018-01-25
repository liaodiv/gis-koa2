const Sequelize = require('sequelize');

const sequelzie =new Sequelize('postgres://postgres:123456@120.25.252.245:5432/myspdb');

const Util = require('./geojson_util');

sequelzie
	.authenticate()
	.then( ()=> {
		console.log('链接成功')
	})
	.catch( err => {
		console.error('连接失败',err)
	})


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

function Togeojson(result) {
	const data = result.dataValues;
	const geostr = data.geom;
	delete data['geom'];
	const feature={
		type:'Feature',
		geometry:geostr,
		properties:data
	}
	return feature;
}

function FeaturesToCollection(dataList) {
	const geoCollection = {
		type:"FeatureCollection",
		crs: {
			type: 'name',
			properties: {
				'name': 'EPSG:4326'
			}
		},
		features:[]
	};
	dataList.forEach( datai => {
		geoCollection.features.push(datai)
	})
	return geoCollection;
}

/*TestPoint  //插入数据
	.create({
		name:'node_test',
		geom: {
			type: 'Point',
			coordinates: [114.39, 30.51],
			crs: {type: 'name',properties:{name: 'EPSG:4326'}}
		}

	})
	.then((data)=> {
		console.log('插入成功')
	})
	.catch((err) => {
		console.log("插入失败",err)
	})*/

/*
TestPoint
	.update({
		name:'node_test2',
		geom: {
			type: 'Point',
			coordinates: [114.39, 30.51],
			crs: {type: 'name',properties:{name: 'EPSG:4326'}}
		}

	},{
		where:{
			gid:1
		}
	})
	.then((data)=> {
		console.log('插入成功')
	})
	.catch((err) => {
		console.log("更新失败",err)
	})*/
/*TestPoint  //查询所有
	.findAll()
	.then( results => {
		results.map( (result) => {
			console.log(result);
			//console.log(Togeojson(result))
		})
	} )*/

const queryPoint = () => {
	return new Promise((resolve,reject) => {
		TestPoint
			.findAll()
			.then( results => {
				const Arr = [];
				results.map( result => {
					Arr.push(Util.Togeojson(result));
				})
				resolve(Util.FeaturesToCollection(Arr));
			})
			.catch( err => {
				reject(err)
			})
	})
}

async function  getData() {
	let  datalist = await queryPoint();
	console.log(datalist);
}




export {sequelzie,Sequelize}
