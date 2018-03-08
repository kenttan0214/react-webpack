import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

const compiledRoutes = routes();

const ColdRouter = () => (
    <Router history={hashHistory} routes={compiledRoutes}/>
);

const HotRouter = hot(module)(ColdRouter);

const App = (props) => { // eslint-disable-line react/no-multi-comp
    const { hotReload } = props;
    return (
        <div>
            { hotReload ? <HotRouter /> : <ColdRouter/>}
        </div>
    );
};

App.propTypes = {
    hotReload: PropTypes.bool,
};

export default App;
