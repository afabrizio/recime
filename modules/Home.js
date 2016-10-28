import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  handleNavigation(event) {
    const path = `/${event.target.textContent}`;
    this.context.router.push(path);
  },

  render() {
    return (
      <div>
        <div>Please Login or Register below.</div>
        <button onClick={(e) => {this.handleNavigation(e)} } >
          Login
        </button>
        <button onClick={(e) => {this.handleNavigation(e)} }>
          Register
        </button>
      </div>
    )
  }
})
