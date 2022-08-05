"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _utils = require("../../tools/utils");

var _render = require("./render");

var _util = require("./util");

var _vn = require("../../tools/vn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 配置式项
 */
var VxeFormConfigItem = {
  name: 'VxeFormConfigItem',
  props: {
    itemConfig: Object
  },
  inject: {
    $xeform: {
      default: null
    }
  },
  provide: function provide() {
    return {
      $xeformgather: null,
      $xeformiteminfo: this
    };
  },
  render: function render(h) {
    var _e = this._e,
        $xeform = this.$xeform,
        item = this.itemConfig;
    var rules = $xeform.rules,
        data = $xeform.data,
        collapseAll = $xeform.collapseAll,
        validOpts = $xeform.validOpts,
        allTitleAlign = $xeform.titleAlign,
        allTitleWidth = $xeform.titleWidth,
        allTitleColon = $xeform.titleColon,
        allTitleAsterisk = $xeform.titleAsterisk,
        allTitleOverflow = $xeform.titleOverflow;
    var slots = item.slots,
        title = item.title,
        folding = item.folding,
        visible = item.visible,
        field = item.field,
        collapseNode = item.collapseNode,
        itemRender = item.itemRender,
        showError = item.showError,
        errRule = item.errRule,
        className = item.className,
        titleOverflow = item.titleOverflow,
        children = item.children;
    var compConf = (0, _utils.isEnableConf)(itemRender) ? _vXETable.default.renderer.get(itemRender.name) : null;
    var itemClassName = compConf ? compConf.itemClassName : '';
    var span = item.span || $xeform.span;
    var align = item.align || $xeform.align;
    var titleAlign = _xeUtils.default.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign;
    var titleWidth = _xeUtils.default.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth;
    var titleColon = _xeUtils.default.eqNull(item.titleColon) ? allTitleColon : item.titleColon;
    var titleAsterisk = _xeUtils.default.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk;
    var itemOverflow = _xeUtils.default.isUndefined(titleOverflow) || _xeUtils.default.isNull(titleOverflow) ? allTitleOverflow : titleOverflow;
    var showEllipsis = itemOverflow === 'ellipsis';
    var showTitle = itemOverflow === 'title';
    var showTooltip = itemOverflow === true || itemOverflow === 'tooltip';
    var hasEllipsis = showTitle || showTooltip || showEllipsis;
    var params = {
      data: data,
      field: field,
      property: field,
      item: item,
      $form: $xeform
    };
    var isRequired;

    if (visible === false) {
      return _e();
    } // 如果为项集合


    var isGather = children && children.length > 0;

    if (isGather) {
      var childVNs = item.children.map(function (childItem, index) {
        return h(VxeFormConfigItem, {
          key: index,
          props: {
            itemConfig: childItem
          }
        });
      });
      return childVNs.length ? h('div', {
        class: ['vxe-form--gather vxe-row', item.id, span ? "vxe-col--".concat(span, " is--span") : '', className ? _xeUtils.default.isFunction(className) ? className(params) : className : '']
      }, childVNs) : _e();
    }

    if (rules) {
      var itemRules = rules[field];

      if (itemRules) {
        isRequired = itemRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    var contentVNs = [];

    if (slots && slots.default) {
      contentVNs = $xeform.callSlot(slots.default, params, h);
    } else if (compConf && compConf.renderItemContent) {
      contentVNs = (0, _vn.getSlotVNs)(compConf.renderItemContent.call($xeform, h, itemRender, params));
    } else if (compConf && compConf.renderItem) {
      contentVNs = (0, _vn.getSlotVNs)(compConf.renderItem.call($xeform, h, itemRender, params));
    } else if (field) {
      contentVNs = [_xeUtils.default.toValueString(_xeUtils.default.get(data, field))];
    }

    var ons = showTooltip ? {
      mouseenter: function mouseenter(evnt) {
        $xeform.triggerTitleTipEvent(evnt, params);
      },
      mouseleave: $xeform.handleTitleTipLeaveEvent
    } : {};
    return h('div', {
      class: ['vxe-form--item', item.id, span ? "vxe-col--".concat(span, " is--span") : null, className ? _xeUtils.default.isFunction(className) ? className(params) : className : '', itemClassName ? _xeUtils.default.isFunction(itemClassName) ? itemClassName(params) : itemClassName : '', {
        'is--title': title,
        'is--colon': titleColon,
        'is--asterisk': titleAsterisk,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': (0, _util.isActivetem)($xeform, item),
        'is--error': showError
      }],
      props: {
        itemConfig: item
      },
      key: item.id
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title || slots && slots.title ? h('div', {
      class: ['vxe-form--item-title', titleAlign ? "align--".concat(titleAlign) : null, {
        'is--ellipsis': hasEllipsis
      }],
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null,
      attrs: {
        title: showTitle ? (0, _utils.getFuncText)(title) : null
      },
      on: ons
    }, (0, _render.renderTitle)(h, $xeform, item)) : null, h('div', {
      class: ['vxe-form--item-content', align ? "align--".concat(align) : null]
    }, contentVNs.concat([collapseNode ? h('div', {
      class: 'vxe-form--item-trigger-node',
      on: {
        click: $xeform.toggleCollapseEvent
      }
    }, [h('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? _conf.default.i18n('vxe.form.unfolding') : _conf.default.i18n('vxe.form.folding')), h('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? _conf.default.icon.FORM_FOLDING : _conf.default.icon.FORM_UNFOLDING]
    })]) : null, errRule && validOpts.showMessage ? h('div', {
      class: 'vxe-form--item-valid',
      style: errRule.maxWidth ? {
        width: "".concat(errRule.maxWidth, "px")
      } : null
    }, errRule.content) : null]))])]);
  }
};
var _default = VxeFormConfigItem;
exports.default = _default;