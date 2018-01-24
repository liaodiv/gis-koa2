/**
 * Created by liao on 2017/12/31.
 */
/*
import React from 'react';
import  ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
import App from './app';



ReactDOM.render(
	<Provider store = {createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
		<App/>
	</Provider>,document.getElementById('root'))*/

import {message} from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import {createHashHistory} from 'history'
import 'babel-polyfill'

import appmodel from './models/app'
import router from './router'

const app = dva({
	...createLoading({
		effects: true
	}),
	history:createHashHistory(),
	onError (error){
		message.error(error.message)
	}
})

app.use(createLoading())

app.model(appmodel)

app.router(router)

app.start('#root')
