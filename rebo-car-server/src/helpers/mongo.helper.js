const buildCarMatchFilterCondition = (filter, features, fuels, location) => {
    const matchAndStageFilter = [{}];

    if (location?.compound?.commune) {
        matchAndStageFilter.push({ 'location.compound.commune': location.compound.commune });
    }
    if (location?.compound?.district) {
        matchAndStageFilter.push({ 'location.compound.district': location.compound.district });
    }
    if (filter?.typeOfCar) {
        matchAndStageFilter.push({ 'characteristics.typeOfCar': filter.typeOfCar });
    }
    if (filter?.autoMaker) {
        matchAndStageFilter.push({ 'characteristics.autoMaker': filter.autoMaker });
    }
    if (filter?.priceRange?.min) {
        matchAndStageFilter.push({ 'characteristics.priceRange.min': { $gte: filter.priceRange.min } });
    }
    if (filter?.priceRange?.max) {
        matchAndStageFilter.push({ 'characteristics.priceRange.max': { $lte: filter.priceRange.max } });
    }
    if (filter?.seatsRange?.min) {
        matchAndStageFilter.push({ 'characteristics.seatsRange.min': { $gte: filter.seatsRange.min } });
    }
    if (filter?.manufactureYearRange?.min) {
        matchAndStageFilter.push({
            'characteristics.manufactureYearRange.min': { $gte: filter.manufactureYearRange.min }
        });
    }
    if (filter?.manufactureYearRange?.max) {
        matchAndStageFilter.push({
            'characteristics.manufactureYearRange.max': { $lte: filter.manufactureYearRange.max }
        });
    }
    if (filter?.sfc_100km) {
        matchAndStageFilter.push({
            $lte: filter.sfc_100km
        });
    }
    if (features.length > 0) {
        matchAndStageFilter.push({
            features: {
                $all: features
            }
        });
    }
    if (fuels.length > 0) {
        matchAndStageFilter.push({
            fuel: {
                $in: fuels
            }
        });
    }

    return matchAndStageFilter;
};

const buildOrderMatchFilterCondition = (startDate, endDate) => {
    const matchOrderStage = {};

    if (startDate) {
        matchOrderStage[start_date_time] = {
            $gte: startDate
        };
    }

    if (endDate) {
        matchOrderStage[end_date_time] = {
            $lte: endDate
        };
    }

    return matchOrderStage;
};

const buildMatchSearchOrderCondition = (search) => {
    const matchOrSearchCheck = [{}];

    if (search) {
        matchOrSearchCheck.push({
            _id: search
        });

        matchOrSearchCheck.push({
            'user_info.name': search
        });

        matchOrSearchCheck.push({
            'car_info.name': search
        });

        matchOrSearchCheck.push({
            'car_info.identifyNumber': search
        });
    }

    const matchSearchStage = {
        $or: matchOrSearchCheck
    };

    return matchSearchStage;
};

module.exports = {
    buildCarMatchFilterCondition,
    buildOrderMatchFilterCondition,
    buildMatchSearchOrderCondition
};
