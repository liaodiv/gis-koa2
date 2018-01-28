import React,{Component} from 'react';
import {connect} from 'dva';
import LayerList from '../components/LayerList';
import LayerSelect from '../components/LayerManager';
import ToolBar from '../components/EditTool';
import {Op_DRAW,Op_end} from '../constants/operate';
import DataList from '../components/DataList';
import {featureTotable} from '../actions/util';

class LayerEdit extends Component{
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

	getData =(data)=>{
		this.props.dispatch({
			type:'app/selectLayer',
			payload:data.select
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

	operate = (type) => {
		switch (type){
			case Op_DRAW:
				this.props.dispatch(
					{
						type:'app/startEdit',
						payload:{}
					}
				);
				break;
			case Op_end:
				this.props.dispatch(
					{
						type:'app/OperateEnd',
						payload:{}
					}
				);
				break;

		}

	}

	render(){
		const {layers,config} = this.props.app;
		return(
			<div>
			<LayerSelect  getdata={ this.getData } config={layers} title={'开始编辑'}/>
				<br/>
				<ToolBar operate = {this.operate}/>
				<br/>
				<DataList data={featureTotable(layers[0].data.features)}/>

			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		app:state.app
	}
}

export default connect(mapStateToProps)(LayerEdit);