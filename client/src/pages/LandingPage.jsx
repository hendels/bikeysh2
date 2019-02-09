import React from 'react';
//app components
import LandingBar from '../components/Bars/LandingBar';

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

export default LandingPage;