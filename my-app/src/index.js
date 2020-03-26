import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import * as Constants from "./constants.js"
const ChampionData = require("./json/champions.json");

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('./images', true, /\.(png|jpe?g|svg)$/));
console.log(images);
console.log(ChampionData);
console.log(Constants.championPool);

class ChampionTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bought: false
    };
  }
  handleMouseOver(e) {
    let champTile = e.target.getElementsByClassName("champ-tile-window")[0];
    let cost = this.props.champion['cost'].toString();
    if(champTile) {
      champTile.src = images["shop-tile/tile-hovered" + cost + ".png"];
    }
  }
  handleMouseLeave(e) {
    let champTile = e.target.getElementsByClassName("champ-tile-window")[0];
    let cost = this.props.champion['cost'].toString();
    if(champTile) {
      champTile.src = images["shop-tile/tile" + cost + ".png"];
    }
  }
  render() {
    let championName = this.props.champion['name'];
    let championCost = this.props.champion['cost'];
    let championImagePath = "splash/" + championName.replace(" ", "").replace("'", "") + ".png";
    let championTraits = this.props.champion['traits'];
    let tileImagePath = "shop-tile/tile" + championCost + ".png";
    let traitTexts = [];
    for(let trait of championTraits) {
      let traitImagePath = "traits/" + trait.toLowerCase().replace(" ", "").replace("-", "") + ".png";
      traitTexts.push(
        <div className="sm-font">
          <img className="trait-icon" src={images[traitImagePath]}/>
          {trait}
        </div>
      );
    }
    let goldElements = championCost ? (
      <div className="d-inline sm-font champ-cost"><img className="d-inline gold-icon-sm" src={images['gold.png']}/>{championCost}</div>
    ) : "";
    return (
      <div
        className="shop-tile clickable"
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={this.props.onClick}
      >
        <img className="champ-pic" src={images[championImagePath]} />
        <img className="champ-tile-window" src={images[tileImagePath]}/>
        <div className="champ-trait-text">
          {traitTexts}
        </div>
        <div className="champ-tile-text">
          <div className="d-inline sm-font champ-name">{championName}</div>
          {goldElements}
        </div>
      </div>
    );
  }
}

function BuyXPButton(props) {
  function handleMouseOver(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = images['buy-xp-hovered.png'];
    }
  }

  function handleMouseLeave(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = images['buy-xp.png'];
    }
  }

  return (
    <button
      className="buy-xp-btn clickable"
      onClick={props.onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="left-btn-ui" src={images['buy-xp.png']} />
      <div className="left-btn-text">
        <div className="med-font">Buy XP</div>
        <img className="d-inline gold-icon-sm" src={images['gold.png']}/><div className="d-inline sm-font">4</div>
      </div>
    </button>
  );
}

function RefreshButton(props) {
  function handleMouseOver(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = images['refresh-hovered.png'];
    }
  }

  function handleMouseLeave(e) {
    var buttonUI = e.target.getElementsByClassName("left-btn-ui")[0];
    if(buttonUI) {
      buttonUI.src = images['refresh.png'];
    }
  }

  return (
    <button
      className="refresh-btn clickable"
      // onClick={props.refreshClicked()}
      onClick={props.onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img className="left-btn-ui" src={images['refresh.png']} />
      <div className="left-btn-text">
        <div className="med-font">Refresh</div>
        <img className="d-inline gold-icon-sm" src={images['gold.png']}/><div className="d-inline sm-font">2</div>
      </div>
    </button>
  );
}

function RerollOdds(props) {
  const level = props.level;
  return (
    <div className="d-inline reroll-odds">
      <img className="reroll-odds-background" src={images['reroll-odds-background.png']}/>
      <div className="reroll-content">
        <img className="reroll-gem" src={images['gem-1.png']}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][0]}%</h6>
        <img className="reroll-gem" src={images['gem-2.png']}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][1]}%</h6>
        <img className="reroll-gem" src={images['gem-3.png']}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][2]}%</h6>
        <img className="reroll-gem" src={images['gem-4.png']}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][3]}%</h6>
        <img className="reroll-gem" src={images['gem-5.png']}/><h6 className="d-inline sm-font">{Constants.REROLL_ODDS[level][4]}%</h6>
      </div>

    </div>
  )
}

