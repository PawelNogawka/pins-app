import { useState } from "react";

import { useCreate } from "../../../../hooks/useCreate";

import TextArea from "../../../../components/ui/TextArea";
import Button from "../../../../components/ui/Button";
import Avatar from "../../../../components/Avatar";

import "./CommentForm.scss";

const CommentForm = ({ user, pinId }) => {
  const [comment, setComment] = useState("");
  const { isLoading, addDocument } = useCreate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") return;

    await addDocument({
      _type: "comment",
      value: comment,
      postedBy: {
        _type: "reference",
        _ref: user._id,
      },
      pin: {
        _type: "reference",
        _ref: pinId,
      },
    });

    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <Avatar src={user.avatar.asset._ref} />
      <div className="comment-form__row">
        <TextArea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          label="Zostaw komentarz"
          placeholder="Napisz komentarz..."
          required
        />
        <div className="comment-form__btns">
          <Button submit text={`${isLoading ? "ładowanie..." : "potwierdz"}`} />
          <Button onClick={() => setComment("")} outlined text="wyczyść" />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
