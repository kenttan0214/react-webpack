import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/home';
import Login from './components/login';
import Main from './components/main';

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
