import { Table, Form, message, Typography, Menu, Layout } from 'antd'
import React, { useState } from 'react';

import './SidePanelLeft.css'
import {
  UserOutlined,
  TeamOutlined,
  BugOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography

const items = [
 getItem('Subject', '1', <UserOutlined /> ),
 getItem('SubjectGroup', '2', <TeamOutlined /> ),
 getItem('TissueSample', '3',  <HeartOutlined/>  ),
 getItem('TissueSampleGroup', '4', <HeartOutlined/> ) ];


export function handleButtonClick (e) {
  fetch('http://localhost:80/server.php').then(res => {
    res.json().then(data => {
      console.log(data)
      message.info('done')
    })
  })
}

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


function SidePanelLeft () {
  
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    // <div className='SidePanelLeft'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

        <Menu
          style={{
            width: '90%',
            height: '100%',
            marginTop: '20px',
            marginLeft: '5%',
            marginBottom: '200%',
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          multiple={false}
          mode={'inline'}
          items={items}
        />
      </Sider>

    // </div>
  )
}
export default SidePanelLeft;

/* 
<div className='info-card'>
<Title
  level={1}
  style={{
    color: '#f8fafb',
    border: 'solid #f8fafb 1px',
    padding: '2%',
    marginBottom: '0%'
  }}
>
  <strong>Brain ID</strong>
</Title>

<div
  style={{
    border: 'solid #f8fafb 1px'
  }}
>
  <p>
    Card content <br></br>Card
  </p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</div>
</div> */


// Example: Get nested menu

// const items = [
//     getItem('Navigation One', '1', <MailOutlined />),
//     getItem('Navigation Two', '2', <CalendarOutlined />),
//     getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
//       getItem('Option 3', '3'),
//       getItem('Option 4', '4'),
//       getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
//     ]),
//     getItem('Navigation Three', 'sub2', <SettingOutlined />, [
//       getItem('Option 7', '7'),
//       getItem('Option 8', '8'),
//       getItem('Option 9', '9'),
//       getItem('Option 10', '10'),
//     ]),