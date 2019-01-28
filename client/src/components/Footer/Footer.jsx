import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax';
import ImageLightBox from '../../components/ImageLightbox/ImageLightBox.jsx';
import { Typography } from '@material-ui/core';

const style = () => ({
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
        // width: "100%",
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
class Footer extends React.Component {
    state = {
        fullscreenOpen: false,
        picArray: [],
    };
    handleClickShowFeatures = (fullscreen) => {
        this.setState({
          fullscreenOpen: fullscreen, 
        }, ()=> {});
    };
    inprogressInfo = () => {
        alert("in preparation");
    }
    goToLinkedIn = () => {
        
    }
    render(){
        const {classes} = this.props;

        return (
                !this.props.loginPageOpened && this.props.loggedIn ? (
                //standard footer
                <Aux>
                {/* //line above footer */}
                <div className={classes.aboveFooter}/>
                <div className={classes.footer}>
                    <Grid container justify="space-between" alignContent="center">
                        {/* // 1 row */}
                        <Grid item xs={4}/>
                        <Grid item xs={4} className={classes.textFooterActions}>
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
                                <Grid item sm={6} md={3} lg={3}className={classes.textFooterActions}>
                                    <IconButton onClick={this.inprogressInfo}>
                                        <span className={classes.textActions}>home</span>
                                    </IconButton>
                                </Grid>
                                <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions}>
                                    <IconButton  href="tel:533702712">
                                        <span className={classes.textActions}>contact</span>
                                    </IconButton>
                                </Grid>
                                <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions}>
                                    <IconButton href="https://www.linkedin.com/in/przemysław-harendarz-4052b252" target="_blank">
                                        <i className="fab fa-linkedin" style={{fontSize: "1em", color: "#fff"}}
                                        
                                        />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions}>
                                    <IconButton href="https://github.com/pharendarz" target="_blank">
                                        <i 
                                            className="fab fa-github-square" 
                                            style={{fontSize: "1em", color: "#fff"}}
                                            
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}/>
                        <br/>
                        <br/>
                        <br/>
                        {/* // last row */}
                        <Grid item sm={12} md={4} lg={4}/>
                        <Grid item sm={12} md={4} lg={4} className={classes.textFooterDown}>
                            <span >© 2019 | bikeysh</span>
                        </Grid>
                        <Grid item sm={12} md={4} lg={4}/>
    
                    </Grid>
                    <div className={classes.colorOverlay}/>
                </div>
                </Aux>
                ) : (
                    //small footer [rewrite code ][todo]
                    <Aux>
                        <div className={classes.footerSmall}>
                        <Grid container justify="space-between" alignContent="center">
                            {/* // 1 row */}
                            <Grid item xs={4}/>
                            <Grid item xs={4} >
                                {/* <span>Footer Stuff</span> */}
                            </Grid>
                            <Grid item xs={4}/>
                            {/* // 3rd row */}
                            <Grid item xs={4}/>
                            <Grid item xs={4}>
                                <Grid container justify="space-between" alignContent="center">
                                    <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions} zeroMinWidth>
                                        <IconButton onClick={this.inprogressInfo}>
                                            <Typography noWrap className={classes.textActions}>about</Typography>
                                        </IconButton>
                                    </Grid>
                                    <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions} zeroMinWidth>
                                        <IconButton href="tel:533702712">
                                            <Typography noWrap className={classes.textActions}>contact</Typography>
                                        </IconButton>
                                    </Grid>
                                    <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions} zeroMinWidth>
                                        <IconButton href="https://www.linkedin.com/in/przemysław-harendarz-4052b252" target="_blank">
                                            <i className="fab fa-linkedin" style={{fontSize: "1em", color: "#fff"}}></i> 
                                        </IconButton>
                                    </Grid>
                                    <Grid item sm={6} md={3} lg={3} className={classes.textFooterActions} zeroMinWidth>
                                        <IconButton href="https://github.com/pharendarz" target="_blank">
                                            <i className="fab fa-github-square" style={{fontSize: "1em", color: "#fff"}}></i>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}/>
                            <br/>
                            <br/>
                            <br/>
                            {/* // last row */}
                            <Grid item sm={12} md={4} lg={4}/>
                            <Grid item sm={12} md={4} lg={4} className={classes.textFooterDownSmall}>
                                <span >© 2019 | bikeysh</span>
                            </Grid>
                            <Grid item sm={12} md={4} lg={4}/>
    
                        </Grid>
                        </div>
                        <ImageLightBox 
                            open={this.state.fullscreenOpen}
                            close={this.handleClickShowFeatures}
                            picArray={this.state.picArray}
                        />
                    </Aux>
                )
        )
    }
}

export default withStyles(style)(Footer);