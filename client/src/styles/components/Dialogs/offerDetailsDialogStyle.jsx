import { createMuiTheme } from '@material-ui/core/styles';

export const themePaper = createMuiTheme({
    overrides: {
      MuiDialog: {
        paper: {
          background: `repeating-linear-gradient(
            -45deg,
            #697684,
            #697684 22px,
            #5a6671 22px,
            #5a6671 44px
          )`,
          outline: "none",
        },
  
      },
      MuiDialogContent:{
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }
      },
      MuiDialogTitle:{
        root:{
          fontSize: "18px",
          color: "#fff",
          fontWeight: "bold",
          textShadow: `1px 1px #314455`,
        }
      },
      MuiAvatar: {
        root: {
          fontSize: `20px`,
          fontFamily: `Lobster`,
          textShadow: `1px 1px #314455`,
        },
      },
    },
  });
export const themeCancelButton = createMuiTheme({
overrides: {
    MuiButton: {
    root: {
        background: '#314455',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0px 30px 0px 30px',
        '&:hover': {
            backgroundColor: '#838e99'
        },
    },
    },
},
});

const offerDetailsDialogStyle = {
    dialog: {
        maxWidth: "700px",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
    },
    priceContainer: {
        width: "200px",
        height: "50px",
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: "10px 15px 10px 5px",
        fontSize: "20px",
        fontWeight: "bold",
        "@media (max-width: 425px)": {
            fontSize: "3vh",
            height: "9vh",
        },
        "@media (max-width: 300px)": {
            height: "12vh",
        }
    },
        priceContainerMobile: {
        "@media (max-width: 425px)": {
            fontSize: "2vh",
        }  
    },
    statsContainer: {
        width: "200px",
        height: "135px",
        backgroundColor: "rgba(151, 170, 189, 0.2)",
        padding: "5px 0px 5px 5px",
        fontSize: "14px",
    },
    attributesContainer: {
        width: "200px",
        height: "120px",
        backgroundColor: "rgba(151, 170, 189, 0.2)",
        padding: "5px 0px 5px 5px",
        fontSize: "14px",
        borderTop: "1px solid rgb(151, 170, 189)"
    },
    actionContainer: {
        width: "200px",
        height: "64px",
        backgroundColor: "rgba(151, 170, 189, 0.4)",
        padding: "10px 0px 10px 5px",
        "@media (max-width: 425px)": {
            padding: "10px 0px 10px 3vw",
        },
    },
    descriptionHeader: {
        padding: "5px 0px 5px 5px",
        fontSize: "14px",
    },
    translateButton: {
        padding: "7px 0px 7px 0px",
    },
    description: {
        borderTop: "2px solid rgb(151, 170, 189)"
    },
    actionItem: {
        textAlign: "center",
    },
};

  export default offerDetailsDialogStyle;