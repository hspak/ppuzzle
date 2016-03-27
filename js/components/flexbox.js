import React from 'react';

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
    console.log('rows', this.props.row);
    const boxes = this.props.row.map((selected, i) => {

      return <Box key={i} selected={selected} />;
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

    if (this.props.selected === 1) {
      style = Object.assign({}, style, {borderColor: "blue"});
    }

    return (
      <div className="box" style={style} x={this.props.x} y={this.props.y}></div>
    );
  }
}
