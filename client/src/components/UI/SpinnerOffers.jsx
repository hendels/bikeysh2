import React from 'react';
import {Grid} from '@material-ui/core';
import BestOffer from '../../components/Offers/BestOffer/BestOfferCustom.jsx';
import Aux from '../../hoc/Ax/Ax';


const Spinner = (props) => {
    let offer = {};
    let offers = [];
    for(let i = 0; i < props.pageLimit; i++){
        offer ={key:`dummy${i}`, _id: `dummy`, title: "dummy"}
        offers.push(offer);
    }
    const dummies = offers.map(dummy => {
        return(
            <Grid 
                item 
                xs={props.xs}
            >
                <BestOffer 
                    key={offer.key} 
                    offer={offer} 
                    useLoader
                />
                </Grid>
            )
    })
    return(
        <Aux>
            {dummies}
        </Aux>
    )
}

export default (Spinner);