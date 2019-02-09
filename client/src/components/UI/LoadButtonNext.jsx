import React from 'react';
import PropTypes from 'prop-types';
//@mui
import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';

import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
//styles
import loadButtonNextStyle from '../../styles/components/Buttons/loadButtonNextStyle';


function ButtonBases(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <ButtonBase
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={props.onClick}
        >
          <div
            className={classes.imageSrc} style={{border: props.mobileView ? "1px solid #97AABD" : "none"}}
          />
          <div className={classes.imageBackdrop} />
          <div className={classes.imageButton}>
              {props.caseHorizontal === `left` ? <ArrowLeft/> : <ArrowRight/>}              
          </div>
        </ButtonBase>
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loadButtonNextStyle)(ButtonBases);
