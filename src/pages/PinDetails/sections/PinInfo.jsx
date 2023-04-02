import { useState } from "react";
import { Link } from "react-router-dom";

import { urlFor } from "../../../lib/client";
import { client } from "../../../lib/client";

import moment from "moment";

import Button from "../../../components/ui/Button";
import Wrapper from "../../../components/ui/Wrapper";
import Avatar from "../../../components/Avatar";

import "./PinInfo.scss";

const PinInfo = ({ pin, user }) => {
  const {
    _id,
    title,
    desc,
    desnitantion,
    images,
    about,
    postedBy,
    _createdAt,
    savedBy,
  } = pin;

  const [savingPost, setSavingPost] = useState(false);
  const [alreadeSaved, setAlreadySaved] = useState(
    savedBy?._id === user?._id ? true : false
  );

  const handleSaveBtnClick = async (e) => {
    e.stopPropagation();
    try {
      setSavingPost(true);
      await client
        .patch(_id, {
          set: {
            savedBy: { _type: "reference", _ref: user?._id },
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
    e.preventDefault();
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
    <section className="pin-info">
      <Wrapper>
        <div className="pin-info__container">
          <div className="pin-info__left">
            {images && (
              <img
                src={urlFor(images.asset.url)}
                alt={title}
                title={title}
                className="pin-info__img"
              />
            )}
          </div>
          <div className="pin-info__right">
            <h1 className="main-heading">{title}</h1>
            <h3 className="pin-info__about">{about}</h3>
            <div className="pin-info__right-btns">
              {user && !alreadeSaved && (
                <Button
                  onClick={handleSaveBtnClick}
                  text={savingPost ? "zapisywanie..." : "zapisz"}
                />
              )}

              {alreadeSaved && user && (
                <Button
                  danger
                  onClick={handleUnsaveBtnClick}
                  text={savingPost ? "Czekaj.." : "Nie zapisuj"}
                />
              )}
              <a href={`${images.asset.url}?dl=`} className="btn btn--outlined">
                pobierz
              </a>
            </div>
            <p className="pin-info__desc">{desc}</p>
            <a href={desnitantion} className="btn">
              destination link
            </a>
            <Link to={`/uzytkownik/${user?._id}`} className="pin-info__author">
              <Avatar src={postedBy.avatar.asset._ref} />
              <span className="pin-info__author-name">{postedBy.name}</span>
            </Link>
            <time className="pin-info__time">
              {`Dodano - ${moment(_createdAt).format("llll")}`}
            </time>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default PinInfo;
