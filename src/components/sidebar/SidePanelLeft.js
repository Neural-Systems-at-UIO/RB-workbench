// SidePanelLeft is a component that renders the left sidebar of the app
// It contains the menu items for switching between the different specimen 
// tables and a home button for returning to the project page.

import { Menu, Layout , Button} from 'antd'
import React, { useState } from 'react'
import ConfigProvider from '../ConfigProvider'


import './SidePanelLeft.css'
import {
  UserOutlined,
  TeamOutlined,
  HeartOutlined,
  HomeOutlined
} from '@ant-design/icons'

export default SidePanelLeft

const { Sider } = Layout

const backgroundColor = '#f8fafb'; // Todo: Get from context provider

// Define menu items for the specimen tables
const items = [
  getItem('Subject', '1', <UserOutlined />),
  getItem('Tissue Sample', '2', <HeartOutlined/>),
  getItem('Subject Group', '3', <TeamOutlined />),
  getItem('Tissue Sample Collection', '4', <HeartOutlined/>)]

// Define menu groups to group tables for individual specimen and specimen sets
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
    label,
  }

  if (children !== undefined) {
    item.type = 'group';
  }

  return item
}

function HomeButton ({ isCollapsed, onHomeButtonClick }) {

  const homeButtonStyle = {marginTop:'5vh', 'alignItems':'center', height:'4.5rem'};
  const iconStyle = {fontSize:32};
  
  return (
    <Button style={homeButtonStyle} onClick={onHomeButtonClick}  >
      <HomeOutlined style={iconStyle}/>
      {!isCollapsed?<p>Return to projects</p>:null}
    </Button>
  )
}

function SpecimenMenu ({ selectedPageName, onMenuItemClick }) {
  
  const handleMenuItemClick = (item) => { onMenuItemClick(items[item.key - 1].label) }
  const selectedPageIndex = items.findIndex((item) => item.label === selectedPageName);
  const selectedPageKey = items[selectedPageIndex].key;

  const menuStyle = {
    backgroundColor: backgroundColor,
    // width: '500',
    height: '100%',
    marginTop: '5vh',
    marginLeft: '5%',
    marginBottom: '200%'
  }

  return (
    <Menu
      style={menuStyle}
      defaultSelectedKeys={['1']}
      selectedKeys={[selectedPageKey]}
      multiple={false}
      mode={'inline'}
      items={itemGroups}
      onSelect={ handleMenuItemClick }
    />
  )
}
function SidePanelLeft ({ selectedPageName, onMenuItemClick, onHomeButtonClick, projectName, collapsed, setCollapsed}) {


  const sidebarStyle = { backgroundColor: backgroundColor,
};


  return (
    <Sider className="my-sider-class" style={sidebarStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <ConfigProvider>
        <h1 style={{ color: '#1a1a1a', fontSize: '1.5em', fontWeight: 'bold', margin: '0.5em 0 0 0.5em', textAlign: 'center' }}>{projectName}</h1>
        <HomeButton isCollapsed={collapsed} onHomeButtonClick={onHomeButtonClick} />
        <SpecimenMenu selectedPageName={selectedPageName} onMenuItemClick={onMenuItemClick} />
      </ConfigProvider>
    </Sider>
  )
}
 