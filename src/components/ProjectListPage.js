

import {List, Avatar, Layout, Form, Button, Input} from 'antd';
import Popup from './Popup';
const { Content } = Layout
const data = [
    {
      title: 'Ant Design Title 1',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      title: 'Ant Design Title 2',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',

    },
    {
      title: 'Ant Design Title 3',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',

    },
    {
      title: 'Ant Design Title 4',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',

    },
  ];
// const ProjectList = (props) => {

//     return (
    //     <List
    //     itemLayout="horizontal"
    //     dataSource={data}
    //     renderItem={(item) => (
    //       <List.Item>
    //         <List.Item.Meta
    //           avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
    //           title={<a href="https://ant.design">{item.title}</a>}
    //           description="Ant Design, a design language for background applications, is refined by Ant UED Team"
    //         />
    //       </List.Item>
    //     )}
    //   />
    // )
// }

const ModalContent = (props) => {
    return (

<Form>
<Form.Item label="Title">
    <Input placeholder="Title" />
</Form.Item>
<Form.Item label="Description">
    <Input placeholder="Description" />
</Form.Item>
<Form.Item>

</Form.Item>
</Form>
    )
}

const ProjectList = (props) => {


    return (
        <Layout className = "metadata-page-container" style={{ backgroundColor: '#f8fafb', minHeight: '92.55vh' }}>

        {/* <SidePanelLeft onButtonClick={handleSelectTable}></SidePanelLeft> */}
        
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
                <List
        itemLayout="horizontal"
        dataSource={data}

        
        renderItem={(item) => 
            (

            <Popup ModalTitle='Edit Title and Description' itemTitle={item.title} itemDescription={item.description} ModalContent={<ModalContent></ModalContent>} ButtonText='Edit Title & Description'></Popup>




    
        )}
      />
                  {/* <MetadataTable nextTableName={currentTableName} children={''}></MetadataTable> */}
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

export default ProjectList
