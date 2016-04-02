import React from 'react';
import Grid from '../components/grid';
import {connect} from 'react-redux';
import {createBoard} from '../actions/createBoard';

class game extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => { this.props.createBoard() }}>
          Reset Board
        </button>
        <Grid />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {createBoard}
)(game)
