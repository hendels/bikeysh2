import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import generalPageStyle from '../styles/components/generalPageStyle.jsx';
//app components
import LandingButton from '../components/Buttons/LandingButton.jsx';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      
    },
  });

  
const LandingPage = (props) => {
    const {classes} = props;
    return (
        <div>
            <Link to="/home">
                <LandingButton 
                    imageUrl={props.imageUrls.defaultImage.url} 
                    pageInfoTitle={`Best Offers`} 
                    tweak={props.imageUrls.defaultImage.tweak}
                    linkTo={'/home'}
                />
            </Link>
            <Link to="/category/dhframes">
            <LandingButton 
                imageUrl={props.imageUrls.dhframesImage.url} 
                pageInfoTitle={`Downhill Frames`} 
                tweak="120px 0px"
            />
            </Link>
            <Link to="/category/cranks">
                <LandingButton 
                    imageUrl={props.imageUrls.cranksImage.url} 
                    pageInfoTitle={`Cranks`} 
                    tweak="0px 0px"
                />
            </Link>
            <Link to="/category/hubs">
                <LandingButton 
                    imageUrl={props.imageUrls.hubsImage.url} 
                    pageInfoTitle={`Hubs`} 
                    tweak="0px 0px"
                />
            </Link>
            <Link to="/category/enduroframes">
                <LandingButton 
                    imageUrl={props.imageUrls.enduroframesImage.url} 
                    pageInfoTitle={`Enduro Frames`} 
                    tweak="0px 0px"
                />
            </Link>
            <Link to="/category/wheels">
                <LandingButton 
                    imageUrl={props.imageUrls.wheelsImage.url} 
                    pageInfoTitle={`Wheels`} 
                    tweak='0px 300px'
                />
            </Link>
        </div>
        // <Paper className={classes.containerBackground} elevation={1} square="true">
        //     <br/>
        //     <br/>
        // </Paper>
    )
}

export default withStyles(generalPageStyle)(LandingPage);