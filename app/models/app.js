import * as Service from '../utils/service';
import LayerGroup from '../containers/LayerGroup';

export default {
	namespace:'app',
	state:{
		OK:false,
		layers:[],
		config:null
	},
	effects:{
		*getPoint({payload},{call,put}){
			const result = yield call(Service.getAll);
			console.log(result);
			yield put({
				type:'addLayer',
				payload:{
					data:result.data,
					name:result.name
				}
			})
		},
		*getConfig({payload},{call,put}){
			const result = yield call(Service.getConfig);
			yield put({
				type:'setConfig',
				payload:result.data
			})
		}

	},
	reducers:{
		addLayer(state,{payload}){
			LayerGroup.addLayer(payload.data,payload.name);
			let config = state.config.filter(value => {
				return value.name !== payload.name
			})
			return {...state,layers:state.layers.concat([{name:payload.name,data:payload.data,config:config}])}
		},
		setConfig(state,{payload}){
			if(state.config === null){
				return {...state,config:payload}
			}
		}
	}
}