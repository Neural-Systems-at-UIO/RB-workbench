import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css'

import workbench from './components/workbench.js'
import fieldSelector from '../dev/fieldSelector.js'

const App = () => (
  <Router>
  <Route exact path="/" component={workbench} />
  <Route path="/fieldSelector" component={fieldSelector} />
  </Router>

)

export default App
