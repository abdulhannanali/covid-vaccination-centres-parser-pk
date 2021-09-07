"use strict";
exports.__esModule = true;
var cheerio_1 = require("cheerio");
var tableParser_1 = require("./tableParser");
var provinces_1 = require("./provinces");
var debug_1 = require("debug");
var vaccinationCentresParser_1 = require("./vaccinationCentresParser");
var ramda_1 = require("ramda");
var htmlToRawJSONDebug = debug_1["default"]('htmlToRawJson');
function parse(htmlExportedFile) {
    var $ = cheerio_1["default"].load(htmlExportedFile);
    var allTables = $("table");
    if (allTables.length !== 9) {
        htmlToRawJSONDebug.extend('allTables/html')(allTables.html());
        throw new Error("There should be 9 tables but only " + allTables.length + " found");
    }
    var tables = allTables
        .toArray()
        .slice(1)
        .map(parseTable)
        .filter(function (table) { return table; })
        .map(vaccinationCentresParser_1.parseToVaccinationCentreArray);
    return ramda_1.flatten(tables);
}
exports["default"] = parse;
function parseTable(table, index) {
    var anchorElementHtml = cheerio_1["default"](table).prev("a").html();
    if (!anchorElementHtml) {
        htmlToRawJSONDebug('anchorElementHTML not provided');
        return undefined;
    }
    var province = provinces_1["default"].find(function (province) {
        return anchorElementHtml.toLowerCase().indexOf(province) !== -1;
    });
    if (province) {
        return {
            province: province,
            tableEntries: tableParser_1.parseTableToJSON(table)
        };
    }
}
