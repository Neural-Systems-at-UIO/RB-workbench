import { Menu, Layout } from 'antd'
import React, { useState } from 'react'
import ConfigProvider from '../ConfigProvider'

import './SidePanelLeft.css'
import {
  UserOutlined,
  TeamOutlined,
  HeartOutlined
} from '@ant-design/icons'

const { Sider } = Layout

const items = [
  getItem('Subject', '1', <UserOutlined />),
  getItem('SubjectGroup', '2', <TeamOutlined />),
  getItem('TissueSample', '3', <HeartOutlined/>),
  getItem('TissueSampleCollection', '4', <HeartOutlined/>)]

function getItem (label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  }
}

function SidePanelLeft ({ onButtonClick }) {
  const [collapsed, setCollapsed] = useState(false)

  const handleButtonClick = (item) => { onButtonClick(items[item.key - 1].label) }

  return (
  // <div className='SidePanelLeft'>
      <Sider style={{ backgroundColor: '#f8fafb' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <ConfigProvider
        children = {<div></div>}
        >
          <Menu
            style={{
              backgroundColor: '#f8fafb',
              width: '256',
              height: '100%',
              marginTop: '20px',
              marginLeft: '5%',
              marginBottom: '200%'
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            multiple={false}
            mode={'vertical'}
            items={items}
            onSelect={ handleButtonClick }
          />
        </ConfigProvider>
      </Sider>

  // </div>
  )
}
export default SidePanelLeft
