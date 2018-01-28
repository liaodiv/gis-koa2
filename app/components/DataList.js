import React from 'react';
import {Table} from 'antd';

const List = (props) => {
	const columns =[{
		title:'id',
		dataIndex:'gid'
	},{
		title:'name',
		dataIndex:'name'
	}]
	return (
		<div>
			<Table
				columns={columns}
				dataSource={props.data}
				size="middle"/>
		</div>
	)
}

export default List;