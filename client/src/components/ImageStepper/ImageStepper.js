import React from 'react';
import PropTypes from 'prop-types';
//@mui
import { withStyles } from '@material-ui/core/styles';
import {IconButton, MobileStepper, Paper} from '@material-ui/core/';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import { Fullscreen } from '@material-ui/icons';
//commons
import {getPictureArray} from '../../common/common.js';
//styles
import imageStepperStyle from '../../styles/components/ImageSteppers/imageStepperStyle';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

let picArray = [];
let fullscreenPicArray = [];
let objPictures = {};


class SwipeableTextMobileStepper extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        activeStep: 0,
      };
      objPictures = getPictureArray(props.offer);
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
    const { classes, theme, mobileView } = this.props;
    const { activeStep } = this.state;
    const maxSteps = objPictures.picArray.length;
    return (
      <div className={classes.root}>
        {!mobileView ? 
          <Paper square elevation={0} className={classes.header}>
            <IconButton onClick={() => {this.props.openFullscreen(true, objPictures.fullscreenPicArray)}}>
              <Fullscreen/>
            </IconButton>
          </Paper>
        : null}
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents

        >
        {objPictures.picArray.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div
                  className={classes.img}
                  style={{
                      backgroundImage: `url(${step.imgPath})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: 'center',
                  }}
            />
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
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(imageStepperStyle, { withTheme: true })(SwipeableTextMobileStepper);
