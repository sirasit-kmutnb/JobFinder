import { NavLink, Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container-sm">
            <Link class="navbar-brand" to="/">Job Finder</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link" to="/Jobs">Jobs</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link" to="/AboutUs">About Us</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar