import {
    bikeyshColor4,
    bikeyshColor5,
    bikeyshColor6,
    bikeyshColor7,
} from "../material-kit-react";

  
  const categoryInfoStyle = theme => ({
    root:{
      minWidth: 180,
      maxWidth: 180,
      minHeight: 350,
      padding: '1.5em 0 1.5em 0',
      // flexGrow: 1,
    },
    card: {
      // display: "flex",
      minWidth: 180,
      maxWidth: 180,
      minHeight: 350,
      background: `linear-gradient(180deg, ${bikeyshColor7} 0%, ${bikeyshColor6} 1%)`,
      // background: bikeyshColor6
    },
    cardContent: {
      fontFamily: "Pacifico, cursive",
      // fontFamily: "Lobster, cursive",
      fontSize: "25px",
      color: `linear-gradient(135deg, ${bikeyshColor5} 0%, #fff 10%)`,
      textShadow: `1px 1px ${bikeyshColor4}`,
      textAlign: `center`,

    },
    cardButton: {
      color: bikeyshColor5,
    }

  });
  
  export default categoryInfoStyle;
  