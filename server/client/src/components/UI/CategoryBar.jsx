
import React from 'react';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import Aux from '../../hoc/Ax/Ax';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// # style
import categoryBarStyle from "../../styles/components/categoryBarStyle.jsx";


const styles = theme => ({
    root: {
      background: '#677784',
    },
});

class CategoryBar extends React.Component {

    render(){
        return(
            <Aux>
                <Grid item>
                    <Card >
                        <CardContent style={{background: '#677784'}}>
                        <Typography component="h1">
                            {this.props.category} + option 'reveal all offers' + arrows which will show next 8 => var offers
                        </Typography>
                        {/* <Button>Reveal all</Button> */}
                        </CardContent>
                    </Card> 
                </Grid>
            </Aux>
        )
        }
    }

export default withStyles(styles)(CategoryBar);