import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
//icons
import InfoIcon from '@material-ui/icons/Info';
import Delete from '@material-ui/icons/DeleteSweep';
//app components
import FavoriteButton from '../../FavButton/FavButtonBikeMarkt.jsx';
import TagButton from '../../Buttons/TagButton';

//hoc components
import Aux from '../../../hoc/Ax/Ax';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '200px',
        // width: '100%',
    },
    card: {
      minWidth: 250,
      maxWidth: 250,
      minHeight: 250,
    //   background: '#97AABD',
      background: 'linear-gradient(180deg, #97aabd 0%,#314455 100%)',
    //   maxHeight: 500
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    //   background: '#000',
      opacity: 0.6
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: `#C96567`,
      fontSize: `20px`,
      fontFamily: `Lobster`,
      textShadow: `1px 1px #314455`,
    },
    image: {
        position: 'relative',
        height: 350,
        width: 250,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
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
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
        textShadow: '1px 1px #000',
        fontSize: '15px'
    },
    imagePrice: {
        position: 'relative',
        left: 175,
        right: 0,
        top: -150,
        opacity: 1,
        color: '#fff',
        fontSize: '15px'
    },
    imageScoring: {
        position: 'relative',
        left: 15,
        right: 0,
        top: -150,
        opacity: 1,
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
    imageActionsFavorite: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    imageActionsTags: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    imageActionsHide: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    imageActionsInfo: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    }
});
const movePoint = -35;
class BestOffer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            offerCount: this.props.offerCount,
            expanded: false,
            grade: 'S',
            openTagDialog: false,
            favorite: false,
            visible: true,
            scoringData: {
                trueName: '', price: 0, currency: "...", median: 0, 
                countTotal: 0, scores: 0, itemState: "not defined",
                yearTitle: 0, yearDescription: 0
            },

        }
    }
    componentWillMount(){
        this.getScoringData();
        console.log(`mounting best offer...`);
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleClickOpenTagDialog = () => {
        this.setState({
            openTagDialog: true
        });
      };
    
    handleCloseTagDialog = () => {
        this.setState({ 
            openTagDialog: false 
        });
    };
    getScoringData = async () => {
        if (this.props.offer._id !== `dummy`){
            await axios.get('/scoring/' + this.props.offer._id).then(response  => response.data).then(result => {
                var scoringData = {
                    trueName: result.scoring[0].fullName,
                    price: result.scoring[0].price,
                    currency: result.scoring[0].currency,
                    median: result.scoring[0].median,
                    countTotal: result.scoring[0].countTotal,
                    scores: result.scoring[0].scores,
                    itemState: result.scoring[0].itemState,
                    yearTitle: result.scoring[0].yearTitle,
                    yearDescription: result.scoring[0].yearDescription
                }
                this.setState({scoringData: scoringData}, () => {});
                // console.log(`scoring name: ${result[Object.keys(this.state.trueName)[0]]} for offer id: ${this.props.offer._id}`);
                // console.log(result[Object.keys(this.state.trueName)[0]]);
                // console.log(`scoring - name: ${result.scoring[0].fullName} price: ${result.scoring[0].price}`);
          });
        }
    }
    setOfferVisibility = async () => {
        console.log(`setting offer visibility`);
        await axios.get('/api/scoring/update/visibility/' + this.props.offer._id).then(response  => response.data).then(result => {
            this.setState({visible: result}, () => {
                let objOffer = {
                    id: this.props.offer._id,
                    trueName: this.state.scoringData.trueName
                }
                if (!this.state.visible){
                    this.props.reload(objOffer);
                }
            });
      });
    }
    render(){
        const { classes } = this.props;
        let piclink = <a>No image at all.</a>;
        if(this.props.offer.pictures !== null || this.props.offer.pictures !== undefined){
            for (var x in this.props.offer.pictures){
                // piclink = <img src={this.props.offer.pictures[x]} alt={"No Image for: " + this.props.offer._id}/>
                piclink = this.props.offer.pictures[x];
                break;
            }
        }
        const yearTitle = this.state.scoringData.yearTitle !== undefined && this.state.scoringData.yearTitle !== 0 ? 
            this.state.scoringData.yearTitle : ``;
        const yearDescription = this.state.scoringData.yearDescription !== undefined && this.state.scoringData.yearTitle !== 0 ? 
            this.state.scoringData.yearDescription : ``;

        let yearString = ``;
        switch(true){
            case (yearTitle !== ``):
                yearString = ` [${yearTitle}]`
                break;
            case (yearDescription !== ``):
                yearString = ` [${yearDescription}]`
                break;
            default:
                break;
        }
        return(
            <div className={classes.root}>
                <ButtonBase
                    focusRipple
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={this.props.onClick}
                >
                <span
                    className={classes.imageSrc}
                    style={{
                        backgroundImage: `url(${piclink})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                {this.props.offer._id !== `dummy` ? (
                <Aux>
                <span className={classes.imageScoring}>
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        {parseFloat(this.state.scoringData.scores).toFixed(1)}
                    </Avatar>
                </span>
                <span className={classes.imagePrice}>
                    {`${this.state.scoringData.price} ${this.state.scoringData.currency}`}  
                </span>
                <span className={classes.imageButton}>
                    <b>{`${this.state.scoringData.trueName}${yearString} [${this.state.scoringData.itemState}]`}</b>
                </span>
                <span className={classes.imageActionsFavorite}>
                    <FavoriteButton 
                        dataKey={this.props.offer._id} 
                        favorite={this.props.offer.favorite} 
                        fetchUrl={this.props.fetchUrl} 
                        model={this.props.model}
                    />
                </span>
                <span className={classes.imageActionsTags}>
                    <TagButton 
                        onClick={this.handleClickOpenTagDialog} 
                        category={this.props.category} 
                        offer={this.props.offer} 
                        tagUrl={this.props.tagUrl}
                    />
                </span>
                <span className={classes.imageActionsHide}>
                    <IconButton onClick={this.setOfferVisibility}>
                        {/* [to do] erase tags, and make them ignored? */}
                        <Delete/> 
                    </IconButton>
                </span>
                <span className={classes.imageActionsInfo}>
                    <IconButton 
                        href={this.props.offer.productUrl} 
                        target={`_blank`} 
                        className={classes.icon} 
                    >
                        <InfoIcon />
                    </IconButton>
                </span>
                </Aux>
                ): null}
                
                </ButtonBase>
            </div>
        )
    }
}

BestOffer.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(BestOffer);