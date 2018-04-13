import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
    (state, ownProps) => {
        return {
            ...ownProps,
            routing: state.routing,
            name: state.name
        };
    },
    null,
    null
)

export default class Login extends Component {
    render () {
        return (
            <div>
              This is login component! {this.props.name}
            </div>
        );
    }
}
