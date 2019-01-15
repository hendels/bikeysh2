import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//mgt

const styles = theme => ({
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
      minWidth: 205,
      textAlign: "left"
  },
  statsContainer: {
    // width: "205px",
    // height: "255px",
    backgroundColor: "rgba(151, 170, 189, 0.9)",
    padding: "10px 0px 10px 5px",
    fontSize: "14px",
  },
});

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
            // console.log(result.scoreStats);
            let statistics = {
              countOffers: result.scoreStats.countOffers,
              currency: result.scoreStats.currency,
              avgPrice: result.scoreStats.avgPrice,
              median: result.scoreStats.median,
            }
            this.setState({statistics: statistics}, () => {});
      });
  }
  componentWillReceiveProps(){
    if((this.props.manufacturerSetId !== 0 && this.props.modelSetId !== 0) && 
    (this.props.manufacturerSetId !== this.state.manufacturerSetId || this.props.modelSetId !== this.state.modelSetId) ){
      this.setState({
        manufacturerSetId: this.props.manufacturerSetId, 
        modelSetId: this.props.modelSetId
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
            <Grid item item xs={12}>
              <span style={{fontWeight: "bold"}}>Offer based on:</span>
            </Grid>
            <Grid item item xs={7}>
              Similar offers:
            </Grid>
            <Grid item item xs={5}>
              {this.state.statistics.countOffers}
            </Grid>
            <Grid item item xs={7}>
              Average price:
            </Grid>
            <Grid item item xs={5}>
              {this.state.statistics.avgPrice} {this.state.statistics.currency}
            </Grid>
            <Grid item item xs={7}>
              Median for {this.props.itemState}:
            </Grid>
            <Grid item item xs={5}>
              ADD
            </Grid>
            <Grid item item xs={7}>
              It's cheaper by:
            </Grid>
            <Grid item item xs={5}>
              {parseFloat(this.state.statistics.avgPrice-this.props.price).toFixed(0)} {this.state.statistics.currency}
            </Grid>
          </Grid>
        }
        className={classes.snackbar}
      />
    );
  }
}
export default withStyles(styles)(SnackbarBestOffer);