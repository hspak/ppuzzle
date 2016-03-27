import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {increase, decrease} from '../actions/count';

class reduxDemo extends React.Component {
  render() {
    return (
      <div>
        <p>Some state changes: {this.props.number}</p>
        <button onClick={() => this.props.increase(1)}>Increase</button>
        <button onClick={() => this.props.decrease(1)}>Decrease</button>
        <p><Link to='/'>Go Back Home</Link></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { number: state.count.number };
}

export default connect(
  mapStateToProps,
  {increase, decrease}
)(reduxDemo)
