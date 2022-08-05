"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeLoading',
  props: {
    loading: Boolean
  },
  render: function render(h) {
    var icon = _conf.default.icon.LOADING;
    var loadingText = _conf.default.loadingText;
    var text = loadingText === null ? loadingText : _conf.default.i18n('vxe.loading.text');
    return h('div', {
      class: ['vxe-loading', {
        'is--visible': this.loading
      }]
    }, [h('div', {
      class: 'vxe-loading--chunk'
    }, [icon ? h('i', {
      class: icon
    }) : h('div', {
      class: 'vxe-loading--spinner'
    }), text ? h('div', {
      class: 'vxe-loading--text'
    }, "".concat(text)) : null])]);
  }
};
exports.default = _default;