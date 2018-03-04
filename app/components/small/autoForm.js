import React from 'react';
import {Modal,Form,Input} from 'antd';

const FormItem = Form.Item;

const Aform = (props) => {
	const {fieldData} = props;
	const { getFieldDecorator,validateFields,getFieldsValue,getFieldValue,resetFields} = props.form;
	const formItemLayout = {
		labelCol: {span: 4},
		wrapperCol: {span: 18}
	}
	console.log(fieldData);

	function handleSubmit(e) {
		validateFields((err,values)=> {
			if(!err){
				console.log('Received values of form: ', values);
			}
		})
	}
	return(
		<Form>
			{
				fieldData.field.map((value,index) => {
					return (
						<FormItem label={value.display} {...formItemLayout} key={index}>
							{
								getFieldDecorator(value.database,{
									rules:[{ required: true ,message:"值"}]
									//initialValue:initValue('toolname')
								})(<Input />)
							}
						</FormItem>
					)
				})
			}
			<FormItem label="工具" {...formItemLayout}>
				{
					getFieldDecorator('toolname',{
						rules:[{ required: true ,message:"值"}]
						//initialValue:initValue('toolname')
					})(<Input />)
				}
			</FormItem>


		</Form>
	)
}

export default Form.create()(Aform)