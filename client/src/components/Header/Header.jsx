import React from "react";
import {Link, withRouter} from 'react-router-dom';

import classNames from "classnames";
import PropTypes from "prop-types";
// @mui
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Button, Hidden, Drawer, List, ListItem, ListItemText, Grow} from "@material-ui/core";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// app components
import Aux from '../../hoc/Ax/Ax';
import { Chip } from "@material-ui/core";
// styles 
import headerStyle from "../../styles/components/Header/headerStyle";
import {themeListItem, themeListItemText} from "../../styles/components/Header/headerStyle";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchResults: false,
      showNothingFound: false,
      changeHeaderColor: true,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleShowAllResults = this.handleShowAllResults.bind(this);
  }
  handleDrawerToggle() {
    this.props.toggleMobileDrawer(!this.props.openMobileDrawer)
  }
  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
          .getElementsByTagName("header")[0]
          .classList.remove(classes[color]);
        document.body
          .getElementsByTagName("header")[0]
          .classList.add(classes[changeColorOnScroll.color]);
      } else {
        document.body
          .getElementsByTagName("header")[0]
          .classList.add(classes[color]);
        document.body
            .getElementsByTagName("header")[0]
            .classList.remove(classes[changeColorOnScroll.color]);
    }
  }
  handleSearchClose() {
    this.props.closeSearchResults();
  }
  handleShowAllResults() {
    this.props.collectAllResults();
    this.props.history.push(`/offers/searchresult`);
    window.scrollTo(0, 0);
  }
  handleShowSingleRecord(_id, category){
    this.props.getSingleRecord(_id, category);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showSearchResults: nextProps.showSearchResults,
      showNothingFound: nextProps.showNothingFound,
      changeHeaderColor: nextProps.changeHeaderColor,
    }, () => {});
  }
  
  componentDidMount() {
    if (!this.props.changeHeaderColor){

    };
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    };
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }
  render() {
    const {
      classes,
      color,
      rightLinks,
      leftLinks,
      brand,
      fixed,
      absolute
    } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });
    const brandComponent = <Button className={classes.title}>{brand}</Button>;
    //<<SEARCH RESULTS
    let searchItems = null;
    if (this.props.searchResults.length > 0){
      searchItems =  this.props.searchResults.map(item => {
        return (
        <Grow
          in={true}
          id="menu-list"
          style={
            false
              ? { transformOrigin: "0 100% 0" }
              : { transformOrigin: "0 0 0" }
          }
        >
          <div style={{transition: "all 150ms linear"}}> 
          <MuiThemeProvider theme={themeListItem}>
            <ListItem
              button
              key={item._id}
              component={Link} 
              to={`/offers/searchresult`}
              onClick={() => this.handleShowSingleRecord(item._id, item.category)}  
            >
              <Chip label={item.category}></Chip>
              <ListItemText                
                primary={`${item.publishDate} - ${item.title}`}
              />
            </ListItem>
          </MuiThemeProvider>
          </div>
        </Grow>
        )
      })
    }
    //>>
    return (
      <Aux>
      <AppBar className={appBarClasses} square={true}>
        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
            {leftLinks !== undefined ? (
              <Hidden smDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              <Button 
                  className={classes.title}
                  component={Link} to={this.props.loggedIn ? '/' : '/login'} 
                  mini={true} 
                  variant={`text`} 
                  style={{ color: color}}
                  onClick={()=>{window.scrollTo(0, 0);}}
              >
                  {brand}
              </Button>
            )}
          </div>
          <Hidden smDown implementation="css">
            
            {!this.props.loginPageOpened && this.props.loggedIn ? rightLinks : null}
          </Hidden>
          <Hidden mdUp>
            {!this.props.loginPageOpened && this.props.loggedIn ? 
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            : null}
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          {!this.props.loginPageOpened && this.props.loggedIn ? 
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={this.props.openMobileDrawer}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
            >
              <div className={classes.appResponsive}>
                {leftLinks}
                {rightLinks}
              </div>
            </Drawer>
          : null}    
        </Hidden>
      </AppBar>
      <List dense={true}>
      {this.state.showSearchResults && !this.props.openMobileDrawer? 
      (<div className={classes.searchResults} onMouseLeave={this.handleSearchClose}>
        <div>
          {searchItems}
          <ListItem 
            className={classes.searchShowaAllItem} 
            button 
            onClick={this.handleShowAllResults}
            >
            <MuiThemeProvider theme={themeListItemText}>
              <ListItemText
                primary={`Show all results...`}
              />
            </MuiThemeProvider>
          </ListItem>
        </div>
      </div>) : null
      }
      {this.state.showNothingFound && !this.props.openMobileDrawer ? 
        (<div className={classes.searchNoResults} onMouseLeave={this.handleSearchClose}>
        <ListItem className={classes.searchShowaAllItem}>
          <MuiThemeProvider theme={themeListItemText}>
            <ListItemText
              secondary={`nothing found...`}
            />
          </MuiThemeProvider>
        </ListItem> 
        </div>) : null
      }
      </List>
    </Aux>
    );
  }
}
Header.defaultProp = {
  color: "bikeysh3_1"
};
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    `bikeysh1`,
    `bikeysh2`,
    `bikeysh3`,
    `bikeysh3_1`,
    `bikeysh5`,
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      `bikeysh1`,
      `bikeysh2`,
      `bikeysh3`,
      `bikeysh3_1`,
      `bikeysh5`,
    ]).isRequired
  })
}; 

export default withStyles(headerStyle)(withRouter(Header));
