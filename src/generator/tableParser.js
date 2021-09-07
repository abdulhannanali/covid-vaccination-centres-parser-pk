"use strict";
exports.__esModule = true;
exports.parseTableToJSON = void 0;
var debug_1 = require("debug");
var cheerio_1 = require("cheerio");
var tableParserDebug = debug_1["default"]('tableParser');
/**
 * Applies header to row
 */
function applyRowToHeader(header, row) {
    var acc = {};
    if (header.length !== row.length) {
        tableParserDebug("\n        Header length does not match row length\n        header.length: " + header.length + "\n        row.length: " + row.length + "\n      ");
    }
    return header.reduce(function (acc, column, index) {
        acc[column] = row[index];
        return acc;
    }, acc);
}
function parseRow(row) {
    return cheerio_1["default"]('td', row)
        .toArray()
        .map(function (element, index) { return cheerio_1["default"](element).text(); });
}
function parseTableToJSON(table) {
    var rows = cheerio_1["default"]('tr', table).toArray();
    var header = parseRow(rows[0]);
    rows.shift();
    return rows
        .map(function (row) { return applyRowToHeader(header, parseRow(row)); });
}
exports.parseTableToJSON = parseTableToJSON;
