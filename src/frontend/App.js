import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Menu, Layout } from 'antd'
import Icon from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import './styles/App.css'

import workbench from "./components/workbench.js";
import fieldSelector from "../dev/fieldSelector.js";


const App = () => (
  <Router>
  <Route exact path="/" component={workbench} />
  <Route path="/fieldSelector" component={fieldSelector} />
  </Router>

 
)

export default App
