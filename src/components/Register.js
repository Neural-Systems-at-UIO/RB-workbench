import React, { useState } from 'react'
import { Form, Select, Layout } from 'antd'


// Import custom components

import SidePanelLeft from './sidebar/SidePanelLeft'
// import EditableRow from "./table/EditableRow";    // Todo move to separate file??
// import EditableCell from "./table/EditableCell";  // Todo move to separate file??

import '../styles/options-bar.css'
import '../styles/Register.css'


//Todo: Use these instead of above:
//import metadata from '../metadata/controlledInstances'
//import metadataDefinitions from '../metadata/controlledInstancesDefinitions'


import { MetadataTable } from './MetadataTable'


// Todo: Create a table context to pass to the table components

const { Content } = Layout
// const EditableContext = React.createContext(null);



export const EditableContext = React.createContext(null)

export const EditableRow = ({index, ...props}) => {
  const [form] = Form.useForm()
  console.log(props)

  return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
  )
}

const MetadataPage = (props) => {
  const [currentTableName, setCurrentTableName] = useState('Subject')
  
  const handleSelectTable = (selectedTableName) => {
    setCurrentTableName(selectedTableName)
  }
  return (
    <Layout className = "metadata-page-container" style={{ backgroundColor: '#f8fafb', minHeight: '92.55vh' }}>

      <SidePanelLeft setPage={props.setPage} onButtonClick={handleSelectTable}></SidePanelLeft>
      
      <Layout className="table-container" style={{ backgroundColor: '#f8fafb' }}>

        {/* Container holding table */}
        <Content style={{ }}
            // style={{
            //   margin: '0 16px',
            // }}
          >
          <div
            className='MainPanel'
            style={{
              // required
              // borderRadius: '0 0 0 0', // required
              // borderRadius: '1.5625rem 0   0 1.5625rem',

              // padding: '2% 1% 1% 1%',
              // margin: '1% 1% 2% 1%'
              margin: '-0.7% 0 0 0',
              // boxShadow: '0.4375rem 1.5625rem 1.75rem 0.375rem rgba(1, 1, 2, 0.6)',

              clipPath: 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)'
            }}
          >
            <div
              style={{
                // outline: '0.3125rem solid black',
                padding: '2% 1% 2% 1%',
                margin: '1% 1% 2% 1%',
                borderRadius: '0.9375rem',
                boxShadow: '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
                height: '90.5vh',
                width: '88vw'
              }}
            >
              {/* <OptionsBar /> */}
              <Form>
                <MetadataTable project={props.project} nextTableName={currentTableName} children={''} user={props.user} page={props.page}></MetadataTable>
                {/* <Buildtable></Buildtable> */}
              </Form>
            </div>
          </div>
          {/* <SidePanel></SidePanel> */}
          </Content>
      </Layout>

  {/* </div> */}
  </Layout>
  )
}

export default MetadataPage
