"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _log = require("../../tools/log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 创建数据仓库
 */
var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);

    this.store = {};
  }

  _createClass(Store, [{
    key: "mixin",
    value: function mixin(map) {
      Object.assign(this.store, map);
      return Store;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.store[name];
    }
  }, {
    key: "add",
    value: function add(name, render) {
      var conf = this.store[name]; // 检测是否覆盖

      if (process.env.NODE_ENV === 'development') {
        var confKeys = _xeUtils.default.keys(conf);

        _xeUtils.default.each(render, function (item, key) {
          if (confKeys.includes(key)) {
            (0, _log.warnLog)('vxe.error.coverProp', [name, key]);
          }
        });
      }

      this.store[name] = conf ? _xeUtils.default.merge(conf, render) : render;
      return Store;
    }
  }, {
    key: "delete",
    value: function _delete(name) {
      delete this.store[name];
      return Store;
    }
  }]);

  return Store;
}();

var _default = Store;
exports.default = _default;