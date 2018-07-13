import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems'
const toolbar = (props) => {
    return(
    <header className={classes.Toolbar}>
        <div>
            siema
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </header>)
};

export default toolbar;