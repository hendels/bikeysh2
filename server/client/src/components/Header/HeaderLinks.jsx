/*eslint-disable*/
import React from "react";
import axios from "axios";
// react components for routing our app without refresh
import { Link , withRouter} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import red from '@material-ui/core/colors/red'
// @material-ui/icons
import { Apps, Search, Stars, Settings, FavoriteBorder, LibraryAdd } from "@material-ui/icons";

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
      changedHeaderColor: false
    }
    this.handleKeyUpEnter = this.handleKeyUpEnter.bind(this);
  }
  handleSearchText = ({target}) => {
    console.log(target.value);
    this.props.searchText(target.value, searchLimit);
  }
  handleKeyUpEnter(event) {
    
    if(event.keyCode === 13 && this.props.showSearchResults){
      this.props.collectAllResults();
      this.props.history.push('/offers/searchresult');
      window.scrollTo(0, 0);
    }
    if(event.keyCode === 13 && !this.props.showSearchResults){
      this.props.searchText(event.target.value, searchLimit);
    }
  }
  // handleFavorites = () => {
  //   this.props.showFavorites(true);
  // }
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
      
  }
  componentWillReceiveProps(nextProps){

    // console.log(`received color change = ${nextProps.changeColor} current state = ${this.state.changedHeaderColor}`);
    // if (this.state.changedHeaderColor !== nextProps.changedHeaderColor)
      // this.setState({changedHeaderColor: nextProps.changeColor}, () => {});
  }
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
        <FormControl className={classes.margin}>
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
              // classes={{ tooltip: classes.tooltip }}
            >
              {/* <Link to="/home"> */}
                <IconButton
                  // component={Link} to="/home"
                  className={classes.navLink}
                  onClick={()=>{
                    this.props.history.push('/home');
                    window.scrollTo(0, 0);
                  }}
                >
                  
      {/* window.scrollTo(0, 0); */}
                  {/* <Stars style={{color: "#000"}}/> */}
                  <Stars />
                </IconButton>

              {/* </Link> */}
              
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
          buttonText="Favorites"
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
          buttonText="Without tags"
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
    </List>

  );
  }
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
