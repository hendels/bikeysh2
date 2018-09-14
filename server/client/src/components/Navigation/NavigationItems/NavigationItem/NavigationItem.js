import React from 'react';
import classes from './NavigationItem.css';
import MenuItem from '@material-ui/core/MenuItem';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a href={props.link}>
            {props.children}
        </a>
    </li>
)

export default navigationItem;