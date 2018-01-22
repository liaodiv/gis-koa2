import React from 'react'
import {Switch,Route,routerRedux} from 'dva/router'
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const { ConnectedRouter} = routerRedux

const Login = () => {
	return (
		<div>Login in </div>
	)
}

const Sider = () => {
	return (
		<div>SIder</div>
	)
}

export default function Routers({history}) {
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path={'/'} component={Login}/>
					<Route path={'/home'} component={Sider}/>
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	)
}