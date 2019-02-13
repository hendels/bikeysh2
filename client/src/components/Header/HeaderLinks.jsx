/*eslint-disable*/
import React from "react";
import axios from "axios";
// react components for routing our app without refresh
import { Link , withRouter} from "react-router-dom";

// @mui
import withStyles from "@material-ui/core/styles/withStyles";
import {ListItem, List, IconButton, Input, InputAdornment, InputLabel, FormControl, Tooltip, Button} from "@material-ui/core";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Apps, Search, Stars, FavoriteBorder, LibraryAdd, AccountCircle, AccountBox } from "@material-ui/icons";

// app components
import Dropdown from "../Dropdown/Dropdown.jsx";
//styles
import headerLinksStyle from "../../styles/components/Header/headerLinksStyle";
import {themeInputLabel, themeInput, themeToolTip} from "../../styles/components/Header/headerLinksStyle";

const searchLimit = 4;

class HeaderLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      changedHeaderColor: false,
      tabletView: this.getPageMeasures(window.outerWidth, window.outerHeight).tabletView,
      mobileView: this.getPageMeasures(window.outerWidth, window.outerHeight).mobileView,
    }
    this.handleKeyUpEnter = this.handleKeyUpEnter.bind(this);
    this.handleClickSearchIcon = this.handleClickSearchIcon.bind(this);
  }
  onResize = (e) => {
    const resizeObj = this.getPageMeasures(e.target.outerWidth, e.target.outerHeight);
    if (this.state.tabletView !== resizeObj.tabletView){
      this.setState({
          tabletView: resizeObj.tabletView,
          mobileView: resizeObj.mobileView,
      }, ()=> {});
  }};
  getPageMeasures = (width, height) => {
    let currentWidth = width;
    let currentHeight = height;
    let resizeObj = {};
    if (currentWidth <= 425){
      resizeObj = {
          tabletView: false,
          mobileView: true,
      }
  };
    if (currentWidth <= 1000 && currentWidth > 425){
        resizeObj = {
            tabletView: true,
            mobileView: false,
        }
    };
    if (currentWidth <= 1920 && currentWidth > 1000){
        resizeObj = {
            tabletView: false,
            mobileView: false,
        }
    }; 
    if (currentWidth > 1920){
        resizeObj = {
            tabletView: false,
            mobileView: false,
        }
    };
    return resizeObj;
  }
  handleSearchText = ({target}) => {
    this.props.searchText(target.value, searchLimit);
  };
  handleKeyUpEnter(event){
    
    if(event.keyCode === 13 && this.props.showSearchResults && !this.props.openMobileDrawer){
      this.props.collectAllResults();
      this.props.toggleMobileDrawer(false);
      this.props.history.push('/offers/searchresult');

      window.scrollTo(0, 0);
    };
    if(event.keyCode === 13 && !this.props.showSearchResults && !this.props.openMobileDrawer){
      this.props.searchText(event.target.value, searchLimit);
    };
    if(event.keyCode === 13 && this.props.openMobileDrawer){
      this.props.collectAllResults();
      this.props.toggleMobileDrawer(false);
      this.props.history.push('/offers/searchresult');

      window.scrollTo(0, 0);
    }
  };
  async handleClickSearchIcon(){
      const result = await this.props.collectAllResults();
      if (result){
        this.props.toggleMobileDrawer(false);
        this.props.history.push('/offers/searchresult');
      } else
        alert(`Nothing found.`)
  }
  handleMoveBetweenRoutes(action){
    this.handleClickDropdownLink(action);

    if (this.state.mobileView)
      this.props.toggleMobileDrawer(false);

    window.scrollTo(0, 0);
  }
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
  
  const { classes } = this.props;
  const {mobileView, tabletView} = this.state;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItemSearch}>
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
                  <Search onClick={this.handleClickSearchIcon}/>
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
                    this.props.toggleMobileDrawer(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Stars />
                  {mobileView ? "Best Offers" : null}
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
          }}
          hoverColor="black"
          buttonIcon={Apps}
          showSearchResults={this.props.showSearchResults}
          closeSearchResults={this.props.closeSearchResults}
          dropdownList={[
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('clearFilters')}} 
              to="/category/cranks" 
              className={classes.dropdownLink}
            >
              Cranks
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('clearFilters')}}  
              to="/category/hubs" 
              className={classes.dropdownLink}
            >
              Hubs
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('clearFilters')}} 
              to="/category/dhframes" 
              className={classes.dropdownLink}
            >
              DH Frames
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('clearFilters')}} 
              to="/category/enduroframes" 
              className={classes.dropdownLink}
            >
              Enduro Frames
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('clearFilters')}} 
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
          buttonText={tabletView && !mobileView ? "" : "Favorites"}
          buttonProps={{
            className: classes.navLink,
          }}
          hoverColor="black"
          buttonIcon={FavoriteBorder}
          dropdownList={[
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('favorites')}} 
              to="/category/cranks" 
              className={classes.dropdownLink}
            >
              Favorite Cranks
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('favorites')}} 
              to="/category/hubs" 
              className={classes.dropdownLink}
            >
              Favorite Hubs
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('favorites')}} 
              to="/category/dhframes" 
              className={classes.dropdownLink}
            >
              Favorite DH Frames
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('favorites')}} 
              to="/category/enduroframes" 
              className={classes.dropdownLink}
            >
              Favorite Enduro Frames
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('favorites')}} 
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
          buttonText={tabletView && !mobileView ? "" : "Without tags"}
          buttonProps={{
            className: classes.navLink,
          }}
          hoverColor="black"
          buttonIcon={LibraryAdd}
          dropdownList={[
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('withoutTags')}} 
              to="/category/cranks" 
              className={classes.dropdownLink}
            >
              Cranks Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('withoutTags')}} 
              to="/category/hubs" 
              className={classes.dropdownLink}
            >
              Hubs Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('withoutTags')}} 
              to="/category/dhframes" 
              className={classes.dropdownLink}
            >
              DH Frames Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('withoutTags')}} 
              to="/category/enduroframes" 
              className={classes.dropdownLink}
            >
              Enduro Frames Without Tags
            </Link>,
            <Link 
              onClick={() => {this.handleMoveBetweenRoutes('withoutTags')}} 
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
                {mobileView ? "Logout" : null}
              </IconButton>
            
          </Tooltip>
        </MuiThemeProvider>
      </ListItem>
    </List>

  );
  }
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
