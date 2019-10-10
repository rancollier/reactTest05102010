import React, { useState, useEffect, useRef } from "react";
import CN from "classnames";
import { LikeDislikeBtn } from './components/LikeDislikeBtn';
import "./style.css";


const LIKE = "Like";
const DISLIKE = "Dislike";

const LikeDislike = () => {
  const [preference, setPreference] = useState(null);
  const [likeCount, setLikeCount] = useState(100);
  const [likeStyle, setLikeStyle] = useState();
  const [dislikeStyle, setDislikeStyle] = useState();
  const [dislikeCount, setDislikeCount] = useState(25);
  const prevPreference = useRef(preference);

  useEffect(() => {
    if (prevPreference.current === LIKE && preference !== DISLIKE) {
      setLikeCount(likeCount - 1);
      prevPreference.current = null;
    } else if (prevPreference.current === DISLIKE && preference !== LIKE) {
      setDislikeCount(dislikeCount - 1);
      prevPreference.current = null;
    } else if (prevPreference.current === DISLIKE && preference === LIKE) {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      prevPreference.current = LIKE;
    } else if (preference === LIKE) {
      setLikeCount(likeCount + 1);
      prevPreference.current = LIKE;
    } else if (prevPreference.current === LIKE && preference === DISLIKE) {
      setLikeCount(likeCount - 1);
      setDislikeCount(dislikeCount + 1);
      prevPreference.current = DISLIKE;
    } else if (preference === DISLIKE) {
      setDislikeCount(dislikeCount + 1);
      prevPreference.current = DISLIKE;
    }
  }, [preference]);

  useEffect(() => {
    const newLikeStyle = CN("like-button", {
      like: prevPreference.current === LIKE
    });
    const newDislikeStyle = CN("dislike-button", {
      dislike: prevPreference.current === DISLIKE
    });

    setLikeStyle(newLikeStyle);
    setDislikeStyle(newDislikeStyle);
  }, [prevPreference.current]);

  const handleClick = pref => {
    return evt => {
      const selectedPref = preference === pref ? null : pref;
      setPreference(selectedPref);
    };
  };

  const handleLike = handleClick(LIKE);
  const handleDislike = handleClick(DISLIKE);

  return (
    <>
      <LikeDislikeBtn
        btnClass={likeStyle}
        handleClick={handleLike}
        label={LIKE}
        count={likeCount}
      />
      <LikeDislikeBtn
        btnClass={dislikeStyle}
        handleClick={handleDislike}
        label={DISLIKE}
        count={dislikeCount}
      />
    </>
  );
};

export default LikeDislike;
