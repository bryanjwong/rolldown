import React from "react"
import "../index.css"
import BuyXP from "../images/buy-xp.png"
import BuyXPHovered from "../images/buy-xp-hovered.png"
import BuyXPDisabled from "../images/buy-xp-disabled.png"
import Gold from "../images/gold.png"

export function BuyXPButton(props) {
  function handleMouseOver(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI && props.gold >= 4) {
      buttonUI.src = BuyXPHovered;
    }
  }
  function handleMouseLeave(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI && props.gold >= 4) {
      buttonUI.src = BuyXP;
    }
  }
  let xpButton = (props.gold >= 4) ? BuyXP : BuyXPDisabled;
  return (
    <button
      className="buy-xp-btn clickable"
      onClick={props.onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="left-btn-ui" src={xpButton} />
      <div className="left-btn-text">
        <div className="med-font">Buy XP</div>
        <img className="d-inline gold-icon-sm" src={Gold}/><div className="d-inline sm-font">4</div>
      </div>
    </button>
  );
}
