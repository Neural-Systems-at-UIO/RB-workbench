import React from 'react'
import './styles/App.css'
import ProjectList from './components/ProjectList/ProjectListPage.js';
import { Header } from 'antd/lib/layout/layout'
import Icon from '@ant-design/icons'
import { ReactComponent as EbrainsLogo } from './resources/ebrains-ai-cropped.svg'
import { Layout, Tabs, Avatar,Popover} from 'antd'
import UserProfileCard from './components/UserProfileCard.js';
import { UserOutlined } from '@ant-design/icons';


import './styles/index.css'
import {  Spin } from 'antd'

import Workbench from './components/workbench.js'

import getUser from './authentication/GetUserInfo'
import getToken from './authentication/authenticationUtilities'

console.log(getToken)
const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size='large' style={{marginBottom:'6rem'}}>

    <h1  style={{marginTop:'6rem'}}>Logging In</h1>
    <div className="content" />
  </Spin>
   </div>
  )
}
function PageSwitcher(page, token, user, setPage, setProject, project) {
  if (page==='workbench') {
    return (
    <Workbench token={token} user={user} setPage={setPage} page={page} project={project} />

  )}
  else if (page==='projectList') {return (
    <ProjectList token={token} user={user} setPage={setPage} setProject={setProject} />
  )}
}
const ProfileAvatar = ({user}) => {
  console.log('pfa user',  user)
  return (
  <Popover placement="bottom" trigger="click" content={<UserProfileCard user={user}></UserProfileCard>}>
  <div zIndex={9} onClick={() => {console.log('clicked')}} style={{
    position: 'absolute',
    zIndex:1,
    float: 'left',
    right: '8vw',
    paddingTop: '0.7rem',
  }}>
<Avatar size={60} icon={<UserOutlined />}  />
</div>
</Popover>
  )
}
const App = () => {
  // App should handle

  const [loading, setLoading] = React.useState(true)
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [page, setPage] = React.useState('projectList')

  // this can be used instead of setPage to set the page to workbench (when it is not null then render workbench)
  const [project, setProject] = React.useState(null)
  // console.log('App rerender')
  React.useEffect(() => {
    // console.log('useEffect')
    getToken().then(function (token) {
      // clear url 
      window.history.replaceState({}, document.title, "/app")
      setToken(token)
      return token
    })
    .then(function (token)
    {
      getUser(token).then(function (user) {
        setUser(user.data)
        setLoading(false)
      })
  })
  }
  , [])


  if (loading) {
    return    ( 
    <Loading/>
    )
  }
  else {
    let AppStyle = {
      overflow: 'hidden',
      height: '100%'
    }
    let LayoutStyle = {
      height: '100vh'
    }
    return (
      <div className='App' style = {AppStyle}>
        <Layout style={LayoutStyle}>
 
        <ProfileAvatar user={user}></ProfileAvatar>

        {/* </Header> */}
        {PageSwitcher(page, token, user, setPage, setProject, project)}
        </Layout>
      </div>
    )
  }


}
export default App
