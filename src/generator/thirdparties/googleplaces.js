"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetchGooglePlacesResponse = void 0;
var debug_1 = require("debug");
var google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
var util_1 = require("util");
var ramda_1 = require("ramda");
var constants_1 = require("../constants");
var sleep = util_1.promisify(setTimeout);
var key = constants_1.PLACES_API_KEY;
var debugglpaces = debug_1["default"]('thirdparties:googleplaces');
/**
 * From
 * https://developers.google.com/maps/documentation/places/web-service/search-find-place#fields
 */
var basicPlacesFields = [
    'geometry',
    'name',
    'place_id'
];
function fetchGooglePlacesResponse(rawVaccinationCentre) {
    return __awaiter(this, void 0, void 0, function () {
        var client, inputOptions, responses, _i, inputOptions_1, input, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new google_maps_services_js_1.Client({});
                    inputOptions = [
                        [rawVaccinationCentre.name, rawVaccinationCentre.tehsil, rawVaccinationCentre.district, 'Pakistan'],
                    ];
                    responses = [];
                    _i = 0, inputOptions_1 = inputOptions;
                    _a.label = 1;
                case 1:
                    if (!(_i < inputOptions_1.length)) return [3 /*break*/, 7];
                    input = inputOptions_1[_i];
                    debugglpaces('Delay of 3000ms before executing next request');
                    return [4 /*yield*/, sleep(10000)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, client.findPlaceFromText({
                            params: {
                                input: input.join(' '),
                                fields: basicPlacesFields,
                                key: key,
                                inputtype: google_maps_services_js_1.PlaceInputType.textQuery
                            },
                            timeout: 3000
                        })];
                case 4:
                    response = _a.sent();
                    responses.push(response);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    debugglpaces('Error occured ', error_1.toString());
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/, acquireCandidates(responses)];
            }
        });
    });
}
exports.fetchGooglePlacesResponse = fetchGooglePlacesResponse;
/**
 * Acquires all the suitable candidates available
 *
 * @param responses
 */
function acquireCandidates(responses) {
    return ramda_1.flatten(responses
        .map(function (response) { var _a; return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.candidates; })
        .filter(function (candidates) { return candidates; })).filter(function (place) { return place === null || place === void 0 ? void 0 : place.place_id; });
}
