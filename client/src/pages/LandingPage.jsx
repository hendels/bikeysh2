import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import landingPageStyle from '../styles/components/landingPageStyle.jsx';
//app components
import LandingBar from '../components/Buttons/LandingBar.jsx';

const LandingPage = (props) => {
    return (
        <div>
            <LandingBar 
                imageUrl={props.imageUrls.bestOfferImage.url} 
                pageInfoTitle={`Best Offers`} 
                pushTo="/bestoffers"
            />
            <LandingBar 
                imageUrl={props.imageUrls.dhframesImage.url} 
                pageInfoTitle={`Downhill Frames`} 
                pushTo="/category/dhframes"
            />
            <LandingBar 
                imageUrl={props.imageUrls.cranksImage.url} 
                pageInfoTitle={`Cranks`} 
                pushTo="/category/cranks"
            />
            <LandingBar 
                imageUrl={props.imageUrls.hubsImage.url} 
                pageInfoTitle={`Hubs`} 
                pushTo="/category/hubs"
            />
            <LandingBar 
                imageUrl={props.imageUrls.enduroframesImage.url} 
                pageInfoTitle={`Enduro Frames`} 
                pushTo="/category/enduroframes"
            />
            <LandingBar 
                imageUrl={props.imageUrls.wheelsImage.url} 
                pageInfoTitle={`Wheels`} 
                pushTo="/category/wheels"
            />
        </div>
    )
}

export default withStyles(landingPageStyle)(LandingPage);