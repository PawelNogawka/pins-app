import React from "react";
import { useDelete } from "../../../../hooks/useDelete";
import { useAuthContext } from "../../../../hooks/useAuthContext";

import moment from "moment";

import Avatar from "../../../../components/Avatar";

import "./CommentsList.scss";

const Comment = ({ comment, setComments }) => {
  const { deleteDocument, isLoading } = useDelete();
  const { user } = useAuthContext();

  const handleDeleteBtnClick = async () => {
    await deleteDocument(comment._id);
    setComments((prevComments) =>
      prevComments.filter((prevComment) => prevComment._id !== comment._id)
    );
  };
  return (
    <li className="comment">
      <div className="comment__author">
        <Avatar src={comment.postedBy.avatar.asset._ref} />
        <div className="comment__author-info">
          <span className="comment__author-name">{comment.postedBy.name}</span>
          <time className="comment__author-date">
            {moment(comment._createdAt).format("LLLL")}
          </time>
        </div>
        {user && user._id === comment.postedBy._id && (
          <button
            onClick={handleDeleteBtnClick}
            className="comment__delete-btn"
          >
            {`${isLoading ? "ładowanie..." : "usuń"}`}
          </button>
        )}
      </div>
      <p className="comment__value">{comment.value}</p>
    </li>
  );
};

const CommentsList = ({ setComments, comments }) => {
  return (
    <ul className="comments-list">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} setComments={setComments} />
      ))}
    </ul>
  );
};

export default CommentsList;
