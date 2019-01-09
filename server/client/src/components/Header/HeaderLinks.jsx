/*eslint-disable*/
import React from "react";
import axios from "axios";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

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
import green from '@material-ui/core/colors/green'
// @material-ui/icons
import { Apps, Search, Stars, Settings } from "@material-ui/icons";

// core components
import Dropdown from "../Dropdown/Dropdown.jsx";
import Button from '@material-ui/core/Button/Button';

import headerLinksStyle from "../../styles/components/headerLinksStyle.jsx";
import style from "../../styles/components/offerListStyle.jsx";

const searchLimit = 4;
const themeInputLabel = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      formControl:{
        color: "#fff",
      },
    },
  },
});
const themeInput = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor:'lightgrey',
      },
      formControl: {
        // margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        // marginTop: theme.spacing.unit * 2,
      },
      // cssLabel: {
      //   '&$cssFocused': {
      //     color:'red',
      //   },
      // },
      cssFocused: {},
      underline:{
        '&:after': {
          borderBottom:'2px solid red',
          
        },
      },
    },
  },
});
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
class HeaderLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // searchResults: null, 
    }
    this.handleKeyUpEnter = this.handleKeyUpEnter.bind(this);
  }
  handleSearchText = ({target}) => {
    console.log(target.value);
    this.props.searchText(target.value, searchLimit);
  }
  handleKeyUpEnter(event) {
    if(event.keyCode === 13){
      this.props.searchText(event.target.value, searchLimit);
    }
  }

  render() {
  const { classes } = this.props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {/* << SEARCH INPUT*/}
        <FormControl className={classes.margin}>
        <MuiThemeProvider theme={themeInputLabel}>
          <InputLabel focused={false} >Search</InputLabel>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme}>
          <Input
            // disableUnderline={true}
            focused={false}
            // className={classes.inputSearchBox}
            disableUnderline={false}
            // classes={{underline: {color: "#fff"}, root: {color: "#fff"}}}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start" className={classes.inputSearchBox}>
                <Search />
              </InputAdornment>
            }
            onChange={this.handleSearchText}
            onKeyUp={this.handleKeyUpEnter}
          //   classes={{underline:{ '&:after': {
          //     borderBottom:'2px solid red',
          // } }}}
          />
        
        </MuiThemeProvider>

        </FormControl>
        

        {/* >> */}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Best Offers"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            target="_blank"
            className={classes.navLink}
          >
            <Stars/>
          </IconButton>
          
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Settings"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            target="_blank"
            className={classes.navLink}
          >
            <Settings/>
          </IconButton>
        </Tooltip>
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
          dropdownList={[
            <Link onClick={this.props.clearFilters} to="/category/cranks" className={classes.dropdownLink}>
              Cranks
            </Link>,
            <Link onClick={this.props.clearFilters} to="/category/hubs" className={classes.dropdownLink}>
              Hubs
            </Link>,
            <Link onClick={this.props.clearFilters} to="/category/dhframes" className={classes.dropdownLink}>
              DH Frames
            </Link>,
            <Link onClick={this.props.clearFilters} to="/category/enduroframes" className={classes.dropdownLink}>
              Enduro Frames
            </Link>,
            <Link onClick={this.props.clearFilters} to="/category/wheels" className={classes.dropdownLink}>
              Wheels
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Dropdown
          noLiPadding
          buttonText="user"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          hoverColor="black"
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Favorites
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Color Theme
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Dnd test
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              add manually tag ITEMS
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Bike assembler + split bike to parts and show stats for parts
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Stats
              {/* Page for each group and statistics for example - Dh frames, count all types by manufacturer and show models */}
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Missed high score offers
            </Link>,
          ]}
        />
      </ListItem>
    </List>

  );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
