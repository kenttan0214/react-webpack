import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';

const el = document.querySelector('[data-role="app"]');

ReactDOM.render(
    <div className={styles.text}> Testing with Hot Reloading </div>,
    el
);
