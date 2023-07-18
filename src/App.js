import React from 'react'
import { ReactComponent as EbrainsLogo } from './resources/ebrains-ai-cropped.svg'

import { Layout, Tabs, Spin, Avatar, Popover, Button} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { UserOutlined, HomeOutlined} from '@ant-design/icons';

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
    right: '11vw',
    
    // set flex
    display: 'flex',

  }

  return (
    <div style={containerStyle}>
    <Popover placement="bottom" trigger="click" content={<UserProfileCard user={user} />} >
      <div zIndex={9} onClick={() => {console.log('clicked')}} style={{    
        paddingRight: '1rem',
        paddingTop: '0.1rem',
        borderRadius: '1.5rem',
        backgroundColor: '#d3adf7',
        marginTop: '0.7rem',
        height:'2.75rem',
        cursor: 'pointer'
        }}>
        
        <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: 'transparent' , color:'black'}} />

        <span style={{fontSize: '1rem', marginLeft: '0.5rem',color:'black'}}>User</span>

      </div>
 
    </Popover>
    <div style={{    marginTop:'-1.8rem',marginLeft:'2rem'}}>
      <Avatar size={120} icon={<EbrainsLogo />} style={{ backgroundColor: 'transparent'}} />
    </div>
    </div>
  )
}

const HomeButton = ({setPage}) => {
  //console.log('pfa user',  user)
  const handleHomeButtonClick = () => {
    setPage('projectList')
  }
  // Todo: What is the purpose of the container that gets this style??
  const containerStyle = {
    position: 'absolute',
    zIndex:1,
    float: 'left',
    left: '3vw',
    height:'2.75rem',
    paddingTop: '0.1rem',
    marginTop: '0.7rem',
    paddingRight: '1rem',
    borderRadius: '2rem',
    backgroundColor: '#d3adf7',
    cursor: 'pointer'

  }

  return (
    <div zIndex={9} onClick={() => {handleHomeButtonClick()}} style={containerStyle}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Avatar size={40} icon={<HomeOutlined />} style={{ backgroundColor: 'transparent', color:'black' }} />
        <span style={{fontSize: '1rem',paddingTop:'0.2rem', marginLeft: '0.4rem', color:'black'}}>Return to Projects</span>
      </div>
    </div>
  )
}
const App = () => {

  const [loading, setLoading] = React.useState(true)
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [page, setPage] = React.useState('projectList')

  function handleTokenReceived(token) {
    window.history.pushState({}, document.title, "/") // clear url 
    setToken(token)
    return token
  }
  function authenticate() {
    // get the environment variable
    console.log('process',process.env)
    let URL = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
    let oidc_client_id = process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_ID;
    // let oidc_redirect_uri = `${URL}/app`;
    // let newURL = `https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/auth?response_type=code&login=true&client_id=${oidc_client_id}&redirect_uri=${oidc_redirect_uri}`;
    // console.log(newURL)
    // window.location.href = newURL;
  }


  // Why does it not work to use this in the getUser.then() ??
  function handleUserReceived(user) {
    setUser(user)
    setLoading(false)
  }

  React.useEffect(() => {
    // console.log('useEffect')
    // only authenticate if we are not already authenticated
    if (!window.location.href.includes('code=')) {
    authenticate()
    return
    }
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
        {page !== 'projectList' && <HomeButton setPage={setPage}></HomeButton>}
        <ProfileAvatar user={user}></ProfileAvatar>

        {/* </Header> */}
        <PageSwitcher token={token} user={user} page={page} setPage={setPage} />
        </Layout>
      </div>
    )
  }
}
export default App