import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import styles from './styles';

const el = document.querySelector('[data-role="app"]');

ReactDOM.render(
    <div className={styles.text}> Testing Without Hot Reloading <App/> </div>,
    el
);
