import { Link } from "react-router-dom";
import axios from "axios";

import AnimatedPage from "../AnimatedPage";
import { useEffect, useState } from "react";

const Jobs = () => {
  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState([]);

  const findUsername = (accountID) => {
    axios
      .post(`${import.meta.env.VITE_APP_API}/accountInfo`, { accountID })
      .then((response) => {
        // console.log(response);

        setUsernames((prevState) => ({
          ...prevState,
          [accountID]: response.data.username,
        }));
      })
      .catch((err) => alert(err));
  };
  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/posts`)
      .then((response) => {
        // console.log(response.data)
        setPosts(response.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatedPage>
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
              ผู้โพสต์:{" "}
              {usernames[post.author_id] || findUsername(post.author_id)} ,
              เผยแพร่ : {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </AnimatedPage>
  );
};

export default Jobs;
