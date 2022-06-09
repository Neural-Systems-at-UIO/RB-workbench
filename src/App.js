import React from 'react'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import './App.css'
import Register from './Register'
import ListProjects from './ListProjects'
import { ReactComponent as EbrainsLogo } from './ebrains-ai.svg'

const { Content } = Layout
const { TabPane } = Tabs
const items = [{ label: 'Registration' }, { label: 'Analysis' },  { label: 'Projects' }]
const App = () => (
  <div className='App' style={{ 'background-color': 'red' }}>
    <Layout>
      <p></p>
      <Icon
        component={EbrainsLogo}
        style={{
          position: 'absolute',
          right: '1pc',
          'font-size': '2000%',
          border: 0,
          margin: '-2% 10% 0 0',
          zIndex: 1
        }}
      />

      <Layout>
        <Button
          type='primary'
          shape='circle'
          icon={<HomeOutlined style={{ scale: '300%' }} />}
          style={{
            backgroundColor: 'white',
            borderColor: 'white',
            color: 'black',
            position: 'absolute',
            'margin-left': '9%',
            'margin-top': '1%',
            marginBottom: 0,
            width: '6rem',
            height: '6rem',
            zIndex: 1
          }}
        />
        <Content style={{ padding: '5%' }}>
          <div
            className='card-container'
            style={{
              backgroundColor: '#e8efff',
              'border-radius': '25px',
              'margin-top': '-1%'
            }}
          >
            <Tabs type='card' className='TabWrapper' size='large'>
            <TabPane tab='Projects' key='1'>
                <ListProjects />
                </TabPane>
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
