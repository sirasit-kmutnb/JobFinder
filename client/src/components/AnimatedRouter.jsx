import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import AboutUs from './pages/AboutUs'
import SingleJobs from './pages/SingleJobs'
import { AnimatePresence } from "framer-motion"

const AnimatedRouter = () => {
  return (
    <AnimatePresence>
      <div className="container-sm">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Jobs' element={<Jobs/>}/>
            <Route path='/AboutUs' element={<AboutUs/>}/>
            <Route path='/Post' element={<SingleJobs/>}/>
        </Routes>
      </div>
      
    </AnimatePresence>
  )
}

export default AnimatedRouter