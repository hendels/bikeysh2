import React from 'react';
import {withRouter} from 'react-router-dom';
import {Paper, Grid, Typography, Button, MuiThemeProvider} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
//styles
import emptyPageStyle from '../styles/pages/emptyPageStyle';
import {themeLoginButton} from '../styles/pages/emptyPageStyle';

  
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

export default withStyles(emptyPageStyle)(withRouter(EmptyPage));