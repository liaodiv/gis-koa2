import React from 'react';
import {Table,Dropdown} from 'antd';
import DropOption from './small/DropOption';

//点击定位 操作删除
const List = (props) => {
    const {setView,deleteFea,setRow}  = props;

	/**
	 * menu按钮触发函数
	 * @param record
	 * @param key
	 */
    function droplist(record,key) {
    	switch (key){
			case '1':
				setView(record.uid)
				break;
			case '2':
				setRow(record);
				break;
			case '3':
				deleteFea({gid:record.uid})
				break;
		}
    }
	const columns =[{
		title:'id',
		dataIndex:'gid',
		key:'id'
	},{
		title:'name',
		dataIndex:'name',
		key:'name'

	},{
		title:'操作',
		key:'operation',
		render:(text,record) =>{
			return <DropOption
                menuOptions={[{ key: '1', name: '定位' }, { key: '2', name: '修改' },{key:'3',name:'删除'}]}
                onMenuClick={droplist.bind(null,record)}
            />
		}
	}]
	return (
		<div>
			<Table
				columns={columns}
				dataSource={props.data}
				size="middle"
                rowKey={(record => {
                    return record.uid
                })}
			/>
		</div>
	)
}

export default List;