import { Menu, Dropdown, Button, message, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './options-bar.css'
function handleMenuClick (e) {
  message.info('Click on menu item.')
  console.log('click', e)
}
const ImportMenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='1'>New dataset</Menu.Item>
    <Menu.Item key='2'>Add images to existing dataset</Menu.Item>
  </Menu>
)

const ExportMenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='1'>Export selected</Menu.Item>
    <Menu.Item key='2'>Export whole project</Menu.Item>
  </Menu>
)

const OptionsBar = () => (
  <div>
    <div style={{ padding: '0 ', textAlign: 'left' }} className='OptionsBar'>
      <Button type='default'>Edit metadata</Button>
      <Dropdown overlay={ImportMenu}>
        <Button>
          Import
          <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown overlay={ExportMenu}>
        <Button>
          Export
          <DownOutlined />
        </Button>
      </Dropdown>
      <Button type='default' danger>
        Delete
      </Button>
    </div>
    <hr
      style={{
        backgroundColor: '#bfbfbf',
        border: 'none',
        height: '1px'
      }}
    ></hr>
  </div>
)
export default OptionsBar
