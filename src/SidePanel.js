import { Table, Form, message, Typography } from 'antd'
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
          zIndex: 2,
          width: '100%'
        }}
      >
        <button danger size='large' onClick={handleButtonClick}>
          WebAlign
        </button>
        <button danger size='large'>
          WebIlastik
        </button>
        <button danger size='large'>
          Nutil
        </button>
      </div>
      <div
        style={{
          marginBottom: '0px',
          marginTop: '40%',
          fontSize: '1.5rem',
          border: '1px solid #f8fafb'
        }}
      >
        <p
          style={{
            fontWeight: 'bold',
            marginTop: '0.3rem',
            marginBottom: '0.3rem',
            color: '#f8fafb'
          }}
        >
          Dataset Title
        </p>
      </div>
      <div
        className='CardCont'
        style={{
          height: '30vh',
          overflowY: 'scroll',
          marginTop: '0',
          color: '#f8fafb',
          fontSize: '1.5rem',
          border: '1px solid #f8fafb'
        }}
      >
        <div className='CardBody'>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            Card content
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