class Shop extends React.Component {
  constructor(props) {
    super(props);
    let myStore = [];
    for(let i = 0; i < 5; i++) {
      let champRolled = this.reroll(2);
      myStore.push({
        name: champRolled['name'],
        cost: champRolled['cost'],
        traits: champRolled['traits']
      });
    }
    this.state = {
      level: 2,
      xp: 0,
      gold: 50,
      store: myStore
    };

  }

  buyXPClicked() {
    if(this.state['level'] === 9 || this.state['gold'] < 4) {
      return;
    }
    var gold = this.state['gold'] - 4;
    var xp = this.state['xp'] + 4;
    var level = this.state['level'];
    if(xp >= Constants.XP_THRESH[level]) {
      xp -= Constants.XP_THRESH[level];
      level++;
    }
    this.setState ({
      level: level,
      xp: xp,
      gold: gold
    });
  }

  refreshClicked() {
    if(this.state['gold'] < 2) {
      return;
    }
    let gold = this.state['gold'] - 2;
    this.setState ({
      gold: gold
    });
    this.rerollAll();
  }

  rerollAll() {
    let myStore = [];
    for(let i = 0; i < 5; i++) {
      let champRolled = this.reroll(this.state.level);
      myStore.push({
        name: champRolled['name'],
        cost: champRolled['cost'],
        traits: champRolled['traits']
      });
    }
    this.setState ({
      store: myStore
    });
  }

  reroll(level) {
    let randCost = Math.floor(Math.random() * 100);
    let costRolled;
    if(randCost === 0) {
      costRolled = 1;
    }
    else {
      var i = 0;
      for(let runningPercentage = 0; randCost > runningPercentage; i++) {
        runningPercentage += Constants.REROLL_ODDS[level][i];
      }
      costRolled = i;
    }
    let randChamp = Math.floor(Math.random() * Constants.championPool[costRolled].length);
    let rolledChamp = Constants.championPool[costRolled][randChamp];
    Constants.championPool[costRolled].splice(randChamp, 1);
    return rolledChamp;
  }

  buyChamp(i) {
    let myStore = this.state.store.slice();
    let myGold = this.state.gold;
    const champCost = myStore[i]['cost'];
    if(myGold < champCost) {
      return;
    }
    myGold -= champCost;
    myStore[i] = {
      name: "",
      cost: 0,
      traits: []
    };
    this.setState ({
      store: myStore,
      gold: myGold
    });
  }

  render() {
    const level = this.state['level'];
    const xp_text = (level === 9) ? "Max" : this.state['xp'] + "/" + Constants.XP_THRESH[level];
    return (
      <div className="shop">

        <RerollOdds level={this.state['level']}/>

        <div className="display-bar">
          <img className="left-ui-corner" src={images['left-ui-corner.png']}/>
          <h2 className="level d-inline lrg-font">Lvl.{this.state['level']}</h2>
          <h5 className="exp d-inline med-font">{xp_text}</h5>

          <img className="gold-background" src={images['gold-background.png']}/>
          <div className="gold d-inline"><img className="d-inline gold-icon-lrg" src={images['gold.png']}/>{this.state['gold']}</div>
        </div>



        <div>
          <div className="shop-tile">
            <div><BuyXPButton onClick={() => this.buyXPClicked()}/></div>
            <div><RefreshButton onClick={() => this.refreshClicked()}/></div>
          </div>
          <ChampionTile champion={this.state['store'][0]} onClick={() => this.buyChamp(0)}/>
          <ChampionTile champion={this.state['store'][1]} onClick={() => this.buyChamp(1)}/>
          <ChampionTile champion={this.state['store'][2]} onClick={() => this.buyChamp(2)}/>
          <ChampionTile champion={this.state['store'][3]} onClick={() => this.buyChamp(3)}/>
          <ChampionTile champion={this.state['store'][4]} onClick={() => this.buyChamp(4)}/>
        </div>

      </div>
    )
  }
}

function ChampionStageTile(props) {
  return(
    <img className="champ-stage-tile" src={images['renders/malphite.png']} />
  );
}

class ChampionStage extends React.Component {
  render() {
    const champions = [];
    for(let i = 0; i < 10; i++) {
      champions.push(<ChampionStageTile key={i}/>);
    }
    return (
      <div className="champ-stage">
        {champions}
      </div>
    );
  }
}

class Board extends React.Component {

  render() {
    return (
      <div>
        <ChampionStage />
        <Shop />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
