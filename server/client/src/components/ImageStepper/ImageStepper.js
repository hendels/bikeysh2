import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Fullscreen } from '@material-ui/icons';
import ImageLightBox from '../ImageLightbox/ImageLightBox.jsx';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

let picArray = [];
let fullscreenPicArray = [];

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: "flex-end",
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class SwipeableTextMobileStepper extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        activeStep: 0,
      };
      picArray = [];
      fullscreenPicArray = [];
      Object.keys(props.offer.pictures).forEach((key, index) => {
        if (props.offer.pictures[Object.keys(props.offer.pictures)[index]] !== null){
          let pictureObj = {imgPath: props.offer.pictures[Object.keys(props.offer.pictures)[index]], label: 'Bikeysh!'};
          let fullscreenPictureObj = {src: props.offer.pictures[Object.keys(props.offer.pictures)[index]]};

          picArray.push(pictureObj);
          fullscreenPicArray.push(fullscreenPictureObj);
        }

      })
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = picArray.length;
    // console.log(this.props.offer.pictures[Object.keys(this.props.offer.pictures)[0]]);
    // console.log(Object.keys(this.props.offer.pictures)[0]);
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <IconButton onClick={() => {this.props.openFullscreen(true, fullscreenPicArray)}}>
            <Fullscreen/>
          </IconButton>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents

        >
        {picArray.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <IconButton size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              <ChevronRight/>
            </IconButton>
          }
          backButton={
            <IconButton size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              <ChevronLeft/>
            </IconButton>
          }
        />
        {/* <ImageLightBox open={this.state.fullscreenOpen}/> */}
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
