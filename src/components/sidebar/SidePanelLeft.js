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
  getItem('Subject', 'Subject', <UserOutlined />),
  getItem('Tissue Sample', 'TissueSample', <HeartOutlined/>),
  getItem('Subject Group', 'SubjectGroup', <TeamOutlined />),
  getItem('Tissue Sample Collection', 'TissueSampleCollection', <HeartOutlined/>)]

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


/**
 * SpecimenMenu for selecting a specimen table.
 *
 * @param {Object} props - The component props.
 * @param {string} props.selectedPageName - The name of the table to show, i.e Subject or TissueSample (note, should match the key, not the label).
 * @param {string} props.onMenuItemClick - Callback function to execute on menu selection.
*/

function SpecimenMenu ({ selectedPageName, onMenuItemClick }) {
  
  const handleMenuItemClick = (item) => { onMenuItemClick(item.key) }
  const selectedPageIndex = items.findIndex((item) => item.key === selectedPageName);
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
      defaultSelectedKeys={['Subject']}
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
        <SpecimenMenu selectedPageName={selectedPageName} onMenuItemClick={onMenuItemClick} />
      </ConfigProvider>
    </Sider>
  )
}
 