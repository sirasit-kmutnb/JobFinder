import { Link } from "react-router-dom";
import axios from "axios";

import AnimatedPage from "../AnimatedPage";
import { useEffect, useState } from "react";
import "../../Jobs.css";

const Jobs = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowposts] = useState([]);
  const [input, setInput] = useState("");

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
          posts[i].details.toLowerCase().includes(input.toLowerCase()) ||
          posts[i].author.toLowerCase().includes(input.toLowerCase())
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

  const findBytag = () => {};

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
            className="postCard"
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-2 pb-2">
              <Link to={`/Jobs/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>
              <div className="pt-2">{post.details.substring(0, 300)}</div>
              {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
              {/* <div className="pt-3">{post.details.info2.substring(0, 300)}</div> */}
              <div className="badge bg-primary text-wrap">
                ตำแหน่ง : {post.role}
              </div>
              <p className="text-muted pt-2">
                ผู้โพสต์: {post.author} , เผยแพร่:{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="notfound">
            <center>
              <h2>ไม่มีโพสต์ที่คุณหาโดยคำว่า</h2>
              <h3>"{input}"</h3>
            </center>
          </div>
        </>
      )}
    </AnimatedPage>
  );
};

export default Jobs;
