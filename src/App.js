import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import './App.css'
import Register from './Register.js'
import { ReactComponent as EbrainsLogo } from './ebrains-ai-cropped.svg'
import { ReactComponent as HomeButton } from './home.svg'
import { Header } from 'antd/lib/layout/layout'
// var perf = require('./sine-wave.html');
import SineWave from "./SineWave";
import workbench from "./workbench.js";
import fieldSelector from "./fieldSelector.js";
const { Content } = Layout
const { TabPane } = Tabs
const items = [
  { label: 'Registration' },
  { label: 'Analysis' },
  { label: 'Projects' }
]

const App = () => (
  <Router>
  <Route exact path="/" component={workbench} />
  <Route path="/fieldSelector" component={fieldSelector} />
  </Router>

 
)

export default App
