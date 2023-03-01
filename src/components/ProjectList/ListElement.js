import { Button, Modal , Form, Input, List} from 'antd';
import { useState } from 'react';
export const ListElement = (props) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({'title': props.itemTitle, 'description': props.itemDescription})
  
  function getProjectMetadata()   
      
    {  
          fetch('https://localhost:8080/readTable?project=' + props.project + '&user=' + props.user["http://schema.org/alternateName"])
            .then(response => response.json())
            .then(data => {
              
              if (data != 'no table') {

              }
            });

      
      }
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = (values) => {
    setFormValues(values)
    setIsModalOpen(false);
    // log the new title from the form  to the console

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
              // align list left
              <List.Item style={{
                textAlign: 'left'
              }}>
                <List.Item.Meta
                  title={<a href="https://ant.design">{formValues.title}</a>}
                  description={formValues.description}
                />
                {/* <Button > Edit Title & Description</Button> */}
    
    
                            <>
                    <Button style={{marginRight:'1rem'}}  danger >Delete</Button>
                    <Button style={{marginRight:'1rem'}} onClick={showModal}>
                        {props.ButtonText}
                    </Button>
                    <Popup
                        isOpen={isModalOpen}
                        onClose={handleCancel}
                        onSubmit={handleSubmit}
                        defaultTitle={formValues.title}
                        defaultDescription={formValues.description}
                    />
                </>
    
    
                <Button type="primary" onClick={() => {
                  props.setProject(formValues.title)
                  props.setPage('workbench')}}> Launch Project</Button>
              </List.Item>
  );
};

    

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