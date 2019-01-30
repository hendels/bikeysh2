/*eslint-disable*/
import React from "react";
import axios from "axios";
// react components for routing our app without refresh
import { Link , withRouter} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {ListItem, List, IconButton, Input, InputAdornment, InputLabel, FormControl, Tooltip, Button} from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// @material-ui/icons
import { Apps, Search, Stars, Settings, FavoriteBorder, LibraryAdd, AccountCircle, AccountBox } from "@material-ui/icons";

// core components
import Dropdown from "../Dropdown/Dropdown.jsx";

import headerLinksStyle from "../../styles/components/headerLinksStyle.jsx";
// import style from "../../styles/components/offerListStyle.jsx";
const colors = {
  bikeyshColor2: `#644E5B`,
  bikeyshColor7: `#000`,
  bikeyshColor4: `#ffc4c5`,

}
const searchLimit = 4;


class HeaderLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      changedHeaderColor: false,
      tabletView: this.getPageMeasures(window.outerWidth, window.outerHeight).tabletView,
    }
    this.handleKeyUpEnter = this.handleKeyUpEnter.bind(this);
  }
  onResize = (e) => {
    const resizeObj = this.getPageMeasures(e.target.outerWidth, e.target.outerHeight);
    if (this.state.tabletView !== resizeObj.tabletView){
      this.setState({
          tabletView: resizeObj.tabletView,
      }, ()=> {});
  }};
  getPageMeasures = (width, height) => {
    let currentWidth = width;
    let currentHeight = height;
    let resizeObj = {};
    
    if (currentWidth <= 1000){
        resizeObj = {
            tabletView: true,
        }
    } 
    if (currentWidth <= 1920 && currentWidth > 1000){
        resizeObj = {
            tabletView: false,
        }
    } 
    if (currentWidth > 1920){
        resizeObj = {
            tabletView: false,
        }
    }
    return resizeObj;
  }
  handleSearchText = ({target}) => {
    this.props.searchText(target.value, searchLimit);
  };
  handleKeyUpEnter(event){
    
    if(event.keyCode === 13 && this.props.showSearchResults){
      this.props.collectAllResults();
      this.props.history.push('/offers/searchresult');
      window.scrollTo(0, 0);
    }
    if(event.keyCode === 13 && !this.props.showSearchResults){
      this.props.searchText(event.target.value, searchLimit);
    }
  };
  handleClickDropdownLink = (action) => {
    
    switch(action){
      case 'clearFilters':
        this.props.clearFilters();
        break;
      case 'favorites':
        this.props.showFavorites(true);
        break;
      case 'withoutTags':
        this.props.showWithoutTags(true);
      break;
      default:
      
      break;
      
    }
    this.props.showSearchResults ? this.props.closeSearchResults() : null;
      
  };

  componentWillMount() {
    window.addEventListener("resize", this.onResize);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  };
  render() {

  const themeInputLabel = createMuiTheme({
    overrides: {
      MuiInputLabel: {
        formControl:{
          color: colors.bikeyshColor2,
        },
      },
    },
  });
  const themeInput = createMuiTheme({
    overrides: {
      MuiInput: {
        root:{
          color: this.state.changedHeaderColor ? "#fff" : colors.bikeyshColor4
        },
        underline:{
          '&:before': {
            borderBottom:`1px solid ${colors.bikeyshColor2}`,
            
          },
          '&:after': {
            borderBottom:`1px solid ${colors.bikeyshColor2}`,
          },
        },
      },
      MuiButton: {
        root: {
          height: "50px"
        }
      }
    }
  });
  const themeToolTip = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip:{
          boxShadow:
          "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
          backgroundColor: "#343c44",
          color: "#fff",
          fontSize: "13px",
        }
      }
    }
  });
  const { classes } = this.props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {/* << SEARCH INPUT*/}
        <FormControl>
        <MuiThemeProvider theme={themeInputLabel}>
          <InputLabel focused={false} >Search</InputLabel>
        </MuiThemeProvider>
        <MuiThemeProvider theme={themeInput}>
          <Input
            disableUnderline={false}
            id="input-with-icon-adornment"
            endAdornment={
              <InputAdornment position="start" className={classes.inputSearchBox}>
                  <Search />
              </InputAdornment>
            }
            onChange={this.handleSearchText}
            onKeyUp={this.handleKeyUpEnter}
          />
        </MuiThemeProvider>
        </FormControl>
        {/* >> */}
      </ListItem>
      <ListItem className={classes.listItem}>
          <MuiThemeProvider theme={themeToolTip}>
            <Tooltip
              id="instagram-tooltip"
              title="Best Offers"
              placement={window.innerWidth > 959 ? "top" : "left"}
            >
                <IconButton
                  disableRipple={true}
                  className={classes.navLink}
                  onClick={()=>{
                    this.props.history.push('/bestoffers');
                    window.scrollTo(0, 0);
                  }}
                >
                  <Stars />
                </IconButton>
            </Tooltip>
          </MuiThemeProvider>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Dropdown
          noLiPadding
          buttonText="Bikemarkt"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          hoverColor="black"
          buttonIcon={Apps}
          showSearchResults={this.props.showSearchResults}
          closeSearchResults={this.props.closeSearchResults}
          dropdownList={[
            <Link 
              onClick={() => {this.handleClickDropdownLink('clearFilters')}} 
              to="/category/cranks" 
              className={classes.dropdownLink}
            >
              Cranks
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('clearFilters')}}  
              to="/category/hubs" 
              className={classes.dropdownLink}
            >
              Hubs
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('clearFilters')}} 
              to="/category/dhframes" 
              className={classes.dropdownLink}
            >
              DH Frames
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('clearFilters')}} 
              to="/category/enduroframes" 
              className={classes.dropdownLink}
            >
              Enduro Frames
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('clearFilters')}} 
              to="/category/wheels" 
              className={classes.dropdownLink}
            >
              Wheels
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Dropdown
          noLiPadding
          buttonText={this.state.tabletView ? "" : "Favorites"}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          hoverColor="black"
          buttonIcon={FavoriteBorder}
          dropdownList={[
            <Link 
              onClick={() => {this.handleClickDropdownLink('favorites')}} 
              to="/category/cranks" 
              className={classes.dropdownLink}
            >
              Favorite Cranks
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('favorites')}} 
              to="/category/hubs" 
              className={classes.dropdownLink}
            >
              Favorite Hubs
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('favorites')}} 
              to="/category/dhframes" 
              className={classes.dropdownLink}
            >
              Favorite DH Frames
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('favorites')}} 
              to="/category/enduroframes" 
              className={classes.dropdownLink}
            >
              Favorite Enduro Frames
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('favorites')}} 
              to="/category/wheels" 
              className={classes.dropdownLink}
            >
              Favorite Wheels
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Dropdown
          noLiPadding
          buttonText={this.state.tabletView ? "" : "Without tags"}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          hoverColor="black"
          buttonIcon={LibraryAdd}
          dropdownList={[
            <Link 
              onClick={() => {this.handleClickDropdownLink('withoutTags')}} 
              to="/category/cranks" 
              className={classes.dropdownLink}
            >
              Cranks Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('withoutTags')}} 
              to="/category/hubs" 
              className={classes.dropdownLink}
            >
              Hubs Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('withoutTags')}} 
              to="/category/dhframes" 
              className={classes.dropdownLink}
            >
              DH Frames Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('withoutTags')}} 
              to="/category/enduroframes" 
              className={classes.dropdownLink}
            >
              Enduro Frames Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleClickDropdownLink('withoutTags')}} 
              to="/category/wheels" 
              className={classes.dropdownLink}
            >
              Wheels Without Tags
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <MuiThemeProvider theme={themeToolTip}>
          <Tooltip
            id="instagram-tooltip"
            title={`Logout [${this.props.userName}]`}
            placement={window.innerWidth > 959 ? "top" : "left"}
          >
              <IconButton
                disableRipple={true}
                className={classes.navLink}
                onClick={()=>{
                  this.props.handleLoggedIn(false, '');
                  this.props.history.push('/login');
                  window.scrollTo(0, 0);
                }}
              >
                
                <AccountCircle/>
              </IconButton>
            
          </Tooltip>
        </MuiThemeProvider>
      </ListItem>
    </List>

  );
  }
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
