import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import People from '@material-ui/icons/People';
const toolbar = (props) => {
    return(
    <header className={classes.Toolbar}>
        <div>
            <People/>
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </header>)
};

export default toolbar;