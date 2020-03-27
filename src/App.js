import React from "react"
import "./index.css"
import * as Constants from "./constants.js"

import { ChampionStage } from "./components/ChampionStage.js"
import { ChampionTile } from "./components/ChampionTile.js"
import { KeybindMenu } from "./components/KeybindMenu.js"
import { BuyXPButton } from "./components/BuyXPButton.js"
import { RefreshButton } from "./components/RefreshButton.js"
import { RerollOdds } from "./components/RerollOdds.js"
import { SellChampButton } from "./components/SellChampButton.js"
import { KeybindButton } from "./components/KeybindButton.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('./images', true, /\.(png|jpe?g|svg)$/));

/* Todos:
    View specific odds of rolling a champ
    ADD SOUNDS
*/

export default class App extends React.Component {
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
      gold: 50,
      store: myStore,
      stage: myStage,
      stageLength: 0,
      hovered: [],
      dragging: false,
      heldChamp: null,
      keybindMenuHidden: true
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleGoldInput = this.handleGoldInput.bind(this);
    this.handleLvlInput = this.handleLvlInput.bind(this);
  }

  //==Keyboard Input Handling==//

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    switch (e.keyCode) {
      case Constants.KEYBINDS[0][0]:
        this.buyXPClicked()
        break;
      case Constants.KEYBINDS[1][0]:
        this.refreshClicked();
        break;
      case Constants.KEYBINDS[2][0]:
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

  //==Stage Champion Handling==//

  handleChampMouseOver(i) {
    let myHovered = this.state.hovered;
    if(myHovered.includes(i)) return;

    myHovered.push(i);
    this.setState({
      hovered: myHovered
    });
  }

  handleChampMouseLeave(i) {
    let myHovered = this.state.hovered;
    var index = myHovered.indexOf(i);
    if(index === -1) return;

    myHovered.splice(index, 1);
    this.setState({
        hovered: myHovered
    });
  }

  handleChampClick(i) {
    let myStage = this.state.stage;
    if(this.state.heldChamp !== null && i !== this.state.heldChamp) {
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
      if(myStage[i]['name'] === "") return;
      this.setState({
        dragging: true,
        heldChamp: i
      });
      return;
    }
    let clickedTile = null;
    let myHovered = this.state.hovered;
    for(let element of myHovered) {
      if(element !== i)
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

  //==User Numerical Input Handling==//

  handleGoldInput(e) {
    let goldValue = e.target.value > -1 ? e.target.value : 0;
    goldValue = goldValue < 1000 ? goldValue : 999;
    this.setState({
      gold: goldValue
    });
  }

  handleLvlInput(e) {
    if(!e.target.value) return;
    let levelValue = (e.target.value >= 2) ? e.target.value : 2;
    levelValue = (levelValue < 10) ? levelValue : 9;
    this.setState({
      level: levelValue,
      xp: 0
    });
  }

  //==Button Click Handling==//

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

  //==Helper Functions==//

  // Reroll all shop elements
  rerollAll() {
    let myStore = this.state['store'];
    for(let i = 0; i < 5; i++) {
      let champName = myStore[i]['name'];
      let champCost = myStore[i]['cost'];
      if(champName !== "") {
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

  // Roll a champion based on level and pool
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

  // Buy a champion from the store
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

  // Sell a staged champion
  sellChamp(i) {
    let myStage = this.state['stage'];
    let champName = myStage[i]['name'];
    let champCost = myStage[i]['cost'];
    let champLevel = myStage[i]['level'];
    let myGold = this.state['gold'];
    let myHeldChamp = this.state['heldChamp'];
    let myDragging = this.state['dragging'];

    if(champName === "") {
      return;
    }
    if(i === myHeldChamp) {
      myDragging = false;
      myHeldChamp = null;
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
      stageLength: this.state.stageLength - 1,
      heldChamp: myHeldChamp,
      dragging: myDragging
    });

  }

  // Check if an upgrade is possible
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

  // Check if an upgrade is possible, given the board is full
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
      return;
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
      if(myGold < champCost * storeCount) return;
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

  render() {
    const level = this.state['level'];
    const xp_text = (level === 9) ? "Max" : this.state['xp'] + "/" + Constants.XP_THRESH[level];
    const heldChamp = this.state.stage[this.state.heldChamp];
    const sellCost = (heldChamp && heldChamp['name'] !== "") ? Constants.SELL_RATE[heldChamp['cost']][heldChamp['level'] - 1] : 0;
    return (
      <div onKeyDown={this.handleKeyPress}>
        <img className="background" src={images['tft-map-background.jpg']}/>
        <div className="title" >
          <a href="/rolldown/index.html">
            rolldown.gg
            <FontAwesomeIcon icon={faDice} className="logo"/>
          </a>
        </div>
        <KeybindButton onClick={() => {
          this.setState({
            keybindMenuHidden: !this.state.keybindMenuHidden
          });
        }}/>
        <a href="https://github.com/bryanjwong/rolldown" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="github-link clickable"/>
        </a>
        <ChampionStage
          stage={this.state['stage']}
          onMouseOver={(i) => this.handleChampMouseOver(i)}
          onMouseLeave={(i) => this.handleChampMouseLeave(i)}
          handleSetDown={(i) => this.handleChampClick(i)}
          dragging={this.state.dragging}/>
        <div className="shop">
          <RerollOdds level={this.state['level']}/>
          <div className="display-bar">
            <img className="left-ui-corner" src={images['left-ui-corner.png']}/>
            <h2 className="level d-inline lrg-font">Lvl.
              <input type="number" className="level-input"
                value={this.state['level']}
                onChange={this.handleLvlInput}
                onClick={(e) => {e.target.value = null}}/>
            </h2>
            <h5 className="exp d-inline med-font">{xp_text}</h5>
            <img className="gold-background" src={images['gold-background.png']}/>
            <div className="gold d-inline">
              <img className="d-inline gold-icon-lrg" src={images['gold.png']}/>
              <input type="number" className="gold-input"
                value={this.state['gold']} onChange={this.handleGoldInput}/>
            </div>
          </div>
          <div>
            <div className="shop-tile">
              <div><BuyXPButton onClick={() => this.buyXPClicked()} gold={this.state.gold}/></div>
              <div><RefreshButton onClick={() => this.refreshClicked()} gold={this.state.gold}/></div>
            </div>
            <ChampionTile champion={this.state['store'][0]} onClick={() => this.checkForThree(this.buyChamp(0))}/>
            <ChampionTile champion={this.state['store'][1]} onClick={() => this.checkForThree(this.buyChamp(1))}/>
            <ChampionTile champion={this.state['store'][2]} onClick={() => this.checkForThree(this.buyChamp(2))}/>
            <ChampionTile champion={this.state['store'][3]} onClick={() => this.checkForThree(this.buyChamp(3))}/>
            <ChampionTile champion={this.state['store'][4]} onClick={() => this.checkForThree(this.buyChamp(4))}/>
          </div>
          <SellChampButton
            onClick={() => this.sellChamp(this.state.heldChamp)}
            sellCost={sellCost}/>
          <KeybindMenu
            hidden={this.state.keybindMenuHidden}/>
        </div>
      </div>
    )
  }
}
