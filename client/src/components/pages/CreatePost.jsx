import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";
import { getToken } from "../../services/authorize";
import Swal from "sweetalert2";

const CreatePost = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    details: "",
    role: "",
  });

  const { title, details, role } = state;

  //กำหนดค่าให้ state

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    // console.log("API URL = ", import.meta.env.VITE_APP_API);
    axios
      .post(
        `${import.meta.env.VITE_APP_API}/createPost`,
        { title, details, role },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "successful",
          text: "Let's see your post",
        });
        setState({ ...state, title: "", details: "", role: "" });
        navigate("/myPost");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Please try again",
          text: "Something went wrong",
        });
        // alert("err");
      });
  };

  return (
    <AnimatedPage>
      <Link to="../myPost" className="btn btn-outline-success">
        ย้อนกลับ
      </Link>
      <br />
      <br />
      {/* {JSON.stringify(state)} */}
      <form onSubmit={submitForm}>
        <div className="from-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="from-group">
          <label>รายละเอียด</label>
          <textarea
            type="text"
            className="form-control"
            value={details}
            onChange={inputValue("details")}
          ></textarea>
          {/* <textarea className='form-control' value={content} onChange={inputValue("content")}></textarea> */}
        </div>
        <div className="from-group">
          <label>ตำแหน่ง</label>
          <input
            type="text"
            className="form-control"
            value={role}
            onChange={inputValue("role")}
          />
        </div>
        <br />
        <input type="submit" value="บันทีก" className="btn btn-primary" />
      </form>
    </AnimatedPage>
  );
};

export default CreatePost;
