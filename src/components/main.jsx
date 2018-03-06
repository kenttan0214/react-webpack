import React, { Component } from 'react';

class Main extends Component {
  render () {
    return (
      <div>
        This is main container 1
        {this.props.children}
      </div>
    );
  }
}

export default Main;
