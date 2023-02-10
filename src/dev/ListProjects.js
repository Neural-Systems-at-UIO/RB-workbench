import { Table, Button, Form, message, Typography } from 'antd'
import styled from 'styled-components'
import './Register.css'
import OptionsBar from './options-bar'
import React, { useState } from 'react'

const { Title } = Typography
const columns = [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'name'
  },
  {
    key: 'id',
    dataIndex: 'name',
    title: 'name'
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  }
}
const StyledTable = styled(props => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(238, 245, 248, 1);
  }
`

function handleButtonClick (e) {
  fetch('http://localhost:3000/list_projects.php').then(res => {
    res.json().then(data => {
      console.log(data)
      message.info('done')
    })
  })
}

function Buildtable () {
  const [DataSource, SetDataSource] = useState('')
  console.log('HELLO 0')
  const updateTable = async () => {
    const response = await fetch('http://www.quint-tools.com:3000/list_projects.php')
    const data = await response.json()
    console.log('HELLO 1')
    console.log(data)
    SetDataSource(data)
  }

  return (
    <div>
      <StyledTable
        className='table-striped-rows'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        columns={columns}
        dataSource={DataSource}
        scroll={{ y: '47pc', x: 'max-content' }}
        pagination={false}
        style={{ height: '53pc' }}
      />
      <Button onClick={updateTable}>Add</Button>
    </div>
  )
}
const ListProjects = () => (
  <div className='ListProjects'>
    <div style={{ display: 'flex' }}>
      <div
        className='MainPanel'
        style={{
          backgroundColor: '#f8fafb',
          borderRadius: '25px 0   0 25px',
          // padding: '2% 1% 1% 1%',
          // margin: '1% 1% 2% 1%'
          margin: '-0.7% 0 0 0',
          boxShadow: '7px 25px 28px 6px rgba(1, 1, 2, 0.6)',

          clipPath: 'inset(-250px -250px -250px -250px)'
        }}
      >
        <div
          style={{
            // outline: '5px solid black',
            padding: '2% 0% 2% 0%',
            margin: '1% 1% 2% 1%',
            borderRadius: '25px',
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)'
          }}
        >
          <OptionsBar />
          <Form>
            <Buildtable></Buildtable>
          </Form>
        </div>
      </div>

      <div className='SidePanel'>
        <div className='button-container' style={{ zIndex: 2 }}>
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
          <Title level={1} style={{ color: '#f8fafb' }}>
            <strong>Brain ID</strong>
          </Title>
          <hr style={{ backgroundColor: '#f8fafb', color: '#f8fafb' }}></hr>
          <div
            style={{
              'overflow-y': 'scroll',
              height: '300px',
              fontSize: '1.4em'
            }}
          >
            <p>
              Card content <br></br>Card
            </p>
            <p>Card content</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default ListProjects
