const drawerWidth = 260;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};
const conatinerFluid = {
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
  
};
const container = {
  ...conatinerFluid,  
  "@media (min-width: 576px)": {
    maxWidth: "540px"
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px"
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px"
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1600px"
  }
};

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const bikeyshColor1 = `#314455`; //rgba( 49, 68, 85)
const bikeyshColor2 = `#644E5B`; //rgba( 100, 78, 91)
const bikeyshColor3 = `#9E5A63`; //rgba( 158, 90, 99)
const bikeyshColor4 = `#C96567`; //rgba(	201, 101, 103)
const bikeyshColor5 = `#97AABD`; //rgba( 151, 170, 189)
const bikeyshColor6 =  `#041424`;
const bikeyshColor7 =  `#000`;

export {
  drawerWidth,
  transition,
  container,
  boxShadow,
  defaultFont,
  bikeyshColor1,
  bikeyshColor2,
  bikeyshColor3,
  bikeyshColor4,
  bikeyshColor5,
  bikeyshColor6,
  bikeyshColor7,
};
