
import {  
  containerBackground, containerOfferList,   
  bikeyshColor1,
  bikeyshColor2,
  bikeyshColor3,
  bikeyshColor4,
  bikeyshColor5,
  bikeyshColor6,
  bikeyshColor7,} from "../material-kit-react";

const style = {
  containerBackground, 
  containerOfferList: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    minWidth: `1250px`,
    maxWidth: `1250px`,
    background: `#97AABD`,
  }, 
  bikeyshBackground: {
    background: "#C96567",
    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
  },
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
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
  },
  bikeyshColor1, bikeyshColor2, bikeyshColor3, bikeyshColor4, bikeyshColor5, bikeyshColor6, bikeyshColor7,
};

export default style;
