import { Button, Modal , Form, Input, List} from 'antd';
import { useState } from 'react'
import init_tables from '../../metadata_new/schemaTables';


export function ProjectListElement(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ 'title': props.itemTitle, 'description': props.itemDescription });

  function getProjectMetadata(project, user) {
    return new Promise((resolve, reject) => {
      // console.log('-----------------------------------------')
      // console.log('project', project)
      // console.log('user', user)

      fetch('https://localhost:8080/readTable?project=' + project + '&user=' + user)
        .then(response => response.json())
        .then(data => {
          // console.log('data', data)
          // console.log('-----------------------------------------')
          resolve(data);
          // if (data != 'no table') {
          // }
        });
    });


  }
  //console.log('PLE user', props.user)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = (values) => {
    setFormValues(values);
    setIsModalOpen(false);
    // log the new title from the form  to the console
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleLaunch = (project, user) => {
      //props.setProject(formValues.title);
      //props.setPage('workbench');
      getProjectMetadata(project, user).then((data) => {
        props.setProject(formValues.title);
        props.setPage('workbench');
        if (data != 'no table') {
          props.setProjectDataTable(data);
        }
        else {
          // deep copy
          let temp_table = JSON.parse(JSON.stringify(init_tables)); 
          props.setProjectDataTable(temp_table);
        }
      });
    }
  const provideHandlelaunch = (project, user) => {
    console.log('user', user)
    return () => handleLaunch(project, user);
  }
  let handleLaunchWithProject = provideHandlelaunch(formValues.title, props.user);
  return (
    // align list left
    <List.Item style={{textAlign: 'left'}}>
      <List.Item.Meta
        title={<a href="https://ant.design">{formValues.title}</a>}
        description={formValues.description} />


      <>
        <Button style={{ marginRight: '1rem' }} danger>Delete</Button>
        <Button style={{ marginRight: '1rem' }} onClick={showModal}>
          {props.ButtonText}
        </Button>
        <Popup
          isOpen={isModalOpen}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          defaultTitle={formValues.title}
          defaultDescription={formValues.description} />
      </>


      <Button type="primary" onClick={ handleLaunchWithProject }> Launch Project</Button>
    </List.Item>
  );
}


export function Popup({ isOpen, onClose, onSubmit, defaultTitle, defaultDescription }) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const handleOK = (event) => {
    event.preventDefault();
    console.log(title, description)
    onSubmit({'title': title, 'description': description});
    };
  return (

    
    <Modal title={'Edit the title and description of the project'} open={isOpen} onOk={handleOK} onCancel={onClose}>
    <Form>
    <Form.Item label="Title">
    <Input value={title} onChange={(event) => setTitle(event.target.value)}/>
    </Form.Item>
    <Form.Item label="Description">
    <Input value={description} onChange={(event) => setDescription(event.target.value)}/>
    </Form.Item>
    <Form.Item>

    </Form.Item>
    </Form>
    </Modal>



  );
  }
