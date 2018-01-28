import * as Service from '../utils/service';
import LayerGroup from '../containers/LayerGroup';
import Operate from '../actions/editTool';

/// TODO 完成单个图层的增删改
export default {
	namespace:'app',
	state:{
		OK:false,
		layers:[],
		config:null,
		selectLayer:''
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
		},


	},
	reducers:{
		addLayer(state,{payload}){
			LayerGroup.addLayer(payload.data,payload.name);
			let config = state.config.filter(value => {
				return value.name !== payload.name
			})
			return {...state,layers:state.layers.concat([{name:payload.name,data:payload.data}]),config:config}
		},
		setConfig(state,{payload}){
			if(state.config === null){
				return {...state,config:payload}
			}else {
				return {...state}
			}
		},
		selectLayer(state,{payload}){
			console.log(payload);
			return {...state,selectLayer:payload}
		},
		startEdit(state,{payload}){
			console.log('开始绘图');
			Operate.startDraw(LayerGroup.getLayer(state.selectLayer))
			return {...state}
		},
		OperateEnd(state,{payload}){
			console.log('结束绘图');
			Operate.stop();
			return {...state}
		}
	}
}