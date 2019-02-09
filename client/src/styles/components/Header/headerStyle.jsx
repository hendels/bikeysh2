import {  createMuiTheme } from '@material-ui/core/styles';

import {
  container,
  transition,
  boxShadow,
  drawerWidth,
  bikeyshColor1,
  bikeyshColor2,
  bikeyshColor4,
  bikeyshColor5,
  bikeyshColor6,
} from "../../material-kit-react";

const headerStyle = {
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
  },
  searchResults: {
    display: "flex",
    position: "fixed",
    top: "66px",
    right: "450px",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    zIndex: "1200",
  },
  searchNoResults: {
    display: "flex",
    position: "fixed",
    top: "66px",
    right: "595px",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    zIndex: "1200",
  },
  searchItem: {
    borderBottom: "1px solid #091528",
    margin: "0px 0px 0px 0px",
    position: "relative",
    fontSize: "13px",
    display: "block",
    clear: "both",
    fontWeight: "400",
    height: "fit-content",
    whiteSpace: "nowrap",
    "&:hover,&:focus": {
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
    }
  },
  searchShowaAllItem: {
    backgroundColor: bikeyshColor1,
    color: bikeyshColor6,
    borderColor: "#091528",
    borderStyle: "solid",
    borderWidth: "1px",
    "&:hover,&:focus": {
      background: "#243147"
    },
    outline: "none"
  },
  absolute: {
    position: "absolute",
    zIndex: "1100"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  container: {
    ...container,
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap"
  },
  flex: {
    flex: 1
  },
  title: {
    fontFamily: 'Lobster, cursive', 
    fontSize: `30px`,
    textTransform: "lowercase",
    lineHeight: "30px",
    borderRadius: "3px",
    color: "inherit",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent",
      outline: "none",
    }
  },
  appResponsive: {
    margin: "20px 10px"
  },
  bikeysh1: {
    backgroundColor: bikeyshColor1,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
  },
  bikeysh2: {
    backgroundColor: bikeyshColor2,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
  },
  bikeysh3: {
    backgroundColor: "#000",
    color: bikeyshColor4,
  },
  bikeysh3_1: {
    backgroundColor: "#000",
    color: bikeyshColor4,
  },
  bikeysh4: {
    backgroundColor: bikeyshColor4,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
  },
  bikeysh5: {
    backgroundColor: bikeyshColor5,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF"
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
  },
  drawerPaper: {
    backgroundColor: "#343c44",
    color: "#ffc4c5",
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    maxHeight: "1200px",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    overflowX: "hidden",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition
  }
};
export const themeListItem = createMuiTheme({
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
export const themeListItemText = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        color: '#fff',
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
export default headerStyle;
