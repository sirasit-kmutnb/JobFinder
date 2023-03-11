import AnimatedPage from "../AnimatedPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../services/authorize";
import { Link, useNavigate } from "react-router-dom";

const myPost = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/getPost`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((err) => alert(err));
  };

  const deletePost = (slug) => {
    axios
      .delete(`${import.meta.env.VITE_APP_API}/removePost/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        fetchData();
      })
      .catch((err) => console.log(err));
    alert("Deleted");
    fetchData();
  };

  const confirmDelete = (slug) => {
    const result = window.confirm("คุณต้องการลบบทความหรือไม่?");
    if (result) {
      deletePost(slug);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatedPage>
      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="../createPost" className="btn btn-success">
          โพสต์
        </Link>
      </div>
      <hr />
      {posts.length === 0 && (
        <center>
          <p>ไม่มีโพสต์</p>
        </center>
      )}
      {posts.map((post, index) => (
        <div
          className="row mt-3"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/Jobs/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
            <div className="pt-3">{post.details.substring(0, 300)}</div>
            {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
            {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
            <p className="text-muted">
              ผู้โพสต์: You , เผยแพร่ :{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <Link
              to={`edit/${post.slug}`}
              className="btn btn-outline-primary m-1"
            >
              แก้ไขโพสต์
            </Link>
            <button
              className="btn btn-outline-danger m-1"
              onClick={() => confirmDelete(post.slug)}
            >
              ลบโพสต์
            </button>
          </div>
        </div>
      ))}
    </AnimatedPage>
  );
};

export default myPost;
