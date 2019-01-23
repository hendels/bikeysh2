import React from 'react';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
//styles
import containerStyle from '../../styles/components/offerListStyle';
//icons
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';

const OfferListPagination = (props) => {
    const {classes} = props;
    let disableLeft = props.show <= props.showPerPage;
    let disableRight = props.show >= props.total;
    return(
        <Grid container justify="flex-end" alignContent="center" className={classes.containerOfferList}>
            <Grid item>
                <Typography 
                    style={{marginTop: "15px"}} 
                    headlineMapping="h4" 
                    align="center"
                >
                    {`${props.show} of ${props.total}`}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton disabled={disableLeft} variant="outlined" onClick={props.firstPage}>
                    <FirstPage/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton disabled={disableLeft} variant="outlined" onClick={props.previous}>
                    <ChevronLeft/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton disabled={disableRight} variant="outlined" onClick={props.next}>
                    <ChevronRight/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton disabled={disableRight} variant="outlined" onClick={props.lastPage}>
                    <LastPage/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default withStyles(containerStyle)(OfferListPagination);