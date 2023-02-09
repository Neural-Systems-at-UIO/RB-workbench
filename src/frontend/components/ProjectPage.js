import { Table, Button, Form, message, Typography } from 'antd'
import styled from 'styled-components'
import React from 'react'

import datasource from './datasource'
import './Register.css'
import SidePanel from '../../SidePanel'
import OptionsBar from './options-bar'
import { render } from '@umijs/deps/compiled/mustache'
import { useState } from 'react'

const { Title } = Typography
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'id'
  }
]

// const columns = [
//   {
//     title: 'id',
//     dataIndex: 'id',
//     key: 'id'
//   },
//   {
//     title: 'Brain ID',
//     dataIndex: 'BrainID',
//     key: 'BrainID',
//     sorter: (a, b) => a.key - b.key,
//     sortDirections: ['descend', 'ascend', 'descend'],
//     width: 150
//   },
//   {
//     title: 'Group',
//     dataIndex: 'Group',
//     key: 'Group',
//     sorter: (a, b) => a.Group.localeCompare(b.Group),
//     sortDirections: ['descend', 'ascend', 'descend'],
//     width: 150
//   },
//   {
//     title: 'WebAligned',
//     dataIndex: 'WebAligned',
//     key: 'WebAligned',
//     sorter: (a, b) => a.WebAligned.localeCompare(b.WebAligned),
//     sortDirections: ['descend', 'ascend', 'descend'],
//     width: 240
//   },
//   {
//     title: 'WebWarped',
//     dataIndex: 'WebWarped',
//     key: 'WebWarped',
//     sorter: (a, b) => a.WebWarped.localeCompare(b.WebWarped),
//     sortDirections: ['descend', 'ascend', 'descend'],
//     width: 240
//   },
//   {
//     title: 'Segmented',
//     dataIndex: 'Segmented',
//     key: 'Segmented',
//     sorter: (a, b) => a.Segmented.localeCompare(b.Segmented),
//     sortDirections: ['descend', 'ascend', 'descend'],
//     width: 210
//   },
//   {
//     title: 'Nutiled',
//     dataIndex: 'Nutiled',
//     key: 'Nutiled',
//     sorter: (a, b) => a.Nutiled.localeCompare(b.Nutiled),
//     sortDirections: ['descend', 'ascend', 'descend'],
//     width: 200
//   }
// ]

// const [DataSource, SetDataSource] = useState(datasource)
// rowSelection object indicates the need for row selection

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

function handleButtonClick(e) {
  fetch('http://localhost:3000/list_projects.php').then(res => {
    res.json().then(data => {
      console.log(data)
      message.info('done')
    })
  })
}

function fetchData(url) {
  const data = fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}

// class NameForm extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = { value: '' }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange (event) {
//     this.setState({ value: event.target.value })
//   }
//   handleSubmit (event) {
//     event.preventDefault()

//     console.log('A name was submitted: ' + this.state.value)
//     console.log('csdfssdfsdfsdfsdfdf')
//   }

//   render () {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         {' '}
//         <label>
//           Name:
//           <input
//             type='text'
//             value={this.state.value}
//             onChange={this.handleChange}
//           />{' '}
//         </label>
//         <input type='submit' value='Submit' />
//       </form>
//     )
//   }
// }
function handleAdd(DataSource) {
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

class FormSubmitNewProject extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()
    const data = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.value
      })
    }
    fetch('http://www.quint-tools.com:3000/new_project.php', data)
      .then(response => {
        // In this case, we check the content-type of the response
        if (response.headers.get('content-type').match(/application\/json/)) {
          return response.json()
        }
        return response
        // You can also try "return response.text();"
      })
      .then(data => console.log(data))
  }
  // alert('A name was submitted: ' + this.state.value)

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button>Create</button>
      </form>
    )
  }
}

function Buildtable() {
  const [DataSource, SetDataSource] = useState('')
  const updateTable = async () => {
    const response = await fetch(
      'http://www.quint-tools.com:3000/list_projects.php'
    )
    const data = await response.json()
    SetDataSource(data)
    // SetDataSource(DataSource => ({ arrayvar: [DataSource, data] }))
  }
  const onSubmit = e => {
    e.preventDefault()
    console.log('refresh prevented')
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
        scroll={{ y: '320px', x: 'max-content' }}
        pagination={false}
      />
      <Button onClick={updateTable}>Add</Button>

      <FormSubmitNewProject />
    </div>
  )
}

const ProjectPage = () => (
  <div className='Register'>
    <div style={{ display: 'flex', height: '75vh' }}>
      <div
        className='MainPanel'
        style={{
          'backgroundColor': '#f8fafb',
          'borderRadius': '1.5625rem 0   0 1.5625rem',
          // padding: '2% 1% 1% 1%',
          // margin: '1% 1% 2% 1%'
          margin: '-0.7% 0 0 0',
          boxShadow: '0.4375rem 1.5625rem 1.75rem 0.375rem rgba(1, 1, 2, 0.6)',
          clipPath: 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)'
        }}
      >
        <div
          style={{
            // outline: '0.3125rem solid black',
            padding: '2% 0% 2% 0%',
            margin: '1% 1% 2% 1%',
            borderRadius: '0.9375rem',
            boxShadow: '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
            height: '73.5vh'
          }}
        >
          <OptionsBar />
          {/* <Form> */}
          <Buildtable></Buildtable>
          {/* </Form> */}
        </div>
      </div>
      <SidePanel></SidePanel>
    </div>
  </div>
)
export default ProjectPage
