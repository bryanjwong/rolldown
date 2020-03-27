import React from "react"
import "../index.css"
import * as Constants from "../constants.js"
import KeybindSound from "../audio/pickup.ogg"

export default class KeyListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      keybindNumber: this.props.keybindNumber
    }
    this.handleClick = this.handleClick.bind(this);
    this.changeKeybind = this.changeKeybind.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.changeKeybind);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.changeKeybind);
  }

  changeKeybind(e) {
    if(!this.state.active) return;
    Constants.KEYBINDS[this.state.keybindNumber][0] = e.keyCode;
    this.setState({
      active: false
    })
    console.log("Keybind changed to " + e.keyCode);
  }

  handleClick() {
    let player = new Audio(KeybindSound);
    player.play();
    this.setState({
      active: true
    });
  }
  render() {
    let keyCode = this.state.active ? "_" : Constants.KEYBINDS[this.state.keybindNumber][0];
    return(
      <div className="key-listener-content"
        onClick={this.handleClick}
        onKeyDown={this.changeKeybind}
      >
        <div className="key-name">{keyCode}</div>
        <div className="key-function med-font">{Constants.KEYBINDS[this.state.keybindNumber][1]}</div>
      </div>
    );
  }
}
