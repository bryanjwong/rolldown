import React from "react"
import "../index.css"

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg)$/));

export class ChampionTile extends React.Component {
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
