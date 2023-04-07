import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", margin: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap ">{renderedPosts}</div>;
};

export default PostList;
