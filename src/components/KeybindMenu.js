import React from "react"
import "../index.css"
import KeyListener from "./KeyListener.js"
import sellChampBackground from "../images/sell-champ-background.png"

export class KeybindMenu extends React.Component {
  render() {
    if(this.props.hidden) {
      return null;
    } else {
      return (
        <div className="sell-champ-content">
          <img className="sell-champ-background" src={sellChampBackground}/>
          <div className="keybind-menu row">
            <div className="keybind-menu-text">Keybinds</div>
            <KeyListener keybindNumber={0}/>
            <KeyListener keybindNumber={1}/>
            <KeyListener keybindNumber={2}/>
          </div>
        </div>
      );
    }
  }
}
