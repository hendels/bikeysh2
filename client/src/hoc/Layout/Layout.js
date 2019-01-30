import React, {Component} from 'react';
import Aux from '../Ax/Ax';
import axios from 'axios';
import { Route, Link, withRouter } from 'react-router-dom';
import config from '../../config/config';
// app components
import OffersList from '../../containers/OffersList/OffersList';
import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import Footer from '../../components/Footer/Footer.jsx';
// pages
import LandingPage from '../../pages/LandingPage';
import LoginPage from '../../pages/LoginPage.jsx';
import BestOfferPage from '../../pages/BestOfferPage.jsx';
import EmptyPage from '../../pages/EmptyPage.jsx';

const fetchUrls = {
    hubs: '/api/bm/category/hubs/',
    wheels: '/api/bm/category/wheels/',
    dhFrames: '/api/bm/category/dhframes/',
    enduroFrames: 'api/bm/category/enduroframes/',
    cranks: '/api/bm/category/cranks/',
    bestoffer: '/api/bm/bestoffer/',
    tags: '/api/tags/'
};
const imageUrls = {
    bestOfferImage: {url: `https://testy.bikeboard.pl/images/biblioteka/slider-d8683q_sender_testing_nice_canyon_greber_3nvv.jpg`, tweak: `0px -70px`},
    dhframesImage: {url: `https://static.canyon.com/_img/bg/gravity/gravity-technology-sender.jpg`, tweak: `0px -250px`},
    cranksImage: {url: `https://cdn.dirtmountainbike.com/featured_image/5acb91737dbc8.jpeg`, tweak: `0px -450px`},
    hubsImage: {url: `https://cdn.bikemagic.com/featured_image/5ab936e5d5833.jpg`, tweak: `0px -200px`},
    enduroframesImage: {url: `https://brink.uk/assets/images/products/Bikes/Santa-Cruz-Nomad-4-CC-Frame-2018-3.jpg`, tweak: `0px -400px`},
    wheelsImage: {url: `https://cdn.dirtmountainbike.com/featured_image/5ab923c674716.jpg`, tweak: `0px 300px`},
    loginImage: {url: `http://www.fullhdwpp.com/wp-content/uploads/Bicycling-Downhill_www.FullHDWpp.com_.jpg?x69613`, tweak: `0px 0px`},
    bikeyshImage: {url: `https://static.canyon.com/_img/bg/gravity/gravity-world.jpg`, tweak: `0px -200px`},
    // footerImage: {url: `http://factoryracing.canyon.com/downhill-team/wp-content/uploads/sites/2/2018/02/Canyon_DH_Nizza18_G4A9936.jpg`, tweak: `0px 650px`},
}
const dbModels = {
    cranks: `cranks`, dhframes: `dhframes`, enduroframes: `enduroframes`, hubs: `hubs`, wheels: `wheels` 
}
const dashboardRoutes = [];
var backgroundColor = '#344054';
class Layout extends Component {
    state = {
        backgroundColor: backgroundColor,
        changeHeader: false,
        changeColorHeader: "bikeysh3",
        loadFavorites: false,
        loadWithoutTags: false,
        searchText: '',
        searchResults: {},
        fullSearchResults: [],
        showSearchResults: false,
        searchPending: false,
        activeUser: '',
        loginPageOpened: config.prod, 
        loggedIn: !config.prod,
        // loginPageOpened: true, 
        // loggedIn: false,
    }
    handleLoggedIn = async (logUser, userName) => {
        await this.setState({
            loggedIn: logUser, 
            userName: userName,
        }, () => {
            console.log(`state logged: ${this.state.loggedIn}`);
            if (this.state.loggedIn){
                this.props.history.push('/');
                window.scrollTo(0, 0);
            }
        })
    };
    handleShowFavorizedOffers = async (load) => {
        await this.setState({loadFavorites: load}, () => {});
    };
    handleShowWithoutTag = async (load) => {
        await this.setState({loadWithoutTags: load}, () => {});
    };
    handleClearFilterStates = async () => {
        await this.setState({loadFavorites: false}, () => {});
        await this.setState({loadWithoutTags: false}, () => {});
    };
    handleChangeSearchText = async (searchText, searchLimit) => {
        await this.setState({searchPending: true}, ()=> {

        });
        if (searchText !== '' && searchText.length > 3) {
            this.setState({
                searchText: searchText, 
                showNothingFound: false,
                showSearchResults: false,
            }, () => {
                this.handleSearch(searchLimit);   
            })
        }
    }
    handleCollectAllResult = async () => {
        const result = await this.handleSearch(0); 
        this.setState({
            fullSearchResults: result, 
            searchPending: false,
            showNothingFound: false,
            showSearchResults: false,
        }
        , () => {});
    }    
    handleGetSingleRecord = async (_id, category) => {
        const model = category.toLowerCase();
        const result = await this.handleSearchOne(_id, model); 
        this.setState({
            fullSearchResults: result, 
            searchPending: false,
            showNothingFound: false,
            showSearchResults: false,
        }
        , () => {});
    }  
    handleSearchOne = async (offerId, model) => { 
        let allResults = [];
        //show results for single clicked record
        await axios.get(`/api/searchOne/${offerId}/${model}`).then(response => response.data).then(result => {
            if (result){
                result.category = model;
                allResults.push(result);
            }
        });
        return allResults;
    }
    handleSearch = async (searchLimit, offerId, model) => {
        let allResults = [];
        //show results for single clicked record
            await axios.get(`/api/search/${this.state.searchText}/${searchLimit}`)
                .then(response  => response.data)
                .then(result => {
                    // full search after click "show all results" button
                    if (searchLimit === 0){
                        allResults = result.searchResults;
                    }
                    // show results on search window
                    if (searchLimit > 0){ 
                        let searchResults = [];
                        for (let i = 0 ; i < result.searchResults.length; i++){
                            let searchItem = {
                                _id: result.searchResults[i]._id,
                                title: result.searchResults[i].title,
                                bmartId: result.searchResults[i].bmartId,
                                publishDate: result.searchResults[i].publishDate,
                                category: result.searchResults[i].category,
                            }
                            searchResults.push(searchItem);
                        }
                        this.setState({searchResults: searchResults}, () => {
                            if (this.state.searchResults.length > 0 )
                                this.setState({showNothingFound: false, showSearchResults: true}, () => {});
                            else    
                                this.setState({showNothingFound: true, showSearchResults: false}, () => {});
                        });
                    }
                }
            );

        return allResults;
    }
    handleCloseSearchResults = () => {
        this.setState({
            showNothingFound: false,
            showSearchResults: false,
            searchPending: true,
        }, () => {
            this.setState({searchPending: false}, ()=> {});
        });   
    }
    handleGoLogin = (loginOpened) => {
        this.setState({loginPageOpened: loginOpened}, ()=>{});
    }
    render () {
        const { classes, ...rest } = this.props;
        
        return (
            <Aux>
                <div style={{background: this.state.backgroundColor}}>
                    <Header
                        color={this.state.changeColorHeader}
                        routes={dashboardRoutes}
                        brand="bikeysh"
                        rightLinks={<HeaderLinks 
                            clearFilters={this.handleClearFilterStates}
                            searchText={this.handleChangeSearchText}
                            changeColor={this.state.changeHeaderColor}
                            showFavorites={this.handleShowFavorizedOffers}
                            showWithoutTags={this.handleShowWithoutTag}
                            showSearchResults={this.state.showSearchResults}
                            collectAllResults={this.handleCollectAllResult}
                            closeSearchResults={this.handleCloseSearchResults}
                            handleLoggedIn={this.handleLoggedIn}
                            userName={this.state.userName}
                            />}
                        fixed
                        changeHeaderColor={false}
                        searchResults={this.state.searchResults}
                        closeSearchResults={this.handleCloseSearchResults}
                        showSearchResults={this.state.showSearchResults}
                        showNothingFound={this.state.showNothingFound}
                        collectAllResults={this.handleCollectAllResult}
                        getSingleRecord={this.handleGetSingleRecord}
                        changeColor={this.handleChangeColor}
                        revertColor={this.handleRevertChangeColor}
                        loginPageOpened={this.state.loginPageOpened}
                        loggedIn={this.state.loggedIn}
                        {...rest}
                    />
                    <Route exact path="/" render={(props) => 
                        <div>
                            <br/>
                            <br/>
                            {this.state.loggedIn ? (<LandingPage imageUrls={imageUrls}/>) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/login" render={(props) => 
                        <div>
                            <br/>
                            <br/>
                            {!this.state.loggedIn ? (
                                <LoginPage 
                                    imageUrl={imageUrls.loginImage}
                                    handleGoLogin={this.handleGoLogin}
                                    handleLoggedIn={this.handleLoggedIn}
                                    loggedIn={this.state.loggedIn}
                                />
                            ) : (()=>{
                                this.props.history.push('/');
                                window.scrollTo(0, 0);
                            })}
                        </div>
                    }
                    />
                    <Route exact path="/bestoffers" render={(props) => 
                        <div>
                            {this.state.loggedIn ? (
                                <div>
                                    <br/>
                                    <br/>
                                    <BestOfferPage 
                                        fetchUrls={fetchUrls} 
                                        imageUrls={imageUrls} 
                                        models={dbModels} 
                                        showFavorites={this.handleShowFavorizedOffers}
                                        showWithoutTags={this.handleShowWithoutTag}
                                        searchPending={this.state.searchPending}
                                    />
                                </div>
                            ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/offers/searchresult" render={(props) => 
                        <div>
                        {this.state.loggedIn ? (
                            <OffersList
                                fullSearch 
                                fullSearchResults={this.state.fullSearchResults}
                                tagUrl={fetchUrls.tags}    
                                imageUrls={imageUrls}
                                models={dbModels}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                                showFavorites={this.handleShowFavorizedOffers}
                                showWithoutTags={this.handleShowWithoutTag}
                                searchPending={this.state.searchPending}
                            />
                        ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/category/cranks" render={(props) => 
                        <div>
                        {this.state.loggedIn ? (
                            <OffersList 
                                pageLimit={10} 
                                fetchUrl={fetchUrls.cranks}    
                                tagUrl={fetchUrls.tags}    
                                category={`CRANKS`}  
                                imageUrls={imageUrls}
                                model={dbModels.cranks}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                                showFavorites={this.handleShowFavorizedOffers}
                                showWithoutTags={this.handleShowWithoutTag}
                                searchPending={this.state.searchPending}
                            />
                        ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/category/hubs" render={(props) => 
                        <div>
                        {this.state.loggedIn ? (
                            <OffersList 
                                pageLimit={10} 
                                fetchUrl={fetchUrls.hubs}   
                                tagUrl={fetchUrls.tags}    
                                category={`HUBS`}     
                                imageUrls={imageUrls}  
                                model={dbModels.hubs}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                                showFavorites={this.handleShowFavorizedOffers}
                                showWithoutTags={this.handleShowWithoutTag}
                                searchPending={this.state.searchPending}
                            />
                        ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/category/wheels" render={(props) => 
                        <div>
                        {this.state.loggedIn ? (
                            <OffersList 
                                pageLimit={10} 
                                fetchUrl={fetchUrls.wheels}     
                                tagUrl={fetchUrls.tags}    
                                category={`WHEELS`}   
                                imageUrls={imageUrls}  
                                model={dbModels.wheels}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                                showFavorites={this.handleShowFavorizedOffers}
                                showWithoutTags={this.handleShowWithoutTag}
                                searchPending={this.state.searchPending}
                            />
                        ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/category/dhframes" render={(props) => 
                        <div>
                        {this.state.loggedIn ? (
                            <OffersList 
                                pageLimit={10} 
                                fetchUrl={fetchUrls.dhFrames}    
                                tagUrl={fetchUrls.tags}    
                                category={`DHFRAMES`} 
                                imageUrls={imageUrls}    
                                model={dbModels.dhframes}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                                showFavorites={this.handleShowFavorizedOffers} 
                                showWithoutTags={this.handleShowWithoutTag}
                                searchPending={this.state.searchPending}
                            />

                        ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Route exact path="/category/enduroframes" render={(props) => 
                        <div>
                        {this.state.loggedIn ? (
                            <OffersList 
                                pageLimit={10} 
                                fetchUrl={fetchUrls.enduroFrames}      
                                tagUrl={fetchUrls.tags}    
                                category={`ENDUROFRAMES`} 
                                imageUrls={imageUrls}   
                                model={dbModels.enduroframes}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                                showFavorites={this.handleShowFavorizedOffers}
                                showWithoutTags={this.handleShowWithoutTag}
                                searchPending={this.state.searchPending}
                            />
                        ) : <EmptyPage/>}
                        </div>
                    }
                    />
                    <Footer
                        imageUrls={imageUrls} 
                        loginPageOpened={this.state.loginPageOpened}
                        loggedIn={this.state.loggedIn}
                    />
                </div>
            </Aux>
        )
    }
}
export default withRouter(Layout);