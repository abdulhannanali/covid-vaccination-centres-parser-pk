"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.processAndWriteVaccinationCentres = void 0;
var promises_1 = require("fs/promises");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var localDebug_1 = require("./localDebug");
var vaccinationCentresTableParser_1 = require("./vaccinationCentresTableParser");
var expander_1 = require("./expander");
var cache_1 = require("./cache");
var cities_1 = require("./cities");
var debug = localDebug_1["default"]('index');
function getRawVaccinationCentresFromFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var rawData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.readFile(filePath, 'utf-8')];
                case 1:
                    rawData = _a.sent();
                    return [2 /*return*/, vaccinationCentresTableParser_1["default"](rawData)];
            }
        });
    });
}
/**
 * Gets the array of ExpandedVaccinationCentres
 *
 */
function processAndWriteVaccinationCentres(sourceFilePath, outputFilePath, cacheFile, options) {
    return __awaiter(this, void 0, void 0, function () {
        var rawVaccinationCentres, cache, _a, vaccinationCentres, cities;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getRawVaccinationCentresFromFile(sourceFilePath)];
                case 1:
                    rawVaccinationCentres = _b.sent();
                    debug("Parsed out " + rawVaccinationCentres.length + " from " + sourceFilePath);
                    if (!rawVaccinationCentres) return [3 /*break*/, 8];
                    if (!(cacheFile !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, cache_1.readCacheFile(cacheFile)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = undefined;
                    _b.label = 4;
                case 4:
                    cache = _a;
                    return [4 /*yield*/, expander_1["default"](cache, rawVaccinationCentres)];
                case 5:
                    vaccinationCentres = _b.sent();
                    cities = cities_1["default"](vaccinationCentres);
                    if (!vaccinationCentres) return [3 /*break*/, 8];
                    return [4 /*yield*/, fs_extra_1.mkdirp(path_1.dirname(outputFilePath))];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, fs_extra_1.writeJSON(outputFilePath, { cities: cities, vaccinationCentres: vaccinationCentres })];
                case 7:
                    _b.sent();
                    console.log('Written to ' + outputFilePath);
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.processAndWriteVaccinationCentres = processAndWriteVaccinationCentres;
__exportStar(require("../VaccinationCentre"), exports);
