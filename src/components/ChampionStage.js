import React from "react"
import "../index.css"
import { ChampionStageTile } from "./ChampionStageTile.js"

export class ChampionStage extends React.Component {
  render() {
    const stage = this.props.stage;
    const championIcons = [];
    for(let i = 0; i < 9; i++) {
      championIcons.push(<ChampionStageTile
        key={i} champion={stage[i]}
        onMouseOver={() => this.props.onMouseOver(i)}
        onMouseLeave={() => this.props.onMouseLeave(i)}
        handleSetDown={() => this.props.handleSetDown(i)}
        dragging={this.props.dragging}/>);
    }
    return (
      <div className="champ-stage row">
        {championIcons}
      </div>
    );
  }
}
