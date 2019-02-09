import {
  defaultFont,
  bikeyshColor5,
  bikeyshColor6,
} from "../../material-kit-react";

const customDropdownStyle = theme => ({
  popperClose: {
    pointerEvents: "none"
  },
  dropdown: {
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "160px",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: bikeyshColor5,
  },
  menuList: {
    padding: "0"
  },
  pooperResponsive: {
    zIndex: "1200",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      boxShadow: "none",
      color: "black"
    }
  },
  dropdownItem: {
    ...defaultFont,
    backgroundColor: "#21262b",
    fontSize: "13px",
    position: "relative",
    transition: "all 150ms linear",
    display: "block",
    borderBottom: `1px solid ${bikeyshColor6}`,
    clear: "both",
    fontWeight: "400",
    height: "fit-content",
    color: "#fff",
    whiteSpace: "nowrap"
  },
  blackHover: {
    "&:hover": {
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
      backgroundColor: "#343c44",
      color: "#fff"
    }
  },
  dropdownItemRTL: {
    textAlign: "right"
  },
  dropdownDividerItem: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    height: "1px",
    overflow: "hidden"
  },
  buttonIcon: {
    width: "20px",
    height: "20px"
  },
  caret: {
    transition: "all 150ms ease-in",
    display: "inline-block",
    width: "0",
    height: "0",
    marginLeft: "4px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent"
  },
  caretActive: {
    transform: "rotate(180deg)"
  },
  caretRTL: {
    marginRight: "4px"
  },
  dropdownHeader: {
    display: "block",
    padding: "0.1875rem 1.25rem",
    fontSize: "0.75rem",
    lineHeight: "1.428571",
    color: "#777",
    whiteSpace: "nowrap",
    fontWeight: "inherit",
    marginTop: "10px",
    "&:hover,&:focus": {
      backgroundColor: "transparent",
      cursor: "auto"
    }
  },
  noLiPadding: {
    padding: "0"
  }
});

export default customDropdownStyle;
