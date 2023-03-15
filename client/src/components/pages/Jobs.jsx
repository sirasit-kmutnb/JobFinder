import { Link } from "react-router-dom";
import axios from "axios";

import AnimatedPage from "../AnimatedPage";
import { useEffect, useState } from "react";

const Jobs = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowposts] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [input, setInput] = useState("");

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
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    // condition that add the post that parallel with keyword to Showposts list
    if (posts != null) {
      const Datalength = posts.length;
      console.log(Datalength);
      let nodata = true; //

      for (let i = 0; i < Datalength; i++) {
        // check if input include some word in data
        if (
          posts[i].title.toLowerCase().includes(input.toLowerCase()) ||
          posts[i].details.toLowerCase().includes(input.toLowerCase()) // ||
          // findUsername(posts[i].author_id).includes(input.toLowerCase()) ///don't know how to fix it
        ) {
          // work on the first time setShowdata
          if (nodata) {
            // console.log("trips: " + nodata);
            setShowposts([posts[i]]);
            nodata = false;
          } else {
            // work on the second of time setShowdata
            setShowposts((prev) => [...prev, posts[i]]);
          }
        }
        if (nodata) {
          // if input not include any word in data
          setShowposts();
          console.log(showPosts);
        }
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, [posts]);

  return (
    <AnimatedPage>
      <div className="search__container">
        <form onSubmit={(e) => handleSearch(e.preventDefault())}>
          <input
            id="keyword"
            name="keyword"
            className="search__input"
            type="text"
            placeholder="Search"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </form>
      </div>
      {showPosts ? (
        showPosts.map((post, index) => (
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
                {usernames[post.author_id] || findUsername(post.author_id)} ,{" "}
                {/* {post.author_id} ,{" "} */}
                เผยแพร่ : {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <>
          <h3 className="notfound">Not found</h3>
        </>
      )}
    </AnimatedPage>
  );
};

export default Jobs;