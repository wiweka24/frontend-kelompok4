import { 
  HashRouter as Router,  
  Route, 
  Routes
} from 'react-router-dom'
import Login from "./pages/Login"
import Activity from './pages/Activity'
import Nav from './components/nav'

export default function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/1' element={<Activity/>} />
      </Routes>
    </Router>
  )
}