import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const style = () => ({
    footer: {
        height: "200px",
        width: "100%",
        // background: "#303030",rgba(48,48,48, 0.5)
        // background: `rgba(48,48,48, 0.5) url(${this.props.imageUrl})`,
        // backgroundPosition: `${this.props.tweak}`,
        // backgroundAttachment: `fixed`,
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        position: `relative`,
        // filter: `grayscale(50%)`,
    },
    textFooterActions: {
        // margin: "auto",
        width: "50%",
        // padding: "10px",
        textAlign: "center",
        zIndex: 1,
    },
    textActions: {
        fontSize: "13px",
        color: "white",
        zIndex: 1,
    },
    textFooterDown: {
        // margin: "auto",
        width: "50%",
        // padding: "10px",
        fontSize: "10px",
        color: "white",
        textAlign: "center",
        zIndex: 1,
    },
    textFooterUp: {
        fontSize: "18px",
        color: "white",
        fontFamily: `'Permanent Marker'`,
    },
    hr: {
        // display: "block",
        height: "1px",
        border: "0",
        borderTop: "5px solid #232323",
        // padding: "0",
        width: "640px"
    },
    hr2: {
        // display: "block",
        height: "1px",
        border: "0",
        borderTop: "5px solid #232323",
        // padding: "0",
        width: "480px"
    },
    colorOverlay: {
        width: `100%`,
        height: `100%`,
        opacity: `.7`,
        position: `absolute`,
        //rgba(48,48,48, 0.5) #303030 #133160 #c96567
        background: `linear-gradient(to bottom, #c96567 0%,#133160 100%)`,
        zIndex: 0,
    },
})
const Footer = (props) => {
    const {classes} = props;
    return (
            <div className={classes.footer} style={{
                background: `rgba(48,48,48, 0.5) url(${props.imageUrls.footerImage.url})`,
                backgroundPosition: `${props.imageUrls.footerImage.tweak}`,
                backgroundAttachment: `fixed`,}}
            >
                <Grid container justify="space-between" alignContent="center">
                    {/* // 1 row */}
                    <Grid item xs={4}/>
                    <Grid item xs={4} className={classes.textFooterActions}>
                        {/* <span className={classes.textFooterUp}>Footer Stuff</span> */}
                    </Grid>
                    <Grid item xs={4}/>
                    {/* // 2nd row */}
                    <Grid item xs={4}/>
                    <Grid item xs={4} className={classes.textFooterActions}>
                        <hr className={classes.hr}/>
                    </Grid>
                    <Grid item xs={4}/>
                    {/* // 3rd row */}
                    <Grid item xs={4}/>
                    <Grid item xs={4}>
                        <Grid container justify="space-between" alignContent="center">
                            <Grid item xs={3} className={classes.textFooterActions}>
                                <IconButton>
                                    <span className={classes.textActions}>home</span>
                                </IconButton>
                            </Grid>
                            <Grid item xs={3} className={classes.textFooterActions}>
                                <IconButton>
                                    <span className={classes.textActions}>contact</span>
                                </IconButton>
                            </Grid>
                            <Grid item xs={3} className={classes.textFooterActions}>
                                <IconButton>
                                    <i className="fab fa-linkedin" style={{fontSize: "1em", color: "#fff"}}></i> 
                                </IconButton>
                            </Grid>
                            <Grid item xs={3} className={classes.textFooterActions}>
                                <IconButton>
                                    <i className="fab fa-github-square" style={{fontSize: "1em", color: "#fff"}}></i>
                                    {/* <i className="fab fa-github" style={{fontSize: "1em", color: "#fff"}}></i> */}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}/>
                    {/* // 4th row */}
                    {/* <Grid item xs={4}/>
                    <Grid item xs={4} className={classes.textFooterActions}>
                        <hr className={classes.hr2}/>
                    </Grid>
                    <Grid item xs={4}/> */}
                    <br/>
                    <br/>
                    <br/>
                    {/* // last row */}
                    <Grid item xs={4}/>
                    <Grid item xs={4} className={classes.textFooterDown}>
                        <span >© 2019 | bikeysh</span>
                    </Grid>
                    <Grid item xs={4}/>

                </Grid>
                    {/* <i className="fab fa-cog" style={{fontSize: "1em", color: "Tomato"}}></i>  */}
                <div className={classes.colorOverlay}/>
            </div>
        
    )
}

export default withStyles(style)(Footer);