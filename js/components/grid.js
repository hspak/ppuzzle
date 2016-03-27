import React from 'react';
import {Container, Row} from '../components/flexbox'
import {connect} from 'react-redux';

class grid extends React.Component {
  render() {
    console.log('render grid');
    const rows = this.props.matrix.map((row, i) => {
      return <Row key={i} row={row} />;
    });

    return (
      <div>
      pos ({this.props.x}, {this.props.y})
      <Container children={rows} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { matrix: state.move.matrix, x: state.move.x, y: state.move.y };
}

export default connect(mapStateToProps, {})(grid)
