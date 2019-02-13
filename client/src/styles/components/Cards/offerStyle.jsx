import {
    bikeyshColor4,
    bikeyshColor5,
    bikeyshColor6,
    bikeyshColor7,
} from "../../material-kit-react";
//
const boW = '53vw';
const offerStyle = theme => ({
    root: {
        width: "100vw" ,
        height: `40vh`,
        "@media (min-width: 576px)": {
            width: "100vw",
            height: `40vh`,
        },
        "@media (min-width: 768px)": {
            width: "85vw",
            height: `40vh`,
        },
        "@media (min-width: 992px)": {
            maxWidth: "75vw",
            height: 200,
        },
        "@media (min-width: 1200px)": {
            maxWidth: boW,
            height: 200,
        },

    },
    gridElementTitle: {
        zIndex: 1,
        fontSize: "20px",
        color: "#fff",
        textShadow: `1px 1px ${bikeyshColor5}`,
        paddingLeft: `15px`,
        "&:hover": {
            textDecoration: 'underline',
        },
        "@media (max-width: 425px)": {
            fontSize: "13px",
        },
        "@media (max-width: 375px)": {
            fontSize: "11px",
        },
    },
    gridElementTitleCategory: {
        zIndex: 1,
        fontSize: "20px",
        color: "#C96567",
        textShadow: `1px 1px ${bikeyshColor6}`,
        "@media (max-width: 425px)": {
            fontSize: "13px",
        },
        "@media (max-width: 375px)": {
            fontSize: "11px",
        },

    },
    gridElementDownbar: {
        zIndex: 0,
        minWidth: boW,
        minHeight: 70,
        background: "#000",
        opacity: "0.63",
        color: "#fff",
        paddingLeft: `15px`,
        paddingRight: `15px`,
        border: "1px solid rgba(201, 101, 103, 0)",
        "@media (max-width: 425px)": {
            minHeight: `10vh`,
            fontSize: "13px",
        },
        "@media (max-width: 375px)": {
            minHeight: `10vh`,
            fontSize: "11px",
        },
        "&:hover":{
            border: "1px solid rgba(201, 101, 103, 0.1)",
            opacity: "0.72",
        }
    },
    gridElementDownbarIcons: {
        paddingTop: '10px'
    },
    gridElementUpbar: {
        zIndex: 0,
        minWidth: boW,
        minHeight: 30,
        maxHeight: 30,
        background: `rgba(39,31,36,0.7)`,

    },
    //<<left info area
    gridElementInfo: {
        width: '13vw',
        height: 200,
        background: bikeyshColor6,
        "@media (max-width: 1200px)": {
            display: "none",
        },
    },
    gridElementInfoActions:{
        minHeight: 70,
        maxHeight: 70,
        minWidth: '13vw',
        paddingLeft: `15px`,
        paddingRight: `15px`,
        borderBottom: `1px dotted ${bikeyshColor4}`,
        borderTop: `1px dotted ${bikeyshColor4}`,
        "@media (max-width: 1200px)": {
            display: "none",
        },
        "@media (min-width: 1960px)": {
            width: "11vw",
            height: 200,
        },
    },
    gridElementInfoTitle: {
        color: "#fff",
        fontSize: "15px",
        textShadow: `1px 1px ${bikeyshColor4}`,
        margin: `5px 5px 0px 15px`,
        "@media (max-width: 425px)": {
            fontSize: "14px",
        },
        "@media (max-width: 375px)": {
            fontSize: "12px",
        },
    },
    gridElementInfoText:{
        color: "#fff",
        fontSize: "12px",
        textAlign: "left",
        margin: `0px 0px 0px 15px`,
        "@media (max-width: 1200px)": {
            display: "none",
        },
    },
    actionItem: {
        textAlign: "center",
    },
    //>>
    //<<main area elements
    scores: {
        backgroundColor: `#C96567`,
        fontSize: `20px`,
        fontFamily: `Lobster`,
        textShadow: `1px 1px #314455`,
        right: `15px`,
        opacity: `1`,
        zIndex: 1,
        marginTop: `15px`,
    },
    scoreItem :{
        paddingLeft: "0px",
        "@media (min-width: 1000px)": {
            paddingLeft: "20px"
        },
        "@media (min-width: 1600px)": {
            paddingLeft: "35px"
        },
    },
    badge: {
        top: 6,
        right: -15,
        width: `17px`,
        height: `17px`,
        backgroundColor: `#C96567`,
        fontSize: `9px`,
        textShadow: `1px 1px ${bikeyshColor7}`,
    },
    icon: {
        outline: "none",
        color: "#fff",
        opacity: "0.8",
    },
    spinner: {
        textAlign: "center",
    },
    //>>

  });

  export default offerStyle;