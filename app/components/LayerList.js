import  React ,{ Component } from 'react';
import { List , Switch } from 'antd';
import {connect} from 'react-redux';
import LayerG from '../containers/LayerGroup';

const  data = ['layer1','layer2','layer3'];

class LayerList extends  Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };

    }
    render(){
        return(
            <List
                dataSource={this.props.data}
                bordered
                renderItem={ item => (
                    <List.Item actions={
                        [<Switch defaultChecked={true} onChange={ (checked) =>{
                              LayerG.setVisible(item.name ,checked);
                            }
                        }/>]}>
                        {item.name}</List.Item>
                ) }>
            </List>
        )
    }
}

function mapStateToProps(state) {
    console.log('获取state',state);

    return {data:state.layers}; //=== {weather:weather}
}
export default connect(mapStateToProps)(LayerList);