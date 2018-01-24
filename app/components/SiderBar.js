import React, {Component} from 'react';
import { Collapse, Icon,Layout} from 'antd';
import { Route, Switch } from 'react-router-dom';
import '../css/components/SideBar.css';

import LayerNav from './LayerNav'
import LayerManger from './LayerManager';
import LayerList from './LayerList';
import LayerSelect from './layerSelect';
const Panel = Collapse.Panel;

const { Content } = Layout;

const TestContent = () => {
    return (
        <div>null index</div>
    )
}

class SideBar extends Component {

    render() {
        return (
            <Content style={{margin:'4px 4px'}}>
                <Switch>
                    <Route path={`${this.props.match.url}/layers`} component={LayerNav}/>
					<Route path={`${this.props.match.url}/query`}  component={TestContent}/>
					<Route path={`${this.props.match.url}/edit`}  component={TestContent}/>
                    <Route path={`${this.props.match.url}/`}  component={TestContent}/>

                </Switch>
            </Content>
        )

/*        return (
            <Collapse className="sidebar" bordered={false}>
                <Panel header="图层管理工具" key="1">
                    <LayerManger/>
                    <br/>
                    <LayerList/>
                </Panel>
                <Panel header="查询工具" key="2">
                    <LayerSelect/>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                    <p>write something here</p>
                </Panel>
                <Panel header="This is panel header 4" key="4">
                    <p>write something here</p>
                </Panel>
                <Panel header="This is panel header 5" key="5">
                    <p>write something here</p>
                </Panel>
                <Panel header="This is panel header 6" key="6">
                    <p>write something here</p>
                </Panel>
                <Panel header="This is panel header 7" key="7">
                    <p>write something here</p>
                </Panel>
            </Collapse>
        )*/

    }


}
export default SideBar;