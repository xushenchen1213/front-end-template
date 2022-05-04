import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
// import Router from './components/Router'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import {
//   BrowserRouter as Router,
//   Route} from 'react-router-dom'

// import Page1 from './components/Router/Page1';
// import Page2 from './components/Router/Page2';
const { Header, Content, Sider } = Layout;
const items1 = ['1', '2'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={items2}
        >
          hello
        </Menu>
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>

        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {/* <div style={{background: '#fff', minHeight: 360, overflow: 'hidden'}}>
                            <Router>
                                <Route path="/" component={Page1}/>
                                <Route path="/filesystem" component={Page2}/>
                            </Router>
                        </div> */}          
          Content11
        </Content>
      </Layout>
    </Layout>
  </Layout>
);