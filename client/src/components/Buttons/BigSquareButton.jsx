import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  image: {
    position: 'relative',
    width: '20vw',
    height: '40vh',
    "@media (max-width: 425px)": { 
      width: `50vw`,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '2px solid currentColor',
      },
    },
    
  },
  imageButton: {
    color: theme.palette.common.white,
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});


const ButtonBases = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={()=>{
              props.history.push(`${props.pushTo}`);
              window.scrollTo(0, 0);
            }}
          >
            <span
              className={classes.imageSrc}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <ArrowRight/>      
            </span>
          </ButtonBase>
        
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ButtonBases));
