import {createMuiTheme} from '@material-ui/core/styles';

const boH = 320;
const boW = 275;

export const themeIconButton = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                "@media (max-width: 425px)":{
                    width: '8vh',
                    height: '8vh'
                },
            }
        },
    }
})
export const themeProgress = createMuiTheme({
    overrides: {
        MuiCircularProgress: {
            colorPrimary: {
                color: "#C96567"
            }
        }
    }
})
const bestOfferStyle = theme => ({
    root: {
        height: boH,
        width: boW,
        "@media (max-width: 1024px)": {
            width: boW - 80,
            height: boH - 100,
        },
        "@media (max-width: 768px)": {
            width: boW - 130,
        },
        "@media (max-width: 425px)":{
            height: "50vh",
            width: "100vw",
        },
    },
    image: {
        height: boH,
        width: boW,
        "@media (max-width: 1024px)": {
            width: boW - 80,
            height: boH - 100,
        },
        "@media (max-width: 768px)": {
            width: boW - 130,
        },
        "@media (max-width: 425px)":{
            height: "50vh",
            width: "100vw",
        },
        '&:hover, &$focusVisible': {
          zIndex: 1,
          '& $bestOfferBackdrop': {
            opacity: 0.15,
          },
          '& $imageTitle': {
            border: '2px solid currentColor',
          },
        },
    },
    bestOfferImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    bestOfferBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },

    bestOfferScore: {
       backgroundColor: `#C96567`,
       fontSize: `20px`,
       fontFamily: `Lobster`,
       textShadow: `1px 1px #314455`,
       
    },
    bestOfferAvatar: {
       paddingLeft: "10px",
    },
    bestOfferPrice: {
        fontFamily: "Roboto",
        color: '#fff',
        fontSize: '15px',
        zIndex: 2,
        // background: "tomato", //[dev]
        textAlign: "right",
        paddingRight: "20px",
    },
    bestOfferDummyAboveTitle: {
        height: "155px",
        zIndex: 2,
        //background: "purple", //[dev]
        opacity: "0.2",
        "@media (max-width: 1024px)": {
            height: "73px",
        },
        "@media (max-width: 768px)": {
            height: "70px",
        },
        "@media (max-width: 425px)": {
            height: "25vh",
        },
    },
    bestOfferTitle: {
        height: "35px",
        color: '#fff',
        textShadow: '1px 1px #000',
        fontSize: '15px',
        zIndex: 2,
        //background: "tomato", //[dev]
        verticalAlign: 'text-bottom',
        "@media (max-width: 425px)": {
            height: "5vh",
        },
    },
    bestOfferUnderTitle: {
        color: '#fff',
        textShadow: '1px 1px #000',
        fontSize: '13px',
        zIndex: 2,
    },
    bestOfferDummyBelowTitle: {
        height: '23px',
        zIndex: 2,
        //background: "limegreen", //[dev]
        opacity: "0.2",
        "@media (max-width: 1024px)": {
            height: "5px",
        },
        "@media (max-width: 768px)": {
            height: "2px",
        },
        "@media (max-width: 425px)": {
            height: "1vh",
        },
    },
    bestOfferAction:{
        //background: 'rgba(125, 222, 155, 0.8)', //[dev]
        zIndex: 5,
    },
    icon: {
        outline: "none",
        color: "#fff",
        opacity: "0.8",
        textAlign: "center",
    },
    spinner: {
        textAlign: "center",
    }
});

export default bestOfferStyle;