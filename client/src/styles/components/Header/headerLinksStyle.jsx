import { defaultFont, bikeyshColor2, } from "../../material-kit-react";
import {  createMuiTheme } from '@material-ui/core/styles';

import tooltip from "../../UI/tooltipsStyle";
const colors = {
  bikeyshColor2: `#644E5B`,
  bikeyshColor7: `#000`,
  bikeyshColor4: `#ffc4c5`,
}

export const themeInputLabel = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      formControl:{
        color: colors.bikeyshColor2,
      },
    },
  },
});
export const themeInput = createMuiTheme({
  overrides: {
    MuiInput: {
      root:{
        color:  colors.bikeyshColor4
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
export const themeToolTip = createMuiTheme({
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
const headerLinksStyle = theme => ({
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit",

  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "rgba(0,0,0,0.4)"
      }
    }
  },
  listItemSearch: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "rgba(0,0,0,0.0)"
      }
    }
  },
  listItemText: {
    padding: "0 !important"
  },
  inputSearchBox: {
    color: bikeyshColor2,
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(201, 101, 103, 0.3)"
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start"
      }
    }
  },
  notificationNavLink: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    top: "4px"
  },
  registerNavLink: {
    top: "3px",
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex"
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  icons: {
    width: "20px",
    height: "20px",
    marginRight: "3px"
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
    marginRight: "4px"
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
      padding: "10px 20px"
    }
  },
  ...tooltip,
  marginRight5: {
    marginRight: "5px",
    backgroundColor: "#21262b",
    color: "#fff"
  },

});

export default headerLinksStyle;
