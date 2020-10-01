import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  
  const days = props.days.map(day => {
    return (
      <DayListItem
        name={day.name}
        key={day.id}
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    );
    //index.js:1437 Warning: Each child in a list should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.
    //in DayList (at Application.js:114)
  });
  return days;
}