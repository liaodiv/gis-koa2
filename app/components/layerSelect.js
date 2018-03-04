import React,{Component} from 'react';
import {Form, Select , Button  } from 'antd';
import { connect } from 'react-redux';
import Selectl from 'ol/interaction/select';
import Condition from 'ol/events/condition';
import LayerG from '../containers/LayerGroup';

const FormItem = Form.Item;
const  Option = Select.Option;

class LayerS extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:''
        }

    }

    startQuery = (e) => {
        let layer = LayerG.getLayer(this.state.value);
        this.selectSingleClick = new Selectl({
            layers:[layer]
        });
        window.map.addInteraction(this.selectSingleClick);
        console.log('开始查询',this.state.value);
    }
    endQuery = (e) => {
        window.map.removeInteraction(this.selectSingleClick)
        console.log('结束查询');
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return(
            <Form  >
                <Form.Item>
                  <Select  style={{width: 200}} onChange={ (value1)=>{
                      this.setState({value:value1});
                  }}>
                      {this.props.datas.map(
                (data) => {
                    return <Option key={data.name} value={data.name} onClick={() => {
                        console.log('选择layer', data.name)
                    }}>{data.name}</Option>;
                }
                     )}
                 </Select>
                    <Button style={{float:"right"}} type="primary" onClick={this.startQuery}>开始查询</Button>
                </Form.Item>
                <Form.Item >

                    <Button style={{float:"right"}}  type="danger" onClick={this.endQuery}>结束查询</Button>
                </Form.Item>
                <Form.Item>

                </Form.Item>
            </Form>
                )
    }
}

function mapStateToProps(state) {
    return {datas:state.layers} //=== {weather:weather}
}
export default connect(mapStateToProps)(LayerS);