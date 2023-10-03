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
        matchAndStageFilter.push({ 'characteristics.seats': { $lte: filter.seatsRange.min } });
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
