import React from "react";
import { string, func, number } from "prop-types";

export const LikeDislikeBtn = props => {
  const { label, handleClick, count, btnClass } = props;

  return (
    <button className={btnClass} type="button" onClick={handleClick}>
      {label} | {count}
    </button>
  );
};

LikeDislikeBtn.propTypes = {
  btnClass: string,
  count: number.isRequired,
  label: string.isRequired,
  handleClick: func.isRequired
};
