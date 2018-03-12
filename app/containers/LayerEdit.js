import React,{Component} from 'react';
import {connect} from 'dva';
import LayerList from '../components/LayerList';
import LayerSelect from '../components/LayerManager';
import ToolBar from '../components/EditTool';
import {Op_DRAW,Op_end,Op_SELECT} from '../constants/operate';
import DataList from '../components/DataList';
import Model from '../components/editModel';
import {featureTotable} from '../actions/util';
import {EDIT_GEOMETRY} from '../constants/model';


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
			payload:data
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
    addFeature = (data) => {
		this.props.dispatch({
			type:'app/addFeature',
			payload:data
		})
	}
	upFeature = (data) => {
		const obj = {
			layername:this.props.app.selectLayer,
			data:data
		}
		this.props.dispatch({
			type:'app/updateFeature',
			payload:obj
		})
	}

	deleteFeature = (data) => {
		const obj = {
			layername:this.props.app.selectLayer,
			data:data
		}
		console.log(obj);
		this.props.dispatch({
			type:'app/deleteFeature',
			payload:obj
		})
	}

    setModel = (type) =>{
	    this.props.dispatch({
            type:'app/setModel',
            payload:type
        })
    }

    CancelFea = () => {
		this.props.dispatch({
			type:'app/cancelFea',
			payload:{}
		})
	}
	setRow = (data) => {
		this.props.dispatch({
			type:'app/setRow',
			payload:data
		})
		this.setModel(EDIT_GEOMETRY);
	}

	operate = (type) => {
		switch (type){
			case Op_DRAW:   //绘图的时候把设置model当做回调函数传入
				this.props.dispatch(
					{
						type:'app/startEdit',
						payload:this.setModel.bind(this)
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
		const {layers,config,selectLayer,dataList,modelType,confirmLoading,dblayers,editRow} = this.props.app;
		const fieldData = dblayers.find((value) => {
			return value.name === selectLayer
		});
        const modelProps = {
            modelType:modelType,
            confirmLoading:confirmLoading,
            setModel:this.setModel,
			selectLayer:selectLayer,
			fieldData:fieldData,
			add:this.addFeature,
			CancelFea:this.CancelFea,
			editRow:editRow,
			update:this.upFeature
        }

		return(
			<div>
			<LayerSelect  getdata={ this.getData } config={layers} title={'开始编辑'}/>
				<br/>
				<ToolBar operate = {this.operate} disable={selectLayer === null} setModel={this.setModel}/>
				<br/>
				{(selectLayer === null)?
					<div>未选中数据</div>:
					<DataList data={dataList} setView={this.setView} deleteFea={this.deleteFeature} setRow={this.setRow} fieldData={fieldData}/>
				}
				<Model {...modelProps}/>
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