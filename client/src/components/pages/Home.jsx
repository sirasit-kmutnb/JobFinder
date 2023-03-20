import AnimatedPage from "../AnimatedPage";
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import wallpaper1 from "../picture/wallpaper1.jpg";
import wallpaper2 from "../picture/wallpaper2.jpg";
import wallpaper3 from "../picture/wallpaper3.jpg";
import pic1 from "../picture/homepic1.png";
import pic2 from "../picture/homepic2.png";
import pic3 from "../picture/homepic3.png";
import "../../Home.css";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <AnimatedPage>
      <div>
        <div
          id="myCarousel"
          className="carousel slide mb-5"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <ol className="carousel-indicators">
            <li
              data-bs-target="#myCarousel"
              data-bs-slide-to="0"
              className="active"
            ></li>
            <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item custom-height active">
              <img
                src={wallpaper2}
                className="d-block home-wallpaper w-100 opacity-75"
                alt="Carousel item 1"
              />
              <div className="container">
                <div className="carousel-caption text-start blackText">
                  <h1>Welcome to your</h1>
                  <h1>professional community</h1>
                  <p>
                    At our company, we understand that looking for a job can be
                    a daunting task, and that's why we are here to assist you
                    every step of the way. Our team of experienced professionals
                    is dedicated to helping you find the right job that matches
                    your skills, experience, and interests.
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item custom-height">
              <img
                src={wallpaper1}
                className="d-block w-100 home-wallpaper opacity-75 home-wallpaper"
                alt="Carousel item 2"
              />
              <div className="container">
                <div className="carousel-caption blackText">
                  <h1>Develop by</h1>
                  <h2>Computer Engineering KMUTNB</h2>
                  <p>
                    <a className="btn btn-lg btn-primary" href="/AboutUs">
                      see more
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item custom-height">
              <img
                src={wallpaper3}
                className="d-block home-wallpaper w-100 opacity-75"
                alt="Carousel item 3"
              />
              <div className="container">
                <div className="carousel-caption text-end blackText">
                  <h1>Let find your job.</h1>
                  <p>
                    We offer a range of services that can help you with your job
                    search. Our job search platform is designed to help you find
                    job openings in your desired field quickly and easily. You
                    can browse job listings, upload your resume, and apply to
                    jobs directly through our website.
                  </p>
                  <p>
                    <a className="btn btn-lg btn-primary" href="/Jobs">
                      see job
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="row featurette mt-5 mb-5">
          <div className="col-md-6">
            <h2 className="featurette-heading">
              The Seeker,
              <span className="text-muted">looking for work to do.</span>
            </h2>
            <p className="lead">
              In the part of the seeker, we will prepare the employment
              announcement that you want, just tell us your requirements and we
              will find it for you.
            </p>
          </div>
          <div className="col-md-6">
            <img
              className="featurette-image img-fluid mx-auto home-picture"
              src={pic1}
            />
          </div>
        </div>
        <div className="row featurette mt-5 mb-5">
          <div className="col-md-6 order-md-2">
            <h2 className="featurette-heading">
              The Company,
              <span className="text-muted"> looking for people to work.</span>
            </h2>
            <p className="lead">
              In the part of the employer, we will have a system that will allow
              you to post to tell job details to people interested in the line
              of work that we have open.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <img
              className="featurette-image img-fluid mx-auto home-picture"
              src={pic2}
            />
          </div>
        </div>
        <div className="row featurette mt-5 mb-5">
          <div className="col-md-6">
            <h2 className="featurette-heading">
              Opportunity.
              <span className="text-muted">
                we have it for you to get the desired job.
              </span>
            </h2>
            <p className="lead">
              Everyone can find the job they want by typing in what they want to
              do and we will prepare it for you.
            </p>
          </div>
          <div className="col-md-6">
            <img
              className="featurette-image img-fluid mx-auto home-picture"
              src={pic3}
            />
          </div>
        </div>

        <hr className="featurette-divider" />
      </div>
      <footer className="footer">
        <span className="text-muted">© Jobs Finder Company</span>
      </footer>
      {showButton && (
        <button
          className="btn btn-floating btn-lg rounded-circle "
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faArrowUp} className="icon" />
        </button>
      )}
    </AnimatedPage>
  );
};

export default Home;
