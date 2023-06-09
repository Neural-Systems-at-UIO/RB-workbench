import { Button, Modal , Form, Input, List} from 'antd';
import { useState } from 'react'
import init_tables from '../../metadata_new/schemaTables';
import { Popconfirm } from 'antd';


export function ProjectListElement(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ 'title': props.itemTitle, 'description': props.itemDescription });

  function getProjectMetadata(project, user) {
    return new Promise((resolve, reject) => {

      if (process.env.NODE_ENV === "development") {
        var target_url = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
        var target = `${target_url}/readTable?project=${project}&user=${user}`
      }
      else {
        var target = `/readTable?project=${project}&user=${user}`
      }
      
      fetch(target)
        .then(response => response.json())
        .then(data => {
          resolve(data);
          // if (data != 'no table') {
          // }
        });
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

const handleSubmit = (values) => {
  setFormValues(values);
  setIsModalOpen(false);
  // Send a POST request to the backend API to edit the project
  console.log(values)
  let req_body = {
    user: props.user,
    project: values.title,
    description: values.description,
    key: props.itemkey
  }
  console.log(req_body)
  fetch(`${process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL}/edit_project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req_body)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log(props.itemTitle)
    props.deleteProject(props.itemTitle);
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
  console.log('props now!', props)
  console.log('here', props.itemkey)
  return (
    // align list left
    <List.Item style={{textAlign: 'left'}} key={props.itemkey}>
      <List.Item.Meta
        title={<a onClick={handleLaunchWithProject}>{formValues.title}</a>}
        description={formValues.description} />
      <>
        <Popconfirm
          title="Are you sure to delete this project?"
          description="This action cannot be undone."
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
        <Button style={{ marginRight: '1rem' }} danger>Delete</Button>
        </Popconfirm>
        <Button style={{ marginRight: '1rem' }} onClick={showModal}>
          {props.ButtonText}
        </Button>
        <Popup
          isOpen={isModalOpen}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          defaultTitle={formValues.title}
          defaultDescription={formValues.description} 
          itemkey={props.itemkey}/>
      </>
      <Button type="primary" onClick={ handleLaunchWithProject }> Launch Project</Button>
    </List.Item>
  );
}


export function Popup({ isOpen, onClose, onSubmit, defaultTitle, defaultDescription ,itemkey}) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const handleOK = (event) => {
    event.preventDefault();
    console.log(title, description)
    console.log(event)
    onSubmit({'title': title, 'description': description, 'itemkey':itemkey});
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
