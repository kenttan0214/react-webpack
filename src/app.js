import React from 'react';
import { hot } from 'react-hot-loader';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

const compiledRoutes = routes();

const ColdRouter = () => (
  <Router routes={compiledRoutes} history={hashHistory}/>
);

const HotRouter = hot(module)(ColdRouter);

const App = (props) => {
  const { hotReload } = props;
  return (
    <div>
      { hotReload ? <HotRouter /> : <ColdRouter/>}
    </div>
  );
};

export default App;
