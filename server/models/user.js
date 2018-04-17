import {Sequelize,sequelzie} from "../db/dbSever";

 const User = sequelzie
	.define('user_table',{
		gid:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		name:{
			type:Sequelize.STRING
		},
		password:{
			type:Sequelize.STRING
		}
	},{
		freezeTableName:true,
		timestamps:false
	});

export default User;