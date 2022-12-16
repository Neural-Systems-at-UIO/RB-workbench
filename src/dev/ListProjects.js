import { Table, Button, Form, message, Typography } from 'antd'
import styled from 'styled-components'
import datasource from './datasource'
import './Register.css'
import OptionsBar from './options-bar'
import { render } from '@umijs/deps/compiled/mustache'
import { useState } from 'react'

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
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
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
function fetchData (url) {
  const data = fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}

function handleAdd (DataSource) {
  // const { count, datasource } = this.state
  // const newData = fetchData('http://localhost:80/server.php')
  // this.setState({ dataSource: [...datasource, newData] })
  // const dataSource = fetchData('http://localhost:80/server.php'
  // SetDataSource(fetchData('http://localhost:80/server.php'))
  // console.log(fetchData('http://localhost:80/server.php'))
  // var retrievedData = fetchData('http://localhost:80/server.php')
  // var retrievedData_json = retrievedData.json()
  // DataSource.push(retrievedData_json)
}

// console.log('yay')

function Buildtable () {
  const [DataSource, SetDataSource] = useState('')
  console.log("HELLO 0");
  const updateTable = async () => {
    const response = await fetch('http://www.quint-tools.com:3000/list_projects.php')
    const data = await response.json()
    console.log("HELLO 1");
    console.log(data);
    SetDataSource(data);

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
          'background-color': '#f8fafb',
          'border-radius': '25px 0   0 25px',
          // padding: '2% 1% 1% 1%',
          // margin: '1% 1% 2% 1%'
          margin: '-0.7% 0 0 0',
          'box-shadow': '7px 25px 28px 6px rgba(1, 1, 2, 0.6)',

          'clip-path': 'inset(-250px -250px -250px -250px)'
        }}
      >
        <div
          style={{
            // outline: '5px solid black',
            padding: '2% 0% 2% 0%',
            margin: '1% 1% 2% 1%',
            'border-radius': '25px',
            'box-shadow': '5px 8px 24px 5px rgba(208, 216, 243, 0.6)'
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
          <hr style={{ 'background-color': '#f8fafb', color: '#f8fafb' }}></hr>
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
