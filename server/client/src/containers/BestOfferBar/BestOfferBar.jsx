import React from 'react';
import BestOffer from '../../components/Offers/BestOffer/BestOffer.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




const BestOfferBar = (props) => (
    props.offerCount.map(offer => {  
        var index = props.offerCount.indexOf(offer);  
        return(
        <Aux>
        <Grid key={offer} item>       
            {index === 0 ? (
            // <Card className={classes.card}>
            <Card >
                <CardContent>
                <Typography component="h1">
                    {props.category} CATEGRORY
                </Typography>
                </CardContent>
            </Card> 
            ): null}
        </Grid>
        <Grid key={offer} item>   
            <BestOffer id={offer} />
        </Grid>
        </Aux>
        )
        }
)
)

export default BestOfferBar;