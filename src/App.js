import React from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import './styles/App.css'
// import './styles/SidePanel.css'
// import './styles/options-bar.css'
import './styles/index.css'



import Workbench from './components/workbench.js'
import fieldSelector from './dev/fieldSelector.js'
// import ant css
// import 'antd/dist/reset.css'
// test if workbench is properly imported



const App = () => (
  <Router>
  <Routes>
  {/* replace the above component with element */}
  <Route path="/app" element={<Workbench/>}/>

  <Route path="/fieldSelector" component={fieldSelector} />
  {/* for all unmatched routes send the user to the */}
  </Routes>
  </Router>

)

export default App
