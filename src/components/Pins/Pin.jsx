import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlFor } from "../../lib/client";
import { client } from "../../lib/client";
import { useAuthContext } from "../../hooks/useAuthContext";

import Avatar from "../../components/Avatar";

import "./Pin.scss";

const Pin = ({ pin }) => {
  const { _id, images, title, postedBy, savedBy } = pin;
  const { user } = useAuthContext();

  const [savingPost, setSavingPost] = useState(false);
  const [alreadeSaved, setAlreadySaved] = useState(
    savedBy?._id === user?._id ? true : false
  );

  const navigate = useNavigate();

  const handleSaveBtnClick = async (e) => {
    e.stopPropagation();
    try {
      setSavingPost(true);
      await client
        .patch(_id, {
          set: {
            savedBy: { _type: "reference", _ref: user._id },
          },
        })
        .commit();
      setSavingPost(false);
      setAlreadySaved(true);
    } catch (error) {
      setSavingPost(false);
      console.log(error);
    }
  };

  const handleUnsaveBtnClick = async (e) => {
    e.stopPropagation();
    try {
      setSavingPost(true);
      await client
        .patch(_id, {
          unset: ["savedBy"],
        })
        .commit();
      setSavingPost(false);
      setAlreadySaved(false);
    } catch (error) {
      setSavingPost(false);
      console.log(error);
    }
  };

  return (
    <div onClick={() => navigate(`/szczegoly/${_id}`)} className="pin">
      <h3 className="pin__title">{title}</h3>
      {user && !alreadeSaved && (
        <button onClick={handleSaveBtnClick} className="pin__save">
          {savingPost ? "zapisywanie..." : "zapisz"}
        </button>
      )}
      {alreadeSaved && user && (
        <button
          onClick={handleUnsaveBtnClick}
          className="pin__save pin__save--unsave"
        >
          {savingPost ? "Czekaj.." : "Nie zapisuj"}
        </button>
      )}

      <button className="pin__download">
        {images && (
          <a
            href={`${images.asset.url}?dl=`}
            onClick={(e) => e.stopPropagation()}
            download
          >
            pobierz
          </a>
        )}
      </button>
      {images && (
        <img
          src={urlFor(images.asset.url)}
          alt={title}
          className="pin__image"
        />
      )}
      <Link
        className="pin__postedby"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          navigate(`/uzytkownik/${postedBy._id}`);
        }}
      >
        <Avatar src={postedBy.avatar.asset._ref} />
        <span className="pin__postedby-name">{postedBy.name}</span>
      </Link>
    </div>
  );
};

export default Pin;
