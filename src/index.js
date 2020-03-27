import React from "react"
import ReactDOM from "react-dom"
import $ from "jquery"
import "./index.css"
import * as Constants from "./constants.js"

/* Todos:
    Set keybinds
    Set Gold/Exp
    Grab champs to sell them
    Swap champion places
    View specific odds of rolling a champ
    ADD SOUNDS
*/

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('./images', true, /\.(png|jpe?g|svg)$/));

const REFRESH_KEY = 68;
const BUY_XP_KEY = 65;
const SELL_UNIT_KEY = 69;

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
        <div key={trait} className="sm-font">
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

class App extends React.Component {
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
    let myStage = {};
    for(let i = 0; i < 9; i++) {
      myStage[i] = {
        name: "",
        cost: 0,
        level: 0
      };
    }
    this.state = {
      level: 2,
      xp: 0,
      gold: 999,
      store: myStore,
      stage: myStage,
      stageLength: 0,
      hovered: [],
      dragging: false,
      heldChamp: null
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    switch (e.keyCode) {
      case BUY_XP_KEY:
        this.buyXPClicked()
        break;
      case REFRESH_KEY:
        this.refreshClicked();
        break;
      case SELL_UNIT_KEY:
        let myHovered = this.state.hovered;
        let myStage = this.state.stage;
        for(var i = 0; i < myHovered.length && myStage[myHovered[i]]['name'] === ""; i++) {}
        if(i >= myHovered.length) return;
        this.sellChamp(this.state.hovered[i]);
        myHovered.splice(i, 1);
        this.setState({
          hovered: myHovered
        });
        break;
      default:
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleMouseOver(i) {
    let myHovered = this.state.hovered;
    if(myHovered.includes(i)) return;

    myHovered.push(i);
    this.setState({
      hovered: myHovered
    });
  }

  handleMouseLeave(i) {
    let myHovered = this.state.hovered;
    var index = myHovered.indexOf(i);
    if(index === -1) return;

    myHovered.splice(index, 1);
    this.setState({
        hovered: myHovered
    });
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
    let myStore = this.state['store'];
    for(let i = 0; i < 5; i++) {
      let champName = myStore[i]['name'];
      let champCost = myStore[i]['cost'];
      if(champName != "") {
        Constants.championPool[champCost].push(myStore[i]);
      }
      let champRolled = this.reroll(this.state.level);
      myStore[i] = {
        name: champRolled['name'],
        cost: champRolled['cost'],
        traits: champRolled['traits']
      };
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
    let myStore = this.state['store'].slice();
    let myGold = this.state.gold;
    let myStage = this.state.stage;
    let myStageLength = this.state.stageLength;
    const champName = myStore[i]['name'];
    const champCost = myStore[i]['cost'];

    // If we can buy enough copies to make an upgrade, do so
    if(myStageLength === 9) {
      this.checkForOverflowCombine(i, myStageLength);
      return;
    }
    if(myGold < champCost || champCost === 0) {
      return;
    }
    myGold -= champCost;
    myStageLength++;
    myStore[i] = {
      name: "",
      cost: 0,
      traits: []
    };
    for(let j = 0; j < 9; j++) {
      if(myStage[j]['name'] === "") {
        myStage[j] = {
          name: champName,
          cost: champCost,
          level: 1
        }
        break;
      }
    }
    this.setState ({
      store: myStore,
      gold: myGold,
      stage: myStage,
      stageLength: myStageLength
    });
    this.checkForThree(champName, myStageLength);
  }

  sellChamp(i) {
    let myStage = this.state['stage'];
    let champName = myStage[i]['name'];
    let champCost = myStage[i]['cost'];
    let champLevel = myStage[i]['level'];
    let myGold = this.state['gold'];

    if(champName === "") {
      return
    }
    myGold += Constants.SELL_RATE[champCost][champLevel - 1];
    myStage[i] = {
      name: "",
      cost: 0,
      level: 0
    };
    this.setState({
      gold: myGold,
      stage: myStage,
      stageLength: this.state.stageLength - 1
    });
  }

  checkForThree(champName, myStageLength) {
    let champOccurences = {
      1: [],
      2: [],
      3: [],
    }
    let myStage = this.state['stage'];
    for(let i = 0; i < 9; i++) {
      let champion = myStage[i];
      if(champion['name'] === champName) {
        let champLevel = champion['level'];
        champOccurences[champLevel].push(i);  // log store index where found
        if(champOccurences[champLevel].length === 3) {
          myStageLength -= 2;
          myStage[champOccurences[champLevel][0]]['level']++;
          myStage[champOccurences[champLevel][1]] = {
            name: "",
            cost: 0,
            level: 0
          };
          myStage[champOccurences[champLevel][2]] = {
            name: "",
            cost: 0,
            level: 0
          };
          this.setState({
            stage: myStage,
            stageLength: myStageLength
          });
          this.checkForThree(champName, myStageLength);
        }
      }
    }
  }

  checkForOverflowCombine(i, myStageLength) {
    let myStore = this.state['store'].slice();
    let myGold = this.state.gold;
    let myStage = this.state.stage;
    const champName = myStore[i]['name'];
    const champCost = myStore[i]['cost'];

    let storeCount = 0, stageCount = 0;
    for(let storeChamp of myStore) {
      if(storeChamp['name'] === champName) {
        storeCount++;
      }
    }
    for(let j = 0; j < 9; j++) {
      if(myStage[j]['name'] === champName && myStage[j]['level'] === 1) {
        stageCount++;
      }
    }
    if(stageCount === 0) {
      return
    }
    if((storeCount + stageCount) >= 3) {
      myStore[i] = {
        name: "",
        cost: 0,
        traits: []
      };
      for(let j = 0, k = 1; k < (3 - stageCount) && k < 3; j++) {
        if(myStore[j]['name'] === champName) {
          myStore[j] = {
            name: "",
            cost: 0,
            traits: []
          };
          k++;
        }
      }

      var upgraded = false;
      for(let j = 0; j < 9; j++) {
        if(myStage[j]['name'] === champName && myStage[j]['level'] === 1) {
          if(!upgraded) {
            myStage[j]['level']++;
            upgraded = true;
          }
          else {
            myStage[j]['name'] = "";
            myStageLength -= 1;
          }
        }
      }
      myGold -= champCost * storeCount;
      this.setState ({
        store: myStore,
        gold: myGold,
        stage: myStage,
        stageLength: myStageLength
      });
      this.checkForThree(champName, myStageLength);
    }
  }

  handleSetDown(i) {
    console.log(i);
    if(this.state.heldChamp !== null && i !== this.state.heldChamp) {
      let myStage = this.state.stage;
      let temp = myStage[i];

      myStage[i] = myStage[this.state.heldChamp];
      myStage[this.state.heldChamp] = temp;
      this.setState({
        stage: myStage,
        dragging: false,
        heldChamp: null
      });
      return;
    }
    if(this.state.dragging === false) {
      this.setState({
        dragging: true,
        heldChamp: i
      });
      return;
    }
    let clickedTile = null;
    let myHovered = this.state.hovered;
    for(let element of myHovered) {
      if(element != i)
        clickedTile = element;
    }
    if(clickedTile === null) {
      this.setState({
        dragging: false,
        heldChamp: null
      })
      return;
    }
  }

  render() {
    const level = this.state['level'];
    const xp_text = (level === 9) ? "Max" : this.state['xp'] + "/" + Constants.XP_THRESH[level];
    return (
      <div onKeyDown={this.handleKeyPress}>
        <img className="background" src={images['tft-map-background.jpg']}/>
        <ChampionStage
          stage={this.state['stage']}
          onMouseOver={(i) => this.handleMouseOver(i)}
          onMouseLeave={(i) => this.handleMouseLeave(i)}
          handleSetDown={(i) => this.handleSetDown(i)}
          dragging={this.state.dragging}/>
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
            <ChampionTile champion={this.state['store'][0]} onClick={() => this.checkForThree(this.buyChamp(0))}/>
            <ChampionTile champion={this.state['store'][1]} onClick={() => this.checkForThree(this.buyChamp(1))}/>
            <ChampionTile champion={this.state['store'][2]} onClick={() => this.checkForThree(this.buyChamp(2))}/>
            <ChampionTile champion={this.state['store'][3]} onClick={() => this.checkForThree(this.buyChamp(3))}/>
            <ChampionTile champion={this.state['store'][4]} onClick={() => this.checkForThree(this.buyChamp(4))}/>
          </div>
        </div>
      </div>
    )
  }
}

class ChampionStage extends React.Component {
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

class ChampionStageTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: {
        x: 0,
        y: 0
      },
      rel: {
        x: 0,
        y: 0
      },
      active: false,
    }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.returnToInitialPos = this.returnToInitialPos.bind(this);
  }

  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  componentDidUpdate(props, state) {
    if (this.props.dragging && this.state.active) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.props.dragging && !this.state.active) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  returnToInitialPos() {
    this.setState({
      rel: {
        x: 0,
        y: 0
      },
      pos: {
        x: 0,
        y: 0
      },
      active: false
    });
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(e) {
    // only left mouse button
    if (e.button !== 0) return;

    if(this.state.active || this.props.dragging) {
      this.setState({
        rel: {
          x: 0,
          y: 0
        },
        pos: {
          x: 0,
          y: 0
        },
        active: false
      });
    }
    else {
      this.setState({
        rel: {
          x: e.pageX,
          y: e.pageY
        },
        active: true
      });
    }
    this.props.handleSetDown();
    e.preventDefault();
  }

  onMouseMove(e) {
    if (!this.state.active) {
      this.returnToInitialPos();
      return;
    }
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    if (!this.props.dragging || !this.state.active) {
      this.returnToInitialPos();
      console.log("mouseup");
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    if(!this.props.dragging && this.props.active) this.returnToInitialPos();
    const champion = this.props.champion;
    let iconPath = "icons/" + champion['name'].replace(" ", "").replace("'", "") + ".png";
    let starPath = "star" + champion['level'].toString() + ".png";
    let zIndex = this.state.active ? 1 : 2;

    if(champion['name'] === "") {
      return (<div className="champ-stage-tile"
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        style={{
          zIndex: zIndex
        }}
      >
        <div className="empty-tile"></div>
      </div>);
    }
    return(
      <div className="champ-stage-tile">
        <div
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        style={{
          position: 'absolute',
          left: this.state.pos.x + 'px',
          top: this.state.pos.y + 'px',
          width: '100%',
          zIndex: zIndex
        }}>
          <div className="glow-when-hovered">
            <img className="stage-icon" src={images[iconPath]}
              onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave}/>
          </div>
          <img className="stage-star" src={images[starPath]}
            onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave}/>
        </div>
      </div>

    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
