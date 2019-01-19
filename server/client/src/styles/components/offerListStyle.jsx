
import { container, title ,
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
    ...containerOfferList,
    background: bikeyshColor5,
  }, 
  bikeyshBackground: {
    // background: `repeating-linear-gradient(
    //   -45deg,
    //   #C96567,
    //   #C96567 22px,
    //   #9E5A63 22px,
    //   #9E5A63 44px
    // )`,
    background: "#C96567",
    boxShadow: "-1px 2px 11px 0px rgba(0,0,0,0.74)"
  },
  container,
  bikeyshColor1, bikeyshColor2, bikeyshColor3, bikeyshColor4, bikeyshColor5, bikeyshColor6, bikeyshColor7,
};

export default style;
