import React ,{Component} from 'react';
import threeEntryPoint from './threeEntryPoint';
import './style.css'

export default class ThreeContainer extends Component{
	componentDidMount(){
		threeEntryPoint(this.threeRootElement);

	}

	render(){
		return (
			<div className="three-con" ref={ element => this.threeRootElement = element }/>
		)
	}
}