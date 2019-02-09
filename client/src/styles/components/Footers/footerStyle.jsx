const footerStyle = () => ({
    aboveFooter:{
        height: "50px",
        width: "100%",
    },
    footerSmall:{
        background: "#303030",
        display: `flex`,
        flex: "0 1 100vw",
        height: "20vh",
        width: "100%",
        justifyContent: `center`,
        alignItems: `center`,
        "@media (max-width: 425px)": {
            height: "20vh",
        },
    },
    textFooterDownSmall: {
        background: "rgba(0, 0, 0, 0.2)",
        width: "50%",
        fontSize: "10px",
        color: "white",
        textAlign: "center",
        zIndex: 1,
        "@media (max-width: 425px)": {
            width: "100%",
        },
    },
    footer: {
        background: `rgba(48,48,48, 0.5) url(http://factoryracing.canyon.com/downhill-team/wp-content/uploads/sites/2/2018/02/Canyon_DH_Nizza18_G4A9936.jpg)`,
        backgroundPosition: `0 650px`,
        backgroundAttachment: `fixed`,
        display: `flex`,
        flex: "0 1 100vw",
        height: "15vh",
        justifyContent: `center`,
        alignItems: `center`,
        zIndex: 0,
        "@media (max-width: 425px)": {
            height: "20vh",
            backgroundPosition: `0px 750px`,
        },

    },
    colorOverlay: {
        height: "15vh",
        width: "100%",
        opacity: `.7`,
        position: `absolute`,
        background: `linear-gradient(to bottom, #c96567 0%,#133160 100%)`,
        zIndex: 1,
        "@media (max-width: 425px)": {
            height: "20vh",
        },
    },
    textFooterActions: {
        width: "50%",
        textAlign: "center",
        zIndex: 2,
        "@media (max-width: 100px)": { 
            display: "none",
        },
        "@media (max-height: 465px)": { 
            display: "none",
        },
    },
    textFooterDown: {
        width: "100%",
        fontSize: "10px",
        color: "white",
        textAlign: "center",
        zIndex: 2,
    },
    hr: {
        height: "1px",
        border: "0",
        borderTop: "5px solid rgba(35, 35, 35, 0.75)",
        width: "100%",
        "@media (max-width: 425px)": {
            width: "0%",
        },
    },
    textActions: {
        fontSize: "13px",
        color: "white",
        zIndex: 2,
    },
})

export default footerStyle;