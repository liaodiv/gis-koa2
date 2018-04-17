import React,{Component} from 'react';
import {connect} from 'dva';
import LayerList from '../components/LayerList';
import LayerSelect from '../components/LayerManager';
import ColorModal from '../components/colorModal';
import NewLayerModal from '../components/newLayerModal';
import {COLOR,NEW_LAYER} from '../constants/model';
import {Button} from 'antd';
import {routerRedux} from 'dva/router';

class LayerCone extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount() {
		//console.log('container add',this.props.login.user)
		//this.getConfig(this.props.login.user.gid);
		if(this.props.login.user === ""){
			//跳转到登录
			console.log('跳转');
			this.props.dispatch({
				type:'app/router',
				payload:'/login'
			})
			//routerRedux.push('/login');
		}
	}

	componentWillUnmount() {
		console.log('container delete')
	}

	getData =(data)=>{
		this.props.dispatch({
			type:'app/getLayerId',
			payload:data
		})
	}
	getConfig= (id) => {
		this.props.dispatch(
			{
				type:'app/getConfig',
				payload:id
			}
		)
	}
	setColor = (data) => {
		this.props.dispatch({
			type:'app/selectColor',
			payload:data
		});
		this.props.dispatch({
			type:'app/setModel',
			payload:COLOR
		})
	}
	setModel = (type) =>{
		this.props.dispatch({
			type:'app/setModel',
			payload:type
		})
	}

	setLayerColor = (data) => {
		this.props.dispatch({
			type:'app/setLayerColor',
			payload:data
		});
		this.setModel('')
	}

	addLayer = (data) => {
		this.props.dispatch({
			type:'app/newLayer',
			payload:data
		})
	}


	render(){
		const {layers,config,selectColor,modelType,dblayers} = this.props.app;
		//console.log('login',this.props)
		const {user} = this.props.login;
		const newLayerProps = {
			modelType:modelType,
			confirmLoading:false,
			setModel:this.setModel,
			config:config,    //地图模板数据
			addLayer:this.addLayer,
			user:user
		}
		const colorProps={
			selectColor:selectColor,
			modelType:modelType,
			setModel:this.setModel,
			setLayerColor:this.setLayerColor
		}
		return(
			<div>
				<LayerSelect getdata={(id) => {
					const data = dblayers.find((value) =>{
						return value.gid === id
						}
					);
					this.getData(data) //一个图层组织数据
					console.log(data);
				}} config={dblayers}  title={'加载'}>
					<Button onClick={() =>{ this.setModel(NEW_LAYER)} }>新建</Button>
				</LayerSelect>

				<br/>
				<LayerList data={layers} setColor={this.setColor}/>
				{ selectColor && <ColorModal {...colorProps}/>}
				<NewLayerModal {...newLayerProps}/>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		app:state.app,
		login:state.login
	}
}

export default connect(mapStateToProps)(LayerCone);