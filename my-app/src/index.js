import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Constants from './constants/constants.js';
import gangplank from "./images/gangplank.jpeg";
import malphite from "./images/renders/malphite.png";

function ChampionTile(props) {
  return (
    <button
      className="btn btn-primary shop-tile champ-tile"
      onClick={props.onClick}
    >
      <img className="champ-pic" src={gangplank} width="100%"/>
      <div className="d-inline sm-font champ-name">{props.championName}</div>
      <div className="d-inline sm-font champ-cost">💰{props.championCost}</div>
    </button>
  );
}

function BuyXPButton(props) {
  return (
    <button
      className="btn btn-primary btn-block buy-xp-btn"
      onClick={props.onClick}
    >
      <p class="med-font">Buy XP</p>
      <p class="sm-font">💰4</p>
    </button>
  );
}

function RefreshButton(props) {
  return (
    <button
      className="btn btn-primary btn-block refresh-btn"
      onClick={props.onClick}
    >
      <p class="med-font">Refresh</p>
      <p class="sm-font">💰2</p>
    </button>
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
      <h6 className="d-inline sm-font">◍ {Constants.REROLL_ODDS[level][0]}%</h6>
      <h6 className="d-inline sm-font">◍ {Constants.REROLL_ODDS[level][1]}%</h6>
      <h6 className="d-inline sm-font">◍ {Constants.REROLL_ODDS[level][2]}%</h6>
      <h6 className="d-inline sm-font">◍ {Constants.REROLL_ODDS[level][3]}%</h6>
      <h6 className="d-inline sm-font">◍ {Constants.REROLL_ODDS[level][4]}%</h6>
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

        <h2 className="level d-inline lrg-font">Lvl{state['level']}</h2>
        <h5 className="exp d-inline med-font">{xp_text}</h5>
        <RerollOdds className="d-inline" level={state['level']}/>
        <h2 className="gold d-inline lrg-font">💰{state['gold']}</h2>


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
      level: 9,
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
