const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios
    .post("http://localhost:4005/event", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    })
    .catch((err) => console.log("error"));

  res.status(201).send(comments);
});

app.post("/event", async (req, res) => {
  console.log("Recieved Event", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post("http://localhost:4005/event", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("comments is listening on port 4001");
});
