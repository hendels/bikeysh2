import { createMuiTheme } from '@material-ui/core/styles';

const emptyPageStyle = theme => ({
    paper: {
        position: 'relative',
        left: '50%',
        color: "white",
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: `repeating-linear-gradient(
          -45deg,
          #C96567,
          #C96567 22px,
          #9E5A63 22px,
          #9E5A63 44px
        )`,
        zIndex: 1,
        padding: "10px 10px 10px 10px",
        "@media (max-width: 425px)":{
            width: "80vw",
        },
        "@media (max-width: 375px)":{
            width: "100vw",
        }
      },
})
export const themeLoginButton = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: '#314455',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 30,
          '&:hover': {
              backgroundColor: '#838e99',
              color: "#fff"
          },
          outline: "none",
        },
      },
    },
});

export default emptyPageStyle;