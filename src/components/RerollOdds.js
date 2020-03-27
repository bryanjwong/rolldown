import React from "react"
import "../index.css"
import * as Constants from "../constants.js"
import RerollOddsBackground from "../images/reroll-odds-background.png"
import Gem1 from "../images/gem-1.png"
import Gem2 from "../images/gem-2.png"
import Gem3 from "../images/gem-3.png"
import Gem4 from "../images/gem-4.png"
import Gem5 from "../images/gem-5.png"

export function RerollOdds(props) {
  const level = props.level;
  return (
    <div className="d-inline reroll-odds">
      <img className="reroll-odds-background" src={RerollOddsBackground}/>
      <div className="reroll-content">
        <img className="reroll-gem" src={Gem1}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][0]}%</h6>
        <img className="reroll-gem" src={Gem2}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][1]}%</h6>
        <img className="reroll-gem" src={Gem3}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][2]}%</h6>
        <img className="reroll-gem" src={Gem4}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][3]}%</h6>
        <img className="reroll-gem" src={Gem5}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][4]}%</h6>
      </div>
    </div>
  )
}
