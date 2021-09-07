"use strict";
exports.__esModule = true;
exports.parseToVaccinationCentreArray = void 0;
var localDebug_1 = require("./localDebug");
var VaccinationCentre_1 = require("../VaccinationCentre");
var fieldsCache = new Map();
var centresParserDebug = localDebug_1["default"]('centresParser');
var fields = {
    'district': ["district"],
    'tehsil': ["tehsil"],
    'name': ["avc", "cvc", "mvc", "cvc\/mvc", "cvc\/ mvc name", "hf", "hf name"],
    'address': ["address", "adres"],
    'contact': ["contact no", "contact", "number", "contact number"],
    'designation': ["designated", "designated for", "designation"]
};
function parseToVaccinationCentreArray(table) {
    return table.tableEntries.map(function (tableEntry) { return resolveTableEntry(table.province, tableEntry); }).filter(function (x) { return x; });
}
exports.parseToVaccinationCentreArray = parseToVaccinationCentreArray;
function resolveTableEntry(province, tableEntry) {
    var newObject = {
        province: province
    };
    for (var _i = 0, _a = Object.entries(tableEntry); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var resolvedField = resolveField(key);
        if (resolvedField === undefined) {
            centresParserDebug('Skipping as no resolved field is found');
            continue;
        }
        newObject[resolvedField] = value;
    }
    if (newObject.district && !newObject.district) {
        newObject.district = newObject.tehsil;
    }
    if (newObject.tehsil && !newObject.tehsil) {
        newObject.tehsil = newObject.district;
    }
    if (!newObject.designation) {
        newObject.designation = 'all';
    }
    var keysNotPresent = VaccinationCentre_1.RawVaccinationCentreKeys.filter(function (key) {
        return !(key in newObject);
    });
    if (keysNotPresent.length) {
        localDebug_1["default"]('Following keys are not present in an entry so skipping ->' + JSON.stringify(keysNotPresent));
        return undefined;
    }
    return newObject;
}
function resolveField(str) {
    if (fieldsCache.has(str)) {
        centresParserDebug('Using cached value for ' + str);
        return fieldsCache.get(str);
    }
    for (var _i = 0, _a = Object.entries(fields); _i < _a.length; _i++) {
        var _b = _a[_i], field = _b[0], fieldMatches = _b[1];
        for (var _c = 0, fieldMatches_1 = fieldMatches; _c < fieldMatches_1.length; _c++) {
            var fieldMatch = fieldMatches_1[_c];
            if (str.match(new RegExp(fieldMatch, 'i')) !== null) {
                fieldsCache.set(str, field);
                return field;
            }
        }
    }
    centresParserDebug("Not able to resolve to anything for " + str);
}
