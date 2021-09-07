"use strict";
/**
 * This file takes in raw vaccination centre and expands on them
 * with the help of cache and multiple other clients
 */
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
var nanoid_1 = require("nanoid");
var localDebug_1 = require("./localDebug");
var googleplaces_1 = require("./thirdparties/googleplaces");
var debug = localDebug_1["default"]('expander');
function expandVaccinationCentres(cache, rawVaccinationCentres) {
    return __awaiter(this, void 0, void 0, function () {
        function expandVaccinationCentre(rawVaccinationCentre) {
            return __awaiter(this, void 0, void 0, function () {
                var cachedEntry, id, googleData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cachedEntry = cache && cache.getExtendedVaccinationCentre(rawVaccinationCentre);
                            if (cachedEntry) {
                                debug('Using cached entry for this');
                                return [2 /*return*/, cachedEntry];
                            }
                            debug('Not using cached entry');
                            id = nanoid_1.nanoid();
                            return [4 /*yield*/, googleplaces_1.fetchGooglePlacesResponse(rawVaccinationCentre)];
                        case 1:
                            googleData = _a.sent();
                            return [2 /*return*/, {
                                    id: id,
                                    baseVaccinationCentre: rawVaccinationCentre,
                                    lastUpdated: Date.now(),
                                    dateCreated: Date.now(),
                                    googlePlacesResponse: googleData
                                }];
                    }
                });
            });
        }
        var allVaccinationCentres, _i, rawVaccinationCentres_1, rawVaccinationCentre, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    allVaccinationCentres = [];
                    _i = 0, rawVaccinationCentres_1 = rawVaccinationCentres;
                    _c.label = 1;
                case 1:
                    if (!(_i < rawVaccinationCentres_1.length)) return [3 /*break*/, 4];
                    rawVaccinationCentre = rawVaccinationCentres_1[_i];
                    _b = (_a = allVaccinationCentres).push;
                    return [4 /*yield*/, expandVaccinationCentre(rawVaccinationCentre)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, allVaccinationCentres];
            }
        });
    });
}
exports["default"] = expandVaccinationCentres;
