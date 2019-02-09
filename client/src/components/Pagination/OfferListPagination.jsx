import React from 'react';
//@mui
import { withStyles } from '@material-ui/core/styles';

import {IconButton, Grid, Typography} from '@material-ui/core/';
import {ChevronLeft, ChevronRight, FirstPage, LastPage, } from '@material-ui/icons/';
//styles
import paginationStyle from '../../styles/components/Pagination/paginationStyle';

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

export default withStyles(paginationStyle)(OfferListPagination);