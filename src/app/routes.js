import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './containers/home';
import Login from './containers/login';
import Main from './containers/main';

function routes () {
    return (
        <Route component={Main} path="/">
            <IndexRoute component={Login} />
            <Route component={Home}
                path="/home"
            />
        </Route>
    );
}

export default routes;
