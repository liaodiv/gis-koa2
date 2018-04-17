import {Sequelize, sequelzie} from "../db/dbSever";

const UserData = sequelzie
	.define('user_data',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		},
		userid:{
			type:Sequelize.INTEGER
		},
		modelname:{
			type:Sequelize.STRING
		}
	},{
		freezeTableName:true,
		timestamps:false
	});

export default UserData