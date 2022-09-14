import React from 'react'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import './App.css'
import Register from './Register.js'

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
  <div className='App' style={{ 'background-color': 'red', overflow: 'hidden', height: '100%' }}>

    <Layout style={{ height: '100vh' }}>

      <Header style={{ backgroundColor: '#d8e2dc', height: '2vh' }}>
        <Icon
          component={EbrainsLogo}
          style={{
            position: 'absolute',
            float: 'left',
            right: '8vw',
            top: '-4rem',
            // margin: '-2.5% 0 0 0px',
            'font-size': '14em',
            border: 0,
            zIndex: 1
          }}
        />
        {/* <img src={EbrainsLogo} style={{ height: '30vh' }} /> */}
        {/* display ebrains logo */}

      </Header>
      <Layout>
        <Content style={{ padding: '0 0', marginTop: '0%' }}>
          <div
            className='card-container'
            style={{
              backgroundColor: '#d8e2dc',
              'margin-top': '0%'
            }}
          >
            <Tabs type='card' className='TabWrapper' size='large'>
              {/* <TabPane tab='Projects' key='1'>
                <ProjectPage />
              </TabPane> */}
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
