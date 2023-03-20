import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { getUser, getRole, logout, getSub } from "../services/authorize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGem } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const userData = (accountID) => {
    axios
      .post(`${import.meta.env.VITE_APP_API}/accountInfo`, { accountID })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  };

  let LinkActive = {
    color: "#2D86FF",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-sm">
          <Link className="navbar-brand" to="/">
            Job Finder
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) => (isActive ? LinkActive : undefined)}
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) => (isActive ? LinkActive : undefined)}
                  to="/Jobs"
                >
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) => (isActive ? LinkActive : undefined)}
                  to="/AboutUs"
                >
                  About Us
                </NavLink>
              </li>
            </ul>

            {!getUser() && (
              <ul className="navbar-nav">
                <li className="navbar-item">
                  <Link className="nav-link text-success" to="/Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/Register">
                    Register
                  </Link>
                </li>
              </ul>
            )}

            {getUser() && getRole() === "Seeker" && (
              <ul className="navbar-nav">
                <li className="navbar-nav">
                  <span className="nav-link disabled">{getUser()}</span>
                </li>

                {/* <li className="navbar-nav ms-3">
                            <Link to='/MyPost' className="btn btn-primary">My Posts</Link>
                        </li> */}
                <li className="navbar-nav ms-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => logout(() => navigate("/"))}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </ul>
            )}

            {getUser() && getRole() === "Company" && (
              <ul className="navbar-nav">
                <li className="navbar-nav">
                  {getSub() ? (
                    <span className="nav-link text-warning">
                      <FontAwesomeIcon icon={faGem} />
                    </span>
                  ) : (
                    <span className="nav-link text-black-50">
                      <FontAwesomeIcon icon={faGem} />
                    </span>
                  )}

                  <span className="nav-link disabled">{getUser()}</span>
                </li>
                <li className="navbar-nav ms-3">
                  <Link to="/MyPost" className="btn btn-primary">
                    My Posts
                  </Link>
                </li>
                <li className="navbar-nav ms-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => logout(() => navigate("/"))}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
