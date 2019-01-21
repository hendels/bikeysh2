import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Paper, Input, Button, createMuiTheme} from '@material-ui/core';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const themeInput = createMuiTheme({
    overrides: {
        MuiInput:{
            root: {
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: "10px 0px 10px 0px",
            },
            input: {
                background: "#fff",
                padding: "10px 0px 10px 0px",
                border: "1px solid black"
            }
        }
    }
});
const themeLoginButton = createMuiTheme({
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
const styles = theme => ({
    paper: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        background: `repeating-linear-gradient(
          -45deg,
          #C96567,
          #C96567 22px,
          #9E5A63 22px,
          #9E5A63 44px
        )`,
        zIndex: 2,
      },
    loginBackground: {
        height: 800,
        overflowY: 'hidden',
        // width: 1700,
        background: `#000 url(http://www.fullhdwpp.com/wp-content/uploads/Bicycling-Downhill_www.FullHDWpp.com_.jpg?x69613)`,
        backgroundPosition: `0px 0px`,
        backgroundAttachment: `fixed`,
        filter: 'grayscale(90%)',
      },
    introduction:{
        position: 'fixed',
        top: '20%',
        left: '7%',
        width: 500,
        height: 100,
        // border: "1px solid #000",
        zIndex: 3,
    }
})
class LoginPage extends React.Component {
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        //nextProps.handleGoLogin();
    }
    componentDidMount(){
        this.props.handleGoLogin(true);    
    }
    componentWillUnmount(){
        this.props.handleGoLogin(false);
    }
    render(){

        const {classes} = this.props;
        
        return (
        <div>
            <div className={classes.introduction}>
            <Typography component="h2" variant="h1" gutterBottom>
                This is bikeysh - small application which picks best offers from the bike parts market and scores them.
            </Typography>
            </div>
            <Paper className={classes.paper} elevation={10} square="true">
                <Grid container justify="center" alignContent="center">
                    <MuiThemeProvider theme={themeInput}>
                        <Grid item xs={12}>
                            <Typography component="h2" variant="h1" gutterBottom>Demo version</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Input placeholder="Username" autoComplete="sa"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Input type="password" placeholder="Password" autoComplete="qwe123"/>
                        </Grid>
                        <Grid item xs={12}><br/></Grid>
                        <Grid item xs={12}>
                            <MuiThemeProvider theme={themeLoginButton}>
                                <Button fullWidth="true" autoCapitalize="false" component={Link} to="/">Login</Button>
                            </MuiThemeProvider>
                        </Grid>
                    </MuiThemeProvider>
                </Grid>
    
            </Paper>
            <div className={classes.loginBackground} />
        </div>
        )   
    }
}


export default withStyles(styles)(LoginPage);