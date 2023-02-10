import { ConfigProvider } from 'antd'
import React from 'react'

const EbrainsConfigProvider = (props) => {
  return (
    <ConfigProvider
      theme = {{
        token: {
          colorPrimary: '#45b07c'
        }
      }}
    >
    {props.children}
    </ConfigProvider>
  )
}

export default EbrainsConfigProvider
