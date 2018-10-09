import {
    bikeyshColor4,
} from "../material-kit-react";

  
  const categoryInfoStyle = theme => ({
    card: {
      display: "inline-block",
      minWidth: 180,
      maxWidth: 180,
      minHeight: 350,
      background: 'linear-gradient(180deg, #314455 0%, #97aabd 85%,#314455 100%)',
    },
    cardContent: {
      // fontFamily: "Permanent Marker, cursive",
      fontFamily: "Lobster, cursive",
      fontSize: "45px",
      textShadow: `1px 1px ${bikeyshColor4}`,
    }
  });
  
  export default categoryInfoStyle;
  