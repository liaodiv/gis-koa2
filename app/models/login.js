import { routerRedux } from 'dva/router'


export default {
	namespace: 'login',

	state: {},
	reducers:{
		login1(state,{payload}){

		}
	},

	effects: {
		* login ({
					 payload,
				 }, { put, call, select }) {
			console.log('logining')
			const result={
				success:1
			}

			const data = result;/*yield call(login, payload)*/
			/*const { locationQuery } = yield select(_ => _.app)*/
			if (data.success) {
				/*const { from } = locationQuery*/
				/*yield put({ type: 'app/query' })*/

				yield  put(routerRedux.push('/home'))

			} else {
				throw data
			}
		},
	},

}
