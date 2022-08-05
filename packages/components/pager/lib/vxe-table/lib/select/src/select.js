"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.renderOptgroup = renderOptgroup;
exports.renderOption = renderOption;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _input = _interopRequireDefault(require("../../input/src/input"));

var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _utils = _interopRequireWildcard(require("../../tools/utils"));

var _dom = _interopRequireDefault(require("../../tools/dom"));

var _event = require("../../tools/event");

var _vn = require("../../tools/vn");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isOptionVisible(option) {
  return option.visible !== false;
}

function getOptUniqueId() {
  return _xeUtils.default.uniqueId('opt_');
}

function getOptkey(_vm) {
  var optionOpts = _vm.optionOpts;
  return optionOpts.keyField || _vm.optionId || '_X_OPTION_KEY';
}

function getOptid(_vm, option) {
  var optid = option[getOptkey(_vm)];
  return optid ? encodeURIComponent(optid) : '';
}

function findOffsetOption(_vm, optionValue, isUpArrow) {
  var isGroup = _vm.isGroup,
      visibleOptionList = _vm.visibleOptionList,
      visibleGroupList = _vm.visibleGroupList,
      valueField = _vm.valueField,
      groupOptionsField = _vm.groupOptionsField;
  var firstOption;
  var prevOption;
  var nextOption;
  var currOption;

  if (isGroup) {
    for (var gIndex = 0; gIndex < visibleGroupList.length; gIndex++) {
      var group = visibleGroupList[gIndex];
      var groupOptionList = group[groupOptionsField];
      var isGroupDisabled = group.disabled;

      if (groupOptionList) {
        for (var index = 0; index < groupOptionList.length; index++) {
          var option = groupOptionList[index];
          var isVisible = isOptionVisible(option);
          var isDisabled = isGroupDisabled || option.disabled;

          if (!firstOption && !isDisabled) {
            firstOption = option;
          }

          if (currOption) {
            if (isVisible && !isDisabled) {
              nextOption = option;

              if (!isUpArrow) {
                return {
                  offsetOption: nextOption
                };
              }
            }
          }

          if (optionValue === option[valueField]) {
            currOption = option;

            if (isUpArrow) {
              return {
                offsetOption: prevOption
              };
            }
          } else {
            if (isVisible && !isDisabled) {
              prevOption = option;
            }
          }
        }
      }
    }
  } else {
    for (var _index = 0; _index < visibleOptionList.length; _index++) {
      var _option = visibleOptionList[_index];
      var _isDisabled = _option.disabled;

      if (!firstOption && !_isDisabled) {
        firstOption = _option;
      }

      if (currOption) {
        if (!_isDisabled) {
          nextOption = _option;

          if (!isUpArrow) {
            return {
              offsetOption: nextOption
            };
          }
        }
      }

      if (optionValue === _option[valueField]) {
        currOption = _option;

        if (isUpArrow) {
          return {
            offsetOption: prevOption
          };
        }
      } else {
        if (!_isDisabled) {
          prevOption = _option;
        }
      }
    }
  }

  return {
    firstOption: firstOption
  };
}

function findOption(_vm, optionValue) {
  var isGroup = _vm.isGroup,
      fullOptionList = _vm.fullOptionList,
      fullGroupList = _vm.fullGroupList,
      valueField = _vm.valueField;

  if (isGroup) {
    for (var gIndex = 0; gIndex < fullGroupList.length; gIndex++) {
      var group = fullGroupList[gIndex];

      if (group.options) {
        for (var index = 0; index < group.options.length; index++) {
          var option = group.options[index];

          if (optionValue === option[valueField]) {
            return option;
          }
        }
      }
    }
  }

  return fullOptionList.find(function (item) {
    return optionValue === item[valueField];
  });
}

