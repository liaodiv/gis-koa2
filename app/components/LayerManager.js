//通过seleact查看现有的图层，添加成功后显示到先下面

import React,{Component} from 'react';
import {Form, Select, Button} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;


function SelectO(props) {
	if(props.config === null){
		return( <Select style={{width: 200}}>
		</Select>)
	}else {
		return(
			<Select style={{width: 200}} onChange={props.onChange}>
				{
					props.config.map(data => {
						return (
							<Option value={data.name} key={data.name}>{data.name}</Option>
						)
					})
				}
				{/*<Option value="task">task1</Option>
							<Option value="task1">task1</Option>
							<Option value="task2">task3</Option>*/}
			</Select>
		)
	}
}

class LayerForm extends Component {
	constructor(props){
		super(props);
		this.state ={
			select:''
		}
	}
	componentDidMount() {
		// To disabled submit button at the beginning.
		//this.props.form.validateFields();
	}
	handleSubmit = (e) => {
		e.preventDefault();
		console.log('提交');
		const getdata = this.props.getdata;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				getdata(values.select);
			}
		});
	};
	handleCurrencyChange = (currency) => {
		if (!('value' in this.props)) {
			this.setState({ currency });
		}
		this.triggerChange({ currency });
	}
	triggerChange = (changedValue) => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(Object.assign({}, this.state, changedValue));
		}
	}
	render() {
		const {getFieldDecorator} = this.props.form;
		const {config,title} = this.props;
		return (
			<Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
				<Form.Item>
					{getFieldDecorator('select', {
						rules: [
							{required: true, message: '选择图层'}
						]
					})(
						<SelectO config={config} onChange={this.handleCurrencyChange}/>
					)
					}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">{title}</Button>
				</Form.Item>

			</Form>
		)
	}

}




export default Form.create()(LayerForm);