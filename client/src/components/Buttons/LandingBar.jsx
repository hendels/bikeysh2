import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import pageInfoStyle from '../../styles/components/landingButtonStyle.jsx';
import Grid from '@material-ui/core/Grid';
import BigSquareButton from './BigSquareButton';
import {Link} from 'react-router-dom';

const pageInfoStyle = theme => ({
    container: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "flex-end",
        alignItems: "center",

        color: `#fff`,

        textDecoration: `none`,

        height: `40vh`,
        maxWidth: "1920px",
        margin: "auto",

        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        filter: `grayscale(50%)`,
    },
    //<< row
    itemDummy: {
        flex: 1,
        "@media (max-width: 425px)": {
            flex: 0,
        }
    },
    itemTitle: {
        flex: 1,
        zIndex: 2,
    },
    itemButtonContainer: {
        flex: 1,
        display: "flex",
    },
    //>>
    itemButtonDummy: {
        flex: 2,
        order: 1,
    },
    itemButton: {
        flex: 1,
        order: 2,
    },
    colorOverlay: {
        background: `linear-gradient(to bottom, #133160 0%,#c96567 100%)`,
        opacity: `.7`,
        width: `100%`,
        height: `100%`,
        position: `absolute`,
        zIndex: 0,
    },
    textTitle: {
        textAlign: "center",
        color: "#fff",
        fontFamily: `'Permanent Marker', cursive`,
        fontSize: `45px`,
        textDecoration: `none`,
        "@media (max-width: 425px)": {
            textAlign: "left",
            fontSize: "35px",
            paddingLeft: "25px",
        }
    },
});       
const LandingButton = (props) => {
    const { classes } = props;
    console.log(props.toLink);
    return(
        <div className={classes.container} 
            style={{
                background: `url(${props.imageUrl})`,
                backgroundAttachment: `fixed`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
            }}
            >   
            <div className={classes.colorOverlay}></div>
            <div className={classes.itemDummy}/>
            <div className={classes.itemTitle}>
                <h3 className={classes.textTitle}>{props.pageInfoTitle}</h3>
            </div>
            <div className={classes.itemButtonContainer}> 
                <div className={classes.itemButtonDummy}/>
                <div className={classes.itemButtonDummy}/>
                <div className={classes.itemButton}>
                    <BigSquareButton pushTo={props.pushTo}/>
                </div>
            </div>
        </div>
    )
}

export default withStyles(pageInfoStyle)(LandingButton);