function getRemoteSelectLabel(_vm, value) {
  var remoteValueList = _vm.remoteValueList;
  var remoteItem = remoteValueList.find(function (item) {
    return value === item.key;
  });
  var item = remoteItem ? remoteItem.result : null;
  return _xeUtils.default.toValueString(item ? item[_vm.labelField] : value);
}

function getSelectLabel(_vm, value) {
  var item = findOption(_vm, value);
  return _xeUtils.default.toValueString(item ? item[_vm.labelField] : value);
}

function renderOption(h, _vm, list, group) {
  var isGroup = _vm.isGroup,
      labelField = _vm.labelField,
      valueField = _vm.valueField,
      optionKey = _vm.optionKey,
      value = _vm.value,
      multiple = _vm.multiple,
      currentValue = _vm.currentValue,
      optionOpts = _vm.optionOpts;
  var useKey = optionOpts.useKey;
  return list.map(function (option, cIndex) {
    var slots = option.slots;
    var isVisible = !isGroup || isOptionVisible(option);
    var isDisabled = group && group.disabled || option.disabled;
    var optionValue = option[valueField];
    var optid = getOptid(_vm, option);
    var defaultSlot = slots ? slots.default : null;
    return isVisible ? h('div', {
      key: useKey || optionKey ? optid : cIndex,
      class: ['vxe-select-option', option.className, {
        'is--disabled': isDisabled,
        'is--selected': multiple ? value && value.indexOf(optionValue) > -1 : value === optionValue,
        'is--hover': currentValue === optionValue
      }],
      attrs: {
        optid: optid
      },
      on: {
        mousedown: _vm.mousedownOptionEvent,
        click: function click(evnt) {
          if (!isDisabled) {
            _vm.changeOptionEvent(evnt, optionValue, option);
          }
        },
        mouseenter: function mouseenter() {
          if (!isDisabled) {
            _vm.setCurrentOption(option);
          }
        }
      }
    }, defaultSlot ? _vm.callSlot(defaultSlot, {
      option: option,
      $select: _vm
    }, h) : _utils.default.formatText((0, _utils.getFuncText)(option[labelField]))) : null;
  });
}

function renderOptgroup(h, _vm) {
  var optionKey = _vm.optionKey,
      visibleGroupList = _vm.visibleGroupList,
      groupLabelField = _vm.groupLabelField,
      groupOptionsField = _vm.groupOptionsField,
      optionOpts = _vm.optionOpts;
  var useKey = optionOpts.useKey;
  return visibleGroupList.map(function (group, gIndex) {
    var slots = group.slots;
    var optid = getOptid(_vm, group);
    var isGroupDisabled = group.disabled;
    var defaultSlot = slots ? slots.default : null;
    return h('div', {
      key: useKey || optionKey ? optid : gIndex,
      class: ['vxe-optgroup', group.className, {
        'is--disabled': isGroupDisabled
      }],
      attrs: {
        optid: optid
      }
    }, [h('div', {
      class: 'vxe-optgroup--title'
    }, defaultSlot ? _vm.callSlot(defaultSlot, {
      option: group,
      $select: _vm
    }, h) : (0, _utils.getFuncText)(group[groupLabelField])), h('div', {
      class: 'vxe-optgroup--wrapper'
    }, renderOption(h, _vm, group[groupOptionsField], group))]);
  });
}

function renderOpts(h, _vm) {
  var isGroup = _vm.isGroup,
      visibleGroupList = _vm.visibleGroupList,
      visibleOptionList = _vm.visibleOptionList,
      searchLoading = _vm.searchLoading;

  if (searchLoading) {
    return [h('div', {
      class: 'vxe-select--search-loading'
    }, [h('i', {
      class: ['vxe-select--search-icon', _conf.default.icon.SELECT_LOADED]
    }), h('span', {
      class: 'vxe-select--search-text'
    }, _conf.default.i18n('vxe.select.loadingText'))])];
  }

  if (isGroup) {
    if (visibleGroupList.length) {
      return renderOptgroup(h, _vm);
    }
  } else {
    if (visibleOptionList.length) {
      return renderOption(h, _vm, visibleOptionList);
    }
  }

  return [h('div', {
    class: 'vxe-select--empty-placeholder'
  }, _vm.emptyText || _conf.default.i18n('vxe.select.emptyText'))];
}

