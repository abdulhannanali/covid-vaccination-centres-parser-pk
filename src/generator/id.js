"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
function getId(name, district, tehsil) {
    return crypto_1.createHash('sha256')
        .update(name + district + tehsil)
        .digest('hex');
}
exports["default"] = getId;
