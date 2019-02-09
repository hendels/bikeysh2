import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
//styles
import bigSquareButtonStyle from '../../styles/components/Buttons/bigSquareButtonStyle.jsx';

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

export default withStyles(bigSquareButtonStyle)(withRouter(ButtonBases));
