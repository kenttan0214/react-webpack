import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        routing: state.routing,
        name: state.name
    };
};

const Login = () => {
    return (
        <div>
          This is login component!
        </div>
    );
};

const LoginContainer = connect(
    mapStateToProps,
    null,
    null
)(Login);

export default LoginContainer;
