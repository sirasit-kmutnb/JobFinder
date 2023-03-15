import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

const SingleJobs = () => {
  let { slug } = useParams();
  const [post, setPost] = useState("");
  const [usernames, setUsernames] = useState({});

  const findUsername = (accountID) => {
    axios
      .post(`${import.meta.env.VITE_APP_API}/accountInfo`, { accountID })
      .then((response) => {
        // console.log(response.data.username);
        setUsernames((prevState) => ({
          ...prevState,
          [accountID]: response.data.username,
        }));
      })
      .catch((err) => alert(err));
  };

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
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p className="text-muted">
            ผู้โพสต์:{" "}
            {usernames[post.author_id] || findUsername(post.author_id)} ,
            {/* {post.author_id} , */}
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
