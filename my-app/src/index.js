import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import gangplank from "./images/gangplank.jpeg"

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
  return (
    <div className="d-inline reroll-odds">
      <h6 className="d-inline sm-font">◍ 5%</h6>
      <h6 className="d-inline sm-font">◍ 5%</h6>
      <h6 className="d-inline sm-font">◍ 5%</h6>
      <h6 className="d-inline sm-font">◍ 5%</h6>
      <h6 className="d-inline sm-font">◍ 5%</h6>
    </div>
  )
}

class Shop extends React.Component {
  render() {
    return (
      <div className="shop">

        <h2 className="level d-inline lrg-font">Lvl5</h2>
        <h5 className="exp d-inline med-font"> 2/10</h5>
        <div className="d-inline"><RerollOdds /></div>
        <h2 className="gold d-inline lrg-font">💰18</h2>


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

// ========================================

ReactDOM.render(
  <Shop />,
  document.getElementById('root')
);
