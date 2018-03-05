
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
    const {modelType,confirmLoading,fieldData,add} = props;
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
			//添加地理属性信息
			values.geom = window.addFeature;
			 add(values);
		})
	}
    return(
        <Modal
            title="添加数据"
            onOk={handle}
            onCancel={()=>{}}
            visible = {modelType === ADD_GEOMETRY}
            confirmLoading={confirmLoading}
        >

			<Form>
			{
				fieldData &&  //条件渲染判断是否存在
				fieldData.field.map((value, index) => {
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

        </Modal>
    )
}
export default Form.create()(Model);