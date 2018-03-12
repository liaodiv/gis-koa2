import {Sequelize,sequelzie} from "../db/dbSever";

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
	});

const TestLine = sequelzie
	.define('new_line',{
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
	});

export default {
	pointLayer:TestPoint,
	communication_line:ComLine,
	lineLayer:TestLine
}