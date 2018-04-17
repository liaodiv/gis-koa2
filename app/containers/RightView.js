import React from 'react';
import {connect} from 'dva';
import {DISPLAY_BOTH,DISPLAY_MAP,DISPLAY_THREE} from '../constants/model'
import Map from './MapView';
import THREE_MAP from '../components/three/container';
const Right = (props) => {
	const {mapType} = props.app;
	console.log(mapType);
	return (
		<div style={ { "height":"100%" } }>
			{mapType === DISPLAY_MAP && <Map/>}
			{mapType === DISPLAY_THREE && <THREE_MAP/> }
		</div>

	)
}
function mapStateToProps(state) {
	return {
		app:state.app
	}
}
export default connect(mapStateToProps)(Right)