"use strict";
exports.__esModule = true;
exports.PLACES_API_KEY = exports.RELATIVE_STORAGE_DIRECTORY = exports.RAW_HISTORY_DIRECTORY = exports.PKG_JSON_DIR = exports.PKG_JSON_FILE = exports.PKG_JSON_PATH = void 0;
var pkg_up_1 = require("pkg-up");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
exports.PKG_JSON_PATH = pkg_up_1["default"].sync();
exports.PKG_JSON_FILE = fs_extra_1.readJSONSync(pkg_up_1["default"].sync());
exports.PKG_JSON_DIR = path_1.dirname(exports.PKG_JSON_PATH);
exports.RAW_HISTORY_DIRECTORY = path_1.join(exports.PKG_JSON_DIR, 'trackedRawDataHistory');
exports.RELATIVE_STORAGE_DIRECTORY = path_1.join(exports.PKG_JSON_DIR, 'store');
exports.PLACES_API_KEY = 'AIzaSyDF0Sb8xlX--j_fiz8QKTiZCFg-DTOeR6w';
