import React from 'react'
import { Button, Menu, Layout } from 'antd'
import { Tabs } from 'antd'
import './App.css'
import Register from './Register'

import { Footer, Header } from 'antd/lib/layout/layout'

const { Content } = Layout
const { TabPane } = Tabs
const items = [{ label: 'Registration' }, { label: 'Analysis' }]
const App = () => (
  <Layout>
    <Layout>
      <Content style={{ padding: '5%' }}>
        <div className='card-container' style={{ backgroundColor: 'white' }}>
          <Tabs type='card' className='TabWrapper' size='large'>
            <TabPane tab='Registration' key='1'>
              <Register />
            </TabPane>
            <TabPane tab='Analysis' key='2'>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
            </TabPane>
            <TabPane tab='Export' key='3'>
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  </Layout>
)

export default App
