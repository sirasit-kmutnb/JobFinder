import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import AboutUs from "./pages/AboutUs";
import SingleJobs from "./pages/SingleJobs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPost from "./pages/MyPost";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import CompanyRoute from "../services/CompanyRoute";

const AnimatedRouter = () => {
  return (
    <AnimatePresence>
      <div className="container-sm mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/Jobs/:slug" element={<SingleJobs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route
            path="/createPost"
            element={
              <CompanyRoute>
                <CreatePost />
              </CompanyRoute>
            }
          />
          <Route
            path="/MyPost"
            element={
              <CompanyRoute>
                <MyPost />
              </CompanyRoute>
            }
          />
          <Route
            path="/MyPost/edit/:slug"
            element={
              <CompanyRoute>
                <EditPost />
              </CompanyRoute>
            }
          />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default AnimatedRouter;
