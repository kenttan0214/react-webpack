import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './login.css';

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
            <div className={styles.textColor}>
              This is login component! {this.props.name}
            </div>
        );
    }
}
