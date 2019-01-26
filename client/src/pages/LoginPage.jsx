import React from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {Grid, Paper, Input, Button, createMuiTheme, FormControl, InputAdornment} from '@material-ui/core';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import {FavoriteBorder, AccountCircle, VpnKey, } from '@material-ui/icons/';
import ImageLightBox from '../components/ImageLightbox/ImageLightBox.jsx';
import imgLogin from '../images/login.png'
import imgSearch from '../images/search.png'

const themeInput = createMuiTheme({
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
const themeFeaturesButton = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: '#314455',
          textTransform: "none",
          fontSize: "13px",
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
const styles = theme => ({
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
        zIndex: 2,
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
const captions = {
    login: `Basic authentication based on previously created combination of user & password on server side.`,
    search: "Search offers by item / manufacturer / model name.",
    tags: 'Insert / delete tags by Drag & drop view and add them manually.',
    details: 'Check the details about offer best offer easily.',
    favorites: 'Add offers to favorites.',

}
class LoginPage extends React.Component {
    state = {
        fullscreenOpen: false,
        picArray: [
            {src: 'https://i.imgur.com/h5DP5G3.gif', caption: captions.login},
            {src: 'https://i.imgur.com/2K8HN5d.gif', caption: captions.search},
            {src: 'https://i.imgur.com/REREZL7.gif', caption: captions.tags},
            {src: 'https://i.imgur.com/TV3MfIe.gif', caption: captions.details},
            {src: 'https://i.imgur.com/4ldvuGJ.gif', caption: captions.favorites},
        ],
        login: process.env.REACT_APP_DEMO_CREDENTIALS_LOGIN,
        password: process.env.REACT_APP_DEMO_CREDENTIALS_PASSWORD,
        loginInput: process.env.REACT_APP_DEMO_CREDENTIALS_LOGIN,
        passwordInput: process.env.REACT_APP_DEMO_CREDENTIALS_PASSWORD,
        showError: false,
        loginButtonColor: '#314455',
        loginButtonText: 'Login',
    };
    handleClickShowFeatures = (fullscreen) => {
        this.setState({
          fullscreenOpen: fullscreen, 
        }, ()=> {});
    };
    handleInputUsername = ({target}) => {
        console.log(target.value);
        this.setState({
            loginInput: target.value,
            loginButtonColor: '#314455',
            loginButtonText: 'Login',
        });
    };
    handleInputPassword = ({target}) => {
        console.log(target.value);
        this.setState({
            passwordInput: target.value,
            loginButtonColor: '#314455',
            loginButtonText: 'Login',
        });
    };
    handleLogin = async () => {
        console.log(`pending login ${this.state.loginInput} / ${this.state.passwordInput}...`);
        await axios.post(`/api/authenticate`, {
            login: this.state.loginInput,
            password: this.state.passwordInput,
        })
        .then(response  => response.data)
        .then(async result => {
            if (result.length > 0){
                console.log(`logged as ${result[0].name}`);
                await this.props.handleLoggedIn(true, result[0].name);
            } else {
                this.setState({
                    loginButtonColor: 'tomato',
                    loginButtonText: 'Login failed',
                });
            }
        })
    }
    
    componentDidMount(){
        this.props.handleGoLogin(true);    
    };
    componentWillUnmount(){
        this.props.handleGoLogin(false);
    };
    render(){

        const {classes} = this.props;
        const themeLoginButton = createMuiTheme({
            overrides: {
              MuiButton: {
                root: {
                  background: this.state.loginButtonColor,
                  borderRadius: 0,
                  border: 0,
                  color: 'white',
                  height: 30,
                  '&:hover': {
                      backgroundColor: '#838e99',
                      color: "#fff"
                  },
                  outline: "none",
                },
        
              },
            },
        });
        return (
        <div>
            <div className={classes.introduction}>
                <Typography component="h2" variant="h1" gutterBottom className={classes.introductionTextUp}>
                    This is <b>bikeysh</b> - compact application which <b><i>scores</i></b> offers from bike parts market
                    and shows <b><i>the best</i></b> ones for specific category. 
                </Typography>
                <Typography component="h4" gutterBottom className={classes.introductionTextDown}> 
                    Build with <span>React.js</span>&nbsp;<i className="fab fa-react" style={{color: '#61DAFB', fontSize: '1rem'}}/>
                    &nbsp;|&nbsp;Node.js&nbsp;
                    <i class="fab fa-node-js" style={{color: "#90C53F", fontSize: '1rem'}}/>
                    &nbsp;|&nbsp;MongoDB&nbsp;and&nbsp;Material-UI
                
                </Typography>
                <MuiThemeProvider theme={themeFeaturesButton}>
                    <Button size="small" onClick={() => {this.handleClickShowFeatures(true)}}>
                        Show features
                    </Button>
                </MuiThemeProvider>
            </div>
            {/* //<<LOGIN FORM */}
            <Paper className={classes.loginForm} elevation={10} square="true">
                <Grid container justify="center" alignContent="center">
                        <Grid item xs={12} className={classes.demoTextElement} >
                            <Typography component="h4" gutterBottom>Demo version</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.loginElement}>
                            <br/>
                        </Grid>
                        <Grid item xs={12} className={classes.loginElement}>
                            <FormControl>
                                <MuiThemeProvider theme={themeInput}>
                                <Input
                                    placeholder="username" defaultValue={this.state.login}
                                    disableUnderline={false}
                                    onChange={this.handleInputUsername}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <AccountCircle/>
                                    </InputAdornment>
                                    }
                                    onKeyUp={()=>{}}
                                />
                                </MuiThemeProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.loginElement}>
                            <FormControl>
                                <MuiThemeProvider theme={themeInput}>
                                <Input
                                    placeholder="password" defaultValue={this.state.password}
                                    disableUnderline={false}
                                    type='password'
                                    onChange={this.handleInputPassword}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <VpnKey/>
                                    </InputAdornment>
                                    }
                                    onKeyUp={()=>{}}
                                />
                                </MuiThemeProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}><br/></Grid>
                        <Grid item xs={12}>
                            <MuiThemeProvider theme={themeLoginButton}>
                                <Button 
                                    fullWidth="true" 
                                    autoCapitalize="false" 
                                    style={{outline: "none",}}
                                    onClick={this.handleLogin}
                                >
                                    {this.state.loginButtonText}
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                </Grid>
            </Paper>
            {/* //>> LOGIN FORM */}
            <ImageLightBox 
                open={this.state.fullscreenOpen}
                close={this.handleClickShowFeatures}
                picArray={this.state.picArray}
            />
            <div 
                className={classes.loginBackground} 
            />
        </div>
        )   
    }
}


export default withStyles(styles)(withRouter(LoginPage));