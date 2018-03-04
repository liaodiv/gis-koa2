
/**
 * Created by liao on 2018/2/20.
 */
import React from 'react';
import {Modal,Button,Form,Input} from 'antd';
import {ADD_GEOMETRY} from '../constants/model';
import Aform from './small/autoForm';

const FormItem = Form.Item;
const Model = (props) => {
	///TODO 根据field字段生成编辑框
    const {modelType,confirmLoading,fieldData} = props;
	const { getFieldDecorator,validateFields,getFieldsValue,getFieldValue,resetFields} = props.form;

	const formItemLayout = {
		labelCol: {span: 4},
		wrapperCol: {span: 18}
	}
	const handle = (data)=> {
		validateFields((err,values)=> {
			if(!err){
				console.log('Received values of form: ', values);
			}
		})
	}
	const AForm = () => {
		if(fieldData){
			return(
				<Form>
					{fieldData.field.map((value, index) => {
						return(
							<FormItem label={value.display} {...formItemLayout} key={index}>
								{
									getFieldDecorator(value.database, {
										rules: [{required: true, message: "请输入值"}]
										//initialValue:initValue('toolname')
									})(<Input/>)
								}
							</FormItem>
						)
					})
					}
				</Form>
			)
		}

	}
    return(
        <Modal
            title="添加数据"
            onOk={handle}
            onCancel={()=>{}}
            visible = {modelType === ADD_GEOMETRY}
            confirmLoading={confirmLoading}
        >
			{/*<Aform fieldData={fieldData}/>*/}
			<AForm/>

        </Modal>
    )
}
export default Form.create()(Model);