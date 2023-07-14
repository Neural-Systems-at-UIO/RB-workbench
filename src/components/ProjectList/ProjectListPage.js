

import {List, Modal, Avatar, Layout, Form, Button, Input, Popover} from 'antd';
import  {ProjectListElement} from './ProjectListItem';
import { useState, useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout'
import Icon from '@ant-design/icons'
import UserProfileCard from '../UserProfileCard';
import { UserOutlined } from '@ant-design/icons';
import { ReactComponent as EbrainsLogo } from '../../resources/ebrains-ai-cropped.svg'
import {  message, Popconfirm } from 'antd';
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
      var target_url = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
      var target = `${target_url}/get_projects?user=${user}`
    }
    else {
      var target = `get_projects?user=${user}`
    }
    fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
  
    }).then((response) => {
        return response.json()
    }).then((data) => {
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


    const deleteProject = (project) => {
        // call the backend to delete the project
        fetch(`${process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL}/delete_project`, {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: props.user["http://schema.org/alternateName"],
                project: project
             })
        })
        // remove the project from the projectData
        setProjectData(projectData.filter((item) => item.title !== project))
        console.log(projectData)
        console.log('-------------------')
    }
    
    const createProject = (projectData, setProjectData) => {
     
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

                let tempKey = `ewb-${crypto.randomUUID()}`
                let newData = {'key':tempKey,  'title': tempTitle, 'description': tempDescription}
                // call the backend to add the new data
                if (process.env.NODE_ENV === "development") {
                  var target_url = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
                  var target = `${target_url}/set_project`
                }
                else {
                  var target = '/set_project';
                }
                fetch(target, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': props.token,

                    },
                    body: JSON.stringify({
                        user: props.user["http://schema.org/alternateName"],
                        project: tempTitle,
                        description: tempDescription,
                        key:tempKey
                    })
                })
                .then((response) => {
                // add the new data to the projectData
                setProjectData([...projectData, newData])
                title()
                })
                .catch((error) => {
                    console.log(error)
                }
                )
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
  
                clipPath: 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)',
              }}
            >
 
    
                
              <div
                style={{
                  // outline: '0.3125rem solid black',
                  padding: '2% 1% 2% 1%',
                  margin: '1% 4% 4% 4%',
                  borderRadius: '0.9375rem',
                  boxShadow: '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
                  height: '90.5vh',
                  width: '90vw',
                  // center

                  alignItems: 'center',
                }}
              >
                    <div>
      <div style={{ padding: '0 ', textAlign: 'left' }} className="OptionsBar">
        <Button onClick={() => {createProject(projectData, setProjectData)}}>Add new Project</Button>

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

            <ProjectListElement deleteProject={deleteProject} itemkey={item.key} setKey={props.setKey} ModalTitle='Edit Title and Description' setPage={props.setPage} itemTitle={item.title} itemDescription={item.description} setProject={props.setProject} setProjectDataTable={props.setProjectDataTable} user={props.user["http://schema.org/alternateName"]} ModalContent={<ModalContent></ModalContent>} ButtonText='Edit Title & Description'></ProjectListElement>




    
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
