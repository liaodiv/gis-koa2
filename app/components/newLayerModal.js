import React from 'react';
import {Modal,Button,Form,Input,Select,message} from 'antd';
import {NEW_LAYER} from '../constants/model';
import GeoJson from 'ol/format/geojson';

const Option = Select.Option;
const FormItem = Form.Item;
const Model = (props) => {
	///TODO 根据field字段生成编辑框
	///TODO 增加修改编辑
	const {modelType,confirmLoading,setModel,config,addLayer,user} = props;
	const { getFieldDecorator,validateFields} = props.form;

	const formItemLayout = {
		labelCol: {span: 4},
		wrapperCol: {span: 18}
	}
	const handle = (data)=> {
		validateFields((err,values)=> {
			if(!err){
				values.userid = user.gid;
				console.log('Received values of form: ', values);
				if(values.userid) {
					addLayer(values);
				}else {
					message.error('用户登录错误');
				}
			}
			//调用添加地图函数
		})
	}

	const getInitValue = (title) => {
		if(modelType === NEW_LAYER ){
			return editRow[title];
		}else {
			return '';
		}
	}
	return(
		<Modal
			title= {modelType}
			onOk={handle}
			onCancel={()=>{
				setModel(''); //关闭模态框
				//删除添加进去的feature
			}}
			visible = {modelType ===  NEW_LAYER}
			confirmLoading={confirmLoading}
		>
			<Form>

				<FormItem label={"图层名"} {...formItemLayout} >
					{
						getFieldDecorator('name', {
							rules: [{required: true, message: "请输入值"}]
							//initialValue:getInitValue(value.database)
						})(<Input/>)
					}</FormItem>
				<FormItem label={"图层模板"} {...formItemLayout} hasFeedback>
					{
						getFieldDecorator('modelname',{rules: [{required: true, message: "请输入值"}]})
						(<Select>
							{
								config && config.map((value) => {
									return (<Option value={value.name} key={value.name}>{value.name}</Option>)
								})
							}
						</Select>)

					}
				</FormItem>

			</Form>

		</Modal>
	)
}
export default Form.create()(Model);