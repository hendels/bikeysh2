import React from 'react';
import BestOffer from '../../components/Offers/BestOffer/BestOffer.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Paper from '@material-ui/core/Paper';
//app components
import CategoryInfo from '../../components/UI/CategoryInfoCard.jsx';
// # icons
import Arrow from '@material-ui/icons/KeyboardArrowRight';

const BestOfferBar = (props) => (
    props.offerCount.map(offer => {  
        var index = props.offerCount.indexOf(offer);  
        console.log(`index : ${index} len : ${props.offerCount.length}`);
        return(
        <Aux>
        {index === 0 ? (
        <Grid key={'categoryInfo'} item>       
            <CategoryInfo category={props.category}/>
        </Grid>
        ): null}
        <Grid key={offer._id} item>   
            {/* <Paper>elo</Paper> */}
            <BestOffer offer={offer} fetchUrl={props.fetchUrl} tagUrl={props.tagUrl} category={props.category} />
        </Grid>
        
        {index + 1 === props.offerCount.length ? (
        <Grid key={`lastButton`} item>   
            {/* <Paper>elo</Paper> */}
            <Button variant="fab" ><Arrow/></Button>
        </Grid>
        ) : null}
        </Aux>
        )
        }
)
)

export default BestOfferBar;