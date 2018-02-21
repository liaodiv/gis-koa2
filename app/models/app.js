import * as Service from '../utils/service';
import LayerGroup from '../containers/LayerGroup';
import Operate from '../actions/editTool';
import {animate} from '../actions/mapTool';
import {featureTotable,sourceToTable} from '../actions/util';


/// TODO 完成单个图层的增删改
export default {
	namespace:'app',
	state:{
		OK:false,
		layers:[],
		config:null,
		selectLayer:null,
		dataList:[],
        modelType:"",
        confirmLoading:false
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
			Operate.startDraw(LayerGroup.getLayer(state.selectLayer))
			return {...state}
		},
		startSelect(state,{payload}){
			Operate.startSelect(LayerGroup.getLayer(state.selectLayer))
			return {...state}
		},
		OperateEnd(state,{payload}){
			Operate.stop();
			return {...state}
		},
		setList(state,{payload}){
			//console.log(sourceToTable(LayerGroup.getSource(state.selectLayer)));
			/*const geodata = state.layers.find((value)=>{
				return value.name === state.selectLayer
			})*/
			const datalist = sourceToTable(LayerGroup.getSource(state.selectLayer))//featureTotable(geodata.data.features);
			console.log('datalsit',datalist);
			return {...state,dataList:datalist}
		},
        setView(state,{payload}){
		    //payload 为uid  1getfeature
            const feature = LayerGroup.getSource(state.selectLayer).getFeatureById(payload);
            animate(feature.getGeometry());
            return {...state}
        },
        setModel(state,{payload}){
            return {...state,modelType:payload}
        }

	}
}