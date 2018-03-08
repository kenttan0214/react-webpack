import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Main extends Component {
    static propTypes = {
        children: PropTypes.node
    };

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
