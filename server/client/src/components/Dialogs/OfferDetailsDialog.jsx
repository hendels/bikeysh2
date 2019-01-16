import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageStepper from '../ImageStepper/ImageStepper.js';
import blue from '@material-ui/core/colors/blue';
import TranslateButton from '../Buttons/TranslateButton.jsx';
import TagButton from '../Buttons/TagButton.jsx';
import FavoriteButton from '../FavButton/FavButtonBikeMarkt.jsx';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Http';
import ImageLightBox from '../ImageLightbox/ImageLightBox.jsx';
import Aux from '../../hoc/Ax/Ax';

const themePaper = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        background: `repeating-linear-gradient(
          -45deg,
          #697684,
          #697684 22px,
          #5a6671 22px,
          #5a6671 44px
        )`,
        outline: "none",
      },
    },
    MuiDialogContent:{
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }
    },
    MuiDialogTitle:{
      root:{
        fontSize: "18px",
        color: "#fff",
        fontWeight: "bold",
        textShadow: `1px 1px #314455`,
      }
    },
    MuiAvatar: {
      root: {
        fontSize: `20px`,
        fontFamily: `Lobster`,
        textShadow: `1px 1px #314455`,
      },
    },
  },
});
const themeCancelButton = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#314455',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0px 30px 0px 30px',
        '&:hover': {
            backgroundColor: '#838e99'
        },
      },
    },
  },
});
const styles = {
    dialog: {
      maxWidth: "700px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
    },
    priceContainer: {
      width: "200px",
      height: "50px",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: "10px 15px 10px 5px",
      fontSize: "20px",
      fontWeight: "bold",
    },
    statsContainer: {
      width: "200px",
      height: "255px",
      backgroundColor: "rgba(151, 170, 189, 0.2)",
      padding: "10px 0px 10px 5px",
      fontSize: "14px",
    },
    actionContainer: {
      width: "200px",
      height: "64px",
      backgroundColor: "rgba(151, 170, 189, 0.4)",
      padding: "10px 0px 10px 5px",
    },
};

class OfferDetails extends React.Component {
    state = {
      loading: false,
      description: this.props.offer.description,
      statistics: {
        countOffers: 0,
        currency: null,
        avgPrice: 0,
        median: 0,
        manufacturerSetId: 0,
        modelSetId: 0,
      },
      fullscreenOpen: false,
      picArray: [],
    }
    handleClose = () => {
      this.props.close();
    };
    handleTranslate = async (toTranslate, language) => {
      await axios.post(`/api/translate`, {
        toTranslate: toTranslate,
        language: language,
      }).then(response => response.data).then(async result => {
        this.setState({description: result}, ()=> {
          this.forceUpdate()
        });
      }); 
    }; 
    handleClickTranslationButton = (language) => {
      this.handleTranslate(this.props.offer.description, language);
    };
    handleClickImageFullscreenButton = (fullscreen, picArray) => {
      this.setState({
        fullscreenOpen: fullscreen, 
        picArray: picArray !== undefined ? picArray : this.state.picArray
      }, ()=> {});
    };
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
    };
    dummy = () => {};
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
        };
    };
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      return (
        <Aux>
        <MuiThemeProvider theme={themePaper}>
        
        <Dialog 
          onClose={this.handleClose} 
          // maxWidth="true" 
          className={classes.dialog}
          PaperProps={{square: true}} 
          PaperComponent
          // PaperProps={{className: classes.paper, square: true}} 
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          {...other}
        >
          <DialogTitle id="offerDetails" disableTypography>
            <Grid container direction="row" justify="space-between" alignContent="center">
              <Grid item xs={11}>
                <Typography variant="h1">
                  {this.props.offer.title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Avatar>
                  {parseFloat(this.props.scores).toFixed(1)}
                </Avatar>
              </Grid>
            </Grid>
          </DialogTitle>
            <DialogContent>
              <Grid container justify='space-between' alignContent='center' spacing={0}>
                <Grid item xs={8}>
                  <ImageStepper
                    offer={this.props.offer}
                    openFullscreen={this.handleClickImageFullscreenButton}
                  />
                </Grid>
                  
                <Grid item xs={4}>
                  <DialogContentText>
                    {
                    <Grid container direction="row" justify="space-between" alignContent="center">
                      <Grid item xs={12} className={classes.priceContainer}>
                          <span>{this.props.offer.price}</span>
                      </Grid>
                      <Grid item xs={12} className={classes.statsContainer}>
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
                      </Grid>
                      <Grid item xs={12} className={classes.actionContainer}>
                          <Grid container justify="space-between" alignContent="center">
                            <Grid item xs={4}>
                              <FavoriteButton 
                                dataKey={this.props.offer._id} 
                                favorite={this.props.offer.favorite} 
                                fetchUrl={this.props.fetchUrl} 
                                model={this.props.model}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TagButton 
                                category={this.props.category} 
                                model={this.props.model}
                                offer={this.props.offer} 
                                tagUrl={this.props.tagUrl}
                                parentStatistics
                                disableStatistics={this.dummy}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <IconButton 
                                  href={this.props.offer.productUrl} 
                                  target={`_blank`} 
                                  style={{outline: "none",}}
                              >
                                  <InfoIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                    }
                  </DialogContentText>
                </Grid>
                <Grid item xs={12}>
                    <TranslateButton 
                      eng={() => this.handleClickTranslationButton('eng')} 
                      pl={() => this.handleClickTranslationButton('pl')} 
                      de={() => this.handleClickTranslationButton('de')}
                    />
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText>
                    {`${this.state.description}`}
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
          <DialogActions>
            <MuiThemeProvider theme={themeCancelButton}>
              <Button onClick={this.handleClose}>
                Close
              </Button>
            </MuiThemeProvider>
          </DialogActions>
        </Dialog>
        </MuiThemeProvider>
        <ImageLightBox 
          open={this.state.fullscreenOpen}
          close={this.handleClickImageFullscreenButton}
          picArray={this.state.picArray}
        />
        </Aux>
      );
    }
}
  
OfferDetails.propTypes = {
classes: PropTypes.object.isRequired,
onClose: PropTypes.func,
selectedValue: PropTypes.string,
};

export default withStyles(styles)(OfferDetails);