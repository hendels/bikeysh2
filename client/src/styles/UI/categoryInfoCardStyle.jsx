
import { createMuiTheme } from '@material-ui/core/styles';

const boH = 320;
const boW = 145;

const categoryInfoStyle = theme => ({
    root:{
      height: boH,
      width: boW,

      padding: '1.5em 0 1.5em 0',

      "@media (max-width: 1024px)": {
        width: boW - 40,
        height: boH - 100,
      },
      "@media (max-width: 768px)": {
        width: boW - 70,
      },
      "@media (max-width: 425px)": {
        height: "10vh",
        width: "100vw",
        padding: '0 0 0 0',
      },
    },
    card: {
      height: boH,
      width: boW,

      background: `linear-gradient(180deg, #000 0%, #041424 1%)`,

      "@media (max-width: 1024px)": {
        width: boW -40,
        height: boH - 100,
      },
      "@media (max-width: 768px)": {
        width: boW - 70,
      },
      "@media (max-width: 425px)": {
        height: "10vh",
        width: "100vw",
        padding: '0 0 0 0',
      },
    },
    cardContent: {
      textAlign: `center`,
    },
    cardTitle:{
        fontFamily: "Pacifico, cursive",
        fontSize: "25px",
        color: `rgba(255,255,255,0.5)`,

          textShadow: `1px 1px #C96567`,
        // background: "purple", //[dev]
        "@media (max-width: 1024px)": {
            fontSize: "17px",
        },
        "@media (max-width: 425px)": {
            fontSize: "2.7vh",
            paddingLeft: '20px',
        },
    },
});
export const themeButton = createMuiTheme({
    overrides: {
        MuiButton: {
            root:{
                outline: "none",
                color: `#97AABD`,
                // background: "green", //[dev]
                borderRadius: 0,
                "@media (max-width: 425px)": {
                    border: '1px solid rgba(151, 170, 189, 0.2)',
                },
                
            },
            label:{
                "@media (max-width: 425px)": {
                    fontSize: "1.5vh",
                },
            },
        },
    }
})
export default categoryInfoStyle;