import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";
import { getToken } from "../../services/authorize";

const CreatePost = () => {
  const [state, setState] = useState({
    title: "",
    author_id: "",
    details: "",
    role: "",
  });

  const { title, author_id, details, role } = state;

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
        { title, author_id, details, role },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        alert("success");
        setState({ ...state, title: "", author_id: "", details: "", role: "" });
      })
      .catch((err) => {
        alert("err");
      });
  };

  return (
    <AnimatedPage>
      <Link to="../myPost" className="btn btn-outline-success">
        ย้อนกลับ
      </Link>
      <br />
      <br />
      {JSON.stringify(state)}
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