var _default2 = {
  name: 'VxeSelect',
  mixins: [_size.default],
  props: {
    value: null,
    clearable: Boolean,
    placeholder: String,
    loading: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    multiCharOverflow: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.select.multiCharOverflow;
      }
    },
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    optionConfig: Object,
    className: [String, Function],
    size: {
      type: String,
      default: function _default() {
        return _conf.default.select.size || _conf.default.size;
      }
    },
    filterable: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    emptyText: String,
    // 已废弃，被 option-config.keyField 替换
    optionId: {
      type: String,
      default: function _default() {
        return _conf.default.select.optionId;
      }
    },
    // 已废弃，被 option-config.useKey 替换
    optionKey: Boolean,
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.select.transfer;
      }
    }
  },
  components: {
    VxeInput: _input.default
  },
  inject: {
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
      default: null
    }
  },
  provide: function provide() {
    return {
      $xeselect: this
    };
  },
  data: function data() {
    return {
      inited: false,
      collectOption: [],
      fullGroupList: [],
      fullOptionList: [],
      visibleGroupList: [],
      visibleOptionList: [],
      remoteValueList: [],
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentOption: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false,
      searchValue: '',
      searchLoading: false
    };
  },
  computed: {
    propsOpts: function propsOpts() {
      return this.optionProps || {};
    },
    groupPropsOpts: function groupPropsOpts() {
      return this.optionGroupProps || {};
    },
    labelField: function labelField() {
      return this.propsOpts.label || 'label';
    },
    valueField: function valueField() {
      return this.propsOpts.value || 'value';
    },
    groupLabelField: function groupLabelField() {
      return this.groupPropsOpts.label || 'label';
    },
    groupOptionsField: function groupOptionsField() {
      return this.groupPropsOpts.options || 'options';
    },
    optionOpts: function optionOpts() {
      return Object.assign({}, _conf.default.select.optionConfig, this.optionConfig);
    },
    isGroup: function isGroup() {
      return this.fullGroupList.some(function (item) {
        return item.options && item.options.length;
      });
    },
    multiMaxCharNum: function multiMaxCharNum() {
      return _xeUtils.default.toNumber(this.multiCharOverflow);
    },
    selectLabel: function selectLabel() {
      var _this = this;

      var value = this.value,
          multiple = this.multiple,
          remote = this.remote,
          multiMaxCharNum = this.multiMaxCharNum;

      if (value && multiple) {
        var vals = _xeUtils.default.isArray(value) ? value : [value];

        if (remote) {
          return vals.map(function (val) {
            return getRemoteSelectLabel(_this, val);
          }).join(', ');
        }

        return vals.map(function (val) {
          var label = getSelectLabel(_this, val);

          if (multiMaxCharNum > 0 && label.length > multiMaxCharNum) {
            return "".concat(label.substring(0, multiMaxCharNum), "...");
          }

          return label;
        }).join(', ');
      }

      if (remote) {
        return getRemoteSelectLabel(this, value);
      }

      return getSelectLabel(this, value);
    }
  },
  watch: {
    collectOption: function collectOption(value) {
      if (value.some(function (item) {
        return item.options && item.options.length;
      })) {
        this.fullOptionList = [];
        this.fullGroupList = value;
      } else {
        this.fullGroupList = [];
        this.fullOptionList = value;
      }

      this.cacheItemMap();
    },
    options: function options(value) {
      this.fullGroupList = [];
      this.fullOptionList = value;
      this.cacheItemMap();
    },
    optionGroups: function optionGroups(value) {
      this.fullOptionList = [];
      this.fullGroupList = value;
      this.cacheItemMap();
    }
  },
  created: function created() {
    var options = this.options,
        optionGroups = this.optionGroups;

    if (optionGroups) {
      this.fullGroupList = optionGroups;
    } else if (options) {
      this.fullOptionList = options;
    }

    this.cacheItemMap();

    _event.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _event.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _event.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _event.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    _event.GlobalEvent.off(this, 'mousewheel');

    _event.GlobalEvent.off(this, 'mousedown');

    _event.GlobalEvent.off(this, 'keydown');

    _event.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref, _ref2;

    var _e = this._e,
        $scopedSlots = this.$scopedSlots,
        vSize = this.vSize,
        className = this.className,
        inited = this.inited,
        isActivated = this.isActivated,
        loading = this.loading,
        disabled = this.disabled,
        visiblePanel = this.visiblePanel,
        filterable = this.filterable;
    var prefixSlot = $scopedSlots.prefix;
    return h('div', {
      class: ['vxe-select', className ? _xeUtils.default.isFunction(className) ? className({
        $select: this
      }) : className : '', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--visivle', visiblePanel), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--filter', filterable), _defineProperty(_ref, 'is--loading', loading), _defineProperty(_ref, 'is--active', isActivated), _ref)]
    }, [h('div', {
      class: 'vxe-select-slots',
      ref: 'hideOption'
    }, this.$slots.default), h('vxe-input', {
      ref: 'input',
      props: {
        clearable: this.clearable,
        placeholder: this.placeholder,
        readonly: true,
        disabled: disabled,
        type: 'text',
        prefixIcon: this.prefixIcon,
        suffixIcon: loading ? _conf.default.icon.SELECT_LOADED : visiblePanel ? _conf.default.icon.SELECT_OPEN : _conf.default.icon.SELECT_CLOSE,
        value: this.selectLabel
      },
      on: {
        clear: this.clearEvent,
        click: this.togglePanelEvent,
        focus: this.focusEvent,
        blur: this.blurEvent,
        'suffix-click': this.togglePanelEvent
      },
      scopedSlots: prefixSlot ? {
        prefix: function prefix() {
          return prefixSlot({});
        }
      } : {}
    }), h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-select--panel', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--transfer', this.transfer), _defineProperty(_ref2, 'animat--leave', !loading && this.animatVisible), _defineProperty(_ref2, 'animat--enter', !loading && visiblePanel), _ref2)],
      attrs: {
        placement: this.panelPlacement
      },
      style: this.panelStyle
    }, inited ? [filterable ? h('div', {
      class: 'vxe-select-filter--wrapper'
    }, [h('vxe-input', {
      ref: 'inpSearch',
      class: 'vxe-select-filter--input',
      props: {
        value: this.searchValue,
        type: 'text',
        clearable: true,
        placeholder: _conf.default.i18n('vxe.select.search'),
        prefixIcon: _conf.default.icon.INPUT_SEARCH
      },
      on: {
        modelValue: this.modelSearchEvent,
        focus: this.focusSearchEvent,
        keydown: this.keydownSearchEvent,
        change: this.triggerSearchEvent,
        search: this.triggerSearchEvent
      }
    })]) : _e(), h('div', {
      ref: 'optWrapper',
      class: 'vxe-select-option--wrapper'
    }, renderOpts(h, this))] : null)]);
  },
  methods: {
    callSlot: function callSlot(slotFunc, params, h) {
      if (slotFunc) {
        var $scopedSlots = this.$scopedSlots;

        if (_xeUtils.default.isString(slotFunc)) {
          slotFunc = $scopedSlots[slotFunc] || null;
        }

        if (_xeUtils.default.isFunction(slotFunc)) {
          return (0, _vn.getSlotVNs)(slotFunc.call(this, params, h));
        }
      }

      return [];
    },
    cacheItemMap: function cacheItemMap() {
      var _this2 = this;

      var fullOptionList = this.fullOptionList,
          fullGroupList = this.fullGroupList,
          groupOptionsField = this.groupOptionsField;
      var optkey = getOptkey(this);

      var handleOptis = function handleOptis(item) {
        if (!getOptid(_this2, item)) {
          item[optkey] = getOptUniqueId();
        }
      };

      if (fullGroupList.length) {
        fullGroupList.forEach(function (group) {
          handleOptis(group);

          if (group[groupOptionsField]) {
            group[groupOptionsField].forEach(handleOptis);
          }
        });
      } else if (fullOptionList.length) {
        fullOptionList.forEach(handleOptis);
      }

      this.refreshOption();
    },

    /**
     * 刷新选项，当选项被搜索、动态显示/隐藏时可能会用到
     */
    refreshOption: function refreshOption() {
      var isGroup = this.isGroup,
          fullOptionList = this.fullOptionList,
          fullGroupList = this.fullGroupList,
          filterable = this.filterable,
          filterMethod = this.filterMethod,
          searchValue = this.searchValue,
          labelField = this.labelField,
          groupLabelField = this.groupLabelField;

      if (isGroup) {
        if (filterable && filterMethod) {
          this.visibleGroupList = fullGroupList.filter(function (group) {
            return isOptionVisible(group) && filterMethod({
              group: group,
              option: null,
              searchValue: searchValue
            });
          });
        } else if (filterable) {
          this.visibleGroupList = fullGroupList.filter(function (group) {
            return isOptionVisible(group) && (!searchValue || "".concat(group[groupLabelField]).indexOf(searchValue) > -1);
          });
        } else {
          this.visibleGroupList = fullGroupList.filter(isOptionVisible);
        }
      } else {
        if (filterable && filterMethod) {
          this.visibleOptionList = fullOptionList.filter(function (option) {
            return isOptionVisible(option) && filterMethod({
              group: null,
              option: option,
              searchValue: searchValue
            });
          });
        } else if (filterable) {
          this.visibleOptionList = fullOptionList.filter(function (option) {
            return isOptionVisible(option) && (!searchValue || "".concat(option[labelField]).indexOf(searchValue) > -1);
          });
        } else {
          this.visibleOptionList = fullOptionList.filter(isOptionVisible);
        }
      }

      return this.$nextTick();
    },
    setCurrentOption: function setCurrentOption(option) {
      if (option) {
        this.currentOption = option;
        this.currentValue = option[this.valueField];
      }
    },
    scrollToOption: function scrollToOption(option, isAlignBottom) {
      var _this3 = this;

      return this.$nextTick().then(function () {
        if (option) {
          var $refs = _this3.$refs;
          var optWrapperElem = $refs.optWrapper;
          var optElem = $refs.panel.querySelector("[optid='".concat(getOptid(_this3, option), "']"));

          if (optWrapperElem && optElem) {
            var wrapperHeight = optWrapperElem.offsetHeight;
            var offsetPadding = 5;

            if (isAlignBottom) {
              if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight;
              }
            } else {
              if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding;
              }
            }
          }
        }
      });
    },
    clearEvent: function clearEvent(params, evnt) {
      this.clearValueEvent(evnt, null);
      this.hideOptionPanel();
    },
    clearValueEvent: function clearValueEvent(evnt, selectValue) {
      this.remoteValueList = [];
      this.changeEvent(evnt, selectValue);
      this.$emit('clear', {
        value: selectValue,
        $event: evnt
      });
    },
    changeEvent: function changeEvent(evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue);
        this.$emit('change', {
          value: selectValue,
          $event: evnt
        }); // 自动更新校验状态

        if (this.$xeform && this.$xeformiteminfo) {
          this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, selectValue);
        }
      }
    },
    mousedownOptionEvent: function mousedownOptionEvent(evnt) {
      var isLeftBtn = evnt.button === 0;

      if (isLeftBtn) {
        evnt.stopPropagation();
      }
    },
    changeOptionEvent: function changeOptionEvent(evnt, selectValue, option) {
      var value = this.value,
          multiple = this.multiple,
          remoteValueList = this.remoteValueList;

      if (multiple) {
        var multipleValue;

        if (value) {
          if (value.indexOf(selectValue) === -1) {
            multipleValue = value.concat([selectValue]);
          } else {
            multipleValue = value.filter(function (val) {
              return val !== selectValue;
            });
          }
        } else {
          multipleValue = [selectValue];
        }

        var remoteItem = remoteValueList.find(function (item) {
          return item.key === selectValue;
        });

        if (remoteItem) {
          remoteItem.result = option;
        } else {
          remoteValueList.push({
            key: selectValue,
            result: option
          });
        }

        this.changeEvent(evnt, multipleValue);
      } else {
        this.remoteValueList = [{
          key: selectValue,
          result: option
        }];
        this.changeEvent(evnt, selectValue);
        this.hideOptionPanel();
      }
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        if (visiblePanel) {
          if (_dom.default.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement();
          } else {
            this.hideOptionPanel();
          }
        }
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        this.isActivated = _dom.default.getEventTargetNode(evnt, $el).flag || _dom.default.getEventTargetNode(evnt, $refs.panel).flag;

        if (visiblePanel && !this.isActivated) {
          this.hideOptionPanel();
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var visiblePanel = this.visiblePanel,
          currentValue = this.currentValue,
          currentOption = this.currentOption,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isEnter = keyCode === 13;
        var isEsc = keyCode === 27;
        var isUpArrow = keyCode === 38;
        var isDwArrow = keyCode === 40;
        var isDel = keyCode === 46;
        var isSpacebar = keyCode === 32;

        if (isTab) {
          this.isActivated = false;
        }

        if (visiblePanel) {
          if (isEsc || isTab) {
            this.hideOptionPanel();
          } else if (isEnter) {
            evnt.preventDefault();
            evnt.stopPropagation();
            this.changeOptionEvent(evnt, currentValue, currentOption);
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();

            var _findOffsetOption = findOffsetOption(this, currentValue, isUpArrow),
                firstOption = _findOffsetOption.firstOption,
                offsetOption = _findOffsetOption.offsetOption;

            if (!offsetOption && !findOption(this, currentValue)) {
              offsetOption = firstOption;
            }

            this.setCurrentOption(offsetOption);
            this.scrollToOption(offsetOption, isDwArrow);
          } else if (isSpacebar) {
            evnt.preventDefault();
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && this.isActivated) {
          evnt.preventDefault();
          this.showOptionPanel();
        }

        if (this.isActivated) {
          if (isDel && clearable) {
            this.clearValueEvent(evnt, null);
          }
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      this.hideOptionPanel();
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < _utils.default.getLastZIndex()) {
        this.panelIndex = _utils.default.nextZIndex();
      }
    },
    handleFocusSearch: function handleFocusSearch() {
      var _this4 = this;

      if (this.filterable) {
        this.$nextTick(function () {
          if (_this4.$refs.inpSearch) {
            _this4.$refs.inpSearch.focus();
          }
        });
      }
    },
    focusEvent: function focusEvent() {
      if (!this.disabled) {
        this.isActivated = true;
      }
    },
    blurEvent: function blurEvent() {
      this.isActivated = false;
    },
    modelSearchEvent: function modelSearchEvent(value) {
      this.searchValue = value;
    },
    focusSearchEvent: function focusSearchEvent() {
      this.isActivated = true;
    },
    keydownSearchEvent: function keydownSearchEvent(params) {
      var $event = params.$event;
      var isEnter = (0, _event.hasEventKey)($event, _event.EVENT_KEYS.ENTER);

      if (isEnter) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    },
    triggerSearchEvent: _xeUtils.default.debounce(function () {
      var _this5 = this;

      var remote = this.remote,
          remoteMethod = this.remoteMethod,
          searchValue = this.searchValue;

      if (remote && remoteMethod) {
        this.searchLoading = true;
        Promise.resolve(remoteMethod({
          searchValue: searchValue
        })).then(function () {
          return _this5.$nextTick();
        }).catch(function () {
          return _this5.$nextTick();
        }).finally(function () {
          _this5.searchLoading = false;

          _this5.refreshOption();
        });
      } else {
        this.refreshOption();
      }
    }, 350, {
      trailing: true
    }),
    isPanelVisible: function isPanelVisible() {
      return this.visiblePanel;
    },
    togglePanel: function togglePanel() {
      if (this.visiblePanel) {
        this.hideOptionPanel();
      } else {
        this.showOptionPanel();
      }

      this.$nextTick();
    },
    hidePanel: function hidePanel() {
      if (this.visiblePanel) {
        this.hideOptionPanel();
      }

      this.$nextTick();
    },
    showPanel: function showPanel() {
      if (!this.visiblePanel) {
        this.showOptionPanel();
      }

      this.$nextTick();
    },
    togglePanelEvent: function togglePanelEvent(params) {
      var $event = params.$event;
      $event.preventDefault();

      if (this.visiblePanel) {
        this.hideOptionPanel();
      } else {
        this.showOptionPanel();
      }
    },
    showOptionPanel: function showOptionPanel() {
      var _this6 = this;

      var loading = this.loading,
          disabled = this.disabled,
          filterable = this.filterable;

      if (!loading && !disabled) {
        this.searchList = this.option;
        clearTimeout(this.hidePanelTimeout);

        if (!this.inited) {
          this.inited = true;

          if (this.transfer) {
            document.body.appendChild(this.$refs.panel);
          }
        }

        this.isActivated = true;
        this.animatVisible = true;

        if (filterable) {
          this.refreshOption();
        }

        setTimeout(function () {
          var value = _this6.value,
              multiple = _this6.multiple;
          var currOption = findOption(_this6, multiple && value ? value[0] : value);
          _this6.visiblePanel = true;

          if (currOption) {
            _this6.setCurrentOption(currOption);

            _this6.scrollToOption(currOption);
          }

          _this6.handleFocusSearch();
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hideOptionPanel: function hideOptionPanel() {
      var _this7 = this;

      this.searchValue = '';
      this.searchLoading = false;
      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this7.animatVisible = false;
        _this7.searchValue = '';
      }, 350);
    },
    updatePlacement: function updatePlacement() {
      var _this8 = this;

      return this.$nextTick().then(function () {
        var $refs = _this8.$refs,
            transfer = _this8.transfer,
            placement = _this8.placement,
            panelIndex = _this8.panelIndex;
        var targetElem = $refs.input.$el;
        var panelElem = $refs.panel;

        if (panelElem && targetElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };

          var _DomTools$getAbsolute = _dom.default.getAbsolutePos(targetElem),
              boundingTop = _DomTools$getAbsolute.boundingTop,
              boundingLeft = _DomTools$getAbsolute.boundingLeft,
              visibleHeight = _DomTools$getAbsolute.visibleHeight,
              visibleWidth = _DomTools$getAbsolute.visibleWidth;

          var panelPlacement = 'bottom';

          if (transfer) {
            var left = boundingLeft;
            var top = boundingTop + targetHeight;

            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } // 如果上面不够放，则向下（优先）


              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            } // 如果溢出右边


            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            } // 如果溢出左边


            if (left < marginSize) {
              left = marginSize;
            }

            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }

          _this8.panelStyle = panelStyle;
          _this8.panelPlacement = panelPlacement;
          return _this8.$nextTick();
        }
      });
    },
    focus: function focus() {
      this.isActivated = true;
      this.$refs.input.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.hideOptionPanel();
      this.$refs.input.blur();
      return this.$nextTick();
    }
  }
};
exports.default = _default2;