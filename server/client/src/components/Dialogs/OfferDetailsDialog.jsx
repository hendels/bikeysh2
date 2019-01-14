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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageStepper from '../ImageStepper/ImageStepper.js';
import blue from '@material-ui/core/colors/blue';
import TranslateButton from '../Buttons/TranslateButton.jsx';
import TagButton from '../Buttons/TagButton.jsx';
import FavoriteButton from '../FavButton/FavButtonBikeMarkt.jsx';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';

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
      }
    },
    MuiAvatar: {
      root: {
        fontSize: `20px`,
        fontFamily: `Lobster`,
        textShadow: `1px 1px #314455`,
      },
    }
  },
});
const styles = {
    root: {
      // minWidth: '500px',
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    paper: {
      // minWidth: 500,
      background: '#97AABD'
    },
    paperText: {
      color: '#314455'
    },
    dialog: {
      position: "absolute",
      maxWidth: "600px",
      maxHeight: "800px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
    }

};

class DialogDragAndDrop extends React.Component {
      state = {
        loading: false,
        description: this.props.offer.description,
        statistics: {
          countOffers: 0,
          currency: null,
          avgPrice: 0,
          median: 0,
          manufacturerSetId: 0,
          modelSetId: 0
        },
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
      const { classes, onClose, selectedValue, ...other } = this.props;
      return (
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
              <Grid container justify='center' alignContent='center' spacing={8}>
                <Grid item xs={12}>
                  <ImageStepper
                    offer={this.props.offer}
                  />
                </Grid>
                  
                <Grid item xs={12}>
                  <DialogContentText>
                    {
                    <Grid container direction="row" justify="space-between" alignContent="center">
                      <Grid item xs={4}>
                        <ul style={{listStyleType: 'none'}}>
                          <li ><b>Price:</b></li>
                          <li >{this.props.offer.price}</li>
                        </ul>
                      </Grid>
                      <Grid item xs={8}>
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
                      </Grid>
                    </Grid>
                    }
                  </DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText>
                    {`Description: 
                    ${this.state.description}`}
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
          <DialogActions>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Grid item>
                <FavoriteButton 
                  dataKey={this.props.offer._id} 
                  favorite={this.props.offer.favorite} 
                  fetchUrl={this.props.fetchUrl} 
                  model={this.props.model}
                />
              </Grid>
              <Grid item>
                <TagButton 
                  category={this.props.category} 
                  model={this.props.model}
                  offer={this.props.offer} 
                  tagUrl={this.props.tagUrl}
                  parentStatistics
                  disableStatistics={this.props.disableStatistics}
                />
              </Grid>
              <Grid item>
                <TranslateButton 
                  eng={() => this.handleClickTranslationButton('eng')} 
                  pl={() => this.handleClickTranslationButton('pl')} 
                  de={() => this.handleClickTranslationButton('de')}
                />
              </Grid>
              <Grid item>
                <Button onClick={this.handleClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
        </MuiThemeProvider>
      );
    }
}
  
DialogDragAndDrop.propTypes = {
classes: PropTypes.object.isRequired,
onClose: PropTypes.func,
selectedValue: PropTypes.string,
};

export default withStyles(styles)(DialogDragAndDrop);