import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Constants from './constants/constants.js';
import gangplank from "./images/gangplank.jpeg";
import malphite from "./images/renders/malphite.png";
import gem1 from "./images/1-cost-gem.png";
import gem2 from "./images/2-cost-gem.png";
import gem3 from "./images/3-cost-gem.png";
import gem4 from "./images/4-cost-gem.png";
import gem5 from "./images/5-cost-gem.png";
import championtile1 from "./images/champion-tile-1.png";
import championtilehovered1 from "./images/champion-tile-hovered-1.png"
import UIBuyXP from "./images/buy-xp.png"
import UIBuyXPHovered from "./images/buy-xp-hovered.png"
import UIReroll from "./images/reroll.png"
import UIRerollHovered from "./images/reroll-hovered.png"
import Gold from "./images/gold.png"

function ChampionTile(props) {
  function handleMouseOver(e) {
    var champTile = e.target.getElementsByClassName("champ-tile-window")[0];
    if(champTile) {
      champTile.src = championtilehovered1;
    }
  }

  function handleMouseLeave(e) {
    var champTile = e.target.getElementsByClassName("champ-tile-window")[0];
    if(champTile) {
      champTile.src = championtile1;
    }
  }

  return (
    <div
      className="btn btn-primary shop-tile clickable"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="champ-pic" src={gangplank} />
      <img className="champ-tile-window" src={championtile1}/>
      <div width="100%">
        <div className="d-inline sm-font champ-name">{props.championName}</div>
        <div className="d-inline sm-font champ-cost"><img className="d-inline gold-icon-sm" src={Gold}/>{props.championCost}</div>
      </div>
    </div>
  );
}

function BuyXPButton(props) {
  function handleMouseOver(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = UIBuyXPHovered;
    }
  }

  function handleMouseLeave(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = UIBuyXP;
    }
  }

  return (
    <div
      className="buy-xp-btn clickable"
      onClick={props.onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="left-btn-ui" src={UIBuyXP} />
      <div className="left-btn-text">
        <div className="med-font">Buy XP</div>
        <img className="d-inline gold-icon-sm" src={Gold}/><div className="d-inline sm-font">4</div>
      </div>
    </div>
  );
}

function RefreshButton(props) {
  function handleMouseOver(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = UIRerollHovered;
    }
  }

  function handleMouseLeave(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = UIReroll;
    }
  }

  return (
    <div
      className="refresh-btn clickable"
      onClick={props.onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="left-btn-ui" src={UIReroll} />
      <div className="left-btn-text">
        <div className="med-font">Refresh</div>
        <img className="d-inline gold-icon-sm" src={Gold}/><div className="d-inline sm-font">2</div>
      </div>
    </div>
  );
}

function LeftUI(props) {
  return (
    <div className="shop-tile">
      <div><BuyXPButton /></div>
      <div><RefreshButton /></div>
    </div>
  );
}

function RerollOdds(props) {
  const level = props.level;
  return (
    <div className="d-inline reroll-odds">
      <img className="reroll-gem" src={gem1}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][0]}%</h6>
      <img className="reroll-gem" src={gem2}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][1]}%</h6>
      <img className="reroll-gem" src={gem3}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][2]}%</h6>
      <img className="reroll-gem" src={gem4}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][3]}%</h6>
      <img className="reroll-gem" src={gem5}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][4]}%</h6>
    </div>
  )
}

class Shop extends React.Component {
  render() {
    const state = this.props.state;
    const level = state['level'];
    const xp_text = (level == 9) ? "Max" : state['xp'] + "/" + Constants.XP_THRESH[level];
    return (
      <div className="shop">

        <div className="display-bar">
          <h2 className="level d-inline lrg-font">Lvl.{state['level']}</h2>
          <h5 className="exp d-inline med-font">{xp_text}</h5>
          <RerollOdds level={state['level']}/>
          <div className="gold d-inline lrg-font"><img className="d-inline gold-icon-lrg" src={Gold}/>{state['gold']}</div>
        </div>

        <div>
          <LeftUI/>
          <ChampionTile championName="Gangplank" championCost="5"/>
          <ChampionTile championName="Lucian" championCost="5"/>
          <ChampionTile championName="Kayle" championCost="5"/>
          <ChampionTile championName="Cho'gath" championCost="5"/>
          <ChampionTile championName="Kha'zix" championCost="5"/>
        </div>

      </div>
    )
  }
}

function ChampionStageTile(props) {
  return(
    <img className="champ-stage-tile" src={malphite} />
  );
}

class ChampionStage extends React.Component {
  render() {
    const champions = [];
    for(let i = 0; i < 10; i++) {
      champions.push(<ChampionStageTile/>);
    }
    return (
      <div className="champ-stage">
        {champions}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 2,
      xp: 0,
      gold: 50
    };
  }
  render() {
    return (
      <div>
        <ChampionStage />
        <Shop state={this.state}/>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
