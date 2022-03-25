import React from "react";

import "components/InterviewerListItem.scss"
import classNames from "classnames";
export default function InterviewerListItem(props) {
  console.log("props",props);
  const interviewerListClass = classNames("interviewers__item",{
    "interviewers__item--selected": props.selected
  });
  const interviewerImageClass = classNames("interviewers__item-image",{
    "interviewers__item--selected-image": props.selected
  });
  
  return (
    <li className={interviewerListClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
  </li>

  );
}