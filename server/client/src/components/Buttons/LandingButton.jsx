import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import pageInfoStyle from '../../styles/components/landingButtonStyle.jsx';
import Grid from '@material-ui/core/Grid';
import BigSquareButton from './BigSquareButton.jsx';
import {Link} from 'react-router-dom';


const LandingButton = (props) => {
    const { classes } = props;
    return(
        <Grid container direction="row" justify="space-between" alignItems="center" spacing="0" 
            className={classes.container} 
            style={{
                background: `#000 url(${props.imageUrl})`,
                backgroundPosition: `${props.tweak}`,
                backgroundAttachment: `fixed`,
            }}
        >   
            <div className={classes.colorOverlay}></div>
            <Grid item>
                {/* empty space to preserve proportions */}
            </Grid>
            <Grid item className={classes.list}>
                <h3 className={classes.title}>{props.pageInfoTitle}</h3>
            </Grid>
            <Grid item>
                <BigSquareButton component={Link} to={props.toLink} />
            </Grid>
        </Grid>
    )
}

export default withStyles(pageInfoStyle)(LandingButton);