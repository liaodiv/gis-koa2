import React from 'react';
import {connect} from 'dva';
import {Button,Row,Form,Input} from 'antd';
import styles from '../css/components/login.css';

const FormItem = Form.Item;

const Login = ({
				   loading,
				   dispatch,
				   form: {
					   getFieldDecorator,
					   validateFieldsAndScroll,
				   },
			   }) => {
	function handleOk () {
		validateFieldsAndScroll((errors, values) => {
			if (errors) {
				return
			}
			dispatch({ type: 'login/login', payload: values })
		})
	}

	return (
		<div className="login">
			<div className="login logo">
			{/*	<img alt={'logo'} src={config.logo} />*/}

			</div>
			<form className='login form'>
				<FormItem hasFeedback>
					{getFieldDecorator('username', {
						rules: [
							{
								required: true,
							},
						],
					})(<Input size="large" onPressEnter={handleOk} placeholder="Username" />)}
				</FormItem>
				<FormItem hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
							},
						],
					})(<Input size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
				</FormItem>
				<Row>
					<Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>
						Sign in
					</Button>
					<p>
					>
					</p>
				</Row>

			</form>
		</div>
	)
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))