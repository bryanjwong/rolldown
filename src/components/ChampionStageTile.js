import React from "react"
import "../index.css"

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg)$/));

export class ChampionStageTile extends React.Component {
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
