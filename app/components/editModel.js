
/**
 * Created by liao on 2018/2/20.
 */
import React from 'react';
import {Modal,Button,Form,Input} from 'antd';
import {ADD_GEOMETRY,EDIT_GEOMETRY} from '../constants/model';
import GeoJson from 'ol/format/geojson';
import Aform from './small/autoForm';


const FormItem = Form.Item;
const Model = (props) => {
	///TODO 根据field字段生成编辑框
	///TODO 增加修改编辑
    const {modelType,confirmLoading,fieldData,add,setModel,CancelFea,editRow,update,selectLayer} = props;
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
			if(modelType === ADD_GEOMETRY) {
				values.geom = new GeoJson().writeGeometryObject(window.addFeature.getGeometry());
				const postData = {
					layername:selectLayer,
					data:values
				}
				add(postData);
			}else {
				update({
					obj:{
						...values
					},
					id:editRow.gid
				})

			}
		})
	}

	const getInitValue = (title) => {
		if(modelType === EDIT_GEOMETRY ){
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
				if(modelType === ADD_GEOMETRY) {
					CancelFea();
				}

            }}
            visible = {modelType === ADD_GEOMETRY || modelType === EDIT_GEOMETRY}
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
									rules: [{required: true, message: "请输入值"}],
									initialValue:getInitValue(value.database)
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