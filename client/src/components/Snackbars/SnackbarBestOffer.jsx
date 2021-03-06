import React from 'react';
import axios from 'axios';
//@mui
import { withStyles } from '@material-ui/core/styles';
import {Button, Snackbar, Grid} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import snackbarStyle from '../../styles/components/Snackbars/snackbarStyle';
import {themeCancelButton} from '../../styles/components/Snackbars/snackbarStyle';

class SnackbarBestOffer extends React.Component {
  state = {
    statistics: {
      countOffers: 0,
      currency: null,
      avgPrice: 0,
      median: 0,
      manufacturerSetId: 0,
      modelSetId: 0
    }
  }

  getScoringData = async () => {
        await axios.get(`/api/statistics/similiarOffers/${this.props.manufacturerSetId}/${this.props.modelSetId}`)
          .then(response  => response.data).then(result => {
            let statistics = {
              countOffers: result.scoreStats.countOffers,
              currency: result.scoreStats.currency,
              avgPrice: result.scoreStats.avgPrice,
              median: result.scoreStats.median,
            }
            this.setState({statistics: statistics}, () => {});
      });
  }
  componentWillReceiveProps(nextProps){
    if (!nextProps.searchPending)
      if((nextProps.manufacturerSetId !== 0 && nextProps.modelSetId !== 0) && 
      (nextProps.manufacturerSetId !== this.state.manufacturerSetId || nextProps.modelSetId !== this.state.modelSetId) ){
        this.setState({
          manufacturerSetId: nextProps.manufacturerSetId, 
          modelSetId: nextProps.modelSetId
        }, () => {
          this.getScoringData();
        })
      } 
  }
  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        open={this.props.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center',}}
        transitionDuration={{ enter: 0, exit: 0,}}
        autoHideDuration={1000}
        onClose={this.props.close}
        ContentProps={{
            square: true,
            className: classes.snackbarContent,
        }}
        message={
          <Grid container direction="row" justify="space-between" alignContent="center">
          <Grid item xs={7}>
            <span style={{fontWeight: "bold"}}>Price:</span>
            </Grid>
            <Grid item xs={5}>
              {this.props.price} {this.state.statistics.currency}
            </Grid>
            <Grid item xs={12}>
              <br/>
            </Grid>
            <Grid item xs={12}>
              <span style={{fontWeight: "bold"}}>Offer based on:</span>
            </Grid>
            <Grid item xs={7}>
              Similar offers:
            </Grid>
            <Grid item xs={5}>
              {this.state.statistics.countOffers}
            </Grid>
            <Grid item xs={7}>
              Average price:
            </Grid>
            <Grid item xs={5}>
              {this.state.statistics.avgPrice} {this.state.statistics.currency}
            </Grid>
            <Grid item xs={7}>
              Median for {this.props.itemState}:
            </Grid>
            <Grid item xs={5}>
              ADD
            </Grid>
            <Grid item xs={7}>
              It's cheaper by:
            </Grid>
            <Grid item xs={5}>
              {parseFloat(this.state.statistics.avgPrice-this.props.price).toFixed(0)} {this.state.statistics.currency}
            </Grid>
            <Grid item xs={12}>
              <br/>
            </Grid>
            <Grid item xs={12}>
              <MuiThemeProvider theme={themeCancelButton}>
                <Button fullWidth="true" onClick={this.props.showOfferDetailsDialog}>Details</Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        }
        className={classes.snackbar}
      />
    );
  }
}
export default withStyles(snackbarStyle)(SnackbarBestOffer);