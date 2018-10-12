import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import pageInfoStyle from '../../styles/components/landingButtonStyle.jsx';
import Grid from '@material-ui/core/Grid';
import BigSquareButton from './BigSquareButton.jsx';
import {Link} from 'react-router-dom';

class LandingButton extends React.Component {
    render (){
    const { classes } = this.props;
    return(
        <Grid container direction="row" justify="space-between" alignItems="center" spacing="0" 
            className={classes.container} 
            style={{
                background: `#000 url(${this.props.imageUrl})`,
                backgroundPosition: `${this.props.tweak}`,
                backgroundAttachment: `fixed`,
            }}
        >   
            <div className={classes.colorOverlay}></div>
            <Grid item>
                {/* <BigSquareButton/> */}
            </Grid>
            <Grid item className={classes.list}>
                <h3 className={classes.title}>{this.props.pageInfoTitle}</h3>
            </Grid>
            <Grid item>
                {/* <Link to={this.props.linkTo}> */}
                        <BigSquareButton component={Link} to={this.props.toLink} />
                {/* </Link> */}
            </Grid>
        </Grid>
    )}
}

export default withStyles(pageInfoStyle)(LandingButton);