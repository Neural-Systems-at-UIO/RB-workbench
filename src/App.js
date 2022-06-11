import React from 'react'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import './App.css'
import Register from './Register'
import { ReactComponent as EbrainsLogo } from './ebrains-ai.svg'
import { ReactComponent as HomeButton } from './home.svg'
import { Header } from 'antd/lib/layout/layout'

const { Content } = Layout
const { TabPane } = Tabs
const items = [
  { label: 'Registration' },
  { label: 'Analysis' },
  { label: 'Projects' }
]
const App = () => (
  <div className='App' style={{ 'background-color': 'red' }}>
    <Layout style={{ height: '100vh' }}>
      <p></p>
      <Header style={{ backgroundColor: '#e8efff' }}>
        <Icon
          component={EbrainsLogo}
          style={{
            position: 'absolute',
            float: 'left',
            right: '5pc',
            height: '1vw',
            margin: '-68px 0 0 0px',
            'font-size': '1500%',
            border: 0,
            zIndex: 1
          }}
        />
      </Header>
      <Layout>
        <Content style={{ padding: '0 3% 0 3%', marginTop: '0%' }}>
          <div
            className='card-container'
            style={{
              backgroundColor: '#e8efff',
              'margin-top': '0%'
            }}
          >
            <Tabs type='card' className='TabWrapper' size='large'>
              {/*               <TabPane tab='Projects' key='1'></TabPane>
               */}{' '}
              <TabPane tab='Registration' key='2'>
                <Register />
              </TabPane>
              <TabPane tab='Analysis' key='3'></TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
)

export default App
