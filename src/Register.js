import { Table, Button, Card, Typography } from 'antd'
import styled from 'styled-components'
import datasource from './datasource'
import './Register.css'
import OptionsBar from './options-bar'

const { Title } = Typography
const columns = [
  {
    title: 'Brain ID',
    dataIndex: 'BrainID',
    key: 'BrainID',
    sorter: (a, b) => a.key - b.key,
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 150
  },
  {
    title: 'Group',
    dataIndex: 'Group',
    key: 'Group',
    sorter: (a, b) => a.Group.localeCompare(b.Group),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 150
  },
  {
    title: 'WebAligned',
    dataIndex: 'WebAligned',
    key: 'WebAligned',
    sorter: (a, b) => a.WebAligned.localeCompare(b.WebAligned),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 240
  },
  {
    title: 'WebWarped',
    dataIndex: 'WebWarped',
    key: 'WebWarped',
    sorter: (a, b) => a.WebWarped.localeCompare(b.WebWarped),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 240
  },
  {
    title: 'Segmented',
    dataIndex: 'Segmented',
    key: 'Segmented',
    sorter: (a, b) => a.Segmented.localeCompare(b.Segmented),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 210
  },
  {
    title: 'Nutiled',
    dataIndex: 'Nutiled',
    key: 'Nutiled',
    sorter: (a, b) => a.Nutiled.localeCompare(b.Nutiled),
    sortDirections: ['descend', 'ascend', 'descend'],
    width: 200
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
  <div className='Register'>
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

          <StyledTable
            className='table-striped-rows'
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            columns={columns}
            dataSource={datasource}
            scroll={{ y: '47pc', x: 'max-content' }}
            pagination={false}
          />
        </div>
      </div>

      <div className='SidePanel'>
        <div className='button-container' style={{ zIndex: 2 }}>
          <Button danger size='large'>
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
    </div>
  </div>
)
export default Register
