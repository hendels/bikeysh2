import React from 'react';
//@mui
import {withStyles} from '@material-ui/core/styles';
import { Typography, Grid, IconButton} from '@material-ui/core';
//app components
import Aux from '../../hoc/Ax/Ax';
import ImageLightBox from '../../components/ImageLightbox/ImageLightBox.jsx';
//styles
import footerStyle from '../../styles/components/Footers/footerStyle';

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
                    //small footer [rewrite code] TODO
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

export default withStyles(footerStyle)(Footer);