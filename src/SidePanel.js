import { Table, Button, Form, message, Typography } from 'antd'
import './SidePanel.css'

const { Title } = Typography

export function handleButtonClick (e) {
  fetch('http://localhost:80/server.php').then(res => {
    res.json().then(data => {
      console.log(data)
      message.info('done')
    })
  })
}
function SidePanel () {
  return (
    <div className='SidePanel'>
      <div
        className='button-container'
        style={{
          zIndex: 2
        }}
      >
        <Button danger size='large' onClick={handleButtonClick}>
          WebAlign
        </Button>
        <Button danger size='large'>
          WebIlastik
        </Button>
        <Button danger size='large'>
          Nutil
        </Button>
      </div>
      <div className='info-card'>
        {/* set bold font */}
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
            'overflow-y': 'scroll',
            height: '80%',
            fontSize: '1.4em',
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
      </div>
    </div>
  )
}
export default SidePanel
