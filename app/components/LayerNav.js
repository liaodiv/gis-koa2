import React,{Component} from 'react'

import LayerManger from './LayerManager';
import LayerList from './LayerList';

class LayerNav extends Component{
    render(){
        return(
            <div>
                <LayerManger/>
                <br/>
                <LayerList/>
            </div>
        )
    }
}

export default LayerNav;