import React from "react"
import "../index.css"
import Refresh from "../images/refresh.png"
import RefreshHovered from "../images/refresh-hovered.png"
import RefreshDisabled from "../images/refresh-disabled.png"
import Gold from "../images/gold.png"

export function RefreshButton(props) {
  function handleMouseOver(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI && props.gold >= 2) {
      buttonUI.src = RefreshHovered;
    }
  }
  function handleMouseLeave(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI && props.gold >= 2) {
      buttonUI.src = Refresh;
    }
  }
  let refreshButton = (props.gold >= 2) ? Refresh : RefreshDisabled
  return (
    <button
      className="refresh-btn clickable"
      onClick={props.onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="left-btn-ui" src={refreshButton} />
      <div className="left-btn-text">
        <div className="med-font">Refresh</div>
        <img className="d-inline gold-icon-sm" src={Gold}/><div className="d-inline sm-font">2</div>
      </div>
    </button>
  );
}
