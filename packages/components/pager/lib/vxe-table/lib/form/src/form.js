"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _utils = require("../../tools/utils");

var _dom = _interopRequireWildcard(require("../../tools/dom"));

var _util = require("./util");

var _log = require("../../tools/log");

var _formConfigItem = _interopRequireDefault(require("./form-config-item"));

var _index = _interopRequireDefault(require("../../loading/index"));

var _vn = require("../../tools/vn");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rule = /*#__PURE__*/function () {
  function Rule(rule) {
    _classCallCheck(this, Rule);

    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }

  _createClass(Rule, [{
    key: "content",
    get: function get() {
      return (0, _utils.getFuncText)(this.$options.content || this.$options.message);
    }
  }, {
    key: "message",
    get: function get() {
      return this.content;
    }
  }]);

  return Rule;
}();

function validErrorRuleValue(rule, val) {
  var type = rule.type,
      min = rule.min,
      max = rule.max,
      pattern = rule.pattern;
  var isNumType = type === 'number';
  var numVal = isNumType ? _xeUtils.default.toNumber(val) : _xeUtils.default.getSize(val); // 判断数值

  if (isNumType && isNaN(val)) {
    return true;
  } // 如果存在 min，判断最小值


  if (!_xeUtils.default.eqNull(min) && numVal < _xeUtils.default.toNumber(min)) {
    return true;
  } // 如果存在 max，判断最大值


  if (!_xeUtils.default.eqNull(max) && numVal > _xeUtils.default.toNumber(max)) {
    return true;
  } // 如果存在 pattern，正则校验


  if (pattern && !(_xeUtils.default.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return true;
  }

  return false;
}

function getResetValue(value, resetValue) {
  if (_xeUtils.default.isArray(value)) {
    resetValue = [];
  }

  return resetValue;
}

var _default2 = {
  name: 'VxeForm',
  mixins: [_size.default],
  props: {
    collapseStatus: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    data: Object,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.form.size || _conf.default.size;
      }
    },
    span: {
      type: [String, Number],
      default: function _default() {
        return _conf.default.form.span;
      }
    },
    align: {
      type: String,
      default: function _default() {
        return _conf.default.form.align;
      }
    },
    titleAlign: {
      type: String,
      default: function _default() {
        return _conf.default.form.titleAlign;
      }
    },
    titleWidth: {
      type: [String, Number],
      default: function _default() {
        return _conf.default.form.titleWidth;
      }
    },
    titleColon: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.titleColon;
      }
    },
    titleAsterisk: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.titleAsterisk;
      }
    },
    titleOverflow: {
      type: [Boolean, String],
      default: null
    },
    className: [String, Function],
    readonly: Boolean,
    items: Array,
    rules: Object,
    preventSubmit: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.preventSubmit;
      }
    },
    validConfig: Object,
    tooltipConfig: Object,
    customLayout: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.customLayout;
      }
    }
  },
  data: function data() {
    return {
      collapseAll: this.collapseStatus,
      staticItems: [],
      formItems: [],
      tooltipTimeout: null,
      tooltipStore: {
        item: null,
        visible: false
      }
    };
  },
  provide: function provide() {
    return {
      $xeform: this,
      $xeformgather: null,
      $xeformitem: null,
      $xeformiteminfo: null
    };
  },
  computed: {
    validOpts: function validOpts() {
      return Object.assign({}, _conf.default.form.validConfig, this.validConfig);
    },
    tooltipOpts: function tooltipOpts() {
      return Object.assign({}, _conf.default.tooltip, _conf.default.form.tooltipConfig, this.tooltipConfig);
    }
  },
  watch: {
    staticItems: function staticItems(value) {
      this.formItems = value;
    },
    items: function items(value) {
      this.loadItem(value);
    },
    collapseStatus: function collapseStatus(value) {
      this.collapseAll = !!value;
    }
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      var items = _this.items;

      if (process.env.NODE_ENV === 'development') {
        if (_this.customLayout && _this.items) {
          (0, _log.errLog)('vxe.error.errConflicts', ['custom-layout', 'items']);
        }
      }

      if (items) {
        _this.loadItem(items);
      }
    });
  },
  render: function render(h) {
    var _ref;

    var _e = this._e,
        loading = this.loading,
        className = this.className,
        data = this.data,
        vSize = this.vSize,
        tooltipOpts = this.tooltipOpts,
        formItems = this.formItems,
        customLayout = this.customLayout;
    var hasUseTooltip = _vXETable.default._tooltip;
    var defaultSlot = this.$scopedSlots.default;
    return h('form', {
      class: ['vxe-form', className ? _xeUtils.default.isFunction(className) ? className({
        items: formItems,
        data: data,
        $form: this
      }) : className : '', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--loading', loading), _ref)],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, [h('div', {
      class: 'vxe-form--wrapper vxe-row'
    }, customLayout ? defaultSlot ? defaultSlot.call(this, h, {}) : [] : formItems.map(function (item, index) {
      return h(_formConfigItem.default, {
        key: index,
        props: {
          itemConfig: item
        }
      });
    })), h('div', {
      class: 'vxe-form-slots',
      ref: 'hideItem'
    }, customLayout ? [] : defaultSlot ? defaultSlot.call(this, h, {}) : []),
    /**
     * 加载中
     */
    h(_index.default, {
      class: 'vxe-form--loading',
      props: {
        loading: loading
      }
    }),
    /**
     * 工具提示
     */
    hasUseTooltip ? h('vxe-tooltip', {
      ref: 'tooltip',
      props: tooltipOpts
    }) : _e()]);
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
    loadItem: function loadItem(list) {
      var _this2 = this;

      if (process.env.NODE_ENV === 'development') {
        var $scopedSlots = this.$scopedSlots;
        list.forEach(function (item) {
          if (item.slots) {
            _xeUtils.default.each(item.slots, function (func) {
              if (!_xeUtils.default.isFunction(func)) {
                if (!$scopedSlots[func]) {
                  (0, _log.errLog)('vxe.error.notSlot', [func]);
                }
              }
            });
          }
        });
      }

      this.staticItems = _xeUtils.default.mapTree(list, function (item) {
        return (0, _util.createItem)(_this2, item);
      }, {
        children: 'children'
      });
      return this.$nextTick();
    },
    getItems: function getItems() {
      var itemList = [];

      _xeUtils.default.eachTree(this.formItems, function (item) {
        itemList.push(item);
      }, {
        children: 'children'
      });

      return itemList;
    },
    getItemByField: function getItemByField(field) {
      var rest = _xeUtils.default.findTree(this.formItems, function (item) {
        return item.field === field;
      }, {
        children: 'children'
      });

      return rest ? rest.item : null;
    },
    toggleCollapse: function toggleCollapse() {
      var status = !this.collapseAll;
      this.collapseAll = status;
      this.$emit('update:collapseStatus', status);
      return this.$nextTick();
    },
    toggleCollapseEvent: function toggleCollapseEvent(evnt) {
      this.toggleCollapse();
      var status = this.collapseAll;
      this.$emit('toggle-collapse', {
        status: status,
        collapse: status,
        data: this.data,
        $form: this,
        $event: evnt
      }, evnt);
      this.$emit('collapse', {
        status: status,
        collapse: status,
        data: this.data,
        $form: this,
        $event: evnt
      }, evnt);
    },
    submitEvent: function submitEvent(evnt) {
      var _this3 = this;

      evnt.preventDefault();

      if (!this.preventSubmit) {
        this.clearValidate();
        this.beginValidate(this.getItems()).then(function (errMap) {
          if (errMap) {
            _this3.$emit('submit-invalid', {
              data: _this3.data,
              errMap: errMap,
              $form: _this3,
              $event: evnt
            });
          } else {
            _this3.$emit('submit', {
              data: _this3.data,
              $event: evnt
            });
          }
        });
      }
    },
    reset: function reset() {
      var _this4 = this;

      var data = this.data;

      if (data) {
        var itemList = this.getItems();
        itemList.forEach(function (item) {
          var field = item.field,
              resetValue = item.resetValue,
              itemRender = item.itemRender;

          if ((0, _utils.isEnableConf)(itemRender)) {
            var compConf = _vXETable.default.renderer.get(itemRender.name);

            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({
                data: data,
                field: field,
                property: field,
                item: item,
                $form: _this4
              });
            } else if (field) {
              _xeUtils.default.set(data, field, resetValue === null ? getResetValue(_xeUtils.default.get(data, field), undefined) : resetValue);
            }
          }
        });
      }

      return this.clearValidate();
    },
    resetEvent: function resetEvent(evnt) {
      evnt.preventDefault();
      this.reset();
      this.$emit('reset', {
        data: this.data,
        $form: this,
        $event: evnt
      });
    },
    closeTooltip: function closeTooltip() {
      var tooltipStore = this.tooltipStore;
      var $tooltip = this.$refs.tooltip;

      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        });

        if ($tooltip) {
          $tooltip.close();
        }
      }

      return this.$nextTick();
    },
    triggerTitleTipEvent: function triggerTitleTipEvent(evnt, params) {
      var item = params.item;
      var tooltipStore = this.tooltipStore;
      var $tooltip = this.$refs.tooltip;
      var overflowElem = evnt.currentTarget.children[0];
      var content = (overflowElem.textContent || '').trim();
      var isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;
      clearTimeout(this.tooltipTimeout);

      if (tooltipStore.item !== item) {
        this.closeTooltip();
      }

      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item: item,
          visible: true
        });

        if ($tooltip) {
          $tooltip.open(overflowElem, content);
        }
      }
    },
    handleTitleTipLeaveEvent: function handleTitleTipLeaveEvent() {
      var _this5 = this;

      var tooltipOpts = this.tooltipOpts;
      var $tooltip = this.$refs.tooltip;

      if ($tooltip) {
        $tooltip.setActived(false);
      }

      if (tooltipOpts.enterable) {
        this.tooltipTimeout = setTimeout(function () {
          $tooltip = _this5.$refs.tooltip;

          if ($tooltip && !$tooltip.isActived()) {
            _this5.closeTooltip();
          }
        }, tooltipOpts.leaveDelay);
      } else {
        this.closeTooltip();
      }
    },
    clearValidate: function clearValidate(fieldOrItem) {
      if (fieldOrItem) {
        var item = (0, _util.handleFieldOrItem)(this, fieldOrItem);

        if (item) {
          item.showError = false;
        }
      } else {
        this.getItems().forEach(function (item) {
          item.showError = false;
        });
      }

      return this.$nextTick();
    },
    validate: function validate(callback) {
      this.clearValidate();
      return this.beginValidate(this.getItems(), '', callback);
    },
    validateField: function validateField(fieldOrItem, callback) {
      var item = (0, _util.handleFieldOrItem)(this, fieldOrItem);
      return this.beginValidate(item ? [item] : [], '', callback);
    },
    beginValidate: function beginValidate(itemList, type, callback) {
      var _this6 = this;

      var data = this.data,
          formRules = this.rules,
          validOpts = this.validOpts;
      var validRest = {};
      var validFields = [];
      var itemValids = [];
      clearTimeout(this.showErrTime);

      if (data && formRules) {
        itemList.forEach(function (item) {
          var field = item.field;

          if (field && !(0, _util.isHiddenItem)(_this6, item) && (0, _util.isActivetem)(_this6, item)) {
            itemValids.push(_this6.validItemRules(type || 'all', field).then(function () {
              item.errRule = null;
            }).catch(function (_ref2) {
              var rule = _ref2.rule,
                  rules = _ref2.rules;
              var rest = {
                rule: rule,
                rules: rules,
                data: data,
                field: field,
                property: field,
                $form: _this6
              };

              if (!validRest[field]) {
                validRest[field] = [];
              }

              validRest[field].push(rest);
              validFields.push(field);
              item.errRule = rule;
              return Promise.reject(rest);
            }));
          }
        });
        return Promise.all(itemValids).then(function () {
          if (callback) {
            callback();
          }
        }).catch(function () {
          return new Promise(function (resolve) {
            _this6.showErrTime = setTimeout(function () {
              itemList.forEach(function (item) {
                if (item.errRule) {
                  item.showError = true;
                }
              });
            }, 20);

            if (validOpts.autoPos) {
              _this6.$nextTick(function () {
                _this6.handleFocus(validFields);
              });
            }

            if (callback) {
              callback(validRest);
              resolve();
            } else {
              resolve(validRest);
            }
          });
        });
      }

      if (callback) {
        callback();
      }

      return Promise.resolve();
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    validItemRules: function validItemRules(validType, property, val) {
      var _this7 = this;

      var data = this.data,
          formRules = this.rules;
      var errorRules = [];
      var syncVailds = [];

      if (property && formRules) {
        var rules = _xeUtils.default.get(formRules, property);

        if (rules) {
          var itemValue = _xeUtils.default.isUndefined(val) ? _xeUtils.default.get(data, property) : val;
          rules.forEach(function (rule) {
            var type = rule.type,
                trigger = rule.trigger,
                required = rule.required;

            if (validType === 'all' || !trigger || validType === rule.trigger) {
              if (_xeUtils.default.isFunction(rule.validator)) {
                var customValid = rule.validator({
                  itemValue: itemValue,
                  rule: rule,
                  rules: rules,
                  data: data,
                  field: property,
                  property: property,
                  $form: _this7
                });

                if (customValid) {
                  if (_xeUtils.default.isError(customValid)) {
                    errorRules.push(new Rule({
                      type: 'custom',
                      trigger: trigger,
                      content: customValid.message,
                      rule: new Rule(rule)
                    }));
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(customValid.catch(function (e) {
                      errorRules.push(new Rule({
                        type: 'custom',
                        trigger: trigger,
                        content: e ? e.message : rule.content || rule.message,
                        rule: new Rule(rule)
                      }));
                    }));
                  }
                }
              } else {
                var isArrType = type === 'array';
                var hasEmpty = isArrType || _xeUtils.default.isArray(itemValue) ? !_xeUtils.default.isArray(itemValue) || !itemValue.length : (0, _utils.eqEmptyValue)(itemValue);

                if (required ? hasEmpty || validErrorRuleValue(rule, itemValue) : !hasEmpty && validErrorRuleValue(rule, itemValue)) {
                  errorRules.push(new Rule(rule));
                }
              }
            }
          });
        }
      }

      return Promise.all(syncVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    handleFocus: function handleFocus(fields) {
      var _this8 = this;

      var $el = this.$el;
      fields.some(function (property, index) {
        var item = _this8.getItemByField(property);

        if (item && (0, _utils.isEnableConf)(item.itemRender)) {
          var itemRender = item.itemRender;

          var compConf = _vXETable.default.renderer.get(itemRender.name);

          var inputElem; // 定位到第一个

          if (!index) {
            _dom.default.scrollToView($el.querySelector(".".concat(item.id)));
          } // 如果指定了聚焦 class


          if (itemRender.autofocus) {
            inputElem = $el.querySelector(".".concat(item.id, " ").concat(itemRender.autofocus));
          } // 渲染器的聚焦处理


          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = $el.querySelector(".".concat(item.id, " ").concat(compConf.autofocus));
          }

          if (inputElem) {
            inputElem.focus(); // 保持一致行为，光标移到末端

            if (_dom.browse.msie) {
              var textRange = inputElem.createTextRange();
              textRange.collapse(false);
              textRange.select();
            }

            return true;
          }
        }
      });
    },
    triggerItemEvent: function triggerItemEvent(evnt, field, itemValue) {
      var _this9 = this;

      if (field) {
        return this.validItemRules(evnt ? ['blur'].includes(evnt.type) ? 'blur' : 'change' : 'all', field, itemValue).then(function () {
          _this9.clearValidate(field);
        }).catch(function (_ref3) {
          var rule = _ref3.rule;

          var item = _this9.getItemByField(field);

          if (item) {
            item.showError = true;
            item.errRule = rule;
          }
        });
      }

      return this.$nextTick();
    },

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus: function updateStatus(scope, itemValue) {
      var field = scope.field;
      return this.triggerItemEvent(new Event('change'), field, itemValue);
    }
  }
};
exports.default = _default2;