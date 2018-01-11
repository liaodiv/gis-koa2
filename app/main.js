/**
 * Created by liao on 2017/12/31.
 */
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
	</Provider>,document.getElementById('root'))