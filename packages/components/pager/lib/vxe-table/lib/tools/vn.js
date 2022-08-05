"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSlotVNs = getSlotVNs;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSlotVNs(vns) {
  if (_xeUtils.default.isArray(vns)) {
    return vns;
  }

  return [vns];
}