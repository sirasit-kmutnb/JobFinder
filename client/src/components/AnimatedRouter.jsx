import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import AboutUs from './pages/AboutUs'
import SingleJobs from './pages/SingleJobs'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AnimatePresence } from "framer-motion"

const AnimatedRouter = () => {
  return (
    <AnimatePresence>
      <div className="container-sm mt-3">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Jobs' element={<Jobs/>}/>
            <Route path='/AboutUs' element={<AboutUs/>}/>
            <Route path='/Post' element={<SingleJobs/>}/>
            <Route path='/Register' element={<RegisterPage/>}/>
            <Route path='/Login' element={<LoginPage/>}/>
        </Routes>
      </div>
      
    </AnimatePresence>
  )
}

export default AnimatedRouter