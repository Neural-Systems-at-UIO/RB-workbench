import React from 'react'
import { Layout, Tabs, Avatar,Popover} from 'antd'
import UserProfileCard from './UserProfileCard.js';
import { UserOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons'

import Register from './Register.js'
import { ReactComponent as EbrainsLogo } from '../resources/ebrains-ai-cropped.svg'
import { Header } from 'antd/lib/layout/layout'

const { Content } = Layout
const { TabPane } = Tabs




const Workbench = (props) => {
  const token = props.token
  console.log(token)
  console.log('wb_project', props.project)

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
              border: 0,
              zIndex: 1
            }}
          />
          <Popover placement="bottom" trigger="click" content={<UserProfileCard user={props.user}></UserProfileCard>}>
            <div zIndex={9} onClick={() => {console.log('clicked')}} style={{
              position: 'absolute',
              zIndex:1,
              float: 'left',
              right: '8vw',
            }}>
        <Avatar size={60} icon={<UserOutlined />}  />
        </div>
        </Popover>
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

    
          <TabPane tab='Metadata' key='2'>
            <Register setPage = {props.setPage} user = {props.user} project={props.project}/>
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
