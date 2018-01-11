//通过seleact查看现有的图层，添加成功后显示到先下面

import React from 'react';
import {Form, Select , Button  } from 'antd';
import { FetchGet } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const  Option = Select.Option;

class layerM extends React.Component{
    constructor(props){
        super(props);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.FetchGet(values);
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;

        return (
        <Form layout="inline" onSubmit = { this.handleSubmit } >
            <Form.Item>
                {getFieldDecorator('select',{
                  rules:[
                      {required:true,message:'选择图层'}
                  ]
                })(
                    <Select  style={{width: 200}}>
                        <Option value="task">task1</Option>
                        <Option value="task1">task1</Option>
                        <Option value="task2">task3</Option>
                    </Select>
                    )
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">添加图层</Button>
            </Form.Item>

        </Form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ FetchGet },dispatch);
}

export default connect(null,mapDispatchToProps)(Form.create()(layerM));