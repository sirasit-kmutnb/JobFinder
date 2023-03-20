import AnimatedPage from "../AnimatedPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../services/authorize";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
    Swal.fire("Delete complete!", "", "success");
    fetchData();
  };

  const confirmDelete = (slug) => {
    Swal.fire({
      icon: "info",
      title: "Do you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(slug);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatedPage>
      <div className="d-grid gap-2 col-9 mx-auto mt-4">
        <Link to="../createPost" className="btn btn-success">
          สร้างโพสต์
        </Link>
      </div>
      {posts.length === 0 && (
        <div className="notfound">
          <center>
            <h2>ไม่มีโพสต์</h2>
          </center>
        </div>
      )}
      {posts.map((post, index) => (
        <div className="postCard" key={index}>
          <div className="col pt-3 pb-2">
            <Link to={`/Jobs/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
            <div className="pt-3">{post.details.substring(0, 300)}</div>
            {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
            {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
            <div className="badge bg-primary text-wrap">
              ตำแหน่ง : {post.role}
            </div>
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
