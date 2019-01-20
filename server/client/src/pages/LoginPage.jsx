import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        // flexGrow: 1,
        background: '#C96567',
        overflowX: 'hidden',
        paddingTop: '5px',
        paddingBottom: '5px',
      },
      paper: {
        height: 140,
        width: 100,
      },
      loginBackground: {
        height: 800,
        // width: 1700,
        background: `#000 url(http://www.fullhdwpp.com/wp-content/uploads/Bicycling-Downhill_www.FullHDWpp.com_.jpg?x69613)`,
        backgroundPosition: `0px 0px`,
        backgroundAttachment: `fixed`,
        filter: 'grayscale(90%)',
      },
})
class LoginPage extends React.Component {
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        //nextProps.handleGoLogin();
    }
    componentDidMount(){
        this.props.handleGoLogin();    
    }
    render(){

        const {classes} = this.props;
        
        return (
        <div className={classes.loginBackground} >
            <Paper className={classes.paper} elevation={10}>
                <br/>
                <br/>
                <br/>
                <br/>
                asd
                asd
                qwe
                qwe
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
    
            </Paper>
        </div>
        )   
    }
}


export default withStyles(styles)(LoginPage);