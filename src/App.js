import React from 'react'
import { ReactComponent as EbrainsLogo } from './resources/ebrains-ai-cropped.svg'

import { Layout, Tabs, Spin, Avatar, Popover, Button} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { UserOutlined, HomeOutlined, DownloadOutlined, BookOutlined} from '@ant-design/icons';

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


const ProfileAvatar = ({user, isSmallScreen}) => {
  //console.log('pfa user',  user)

  // Todo: What is the purpose of the container that gets this style??
  const containerStyle = {
    position: 'absolute',
    zIndex:1,
    float: 'left',
    right: isSmallScreen ? '4vw' : '9vw',
    // set flex
    display: 'flex',
    height: 0,

  }
  console.log("isSmallScreen", isSmallScreen)

  return (
    <div style={containerStyle} >
      <div zIndex={9}  onClick={() => 
    window.open('https://data.kg.ebrains.eu/zip?container=https%3A%2F%2Fdata-proxy.ebrains.eu%2Fapi%2Fv1%2Fbuckets%2Fdemodatasetquintworkflow%3Fprefix%3Dspace-for-testing-the-nutil-web-applicat-tg-ArcSwe_mice_TIFF%2F', '_blank')
    } style={{    
        paddingRight: '1rem',
        paddingTop: '0.1rem',
        borderRadius: '1.5rem',
        backgroundColor: '#d3adf7',
        marginTop: '0.7rem',
        height:'2.75rem',
        cursor: 'pointer',
        }}
        title="Click to download demo dataset"
        >
        
        <Avatar size={40} icon={<DownloadOutlined />} style={{ backgroundColor: 'transparent', color: 'black', marginLeft: isSmallScreen ? '1rem' : '0rem' }} />

        {isSmallScreen ? null : (
  <span style={{fontSize: '1rem', marginLeft: '0.5rem', color: 'black'}}>
Download Demo Dataset</span>)}

      </div>
    <Popover placement="bottom" trigger="click" content={<UserProfileCard user={user} />} >
      <div zIndex={9} style={{    
        paddingRight: '1rem',
        paddingTop: '0.1rem',
        borderRadius: '1.5rem',
        backgroundColor: '#d3adf7',
        marginTop: '0.7rem',
        height:'2.75rem',
        cursor: 'pointer',
        marginLeft: isSmallScreen ? '1rem' : '2rem'

        }}
        title="Click to view your user information"


        >
        
        <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: 'transparent', color: 'black', marginLeft: isSmallScreen ? '1rem' : '0rem' }}/>
        {isSmallScreen ? null : (
  <span style={{fontSize: '1rem', marginLeft: '0.5rem', color: 'black'}}>

User</span>)}

      </div>
 
    </Popover>
    <div zIndex={9} style={{    
        paddingRight: '1rem',
        paddingTop: '0.1rem',
        borderRadius: '1.5rem',
        backgroundColor: '#d3adf7',
        marginTop: '0.7rem',
        height:'2.75rem',
        cursor: 'pointer',
        marginLeft: isSmallScreen ? '1rem' : '2rem'

        }}
        onClick={() =>
          window.open('https://quint-webtools.readthedocs.io/en/latest/', '_blank')
        }
        title="Click to view the workbench documentation"
        >
        
        <Avatar size={40} icon={<BookOutlined />} style={{ backgroundColor: 'transparent', color: 'black', marginLeft: isSmallScreen ? '1rem' : '0rem' }} />
{isSmallScreen ? null : (
  <span style={{fontSize: '1rem', marginLeft: '0.5rem', color: 'black'}}>

    Documentation
  </span>
)}

      </div>
    <div style={{marginTop:'-1.8rem', marginLeft: isSmallScreen ? '0.5rem' : '2rem', cursor: 'pointer'}} onClick={
      () => window.open('https://ebrains.eu', '_blank')
    }>
    <Avatar size={120} icon={<EbrainsLogo />} shape='square' style={{ backgroundColor: 'transparent', color: 'black', marginLeft: isSmallScreen ? '1rem' : '0rem' }} />    </div>
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
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  function handleTokenReceived(token) {
    window.history.pushState({}, document.title, "/") // clear url 
    setToken(token)
    return token
  }
  function authenticate() {
    // get the environment variable
    let oidc_redirect_uri = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
    let oidc_client_id = process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_ID;
    let newURL = `https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/auth?response_type=code&login=true&client_id=${oidc_client_id}&redirect_uri=${oidc_redirect_uri}`;
    console.log('newURL', newURL)
    window.location.href = newURL;
  }

  React.useEffect(() => {
    const handleResize = () => {
      console.log('window.innerWidth', window.innerWidth)
      setIsSmallScreen((window.innerWidth < 1760) && (page != "projectList")); // set breakpoint here

    };
    window.addEventListener('resize', handleResize);
    console.log('page', page)

    // call handleResize initially to set the initial state
    handleResize();

    // cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [isSmallScreen, page]);
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

        {page !== 'projectList' && <HomeButton setPage={setPage}></HomeButton>}
        <ProfileAvatar user={user} isSmallScreen={isSmallScreen}></ProfileAvatar>

        <PageSwitcher token={token} user={user} page={page} setPage={setPage} />
        </Layout>
      </div>
    )
  }
}
export default App