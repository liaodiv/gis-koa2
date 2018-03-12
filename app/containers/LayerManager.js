import React,{Component} from 'react';
import {connect} from 'dva';
import LayerList from '../components/LayerList';
import LayerSelect from '../components/LayerManager';
import ColorModal from '../components/colorModal';
import {COLOR} from '../constants/model';

class LayerCone extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount() {
		this.getConfig();
		console.log('container add')
	}

	componentWillUnmount() {
		console.log('container delete')
	}

	getData =(layername)=>{
		this.props.dispatch({
			type:'app/getLayer',
			payload:layername
		})
	}
	getConfig= () => {
		this.props.dispatch(
			{
				type:'app/getConfig',
				payload:{}
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


	render(){
		const {layers,config,selectColor,modelType} = this.props.app;

		const colorProps={
			selectColor:selectColor,
			modelType:modelType,
			setModel:this.setModel,
			setLayerColor:this.setLayerColor
		}
		return(
			<div>
				<LayerSelect getdata={this.getData} config={config} title={'添加图层'}/>
				<br/>
				<LayerList data={layers} setColor={this.setColor}/>
				{ selectColor && <ColorModal {...colorProps}/>}
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		app:state.app
	}
}

export default connect(mapStateToProps)(LayerCone);