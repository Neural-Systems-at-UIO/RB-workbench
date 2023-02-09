
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import '../frontend/styles/App.css'
import FieldSelectorTable from './FieldSelectorTable.js'
import { ReactComponent as EbrainsLogo } from '../frontend/resources/ebrains-ai-cropped.svg'
import { Header } from 'antd/lib/layout/layout'
// var perf = require('./sine-wave.html');
import SineWave from "../frontend/components/decorations/SineWave";
// import fieldSelector from "./fieldSelector.js";
const { Content } = Layout
const { TabPane } = Tabs
const items = [
  { label: 'Registration' },
  { label: 'Analysis' },
  { label: 'Projects' }
]
const fieldSelector = () => {
    return (
        <div className='App' style={{  overflow: 'hidden', height: '100%' }} >
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
                'fontSize': '14em',
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
          <SineWave frequency='0.6' amplitude='0.10' offset='0' />
          <SineWave frequency='2.6' amplitude='0.13' offset='0.5' />
          <SineWave frequency='4.6' amplitude='0.15' offset='0' />
  
          <Tabs type='card' className='TabWrapper' size='large'>
  
            <TabPane tab='Metadata' key='2'>
              <FieldSelectorTable />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  </Layout>
  </div >
    )
}

export default fieldSelector