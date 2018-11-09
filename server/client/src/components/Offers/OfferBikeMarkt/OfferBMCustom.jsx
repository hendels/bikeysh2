import React from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
//mui core
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Zoom from '@material-ui/core/Zoom';
//mui icons
import InfoIcon from '@material-ui/icons/Info';
import DesiredAdd from '@material-ui/icons/PlaylistAdd';
import AddComment from '@material-ui/icons/NoteAdd';
import Vendor from '@material-ui/icons/MonetizationOn';
import Face from '@material-ui/icons/Face';
import Delete from '@material-ui/icons/DeleteSweep';
import Viewed from '@material-ui/icons/Visibility';
import Link from '@material-ui/icons/Link';
import Block from '@material-ui/icons/Block';

//custom components
import Aux from '../../../hoc/Ax/Ax';
import FavoriteButton from '../../FavButton/FavButtonBikeMarkt';
import TagButton from '../../Buttons/TagButton';
//styles
import {
    bikeyshColor1,
    bikeyshColor2,
    bikeyshColor3,
    bikeyshColor4,
    bikeyshColor5,
    bikeyshColor6,
    bikeyshColor7,
} from "../../../styles/material-kit-react";

const styles = theme => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'nowrap',
    //   justifyContent: 'space-around',
    //   position: 'relative',
        width: 1000,
        height: 200,

    },
    gridElement: {
      width: 1000,
    //   height: 200,
    //   position: "relative",

    },
    gridElementTitle: {
        zIndex: 1,
        fontSize: "20px",
        color: "#fff",
        textShadow: `1px 1px ${bikeyshColor5}`,
        paddingLeft: `15px`,
    },
    gridElementDownbar: {
        //position: 'relative',
        zIndex: 0,
        minWidth: 1000,
        minHeight: 70,
        maxHeight: 70,
        background: "#000",
        opacity: "0.63",
        color: "#fff",
        paddingLeft: `15px`,
        paddingRight: `15px`
        // textOverflow: "ellipsis",
        // !required for overflow!
        // whiteSpace: "nowrap",
        // overflow: "hidden"
    },
    gridElementDownbarIcons: {
        paddingTop: '10px'
    },
    gridElementUpbar: {
        zIndex: 0,
        minWidth: 1000,
        minHeight: 30,
        maxHeight: 30,
        background: `rgba(39,31,36,0.7)`,
    },
    gridElementInfo: {
        width: 250,
        height: 200,
        background: bikeyshColor6,

    },
    gridElementInfoActions:{
        minHeight: 70,
        maxHeight: 70,
        minWidth: 250,
        // background: "#000",
        // opacity: "0.63",
        paddingLeft: `15px`,
        paddingRight: `15px`,
        // borderInlineStart: `2px dotted ${bikeyshColor4}`,
        // writingMode: `vertical-rl`,
        border: `1px dotted ${bikeyshColor4}`,
    },
    gridElementInfoTitle: {
        color: "#fff",
        fontSize: "15px",
        textShadow: `1px 1px ${bikeyshColor4}`,
        margin: `5px 5px 0px 15px`
    },
    gridElementInfoText:{
        color: "#fff",
        fontSize: "12px",
        textAlign: "left",
        margin: `0px 0px 0px 15px`
    },
    scores: {
        backgroundColor: `#C96567`,
        fontSize: `20px`,
        fontFamily: `Lobster`,
        textShadow: `1px 1px #314455`,
        right: `15px`,
        opacity: `1`,
        zIndex: 1,
        marginTop: `15px`,
    },
    badge: {
        top: 6,
        right: -15,
        width: `17px`,
        height: `17px`,
        backgroundColor: `#C96567`,
        fontSize: `9px`,
        textShadow: `1px 1px ${bikeyshColor7}`,
    },
  });


class OfferBMCustom extends React.Component{

state = {scoringData: {
    offerId: 0, trueName: '', price: 0,
    currency: "currency", median: 0,
    countTotal: 0, scores: 0, itemState: '',
    rerender: false, urlActive: null}
}
componentWillMount(){
    // console.log('mounting custom offer');
    this.getScoringData();
}
componentWillReceiveProps(){
    this.setState({scoringData: {
        offerId: 0, trueName: '', price: 0,
        currency: "currency", median: 0,
        countTotal: 0, scores: 0, itemState: '',
        rerender: false}});
    this.setState({rerender: this.props.rerender}, ()=> {
        this.forceUpdate();
        // console.log(`offer bm custom rerender = ${this.props.rerender}`);
        this.getScoringData();
    });
}
getScoringData = async () => {
    // console.log(this.props.offer._id);
    await axios.get('/scoring/' + this.props.offer._id).then(response  => response.data).then(result => {
        if (result !== undefined){
            if (result.scoring.length > 0) {
                var scoringData = {
                    offerId: result.scoring[0].offerId,
                    trueName: result.scoring[0].fullName,
                    price: result.scoring[0].price,
                    currency: result.scoring[0].currency,
                    median: result.scoring[0].median,
                    countTotal: result.scoring[0].countTotal,
                    scores: result.scoring[0].scores,
                    itemState: result.scoring[0].itemState,
                    urlActive: result.scoring[0].urlActive
                }
                this.setState({scoringData: scoringData}, () => {});
            }
        }
  });
}
render(){
// console.log(`render custom offer`);
const {classes} = this.props;
let dealerTip = `null`;
let linkActive = false;
let linkTip = `null`;
this.props.offer.dealer === "Nein" ? dealerTip = `Regular offer` : dealerTip = `Dealer`;
let offerAvailable = undefined;
//* date variables
const dateRegex = /((0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).[12]\d{3})/g;
const regexDate = dateRegex.exec(this.props.offer.publishDate);
let offerDate = null;
if (regexDate[0] !== undefined){
    offerDate = regexDate[0]
    var todayDate = new Date();
    var dd = todayDate.getDate();
    var mm = todayDate.getMonth() + 1;
    var yyyy = todayDate.getFullYear();
    var today = `${mm}.${dd}.${yyyy}`;
    var date2 = new Date(today);

    dd = regexDate[0].slice(0,2);
    mm = regexDate[0].slice(3,5);
    yyyy = regexDate[0].slice(6,10);

    var convertedDate = `${mm}.${dd}.${yyyy}`;
    var date1 = new Date(convertedDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
} else
     offerDate = this.props.offer.publishDate;

//  console.log(this.props.piclink);
// console.log(`offer: ${this.state.scoringData.trueName} publish date: ${this.props.offer.publishDate} dateRegex: ${date1} today: ${date2} === diff days: ${diffDays}`);

this.state.scoringData.urlActive !== undefined && this.state.scoringData.urlActive !== null ?
    JSON.parse(this.state.scoringData.urlActive) ?  offerAvailable = true : offerAvailable = false 
    : null;
if(offerAvailable !== undefined){
    offerAvailable ?  linkTip = 'Offer available' : linkTip = `Offer not available`;
}
return(
    <Grid container direction="row" justify="center" spacing={0}>
        {/* // main & statistics section */}
        <Grid item>
            <Grid container direction="column" justify="space-between" alignItems="flex-start" className={classes.root} 
            style={{
                background: `#000 url(${this.props.piclink})`,
                backgroundSize: 'cover',
                backgroundRepeat: `no-repeat`,
                backgroundPosition: 'center',
                // display: `block`,
                // marginLeft: `auto`,
                // marginRight: `auto`,
                // width: `50%`,
            }}>
                <Grid container className={classes.gridElementUpbar} direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <span className={classes.gridElementTitle}>
                            {this.state.scoringData.trueName !== `` ? 
                            `[${this.state.scoringData.trueName}] ${this.props.offer.title.length > 60 ? 
                                this.props.offer.title.slice(0, 60) + "..." : this.props.offer.title}` :
                            this.props.offer.title }
                        </span>
                    </Grid>
                    <Grid item>
                        {this.state.scoringData.scores !== 0 ? 
                            <Avatar aria-label="Recipe" className={classes.scores}>
                                {parseFloat(this.state.scoringData.scores).toFixed(1)}
                            </Avatar>
                            :
                            null
                        }
                    </Grid>
                </Grid>
                <Grid container className={classes.gridElementDownbar} direction="column" justify="space-between" alignItems="stretch" >
                    <Grid item>
                        <Grid container spacing={0} direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <Grid container className={classes.gridElementDownbarIcons} spacing={16} direction="row" justify="flex-start" alignItems="center">
                                    <Tooltip TransitionComponent={Zoom} title={dealerTip} placement="top-start">
                                        <Grid item >
                                            {this.props.offer.dealer === "Nein" ? 
                                            <Face/>:<Vendor/>} 
                                        </Grid>
                                    </Tooltip>
                                    {offerAvailable !== undefined ?
                                    <Tooltip TransitionComponent={Zoom} title={linkTip} placement="top-start">
                                        <Grid item>
                                            {offerAvailable ? <Link/> : <Block/>} 
                                        </Grid>
                                    </Tooltip>
                                    :
                                    null}
                                    {this.props.offer.watchedTimes > 0 ?  
                                    <Tooltip TransitionComponent={Zoom} title={`watched ${this.props.offer.watchedTimes} times`} placement="top-start">
                                    <Grid item>
                                        <Badge badgeContent={this.props.offer.watchedTimes} classes={{ badge: classes.badge }} >
                                            <Viewed />
                                        </Badge>    
                                    </Grid>
                                    </Tooltip>
                                    : 
                                    <Grid item/>}
                                </Grid>
                            </Grid>
                            
                            {/* <Grid item/> */}
                            <Grid item className={classes.gridElementInfoTitle}>
                                {`${offerDate} `}
                                {this.state.scoringData.itemState !== `` && this.state.scoringData.itemState !== undefined ?
                                `${this.state.scoringData.itemState} - ` : null}
                                <b>{this.props.offer.price}</b>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {this.props.offer.description !== undefined ? 
                            this.props.offer.description.length > 130 ? 
                            this.props.offer.description.slice(0, 130) + "..." : this.props.offer.description
                        : null}
                    </Grid>
                </Grid>
            </Grid>
                {/* date / price / trending - views / scores / tradesman / true name / stats for true name / href / fav / tags /used - new
                3 top parameters per category : wheel size / 142 / frame size
                //functions on the right side icons and actions// */}
                {/* * was on market time / is on market
                * price drop?
                * how many scores do you have compared to total records in specific category table
                *  */}
        {/* </div> */}
        </Grid>
        {/* // details & action section */}
        <Grid item>
            <Grid container spacing={0} direction="column" justify="space-between" alignItems="flex-start" className={classes.gridElementInfo}>
                <Grid item className={classes.gridElementInfoTitle}>
                    Stats:
                </Grid>
                {/* core info */}
                <Grid item className={classes.gridElementInfoText}>
                    {`Days on market: ${diffDays}`}
                </Grid>
                <Grid item className={classes.gridElementInfoText}>
                    {`Total price drop: ${0} times: x${0}`}
                </Grid>
                <Grid item className={classes.gridElementInfoText}>
                    {`Average price:${0}`}
                </Grid>
                {/* actions */}
                <Grid item>
                    <Grid container className={classes.gridElementInfoActions} direction="row" justify="space-evenly" alignItems="center">
                        <Grid item xs={3} className={classes.actionItem}>
                            <FavoriteButton 
                                dataKey={this.props.offer._id} 
                                favorite={this.props.offer.favorite} 
                                fetchUrl={this.props.fetchUrl} 
                                model={this.props.model}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.actionItem}>
                            <IconButton onClick={this.setOfferVisibility}>
                                {/* [to do] erase tags, and make them ignored? */}
                                <Delete style={{color: bikeyshColor5}}/> 
                            </IconButton>
                        </Grid>
                        <Grid item xs={3} className={classes.actionItem}>
                            <TagButton offer={this.props.offer} tagUrl={this.props.tagUrl} color={bikeyshColor5} category={this.props.category}/>
                        </Grid>
                        <Grid item xs={3} className={classes.actionItem}>
                            <IconButton color="secondary" href={this.props.offer.productUrl} target={`_blank`}>
                                <InfoIcon style={{color: bikeyshColor5}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
)
}};
export default withStyles(styles)(OfferBMCustom);