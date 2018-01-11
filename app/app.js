import React from 'react';
import { Layout , Button, Menu ,Icon } from 'antd';
import SideBar from './components/SiderBar.js';
import MapView from './containers/MapView.js';
import {BrowserRouter as Router,Link} from 'react-router-dom'
import './css/containers/app.css';
import '../node_modules/ol/ol.css';



const { Header , Footer ,Sider ,Content } = Layout;

const App = () =>(
    <div style={ { "height":"100%" } }>
        <Layout style={{"height":"100%" }}>
            <Header className="header" >
              <Icon className="logo" type="api" />GIS-TEST-1
            </Header>
            <Router >
            <Layout style={{"height":"100%"}} >

                <Sider
                    trigger={null}
                    collapsible
                    collapsed={true}
                    width="50"
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/layers">
                            <Icon type="user" />
                            </Link>
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/">
                            <Icon type="video-camera" />
                            </Link>
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Sider className="sidebar" id="left" width="400">
                    <SideBar/>
                </Sider>

                <Content className="content-body">
                    <MapView />
                </Content>
            </Layout>
            </Router>
        </Layout>

    </div>
);

export default App;