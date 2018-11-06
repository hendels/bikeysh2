import React, {Component} from 'react';
import Aux from '../../hoc/Ax/Ax';
import axios from 'axios';
import OffersPageResult from '../../components/Offers/OfferBikeMarkt/OffersBMPageResult';
// import classes from './OffersList.css';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button/Button';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// # app components
import PageInfo from '../../containers/PageInfos/PageInfo.jsx';
//styles
import containerStyle from '../../styles/components/generalPageStyle.jsx';

const applyUpdateResult = (result) => (prevState) => ({
    hits: [...prevState, ...result],
    page: result.page,
  });
  
const applySetResult = (result) => (prevState) => ({
    hits: result,
    page: result.page,
});

let renderCount = 0;

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      
    },
    container: {
        background: containerStyle.bikeyshColor4
    }
  });

class OffersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            offers: [],
            selectedItemId: null,
            error: null,
            fetchUrl: props.fetchUrl,
            hits: [],
            page: null,
            skip: 0,
            pageItems: props.pageLimit,
            totalResult: 0
            
            // pageItems: 10
        }
    }
    
    componentDidMount() {

        this.fetchData(this.state.skip, this.state.pageItems);
        axios.get(this.state.fetchUrl).then(response  => response.data).then(result => {
            this.setState({totalResult: result});
            console.log('array count '+ this.state.fetchUrl + ' = ' + result[Object.keys(this.state.totalResult)[0]]);
        });

        //console.log(this.state);
    }
    fetchData = (skip, pageLimit) => {
        axios.get(this.state.fetchUrl + skip + '/' + pageLimit).then(
            response => response.data
        ).then(result => this.onSetResult(result, skip))
    }
    onSetResult = (result, skip) =>{
        if (result.length !== 0){
            this.setState(applySetResult(result, skip));}
        //console.log(result);
    }


    onPaginatedSearchNext = () => {
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = this.state.skip + 10;
        if(newSkip >= totalArray)
            newSkip = totalArray;
        if(newSkip !== this.state.skip){
             this.setState(state => ({
                skip: newSkip
            }));
            this.fetchData(this.state.skip + this.state.pageItems, this.state.pageItems);
            console.log("state SKIP : " + this.state.skip + " state RESULT.length : " + totalArray + " state pageItems : " + this.state.pageItems);
        }
        
    }
    onPaginatedSearchPrevious = () => {
        // console.log("state SKIP : " + this.state.skip + " state RESULT.length : " + this.state.totalResult);
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = this.state.skip - 10;
        if(newSkip <= 0) newSkip = 0;

        console.log("previous : " + this.state.skip);
        if(newSkip !== this.state.skip){
            this.setState(state => ({
                skip: newSkip
            }));
            this.fetchData(this.state.skip - this.state.pageItems, this.state.pageItems);
        }
        
    }
        

    render(){
        const { classes } = this.props;
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        renderCount += 1;
        let offers = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error && this.state.hits !== null){
            let firstLevel = 0;
            for (var x in this.state.hits){
                firstLevel += 1;
            }
        }
        let pageInfo = null;
        switch(this.props.category){
            case(`DHFRAMES`):
                pageInfo = <PageInfo imageUrl={this.props.imageUrls.dhframesImage.url} pageInfoTitle={`Downhill Frames`} tweak={this.props.imageUrls.dhframesImage.tweak}/>
                break;
            case(`ENDUROFRAMES`):
                pageInfo = <PageInfo imageUrl={this.props.imageUrls.enduroframesImage.url} pageInfoTitle={`Enduro Frames`} tweak={this.props.imageUrls.enduroframesImage.tweak}/>
                break;
            case(`CRANKS`):
                pageInfo = <PageInfo imageUrl={this.props.imageUrls.cranksImage.url} pageInfoTitle={`Cranks`} tweak={this.props.imageUrls.cranksImage.tweak}/>
                break;
            case(`WHEELS`):
                pageInfo = <PageInfo imageUrl={this.props.imageUrls.wheelsImage.url} pageInfoTitle={`Wheels`} tweak={this.props.imageUrls.wheelsImage.tweak}/>
                break;
            case(`HUBS`):
                pageInfo = <PageInfo imageUrl={this.props.imageUrls.hubsImage.url} pageInfoTitle={`Hubs`} tweak={this.props.imageUrls.hubsImage.tweak}/>
                break;
            default:
                break;
        }
            
        
        return(
            <Aux>
                {pageInfo}
                <div className={classNames(classes.main, classes.mainRaised)} style={{background: containerStyle.bikeyshColor4}}>
                    <div className={classes.container}>
                        <Paper className={classes.containerBackground} elevation={1}>
                            <Button variant="outlined" onClick={this.onPaginatedSearchPrevious}>Previous</Button>
                            <Button variant="outlined" onClick={this.onPaginatedSearchNext}>Next</Button>
                            <p>{this.state.skip} of {totalArray}</p>
                        {/* <GridList cellHeight={140} className={classes.gridList} cols={2}> */}
                        <div style={{margin: '10px 10px 15px 10px'}}>
                            <OffersPageResult
                            offers={this.state.hits}
                            fetchUrl={this.state.fetchUrl}
                            tagUrl={this.props.tagUrl}
                            category={this.props.category}
                            model={this.props.model}
                            />
                        </div>
                        {/* </GridList> */}
                            <Button variant="outlined" onClick={this.onPaginatedSearchPrevious}>Previous</Button>
                            <Button variant="outlined" onClick={this.onPaginatedSearchNext}>Next</Button>
                            <p>{this.state.skip} of {totalArray}</p>
                        </Paper>   
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withStyles(containerStyle)(OffersList);