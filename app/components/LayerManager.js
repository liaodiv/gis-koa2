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
			<Select style={{width: 200}}>
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
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getdata();
	/*	props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				props.getData();
			}
		});*/
	};
	render() {
		const {getFieldDecorator} = this.props.form;
		const {config} = this.props;
		return (
			<Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
				<Form.Item>
					{getFieldDecorator('select', {
						rules: [
							{required: true, message: '选择图层'}
						]
					})(
						<SelectO config={config}/>
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

/*const Test = (props) => {
	return(
	<Form layout="inline" onSubmit={()=>{}}>

		<Form.Item>
			<Button type="primary" htmlType="submit">添加图层</Button>
		</Form.Item>

	</Form>
	)
}*/


export default Form.create()(LayerForm);