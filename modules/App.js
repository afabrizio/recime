import React from 'react';

export default React.createClass({
  render() {
    return (
    <div>
      <div>
        Welcome to Recime!
      </div>
      {this.props.children}
    </div>)
  }
});
