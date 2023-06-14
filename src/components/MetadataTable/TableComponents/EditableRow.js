// This component allows row editing in the MetadataTable component
// Todo: How does it work?
import React from 'react'
import { Form } from 'antd'

export const EditableContext = React.createContext(null)

export const EditableRow = ({index, ...props}) => {
  const [form] = Form.useForm()

  return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
  )
}