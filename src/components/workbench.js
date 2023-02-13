import React from 'react'
import { Layout, Tabs } from 'antd'
import Icon from '@ant-design/icons'
// import '../styles/App.css'
import Register from './Register.js'
import { ReactComponent as EbrainsLogo } from '../resources/ebrains-ai-cropped.svg'
import { Header } from 'antd/lib/layout/layout'
// var perf = require('./sine-wave.html');

const { Content } = Layout
const { TabPane } = Tabs
// const items = [
//   { label: 'Registration' },
//   { label: 'Analysis' },
//   { label: 'Projects' }

// ]
const Workbench = () => {
  console.log('workbench')

  return (
    <div className='App' style={{ overflow: 'hidden', height: '100%' }} >
      <Layout style={{ height: '100vh' }}>
        <Header style={{ height: '0vh' }}>
          <Icon
            component={EbrainsLogo}
            style={{
              position: 'absolute',
              float: 'left',
              right: '8vw',
              top: '-4rem',
              // margin: '-2.5% 0 0 0px',
              // fontSize: '14em',
              border: 0,
              zIndex: 1
            }}
          />

  </Header>
  <Layout>
    <Content style={{ padding: '0 0', marginTop: '1vh' }}>
      <div
        className='card-container'
        style={{
          backgroundColor: 'transparent',
          marginTop: '0%'
        }}
      >
        {/* <SineWave frequency='0.6' amplitude='0.10' offset='0' />
        <SineWave frequency='2.6' amplitude='0.13' offset='0.5' />
        <SineWave frequency='4.6' amplitude='0.15' offset='0' /> */}
        {/* <div style={{ position: 'absolute', background: 'red', color: 'blue', width: '100vw', height: '100%', zIndex: 0 }}></div> */}

        <Tabs type='card' className='TabWrapper' size='large'>

          {/* <TabPane tab='Projects' key='1'>
            <ProjectPage />
          </TabPane> */}
          <TabPane tab='Metadata' key='2'>
            <Register />
          </TabPane>
          {/* <TabPane tab='Analysis' key='3'></TabPane> */}
        </Tabs>
      </div>
    </Content>
  </Layout>
</Layout>
</div >
  )
}

export default Workbench
