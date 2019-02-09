import {createMuiTheme} from '@material-ui/core/styles';

export const themeInput = createMuiTheme({
    overrides: {
        MuiInput:{
            root: {
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: `#ffc4c5`,
                background: "#644E5B",
                "@media (max-width: 425px)": { 
                    width: '59vw',
                },
                "@media (max-width: 375px)": { 
                    width: '63vw',
                },
            },
            input: {
                paddingLeft: `5px`,
            },
            underline:{
                '&:before': {
                  borderBottom:`1px solid #000`,
                  
                },
                '&:after': {
                  borderBottom:`1px solid #ffc4c5`,
                },
            },
        },
        MuiInputLabel: {
            formControl:{
            },
        },
        MuiInputAdornment: {
            root: {
                paddingRight: "5px",
            },
        }
    }
});
export const themeProgress = createMuiTheme({
    overrides: {
        MuiCircularProgress: {
            colorPrimary: {
                color: "#000"

            }
        }
    }
})
export const themeFeaturesButton = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: '#314455',
          textTransform: "none",
          borderRadius: 0,
          border: 0,
          color: 'white',
          height: 25,
          '&:hover': {
              backgroundColor: '#838e99',
              color: "#fff"
          },
          outline: "none",
        },
      },
    },
});
const loginPageStyle = theme => ({
    //Login Form
    loginForm: {
        display: 'block',
        position: 'fixed',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '290px',
        background: `repeating-linear-gradient(
          -45deg,
          #C96567,
          #C96567 22px,
          #9E5A63 22px,
          #9E5A63 44px
        )`,
        zIndex: 3,
        "@media (max-width: 425px)": { 
            top: '65%',
            width: '70vw',
        },
        "@media (max-width: 375px)": { 
            top: '65%',
            width: '80vw',
        },
      },
    demoTextElement: {
        padding: "7px 22px 0px 22px",
        textAlign:" right",
    },
    loginElement: {
        padding: "7px 0px 0px 22px",
    },
    //Background
    loginBackground: {
        background: "url(http://www.fullhdwpp.com/wp-content/uploads/Bicycling-Downhill_www.FullHDWpp.com_.jpg?x69613)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "80vh",
        overflowY: 'hidden',
        filter: 'grayscale(90%)',
        zIndex: 0,
    },
    //Introduction
    introduction:{
        opacity: 0.9,
        display: 'inline',
        position: 'fixed',
        top: '20%',
        left: '15%',
        width: 500,
        height: 100,
        zIndex: 3,
        "@media (max-width: 600px)": { 
            width: 400,
            left: '5%',
        },
        "@media (max-width: 425px)": { 
            top: '15%',
            left: '10%',
            width: '70vw',
            height: 200,
        },
        "@media (max-width: 375px)": { 
            top: '15%',
            left: '10%',
            width: '80vw',
            height: 200,
        },
        "@media (max-width: 220px)": { 
            display: "none",
        },
        "@media (max-height: 465px)": { 
            display: "none",
        },
    },
    introductionTextUp :{
        fontSize: "25px",
        "@media (max-width: 600px)": { 
            fontSize: "20px",
        },
        "@media (max-width: 425px)": {
            fontSize: "20px",
        },
        "@media (max-width: 375px)": {
            fontSize: "18px",
        },
        "@media (max-width: 350px)": {
            fontSize: "13px",
        },
        "@media (max-height: 520px)": {
            fontSize: "13px",
        },
    },
    introductionTextDown :{
        fontSize: "13px",
        "@media (max-width: 425px)": {
            fontSize: "13px",
        },
        "@media (max-width: 375px)": {
            fontSize: "13px",
        },
    },
    react: {
        color: '#61DAFB',
    },
    heart: {
        color: "#c96567"
    },
});

export default loginPageStyle;