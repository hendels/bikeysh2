import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax';
import ImageLightBox from '../../components/ImageLightbox/ImageLightBox.jsx';

const style = () => ({
    aboveFooter:{
        height: "50px",
        width: "100%",
    },
    footerSmall:{
        height: "100px",
        width: "100%",
        background: "#303030",
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        position: `relative`,
        zIndex: 1,
    },
    footer: {
        height: "200px",
        width: "100%",
        background: "#303030",
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        position: `relative`,
    },
    textFooterActions: {
        width: "50%",
        textAlign: "center",
        zIndex: 1,
    },
    textActions: {
        fontSize: "13px",
        color: "white",
        zIndex: 1,
    },
    textFooterDown: {
        width: "50%",
        fontSize: "10px",
        color: "white",
        textAlign: "center",
        zIndex: 1,
    },
    textFooterDownLogin: {
        width: "50%",
        fontSize: "10px",
        color: "white",
        textAlign: "center",
        zIndex: 1,
        background: "rgba(0, 0, 0, 0.2)",
    },
    textFooterUp: {
        fontSize: "18px",
        color: "white",
        fontFamily: `'Permanent Marker'`,
    },
    hr: {
        height: "1px",
        border: "0",
        borderTop: "5px solid #232323",
        width: "640px"
    },
    hr2: {
        height: "1px",
        border: "0",
        borderTop: "5px solid #232323",
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
    render(){
        const {classes} = this.props;

        return (
                !this.props.loginPageOpened && this.props.loggedIn ? (
                //standard footer
                <Aux>
                {/* //line above footer */}
                <div className={classes.aboveFooter}/>
                <div className={classes.footer} style={{
                    background: `rgba(48,48,48, 0.5) url(${this.props.imageUrls.footerImage.url})`,
                    backgroundPosition: `${this.props.imageUrls.footerImage.tweak}`,
                    backgroundAttachment: `fixed`,}}
                >
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
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}/>
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
                                {/* <span className={classes.textFooterUp}>Footer Stuff</span> */}
                            </Grid>
                            <Grid item xs={4}/>
                            {/* // 3rd row */}
                            <Grid item xs={4}/>
                            <Grid item xs={4}>
                                <Grid container justify="space-between" alignContent="center">
                                    <Grid item xs={3} className={classes.textFooterActions}>
                                        <IconButton>
                                            <span className={classes.textActions}>about</span>
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
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}/>
                            <br/>
                            <br/>
                            <br/>
                            {/* // last row */}
                            <Grid item xs={4}/>
                            <Grid item xs={4} className={classes.textFooterDownLogin}>
                                <span >© 2019 | bikeysh</span>
                            </Grid>
                            <Grid item xs={4}/>
    
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