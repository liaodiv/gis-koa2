import React,{Component} from 'react';
import {connect} from 'dva';
import LayerList from '../components/LayerList';
import LayerSelect from '../components/LayerManager';
import ToolBar from '../components/EditTool';
import {Op_DRAW,Op_end,Op_SELECT} from '../constants/operate';
import DataList from '../components/DataList';
import Model from '../components/editModel';
import {featureTotable} from '../actions/util';
import Modal from "antd/lib/modal/Modal.d";

//http://openlayers.org/en/latest/apidoc/ol.source.Vector.html#getFeatures
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

		this.props.dispatch({
			type:'app/setList',
			payload:{}
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
	setView = (ol_uid) => {
	    this.props.dispatch({
            type:'app/setView',
            payload:ol_uid
        })
    }

    setModel = (type) =>{
	    this.props.dispatch({
            type:'app/setModel',
            payload:type
        })
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
			case Op_SELECT:
				this.props.dispatch({
					type:'app/startSelect',
					payload:{}
				})

		}

	}

	render(){
		const {layers,config,selectLayer,dataList,modelType,confirmLoading} = this.props.app;
        const modelProps = {
            modelType:modelType,
            confirmLoading:confirmLoading,
            setModel:this.setModel
        }

		return(
			<div>
			<LayerSelect  getdata={ this.getData } config={layers} title={'开始编辑'}/>
				<br/>
				<ToolBar operate = {this.operate} disable={selectLayer === null} setModel={this.setModel}/>
				<br/>
				{(selectLayer === null)?
					<div>未选中数据</div>:
					<DataList data={dataList} setView={this.setView} />
				}
				<Modal {...modelProps}/>
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