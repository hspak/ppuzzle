import React from 'react';
import {Link} from 'react-router';

export default class extends React.Component {
  render() {
    return (
      <div>
        <p>This is the homepage.</p>
        <p><Link to='/about'>Go to About</Link></p>
        <Link to='/game'>Go to Game</Link>
      </div>
    );
  }
}
