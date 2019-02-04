import React, {Component} from 'react';
import Aux from '../../hoc/Ax/Ax';
import axios from 'axios';
import OffersPageResult from '../../components/Offers/OfferBikeMarkt/OffersBMPageResult';
// import classes from './OffersList.css';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// # app components
import PageInfo from '../../containers/PageInfos/PageInfo.jsx';
import Pagination from '../../components/Pagination/OfferListPagination.jsx'
//styles
// import containerStyle from '../../styles/components/offerListStyle';

let renderCount = 0;
const skipValue = 10;
const style = {
    containerBackground :{
        marginRight: "auto",
        marginLeft: "auto",
        "@media (min-width: 576px)": {
          maxWidth: "100vw"
        },
        "@media (min-width: 768px)": {
          maxWidth: "90vw"
        },
        "@media (min-width: 992px)": {
          maxWidth: "80vw"
        },
        "@media (min-width: 1200px)": {
          maxWidth: "72vw"
        },
        background: "#314455",
    }, 
    bikeyshBackground: {
      background: "#C96567",
      boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
    },
    container: {
      marginRight: "auto",
      marginLeft: "auto",
      width: "100%",
      "@media (min-width: 700px)": {
        maxWidth: "100vw"
      },
      "@media (min-width: 1200px)": {
        maxWidth: "1600px"
      }
    },
  };
class OffersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            offers: [],
            loadFavorites: false,
            loadWithoutTags: false,
            selectedItemId: null,
            error: null,
            fetchUrl: props.fetchUrl,
            hits: [],
            page: null,
            skip: 0,
            pageItems: props.pageLimit,
            totalResult: 0,
            reload: false,
            mobileView: this.getPageMeasures(window.outerWidth, window.outerHeight).mobileView,
        }
    }
    
    onResize = (e) => {
        const resizeObj = this.getPageMeasures(e.target.outerWidth, e.target.outerHeight);
        if (this.state.mobileView !== resizeObj.mobileView){
          this.setState({
              mobileView: resizeObj.mobileView,
          }, ()=> {});
      }};
      getPageMeasures = (width, height) => {
        let currentWidth = width;
        let currentHeight = height;
        let resizeObj = {};
        
        if (currentWidth <= 1200){
            resizeObj = {
                mobileView: true,
            }
        } 
        if (currentWidth <= 1920 && currentWidth > 1200){
            resizeObj = {
                mobileView: false,
            }
        } 
        if (currentWidth > 1920){
            resizeObj = {
                mobileView: false,
            }
        }
        return resizeObj;
    }
    fetchData = (skip, pageLimit) => {
        axios.get(`/api/bm/category/${this.props.model}/${skip}/${pageLimit}/${this.state.loadFavorites}/
            ${this.state.loadWithoutTags}`)
            .then(response => response.data)
            .then(objSearch => this.onSetResult(objSearch))
    }
    
    onSetResult = (objSearch) =>{
        if (objSearch.result.length !== 0){
            this.setState({hits: objSearch.result, totalResult: objSearch.count}, () => {
                window.scrollTo(0, 0);
            });}
    }

    onPaginatedSearchNext = () => {
        const totalArray = this.state.totalResult;
        let newSkip = this.state.skip + skipValue;
        if(newSkip >= totalArray)
            newSkip = totalArray;
        if(newSkip !== this.state.skip){
             this.setState(() => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        }
        
    }
    onPaginatedSearchPrevious = () => {
        let newSkip = this.state.skip - skipValue;
        if(newSkip <= 0) newSkip = 0;
        if(newSkip !== this.state.skip){
            this.setState(() => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        }
    }
    handleShowFirstPage = () => {
        let newSkip = 0;
        if(newSkip <= 0) newSkip = 0;
        if(newSkip !== this.state.skip){
            this.setState(state => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip , this.state.pageItems);
            });
        }
    }
    handleShowLastPage = () => {
        const totalArray = this.state.totalResult;
        let newSkip = totalArray - skipValue;
        if(newSkip >= totalArray)
            newSkip = totalArray;
        if(newSkip !== this.state.skip){
            this.setState(() => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        }
    }
    componentWillMount() {
        window.addEventListener("resize", this.onResize);
        if (!this.props.fullSearch){
            this.props.loadFavorites ? this.setState({loadFavorites: true}, () => {}) : this.setState({loadFavorites: false}, () => {});
            this.props.loadWithoutTags ? this.setState({loadWithoutTags: true}, () => {}) : this.setState({loadWithoutTags: false}, () => {});
        }
    }
    componentDidMount() {

        if (!this.props.fullSearch){
            this.fetchData(this.state.skip, this.state.pageItems);
        } else {

        }
    }
    async componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        if (!this.props.fullSearch){
            await this.props.showFavorites(false);
            await this.props.showWithoutTags(false);
        }
    }
    render(){
        const { classes } = this.props;
        const totalArray = this.state.totalResult;
        let pageInfo = null;
        switch(this.props.category){
            case(`DHFRAMES`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.dhframesImage.url} 
                                pageInfoTitle={`Downhill Frames`} 
                                tweak={this.props.imageUrls.dhframesImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`ENDUROFRAMES`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.enduroframesImage.url} 
                                pageInfoTitle={`Enduro Frames`} 
                                tweak={this.props.imageUrls.enduroframesImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`CRANKS`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.cranksImage.url} 
                                pageInfoTitle={`Cranks`} 
                                tweak={this.props.imageUrls.cranksImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`WHEELS`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.wheelsImage.url} 
                                pageInfoTitle={`Wheels`} 
                                tweak={this.props.imageUrls.wheelsImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`HUBS`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.hubsImage.url} 
                                pageInfoTitle={`Hubs`} 
                                tweak={this.props.imageUrls.hubsImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            default:
                break;
        }
        if(this.props.fullSearch)
            pageInfo = <PageInfo 
                    imageUrl={this.props.imageUrls.bikeyshImage.url} 
                    pageInfoTitle={`Bikeysh`} 
                    tweak={this.props.imageUrls.bikeyshImage.tweak}
                />
        return(
            <Aux>
                <br/>
                <br/>
                {pageInfo}
                <div className={classes.bikeyshBackground}>
                    <div className={classes.container}>
                        <Paper className={classes.containerBackground} elevation={10}>
                        <Grid container direction="column" justify="center" alignContent="center">
                            {/* //offer list */}
                            <Grid item>
                                <OffersPageResult
                                    fullSearch={this.props.fullSearch}
                                    offers={this.props.fullSearch ? this.props.fullSearchResults : this.state.hits}
                                    fetchUrl={this.state.fetchUrl}
                                    tagUrl={this.props.tagUrl}
                                    category={this.props.category}
                                    model={this.props.fullSearch ? this.props.models : this.props.model}
                                    rerender={this.state.reload}
                                    searchPending={this.props.searchPending}
                                    mobileView={this.state.mobileView}
                                />
                            </Grid>
                            {/* // pagination */}
                            {this.props.fullSearch ? null : (
                                <Grid item>
                                    <Pagination 
                                        show={
                                            totalArray <= this.state.skip + skipValue ? 
                                            totalArray : this.state.skip + skipValue
                                        } 
                                        total={totalArray} 
                                        showPerPage={skipValue}
                                        previous={this.onPaginatedSearchPrevious} 
                                        next={this.onPaginatedSearchNext}
                                        firstPage={this.handleShowFirstPage}
                                        lastPage={this.handleShowLastPage} 
                                    />
                                </Grid>
                            )}
                        </Grid>
                        </Paper>   
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withStyles(style)(OffersList);