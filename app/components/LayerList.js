import  React ,{ Component } from 'react';
import { List , Switch ,Button } from 'antd';
import LayerG from '../containers/LayerGroup';

const  data = ['layer1','layer2','layer3'];

class LayerList extends  Component{
    constructor(props){
        super(props);
       /* this.state={
            data:[]
        };*/

    }
    getdata = (e) => {

    }
    render(){
        const {setColor} = this.props;
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
                        {item.name}
                        &nbsp;&nbsp;&nbsp;&nbsp;
						<Button size="small" shape="circle" style={{backgroundColor:item.color}} onClick={()=>{setColor({name:item.name,color:item.color})}} >{"  "}</Button>
                        </List.Item>
                ) }>
            </List>
        )
    }
}


export default LayerList;