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
import Pagination from '../../components/Pagination/OfferListPagination.jsx'
//styles
import containerStyle from '../../styles/components/offerListStyle';

// const applyUpdateResult = (result) => (prevState) => ({
//     hits: [...prevState, ...result],
//     page: result.page,
//   });
  
// const applySetResult = (result) => (prevState) => ({
//     hits: result,
//     page: result.page,
// });

let renderCount = 0;

// const styles = theme => ({
//     root: {
//       ...theme.mixins.gutters(),
//       paddingTop: theme.spacing.unit * 2,
//       paddingBottom: theme.spacing.unit * 2,
      
//     },
//     container: {
//         background: containerStyle.bikeyshColor4
//     },
//     containerOfferList: {
//         minWidth: `1100px`
//     }
//   });

class OffersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            offers: [],
            loadFavorites: false,
            selectedItemId: null,
            error: null,
            fetchUrl: props.fetchUrl,
            hits: [],
            page: null,
            skip: 0,
            pageItems: props.pageLimit,
            totalResult: 0,
            reload: false
        }
    }
    componentWillMount() {
        this.props.loadFavorites ? this.setState({loadFavorites: true}) : this.setState({loadFavorites: false})
    }
    componentDidMount() {
        axios.get(this.props.fetchUrl).then(response  => response.data).then(result => {
            this.setState({totalResult: result}, ()=>{
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        });
    }
    componentWillUnmount() {
        this.props.showFavorites(false);
    }
    fetchData = (skip, pageLimit) => {
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let sortedSkip = totalArray - skip + 10;
        axios.get(`/api/bm/category/${this.props.model}/${skip}/${pageLimit}/${this.state.loadFavorites}`).then(
            response => response.data
        ).then(result => this.onSetResult(result, skip))
    }
    
    onSetResult = (result, skip) =>{
        if (result.length !== 0){
            this.setState({hits: result, reload: !this.state.reload}, () => {
                console.log(`fetched hits and reload =${this.state.reload}`);
                console.log(this.state.hits);
                this.forceUpdate();
                window.scrollTo(0, 0);
            });}
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
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = this.state.skip - 10;
        if(newSkip <= 0) newSkip = 0;

        console.log("previous : " + this.state.skip);
        if(newSkip !== this.state.skip){
            this.setState(state => ({
                skip: newSkip
            }));
            this.fetchData(this.state.skip - this.state.pageItems, this.state.pageItems);
            // this.forceUpdate();
        }
        
    }
    render(){
        console.log('render offer list');
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
                        {/* //container for paginations & offers */}
                        <Grid container direction="column" justify="center" alignContent="center">
                            {/* //1st pagination */}
                            {/* <Grid item>
                                <Pagination show={this.state.skip} total={totalArray} 
                                    previous={this.onPaginatedSearchPrevious} next={this.onPaginatedSearchNext}
                                />
                            </Grid> */}
                            {/* //offer list */}
                            <Grid item>
                                {/* <div style={{margin: '10px 10px 15px 10px'}}> */}
                                    <OffersPageResult
                                        offers={this.state.hits}
                                        fetchUrl={this.state.fetchUrl}
                                        tagUrl={this.props.tagUrl}
                                        category={this.props.category}
                                        model={this.props.model}
                                        rerender={this.state.reload}
                                    />
                                {/* </div> */}
                            </Grid>
                            {/* //2nd pagination */}
                            <Grid item>
                             {/* //container for 2nd pagination */}
                                <Pagination show={this.state.skip} total={totalArray} 
                                    previous={this.onPaginatedSearchPrevious} next={this.onPaginatedSearchNext}
                                />
                            </Grid>
                        </Grid>
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