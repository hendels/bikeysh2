import React from "react";
import {Link, withRouter} from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Grow from "@material-ui/core/Grow";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import headerStyle from "../../styles/components/headerStyle.jsx";
// app components
import Aux from '../../hoc/Ax/Ax';
import { Chip } from "@material-ui/core";

const themeListItem = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        backgroundColor: "#21262b",
        transition: "all 150ms linear",
        
        margin: "0px 0px 0px 0px",
        position: "relative",
        fontSize: "13px",
        borderBottom: "1px solid #091528",
      },
      button: {
        "&:hover": {
          boxShadow:
          "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
          backgroundColor: "#343c44",
          color: "#fff",
          outline: "none",
        },
      },
    },
    MuiListItemText: {
      primary: {
        color: '#fff',
        "&:hover,&:focus": {
          color: "#fff"
        }
      },
      secondary: {
        fontSize: "4px",
        color: '#fff',
        "&:hover,&:focus": {
          color: "#fff"
        }
      },
    },
    MuiChip: {
      root: {
        backgroundColor: `rgba(201, 101, 103, 0.3)`,
        color: "pink",
        borderRadius: "2px",
        fontSize: "10px",
        height: "20px",
      },

    },
  },
});
const themeListItemText = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        color: '#fff',
        "&:hover,&:focus": {
          // color: "#fff"
        }
      },
      secondary: {
        fontSize: "4px",
        color: '#fff',
        "&:hover,&:focus": {
        }
      },
    },
    
  },
});
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
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
    this.setState({ mobileOpen: !this.state.mobileOpen });
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
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
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
    console.log(_id, category);
    this.props.getSingleRecord(_id, category);
    window.scrollTo(0, 0);
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
              // <Logo name={brand} color={color}/>
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
              open={this.state.mobileOpen}
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
      {this.state.showSearchResults ? 
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
      {this.state.showNothingFound ? 
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
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
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
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
      `bikeysh1`,
      `bikeysh2`,
      `bikeysh3`,
      `bikeysh3_1`,
      `bikeysh5`,
    ]).isRequired
  })
}; 

export default withStyles(headerStyle)(withRouter(Header));
