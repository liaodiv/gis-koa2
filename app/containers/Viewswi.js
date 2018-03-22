import React from 'react';
import {Radio} from 'antd';
import './views.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Switch = (rops)=>{
	return(
	<div className="views">
		<RadioGroup defaultValue="2">
			<RadioButton value="2">平面图</RadioButton>
			<RadioButton value="3">三维图</RadioButton>
		</RadioGroup>
	</div>
	)
}

export default  Switch;