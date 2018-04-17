import React from 'react';
import {Button} from 'antd';
import {connect} from 'dva';
import './views.css';
import {DISPLAY_THREE,DISPLAY_MAP} from '../constants/model';
const ButtonGroup = Button.Group;

const Switch = (props)=>{
	const {dispatch} = props;
	function onChange(value) {
		//console.log(`radio checked:${e.target.value}`)
		dispatch({
			type:'app/setMap',
			payload:value
		})

	}
	return(
	<div className="views">
		<ButtonGroup  defaultValue={DISPLAY_MAP}>
			<Button onClick={()=>{onChange(DISPLAY_MAP)}} value={DISPLAY_MAP}>平面图</Button>
			<Button onClick={()=>{onChange(DISPLAY_THREE)}} >三维图</Button>
		</ButtonGroup>
	</div>
	)
}
function mapStateToProps(state) {
	return {
		app:state.app
	}
}

export default  connect()(Switch);