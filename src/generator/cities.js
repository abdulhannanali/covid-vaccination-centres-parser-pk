"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
function getCities(vaccinationCentres) {
    var cities = {};
    vaccinationCentres.reduce(function (acc, centre) {
        var cityHash = getCityHash(centre);
        var city = acc[cityHash] || {
            id: cityHash,
            district: centre.baseVaccinationCentre.district,
            tehsil: centre.baseVaccinationCentre.tehsil,
            province: centre.baseVaccinationCentre.province,
            vaccinationCentresCount: 0
        };
        city.vaccinationCentresCount++;
        acc[cityHash] = city;
        return acc;
    }, cities);
    return Object.values(cities);
}
exports["default"] = getCities;
function getCityHash(vaccinationCentre) {
    return crypto_1.createHash('sha256')
        .update(vaccinationCentre.baseVaccinationCentre.district)
        .update(vaccinationCentre.baseVaccinationCentre.tehsil)
        .digest('base64');
}
