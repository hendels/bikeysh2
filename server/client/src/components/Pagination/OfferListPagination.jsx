import React, {Component} from 'react';
import Aux from '../../hoc/Ax/Ax';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//styles
import containerStyle from '../../styles/components/offerListStyle';
//icons
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Filter from '@material-ui/icons/FilterList';
class OfferListPagination extends Component {
    render(){
        const {classes} = this.props;
    return(
        // <Aux>
            <Grid container direction="row" justify="flex-end" alignContent="flex-end" className={classes.containerOfferList}>
                <Grid item>
                    <Button disabled size="medium">{`${this.props.show} of ${this.props.total}`}</Button>
                </Grid>
                <Grid item>
                    <IconButton variant="outlined" onClick={this.props.previous}><FirstPage/></IconButton>
                </Grid>
                <Grid item>
                    <IconButton variant="outlined" onClick={this.props.previous}><ChevronLeft/></IconButton>
                </Grid>
                <Grid item>
                    <IconButton variant="outlined" onClick={this.props.next}><ChevronRight/></IconButton>
                </Grid>
                <Grid item>
                    <IconButton variant="outlined" onClick={this.props.next}><LastPage/></IconButton>
                </Grid>
                {/* <Grid item> */}
                    {/* [todo] show only with no tag at all */}
                    {/* <IconButton variant="outlined" onClick={this.props.showFilter}><Filter/></IconButton> */}
                {/* </Grid> */}
                {/* <p>{this.state.skip} of {totalArray}</p>
                <p>filter favs / without tags</p>
                <p>add big arrow with back to home property and statistics below for cat</p> */}
            </Grid>
        // </Aux>
    )
    }
}

export default withStyles(containerStyle)(OfferListPagination);