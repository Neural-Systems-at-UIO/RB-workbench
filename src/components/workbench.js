import React from 'react'
import { Layout, Tabs, Avatar,Popover} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons'

import MetaDataPage from './ProjectList/MetadataTable/MetaDataPage.js'
import { ReactComponent as EbrainsLogo } from '../resources/ebrains-ai-cropped.svg'
import { Header } from 'antd/lib/layout/layout'

const { Content } = Layout
const { TabPane } = Tabs




const Workbench = (props) => {
  const token = props.token


  return (

    <div className='App' style={{ overflow: 'hidden', height: '100%' }} >
      <Layout style={{ height: '100vh' }}>
 


  <Layout>
    <Content style={{ padding: '0 0', marginTop: '1.4em' }}>
      <div
        className='card-container'
        style={{
          backgroundColor: 'transparent',
          marginTop: '0%',
          
        }}
      >
 
        <Tabs type='card' className='TabWrapper' size='large'>

    
          <TabPane tab='Metadata' key='2'>
            <MetaDataPage setPage = {props.setPage} user = {props.user} page={props.page} project={props.project}/>
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
