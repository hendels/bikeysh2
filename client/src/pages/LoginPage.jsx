import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
//@mui
import {Grid, Paper, Input, Button, createMuiTheme, FormControl, InputAdornment, CircularProgress, Typography} from '@material-ui/core';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {AccountCircle, VpnKey } from '@material-ui/icons/';
//app components
import ImageLightBox from '../components/ImageLightbox/ImageLightBox.jsx';
//styles
import loginPageStyle from '../styles/pages/loginPageStyle';
import {themeInput, themeProgress, themeFeaturesButton} from '../styles/pages/loginPageStyle';

const captions = {
    rwd: `It's fully responsive.`,
    login: `Basic authentication based on previously created combination of user & password on server side.`,
    search: "Search offers by item / manufacturer / model name.",
    tags: 'Insert / delete tags by Drag & drop view and add them manually.',
    details: 'Check the details about best offer easily.',
    favorites: 'Add offers to favorites.',

}
class LoginPage extends React.Component {
    state = {
        fullscreenOpen: false,
        picArray: [
            {src: 'https://i.imgur.com/h5DP5G3.gif', caption: captions.rwd},
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
        loading: false,
        loginButtonColor: '#314455',
        loginButtonText: 'Login',
    };
    handleClickShowFeatures = (fullscreen) => {
        this.setState({
          fullscreenOpen: fullscreen, 
        }, ()=> {});
    };
    handleInputUsername = ({target}) => {
        this.setState({
            loginInput: target.value,
            loginButtonColor: '#314455',
            loginButtonText: 'Login',
        });
    };
    handleInputPassword = ({target}) => {
        this.setState({
            passwordInput: target.value,
            loginButtonColor: '#314455',
            loginButtonText: 'Login',
        });
    };
    handleLogin = async () => {
        this.setState({loading: true,});
        await axios.post(`/api/authenticate`, {
            login: this.state.loginInput,
            password: this.state.passwordInput,
        })
        .then(response  => response.data)
        .then(async result => {
            if (result.length > 0){
                await this.props.handleLoggedIn(true, result[0].name);
                this.setState({loading: false})
            } else {
                this.setState({
                    loginButtonColor: 'tomato',
                    loginButtonText: 'Login failed',
                    loading: false,
                }, ()=>{
                    this.forceUpdate(()=>{});
                });
            }
        })
    }
    handleKeyUpEnter = (event) => {
        if(event.keyCode === 13){
            this.handleLogin(); 
            // this.props.history.push('/offers/searchresult');
            // window.scrollTo(0, 0);
        };
      };
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
                                    onKeyUp={this.handleKeyUpEnter}
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
                                    onKeyUp={this.handleKeyUpEnter}
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
                                    // style={{outline: "none",}}
                                    onClick={this.handleLogin}
                                >
                                    {this.state.loading ? 
                                    <MuiThemeProvider theme={themeProgress}>
                                        <CircularProgress size={23}/> 
                                    </MuiThemeProvider>
                                    : this.state.loginButtonText}
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


export default withStyles(loginPageStyle)(withRouter(LoginPage));