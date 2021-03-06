import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//@mui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Avatar, Chip, Dialog, IconButton, DialogActions, Grid, DialogContent, DialogContentText,
  DialogTitle, Button, Typography } from '@material-ui/core';
  
import HttpIcon from '@material-ui/icons/Http';
import { PhotoLibrary } from '@material-ui/icons';
//app commons
import {getDayDifferencesFromToday} from '../../common/common';
import {getPictureArray} from '../../common/common';
//app components
import Aux from '../../hoc/Ax/Ax';
import FavoriteButton from '../Buttons/FavoriteButton';
import ImageStepper from '../ImageStepper/ImageStepper.js';
import ImageLightBox from '../ImageLightbox/ImageLightBox.jsx';
import TagButton from '../Buttons/TagButton.jsx';
import TranslateButton from '../Buttons/TranslateButton.jsx';
//styles
import { withStyles } from '@material-ui/core/styles';
import offerDetailsDialogStyle from '../../styles/components/Dialogs/offerDetailsDialogStyle';
import {themeCancelButton, themePaper} from '../../styles/components/Dialogs/offerDetailsDialogStyle';

let objPictures = {};

class OfferDetails extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        description: props.offer.description,
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
      objPictures = getPictureArray(props.offer);
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
          this.forceUpdate();
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
    getStatisticsData = async () => {
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
    };
    componentWillReceiveProps(nextProps){
      this.forceUpdate();
        if((nextProps.manufacturerSetId !== 0 && nextProps.modelSetId !== 0) && 
        (nextProps.manufacturerSetId !== this.state.manufacturerSetId || nextProps.modelSetId !== this.state.modelSetId) ){
          this.getStatisticsData();
        };

    };
    render() {
      const { classes, onClose, selectedValue, mobileView, ...other } = this.props;
      const countDate = getDayDifferencesFromToday(this.props.offer.publishDate);
      const diffDays = countDate.diffDays;
      const offerDate = countDate.date;

      const themeChipAvailability = createMuiTheme({
        overrides: {
          MuiChip: {
            root: {
              backgroundColor: this.props.offerAvailable ? 
                "#4285F5" : "#C96567",
              color: this.props.offerAvailable ? 
                "#d8ebff" : "#ffcecf",
              textShadow: `1px 1px #314455`,
              borderRadius: "2px",
              fontSize: "12px",
              height: "20px",
            },
      
          },
        }
      })
      let itemStateColor = {};
      switch(this.props.itemCondition){
        case "brand new": itemStateColor = {bg: "#6c9573", font: "#fff"}
          break;
        case "used": itemStateColor = {bg: "#698484", font: "#fff"} 
          break;
        case "used, like new": itemStateColor = {bg: "#698484", font: "#fff"} 
          break;
        case "corrupted": itemStateColor = {bg: "#C96567", font: "#ffcecf"} 
          break;
        default: itemStateColor = {bg: "#3f576d", font: "#fff"} 
          break;

      }
      const themeChipState = createMuiTheme({
        overrides: {
          MuiChip: {
            root: {
              backgroundColor: `${itemStateColor.bg}`,
              color: `${itemStateColor.font}`,
              textShadow: `1px 1px #314455`,
              borderRadius: "2px",
              fontSize: "12px",
              height: "20px",
            },
      
          },
        }
      })
      return (
        <Aux>
        <MuiThemeProvider theme={themePaper}>
        
        <Dialog 
          open={this.props.open}
          onClose={this.handleClose} 
          className={classes.dialog}
          PaperProps={{square: true}} 
          PaperComponent
          scroll="paper"
          fullScreen={mobileView}
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
                {this.state.statistics.countOffers > 0 ? 
                  <Avatar>
                    {parseFloat(this.props.scores).toFixed(1)}
                  </Avatar>
                  : 
                  <Avatar>
                    ?
                  </Avatar>
                }
              </Grid>
            </Grid>
          </DialogTitle>
            <DialogContent>
              <Grid container justify='space-between' alignContent='center' spacing={0}>
                {mobileView ? 
                  null
                  :
                  <Grid item xs={8}>
                    <ImageStepper
                      offer={this.props.offer}
                      openFullscreen={this.handleClickImageFullscreenButton}
                      mobileView={mobileView}
                    />
                  </Grid>
                }
                  
                <Grid item xs={mobileView ? 12 : 4}>
                  <DialogContentText>
                    {
                    <Grid container direction="row" justify="space-between" alignContent="center">
                      <Grid item xs={12} className={classes.priceContainer}>
                          {mobileView ? 
                            <div>
                                {this.props.offer.price} 
                                <p className={classes.priceContainerMobile}>
                                  Offer from: {offerDate} Days on market: {diffDays}
                                </p>
                            </div>
                            : 
                            <div>{this.props.offer.price}</div>
                          }
                      </Grid>
                      {mobileView ? 
                        <Grid item xs={12}>
                          <ImageStepper
                            offer={this.props.offer}
                            openFullscreen={this.handleClickImageFullscreenButton}
                            mobileView={mobileView}
                          />
                        </Grid>  
                      : null}
                      <Grid item xs={12} className={classes.statsContainer}>
                      {this.state.statistics.countOffers > 0 ? ( 
                        <Grid container direction="row" justify="space-between" alignContent="center">
                          <Grid item xs={12}>
                            <div style={{fontWeight: "bold"}}>Offer based on:</div>
                          </Grid>
                          <Grid item xs={6}>
                            Similar:
                          </Grid>
                          <Grid item xs={6}>
                            {this.state.statistics.countOffers}
                          </Grid>
                          <Grid item xs={6}>
                            Avg. price:
                          </Grid>
                          <Grid item xs={6}>
                            {this.state.statistics.avgPrice} {this.state.statistics.currency}
                          </Grid>
                          <Grid item xs={6}>
                            Median: 
                          </Grid>
                          <Grid item xs={6}>
                            {this.state.statistics.median}
                          </Grid>
                          <Grid item  xs={6}>
                            Cheaper by:
                          </Grid>
                          <Grid item xs={6}>
                            {parseFloat(this.state.statistics.avgPrice-this.props.price).toFixed(0)} {this.state.statistics.currency}
                          </Grid>
                        </Grid>
                      ) : <span style={{fontWeight: "bold"}}>This offer currently has no assigned scores</span>
                      
                      }
                      </Grid>
                      <Grid item xs={12} className={classes.attributesContainer}>
                        {this.props.attributes.length > 0 ? (
                          <Grid container direction="row" justify="space-between" alignContent="center">
                            {this.props.attributes.map((attribute) => {
                              let attributePair = null;
                              if (attribute.value !== null && attribute.value !== undefined){
                                  const attributeText = attribute.value.length > 15 ? attribute.value.slice(0, 15) : attribute.value;
                                  attributePair = 
                                    <Aux>
                                      <Grid item xs={6}>
                                        <b>{attribute.label}</b>
                                      </Grid>
                                      <Grid item xs={6}>
                                        {attributeText}
                                      </Grid>
                                    </Aux>
                                  ;
                              }
                              return attributePair;
                            })}
                          </Grid>
                        ) : <span style={{fontWeight: "bold"}}>This offer has no attributes</span>}
                      </Grid>
                      <Grid item xs={12} className={classes.actionContainer}>
                          <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={mobileView ? 3 : 4} className={classes.actionItem}>
                              <FavoriteButton 
                                dataKey={this.props.offer._id} 
                                favorite={this.props.favorite} 
                                fetchUrl={this.props.fetchUrl} 
                                model={this.props.model}
                                setFavorite={this.props.setFavorite}
                              />
                            </Grid>
                            <Grid item xs={mobileView ? 3 : 4} className={classes.actionItem}>
                              <TagButton 
                                category={this.props.category} 
                                model={this.props.model}
                                offer={this.props.offer} 
                                tagUrl={this.props.tagUrl}
                                parentStatistics
                                disableStatistics={()=>{}}
                                mobileView={mobileView}
                                offerDetails
                              />
                            </Grid>
                            <Grid item xs={mobileView ? 3 : 4} className={classes.actionItem}>
                              <IconButton 
                                  href={this.props.offer.productUrl} 
                                  target={`_blank`} 
                                  style={{outline: "none",}}
                              >
                                  <HttpIcon />
                              </IconButton>
                            </Grid>
                            {mobileView ? 
                              <Grid item xs={3} className={classes.actionItem}>
                              <IconButton onClick={() => {
                                objPictures = getPictureArray(this.props.offer);
                                this.handleClickImageFullscreenButton(true, objPictures.fullscreenPicArray);
                              }}
                              >
                                <PhotoLibrary/>
                              </IconButton>
                              </Grid>
                            : null}
                          </Grid>
                      </Grid>
                    </Grid>
                    }
                  </DialogContentText>
                </Grid>

                <Grid item xs={10} className={classes.descriptionHeader}>
                  <Grid container justify="space-between" alignItems="flex-start">
                    {/* // first row */}
                    {!mobileView ? 
                      <Aux>
                        <Grid item xs={3}>
                          Offer from:
                        </Grid>
                        <Grid item xs={4} style={{fontWeight: "bold"}}>
                          {offerDate}
                        </Grid>
                      </Aux>
                    : null}
                    
                    <Grid item xs={mobileView ? 6 : 5} style={{fontWeight: "bold"}}>
                      
                      <MuiThemeProvider theme={themeChipState}>
                        {this.state.statistics.countOffers > 0 ?
                          <Chip label={`${this.props.itemCondition}`}/>
                        :
                        null}
                      </MuiThemeProvider>
                    </Grid>
                    {/* //second row  */}
                    {!mobileView ? 
                      <Aux>
                        <Grid item xs={3}>
                          Days on market:
                        </Grid>
                        <Grid item xs={4} style={{fontWeight: "bold"}}>
                          {diffDays}
                        </Grid>
                      </Aux>
                    : null}
                    <Grid item xs={mobileView ? 6 : 5} style={{fontWeight: "bold"}}>
                      <MuiThemeProvider theme={themeChipAvailability}>
                        {this.props.offerAvailable ? 
                        <Chip label={'available'}/>
                        : 
                        <Chip label={'unavailable'}/>}
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={mobileView ? 6 : 2} className={classes.translateButton}>
                    <TranslateButton 
                      eng={() => this.handleClickTranslationButton('eng')} 
                      pl={() => this.handleClickTranslationButton('pl')} 
                      de={() => this.handleClickTranslationButton('de')}
                      mobileView={mobileView}
                    />
                </Grid>
                <Grid item xs={12} className={classes.description}>
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

export default withStyles(offerDetailsDialogStyle)(OfferDetails);