import React from "react"
import "../index.css"
import sellChampBackground from "../images/sell-champ-background.png"

export function SellChampButton(props) {
  if(props.sellCost === 0) {
    return null;
  } else return (
    <div className="sell-champ-content" onClick={props.onClick}>
      <img className="sell-champ-background" src={sellChampBackground}/>
      <h1 className="sell-champ-text">Sell for {props.sellCost} Gold</h1>
    </div>
  );
}
