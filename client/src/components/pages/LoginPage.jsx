import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate, getUser } from "../../services/authorize";
import AnimatedPage from "../AnimatedPage";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const { username, password } = auth;

  const inputValue = (name) => (event) => {
    setAuth({ ...auth, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_API}/login`, { username, password })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "Let's start!",
        });
        console.log(response);
        authenticate(response, () => navigate("/"));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Please try again",
          text: "Your username or password is incorrect",
        });
        // console.log(err.response.data.err)
      });
  };

  useEffect(() => {
    getUser() && navigate("/");
  }, []);

  return (
    <AnimatedPage>
      {/* {JSON.stringify(auth)} */}
      <div className="p-5">
        <form onSubmit={submitForm}>
          <div className="from-group">
            <label>username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={inputValue("username")}
            />
          </div>
          <div className="from-group">
            <label>password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={inputValue("password")}
            />
          </div>
          <br />
          <input
            type="submit"
            value="เข้าสู่ระบบ"
            className="btn btn-primary"
          />
        </form>
      </div>
    </AnimatedPage>
  );
};

export default LoginPage;
