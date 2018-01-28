import React from 'react';
import {Button,Icon} from 'antd';
import {Op_end,Op_DRAW} from '../constants/operate';
const ButtonGroup = Button.Group;

const ToolBar = (props) => {

	return (
		<ButtonGroup>
			<Button>拾取</Button>
			<Button onClick={() =>{props.operate(Op_DRAW)}}>添加</Button>
			<Button>删除</Button>
			<Button onClick={()=>{props.operate(Op_end)}}>结束</Button>

		</ButtonGroup>
	)
}

export default ToolBar;