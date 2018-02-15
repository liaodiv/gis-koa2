import React from 'react';
import {Button,Icon,message} from 'antd';
import {Op_end,Op_DRAW,Op_SELECT} from '../constants/operate';
const ButtonGroup = Button.Group;

const ToolBar = (props) => {
    const {disable} =props;
	return (
		<ButtonGroup>
			<Button disabled={disable} onClick={() =>{
				props.operate(Op_SELECT);
				message.success('开始选中');
			}} >拾取</Button>
			<Button disabled={disable}  onClick={() =>{
				props.operate(Op_DRAW);
				message.success('开始绘图');
			}}>添加</Button>
			<Button disabled={disable} onClick={()=>{
				props.operate(Op_end);
				message.success('结束操作');
			}}>结束</Button>

		</ButtonGroup>
	)
}

export default ToolBar;