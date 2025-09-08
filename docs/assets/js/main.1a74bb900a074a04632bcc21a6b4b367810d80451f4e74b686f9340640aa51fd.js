"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\gohugoio\hugo-mod-jslibs-dist\popperjs\v2@v2.21100.20000\package\dist\cjs\popper.js
  var require_popper = __commonJS({
    "ns-hugo-imp:C:\\Users\\Gustavo\\AppData\\Local\\hugo_cache\\modules\\filecache\\modules\\pkg\\mod\\github.com\\gohugoio\\hugo-mod-jslibs-dist\\popperjs\\v2@v2.21100.20000\\package\\dist\\cjs\\popper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getWindow(node) {
        if (node == null) {
          return window;
        }
        if (node.toString() !== "[object Window]") {
          var ownerDocument = node.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
      }
      function isElement2(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
      }
      function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
      }
      function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") {
          return false;
        }
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
      }
      var max = Math.max;
      var min = Math.min;
      var round = Math.round;
      function getBoundingClientRect(element, includeScale) {
        if (includeScale === void 0) {
          includeScale = false;
        }
        var rect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (isHTMLElement(element) && includeScale) {
          var offsetHeight = element.offsetHeight;
          var offsetWidth = element.offsetWidth;
          if (offsetWidth > 0) {
            scaleX = round(rect.width) / offsetWidth || 1;
          }
          if (offsetHeight > 0) {
            scaleY = round(rect.height) / offsetHeight || 1;
          }
        }
        return {
          width: rect.width / scaleX,
          height: rect.height / scaleY,
          top: rect.top / scaleY,
          right: rect.right / scaleX,
          bottom: rect.bottom / scaleY,
          left: rect.left / scaleX,
          x: rect.left / scaleX,
          y: rect.top / scaleY
        };
      }
      function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
          scrollLeft,
          scrollTop
        };
      }
      function getHTMLElementScroll(element) {
        return {
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop
        };
      }
      function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) {
          return getWindowScroll(node);
        } else {
          return getHTMLElementScroll(node);
        }
      }
      function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
      }
      function getDocumentElement(element) {
        return ((isElement2(element) ? element.ownerDocument : (
          // $FlowFixMe[prop-missing]
          element.document
        )) || window.document).documentElement;
      }
      function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
      }
      function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
      }
      function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
      }
      function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = round(rect.width) / element.offsetWidth || 1;
        var scaleY = round(rect.height) / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
      }
      function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) {
          isFixed = false;
        }
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
        var scroll = {
          scrollLeft: 0,
          scrollTop: 0
        };
        var offsets = {
          x: 0,
          y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
          if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
          isScrollParent(documentElement)) {
            scroll = getNodeScroll(offsetParent);
          }
          if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
          } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
          }
        }
        return {
          x: rect.left + scroll.scrollLeft - offsets.x,
          y: rect.top + scroll.scrollTop - offsets.y,
          width: rect.width,
          height: rect.height
        };
      }
      function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) {
          width = clientRect.width;
        }
        if (Math.abs(clientRect.height - height) <= 1) {
          height = clientRect.height;
        }
        return {
          x: element.offsetLeft,
          y: element.offsetTop,
          width,
          height
        };
      }
      function getParentNode(element) {
        if (getNodeName(element) === "html") {
          return element;
        }
        return (
          // this is a quicker (but less type safe) way to save quite some bytes from the bundle
          // $FlowFixMe[incompatible-return]
          // $FlowFixMe[prop-missing]
          element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
          element.parentNode || // DOM Element detected
          (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
          // $FlowFixMe[incompatible-call]: HTMLElement is a Node
          getDocumentElement(element)
        );
      }
      function getScrollParent(node) {
        if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
          return node.ownerDocument.body;
        }
        if (isHTMLElement(node) && isScrollParent(node)) {
          return node;
        }
        return getScrollParent(getParentNode(node));
      }
      function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) {
          list = [];
        }
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : (
          // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
          updatedList.concat(listScrollParents(getParentNode(target)))
        );
      }
      function isTableElement(element) {
        return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
      }
      function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
        getComputedStyle2(element).position === "fixed") {
          return null;
        }
        return element.offsetParent;
      }
      function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
        var isIE = navigator.userAgent.indexOf("Trident") !== -1;
        if (isIE && isHTMLElement(element)) {
          var elementCss = getComputedStyle2(element);
          if (elementCss.position === "fixed") {
            return null;
          }
        }
        var currentNode = getParentNode(element);
        while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
          var css = getComputedStyle2(currentNode);
          if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
            return currentNode;
          } else {
            currentNode = currentNode.parentNode;
          }
        }
        return null;
      }
      function getOffsetParent(element) {
        var window2 = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
          offsetParent = getTrueOffsetParent(offsetParent);
        }
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
          return window2;
        }
        return offsetParent || getContainingBlock(element) || window2;
      }
      var top = "top";
      var bottom = "bottom";
      var right = "right";
      var left = "left";
      var auto = "auto";
      var basePlacements = [top, bottom, right, left];
      var start = "start";
      var end = "end";
      var clippingParents = "clippingParents";
      var viewport = "viewport";
      var popper = "popper";
      var reference = "reference";
      var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
        return acc.concat([placement + "-" + start, placement + "-" + end]);
      }, []);
      var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
        return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
      }, []);
      var beforeRead = "beforeRead";
      var read = "read";
      var afterRead = "afterRead";
      var beforeMain = "beforeMain";
      var main = "main";
      var afterMain = "afterMain";
      var beforeWrite = "beforeWrite";
      var write = "write";
      var afterWrite = "afterWrite";
      var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
      function order(modifiers) {
        var map = /* @__PURE__ */ new Map();
        var visited = /* @__PURE__ */ new Set();
        var result = [];
        modifiers.forEach(function(modifier) {
          map.set(modifier.name, modifier);
        });
        function sort(modifier) {
          visited.add(modifier.name);
          var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
          requires.forEach(function(dep) {
            if (!visited.has(dep)) {
              var depModifier = map.get(dep);
              if (depModifier) {
                sort(depModifier);
              }
            }
          });
          result.push(modifier);
        }
        modifiers.forEach(function(modifier) {
          if (!visited.has(modifier.name)) {
            sort(modifier);
          }
        });
        return result;
      }
      function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce(function(acc, phase) {
          return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
          }));
        }, []);
      }
      function debounce(fn) {
        var pending;
        return function() {
          if (!pending) {
            pending = new Promise(function(resolve) {
              Promise.resolve().then(function() {
                pending = void 0;
                resolve(fn());
              });
            });
          }
          return pending;
        };
      }
      function format(str) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return [].concat(args).reduce(function(p, c) {
          return p.replace(/%s/, c);
        }, str);
      }
      var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
      var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
      var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function validateModifiers(modifiers) {
        modifiers.forEach(function(modifier) {
          [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
            return self.indexOf(value) === index;
          }).forEach(function(key) {
            switch (key) {
              case "name":
                if (typeof modifier.name !== "string") {
                  console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
                }
                break;
              case "enabled":
                if (typeof modifier.enabled !== "boolean") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
                }
                break;
              case "phase":
                if (modifierPhases.indexOf(modifier.phase) < 0) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
                }
                break;
              case "fn":
                if (typeof modifier.fn !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "effect":
                if (modifier.effect != null && typeof modifier.effect !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "requires":
                if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
                }
                break;
              case "requiresIfExists":
                if (!Array.isArray(modifier.requiresIfExists)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
                }
                break;
              case "options":
              case "data":
                break;
              default:
                console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
                  return '"' + s + '"';
                }).join(", ") + '; but "' + key + '" was provided.');
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
              if (modifiers.find(function(mod) {
                return mod.name === requirement;
              }) == null) {
                console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
              }
            });
          });
        });
      }
      function uniqueBy(arr, fn) {
        var identifiers = /* @__PURE__ */ new Set();
        return arr.filter(function(item) {
          var identifier = fn(item);
          if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
          }
        });
      }
      function getBasePlacement(placement) {
        return placement.split("-")[0];
      }
      function mergeByName(modifiers) {
        var merged = modifiers.reduce(function(merged2, current) {
          var existing = merged2[current.name];
          merged2[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
          }) : current;
          return merged2;
        }, {});
        return Object.keys(merged).map(function(key) {
          return merged[key];
        });
      }
      function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
          width = visualViewport.width;
          height = visualViewport.height;
          if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
          }
        }
        return {
          width,
          height,
          x: x + getWindowScrollBarX(element),
          y
        };
      }
      function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle2(body || html).direction === "rtl") {
          x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        }
        return {
          width,
          height,
          x,
          y
        };
      }
      function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) {
          return true;
        } else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;
          do {
            if (next && parent.isSameNode(next)) {
              return true;
            }
            next = next.parentNode || next.host;
          } while (next);
        }
        return false;
      }
      function rectToClientRect(rect) {
        return Object.assign({}, rect, {
          left: rect.x,
          top: rect.y,
          right: rect.x + rect.width,
          bottom: rect.y + rect.height
        });
      }
      function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
      }
      function getClientRectFromMixedType(element, clippingParent) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement2(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
      }
      function getClippingParents(element) {
        var clippingParents2 = listScrollParents(getParentNode(element));
        var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement2(clipperElement)) {
          return [];
        }
        return clippingParents2.filter(function(clippingParent) {
          return isElement2(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body" && (canEscapeClipping ? getComputedStyle2(clippingParent).position !== "static" : true);
        });
      }
      function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
        var firstClippingParent = clippingParents2[0];
        var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
          var rect = getClientRectFromMixedType(element, clippingParent);
          accRect.top = max(rect.top, accRect.top);
          accRect.right = min(rect.right, accRect.right);
          accRect.bottom = min(rect.bottom, accRect.bottom);
          accRect.left = max(rect.left, accRect.left);
          return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
      }
      function getVariation(placement) {
        return placement.split("-")[1];
      }
      function getMainAxisFromPlacement(placement) {
        return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
      }
      function computeOffsets(_ref) {
        var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference2.x + reference2.width / 2 - element.width / 2;
        var commonY = reference2.y + reference2.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
          case top:
            offsets = {
              x: commonX,
              y: reference2.y - element.height
            };
            break;
          case bottom:
            offsets = {
              x: commonX,
              y: reference2.y + reference2.height
            };
            break;
          case right:
            offsets = {
              x: reference2.x + reference2.width,
              y: commonY
            };
            break;
          case left:
            offsets = {
              x: reference2.x - element.width,
              y: commonY
            };
            break;
          default:
            offsets = {
              x: reference2.x,
              y: reference2.y
            };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
          var len = mainAxis === "y" ? "height" : "width";
          switch (variation) {
            case start:
              offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
              break;
            case end:
              offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
              break;
          }
        }
        return offsets;
      }
      function getFreshSideObject() {
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
      }
      function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
          hashMap[key] = value;
          return hashMap;
        }, {});
      }
      function detectOverflow(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement2(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(state.elements.reference);
        var popperOffsets2 = computeOffsets({
          reference: referenceClientRect,
          element: popperRect,
          strategy: "absolute",
          placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
          top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
          bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
          left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
          right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
          var offset2 = offsetData[placement];
          Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
            overflowOffsets[key] += offset2[axis] * multiply;
          });
        }
        return overflowOffsets;
      }
      var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
      var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
      var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
      };
      function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return !args.some(function(element) {
          return !(element && typeof element.getBoundingClientRect === "function");
        });
      }
      function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) {
          generatorOptions = {};
        }
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper3(reference2, popper2, options) {
          if (options === void 0) {
            options = defaultOptions;
          }
          var state = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
              reference: reference2,
              popper: popper2
            },
            attributes: {},
            styles: {}
          };
          var effectCleanupFns = [];
          var isDestroyed = false;
          var instance = {
            state,
            setOptions: function setOptions(setOptionsAction) {
              var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
              cleanupModifierEffects();
              state.options = Object.assign({}, defaultOptions, state.options, options2);
              state.scrollParents = {
                reference: isElement2(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
                popper: listScrollParents(popper2)
              };
              var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
              state.orderedModifiers = orderedModifiers.filter(function(m) {
                return m.enabled;
              });
              if (true) {
                var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
                  var name = _ref.name;
                  return name;
                });
                validateModifiers(modifiers);
                if (getBasePlacement(state.options.placement) === auto) {
                  var flipModifier = state.orderedModifiers.find(function(_ref2) {
                    var name = _ref2.name;
                    return name === "flip";
                  });
                  if (!flipModifier) {
                    console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
                  }
                }
                var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
                if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
                  return parseFloat(margin);
                })) {
                  console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
                }
              }
              runModifierEffects();
              return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate: function forceUpdate() {
              if (isDestroyed) {
                return;
              }
              var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
              if (!areValidElements(reference3, popper3)) {
                if (true) {
                  console.error(INVALID_ELEMENT_ERROR);
                }
                return;
              }
              state.rects = {
                reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
                popper: getLayoutRect(popper3)
              };
              state.reset = false;
              state.placement = state.options.placement;
              state.orderedModifiers.forEach(function(modifier) {
                return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
              });
              var __debug_loops__ = 0;
              for (var index = 0; index < state.orderedModifiers.length; index++) {
                if (true) {
                  __debug_loops__ += 1;
                  if (__debug_loops__ > 100) {
                    console.error(INFINITE_LOOP_ERROR);
                    break;
                  }
                }
                if (state.reset === true) {
                  state.reset = false;
                  index = -1;
                  continue;
                }
                var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                if (typeof fn === "function") {
                  state = fn({
                    state,
                    options: _options,
                    name,
                    instance
                  }) || state;
                }
              }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: debounce(function() {
              return new Promise(function(resolve) {
                instance.forceUpdate();
                resolve(state);
              });
            }),
            destroy: function destroy() {
              cleanupModifierEffects();
              isDestroyed = true;
            }
          };
          if (!areValidElements(reference2, popper2)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return instance;
          }
          instance.setOptions(options).then(function(state2) {
            if (!isDestroyed && options.onFirstUpdate) {
              options.onFirstUpdate(state2);
            }
          });
          function runModifierEffects() {
            state.orderedModifiers.forEach(function(_ref3) {
              var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
              if (typeof effect2 === "function") {
                var cleanupFn = effect2({
                  state,
                  name,
                  instance,
                  options: options2
                });
                var noopFn = function noopFn2() {
                };
                effectCleanupFns.push(cleanupFn || noopFn);
              }
            });
          }
          function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
              return fn();
            });
            effectCleanupFns = [];
          }
          return instance;
        };
      }
      var passive = {
        passive: true
      };
      function effect$2(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window2 = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
          });
        }
        if (resize) {
          window2.addEventListener("resize", instance.update, passive);
        }
        return function() {
          if (scroll) {
            scrollParents.forEach(function(scrollParent) {
              scrollParent.removeEventListener("scroll", instance.update, passive);
            });
          }
          if (resize) {
            window2.removeEventListener("resize", instance.update, passive);
          }
        };
      }
      var eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {
        },
        effect: effect$2,
        data: {}
      };
      function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
          reference: state.rects.reference,
          element: state.rects.popper,
          strategy: "absolute",
          placement: state.placement
        });
      }
      var popperOffsets$1 = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
      };
      var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };
      function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
          x: round(x * dpr) / dpr || 0,
          y: round(y * dpr) / dpr || 0
        };
      }
      function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
        var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
          var offsetParent = getOffsetParent(popper2);
          var heightProp = "clientHeight";
          var widthProp = "clientWidth";
          if (offsetParent === getWindow(popper2)) {
            offsetParent = getDocumentElement(popper2);
            if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
              heightProp = "scrollHeight";
              widthProp = "scrollWidth";
            }
          }
          offsetParent = offsetParent;
          if (placement === top || (placement === left || placement === right) && variation === end) {
            sideY = bottom;
            var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : (
              // $FlowFixMe[prop-missing]
              offsetParent[heightProp]
            );
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
          }
          if (placement === left || (placement === top || placement === bottom) && variation === end) {
            sideX = right;
            var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : (
              // $FlowFixMe[prop-missing]
              offsetParent[widthProp]
            );
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
          }
        }
        var commonStyles = Object.assign({
          position
        }, adaptive && unsetSides);
        if (gpuAcceleration) {
          var _Object$assign;
          return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
      }
      function computeStyles(_ref4) {
        var state = _ref4.state, options = _ref4.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        if (true) {
          var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
          if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
            return transitionProperty.indexOf(property) >= 0;
          })) {
            console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
          }
        }
        var commonStyles = {
          placement: getBasePlacement(state.placement),
          variation: getVariation(state.placement),
          popper: state.elements.popper,
          popperRect: state.rects.popper,
          gpuAcceleration,
          isFixed: state.options.strategy === "fixed"
        };
        if (state.modifiersData.popperOffsets != null) {
          state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
          })));
        }
        if (state.modifiersData.arrow != null) {
          state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
          })));
        }
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-placement": state.placement
        });
      }
      var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
      };
      function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
          var style = state.styles[name] || {};
          var attributes = state.attributes[name] || {};
          var element = state.elements[name];
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function(name2) {
            var value = attributes[name2];
            if (value === false) {
              element.removeAttribute(name2);
            } else {
              element.setAttribute(name2, value === true ? "" : value);
            }
          });
        });
      }
      function effect$1(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
          popper: {
            position: state.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) {
          Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
        return function() {
          Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
            var style = styleProperties.reduce(function(style2, property) {
              style2[property] = "";
              return style2;
            }, {});
            if (!isHTMLElement(element) || !getNodeName(element)) {
              return;
            }
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function(attribute) {
              element.removeAttribute(attribute);
            });
          });
        };
      }
      var applyStyles$1 = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect: effect$1,
        requires: ["computeStyles"]
      };
      function distanceAndSkiddingToXY(placement, rects, offset2) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
          placement
        })) : offset2, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [left, right].indexOf(basePlacement) >= 0 ? {
          x: distance,
          y: skidding
        } : {
          x: skidding,
          y: distance
        };
      }
      function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
        var data = placements.reduce(function(acc, placement) {
          acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
          return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
          state.modifiersData.popperOffsets.x += x;
          state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
      }
      var offset$1 = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: ["popperOffsets"],
        fn: offset
      };
      var hash$1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };
      function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function(matched) {
          return hash$1[matched];
        });
      }
      var hash = {
        start: "end",
        end: "start"
      };
      function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function(matched) {
          return hash[matched];
        });
      }
      function computeAutoPlacement(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
          return getVariation(placement2) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function(placement2) {
          return allowedAutoPlacements.indexOf(placement2) >= 0;
        });
        if (allowedPlacements.length === 0) {
          allowedPlacements = placements$1;
          if (true) {
            console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
          }
        }
        var overflows = allowedPlacements.reduce(function(acc, placement2) {
          acc[placement2] = detectOverflow(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding
          })[getBasePlacement(placement2)];
          return acc;
        }, {});
        return Object.keys(overflows).sort(function(a, b) {
          return overflows[a] - overflows[b];
        });
      }
      function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) {
          return [];
        }
        var oppositePlacement = getOppositePlacement(placement);
        return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
      }
      function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) {
          return;
        }
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
        var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
          return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements
          }) : placement2);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = /* @__PURE__ */ new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements2[0];
        for (var i = 0; i < placements2.length; i++) {
          var placement = placements2[i];
          var _basePlacement = getBasePlacement(placement);
          var isStartVariation = getVariation(placement) === start;
          var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
          var len = isVertical ? "width" : "height";
          var overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding
          });
          var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
          if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
          }
          var altVariationSide = getOppositePlacement(mainVariationSide);
          var checks = [];
          if (checkMainAxis) {
            checks.push(overflow[_basePlacement] <= 0);
          }
          if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
          }
          if (checks.every(function(check) {
            return check;
          })) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
          }
          checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
          var numberOfChecks = flipVariations ? 3 : 1;
          var _loop = function _loop2(_i2) {
            var fittingPlacement = placements2.find(function(placement2) {
              var checks2 = checksMap.get(placement2);
              if (checks2) {
                return checks2.slice(0, _i2).every(function(check) {
                  return check;
                });
              }
            });
            if (fittingPlacement) {
              firstFittingPlacement = fittingPlacement;
              return "break";
            }
          };
          for (var _i = numberOfChecks; _i > 0; _i--) {
            var _ret = _loop(_i);
            if (_ret === "break") break;
          }
        }
        if (state.placement !== firstFittingPlacement) {
          state.modifiersData[name]._skip = true;
          state.placement = firstFittingPlacement;
          state.reset = true;
        }
      }
      var flip$1 = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: ["offset"],
        data: {
          _skip: false
        }
      };
      function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
      }
      function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
      }
      function withinMaxClamp(min2, value, max2) {
        var v = within(min2, value, max2);
        return v > max2 ? max2 : v;
      }
      function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
          boundary,
          rootBoundary,
          padding,
          altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
          placement: state.placement
        })) : tetherOffset;
        var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
          mainAxis: tetherOffsetValue,
          altAxis: tetherOffsetValue
        } : Object.assign({
          mainAxis: 0,
          altAxis: 0
        }, tetherOffsetValue);
        var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
        var data = {
          x: 0,
          y: 0
        };
        if (!popperOffsets2) {
          return;
        }
        if (checkMainAxis) {
          var _offsetModifierState$;
          var mainSide = mainAxis === "y" ? top : left;
          var altSide = mainAxis === "y" ? bottom : right;
          var len = mainAxis === "y" ? "height" : "width";
          var offset2 = popperOffsets2[mainAxis];
          var min$1 = offset2 + overflow[mainSide];
          var max$1 = offset2 - overflow[altSide];
          var additive = tether ? -popperRect[len] / 2 : 0;
          var minLen = variation === start ? referenceRect[len] : popperRect[len];
          var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
          var arrowElement = state.elements.arrow;
          var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
            width: 0,
            height: 0
          };
          var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
          var arrowPaddingMin = arrowPaddingObject[mainSide];
          var arrowPaddingMax = arrowPaddingObject[altSide];
          var arrowLen = within(0, referenceRect[len], arrowRect[len]);
          var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
          var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
          var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
          var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
          var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
          var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
          var tetherMax = offset2 + maxOffset - offsetModifierValue;
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets2[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset2;
        }
        if (checkAltAxis) {
          var _offsetModifierState$2;
          var _mainSide = mainAxis === "x" ? top : left;
          var _altSide = mainAxis === "x" ? bottom : right;
          var _offset = popperOffsets2[altAxis];
          var _len = altAxis === "y" ? "height" : "width";
          var _min = _offset + overflow[_mainSide];
          var _max = _offset - overflow[_altSide];
          var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
          var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
          var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
          var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
          var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
          popperOffsets2[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
        state.modifiersData[name] = data;
      }
      var preventOverflow$1 = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: ["offset"]
      };
      var toPaddingObject = function toPaddingObject2(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
          placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      };
      function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [left, right].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets2) {
          return;
        }
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
        var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min2 = paddingObject[minProp];
        var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset2 = within(min2, center, max2);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
      }
      function effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) {
          return;
        }
        if (typeof arrowElement === "string") {
          arrowElement = state.elements.popper.querySelector(arrowElement);
          if (!arrowElement) {
            return;
          }
        }
        if (true) {
          if (!isHTMLElement(arrowElement)) {
            console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
          }
        }
        if (!contains(state.elements.popper, arrowElement)) {
          if (true) {
            console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
          }
          return;
        }
        state.elements.arrow = arrowElement;
      }
      var arrow$1 = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
      };
      function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) {
          preventedOffsets = {
            x: 0,
            y: 0
          };
        }
        return {
          top: overflow.top - rect.height - preventedOffsets.y,
          right: overflow.right - rect.width + preventedOffsets.x,
          bottom: overflow.bottom - rect.height + preventedOffsets.y,
          left: overflow.left - rect.width - preventedOffsets.x
        };
      }
      function isAnySideFullyClipped(overflow) {
        return [top, right, bottom, left].some(function(side) {
          return overflow[side] >= 0;
        });
      }
      function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
          elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
          altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
          referenceClippingOffsets,
          popperEscapeOffsets,
          isReferenceHidden,
          hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-reference-hidden": isReferenceHidden,
          "data-popper-escaped": hasPopperEscaped
        });
      }
      var hide$1 = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: hide
      };
      var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
      var createPopper$1 = /* @__PURE__ */ popperGenerator({
        defaultModifiers: defaultModifiers$1
      });
      var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
      var createPopper2 = /* @__PURE__ */ popperGenerator({
        defaultModifiers
      });
      exports.applyStyles = applyStyles$1;
      exports.arrow = arrow$1;
      exports.computeStyles = computeStyles$1;
      exports.createPopper = createPopper2;
      exports.createPopperLite = createPopper$1;
      exports.defaultModifiers = defaultModifiers;
      exports.detectOverflow = detectOverflow;
      exports.eventListeners = eventListeners;
      exports.flip = flip$1;
      exports.hide = hide$1;
      exports.offset = offset$1;
      exports.popperGenerator = popperGenerator;
      exports.popperOffsets = popperOffsets$1;
      exports.preventOverflow = preventOverflow$1;
    }
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\utils\global.js
  window.addEventListener("load", () => {
    document.body.classList.remove("preload");
  });

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\data.js
  var elementMap = /* @__PURE__ */ new Map();
  var data_default = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\index.js
  var MILLISECONDS_MULTIPLIER = 1e3;
  var TRANSITION_END = "transitionend";
  var parseSelector = (selector) => {
    if (selector && window.CSS && window.CSS.escape) {
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };
  var toType = (object) => {
    if (object === null || object === void 0) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }
    return typeof object.nodeType !== "undefined";
  };
  var getElement = (object) => {
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  var isVisible = (element) => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
    const closedDetails = element.closest("details:not([open])");
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest("summary");
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  var isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  var noop = () => {
  };
  var reflow = (element) => {
    element.offsetHeight;
  };
  var getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }
    return null;
  };
  var DOMContentLoadedCallbacks = [];
  var onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback2 of DOMContentLoadedCallbacks) {
            callback2();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  var isRTL = () => document.documentElement.dir === "rtl";
  var defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
  };
  var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({ target }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\event-handler.js
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  var nativeEvents = /* @__PURE__ */ new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll"
  ]);
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, { delegateTarget: element });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, { delegateTarget: target });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  var EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof callable !== "undefined") {
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  var event_handler_default = EventHandler;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\manipulator.js
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };
  var manipulator_default = Manipulator;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\config.js
  var Config = class {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? manipulator_default.getDataAttribute(element, "config") : {};
      return {
        ...this.constructor.Default,
        ...typeof jsonConfig === "object" ? jsonConfig : {},
        ...isElement(element) ? manipulator_default.getDataAttributes(element) : {},
        ...typeof config === "object" ? config : {}
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement(value) ? "element" : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
          );
        }
      }
    }
  };
  var config_default = Config;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\base-component.js
  var VERSION = "5.3.3";
  var BaseComponent = class extends config_default {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      data_default.set(this._element, this.constructor.DATA_KEY, this);
    }
    // Public
    dispose() {
      data_default.remove(this._element, this.constructor.DATA_KEY);
      event_handler_default.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    // Static
    static getInstance(element) {
      return data_default.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  };
  var base_component_default = BaseComponent;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dom\selector-engine.js
  var getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href");
      if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
        return null;
      }
      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
  };
  var SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]'
      ].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };
  var selector_engine_default = SelectorEngine;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\collapse.js
  var NAME = "collapse";
  var DATA_KEY = "bs.collapse";
  var EVENT_KEY = `.${DATA_KEY}`;
  var DATA_API_KEY = ".data-api";
  var EVENT_SHOW = `show${EVENT_KEY}`;
  var EVENT_SHOWN = `shown${EVENT_KEY}`;
  var EVENT_HIDE = `hide${EVENT_KEY}`;
  var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  var EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  var CLASS_NAME_SHOW = "show";
  var CLASS_NAME_COLLAPSE = "collapse";
  var CLASS_NAME_COLLAPSING = "collapsing";
  var CLASS_NAME_COLLAPSED = "collapsed";
  var CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  var CLASS_NAME_HORIZONTAL = "collapse-horizontal";
  var WIDTH = "width";
  var HEIGHT = "height";
  var SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
  var Default = {
    parent: null,
    toggle: true
  };
  var DefaultType = {
    parent: "(null|element)",
    toggle: "boolean"
  };
  var Collapse = class _Collapse extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = selector_engine_default.find(SELECTOR_DATA_TOGGLE);
      for (const elem of toggleList) {
        const selector = selector_engine_default.getSelectorFromElement(elem);
        const filterElement = selector_engine_default.find(selector).filter((foundElement) => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }
    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }
    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => _Collapse.getOrCreateInstance(element, { toggle: false }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = event_handler_default.trigger(this._element, EVENT_SHOW);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
        this._element.style[dimension] = "";
        event_handler_default.trigger(this._element, EVENT_SHOWN);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = event_handler_default.trigger(this._element, EVENT_HIDE);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
      for (const trigger of this._triggerArray) {
        const element = selector_engine_default.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        event_handler_default.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.style[dimension] = "";
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW);
    }
    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle);
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
      for (const element of children) {
        const selected = selector_engine_default.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = selector_engine_default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      return selector_engine_default.find(selector, this._config.parent).filter((element) => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute("aria-expanded", isOpen);
      }
    }
    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function() {
        const data = _Collapse.getOrCreateInstance(this, _config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
      event.preventDefault();
    }
    for (const element of selector_engine_default.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, { toggle: false }).toggle();
    }
  });
  defineJQueryPlugin(Collapse);

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\dropdown.js
  var Popper = __toESM(require_popper());
  var NAME2 = "dropdown";
  var DATA_KEY2 = "bs.dropdown";
  var EVENT_KEY2 = `.${DATA_KEY2}`;
  var DATA_API_KEY2 = ".data-api";
  var ESCAPE_KEY = "Escape";
  var TAB_KEY = "Tab";
  var ARROW_UP_KEY = "ArrowUp";
  var ARROW_DOWN_KEY = "ArrowDown";
  var RIGHT_MOUSE_BUTTON = 2;
  var EVENT_HIDE2 = `hide${EVENT_KEY2}`;
  var EVENT_HIDDEN2 = `hidden${EVENT_KEY2}`;
  var EVENT_SHOW2 = `show${EVENT_KEY2}`;
  var EVENT_SHOWN2 = `shown${EVENT_KEY2}`;
  var EVENT_CLICK_DATA_API2 = `click${EVENT_KEY2}${DATA_API_KEY2}`;
  var EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY2}${DATA_API_KEY2}`;
  var EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY2}${DATA_API_KEY2}`;
  var CLASS_NAME_SHOW2 = "show";
  var CLASS_NAME_DROPUP = "dropup";
  var CLASS_NAME_DROPEND = "dropend";
  var CLASS_NAME_DROPSTART = "dropstart";
  var CLASS_NAME_DROPUP_CENTER = "dropup-center";
  var CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
  var SELECTOR_DATA_TOGGLE2 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  var SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE2}.${CLASS_NAME_SHOW2}`;
  var SELECTOR_MENU = ".dropdown-menu";
  var SELECTOR_NAVBAR = ".navbar";
  var SELECTOR_NAVBAR_NAV = ".navbar-nav";
  var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
  var PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
  var PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
  var PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
  var PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
  var PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
  var PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
  var PLACEMENT_TOPCENTER = "top";
  var PLACEMENT_BOTTOMCENTER = "bottom";
  var Default2 = {
    autoClose: true,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle"
  };
  var DefaultType2 = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)"
  };
  var Dropdown = class _Dropdown extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode;
      this._menu = selector_engine_default.next(this._element, SELECTOR_MENU)[0] || selector_engine_default.prev(this._element, SELECTOR_MENU)[0] || selector_engine_default.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }
    // Getters
    static get Default() {
      return Default2;
    }
    static get DefaultType() {
      return DefaultType2;
    }
    static get NAME() {
      return NAME2;
    }
    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = event_handler_default.trigger(this._element, EVENT_SHOW2, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();
      if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          event_handler_default.on(element, "mouseover", noop);
        }
      }
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      this._menu.classList.add(CLASS_NAME_SHOW2);
      this._element.classList.add(CLASS_NAME_SHOW2);
      event_handler_default.trigger(this._element, EVENT_SHOWN2, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }
    // Private
    _completeHide(relatedTarget) {
      const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE2, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          event_handler_default.off(element, "mouseover", noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW2);
      this._element.classList.remove(CLASS_NAME_SHOW2);
      this._element.setAttribute("aria-expanded", "false");
      manipulator_default.removeDataAttribute(this._menu, "popper");
      event_handler_default.trigger(this._element, EVENT_HIDDEN2, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
        throw new TypeError(`${NAME2.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === "undefined") {
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      }
      let referenceElement = this._element;
      if (this._config.reference === "parent") {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === "object") {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW2);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }
      const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const { offset } = this._config;
      if (typeof offset === "string") {
        return offset.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: this._config.boundary
            }
          },
          {
            name: "offset",
            options: {
              offset: this._getOffset()
            }
          }
        ]
      };
      if (this._inNavbar || this._config.display === "static") {
        manipulator_default.setDataAttribute(this._menu, "popper", "static");
        defaultBsPopperConfig.modifiers = [{
          name: "applyStyles",
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _selectMenuItem({ key, target }) {
      const items = selector_engine_default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
      if (!items.length) {
        return;
      }
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY) {
        return;
      }
      const openToggles = selector_engine_default.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = _Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
          continue;
        }
        if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = { relatedTarget: context._element };
        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY;
      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE2) ? this : selector_engine_default.prev(this, SELECTOR_DATA_TOGGLE2)[0] || selector_engine_default.next(this, SELECTOR_DATA_TOGGLE2)[0] || selector_engine_default.findOne(SELECTOR_DATA_TOGGLE2, event.delegateTarget.parentNode);
      const instance = _Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  };
  event_handler_default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE2, Dropdown.dataApiKeydownHandler);
  event_handler_default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  event_handler_default.on(document, EVENT_CLICK_DATA_API2, Dropdown.clearMenus);
  event_handler_default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  event_handler_default.on(document, EVENT_CLICK_DATA_API2, SELECTOR_DATA_TOGGLE2, function(event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  defineJQueryPlugin(Dropdown);

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\backdrop.js
  var NAME3 = "backdrop";
  var CLASS_NAME_FADE = "fade";
  var CLASS_NAME_SHOW3 = "show";
  var EVENT_MOUSEDOWN = `mousedown.bs.${NAME3}`;
  var Default3 = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: "body"
    // give the choice to place backdrop under different elements
  };
  var DefaultType3 = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)"
  };
  var Backdrop = class extends config_default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }
    // Getters
    static get Default() {
      return Default3;
    }
    static get DefaultType() {
      return DefaultType3;
    }
    static get NAME() {
      return NAME3;
    }
    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW3);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW3);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      event_handler_default.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }
    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement("div");
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      event_handler_default.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  };
  var backdrop_default = Backdrop;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\component-functions.js
  var enableDismissTrigger = (component, method = "hide") => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    event_handler_default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = selector_engine_default.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);
      instance[method]();
    });
  };

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\focustrap.js
  var NAME4 = "focustrap";
  var DATA_KEY3 = "bs.focustrap";
  var EVENT_KEY3 = `.${DATA_KEY3}`;
  var EVENT_FOCUSIN = `focusin${EVENT_KEY3}`;
  var EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY3}`;
  var TAB_KEY2 = "Tab";
  var TAB_NAV_FORWARD = "forward";
  var TAB_NAV_BACKWARD = "backward";
  var Default4 = {
    autofocus: true,
    trapElement: null
    // The element to trap focus inside of
  };
  var DefaultType4 = {
    autofocus: "boolean",
    trapElement: "element"
  };
  var FocusTrap = class extends config_default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }
    // Getters
    static get Default() {
      return Default4;
    }
    static get DefaultType() {
      return DefaultType4;
    }
    static get NAME() {
      return NAME4;
    }
    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      event_handler_default.off(document, EVENT_KEY3);
      event_handler_default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
      event_handler_default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      event_handler_default.off(document, EVENT_KEY3);
    }
    // Private
    _handleFocusin(event) {
      const { trapElement } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = selector_engine_default.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY2) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  };
  var focustrap_default = FocusTrap;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\util\scrollbar.js
  var SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  var SELECTOR_STICKY_CONTENT = ".sticky-top";
  var PROPERTY_PADDING = "padding-right";
  var PROPERTY_MARGIN = "margin-right";
  var ScrollBarHelper = class {
    constructor() {
      this._element = document.body;
    }
    // Public
    getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow");
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow");
      this._element.style.overflow = "hidden";
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = (element) => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        manipulator_default.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = (element) => {
        const value = manipulator_default.getDataAttribute(element, styleProperty);
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        manipulator_default.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of selector_engine_default.find(selector, this._element)) {
        callBack(sel);
      }
    }
  };
  var scrollbar_default = ScrollBarHelper;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\modal.js
  var NAME5 = "modal";
  var DATA_KEY4 = "bs.modal";
  var EVENT_KEY4 = `.${DATA_KEY4}`;
  var DATA_API_KEY3 = ".data-api";
  var ESCAPE_KEY2 = "Escape";
  var EVENT_HIDE3 = `hide${EVENT_KEY4}`;
  var EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY4}`;
  var EVENT_HIDDEN3 = `hidden${EVENT_KEY4}`;
  var EVENT_SHOW3 = `show${EVENT_KEY4}`;
  var EVENT_SHOWN3 = `shown${EVENT_KEY4}`;
  var EVENT_RESIZE = `resize${EVENT_KEY4}`;
  var EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY4}`;
  var EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY4}`;
  var EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY4}`;
  var EVENT_CLICK_DATA_API3 = `click${EVENT_KEY4}${DATA_API_KEY3}`;
  var CLASS_NAME_OPEN = "modal-open";
  var CLASS_NAME_FADE2 = "fade";
  var CLASS_NAME_SHOW4 = "show";
  var CLASS_NAME_STATIC = "modal-static";
  var OPEN_SELECTOR = ".modal.show";
  var SELECTOR_DIALOG = ".modal-dialog";
  var SELECTOR_MODAL_BODY = ".modal-body";
  var SELECTOR_DATA_TOGGLE3 = '[data-bs-toggle="modal"]';
  var Default5 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  var DefaultType5 = {
    backdrop: "(boolean|string)",
    focus: "boolean",
    keyboard: "boolean"
  };
  var Modal = class _Modal extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._dialog = selector_engine_default.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new scrollbar_default();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default5;
    }
    static get DefaultType() {
      return DefaultType5;
    }
    static get NAME() {
      return NAME5;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = event_handler_default.trigger(this._element, EVENT_SHOW3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      event_handler_default.off(window, EVENT_KEY4);
      event_handler_default.off(this._dialog, EVENT_KEY4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    // Private
    _initializeBackDrop() {
      return new backdrop_default({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new focustrap_default({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = "block";
      this._element.removeAttribute("aria-hidden");
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.scrollTop = 0;
      const modalBody = selector_engine_default.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        event_handler_default.trigger(this._element, EVENT_SHOWN3, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      event_handler_default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
        if (event.key !== ESCAPE_KEY2) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      event_handler_default.on(window, EVENT_RESIZE, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      event_handler_default.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
        event_handler_default.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none";
      this._element.setAttribute("aria-hidden", true);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        event_handler_default.trigger(this._element, EVENT_HIDDEN3);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE2);
    }
    _triggerBackdropTransition() {
      const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = "hidden";
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */
    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? "paddingLeft" : "paddingRight";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? "paddingRight" : "paddingLeft";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "";
      this._element.style.paddingRight = "";
    }
    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function() {
        const data = _Modal.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API3, SELECTOR_DATA_TOGGLE3, function(event) {
    const target = selector_engine_default.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    event_handler_default.one(target, EVENT_SHOW3, (showEvent) => {
      if (showEvent.defaultPrevented) {
        return;
      }
      event_handler_default.one(target, EVENT_HIDDEN3, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });
    const alreadyOpen = selector_engine_default.findOne(OPEN_SELECTOR);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  defineJQueryPlugin(Modal);

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.3+incompatible\js\src\offcanvas.js
  var NAME6 = "offcanvas";
  var DATA_KEY5 = "bs.offcanvas";
  var EVENT_KEY5 = `.${DATA_KEY5}`;
  var DATA_API_KEY4 = ".data-api";
  var EVENT_LOAD_DATA_API = `load${EVENT_KEY5}${DATA_API_KEY4}`;
  var ESCAPE_KEY3 = "Escape";
  var CLASS_NAME_SHOW5 = "show";
  var CLASS_NAME_SHOWING = "showing";
  var CLASS_NAME_HIDING = "hiding";
  var CLASS_NAME_BACKDROP = "offcanvas-backdrop";
  var OPEN_SELECTOR2 = ".offcanvas.show";
  var EVENT_SHOW4 = `show${EVENT_KEY5}`;
  var EVENT_SHOWN4 = `shown${EVENT_KEY5}`;
  var EVENT_HIDE4 = `hide${EVENT_KEY5}`;
  var EVENT_HIDE_PREVENTED2 = `hidePrevented${EVENT_KEY5}`;
  var EVENT_HIDDEN4 = `hidden${EVENT_KEY5}`;
  var EVENT_RESIZE2 = `resize${EVENT_KEY5}`;
  var EVENT_CLICK_DATA_API4 = `click${EVENT_KEY5}${DATA_API_KEY4}`;
  var EVENT_KEYDOWN_DISMISS2 = `keydown.dismiss${EVENT_KEY5}`;
  var SELECTOR_DATA_TOGGLE4 = '[data-bs-toggle="offcanvas"]';
  var Default6 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType6 = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    scroll: "boolean"
  };
  var Offcanvas = class _Offcanvas extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default6;
    }
    static get DefaultType() {
      return DefaultType6;
    }
    static get NAME() {
      return NAME6;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = event_handler_default.trigger(this._element, EVENT_SHOW4, { relatedTarget });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new scrollbar_default().hide();
      }
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.classList.add(CLASS_NAME_SHOWING);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW5);
        this._element.classList.remove(CLASS_NAME_SHOWING);
        event_handler_default.trigger(this._element, EVENT_SHOWN4, { relatedTarget });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW5, CLASS_NAME_HIDING);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        if (!this._config.scroll) {
          new scrollbar_default().reset();
        }
        event_handler_default.trigger(this._element, EVENT_HIDDEN4);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === "static") {
          event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED2);
          return;
        }
        this.hide();
      };
      const isVisible2 = Boolean(this._config.backdrop);
      return new backdrop_default({
        className: CLASS_NAME_BACKDROP,
        isVisible: isVisible2,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible2 ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new focustrap_default({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      event_handler_default.on(this._element, EVENT_KEYDOWN_DISMISS2, (event) => {
        if (event.key !== ESCAPE_KEY3) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED2);
      });
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API4, SELECTOR_DATA_TOGGLE4, function(event) {
    const target = selector_engine_default.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    event_handler_default.one(target, EVENT_HIDDEN4, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
    const alreadyOpen = selector_engine_default.findOne(OPEN_SELECTOR2);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  event_handler_default.on(window, EVENT_LOAD_DATA_API, () => {
    for (const selector of selector_engine_default.find(OPEN_SELECTOR2)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  event_handler_default.on(window, EVENT_RESIZE2, () => {
    for (const element of selector_engine_default.find("[aria-modal][class*=show][class*=offcanvas-]")) {
      if (getComputedStyle(element).position !== "fixed") {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  defineJQueryPlugin(Offcanvas);
  var offcanvas_default = Offcanvas;

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\utils\scrollspy.js
  var scrollspy = (element, fn) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(({ isIntersecting }) => isIntersecting)) {
        observer.disconnect();
        fn();
      }
    });
    observer.observe(element);
  };
  var scrollspy_default = scrollspy;

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\features\carousel.js
  var carousels = document.querySelectorAll(".js-carousel");
  var splideLoaded = false;
  var Carousel = class {
    constructor(carousel) {
      this.carousel = carousel;
      if (!splideLoaded) {
        this.addFiles();
      } else {
        this.init();
      }
    }
    addFiles() {
      this.splideJS = document.createElement("script");
      this.splideJS.type = "text/javascript";
      this.splideJS.src = "/assets/js/splide.min.js";
      document.getElementsByTagName("body")[0].appendChild(this.splideJS);
      this.splideCSS = document.createElement("link");
      this.splideCSS.rel = "stylesheet";
      this.splideCSS.href = "/assets/css/splide.min.css";
      document.getElementsByTagName("head")[0].appendChild(this.splideCSS);
      this.splideJS.addEventListener("load", () => {
        splideLoaded = true;
        this.init();
      });
    }
    init() {
      this.initI18n();
      this.initCarousel();
    }
    initI18n() {
      Splide.defaults = {
        i18n: window.i18n.carousel
      };
    }
    initCarousel() {
      new Splide(this.carousel).mount();
    }
  };
  carousels.forEach((carousel) => {
    scrollspy_default(carousel, () => {
      new Carousel(carousel);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\features\map.js
  var maps = document.querySelectorAll(".js-map");
  var leafletLoaded = false;
  var Map2 = class {
    constructor(div) {
      this.mapElm = div;
      if (!leafletLoaded) {
        this.addFiles();
      } else {
        this.init();
      }
    }
    addFiles() {
      this.leafletJS = document.createElement("script");
      this.leafletJS.type = "text/javascript";
      this.leafletJS.src = "/assets/js/leaflet.min.js";
      document.getElementsByTagName("body")[0].appendChild(this.leafletJS);
      this.leafletCSS = document.createElement("link");
      this.leafletCSS.rel = "stylesheet";
      this.leafletCSS.href = "/assets/css/leaflet.min.css";
      document.getElementsByTagName("head")[0].appendChild(this.leafletCSS);
      this.leafletJS.addEventListener("load", () => {
        leafletLoaded = true;
        this.init();
      });
    }
    init() {
      this.bounds = [];
      this.map = false;
      this.zoom = 10;
      if (this.mapElm.hasAttribute("data-zoom")) {
        this.zoom = this.mapElm.dataset.zoom;
      }
      this.tileSelect = 0;
      if (this.mapElm.hasAttribute("data-tile")) {
        this.tileSelect = this.mapElm.dataset.tile;
      }
      this.setMap();
    }
    setMap() {
      let locations = JSON.parse(this.mapElm.dataset.markers), coordinate = locations[0].coordinates;
      this.map = this.initMap(coordinate);
      this.initTileLayer();
      if (!this.mapElm.hasAttribute("data-marker-hidden")) {
        this.initMarkers();
      }
    }
    initMarkers() {
      let locations = JSON.parse(this.mapElm.dataset.markers), bounds = false;
      for (var i = 0; i < locations.length; i++) {
        this.addMarker(locations[i]);
      }
      if (locations.length > 1) {
        bounds = new L.LatLngBounds(this.bounds);
        this.map.fitBounds(bounds);
      }
    }
    initMap(coordinate) {
      return L.map(this.mapElm, {
        center: coordinate,
        zoom: this.zoom,
        scrollWheelZoom: false
      });
    }
    initTileLayer() {
      const tiles = [
        // OpenStreetMap default
        {
          tile: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        },
        // CartoDB Positron
        {
          tile: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
        },
        // CartoDB Dark Matter
        {
          tile: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
        },
        // Stadiamaps Alidade smooth
        {
          tile: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
          attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      ];
      L.tileLayer(tiles[this.tileSelect].tile, {
        attribution: tiles[this.tileSelect].attribution
      }).addTo(this.map);
    }
    addMarker(location2) {
      let newIcon = L.icon({
        iconUrl: "/assets/images/map-marker.svg",
        iconSize: [50, 50],
        iconAnchor: [25, 40]
      });
      this.bounds.push(location2.coordinates);
      let marker = L.marker(location2.coordinates, { icon: newIcon }).addTo(
        this.map
      );
      if (location2.title) {
        marker.bindPopup(location2.title);
      }
      marker.on("click", (e) => {
        this.map.setView(e.target.getLatLng());
      });
    }
  };
  maps.forEach((map) => {
    scrollspy_default(map, () => {
      new Map2(map);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\audio.js
  document.addEventListener("DOMContentLoaded", function() {
    let lazyAudios = [].slice.call(
      document.querySelectorAll(".js-audio.is-lazy")
    );
    if (lazyAudios.length > 0) {
      if ("IntersectionObserver" in window) {
        let lazyAudioObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(audio) {
            if (audio.isIntersecting) {
              for (let source in audio.target.children) {
                let audioSource = audio.target.children[source];
                if (typeof audioSource.tagName === "string" && audioSource.tagName === "SOURCE") {
                  audioSource.src = audioSource.dataset.src;
                }
              }
              audio.target.load();
              audio.target.classList.remove("is-lazy");
              lazyAudioObserver.unobserve(audio.target);
            }
          });
        });
        lazyAudios.forEach(function(lazyAudio) {
          lazyAudioObserver.observe(lazyAudio);
        });
      }
    }
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\blocks\chart.js
  var charts = document.querySelectorAll(".block-chart");
  var chartjsLoaded = false;
  var BlockChart = class {
    constructor(block) {
      this.chart = block.querySelector(".js-chart");
      this.canvas = this.chart.getContext("2d");
      if (!chartjsLoaded) {
        this.addFiles();
      } else {
        this.init();
      }
    }
    addFiles() {
      this.chartjsJS = document.createElement("script");
      this.chartjsJS.type = "text/javascript";
      this.chartjsJS.src = "/assets/js/chart.umd.js";
      document.getElementsByTagName("body")[0].appendChild(this.chartjsJS);
      this.chartjsJS.addEventListener("load", () => {
        chartjsLoaded = true;
        this.init();
      });
    }
    init() {
      let type = this.chart.dataset.type, label = this.chart.dataset.label, backgroundColor = this.chart.dataset.backgroundColor, borderColor = this.chart.dataset.borderColor, jsonData = window.json[this.chart.id], data = {};
      if (jsonData) {
        data = jsonData;
      } else {
        let items = JSON.parse(this.chart.dataset.items);
        let backgroundColors = items.map(function(e) {
          return e.color;
        });
        let labels = items.map(function(e) {
          return e.label;
        });
        let datas = items.map(function(e) {
          return e.value;
        });
        if (backgroundColor) {
          backgroundColors = backgroundColor;
        }
        data = {
          labels,
          datasets: [
            {
              label,
              data: datas,
              fill: true,
              backgroundColor: backgroundColors,
              borderColor
            }
          ]
        };
      }
      this.config = {
        type,
        data,
        options: {
          responsive: true,
          layout: {
            padding: 20
          }
        }
      };
      if (type === "line") {
        this.config.options.scales = {};
        this.config.options.scales.y = {};
        this.config.options.scales.y.beginAtZero = true;
      }
      if (type === "radar") {
        this.config.options.scale = {};
        this.config.options.scale.min = 0;
      }
      if (this.chart.dataset.color) {
        Chart.defaults.color = this.chart.dataset.color;
      }
      let chart = new Chart(this.canvas, this.config);
    }
  };
  charts.forEach((chart) => {
    scrollspy_default(chart, () => {
      new BlockChart(chart);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\gauge.js
  var gauges = document.querySelectorAll(".js-gauge");
  document.addEventListener("DOMContentLoaded", function() {
    gauges.forEach((gauge) => {
      scrollspy_default(gauge, () => {
        gauge.classList.add("show");
      });
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\form.js
  var forms = document.querySelectorAll(".js-form");
  var Form = class {
    constructor(form) {
      this.form = form;
      this.form_message = form.querySelector(".js-form-message");
      this.init();
    }
    init() {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
    async handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const actionUrl = event.target.action || "/";
      let serviceForm = "netlify";
      if (this.form.formAction) {
        const urlObj = new URL(this.form.formAction);
        serviceForm = urlObj.hostname;
      }
      let headers = { "Content-Type": "application/json" };
      let body = this.formDataToJson(formData);
      if (serviceForm == "netlify") {
        headers = { "Content-Type": "application/x-www-form-urlencoded" };
        body = new URLSearchParams(formData).toString();
      }
      this.form.classList.add("is-submitting");
      try {
        const response = await fetch(actionUrl, {
          method: this.form.method,
          headers,
          body
        });
        if (response.ok) {
          this.removeErrorMessage();
          this.addSuccessMessage();
        } else {
          this.addErrorMessage(await response.text());
        }
      } catch (error) {
        console.error("Erreur:", error);
        this.addErrorMessage(error.message);
      }
    }
    formDataToJson(formData) {
      let object = {};
      formData.forEach((value, key) => {
        if (object[key] !== void 0) {
          if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
          }
          object[key].push(value);
        } else {
          object[key] = value;
        }
      });
      return JSON.stringify(object);
    }
    addSuccessMessage() {
      this.form.classList.add("is-success");
      this.form_message.textContent = window.i18n.form.success;
    }
    addErrorMessage(errorMessage) {
      this.form.classList.remove("is-submitting");
      this.form.classList.remove("is-success");
      this.form.classList.add("has-error");
      this.form_message.textContent = errorMessage;
    }
    removeErrorMessage() {
      this.form.classList.remove("is-submitting");
      this.form.classList.remove("has-error");
      this.form_message.innerHTML = "";
    }
  };
  forms.forEach((form) => {
    new Form(form);
  });

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\image.js
  var ImageType = class {
    constructor() {
      this.figcaptionId = 0;
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const FIGURE = document.createElement("figure");
      const IMAGE = document.createElement("img");
      const THUMBNAIL = el.querySelector("img");
      const LOADING_INDICATOR = document.createElement("div");
      FIGURE.tabIndex = -1;
      FIGURE.setAttribute("role", "group");
      FIGURE.style.opacity = "0";
      if (THUMBNAIL) {
        IMAGE.alt = THUMBNAIL.alt || "";
      }
      IMAGE.setAttribute("data-src", el.href);
      if (el.hasAttribute("data-srcset")) {
        IMAGE.setAttribute("data-srcset", el.getAttribute("data-srcset"));
      }
      if (el.hasAttribute("data-sizes")) {
        IMAGE.setAttribute("data-sizes", el.getAttribute("data-sizes"));
      }
      FIGURE.appendChild(IMAGE);
      let captionContent;
      if (typeof this.userSettings.captionText === "function") {
        captionContent = this.userSettings.captionText(el);
      } else if (this.userSettings.captionsSelector === "self" && el.getAttribute(this.userSettings.captionAttribute)) {
        captionContent = el.getAttribute(this.userSettings.captionAttribute);
      } else if (this.userSettings.captionsSelector === "img" && THUMBNAIL && THUMBNAIL.getAttribute(this.userSettings.captionAttribute)) {
        captionContent = THUMBNAIL.getAttribute(this.userSettings.captionAttribute);
      }
      if (this.userSettings.captions && captionContent) {
        const FIGCAPTION = document.createElement("figcaption");
        FIGCAPTION.id = `tobii-figcaption-${this.figcaptionId}`;
        const SPAN = document.createElement("span");
        if (this.userSettings.captionHTML) {
          SPAN.innerHTML = captionContent;
        } else {
          SPAN.textContent = captionContent;
        }
        FIGCAPTION.appendChild(SPAN);
        if (this.userSettings.captionToggle) {
          const BUTTON = document.createElement("button");
          BUTTON.className = "caption-toggle";
          BUTTON.textContent = BUTTON.title = this.userSettings.captionToggleLabel[0];
          BUTTON.setAttribute("aria-controls", FIGCAPTION.id);
          BUTTON.setAttribute("aria-expanded", true);
          const preventAndStopEvent = (event) => {
            event.preventDefault();
            event.stopPropagation();
          };
          BUTTON.addEventListener("pointerdown", (event) => preventAndStopEvent(event));
          BUTTON.addEventListener("pointerup", (event) => preventAndStopEvent(event));
          BUTTON.addEventListener("click", (event) => {
            preventAndStopEvent(event);
            const isExpanded = BUTTON.getAttribute("aria-expanded") === "true";
            const buttonLabel = isExpanded ? this.userSettings.captionToggleLabel[1] : this.userSettings.captionToggleLabel[0];
            BUTTON.textContent = BUTTON.title = buttonLabel;
            BUTTON.setAttribute("aria-expanded", !isExpanded);
            SPAN.setAttribute("aria-hidden", isExpanded);
          });
          FIGCAPTION.appendChild(BUTTON);
        }
        FIGURE.appendChild(FIGCAPTION);
        IMAGE.setAttribute("aria-labelledby", FIGCAPTION.id);
        FIGURE.setAttribute("aria-label", SPAN.textContent);
        ++this.figcaptionId;
      }
      container.appendChild(FIGURE);
      LOADING_INDICATOR.className = "tobii__loader";
      LOADING_INDICATOR.setAttribute("role", "progressbar");
      LOADING_INDICATOR.setAttribute("aria-label", this.userSettings.loadingIndicatorLabel);
      container.appendChild(LOADING_INDICATOR);
      container.setAttribute("data-type", "image");
      container.classList.add("tobii-image");
    }
    onPreload(container) {
      this.onLoad(container);
    }
    onLoad(container) {
      const IMAGE = container.querySelector("img");
      if (!IMAGE.hasAttribute("data-src")) {
        return;
      }
      const FIGURE = container.querySelector("figure");
      const LOADING_INDICATOR = container.querySelector(".tobii__loader");
      const handleImageEvent = () => {
        container.removeChild(LOADING_INDICATOR);
        FIGURE.style.opacity = "1";
      };
      IMAGE.addEventListener("load", handleImageEvent);
      IMAGE.addEventListener("error", handleImageEvent);
      if (IMAGE.hasAttribute("data-srcset")) {
        IMAGE.setAttribute("srcset", IMAGE.getAttribute("data-srcset"));
        IMAGE.removeAttribute("data-srcset");
      }
      if (IMAGE.hasAttribute("data-sizes")) {
        IMAGE.setAttribute("sizes", IMAGE.getAttribute("data-sizes"));
        IMAGE.removeAttribute("data-sizes");
      }
      IMAGE.setAttribute("src", IMAGE.getAttribute("data-src"));
      IMAGE.removeAttribute("data-src");
    }
    onLeave(container) {
    }
    onCleanup(container) {
    }
    onReset() {
      this.figcaptionId = 0;
    }
  };
  var image_default = ImageType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\iframe.js
  var IframeType = class {
    constructor() {
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const HREF = el.hasAttribute("data-target") ? el.getAttribute("data-target") : el.getAttribute("href");
      container.setAttribute("data-HREF", HREF);
      if (el.getAttribute("data-allow")) {
        container.setAttribute("data-allow", el.getAttribute("data-allow"));
      }
      if (el.hasAttribute("data-width")) {
        container.setAttribute("data-width", `${el.getAttribute("data-width")}`);
      }
      if (el.hasAttribute("data-height")) {
        container.setAttribute("data-height", `${el.getAttribute("data-height")}`);
      }
      container.setAttribute("data-type", "iframe");
      container.classList.add("tobii-iframe");
    }
    onPreload(container) {
    }
    onLoad(container) {
      let IFRAME = container.querySelector("iframe");
      const LOADING_INDICATOR = document.createElement("div");
      LOADING_INDICATOR.className = "tobii__loader";
      LOADING_INDICATOR.setAttribute("role", "progressbar");
      LOADING_INDICATOR.setAttribute("aria-label", this.userSettings.loadingIndicatorLabel);
      container.appendChild(LOADING_INDICATOR);
      if (IFRAME == null) {
        IFRAME = document.createElement("iframe");
        const HREF = container.getAttribute("data-href");
        IFRAME.setAttribute("frameborder", "0");
        IFRAME.setAttribute("src", HREF);
        IFRAME.setAttribute("allowfullscreen", "");
        if (HREF.indexOf("youtube.com") > -1) {
          IFRAME.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          );
        } else if (HREF.indexOf("vimeo.com") > -1) {
          IFRAME.setAttribute("allow", "autoplay; picture-in-picture");
        } else if (container.hasAttribute("data-allow")) {
          IFRAME.setAttribute("allow", container.getAttribute("data-allow"));
        }
        if (container.getAttribute("data-width")) {
          IFRAME.style.maxWidth = `${container.getAttribute("data-width")}`;
        }
        if (container.getAttribute("data-height")) {
          IFRAME.style.maxHeight = `${container.getAttribute("data-height")}`;
        }
        IFRAME.style.opacity = "0";
        container.appendChild(IFRAME);
        IFRAME.addEventListener("load", () => {
          IFRAME.style.opacity = "1";
          const LOADING_INDICATOR2 = container.querySelector(".tobii__loader");
          if (LOADING_INDICATOR2) {
            container.removeChild(LOADING_INDICATOR2);
          }
        });
        IFRAME.addEventListener("error", () => {
          IFRAME.style.opacity = "1";
          const LOADING_INDICATOR2 = container.querySelector(".tobii__loader");
          if (LOADING_INDICATOR2) {
            container.removeChild(LOADING_INDICATOR2);
          }
        });
      } else {
        IFRAME.setAttribute("src", container.getAttribute("data-href"));
      }
    }
    onLeave(container) {
    }
    onCleanup(container) {
      const IFRAME = container.querySelector("iframe");
      IFRAME.setAttribute("src", "");
      IFRAME.style.opacity = "0";
    }
    onReset() {
    }
  };
  var iframe_default = IframeType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\html.js
  var HtmlType = class {
    constructor() {
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const TARGET_SELECTOR = el.hasAttribute("data-target") ? el.getAttribute("data-target") : el.getAttribute("href");
      const TARGET = document.querySelector(TARGET_SELECTOR).cloneNode(true);
      if (!TARGET) {
        throw new Error(`Ups, I can't find the target ${TARGET_SELECTOR}.`);
      }
      container.appendChild(TARGET);
      container.setAttribute("data-type", "html");
      container.classList.add("tobii-html");
    }
    onPreload(container) {
    }
    onLoad(container, group) {
      const VIDEO = container.querySelector("video");
      if (VIDEO) {
        if (VIDEO.hasAttribute("data-time") && VIDEO.readyState > 0) {
          VIDEO.currentTime = VIDEO.getAttribute("data-time");
        }
        VIDEO.play();
      }
      const audio = container.querySelector("audio");
      if (audio) {
        audio.play();
      }
      container.classList.add("tobii-group-" + group);
    }
    onLeave(container) {
      const VIDEO = container.querySelector("video");
      if (VIDEO) {
        if (!VIDEO.paused) {
          VIDEO.pause();
        }
        if (VIDEO.readyState > 0) {
          VIDEO.setAttribute("data-time", VIDEO.currentTime);
        }
      }
      const audio = container.querySelector("audio");
      if (audio) {
        if (!audio.paused) {
          audio.pause();
        }
      }
    }
    onCleanup(container) {
      const VIDEO = container.querySelector("video");
      if (VIDEO) {
        if (VIDEO.readyState > 0 && VIDEO.readyState < 3 && VIDEO.duration !== VIDEO.currentTime) {
          const VIDEO_CLONE = VIDEO.cloneNode(true);
          this._removeSources(VIDEO);
          VIDEO.load();
          VIDEO.parentNode.removeChild(VIDEO);
          container.appendChild(VIDEO_CLONE);
        }
      }
    }
    onReset() {
    }
    /**
     * Remove all `src` attributes
     *
     * @param {HTMLElement} el - Element to remove all `src` attributes
     */
    _removeSources(el) {
      const SOURCES = el.querySelectorAll("src");
      if (SOURCES) {
        SOURCES.forEach((source) => {
          source.setAttribute("src", "");
        });
      }
    }
  };
  var html_default = HtmlType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\types\youtube.js
  var YoutubeType = class {
    constructor() {
      this.playerId = 0;
      this.PLAYER = [];
      this.userSettings = null;
    }
    init(el, container, userSettings) {
      this.userSettings = userSettings;
      const IFRAME_PLACEHOLDER = document.createElement("div");
      container.appendChild(IFRAME_PLACEHOLDER);
      this.PLAYER[this.playerId] = new window.YT.Player(IFRAME_PLACEHOLDER, {
        host: "https://www.youtube-nocookie.com",
        height: el.getAttribute("data-height") || "360",
        width: el.getAttribute("data-width") || "640",
        videoId: el.getAttribute("data-id"),
        playerVars: {
          controls: el.getAttribute("data-controls") || 1,
          rel: 0,
          playsinline: 1
        }
      });
      container.setAttribute("data-player", this.playerId);
      container.setAttribute("data-type", "youtube");
      container.classList.add("tobii-youtube");
      this.playerId++;
    }
    onPreload(container) {
    }
    onLoad(container) {
      this.PLAYER[container.getAttribute("data-player")].playVideo();
    }
    onLeave(container) {
      if (this.PLAYER[container.getAttribute("data-player")].getPlayerState() === 1) {
        this.PLAYER[container.getAttribute("data-player")].pauseVideo();
      }
    }
    onCleanup(container) {
      if (this.PLAYER[container.getAttribute("data-player")].getPlayerState() === 1) {
        this.PLAYER[container.getAttribute("data-player")].pauseVideo();
      }
    }
    onReset() {
    }
  };
  var youtube_default = YoutubeType;

  // ns-hugo-imp:C:\Users\Gustavo\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\midzer\tobii@v3.0.0+incompatible\src\js\index.js
  function Tobii(userOptions) {
    const SUPPORTED_ELEMENTS = {
      image: new image_default(),
      // default
      html: new html_default(),
      iframe: new iframe_default(),
      youtube: new youtube_default()
    };
    const FOCUSABLE_ELEMENTS = [
      'a[href]:not([tabindex^="-"]):not([inert])',
      'area[href]:not([tabindex^="-"]):not([inert])',
      "input:not([disabled]):not([inert])",
      "select:not([disabled]):not([inert])",
      "textarea:not([disabled]):not([inert])",
      "button:not([disabled]):not([inert])",
      'iframe:not([tabindex^="-"]):not([inert])',
      'audio:not([tabindex^="-"]):not([inert])',
      'video:not([tabindex^="-"]):not([inert])',
      '[contenteditable]:not([tabindex^="-"]):not([inert])',
      '[tabindex]:not([tabindex^="-"]):not([inert])'
    ];
    let userSettings = {};
    const WAITING_ELS = [];
    const GROUP_ATTS = {
      gallery: [],
      slider: null,
      sliderElements: [],
      elementsLength: 0,
      currentIndex: 0,
      x: 0
    };
    let lightbox = null;
    let prevButton = null;
    let nextButton = null;
    let closeButton = null;
    let counter = null;
    let lastFocus = null;
    let offset = null;
    let isYouTubeDependencyLoaded = false;
    let groups = {};
    let activeGroup = null;
    let pointerDownCache = [];
    let lastTapTime = 0;
    const MIN_SCALE = 1;
    const MAX_SCALE = 4;
    const DOUBLE_TAP_TIME = 500;
    const SCALE_SENSITIVITY = 10;
    const TRANSFORM = {
      element: null,
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: MIN_SCALE
    };
    const DRAG = {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      distance: 0
    };
    const mergeOptions = (userOptions2) => {
      const OPTIONS = {
        selector: ".lightbox",
        captions: true,
        captionsSelector: "img",
        captionAttribute: "alt",
        captionText: null,
        captionHTML: false,
        captionToggle: true,
        captionToggleLabel: [
          "Hide caption",
          "Show caption"
        ],
        nav: "auto",
        navText: [
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="15 6 9 12 15 18" /></svg>',
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 6 15 12 9 18" /></svg>'
        ],
        navLabel: [
          "Previous image",
          "Next image"
        ],
        close: true,
        closeText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>',
        closeLabel: "Close lightbox",
        dialogTitle: "Lightbox",
        loadingIndicatorLabel: "Image loading",
        counter: true,
        keyboard: true,
        zoom: false,
        zoomText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="16 4 20 4 20 8" /><line x1="14" y1="10" x2="20" y2="4" /><polyline points="8 20 4 20 4 16" /><line x1="4" y1="20" x2="10" y2="14" /><polyline points="16 20 20 20 20 16" /><line x1="14" y1="14" x2="20" y2="20" /><polyline points="8 4 4 4 4 8" /><line x1="4" y1="4" x2="10" y2="10" /></svg>',
        docClose: true,
        swipeClose: true,
        hideScrollbar: true,
        draggable: true,
        threshold: 100,
        theme: "tobii--theme-default"
      };
      return {
        ...OPTIONS,
        ...userOptions2
      };
    };
    const init = (userOptions2) => {
      userSettings = mergeOptions(userOptions2);
      if (!lightbox) {
        createLightbox();
      }
      const LIGHTBOX_TRIGGER_ELS = document.querySelectorAll(userSettings.selector);
      if (!LIGHTBOX_TRIGGER_ELS) {
        throw new Error(`Ups, I can't find the selector ${userSettings.selector} on this website.`);
      }
      const uniqueMap = [];
      LIGHTBOX_TRIGGER_ELS.forEach((lightboxTriggerEl) => {
        const group = lightboxTriggerEl.hasAttribute("data-group") ? lightboxTriggerEl.getAttribute("data-group") : "default";
        let uid = lightboxTriggerEl.href;
        if (lightboxTriggerEl.hasAttribute("data-target")) {
          uid = lightboxTriggerEl.getAttribute("data-target");
        }
        uid += "__" + group;
        if (typeof uniqueMap[uid] !== "undefined") {
          lightboxTriggerEl.addEventListener("click", (event) => {
            selectGroup(group);
            open();
            event.preventDefault();
          });
        } else {
          uniqueMap[uid] = 1;
          checkDependencies(lightboxTriggerEl);
        }
      });
    };
    const checkDependencies = (el) => {
      if (document.querySelector('[data-type="youtube"]') !== null && !isYouTubeDependencyLoaded) {
        if (document.getElementById("iframe_api") === null) {
          const TAG = document.createElement("script");
          const FIRST_SCRIPT_TAG = document.getElementsByTagName("script")[0];
          TAG.id = "iframe_api";
          TAG.src = "https://www.youtube.com/iframe_api";
          FIRST_SCRIPT_TAG.parentNode.insertBefore(TAG, FIRST_SCRIPT_TAG);
        }
        if (WAITING_ELS.indexOf(el) === -1) {
          WAITING_ELS.push(el);
        }
        window.onYouTubePlayerAPIReady = () => {
          WAITING_ELS.forEach((waitingEl) => {
            add(waitingEl);
          });
          isYouTubeDependencyLoaded = true;
        };
      } else {
        add(el);
      }
    };
    const getGroupName = (el) => {
      return el.hasAttribute("data-group") ? el.getAttribute("data-group") : "default";
    };
    const copyObject = (object) => {
      return JSON.parse(JSON.stringify(object));
    };
    const add = (el) => {
      const newGroup = getGroupName(el);
      if (!Object.prototype.hasOwnProperty.call(groups, newGroup)) {
        groups[newGroup] = copyObject(GROUP_ATTS);
        groups[newGroup].slider = document.createElement("div");
        groups[newGroup].slider.className = "tobii__slider";
        groups[newGroup].slider.setAttribute("aria-hidden", "true");
        lightbox.appendChild(groups[newGroup].slider);
      }
      if (groups[newGroup].gallery.indexOf(el) === -1) {
        groups[newGroup].gallery.push(el);
        groups[newGroup].elementsLength++;
        if (userSettings.zoom && el.querySelector("img") && el.getAttribute("data-zoom") !== "false" || el.getAttribute("data-zoom") === "true") {
          const TOBII_ZOOM = document.createElement("div");
          TOBII_ZOOM.className = "tobii-zoom__icon";
          TOBII_ZOOM.innerHTML = userSettings.zoomText;
          el.classList.add("tobii-zoom");
          el.appendChild(TOBII_ZOOM);
        }
        el.addEventListener("click", triggerTobii);
        const SLIDER_ELEMENT = document.createElement("div");
        const SLIDER_ELEMENT_CONTENT = document.createElement("div");
        SLIDER_ELEMENT.className = "tobii__slide";
        SLIDER_ELEMENT.style.position = "absolute";
        SLIDER_ELEMENT.style.left = `${groups[newGroup].x * 100}%`;
        SLIDER_ELEMENT.setAttribute("aria-hidden", "true");
        const model = getModel(el);
        model.init(el, SLIDER_ELEMENT_CONTENT, userSettings);
        SLIDER_ELEMENT.appendChild(SLIDER_ELEMENT_CONTENT);
        groups[newGroup].slider.appendChild(SLIDER_ELEMENT);
        groups[newGroup].sliderElements.push(SLIDER_ELEMENT);
        ++groups[newGroup].x;
        if (isOpen() && newGroup === activeGroup) {
          updateConfig();
          updateLightbox();
        }
      } else {
        throw new Error("Ups, element already added.");
      }
    };
    const remove = (el) => {
      const GROUP_NAME = getGroupName(el);
      if (groups[GROUP_NAME].gallery.indexOf(el) === -1) {
        throw new Error(`Ups, I can't find a slide for the element ${el}.`);
      } else {
        const SLIDE_INDEX = groups[GROUP_NAME].gallery.indexOf(el);
        const SLIDE_EL = groups[GROUP_NAME].sliderElements[SLIDE_INDEX];
        if (isOpen() && GROUP_NAME === activeGroup && SLIDE_INDEX === groups[GROUP_NAME].currentIndex) {
          if (groups[GROUP_NAME].elementsLength === 1) {
            close();
            throw new Error("Ups, I've closed. There are no slides more to show.");
          } else {
            if (groups[GROUP_NAME].currentIndex === 0) {
              next();
            } else {
              previous();
            }
            updateConfig();
            updateLightbox();
          }
        }
        groups[GROUP_NAME].gallery.splice(groups[GROUP_NAME].gallery.indexOf(el));
        groups[GROUP_NAME].sliderElements.splice(groups[GROUP_NAME].gallery.indexOf(el));
        groups[GROUP_NAME].elementsLength--;
        --groups[GROUP_NAME].x;
        if (userSettings.zoom && el.querySelector(".tobii-zoom__icon")) {
          const ZOOM_ICON = el.querySelector(".tobii-zoom__icon");
          ZOOM_ICON.parentNode.classList.remove("tobii-zoom");
          ZOOM_ICON.parentNode.removeChild(ZOOM_ICON);
        }
        el.removeEventListener("click", triggerTobii);
        SLIDE_EL.parentNode.removeChild(SLIDE_EL);
      }
    };
    const createLightbox = () => {
      lightbox = document.createElement("div");
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-hidden", "true");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", userSettings.dialogTitle);
      lightbox.classList.add("tobii");
      lightbox.classList.add(userSettings.theme);
      prevButton = document.createElement("button");
      prevButton.className = "tobii__btn tobii__btn--previous";
      prevButton.setAttribute("type", "button");
      prevButton.setAttribute("aria-label", userSettings.navLabel[0]);
      prevButton.innerHTML = userSettings.navText[0];
      lightbox.appendChild(prevButton);
      nextButton = document.createElement("button");
      nextButton.className = "tobii__btn tobii__btn--next";
      nextButton.setAttribute("type", "button");
      nextButton.setAttribute("aria-label", userSettings.navLabel[1]);
      nextButton.innerHTML = userSettings.navText[1];
      lightbox.appendChild(nextButton);
      closeButton = document.createElement("button");
      closeButton.className = "tobii__btn tobii__btn--close";
      closeButton.setAttribute("type", "button");
      closeButton.setAttribute("aria-label", userSettings.closeLabel);
      closeButton.innerHTML = userSettings.closeText;
      lightbox.appendChild(closeButton);
      counter = document.createElement("div");
      counter.className = "tobii__counter";
      lightbox.appendChild(counter);
      document.body.appendChild(lightbox);
    };
    const getModel = (el) => {
      const type = el.getAttribute("data-type");
      if (SUPPORTED_ELEMENTS[type] !== void 0) {
        return SUPPORTED_ELEMENTS[type];
      } else {
        if (el.hasAttribute("data-type")) {
          console.log("Unknown lightbox element type: " + type);
        }
        return SUPPORTED_ELEMENTS.image;
      }
    };
    const open = (index = 0) => {
      if (isOpen()) {
        throw new Error("Ups, I'm aleady open.");
      }
      if (index === -1 || index >= groups[activeGroup].elementsLength) {
        throw new Error(`Ups, I can't find slide ${index}.`);
      }
      document.documentElement.classList.add("tobii-is-open");
      document.body.classList.add("tobii-is-open");
      document.body.classList.add("tobii-is-open-" + activeGroup);
      updateConfig();
      if (!userSettings.close) {
        closeButton.disabled = false;
        closeButton.setAttribute("aria-hidden", "true");
      }
      lastFocus = document.activeElement;
      const stateObj = {
        tobii: "close"
      };
      const url = window.location.href;
      window.history.pushState(stateObj, "Image", url);
      groups[activeGroup].currentIndex = index;
      bindEvents();
      load(groups[activeGroup].currentIndex);
      groups[activeGroup].slider.setAttribute("aria-hidden", "false");
      lightbox.setAttribute("aria-hidden", "false");
      updateLightbox();
      preload(groups[activeGroup].currentIndex + 1);
      preload(groups[activeGroup].currentIndex - 1);
      groups[activeGroup].slider.classList.add("tobii__slider--animate");
      const openEvent = new window.CustomEvent("open", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(openEvent);
    };
    const close = () => {
      if (!isOpen()) {
        throw new Error("Ups, I'm already closed.");
      }
      document.documentElement.classList.remove("tobii-is-open");
      document.body.classList.remove("tobii-is-open");
      document.body.classList.remove("tobii-is-open-" + activeGroup);
      unbindEvents();
      if (window.history.state !== null) {
        if (window.history.state.tobii === "close") {
          window.history.back();
        }
      }
      lastFocus.focus();
      leave(groups[activeGroup].currentIndex);
      cleanup(groups[activeGroup].currentIndex);
      lightbox.setAttribute("aria-hidden", "true");
      groups[activeGroup].slider.setAttribute("aria-hidden", "true");
      groups[activeGroup].currentIndex = 0;
      groups[activeGroup].slider.classList.remove("tobii__slider--animate");
      const closeEvent = new window.CustomEvent("close", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(closeEvent);
    };
    const preload = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      model.onPreload(CONTAINER);
    };
    const load = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      groups[activeGroup].sliderElements[index].classList.add("tobii__slide--is-active");
      groups[activeGroup].sliderElements[index].setAttribute("aria-hidden", "false");
      model.onLoad(CONTAINER, activeGroup);
    };
    const select = (index) => {
      const currIndex = groups[activeGroup].currentIndex;
      if (!isOpen()) {
        throw new Error("Ups, I'm closed.");
      }
      if (isOpen()) {
        if (!index && index !== 0) {
          throw new Error("Ups, no slide specified.");
        }
        if (index === groups[activeGroup].currentIndex) {
          throw new Error(`Ups, slide ${index} is already selected.`);
        }
        if (index === -1 || index >= groups[activeGroup].elementsLength) {
          throw new Error(`Ups, I can't find slide ${index}.`);
        }
      }
      groups[activeGroup].currentIndex = index;
      leave(currIndex);
      load(index);
      if (index < currIndex) {
        updateLightbox("left");
        cleanup(currIndex);
        preload(index - 1);
      }
      if (index > currIndex) {
        updateLightbox("right");
        cleanup(currIndex);
        preload(index + 1);
      }
    };
    const previous = () => {
      if (!isOpen()) {
        throw new Error("Ups, I'm closed.");
      }
      if (groups[activeGroup].currentIndex > 0) {
        leave(groups[activeGroup].currentIndex);
        load(--groups[activeGroup].currentIndex);
        updateLightbox("left");
        cleanup(groups[activeGroup].currentIndex + 1);
        preload(groups[activeGroup].currentIndex - 1);
      }
      const previousEvent = new window.CustomEvent("previous", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(previousEvent);
    };
    const next = () => {
      if (!isOpen()) {
        throw new Error("Ups, I'm closed.");
      }
      if (groups[activeGroup].currentIndex < groups[activeGroup].elementsLength - 1) {
        leave(groups[activeGroup].currentIndex);
        load(++groups[activeGroup].currentIndex);
        updateLightbox("right");
        cleanup(groups[activeGroup].currentIndex - 1);
        preload(groups[activeGroup].currentIndex + 1);
      }
      const nextEvent = new window.CustomEvent("next", {
        detail: {
          group: activeGroup
        }
      });
      lightbox.dispatchEvent(nextEvent);
    };
    const selectGroup = (name) => {
      if (isOpen()) {
        throw new Error("Ups, I'm open.");
      }
      if (!name) {
        throw new Error("Ups, no group specified.");
      }
      if (name && !Object.prototype.hasOwnProperty.call(groups, name)) {
        throw new Error(`Ups, I don't have a group called "${name}".`);
      }
      activeGroup = name;
    };
    const leave = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      groups[activeGroup].sliderElements[index].classList.remove("tobii__slide--is-active");
      groups[activeGroup].sliderElements[index].setAttribute("aria-hidden", "true");
      model.onLeave(CONTAINER);
    };
    const cleanup = (index) => {
      if (groups[activeGroup].sliderElements[index] === void 0) {
        return;
      }
      const CONTAINER = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
      const model = getModel(CONTAINER);
      model.onCleanup(CONTAINER);
      DRAG.startX = 0;
      DRAG.startY = 0;
      DRAG.x = 0;
      DRAG.y = 0;
      DRAG.distance = 0;
      lastTapTime = 0;
      if (isZoomed()) resetZoom();
      TRANSFORM.element = null;
    };
    const updateOffset = () => {
      offset = -groups[activeGroup].currentIndex * lightbox.offsetWidth;
      groups[activeGroup].slider.style.transform = `translate(${offset}px, 0)`;
    };
    const updateCounter = () => {
      counter.innerHTML = `<p>${groups[activeGroup].currentIndex + 1}/${groups[activeGroup].elementsLength}</p>`;
    };
    const updateFocus = (dir) => {
      const group = groups[activeGroup];
      const isNavEnabled = userSettings.nav === true || userSettings.nav === "auto";
      const hasMultipleSlides = group.elementsLength > 1;
      if (isNavEnabled && !isTouchDevice() && hasMultipleSlides) {
        setButtonState(prevButton, true, true);
        setButtonState(nextButton, true, true);
        if (group.currentIndex === 0) {
          setButtonState(nextButton, false, false);
          nextButton.focus();
        } else if (group.currentIndex === group.elementsLength - 1) {
          setButtonState(prevButton, false, false);
          prevButton.focus();
        } else {
          setButtonState(prevButton, false, false);
          setButtonState(nextButton, false, false);
          if (dir === "left") {
            prevButton.focus();
          } else {
            nextButton.focus();
          }
        }
      } else if (userSettings.close) {
        closeButton.focus();
      }
      if (hasMultipleSlides && group.currentIndex !== 0) {
        const focusableFigure = getFocusableFigure();
        if (focusableFigure) {
          setTimeout(() => {
            focusableFigure.focus();
          }, 250);
        }
      }
    };
    const resizeHandler = () => {
      updateOffset();
    };
    const triggerTobii = (event) => {
      event.preventDefault();
      activeGroup = getGroupName(event.currentTarget);
      open(groups[activeGroup].gallery.indexOf(event.currentTarget));
    };
    const clickHandler = (event) => {
      if (event.target === prevButton) {
        previous();
      } else if (event.target === nextButton) {
        next();
      } else if (event.target === closeButton || (event.target.classList.contains("tobii__slide") || event.target.classList.contains("tobii") && userSettings.docClose)) {
        close();
      }
      event.stopPropagation();
    };
    const getFocusableChildren = () => {
      return Array.prototype.slice.call(
        lightbox.querySelectorAll(
          `.tobii__btn:not([disabled]), .tobii__slide--is-active ${FOCUSABLE_ELEMENTS.join(", .tobii__slide--is-active ")}`
        )
      ).filter((child) => {
        return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
      });
    };
    const getFocusableFigure = () => {
      return lightbox.querySelector('.tobii__slide--is-active figure[tabindex="-1"]');
    };
    const setButtonState = (button, hidden, disabled) => {
      button.setAttribute("aria-hidden", hidden ? "true" : "false");
      button.disabled = disabled;
    };
    const keydownHandler = (event) => {
      const FOCUSABLE_CHILDREN = getFocusableChildren();
      const FOCUSED_ITEM_INDEX = FOCUSABLE_CHILDREN.indexOf(document.activeElement);
      if (event.code === "Tab") {
        if (event.shiftKey && FOCUSED_ITEM_INDEX === 0) {
          FOCUSABLE_CHILDREN[FOCUSABLE_CHILDREN.length - 1].focus();
          event.preventDefault();
        } else if (!event.shiftKey && (FOCUSED_ITEM_INDEX === FOCUSABLE_CHILDREN.length - 1 || FOCUSED_ITEM_INDEX === -1)) {
          FOCUSABLE_CHILDREN[0].focus();
          event.preventDefault();
        }
      } else if (event.code === "Escape") {
        event.preventDefault();
        close();
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        previous();
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };
    const contextmenuHandler = () => {
      pointerDownCache = [];
      updateOffset();
      groups[activeGroup].slider.classList.remove("tobii__slider--is-" + (isZoomed() ? "moving" : "dragging"));
    };
    const pointerdownHandler = (event) => {
      if (isIgnoreElement(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      DRAG.startX = DRAG.x = event.clientX;
      DRAG.startY = DRAG.y = event.clientY;
      DRAG.distance = 0;
      pointerDownCache.push(event);
      if (pointerDownCache.length === 2) {
        const { x, y } = midPoint(
          pointerDownCache[0].clientX,
          pointerDownCache[0].clientY,
          pointerDownCache[1].clientX,
          pointerDownCache[1].clientY
        );
        DRAG.startX = DRAG.x = x;
        DRAG.startY = DRAG.y = y;
        DRAG.distance = distance(
          pointerDownCache[0].clientX - pointerDownCache[1].clientX,
          pointerDownCache[0].clientY - pointerDownCache[1].clientY
        ) / TRANSFORM.scale;
      }
    };
    const pointermoveHandler = (event) => {
      if (!pointerDownCache.length) return;
      groups[activeGroup].slider.classList.add("tobii__slider--is-" + (isZoomed() ? "moving" : "dragging"));
      const index = pointerDownCache.findIndex(
        (cachedEv) => cachedEv.pointerId === event.pointerId
      );
      pointerDownCache[index] = event;
      if (pointerDownCache.length === 2) {
        const { x, y } = midPoint(
          pointerDownCache[0].clientX,
          pointerDownCache[0].clientY,
          pointerDownCache[1].clientX,
          pointerDownCache[1].clientY
        );
        const scale = distance(
          pointerDownCache[0].clientX - pointerDownCache[1].clientX,
          pointerDownCache[0].clientY - pointerDownCache[1].clientY
        ) / DRAG.distance;
        zoomPan(
          event.target,
          clamp(scale, MIN_SCALE, MAX_SCALE),
          x,
          y,
          x - DRAG.x,
          y - DRAG.y
        );
        DRAG.x = x;
        DRAG.y = y;
        return;
      }
      if (isZoomed()) {
        const deltaX = event.clientX - DRAG.x;
        const deltaY = event.clientY - DRAG.y;
        pan(deltaX, deltaY);
      }
      DRAG.x = event.clientX;
      DRAG.y = event.clientY;
      if (!isZoomed()) {
        const deltaX = DRAG.startX - DRAG.x;
        const deltaY = DRAG.startY - DRAG.y;
        if (distance(deltaX, deltaY) < 10) return;
        if (Math.abs(deltaX) > Math.abs(deltaY) && groups[activeGroup].elementsLength > 1) {
          groups[activeGroup].slider.style.transform = `translate(${offset - Math.round(deltaX)}px, 0)`;
        } else if (userSettings.swipeClose) {
          groups[activeGroup].slider.style.transform = `translate(${offset}px, -${Math.round(deltaY)}px)`;
        }
      }
    };
    const pointerupHandler = (event) => {
      if (!pointerDownCache.length) return;
      groups[activeGroup].slider.classList.remove("tobii__slider--is-" + (isZoomed() ? "moving" : "dragging"));
      const index = pointerDownCache.findIndex(
        (cachedEv) => cachedEv.pointerId === event.pointerId
      );
      pointerDownCache.splice(index, 1);
      const x = event.clientX;
      const y = event.clientY;
      const deltaX = DRAG.startX - x;
      const deltaY = DRAG.startY - y;
      const distanceX = Math.abs(deltaX);
      const distanceY = Math.abs(deltaY);
      if (distanceX > 8 || distanceY > 8) {
        if (!isZoomed()) {
          if (deltaX < 0 && distanceX > userSettings.threshold && groups[activeGroup].currentIndex > 0) {
            previous();
          } else if (deltaX > 0 && distanceX > userSettings.threshold && groups[activeGroup].currentIndex !== groups[activeGroup].elementsLength - 1) {
            next();
          } else if (deltaY > 0 && distanceY > userSettings.threshold && userSettings.swipeClose) {
            close();
          } else {
            updateOffset();
          }
        }
      } else {
        const now = Date.now();
        const tapLength = now - lastTapTime;
        if (tapLength < DOUBLE_TAP_TIME && tapLength > 100) {
          event.preventDefault();
          lastTapTime = 0;
          if (isZoomed()) {
            resetZoom();
          } else {
            zoomPan(event.target, MAX_SCALE / 2, x, y, 0, 0);
          }
        } else {
          lastTapTime = now;
          if (isTouchDevice()) {
            window.setTimeout(() => {
              const { left, top, bottom, right, width } = event.target.getBoundingClientRect();
              if (y < top || y > bottom || !lastTapTime) return;
              if (x > left && x < left + width / 2) {
                previous();
              } else if (x < right && x > right - width / 2) {
                next();
              }
            }, DOUBLE_TAP_TIME);
          }
        }
      }
    };
    const wheelHandler = (event) => {
      const deltaScale = Math.sign(event.deltaY) > 0 ? -1 : 1;
      if (!isZoomed() && !deltaScale) return;
      event.preventDefault();
      const newScale = TRANSFORM.scale + deltaScale / (SCALE_SENSITIVITY / TRANSFORM.scale);
      zoomPan(
        event.target,
        clamp(newScale, MIN_SCALE, MAX_SCALE),
        event.clientX,
        event.clientY,
        0,
        0
      );
    };
    const clampedTranslate = (axis, translate) => {
      const { element, scale, originX, originY } = TRANSFORM;
      const axisIsX = axis === "x";
      const origin = axisIsX ? originX : originY;
      const axisKey = axisIsX ? "offsetWidth" : "offsetHeight";
      const containerSize = element.parentNode[axisKey];
      const imageSize = element[axisKey];
      const bounds = element.getBoundingClientRect();
      const imageScaledSize = axisIsX ? bounds.width : bounds.height;
      const defaultOrigin = imageSize / 2;
      const originOffset = (origin - defaultOrigin) * (scale - 1);
      const range = Math.max(0, Math.round(imageScaledSize) - containerSize);
      const max = Math.round(range / 2);
      const min = 0 - max;
      return clamp(translate, min + originOffset, max + originOffset);
    };
    const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
    const isZoomed = () => TRANSFORM.scale !== MIN_SCALE;
    const pan = (deltaX, deltaY) => {
      if (deltaX !== 0) {
        TRANSFORM.translateX = clampedTranslate("x", TRANSFORM.translateX + deltaX);
      }
      if (deltaY !== 0) {
        TRANSFORM.translateY = clampedTranslate("y", TRANSFORM.translateY + deltaY);
      }
      const { element, originX, originY, translateX, translateY, scale } = TRANSFORM;
      element.style.transformOrigin = `${originX}px ${originY}px`;
      element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };
    const zoomPan = (el, newScale, x, y, deltaX, deltaY) => {
      if (el.tagName !== "IMG") return;
      const { left, top } = el.getBoundingClientRect();
      const originX = x - left;
      const originY = y - top;
      const newOriginX = originX / TRANSFORM.scale;
      const newOriginY = originY / TRANSFORM.scale;
      TRANSFORM.element = el;
      TRANSFORM.originX = newOriginX;
      TRANSFORM.originY = newOriginY;
      TRANSFORM.scale = newScale;
      pan(deltaX, deltaY);
    };
    const distance = (dx, dy) => Math.hypot(dx, dy);
    const midPoint = (x1, y1, x2, y2) => ({
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2
    });
    const resetZoom = () => {
      TRANSFORM.scale = MIN_SCALE;
      TRANSFORM.originX = 0;
      TRANSFORM.originY = 0;
      TRANSFORM.translateX = 0;
      TRANSFORM.translateY = 0;
      pan(0, 0);
    };
    const bindEvents = () => {
      if (userSettings.keyboard) {
        window.addEventListener("keydown", keydownHandler);
      }
      window.addEventListener("resize", resizeHandler);
      window.addEventListener("popstate", close);
      on("click", clickHandler);
      if (userSettings.draggable) {
        on("pointerdown", pointerdownHandler);
        on("pointermove", pointermoveHandler);
        on("pointerup", pointerupHandler);
        on("pointercancel", contextmenuHandler);
        on("pointerout", contextmenuHandler);
        on("pointerleave", contextmenuHandler);
        on("contextmenu", contextmenuHandler);
      }
      on("wheel", wheelHandler);
    };
    const unbindEvents = () => {
      if (userSettings.keyboard) {
        window.removeEventListener("keydown", keydownHandler);
      }
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("popstate", close);
      off("click", clickHandler);
      if (userSettings.draggable) {
        off("pointerdown", pointerdownHandler);
        off("pointermove", pointermoveHandler);
        off("pointerup", pointerupHandler);
        off("pointercancel", contextmenuHandler);
        off("pointerout", contextmenuHandler);
        off("pointerleave", contextmenuHandler);
        off("contextmenu", contextmenuHandler);
      }
      off("wheel", wheelHandler);
    };
    const updateConfig = () => {
      const group = groups[activeGroup];
      const slider = group.slider;
      if (userSettings.draggable && !slider.classList.contains("tobii__slider--is-draggable")) {
        slider.classList.add("tobii__slider--is-draggable");
      }
      const hideButtons = !userSettings.nav || group.elementsLength === 1 || userSettings.nav === "auto" && isTouchDevice();
      setButtonState(prevButton, hideButtons, hideButtons);
      setButtonState(nextButton, hideButtons, hideButtons);
      const hideCounter = !userSettings.counter || group.elementsLength === 1;
      counter.setAttribute("aria-hidden", hideCounter ? "true" : "false");
    };
    const updateLightbox = (dir = null) => {
      updateOffset();
      updateCounter();
      updateFocus(dir);
    };
    const reset = () => {
      if (isOpen()) {
        close();
      }
      const GROUPS_ENTRIES = Object.entries(groups);
      GROUPS_ENTRIES.forEach((groupsEntrie) => {
        const SLIDE_ELS = groupsEntrie[1].gallery;
        SLIDE_ELS.forEach((slideEl) => {
          remove(slideEl);
        });
      });
      groups = {};
      activeGroup = null;
      for (const i in SUPPORTED_ELEMENTS) {
        SUPPORTED_ELEMENTS[i].onReset();
      }
    };
    const destroy = () => {
      reset();
      lightbox.parentNode.removeChild(lightbox);
    };
    const isOpen = () => {
      return lightbox.getAttribute("aria-hidden") === "false";
    };
    const isTouchDevice = () => {
      return "ontouchstart" in window;
    };
    const isIgnoreElement = (el) => {
      return ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(el.tagName) !== -1 || el === prevButton || el === nextButton || el === closeButton;
    };
    const slidesIndex = () => {
      return groups[activeGroup].currentIndex;
    };
    const slidesCount = () => {
      return groups[activeGroup].elementsLength;
    };
    const currentGroup = () => {
      return activeGroup;
    };
    const on = (eventName, callback) => {
      lightbox.addEventListener(eventName, callback);
    };
    const off = (eventName, callback) => {
      lightbox.removeEventListener(eventName, callback);
    };
    init(userOptions);
    Tobii.open = open;
    Tobii.previous = previous;
    Tobii.next = next;
    Tobii.close = close;
    Tobii.add = checkDependencies;
    Tobii.remove = remove;
    Tobii.reset = reset;
    Tobii.destroy = destroy;
    Tobii.isOpen = isOpen;
    Tobii.slidesIndex = slidesIndex;
    Tobii.select = select;
    Tobii.slidesCount = slidesCount;
    Tobii.selectGroup = selectGroup;
    Tobii.currentGroup = currentGroup;
    Tobii.on = on;
    Tobii.off = off;
    return Tobii;
  }

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\gallery.js
  var galleries = document.querySelectorAll(".js-gallery");
  var lightboxLoaded = false;
  var Gallery = class {
    constructor(div) {
      this.gallery = div;
      if (this.gallery) {
        if (!lightboxLoaded) {
          this.init();
        }
      }
    }
    init() {
      lightboxLoaded = true;
      const closeLabel = window.i18n.close;
      const nextLabel = window.i18n.next;
      const previousLabel = window.i18n.previous;
      const tobii = new Tobii({
        captionsSelector: "self",
        captionAttribute: "data-caption",
        zoom: false,
        navLabel: [previousLabel, nextLabel],
        closeLabel
      });
    }
  };
  galleries.forEach((gallery) => {
    scrollspy_default(gallery, () => {
      new Gallery(gallery);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\blocks\instagram.js
  var instagrams = document.querySelectorAll(".block-instagram");
  var instafeedLoaded = false;
  var BlockInstagram = class {
    constructor(block) {
      this.instagram = block.querySelector(".js-instagram");
      if (this.instagram) {
        if (!instafeedLoaded) {
          this.addFiles();
        } else {
          this.init();
        }
      }
    }
    addFiles() {
      this.instafeedJS = document.createElement("script");
      this.instafeedJS.type = "text/javascript";
      this.instafeedJS.src = "/assets/js/instafeed.min.js";
      document.getElementsByTagName("body")[0].appendChild(this.instafeedJS);
      this.instafeedJS.addEventListener("load", () => {
        instafeedLoaded = true;
        this.init();
      });
    }
    init() {
      let instagramTemplate = '<div><a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" alt="" width="720" height="720"></a></div>', datas = this.instagram.dataset, instagramToken = datas.token, instagramLimit = parseInt(datas.limit, 10);
      const feed = new Instafeed({
        target: this.instagram,
        limit: instagramLimit,
        accessToken: instagramToken,
        template: instagramTemplate
      });
      feed.run();
    }
  };
  instagrams.forEach((instagram) => {
    scrollspy_default(instagram, () => {
      new BlockInstagram(instagram);
    });
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\menu.js
  var header = document.querySelector('header[role="banner"]');
  var Menu = class {
    constructor(elm) {
      this.elm = elm;
      this.init();
    }
    init() {
      this.events = ["scroll", "touchmove"];
      this.previousY = 0;
      this.y = 0;
      this.classSticky = "is-sticky";
      this.classScrollingDown = "is-scrolling-down";
      this.classMenuOpen = "is-menu-open";
      this.classDropdownMenuOpen = "is-dropdown-menu-open";
      this.offcanvas = document.getElementById("navigation");
      this.dropdowns = this.elm.querySelectorAll('[data-bs-toggle="dropdown"]');
      this.offset = this.elm.offsetHeight;
      this.initDropdowns();
      this.initOffcanvas();
      this.initSticky();
    }
    initDropdowns() {
      this.dropdowns.forEach((dropdown) => {
        this.toggleMenu(dropdown, "dropdown", this.classDropdownMenuOpen);
      });
    }
    initOffcanvas() {
      if (this.offcanvas) {
        this.toggleMenu(this.offcanvas, "offcanvas", this.classMenuOpen);
      }
    }
    initSticky() {
      this.events.forEach((event) => {
        window.addEventListener(event, () => {
          this.y = window.scrollY;
          if (this.y > this.offset) {
            this.elm.classList.add(this.classSticky);
          } else {
            this.elm.classList.remove(this.classSticky);
          }
          if (this.y > this.previousY && this.y > this.offset) {
            document.documentElement.classList.add(this.classScrollingDown);
          } else {
            document.documentElement.classList.remove(this.classScrollingDown);
          }
          this.previousY = this.y;
        });
      });
    }
    toggleMenu(elm, component, toggleClass) {
      elm.addEventListener("hidden.bs." + component, () => {
        if (!this.elm.querySelector('[aria-expanded="true"]')) {
          document.documentElement.classList.remove(toggleClass);
        }
      });
      elm.addEventListener("show.bs." + component, () => {
        document.documentElement.classList.add(toggleClass);
      });
    }
  };
  if (header) {
    new Menu(header);
  }

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\toc.js
  document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia("(max-width: 991.98px)").matches) {
      const myOffcanvas = document.getElementById("toc");
      if (myOffcanvas) {
        const bsOffcanvas = new offcanvas_default(myOffcanvas);
        const menuLinks = myOffcanvas.querySelectorAll("a");
        for (var i = 0; i < menuLinks.length; i++) {
          menuLinks[i].addEventListener("click", function(event) {
            event.preventDefault();
            bsOffcanvas.hide();
            setTimeout(() => {
              location = event.target;
            }, "500");
          });
        }
      }
    }
  });

  // ns-hugo-imp:C:\Users\Gustavo\Documents\Unb\MDS\2025-2-squad-05\themes\hugolify\assets\js\components\video.js
  document.addEventListener("DOMContentLoaded", function() {
    let lazyVideos = [].slice.call(
      document.querySelectorAll(".js-video.is-lazy")
    );
    if (lazyVideos.length > 0) {
      if ("IntersectionObserver" in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(video) {
            if (video.isIntersecting) {
              let hasMobileVideo = false;
              for (let source in video.target.children) {
                let videoSource = video.target.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                  if (videoSource.hasAttribute("data-src_mobile")) {
                    hasMobileVideo = true;
                  }
                  if (window.matchMedia("(max-width: 767px)").matches && hasMobileVideo) {
                    if (videoSource.hasAttribute("data-src_mobile")) {
                      videoSource.src = videoSource.dataset.src_mobile;
                    }
                  } else {
                    if (videoSource.hasAttribute("data-src")) {
                      videoSource.src = videoSource.dataset.src;
                    }
                  }
                }
              }
              video.target.load();
              video.target.classList.remove("is-lazy");
              lazyVideoObserver.unobserve(video.target);
            }
          });
        });
        lazyVideos.forEach(function(lazyVideo) {
          lazyVideoObserver.observe(lazyVideo);
        });
      }
    }
  });
})();
