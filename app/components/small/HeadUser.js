import React from 'react';
import { Menu,Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const Header = () => {
	return (
		<div className='head-user'>
		<Menu >
		<SubMenu
			style={{float:'right'}}
			title={<span>
				<Icon type="user"/>
				admin
			</span>}
		>
			<Menu.Item key="logout">
				登出
			</Menu.Item>

		</SubMenu>
		</Menu>

		</div>
	)
}

export default Header;