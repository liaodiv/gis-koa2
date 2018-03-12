import React from 'react';
import {Modal} from 'antd';
import {CirclePicker} from 'react-color';
import {COLOR} from '../constants/model';

const ColorModal = (props) => {
	const {modelType,selectColor,setLayerColor,setModel} = props;
	let color=null;

	return(
	<Modal
		title={modelType}
		onOk={()=> {}}
		onCancel={ () => {
			setModel('')
		}}
		visible={modelType === COLOR}
	>
		<CirclePicker
			color={selectColor.color}
		/*	onSwatchHover={(color,event)=>{
				console.log('颜色',color,event);
			}}*/
			onChangeComplete={(color,event) => {
				//console.log('颜色',color.hex,event);
				setLayerColor({
					layer:selectColor.name,
					color:color.hex
				})
			}}
		/>

	</Modal>
	)

}

export default ColorModal;