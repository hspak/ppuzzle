import React from 'react';
import {Link} from 'react-router';

export default class extends React.Component {
  render() {
    return (
      <div>
        <p>About Page</p>
        <Link to='/'>Go Back Home</Link>
      </div>
    );
  }
}
