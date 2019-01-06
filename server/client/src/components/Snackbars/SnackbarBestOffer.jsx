import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//mgt

const styles = theme => ({
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
      minWidth: 205,
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
          <ul style={{listStyleType: 'none'}}>
              <li ><b>Offer based on:</b></li>
              <li >{this.state.statistics.countOffers} similar offers</li>
              <li >average price is : {this.state.statistics.avgPrice} {this.state.statistics.currency}</li>
              <li >median for {this.props.itemState} is : {this.state.statistics.avgPrice} {this.state.statistics.currency}</li>
              <li >
                it's cheaper by: 
                {parseFloat(this.state.statistics.avgPrice-this.props.price).toFixed(0)} {this.state.statistics.currency}
              </li>
          </ul>
        }
        className={classes.snackbar}
      />
    );
  }
}
export default withStyles(styles)(SnackbarBestOffer);