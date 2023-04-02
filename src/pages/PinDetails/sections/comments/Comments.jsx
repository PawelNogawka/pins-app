import React from "react";
import { useSanity } from "../../../../hooks/useSanity";

import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import Wrapper from "../../../../components/ui/Wrapper";

import "./Comments.scss";

const Comments = ({ user, pinId }) => {
  const { data, setData, isLoading, error } =
    useSanity(`*[_type == 'comment' && pin->_id == '${pinId}'] {
      _id,
    _createdAt,
    value,
    postedBy -> {
      _id,
      name,
      avatar
    }
  }`);

  if (isLoading) return;
  if (error && !user) return;

  return (
    <section className="comments section-padding">
      <Wrapper>
        <h2 className="section-heading">komentarze</h2>
        <div className="comments__container">
          <CommentsList comments={data} setComments={setData} />
          {user && <CommentForm user={user} pinId={pinId} />}
        </div>
      </Wrapper>
    </section>
  );
};

export default Comments;
