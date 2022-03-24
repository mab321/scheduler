import React from "react";

import DayListItem from "./DayListItem";
export default function DayList(props){
  console.log("daylist props",props);
  const dayListItems = props.days.map((listItem,index) => {
    return(<DayListItem
        key={listItem.id}
        name={listItem.name}
        spots={listItem.spots}
        setDay={props.setDay}
      />)
  });

  
  return(
    <ul>
        {dayListItems}
    </ul>
  )
}

