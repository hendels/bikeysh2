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
      textAlign: `center`,
    },
    cardTitle:{
      fontFamily: "Pacifico, cursive",
      fontSize: "25px",
      color: `rgba(255,255,255,0.5)`,
      textShadow: `1px 1px ${bikeyshColor4}`,

    },
    cardButton: {
      color: bikeyshColor5,
      outline: "none",
    }

  });
  
  export default categoryInfoStyle;
  