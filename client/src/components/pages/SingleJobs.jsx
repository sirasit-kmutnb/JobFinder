import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

const SingleJobs = () => {
  let { slug } = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/post/${slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <AnimatedPage>
      <Link to="../Jobs" className="btn btn-outline-success">
        ย้อนกลับ
      </Link>
      <br />
      <br />
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p className="text-muted">
            ผู้โพสต์:{" "}
            {post.author} ,
            เผยแพร่ : {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="pt-3">{post.details}</div>
          {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
        </div>
      )}
    </AnimatedPage>
  );
};

export default SingleJobs;
