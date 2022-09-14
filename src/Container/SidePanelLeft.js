import { Table, Form, message, Typography, Menu } from 'antd'
import './SidePanelLeft.css'
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Title } = Typography

const items = [
 getItem('Subject', '1', <MailOutlined /> ),
 getItem('TissueSampleGroup', '2', <CalendarOutlined/> ),
 getItem('TissueSample', '3',  <SettingOutlined/>  ) ];

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

  //   getItem(
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Ant Design
  //     </a>,
  //     'link',
  //     <LinkOutlined />,
  //   ),
  // ];
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
  return (
    <div className='SidePanelLeft'>
      <Menu
        style={{
          width: '80%',
          marginLeft: '10%',
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        multiple={true}
        mode={'inline'}
        items={items}
      />
    </div>
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
