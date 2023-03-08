import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import AboutUs from './pages/AboutUs'
import { AnimatePresence } from "framer-motion"

const AnimatedRouter = () => {
  return (
    <AnimatePresence>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Jobs' element={<Jobs/>}/>
            <Route path='/AboutUs' element={<AboutUs/>}/>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRouter