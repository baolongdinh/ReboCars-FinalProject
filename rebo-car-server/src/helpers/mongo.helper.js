var mongoose = require('mongoose');
const buildCarMatchFilterCondition = (filter, features, fuel, location) => {
    const matchAndStageFilter = [{}];

    if (location?.compound?.province) {
        matchAndStageFilter.push({ 'location.compound.province': location.compound.province });
    }
    if (location?.compound?.district) {
        matchAndStageFilter.push({ 'location.compound.district': location.compound.district });
    }
    if (filter?.typeOfCar && filter?.typeOfCar !== 'Tất cả') {
        matchAndStageFilter.push({ 'characteristics.typeOfCar': filter.typeOfCar });
    }
    if (filter?.autoMaker && filter?.autoMaker !== 'Tất cả') {
        matchAndStageFilter.push({ 'characteristics.autoMaker': filter.autoMaker });
    }
    if (filter?.priceRange?.min) {
        matchAndStageFilter.push({ price: { $gte: filter.priceRange.min } });
    }
    if (filter?.priceRange?.max) {
        matchAndStageFilter.push({ price: { $lte: filter.priceRange.max } });
    }
    if (filter?.seatsRange?.min) {
        matchAndStageFilter.push({ 'characteristics.seats': { $gte: filter.seatsRange.min } });
    }
    if (filter?.seatsRange?.max) {
        matchAndStageFilter.push({ 'characteristics.seats': { $lte: filter.seatsRange.max } });
    }

    if (filter?.manufactureYearRange?.min) {
        matchAndStageFilter.push({
            'characteristics.yearOfManufacture': { $gte: filter.manufactureYearRange.min }
        });
    }
    if (filter?.manufactureYearRange?.max) {
        matchAndStageFilter.push({
            'characteristics.yearOfManufacture': { $lte: filter.manufactureYearRange.max }
        });
    }
    if (filter?.sfc_100km) {
        matchAndStageFilter.push({
            'characteristics.sfc_100km': {
                $lte: filter.sfc_100km
            }
        });
    }
    if (features.length > 0) {
        matchAndStageFilter.push({
            features: {
                $all: features
            }
        });
    }
    if (fuel && fuel !== 'Tất cả') {
        matchAndStageFilter.push({
            'characteristics.fuel': fuel
        });
    }
    console.log(filter, features, fuel, location);
    console.log({ matchAndStageFilter });

    return matchAndStageFilter;
};

const buildOrderMatchFilterCondition = (_start_date_time, _end_date_time, historyOrders, user_id) => {
    var matchOrderStage = {};
    const dateNow = new Date();

    if (historyOrders) {
        const addMatchStage = {
            end_date_time: {
                $lt: dateNow
            }
        };
        matchOrderStage = { ...matchOrderStage, ...addMatchStage };
    } else {
        const addMatchStage = {
            end_date_time: {
                $gte: dateNow
            }
        };
        matchOrderStage = { ...matchOrderStage, ...addMatchStage };
    }

    if (user_id) {
        const addMatchStage = {
            user_id: mongoose.Types.ObjectId(user_id)
        };
        matchOrderStage = { ...matchOrderStage, ...addMatchStage };
    }

    if (_start_date_time) {
        const addMatchStage = {
            start_date_time: { $gte: _start_date_time }
        };
        matchOrderStage = { ...matchOrderStage, ...addMatchStage };
    }

    if (_end_date_time) {
        const addMatchStage = {
            end_date_time: { $lte: _end_date_time }
        };
        matchOrderStage = { ...matchOrderStage, ...addMatchStage };
    }

    console.log({ matchOrderStage });

    return matchOrderStage;
};

module.exports = {
    buildCarMatchFilterCondition,
    buildOrderMatchFilterCondition
};
