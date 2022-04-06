import React from "react";

import DayListItem from "./DayListItem";
export default function DayList(props){
  
  const dayListItems = props.days.map((listItem,index) => {
    return(<DayListItem
        key={listItem.id}
        name={listItem.name}
        spots={listItem.spots}
        selected={listItem.name === props.value}
        setDay={(event) => props.onChange(listItem.name)}
      />)
  });

  
  return(
    <ul>
        {dayListItems}
    </ul>
  )
}

