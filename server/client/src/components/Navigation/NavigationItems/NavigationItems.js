import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem link="/">Bikemarkt Cranks</NavigationItem>
        <NavigationItem>Bikemarkt DhFrames</NavigationItem>
        <NavigationItem>Bikemarkt EnduroFrames</NavigationItem>
        <NavigationItem>Bikemarkt Hubs</NavigationItem>
    </ul>
);

export default navigationItems;