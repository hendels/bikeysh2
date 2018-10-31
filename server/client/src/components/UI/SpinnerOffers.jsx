import React from 'react';
import classes from './Spinner.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BestOffer from '../../components/Offers/BestOffer/BestOfferCustom.jsx';
import Aux from '../../hoc/Ax/Ax';
const styles = theme => ({
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
        width: '200px',
        flexDirection: 'row',
        // width: '100%',
    },
});
const Spinner = (props) => {
    let offer = {};
    let offers = [];
    for(let i = 0; i < props.pageLimit; i++){
        offer ={_id: `dummy`, title: "dummy"}
        offers.push(offer);
    }
    const dummies = offers.map(dummy => {
        return(<Grid item><BestOffer offer={offer}/></Grid>)
        // return(<div className={classes.LoaderOffers}></div>)
        // return(<div className={styles.root}></div>)
    })
    return(
        <Aux>
            {dummies}
        </Aux>
    )
}

export default (Spinner);