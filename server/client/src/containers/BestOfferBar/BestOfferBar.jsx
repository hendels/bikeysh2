import React from 'react';
import BestOffer from '../../components/Offers/BestOffer/BestOffer.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const BestOfferBar = (props) => (
    props.offerCount.map(offer => {  
        var index = props.offerCount.indexOf(offer);  
        console.log(`index : ${index} len : ${props.offerCount.length}`);
        return(
        <Aux>
        {index === 0 ? (
        <Grid key={offer} item>       
            <Aux>
                <Card >
                    <CardContent>
                    <Typography component="h1">
                        {props.category} Category
                    </Typography>
                    </CardContent>
                </Card> 
            </Aux>
        </Grid>
        ): null}
        <Grid key={offer._id} item>   
            {/* <Paper>elo</Paper> */}
            <BestOffer offer={offer} fetchUrl={props.fetchUrl} tagUrl={props.tagUrl} category={props.category} />
        </Grid>
        
        {index + 1 === props.offerCount.length ? (
        <Grid key={`lastButton`} item>   
            {/* <Paper>elo</Paper> */}
            <Button>{`>>`}</Button>
        </Grid>
        ) : null}
        </Aux>
        )
        }
)
)

export default BestOfferBar;