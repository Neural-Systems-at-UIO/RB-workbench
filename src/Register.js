import { Table, Button } from 'antd'
import styled from 'styled-components'

import datasource from './datasource'
import './Register.css'
const columns = [
  {
    title: 'Brain ID',
    dataIndex: 'BrainID',
    key: 'BrainID',
    sorter: (a, b) => a.key - b.key,
    sortDirections: ['descend', 'ascend', 'descend']
  },
  {
    title: 'Group',
    dataIndex: 'Group',
    key: 'Group',
    sorter: (a, b) => a.Group.localeCompare(b.Group),
    sortDirections: ['descend', 'ascend', 'descend']
  },
  {
    title: 'WebAligned',
    dataIndex: 'WebAligned',
    key: 'WebAligned',
    sorter: (a, b) => a.WebAligned.localeCompare(b.WebAligned),
    sortDirections: ['descend', 'ascend', 'descend']
  },
  {
    title: 'WebWarped',
    dataIndex: 'WebWarped',
    key: 'WebWarped',
    sorter: (a, b) => a.WebWarped.localeCompare(b.WebWarped),
    sortDirections: ['descend', 'ascend', 'descend']
  },
  {
    title: 'Segmented',
    dataIndex: 'Segmented',
    key: 'Segmented',
    sorter: (a, b) => a.Segmented.localeCompare(b.Segmented),
    sortDirections: ['descend', 'ascend', 'descend']
  },
  {
    title: 'Nutiled',
    dataIndex: 'Nutiled',
    key: 'Nutiled',
    sorter: (a, b) => a.Nutiled.localeCompare(b.Nutiled),
    sortDirections: ['descend', 'ascend', 'descend']
  }
]
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

const Register = () => (
  <div style={{ padding: '1% 2%', display: 'flex' }}>
    <StyledTable
      className='table-striped-rows'
      rowSelection={{
        type: 'checkbox',
        ...rowSelection
      }}
      columns={columns}
      dataSource={datasource}
      scroll={{ y: '55pc' }}
      pagination={false}
    />
    <div className='SidePanel'>
      <div className='button-container' style={{ display: 'col' }}>
        <Button type='primary' size='large'>
          WebAlign
        </Button>
        <Button type='primary' size='large'>
          WebAlign
        </Button>
        <Button type='primary' size='large'>
          WebAlign
        </Button>
        <Button type='primary' size='large'>
          WebAlign
        </Button>
      </div>
    </div>
  </div>
)
export default Register
