import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Fullscreen } from '@material-ui/icons';

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
    // -- solution 1
    // backgroundSize: 'auto',
    // backgroundRepeat: `no-repeat`,
    // backgroundPosition: 'center',
    // -- solution 2 
    // position: `relative`,
    // margin: `auto`,
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // position: 'absolute',
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
      try{
        Object.keys(props.offer.pictures).forEach((key, index) => {
          if (props.offer.pictures[Object.keys(props.offer.pictures)[index]] !== null){
            let pictureObj = {imgPath: props.offer.pictures[Object.keys(props.offer.pictures)[index]], label: 'Bikeysh!'};
            let fullscreenPictureObj = {src: props.offer.pictures[Object.keys(props.offer.pictures)[index]]};
  
            picArray.push(pictureObj);
            fullscreenPicArray.push(fullscreenPictureObj);
          }
  
        })
      }
      catch(err){
        alert(`something wrong with record [props.offer.pictures] - constructor class: SwipeableTextMobileStepper`);
      }
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
                // <div className={{background: `url(${step.imgPath}) no-repeat center center fixed`}}  />
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

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
