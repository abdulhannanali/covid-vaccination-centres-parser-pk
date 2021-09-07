"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var pkg_up_1 = require("pkg-up");
function readPkgJSON() {
    var packageJSONPath = pkg_up_1["default"].sync();
    var packageJSON = JSON.parse(fs_1.readFileSync(packageJSONPath, 'utf-8'));
    return {
        dir: path_1.dirname(packageJSONPath),
        path: packageJSONPath,
        packageJSON: packageJSON
    };
}
exports["default"] = readPkgJSON;
