import React from 'react'
import { Layout, Tabs, Avatar,Popover} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons'

import MetaDataPage from './MetaDataPage.js'
import { Header } from 'antd/lib/layout/layout'
import AppsAndAnalysisPage from './AppsAndAnalysis.js'
const { Content } = Layout
const { TabPane } = Tabs


const Workbench = (props) => {
  const token = props.token
  console.log('workbench received key', props.keyValue)
  console.log(props)

  return (

    <div className='App' style={{ overflow: 'hidden', height: '100%' }} >
      <Layout style={{ height: '100vh' }}>
        <Layout>
          <Content style={{ padding: '0 0', marginTop: '1.4em' }}>
            <div className='card-container'
              style={{
                backgroundColor: 'transparent',
                marginTop: '0%',
              }}
            >
      
              <Tabs type='card' className='TabWrapper' size='large' destroyInactiveTabPane={true}>
                {'metadata' === process.env.REACT_APP_APPLICATION && (
                  <TabPane tab='Metadata' key='2'>
                    <MetaDataPage setPage={props.setPage} user={props.user} page={props.page} project={props.project} projectDataTable={props.projectDataTable}/>
                  </TabPane>
                )}

                {'EBworkbench' === process.env.REACT_APP_APPLICATION && (
                  <>
                <TabPane tab='File Creator' key='3' style={{"height":"100%"}}>
                  {/* make an iframe pointing to https://quint-ebrainsworkbench.apps.hbp.eu/*/}
              
                 <div  style={{"background":"white", "height":"100vh", "width":"100%"}}>
                <iframe title="File Creator" src={`https://tif-dzi-tar-svc-test.apps.hbp.eu/?clb-collab-id=${props.keyValue}`} style={{"background":"white", "height":"100%", "width":"100%", border:"0"}}></iframe>                    

                  </div>                    

                </TabPane>
                <TabPane tab='Apps & Analysis' key='4' style={{"height":"100%"}}>
                  <AppsAndAnalysisPage keyValue={props.keyValue}/>
                </TabPane>
                
                  <TabPane tab='Metadata' key='2'>
                    <MetaDataPage setPage={props.setPage} user={props.user} page={props.page} project={props.project} projectDataTable={props.projectDataTable}/>
                  </TabPane>
                  </>
                )}
                <TabPane tab='Share Data' key='5' style={{"height":"100%"}}>
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div >
  )
}

export default Workbench
