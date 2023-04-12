import React from "react";

const CommentList = ({ comments }) => {
  console.log(comments);
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "Comment awaiting moderation";
    }
    if (comment.status === "rejected") {
      content = "Comment has been rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });
  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
