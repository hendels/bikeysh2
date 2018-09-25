import React from 'react';
import BestOffer from '../../components/Offers/BestOffer/BestOffer.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const BestOfferBar = (props) => (
    props.offerCount.map(offer => {  
        var index = props.offerCount.indexOf(offer);  
        return(
        <Aux>
        <Grid key={offer} item>       
            {index === 0 ? (
            <Aux>
                <CardHeader
                    action={
                        <Aux>
                            <Button>+3</Button>
                            <Button>-3</Button>
                        </Aux>
                    }
                />
                <Card >
                    <CardContent>
                    <Typography component="h1">
                        {props.category} Category
                    </Typography>
                    </CardContent>
                </Card> 
            </Aux>
            ): null}
        </Grid>
        <Grid key={offer._id} item>   
            <BestOffer offer={offer} fetchUrl={props.fetchUrl} tagUrl={props.tagUrl} category={props.category} />
        </Grid>
        </Aux>
        )
        }
)
)

export default BestOfferBar;