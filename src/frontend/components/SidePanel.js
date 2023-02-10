import { message } from 'antd'
import './SidePanel.css'
import React from 'react'
export function handleButtonClick (e) {
  fetch('http://localhost:80/server.php').then(res => {
    res.json().then(data => {
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
          href='https://webalign.apps-dev.hbp.eu/webalign.html?%7B%22clb-collab-id%22%3A%22quint-demo%22%2C%22clb-doc-path%22%3A%22%22%2C%22clb-doc-name%22%3A%22WebAlign%22%2C%22clb-drive-id%22%3A%228eabbdd3-6c21-49ef-b18b-1e90e58f3f9b%22%2C%22token%22%3A%22eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NTc1Mjk3MTgsImlhdCI6MTY1NjkyNDkxOSwiYXV0aF90aW1lIjoxNjU2OTI0OTE4LCJqdGkiOiJjMmUzZWJmZC1lY2I2LTQxYWYtOWFjYS1iM2NlMjZhNTZhNDAiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6InRlYW0iLCJzdWIiOiIyY2U1MGVkOC1mNDJiLTQ2MGItODRmNy1mYTU3ZDA4ZmQyYzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWJhbGlnbi1kZXYiLCJzZXNzaW9uX3N0YXRlIjoiYjg4ZTQ1MzYtOTk2NS00MWQwLTljOGUtYTQxNjkyZWE1OGI4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3dlYmFsaWduLmFwcHMtZGV2LmhicC5ldSJdLCJzY29wZSI6InByb2ZpbGUgZW1haWwgcm9sZXMgb3BlbmlkIHRlYW0iLCJzaWQiOiJiODhlNDUzNi05OTY1LTQxZDAtOWM4ZS1hNDE2OTJlYTU4YjgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkhhcnJ5IENhcmV5IiwibWl0cmVpZC1zdWIiOiIzMDM5ODIzMTE4NDgwNDA1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG9sYXJiZWFuIiwiZ2l2ZW5fbmFtZSI6IkhhcnJ5IiwiZmFtaWx5X25hbWUiOiJDYXJleSIsImVtYWlsIjoiaGFycnkuY2FyZXlAbWVkaXNpbi51aW8ubm8ifQ.DwR-tKkn4rfq88nxhsCp-CanYGt8yHw-rViMrmgpfPa41TTxDwwIRLUThSk84ZkBcmefDt2UApL86UmRpzj6FCpYAvt1R5PZi-ZfMSX74j3gmPcSnfS8d7H0Yr_66g5Ch6te3Ro2YhtXZhE5BA_SnZ7-omFvvqJO63YypGfrE9pYyoar6Yr0HjVS9W7pxAVvBsFB2EPKoYJuUiFp1E8e7nWbSVxHFcg_IG_sL9G5WgELhohQoMON3tgtaK4Idsk9OcRx13mFIz8Pd4ClgiQQJliNTlPscbkRT_GdoM0JRENlV6Q2WdRRzuC-_TgmeRp47HUPRqKbsZSvuaJO7qzPqA%22%2C%22filename%22%3A%22demo_mouse_data.json%22%7D' rel="noreferrer"
        >
          <button style={{ width: '100%', height: '100%' }}>WebAlign</button>
        </a>
        <a
          target='_blank'
          href='https://localizoom.apps.hbp.eu/filmstripzoom.html?atlas=ABA_Mouse_CCFv3_2017_25um&series=https://object.cscs.ch/v1/AUTH_4791e0a3b3de43e2840fe46d9dc2b334/ext-d000038_D2-M-P70_pub/D123/D123_anchoring_nonlinear_lz.json&pyramids=imgsvc-4c741983-ff14-3112-0607-f84c06d17b8a&tools' rel="noreferrer"
        >
          <button style={{ width: '100%', height: '100%' }}>WebWarp</button>
        </a>
        <a
          target='_blank'
          href='https://app.ilastik.org/public/nehuba/index.html#!%7B%22layers%22:%5B%7B%22source%22:%22precomputed://https://app.ilastik.org/public/images/mouse1.precomputed%22%2C%22type%22:%22image%22%2C%22blend%22:%22default%22%2C%22shader%22:%22void%20main%28%29%20%7B%5Cn%20%20%20%20vec3%20color0%20=%20%28vec3%28255%2C%200%2C%200%29%20/%20255.0%29%20%2A%20toNormalized%28getDataValue%280%29%29%3B%5Cn%20%20%20%20vec3%20color1%20=%20%28vec3%280%2C%20255%2C%200%29%20/%20255.0%29%20%2A%20toNormalized%28getDataValue%281%29%29%3B%5Cn%20%20%20%20vec3%20color2%20=%20%28vec3%280%2C%200%2C%20255%29%20/%20255.0%29%20%2A%20toNormalized%28getDataValue%282%29%29%3B%5Cn%20%20%20%20emitRGBA%28%5Cn%20%20%20%20%20%20%20%20vec4%28color0%20+%20color1%20+%20color2%2C%201.0%29%5Cn%20%20%20%20%29%3B%5Cn%7D%22%2C%22name%22:%22mouse1.precomputed%22%7D%5D%2C%22navigation%22:%7B%22pose%22:%7B%22position%22:%7B%22voxelSize%22:%5B1%2C1%2C1%5D%2C%22voxelCoordinates%22:%5B2062%2C1245.5%2C0.5%5D%7D%7D%2C%22zoomFactor%22:1%7D%2C%22layout%22:%22xy%22%7D' rel="noreferrer"
        >
          <button style={{ width: '100%', height: '100%' }}>WebIlastik</button>
        </a>
        <a target='_blank' href='https://www.nutil.org/' rel="noreferrer">
          <button style={{ width: '100%', height: '100%' }}>Nutil</button>
        </a>
      </div>
      <div
        style={{
          marginBottom: '0px',
          marginTop: '40%',
          fontSize: '1.5rem',
          border: '0.0625rem solid #f8fafb'
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
          border: '0.0625rem solid #f8fafb'
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
