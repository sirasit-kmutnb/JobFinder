import AnimatedPage from "../AnimatedPage";
import groupMembers from "../../groupMembers.jsx";
import banner from "../picture/about_us_pic.jpg";
import "../../AboutUs.css";
import { color } from "framer-motion";

function Box({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

const AboutUs = () => {
  return (
    <AnimatedPage className="about-us">
      <img src={banner} alt="about us banner" className="banner" />
      <h1 className="center-about">About Us</h1>
      <div className="group-members">
        {groupMembers.map((member, index) => (
          <div key={index}>
            <Box className="info-box">
              <div className="info-frame">
                <Box className="img-box">
                  <img src={member.picture} alt={member.name} className="pic" />
                </Box>
                <div className="info-area">
                  <p className="info">Name : {member.name}</p>
                  <p className="info">Email : {member.email}</p>
                  <p className="info">StudentID : {member.stdID}</p>
                  <p className="info">Year : {member.year}</p>
                </div>
              </div>
            </Box>
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
};

export default AboutUs;
