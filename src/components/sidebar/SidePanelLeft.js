import { Menu, Layout , Button} from 'antd'
import React, { useState } from 'react'
import ConfigProvider from '../ConfigProvider'

// import './SidePanelLeft.css'
import {
  UserOutlined,
  TeamOutlined,
  HeartOutlined,
  RollbackOutlined,
  HomeOutlined
} from '@ant-design/icons'

const { Sider } = Layout

const items = [
  getItem('Subject', '1', <UserOutlined />),
  getItem('TissueSample', '2', <HeartOutlined/>),
  getItem('SubjectGroup', '3', <TeamOutlined />),
  getItem('TissueSampleCollection', '4', <HeartOutlined/>)]

const itemGroups = [
  getItem('Individual specimen', 'menu1', [], items.slice(0,2) ),
  getItem('Specimen sets', 'menu2', [], items.slice(2,4) ) 
]

// Function for creating a menu item
function getItem (label, key, icon, children) {

  let item = {
    key,
    icon,
    children,
    label
  }

  if (children !== undefined) {
    item.type = 'group';
  }

  return item
}

function SidePanelLeft ({ onButtonClick, setPage }) {
  const [collapsed, setCollapsed] = useState(false)
  const handleButtonClick = (item) => { onButtonClick(items[item.key - 1].label) }

  return (
  // <div className='SidePanelLeft'>
      <Sider style={{ backgroundColor: '#f8fafb' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <ConfigProvider
        children = {<div></div>}
        >
          <Button style={{marginTop:'3rem', 'alignItems':'center', height:'4.5rem'}} onClick={() => {setPage('projectList')}}  >
          <HomeOutlined style={{fontSize:32}}/>
          <p>Return to projects</p>
          </Button>
          <Menu
            style={{
              backgroundColor: '#f8fafb',
              width: '256',
              height: '100%',
              marginTop: '20rem',
              marginLeft: '5%',
              marginBottom: '200%'
            }}
            defaultSelectedKeys={['1']}
            multiple={false}
            mode={'inline'}
            items={itemGroups}
            onSelect={ handleButtonClick }
          />
        </ConfigProvider>
      </Sider>

  // </div>
  )
}
export default SidePanelLeft
