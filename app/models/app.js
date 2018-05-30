import * as Service from '../utils/service';
import LayerGroup from '../containers/LayerGroup';
import Operate from '../actions/editTool';
import {animate,ligter,setLayerColor} from '../actions/mapTool';
import {featureTotable,sourceToTable} from '../actions/util';
import {message} from 'antd';
import {routerRedux} from 'dva/router';


/// TODO 完成单个图层的增删改
/// TODO (1) 二三维图层切换 二三维数据自动显示 三个显示模式 二维/三维同时分屏显示
export default {
	namespace:'app',
	state:{
		OK:false,
		layers:[],
		config:[],
		dblayers:[],
		selectLayer:null,
		selectColor:null,
		dataList:[],
        modelType:"",    //当前显示modal种类
		editRow:null,    //当前编辑的表格数据
        confirmLoading:false,
		mapType:"二维图"
	},
	subscriptions:{
		setup ({dispatch,history}){
			history.listen(({pathname}) => {

				if(pathname === '/'){
					console.log('跳转',pathname);
					dispatch({type:'router',payload:'/login'})
				}
			})
		}
	},
	effects:{
		*router({payload},{call,put}){
			yield put(routerRedux.push(payload))
		},
		*getLayer({payload},{call,put}){
			const result = yield call(Service.getAll,payload);
			console.log(result);
			yield put({
				type:'addLayer',
				payload:{
					data:result.data,
					name:result.name
				}
			})

		},
		/*payload layername layerid modelname
		* */
		*getLayerId({payload},{call,put}){
			const result = yield call(Service.getLayerId, payload);
			console.log('图层数据',result);
			yield put({
				type:'addLayer',
				payload:{
					data:result.data,
					name:payload.name,
					model:result.model,
					gid:payload.gid
				}
			})
		},
		//payload 为 当前用户的id
		*getConfig({payload},{call,put}){
			const result = yield call(Service.getConfig);
			const layers = yield call(Service.getLayer,payload);
			console.log('图层数据',layers);
			yield put({
				type:'setConfig',
				payload: {
					config:result.data,
					dblayers:layers.data
				}
			})
		},
		*addFeature({payload},{call,put}){
			const result = yield call(Service.addFeature,payload);
			if(result.code === 1){
				message.success('添加成功')
				yield put({
					type:'setModel',
					payload:''
				})
				yield put({
					type:'addOneTable',
					payload:result.data
				})
			}
		},
		*deleteFeature({payload},{call,put}){
			const result = yield call(Service.deleteFeature,payload);
			if(result.code === 1 ){
				message.success('删除成功')
				yield put({
					type:'deleteOneTable',
					payload:payload
				})

				//删除表格中的此数据
				//删除地图上的此点
			}else {
				message.error('删除失败')
			}
		},
		*updateFeature({payload},{call,put}){
			const result = yield call(Service.updateFeature,payload);
			if(result.code === 1){
				message.success('更新成功');
				yield put({
					type:'upOneTable',
					payload:payload
				})

			}else {
				message.error('更新失败')
			}
			yield put({
				type:'setModel',
				payload:''
			})
		},
		*newLayer({payload},{call,put}){
			const result = yield call(Service.addLayer,payload);
			if(result.code === 1){
				message.success('添加成功');
				console.log('添加成功',result)
				yield put({
					type:'pushLayer',
					payload:result.data
				})

				yield put({
					type:'upOneTable',
					payload:payload
				})

			}else {
				message.error('更新失败')
			}
			yield put({
				type:'setModel',
				payload:''
			})
		}

	},
	reducers:{
		/// TODO 保存好configlayers
		addLayer(state,{payload}){
			//修改 select只获取name
			LayerGroup.addLayer(payload.data,payload.name);
			let dblayers = state.dblayers.filter(value => {
				return value.name !== payload.name
			})
			return {...state,layers:state.layers.concat([{...payload,color:'#DEB887'}]),dblayers:dblayers}
		},
		setConfig(state,{payload}){
				return {...state,...payload}
		},
		selectLayer(state,{payload}){
			console.log(payload);
			return {...state,selectLayer:payload}
		},
		selectColor(state,{payload}){
			return {...state,selectColor:payload};
		},
		startEdit(state,{payload}){
			Operate.startDraw(
				LayerGroup.getLayer(state.selectLayer.name),
				state.config.find((value) => {
					return value.name === state.selectLayer.model
					})
					.type,
				payload)
			return {...state}
		},
		startSelect(state,{payload}){
			Operate.startSelect(LayerGroup.getLayer(state.selectLayer.name))
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
			const datalist = sourceToTable(LayerGroup.getSource(state.selectLayer.name))//featureTotable(geodata.data.features);
			console.log('datalsit',datalist);
			return {...state,dataList:datalist}
		},
        setView(state,{payload}){
		    //payload 为uid  1getfeature
            const feature = LayerGroup.getSource(state.selectLayer.name).getFeatureById(payload);
            animate(feature.getGeometry());
            ligter(feature);
            return {...state}
        },
        setModel(state,{payload}){
            return {...state,modelType:payload}
        },
		setMap(state,{payload}){
			return {...state,mapType:payload}
		},
		//payload 为一个geojson队形
		addOneTable(state,{payload}){ //更新数据到表格
			let obj = payload.properties;
			obj.uid = obj.gid;
			let tabledata =  [...state.dataList,obj];
			//设置feature
			window.addFeature.setId(obj.gid);
			window.addFeature = null;
			return {...state,dataList:tabledata}
		},
		upOneTable(state,{payload}){
			/// 修改表格中展示的值
			let tableData = state
							.dataList
							.map((value)=> {
								if(value.gid === payload.data.id){
									return {
										...value,
										...payload.data.obj   ///用新的值覆盖
									}
								}else {
									return value
								}
							});
			return {...state,dataList:tableData};
		},
		cancelFea(state,{payload}){
			console.log('cancel',state.selectLayer)
			LayerGroup.deleteFea(state.selectLayer,window.addFeature);
			window.addFeature = null;
			return{...state}
		},
		deleteOneTable(state,{payload}){
			LayerGroup.deleteOne(state.selectLayer,payload.data.gid);
			const tabledata = state
							.dataList
							.filter((value) => {
								return value.gid !== payload.data.gid
							});
			return {...state,dataList:tabledata};
		},
		setRow(state,{payload}){
			return {...state,editRow:payload}
		},
		setLayerColor(state,{payload}){
			console.log(payload);
			setLayerColor(LayerGroup.getLayer(payload.layer),payload.color);
			const layers = state.layers.map(value => {
				if(value.name === payload.layer){
					value.color = payload.color;
					return value
				}else {
					return value;
				}
			})
			return{...state,layers:layers}
		},
		pushLayer(state,{payload}){
			return {...state,dblayers:[...state.dblayers,payload]}
		}

	}
}