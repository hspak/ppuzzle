import React from 'react';
import {COLOR_EMPTY, COLOR_RED, COLOR_ORANGE, COLOR_YELLOW, COLOR_GREEN, COLOR_BLUE, COLOR_PURPLE} from '../constants';

export class Container extends React.Component {
  static defaultStyle = {
    border: "1"
  };

  render() {
    const style = Object.assign({}, Container.defaultStyle, this.props.style);

    return (
      <div className="container" style={style}>
        {this.props.children}
      </div>
    );
  }
}

export class Row extends React.Component {
  static defaultStyle = {
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "row"
  };

  render() {
    const boxes = this.props.row.map((attr, i) => {
      return <Box key={i} attr={attr} />;
    });
    const style = Object.assign({}, Row.defaultStyle, this.props.style);

    return (
      <div className="row" style={style}>
        {boxes}
      </div>
    );
  }
}

export class Box extends React.Component {
  static defaultStyle = {
    backgroundColor: "red",
    width: "50px",
    height: "50px",
    display: "flex",
    borderStyle: "solid",
    borderColor: "white"
  };

  render() {
    let style = Object.assign({}, Box.defaultStyle, this.props.style);

    console.log(this.props.attr.color);
    switch(this.props.attr.color) {
      case COLOR_EMPTY:
        style = Object.assign({}, style, {backgroundColor: "white"});
        break;
      case COLOR_RED:
        style = Object.assign({}, style, {backgroundColor: "red"});
        break;
      case COLOR_ORANGE:
        style = Object.assign({}, style, {backgroundColor: "orange"});
        break;
      case COLOR_YELLOW:
        style = Object.assign({}, style, {backgroundColor: "yellow"});
        break;
      case COLOR_GREEN:
        style = Object.assign({}, style, {backgroundColor: "green"});
        break;
      case COLOR_BLUE:
        style = Object.assign({}, style, {backgroundColor: "blue"});
        break;
      case COLOR_PURPLE:
        style = Object.assign({}, style, {backgroundColor: "purple"});
        break;
      default:
        style = Object.assign({}, style, {backgroundColor: "black"});
        break;
    }

    if (this.props.attr.selected) {
      style = Object.assign({}, style, {borderColor: "blue"});
    }


    // console.log(JSON.stringify(style));

    return (
      <div className="box" style={style} x={this.props.x} y={this.props.y}></div>
    );
  }
}
