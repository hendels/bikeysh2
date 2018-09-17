/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';

// @material-ui/icons
import { Apps, CloudDownload, Search } from "@material-ui/icons";

// core components
import Dropdown from "../Dropdown/Dropdown.jsx";
import Button from '@material-ui/core/Button/Button';


import headerLinksStyle from "../../styles/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <FormControl className={classes.margin}>
      <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
      </FormControl>
      <ListItem className={classes.listItem}>
        <Dropdown
          noLiPadding
          buttonText="Bikemarkt"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/category/cranks" className={classes.dropdownLink}>
              Cranks
            </Link>,
            <Link to="/category/hubs" className={classes.dropdownLink}>
              Hubs
            </Link>,
            <Link to="/category/dhframes" className={classes.dropdownLink}>
              DH Frames
            </Link>,
            <Link to="/category/enduroframes" className={classes.dropdownLink}>
              Enduro Frames
            </Link>,
            <Link to="/category/wheels" className={classes.dropdownLink}>
              Wheels
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Dropdown
          noLiPadding
          buttonText="OLX"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/category/cranks" className={classes.dropdownLink}>
              Cranks
            </Link>,
            <Link to="/category/hubs" className={classes.dropdownLink}>
              Hubs
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              DH Frames
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Enduro Frames
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
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
            color: "primary"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/home" className={classes.dropdownLink}>
              Favorites
            </Link>,
            <Link to="/home" className={classes.dropdownLink}>
              Color Theme
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="rose"
            target="_blank"
            className={classes.navLink}
          >
            COG
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
