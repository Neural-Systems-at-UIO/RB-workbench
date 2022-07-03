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
        <a
          target='_blank'
          href='https://webalign.apps-dev.hbp.eu/webalign.html?%7B%22clb-collab-id%22%3A%22quint-demo%22%2C%22clb-doc-path%22%3A%22%22%2C%22clb-doc-name%22%3A%22WebAlign%22%2C%22clb-drive-id%22%3A%228eabbdd3-6c21-49ef-b18b-1e90e58f3f9b%22%2C%22token%22%3A%22eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NTczNzUwMjksImlhdCI6MTY1Njc3MDI0MywiYXV0aF90aW1lIjoxNjU2NzcwMjI5LCJqdGkiOiI5NjExY2E0OS1hYjNjLTQ5NWMtYjJhZi04ZDA2NmZmNDVhZjciLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6InRlYW0iLCJzdWIiOiIyY2U1MGVkOC1mNDJiLTQ2MGItODRmNy1mYTU3ZDA4ZmQyYzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWJhbGlnbi1kZXYiLCJzZXNzaW9uX3N0YXRlIjoiMzZhMGRmNTEtNzYzYS00ZTQ0LWEyOWEtZDE5NTkwMWE2N2Q3IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3dlYmFsaWduLmFwcHMtZGV2LmhicC5ldSJdLCJzY29wZSI6InByb2ZpbGUgZW1haWwgcm9sZXMgb3BlbmlkIHRlYW0iLCJzaWQiOiIzNmEwZGY1MS03NjNhLTRlNDQtYTI5YS1kMTk1OTAxYTY3ZDciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkhhcnJ5IENhcmV5IiwibWl0cmVpZC1zdWIiOiIzMDM5ODIzMTE4NDgwNDA1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG9sYXJiZWFuIiwiZ2l2ZW5fbmFtZSI6IkhhcnJ5IiwiZmFtaWx5X25hbWUiOiJDYXJleSIsImVtYWlsIjoiaGFycnkuY2FyZXlAbWVkaXNpbi51aW8ubm8ifQ.rUT7csYsQ6GrFTZldfl461ugv58GAODGjGkgYRK6LIz6cYOpgZqURgd9GdW6_fYA9SBh2PUc1WwHF8ZdxTlyTg2AugSOcC8dWPOfFdfy1HqaldwmRJZz7tM_kSpPQlHj70DswZz9dW5N0pvbQ5wWZGDNS1lFY7_L2mkzo8qeJe2EN_x6oFow8ao5Hytb82gGVBTZ3qhNf_M4WFLY9Jih0KhD4Bbk0TSXd5WipZDxU6cEjxRLNmziOXcQzkl-5n_2B3WGdJH_5qgax8IMyoFZOmgP6J241OgnNp5L-ygx784M3pryXh0wHpa4iENdImMCnDKRx2_EYX4vWGEJZxOjWA%22%2C%22filename%22%3A%22demo_mouse_data.json%22%7D'
        >
          <button style={{ width: '100%', height: '100%' }}>WebAlign</button>
        </a>
        <a
          target='_blank'
          href='https://localizoom.apps.hbp.eu/filmstripzoom.html?atlas=ABA_Mouse_CCFv3_2017_25um&series=https://object.cscs.ch/v1/AUTH_4791e0a3b3de43e2840fe46d9dc2b334/ext-d000038_D2-M-P70_pub/D123/D123_anchoring_nonlinear_lz.json&pyramids=imgsvc-4c741983-ff14-3112-0607-f84c06d17b8a&tools'
        >
          <button style={{ width: '100%', height: '100%' }}>WebWarp</button>
        </a>
        <a target='_blank' href=''>
          <button style={{ width: '100%', height: '100%' }}>Nutil</button>
        </a>
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
          7171641
        </p>
      </div>
      <div
        className='CardCont'
        style={{
          'text-align': 'left',
          'padding-left': '0.5rem',
          height: '30vh',
          overflowY: 'scroll',
          marginTop: '0',
          color: '#f8fafb',
          fontSize: '1rem',
          border: '1px solid #f8fafb'
        }}
      >
        <div className='CardBody'>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Species: </b> mus musculus
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Sex: </b> female
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Strain: </b> Tg-Drd1a-EGFP
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Strain type: </b> transgenic
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Age category: </b> adolescent
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Age: </b> 36 day
          </p>
          <p style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            <b>Attributes: </b> stained
          </p>
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
