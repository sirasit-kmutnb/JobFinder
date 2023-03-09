import { NavLink, Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-sm">
            <Link className="navbar-brand" to="/">Job Finder</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Jobs">Jobs</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/AboutUs">About Us</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Post">Single Page</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                  <li className="navbar-nav">
                    <Link className="nav-link text-success" to="#">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="#">Register</Link>
                  </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar