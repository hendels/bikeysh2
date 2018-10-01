const mongoose = require('mongoose');
const globalSetup = require('../models/global_setup');

const getLastPairNumber = async () => {
    const GlobalSetup = await mongoose
            .model('globalSetups')
            .find({setupId: 1})
            .select({ setupId: false });
    const data = {
        lastSetNumber: GlobalSetup[0].lastNumberPairOfNameSets + 1
    }
    await globalSetup.updateLastNumberPairOfNameSets(GlobalSetup[0]._id, data.lastSetNumber);
    return data.lastSetNumber
};
const findExistingPair = async (offerId, tagName, setTagTo) => {
    const OfferTags = await mongoose
            .model('tags')
            .find({offerId: offerId})
            .select({ __v: false });
    const Tags = await mongoose
            .model('tags')
            .find({tagName: tagName})
            .select({ __v: false });

    let filteredOffer = [];
    let filteredTags = [];
    let definedPair = 0;

    switch(setTagTo){
        case `Manufacturer`:
            filteredOffer = OfferTags.filter(value => {return value.manufacturerTagPair !== undefined && value.manufacturerTagPair > 0});
                if (filteredOffer.length !== 0){
                    definedPair = filteredOffer[0].manufacturerTagPair;
                } else {
                    filteredTags = Tags.filter( value => {return value.manufacturerTagPair !== undefined && value.manufacturerTagPair > 0});
                    filteredTags.length !== 0 ? definedPair = filteredTags[0].manufacturerTagPair : definedPair = 0;
                }
            break;
        case `Model`:
            filteredOffer = OfferTags.filter(value => {return value.modelTagPair !== undefined && value.modelTagPair > 0});

                if (filteredOffer.length !== 0){
                    definedPair = filteredOffer[0].modelTagPair;
                } else {
                    filteredTags = Tags.filter(value => {return value.modelTagPair !== undefined && value.modelTagPair > 0});
                    filteredTags.length !== 0 ? definedPair = filteredTags[0].modelTagPair : definedPair = 0;
                }
            break;
        case `Group`:
            filteredOffer = OfferTags.filter(value => {return value.groupTagPair !== undefined && value.groupTagPair > 0});
                if (filteredOffer.length !== 0){
                    definedPair = filteredOffer[0].groupTagPair;
                } else {
                    filteredTags = Tags.filter(value => {return value.groupTagPair !== undefined && value.groupTagPair > 0});
                    filteredTags.length !== 0 ? definedPair = filteredTags[0].groupTagPair : definedPair = 0;
                }
            //})
            break;
        default:
            break;
    }
    console.log(filteredTags);

    return definedPair !== 0 ? definedPair : 0
};
exports.defineTagPair = async (offerId, tagName, setTagTo) => {
    let tagPairNo = await findExistingPair(offerId, tagName, setTagTo);
        if (tagPairNo === 0 || tagPairNo === undefined){
            tagPairNo = await getLastPairNumber();
        } 
    return tagPairNo !== 0 ? tagPairNo : 999999
};

exports.updateModel = async (model, existingTag, tagName, setTagTo, tagPairNo) => {
    await model.updateTagSet(existingTag, tagName, setTagTo, tagPairNo);
}