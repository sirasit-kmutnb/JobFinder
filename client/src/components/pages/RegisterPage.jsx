import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    role: "",
    info1: "",
    info2: "",
  });

  const { email, username, password, confirmpassword, role, info1, info2 } =
    auth;

  const inputValue = (name) => (event) => {
    setAuth({ ...auth, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_API}/register`, {
        email,
        username,
        password,
        confirmpassword,
        role,
        info1,
        info2,
      })
      .then((response) => {
        alert("Successful");
        setAuth({
          ...auth,
          email: "",
          username: "",
          password: "",
          confirmpassword: "",
          role: "",
          info1: "",
          info2: "",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      });
  };

  // const [show, setShow] = useState(true)

  // if (!role) {
  //   setShow(false)
  //   console.log(show)
  // }
  // else {
  //   setShow(true)
  //   console.log(show)
  // }

  if (role === "Seeker") {
    var label_info1 = "First Name";
    var label_info2 = "Last Name";
  } else if (role === "Company") {
    var label_info1 = "Company Name";
    var label_info2 = "Details";
  }

  return (
    <AnimatedPage>
      <div className=" p-5">
        <form onSubmit={submitForm}>
          {/* {JSON.stringify(auth)} */}
          <div className="form-group mt-3">
            <label>email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={inputValue("email")}
            />
          </div>

          <div className="form-group mt-3">
            <label>username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={inputValue("username")}
            />
          </div>

          <div className="form-group mt-3">
            <label>password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={inputValue("password")}
            />
          </div>

          <div className="form-group mt-3">
            <label>confirm password</label>
            <input
              type="password"
              className="form-control"
              value={confirmpassword}
              onChange={inputValue("confirmpassword")}
            />
          </div>

          <div className="form-group mt-3">
            <label>Role</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={role}
              onChange={inputValue("role")}
            >
              <option value="">Open this select menu</option>
              <option value="Seeker">Seeker</option>
              <option value="Company">Company</option>
            </select>
          </div>

          {role && (
            <div className="form-group mt-3">
              <label>{label_info1}</label>
              <input
                type="text"
                className="form-control"
                value={info1}
                onChange={inputValue("info1")}
              />
              {/* </div>
        <div className="form-group mt-3"> */}
              <label>{label_info2}</label>
              <input
                type="text"
                className="form-control"
                value={info2}
                onChange={inputValue("info2")}
              />
            </div>
          )}

          <br />
          <input type="submit" value="register" className="btn btn-primary" />
        </form>
      </div>
    </AnimatedPage>
  );
};

export default RegisterPage;
