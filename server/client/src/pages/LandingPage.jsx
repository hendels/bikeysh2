import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import generalPageStyle from '../styles/components/generalPageStyle.jsx';
//app components
import LandingButton from '../components/Buttons/LandingButton.jsx';

const styles = theme => ({});

  
const LandingPage = (props) => {
    return (
        <div>
            <Link to="/bestoffers" style={{textDecoration: "none"}}>
                <LandingButton 
                    imageUrl={props.imageUrls.defaultImage.url} 
                    pageInfoTitle={`Best Offers`} 
                    tweak={props.imageUrls.defaultImage.tweak}
                    linkTo={'/bestoffers'}
                />
            </Link>
            <Link to="/category/dhframes" style={{textDecoration: "none"}}>
            <LandingButton 
                imageUrl={props.imageUrls.dhframesImage.url} 
                pageInfoTitle={`Downhill Frames`} 
                tweak="120px 0px"
            />
            </Link>
            <Link to="/category/cranks" style={{textDecoration: "none"}}>
                <LandingButton 
                    imageUrl={props.imageUrls.cranksImage.url} 
                    pageInfoTitle={`Cranks`} 
                    tweak="0px 0px"
                />
            </Link>
            <Link to="/category/hubs" style={{textDecoration: "none"}}>
                <LandingButton 
                    imageUrl={props.imageUrls.hubsImage.url} 
                    pageInfoTitle={`Hubs`} 
                    tweak="0px 0px"
                />
            </Link>
            <Link to="/category/enduroframes" style={{textDecoration: "none"}}>
                <LandingButton 
                    imageUrl={props.imageUrls.enduroframesImage.url} 
                    pageInfoTitle={`Enduro Frames`} 
                    tweak="0px 0px"
                />
            </Link>
            <Link to="/category/wheels" style={{textDecoration: "none"}}>
                <LandingButton 
                    imageUrl={props.imageUrls.wheelsImage.url} 
                    pageInfoTitle={`Wheels`} 
                    tweak='0px 300px'
                />
            </Link>
        </div>
    )
}

export default withStyles(generalPageStyle)(LandingPage);