import React from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import './styles/App.css'
import ProjectList from './components/ProjectListPage.js';

// import './styles/SidePanel.css'
// import './styles/options-bar.css'
import './styles/index.css'
import { Layout, Spin } from 'antd'

import Workbench from './components/workbench.js'
import fieldSelector from './dev/fieldSelector.js'
// import ant css
// import 'antd/dist/reset.css'
import getUser from './authentication/GetUserInfo'
// test if workbench is properly imported
import getToken from './authentication/authenticationUtilities'
// getToken().then(function (token) {
  // 
console.log(getToken)

const App = () => {
  // var APP_DATA  = React.useContext(AppDataContext)
  // console.log('APP_DATA', APP_DATA)
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
      console.log('token')
      console.log(token)
      return token
    })
    .then(function (token)
    {
      getUser(token).then(function (user) {
        console.log(user)
        setUser(user.data)
        setLoading(false)
        

      })
  })
  }
  , [])
  // console.log('App prerender')

  if (loading) {
    return    ( 
    // <Layout style={{ height: '100vh' }}>
    // center loading icon
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size='large' style={{marginBottom:'6rem'}}>

    <h1  style={{marginTop:'6rem'}}>Logging In</h1>
    <div className="content" />
  </Spin>
   </div>
    )
  }
  if (page==='workbench') {
    console.log('app project', project)

    return (
    <Workbench token={token} user={user} setPage={setPage} project={project} />

  )}
  if (page==='projectList') {return (
    <ProjectList token={token} user={user} setPage={setPage} setProject={setProject} />
  )}
}
export default App
