

import {List, Modal, Avatar, Layout, Form, Button, Input, Popover} from 'antd';
import  {ProjectListElement} from './ProjectListItem';
import { useState, useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout'
import Icon from '@ant-design/icons'
import UserProfileCard from '../UserProfileCard';
import { UserOutlined } from '@ant-design/icons';
import { ReactComponent as EbrainsLogo } from '../../resources/ebrains-ai-cropped.svg'

const { Content } = Layout



const ModalContent = () => {
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
function getData(user) {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      var target_url = process.env.REACT_APP_DEV_URL;
    }
    else {
      var target_url = process.env.REACT_APP_PROD_URL;
    }
    fetch(`${target_url}/get_projects?user=${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
  
    }).then((response) => {
        return response.json()
    }).then((data) => {
      console.log(data)
        resolve(data)
      
    }).catch((error) => {
        reject(error)
    })
  })
}





const ProjectList = (props) => {
    var [projectData, setProjectData] = useState([]) // Project data is an array of all projects for the user


    useEffect(() => {
        getData(props.user["http://schema.org/alternateName"]).then((projects => {
            setProjectData(projects)
            }))
    }, []) 


    
    
    const addData = (projectData, setProjectData) => {
     
        var  tempTitle= ''
        var tempDescription = ''

        // launch a modal to get the new data
        console.log(projectData)
        const modal = Modal.confirm({
            title: 'Add new Project',
            content: <Form>
            <Form.Item label="Title">
                <Input placeholder="Title" onChange={(event) =>tempTitle = event.target.value} />
            </Form.Item>
            <Form.Item label="Description" onChange={(event) => tempDescription = event.target.value} >
                <Input placeholder="Description" />
            </Form.Item>
            <Form.Item>
            
            </Form.Item>
            </Form>,
            icon: null,

            onOk(title) {

                let newData = {'title': tempTitle, 'description': tempDescription}
                // call the backend to add the new data
                if (process.env.NODE_ENV === "development") {
                  var target_url = process.env.REACT_APP_DEV_URL;
                }
                else {
                  var target_url = process.env.REACT_APP_PROD_URL;
                }
                fetch(`${target_url}/set_project`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify({
                        user: props.user["http://schema.org/alternateName"],
                        project: tempTitle,
                        description: tempDescription
                    })
                })  
                // add the new data to the projectData
                setProjectData([...projectData, newData])
                title()
            },
            onCancel() {
                console.log('Cancel');
            },
            });
        // launch the modal
        modal.update({
            okText: 'Add',
            cancelText: 'Cancel',

            });

        // get the new data from the modal
       
        
        // add the new data to the projectData


    }

    return (
        
        <Layout className = "metadata-page-container" style={{  minHeight: '92.55vh' }}>
        <Header className="header" style={{backgroundColor:'transparent', minHeight:'4.5rem'}}>
        </Header>
        {/* <SidePanelLeft onButtonClick={handleSelectTable}></SidePanelLeft> */}
        
        <Layout className="table-container" style={{ backgroundColor: 'transparant' }}>
  
          {/* Container holding table */}
          <Content style={{ }}
              // style={{
              //   margin: '0 16px',
              // }}
            >
            <div
              className='MainPanel'
              style={{

                margin: '-0.7% 0 0 0',
  
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
                    <div>
      <div style={{ padding: '0 ', textAlign: 'left' }} className="OptionsBar">
        <Button onClick={() => {addData(projectData, setProjectData)}}>Add new Project</Button>

      </div>
      <hr
        style={{
          backgroundColor: '#bfbfbf',
          border: 'none',
          height: '0.15rem'
        }}
      ></hr>
    </div>

                <Form>
                <List
        itemLayout="horizontal"
        dataSource={projectData}

        
        renderItem={(item) => 
            (

            <ProjectListElement ModalTitle='Edit Title and Description' setPage={props.setPage} itemTitle={item.title} itemDescription={item.description} setProject={props.setProject} setProjectDataTable={props.setProjectDataTable} user={props.user["http://schema.org/alternateName"]} ModalContent={<ModalContent></ModalContent>} ButtonText='Edit Title & Description'></ProjectListElement>




    
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
