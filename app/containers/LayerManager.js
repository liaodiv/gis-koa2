import React,{Component} from 'react';
import {connect} from 'dva';
import LayerList from '../components/LayerList';
import LayerSelect from '../components/LayerManager';

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

	getData =()=>{
		this.props.dispatch({
			type:'app/getPoint',
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

	render(){
		const {layers,config} = this.props.app;
		return(
			<div>
				<LayerSelect getdata={this.getData} config={config} title={'添加图层'}/>
				<br/>
				<LayerList data={layers}/>
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