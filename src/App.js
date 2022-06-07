import React from 'react'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import './App.css'
import Register from './Register'
import { ReactComponent as EbrainsLogo } from './ebrains-ai.svg'
import { ReactComponent as HomeButton } from './home.svg'

const { Content } = Layout
const { TabPane } = Tabs
const items = [{ label: 'Registration' }, { label: 'Analysis' }]
const App = () => (
  <div className='App' style={{ 'background-color': 'red' }}>
    <Layout style={{ height: '100vh' }}>
      <p></p>

      <Layout>
        <Button
          type='primary'
          shape='circle'
          icon={<Icon component={HomeButton} style={{ 'font-size': '300%' }} />}
          style={{
            position: 'absolute',
            margin: '2% 0 0% 5%',
            backgroundColor: 'white',
            borderColor: 'white',
            color: 'black',
            position: 'relative',
            marginBottom: 0,
            width: '6rem',
            height: '6rem',
            zIndex: 1
          }}
        />
        <div style={{ position: 'relative', margin: '0 0 2% 0' }}>
          <Icon
            component={EbrainsLogo}
            style={{
              position: 'absolute',
              float: 'left',
              right: '1pc',
              'font-size': '2000%',
              border: 0,
              margin: '-4% 10% 2% 2%',
              zIndex: 1
            }}
          />
        </div>
        <Content style={{ padding: '0 3% 0 3%', marginTop: '-2%' }}>
          <div
            className='card-container'
            style={{
              backgroundColor: '#e8efff',
              'margin-top': '0%'
            }}
          >
            <Tabs type='card' className='TabWrapper' size='large'>
              <TabPane tab='Registration' key='1'>
                <Register />
              </TabPane>
              <TabPane tab='Analysis' key='2'></TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
)

export default App
