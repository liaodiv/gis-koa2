/**
 * Created by liao on 2017/12/31.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

const App=()=>{
	return(
		<div> this is a noe</div>
	)
}

ReactDOM.render(<div>hello koa<App/></div>,document.getElementById('root'))