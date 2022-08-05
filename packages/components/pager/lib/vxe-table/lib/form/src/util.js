"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assemItem = assemItem;
exports.createItem = createItem;
exports.destroyItem = destroyItem;
exports.getItemConfig = getItemConfig;
exports.handleFieldOrItem = void 0;
exports.isActivetem = isActivetem;
exports.isHiddenItem = isHiddenItem;
exports.isItem = isItem;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _log = require("../../tools/log");

var _utils = require("../../tools/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemConfig = /*#__PURE__*/function () {
  function ItemConfig($xeform, item) {
    _classCallCheck(this, ItemConfig);

    Object.assign(this, {
      id: _xeUtils.default.uniqueId('item_'),
      title: item.title,
      field: item.field,
      span: item.span,
      align: item.align,
      titleAlign: item.titleAlign,
      titleWidth: item.titleWidth,
      titleColon: item.titleColon,
      titleAsterisk: item.titleAsterisk,
      titlePrefix: item.titlePrefix,
      titleSuffix: item.titleSuffix,
      titleOverflow: item.titleOverflow,
      resetValue: item.resetValue,
      visible: item.visible,
      visibleMethod: item.visibleMethod,
      folding: item.folding,
      collapseNode: item.collapseNode,
      className: item.className,
      itemRender: item.itemRender,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: item.slots,
      children: []
    });

    if (process.env.NODE_ENV === 'development') {
      var compConf = item.itemRender ? _vXETable.default.renderer.get(item.itemRender.name) : null;

      if (compConf && !compConf.renderItemContent && compConf.renderItem) {
        (0, _log.warnLog)('vxe.error.delProp', ['item-render.renderItem', 'item-render.renderItemContent']);
      }
    }
  }

  _createClass(ItemConfig, [{
    key: "update",
    value: function update(name, value) {
      this[name] = value;
    }
  }]);

  return ItemConfig;
}();

function isItem(option) {
  return option instanceof ItemConfig;
}

function getItemConfig($xeform, _vm, options) {
  return isItem(_vm) ? _vm : new ItemConfig($xeform, _vm, options);
}

var handleFieldOrItem = function handleFieldOrItem($xeform, fieldOrItem) {
  if (fieldOrItem) {
    return _xeUtils.default.isString(fieldOrItem) ? $xeform.getItemByField(fieldOrItem) : fieldOrItem;
  }

  return null;
};

exports.handleFieldOrItem = handleFieldOrItem;

function isHiddenItem($xeform, formItem) {
  var collapseAll = $xeform.collapseAll;
  var folding = formItem.folding,
      visible = formItem.visible;
  return visible === false || folding && collapseAll;
}

function isActivetem($xeform, formItem) {
  var visibleMethod = formItem.visibleMethod,
      itemRender = formItem.itemRender,
      visible = formItem.visible,
      field = formItem.field;

  if (visible === false) {
    return visible;
  }

  var compConf = (0, _utils.isEnableConf)(itemRender) ? _vXETable.default.renderer.get(itemRender.name) : null;

  if (!visibleMethod && compConf && compConf.itemVisibleMethod) {
    visibleMethod = compConf.itemVisibleMethod;
  }

  if (!visibleMethod) {
    return true;
  }

  var data = $xeform.data;
  return visibleMethod({
    data: data,
    field: field,
    property: field,
    item: formItem,
    $form: $xeform
  });
}

function createItem($xeform, _vm) {
  return getItemConfig($xeform, _vm);
}

function destroyItem(_vm) {
  var $xeform = _vm.$xeform,
      itemConfig = _vm.itemConfig;

  var matchObj = _xeUtils.default.findTree($xeform.staticItems, function (option) {
    return option === itemConfig;
  });

  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
}

function assemItem(_vm) {
  var $el = _vm.$el,
      $xeform = _vm.$xeform,
      $xeformgather = _vm.$xeformgather,
      itemConfig = _vm.itemConfig;
  var itemGather = $xeformgather ? $xeformgather.itemConfig : null;
  itemConfig.slots = _vm.$scopedSlots;

  if (itemGather) {
    if (!itemGather.children) {
      itemGather.children = [];
    }

    itemGather.children.splice([].indexOf.call($xeformgather.$el.children, $el), 0, itemConfig);
  } else {
    $xeform.staticItems.splice([].indexOf.call($xeform.$refs.hideItem.children, $el), 0, itemConfig);
  }
}