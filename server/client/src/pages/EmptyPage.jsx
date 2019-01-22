import React from 'react';
import {withRouter} from 'react-router-dom';
import {Paper, Grid, Typography, Button, MuiThemeProvider} from '@material-ui/core';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import generalPageStyle from '../styles/components/generalPageStyle.jsx';
//app components
import LandingButton from '../components/Buttons/LandingButton.jsx';

const styles = theme => ({
    paper: {
        position: 'relative',
        left: '50%',
        color: "white",
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: `repeating-linear-gradient(
          -45deg,
          #C96567,
          #C96567 22px,
          #9E5A63 22px,
          #9E5A63 44px
        )`,
        zIndex: 1,
        padding: "10px 10px 10px 10px",
      },
})
const themeLoginButton = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: '#314455',
          borderRadius: 3,
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
  
const EmptyPage = (props) => {
    const {classes} = props;
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Paper className={classes.paper} elevation={10} square="true">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={10}>
                        <Typography component="h2" variant="h1" gutterBottom style={{color: '#fff', textShadow: `1px 1px #000`}}>
                            Please login into application.
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <MuiThemeProvider theme={themeLoginButton}>
                            <Button size="small" onClick={()=>{
                                props.history.push(`/login`)}}
                            >Login</Button>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
            </Paper>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default withStyles(styles)(withRouter(EmptyPage));