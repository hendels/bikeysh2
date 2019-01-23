import React, {Component} from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class NavigationItems extends Component{
    state = {
        anchorEl: null,
      };
    handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
    this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;
        return (
            <div>
            <Button 
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}>
                Bikemarkt
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
            <MenuItem onClick={this.handleClose}><a href="/category/cranks">Cranks</a></MenuItem>
            <MenuItem onClick={this.handleClose}><a href="/category/hubs">Hubs</a></MenuItem>
            <MenuItem onClick={this.handleClose}><a href="/category/wheels">Wheels</a></MenuItem>
            <MenuItem onClick={this.handleClose}><a href="/category/dhframes">Downhill Frames</a></MenuItem>
            <MenuItem onClick={this.handleClose}><a href="/category/enduroframes">Enduro Frames</a></MenuItem>
            </Menu>
        </div>
        )
    }
    
    // <ul className={classes.NavigationItems}> 
    //     <NavigationItem link="/">Bikemarkt Cranks</NavigationItem>
    //     <NavigationItem>Bikemarkt DhFrames</NavigationItem>
    //     <NavigationItem>Bikemarkt EnduroFrames</NavigationItem>
    //     <NavigationItem>Bikemarkt Hubs</NavigationItem>
    // </ul>
};

export default NavigationItems;