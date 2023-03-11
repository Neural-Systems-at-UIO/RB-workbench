import React from 'react'
import { ReactComponent as EbrainsLogo } from './resources/ebrains-ai-cropped.svg'

import { Layout, Tabs, Spin, Avatar, Popover} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { UserOutlined } from '@ant-design/icons';

import './styles/App.css'
import './styles/index.css'

import getUser from './authentication/GetUserInfo'
import getToken from './authentication/authenticationUtilities'

// Import local/custom components
import UserProfileCard from './components/UserProfileCard.js';
import { PageSwitcher } from './PageSwitcher';

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

const ProfileAvatar = ({user}) => {
  //console.log('pfa user',  user)

  // Todo: What is the purpose of the container that gets this style??
  const containerStyle = {
    position: 'absolute',
    zIndex:1,
    float: 'left',
    right: '8vw',
    paddingTop: '0.7rem',
  }

  return (
    <Popover placement="bottom" trigger="click" content={<UserProfileCard user={user} />} >
      <div zIndex={9} onClick={() => {console.log('clicked')}} style={containerStyle}>
        <Avatar size={60} icon={<UserOutlined />}  />
      </div>
    </Popover>
  )
}

const App = () => {

  const [loading, setLoading] = React.useState(true)
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)

  function handleTokenReceived(token) {
    window.history.replaceState({}, document.title, "/app") // clear url 
    setToken(token)
    return token
  }

  // Why does it not work to use this in the getUser.then() ??
  function handleUserReceived(user) {
    setUser(user)
    setLoading(false)
  }

  React.useEffect(() => {
    // console.log('useEffect')
    getToken()
    .then( (token) => handleTokenReceived(token) )
      .then(function (token) {
        getUser(token).then(function (user) {
          setUser(user.data)
          setLoading(false)
        })
      })
  }, [])

  if (loading) {
    return ( 
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
        <useHookTest></useHookTest>
        <ProfileAvatar user={user}></ProfileAvatar>

        {/* </Header> */}
        <PageSwitcher token={token} user={user} />
        </Layout>
      </div>
    )
  }
}

export default App
