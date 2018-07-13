import React from 'react';
import classes from './OfferBikeMarkt.css';

const offerBikeMarkt = (props) => (
    props.offers.map(offer => {
        let piclink = <a>no image</a>;
        if(offer.pictures !== null || offer.pictures !== undefined){
            for (var x in offer.pictures){
                console.log(offer.pictures[x]);
                piclink = <img className={classes.img} src={offer.pictures[x]} />
                break;
            }
        }
            
        // if(offer.pictures.picLink1 !== undefined){
            // piclink = <img >{offer.pictures.picLink1}</img>;
            // piclink = <img src={offer.pictures.picLink1} />
        // }
        return(
            <article key={offer._id}>
            <h1>{offer.title}</h1>
            <a href={offer.link}>Link</a>
            {/* <image className={classes.image}>{props.firstImage}</image> */}
            {piclink}
            
        </article>)
    })
    
)

export default offerBikeMarkt;