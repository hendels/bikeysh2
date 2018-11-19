
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
    // background: `repeating-linear-gradient(
    //   -45deg,
    //   #C96567,
    //   #C96567 22px,
    //   #9E5A63 22px,
    //   #9E5A63 44px
    // )`,
  }, 
  bikeyshBackground: {
    background: `repeating-linear-gradient(
      -45deg,
      #C96567,
      #C96567 22px,
      #9E5A63 22px,
      #9E5A63 44px
    )`,
  },
  container,
  bikeyshColor1, bikeyshColor2, bikeyshColor3, bikeyshColor4, bikeyshColor5, bikeyshColor6, bikeyshColor7,
};

export default style;
