import { routerRedux } from 'dva/router';
import {login} from '../utils/service';
import {message} from 'antd';

export default {
	namespace: 'login',
	state: {
		user:''
	},
	reducers:{
		setlogin(state,{payload}){
			return {...state,user:payload}
		}
	},

	effects: {
		* login ({payload}, { put, call, select }) {
			const data = yield call(login,payload);
			console.log('logining',data)
			const result={
				success:1
			}

			/*const { locationQuery } = yield select(_ => _.app)*/
			if (data.code)
			{
				/*const { from } = locationQuery*/
				/*yield put({ type: 'app/query' })*/


				const logindata =  data.data;
				yield put({type:'setlogin',payload:{...logindata}})
				yield put({type:'app/getConfig',payload:logindata.gid}) //登录的时候获取初始化数据
				yield put(routerRedux.push('/home')); //导航放到最后

			} else {
				message.error('密码或用户名错误')
				//throw data
			}
		},
	},

}
