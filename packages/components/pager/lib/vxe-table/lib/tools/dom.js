"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.browse = exports.DomTools = void 0;
exports.getOffsetHeight = getOffsetHeight;
exports.getPaddingTopBottomSize = getPaddingTopBottomSize;
exports.setScrollLeft = setScrollLeft;
exports.setScrollTop = setScrollTop;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browse = _xeUtils.default.browse();

exports.browse = browse;
var reClsMap = {};

function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp("(?:^|\\s)".concat(cls, "(?!\\S)"), 'g');
  }

  return reClsMap[cls];
}

function getNodeOffset(elem, container, rest) {
  if (elem) {
    var parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;

    if (parentElem && parentElem !== document.documentElement && parentElem !== document.body) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }

    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }

  return rest;
}

function isScale(val) {
  return val && /^\d+%$/.test(val);
}

function hasClass(elem, cls) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls));
}

function removeClass(elem, cls) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '');
  }
}

function getDomNode() {
  var documentElement = document.documentElement;
  var bodyElem = document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
}

function getOffsetHeight(elem) {
  return elem ? elem.offsetHeight : 0;
}

function getPaddingTopBottomSize(elem) {
  if (elem) {
    var computedStyle = getComputedStyle(elem);

    var paddingTop = _xeUtils.default.toNumber(computedStyle.paddingTop);

    var paddingBottom = _xeUtils.default.toNumber(computedStyle.paddingBottom);

    return paddingTop + paddingBottom;
  }

  return 0;
}

function setScrollTop(elem, scrollTop) {
  if (elem) {
    elem.scrollTop = scrollTop;
  }
}

function setScrollLeft(elem, scrollLeft) {
  if (elem) {
    elem.scrollLeft = scrollLeft;
  }
} // export function setScrollLeftAndTop (elem, scrollLeft, scrollTop) {
//   if (elem) {
//     elem.scrollLeft = scrollLeft
//     elem.scrollTop = scrollTop
//   }
// }


function isNodeElement(elem) {
  return elem && elem.nodeType === 1;
}

var DomTools = {
  browse: browse,
  isPx: function isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },
  isScale: isScale,
  hasClass: hasClass,
  removeClass: removeClass,
  addClass: function addClass(elem, cls) {
    if (elem && !hasClass(elem, cls)) {
      removeClass(elem, cls);
      elem.className = "".concat(elem.className, " ").concat(cls);
    }
  },
  updateCellTitle: function updateCellTitle(overflowElem, column) {
    var content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent;

    if (overflowElem.getAttribute('title') !== content) {
      overflowElem.setAttribute('title', content);
    }
  },
  getDomNode: getDomNode,

  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode: function getEventTargetNode(evnt, container, queryCls, queryMethod) {
    var targetElem;
    var target = evnt.target;

    while (target && target.nodeType && target !== document) {
      if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
        targetElem = target;
      } else if (target === container) {
        return {
          flag: queryCls ? !!targetElem : true,
          container: container,
          targetElem: targetElem
        };
      }

      target = target.parentNode;
    }

    return {
      flag: false
    };
  },

  /**
   * 获取元素相对于 document 的位置
   */
  getOffsetPos: function getOffsetPos(elem, container) {
    return getNodeOffset(elem, container, {
      left: 0,
      top: 0
    });
  },
  getAbsolutePos: function getAbsolutePos(elem) {
    var bounding = elem.getBoundingClientRect();
    var boundingTop = bounding.top;
    var boundingLeft = bounding.left;

    var _getDomNode = getDomNode(),
        scrollTop = _getDomNode.scrollTop,
        scrollLeft = _getDomNode.scrollLeft,
        visibleHeight = _getDomNode.visibleHeight,
        visibleWidth = _getDomNode.visibleWidth;

    return {
      boundingTop: boundingTop,
      top: scrollTop + boundingTop,
      boundingLeft: boundingLeft,
      left: scrollLeft + boundingLeft,
      visibleHeight: visibleHeight,
      visibleWidth: visibleWidth
    };
  },
  scrollToView: function scrollToView(elem) {
    var scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded';
    var scrollIntoView = 'scrollIntoView';

    if (elem) {
      if (elem[scrollIntoViewIfNeeded]) {
        elem[scrollIntoViewIfNeeded]();
      } else if (elem[scrollIntoView]) {
        elem[scrollIntoView]();
      }
    }
  },
  triggerEvent: function triggerEvent(targetElem, type) {
    if (targetElem) {
      targetElem.dispatchEvent(new Event(type));
    }
  },
  calcHeight: function calcHeight($xetable, key) {
    var val = $xetable[key];
    var num = 0;

    if (val) {
      if (val === 'auto') {
        num = $xetable.parentHeight;
      } else {
        var excludeHeight = $xetable.getExcludeHeight();

        if (isScale(val)) {
          num = Math.floor((_xeUtils.default.toInteger(val) || 1) / 100 * $xetable.parentHeight);
        } else {
          num = _xeUtils.default.toNumber(val);
        }

        num = Math.max(40, num - excludeHeight);
      }
    }

    return num;
  },
  isNodeElement: isNodeElement
};
exports.DomTools = DomTools;
var _default = DomTools;
exports.default = _default;