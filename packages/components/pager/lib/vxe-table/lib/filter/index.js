"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Filter = void 0;

var _table = _interopRequireDefault(require("../table"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _panel = _interopRequireDefault(require("./src/panel"));

var _mixin = _interopRequireDefault(require("./src/mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = {
  Panel: _panel.default,
  install: function install(Vue) {
    _vXETable.default.reg('filter');

    _table.default.mixins.push(_mixin.default);

    Vue.component(_panel.default.name, _panel.default);
  }
};
exports.Filter = Filter;
var _default = Filter;
exports.default = _default;