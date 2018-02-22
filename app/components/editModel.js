
/**
 * Created by liao on 2018/2/20.
 */
import React from 'react';
import {Modal,Button,Form,Input} from 'antd';
import {ADD_GEOMETRY} from '../constants/model';

const FormItem = Form.Item;
const Model = (props) => {
    const {modelType,confirmLoading} = props;
	const { getFieldDecorator,validateFields,getFieldsValue,getFieldValue,resetFields} = props.form;

	const formItemLayout = {
		labelCol: {span: 4},
		wrapperCol: {span: 18}
	}
    return(
        <Modal
            title="添加数据"
            onOk={()=>{}}
            onCancel={()=>{}}
            visible = {modelType === ADD_GEOMETRY}
            confirmLoading={confirmLoading}
        >
			<Form>
				<FormItem label="工具" {...formItemLayout}>
					{
						getFieldDecorator('toolname',{
							rules:[{ required: true ,message:"值"}]
							//initialValue:initValue('toolname')
						})(<Input />)
					}
				</FormItem>
			</Form>

        </Modal>
    )
}
export default Form.create()(Model);