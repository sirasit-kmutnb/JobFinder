import AnimatedPage from "../AnimatedPage";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/authorize";
import { useParams } from "react-router-dom";

const EditPost = () => {
  let { slug } = useParams();

  const [state, setState] = useState({
    title: "",
    details: "",
    role: "",
  });

  const { title, details, role } = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/post/${slug}`)
      .then((response) => {
        const { title, details, role } = response.data;
        setState({ ...state, title, details, role });
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    console.log();
    // console.log("API URL = ", import.meta.env.VITE_APP_API)
    axios
      .put(
        `${import.meta.env.VITE_APP_API}/updatePost/${slug}`,
        // "http://127.0.0.1:5500/api/updatePost/a3513e34-bb5f-4ba7-9065-cd9121a04005",
        { title, details, role },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        alert("Update success");
        const { title, details, role } = response.data;
        setState({ ...state, title, details, role });
      });
    // .catch((err) => {
    //   alert("err");
    //   console.log(err);
    // });
  };

  return (
    <AnimatedPage>
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
          <label>ผู้เขียน</label>
          <input
            type="text"
            className="form-control"
            value={role}
            onChange={inputValue("role")}
          />
        </div>
        <br />
        <input type="submit" value="อัพเดต" className="btn btn-primary" />
      </form>
    </AnimatedPage>
  );
};

export default EditPost;
