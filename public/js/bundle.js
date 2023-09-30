! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Popper = {})
}(this, (function(e) {
    "use strict";

    function t(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }

    function s(e) {
        return e instanceof t(e).Element || e instanceof Element
    }

    function i(e) {
        return e instanceof t(e).HTMLElement || e instanceof HTMLElement
    }

    function n(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    }
    var r = Math.max,
        a = Math.min,
        o = Math.round;

    function l() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function(e) {
            return e.brand + "/" + e.version
        })).join(" ") : navigator.userAgent
    }

    function d() {
        return !/^((?!chrome|android).)*safari/i.test(l())
    }

    function c(e, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !1);
        var a = e.getBoundingClientRect(),
            l = 1,
            c = 1;
        n && i(e) && (l = e.offsetWidth > 0 && o(a.width) / e.offsetWidth || 1, c = e.offsetHeight > 0 && o(a.height) / e.offsetHeight || 1);
        var p = (s(e) ? t(e) : window).visualViewport,
            u = !d() && r,
            h = (a.left + (u && p ? p.offsetLeft : 0)) / l,
            f = (a.top + (u && p ? p.offsetTop : 0)) / c,
            m = a.width / l,
            g = a.height / c;
        return {
            width: m,
            height: g,
            top: f,
            right: h + m,
            bottom: f + g,
            left: h,
            x: h,
            y: f
        }
    }

    function p(e) {
        var s = t(e);
        return {
            scrollLeft: s.pageXOffset,
            scrollTop: s.pageYOffset
        }
    }

    function u(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function h(e) {
        return ((s(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function f(e) {
        return c(h(e)).left + p(e).scrollLeft
    }

    function m(e) {
        return t(e).getComputedStyle(e)
    }

    function g(e) {
        var t = m(e),
            s = t.overflow,
            i = t.overflowX,
            n = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(s + n + i)
    }

    function v(e, s, n) {
        void 0 === n && (n = !1);
        var r, a, l = i(s),
            d = i(s) && function(e) {
                var t = e.getBoundingClientRect(),
                    s = o(t.width) / e.offsetWidth || 1,
                    i = o(t.height) / e.offsetHeight || 1;
                return 1 !== s || 1 !== i
            }(s),
            m = h(s),
            v = c(e, d, n),
            b = {
                scrollLeft: 0,
                scrollTop: 0
            },
            y = {
                x: 0,
                y: 0
            };
        return (l || !l && !n) && (("body" !== u(s) || g(m)) && (b = (r = s) !== t(r) && i(r) ? {
            scrollLeft: (a = r).scrollLeft,
            scrollTop: a.scrollTop
        } : p(r)), i(s) ? ((y = c(s, !0)).x += s.clientLeft, y.y += s.clientTop) : m && (y.x = f(m))), {
            x: v.left + b.scrollLeft - y.x,
            y: v.top + b.scrollTop - y.y,
            width: v.width,
            height: v.height
        }
    }

    function b(e) {
        var t = c(e),
            s = e.offsetWidth,
            i = e.offsetHeight;
        return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: s,
            height: i
        }
    }

    function y(e) {
        return "html" === u(e) ? e : e.assignedSlot || e.parentNode || (n(e) ? e.host : null) || h(e)
    }

    function w(e) {
        return ["html", "body", "#document"].indexOf(u(e)) >= 0 ? e.ownerDocument.body : i(e) && g(e) ? e : w(y(e))
    }

    function _(e, s) {
        var i;
        void 0 === s && (s = []);
        var n = w(e),
            r = n === (null == (i = e.ownerDocument) ? void 0 : i.body),
            a = t(n),
            o = r ? [a].concat(a.visualViewport || [], g(n) ? n : []) : n,
            l = s.concat(o);
        return r ? l : l.concat(_(y(o)))
    }

    function E(e) {
        return ["table", "td", "th"].indexOf(u(e)) >= 0
    }

    function x(e) {
        return i(e) && "fixed" !== m(e).position ? e.offsetParent : null
    }

    function T(e) {
        for (var s = t(e), r = x(e); r && E(r) && "static" === m(r).position;) r = x(r);
        return r && ("html" === u(r) || "body" === u(r) && "static" === m(r).position) ? s : r || function(e) {
            var t = /firefox/i.test(l());
            if (/Trident/i.test(l()) && i(e) && "fixed" === m(e).position) return null;
            var s = y(e);
            for (n(s) && (s = s.host); i(s) && ["html", "body"].indexOf(u(s)) < 0;) {
                var r = m(s);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return s;
                s = s.parentNode
            }
            return null
        }(e) || s
    }
    var C = "top",
        S = "bottom",
        M = "right",
        P = "left",
        k = "auto",
        $ = [C, S, M, P],
        O = "start",
        A = "end",
        L = "viewport",
        I = "popper",
        z = $.reduce((function(e, t) {
            return e.concat([t + "-" + O, t + "-" + A])
        }), []),
        D = [].concat($, [k]).reduce((function(e, t) {
            return e.concat([t, t + "-" + O, t + "-" + A])
        }), []),
        N = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function j(e) {
        var t = new Map,
            s = new Set,
            i = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        })), e.forEach((function(e) {
            s.has(e.name) || function e(n) {
                s.add(n.name), [].concat(n.requires || [], n.requiresIfExists || []).forEach((function(i) {
                    if (!s.has(i)) {
                        var n = t.get(i);
                        n && e(n)
                    }
                })), i.push(n)
            }(e)
        })), i
    }

    function B(e) {
        return e.split("-")[0]
    }

    function H(e, t) {
        var s = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (s && n(s)) {
            var i = t;
            do {
                if (i && e.isSameNode(i)) return !0;
                i = i.parentNode || i.host
            } while (i)
        }
        return !1
    }

    function W(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function q(e, i, n) {
        return i === L ? W(function(e, s) {
            var i = t(e),
                n = h(e),
                r = i.visualViewport,
                a = n.clientWidth,
                o = n.clientHeight,
                l = 0,
                c = 0;
            if (r) {
                a = r.width, o = r.height;
                var p = d();
                (p || !p && "fixed" === s) && (l = r.offsetLeft, c = r.offsetTop)
            }
            return {
                width: a,
                height: o,
                x: l + f(e),
                y: c
            }
        }(e, n)) : s(i) ? function(e, t) {
            var s = c(e, !1, "fixed" === t);
            return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s
        }(i, n) : W(function(e) {
            var t, s = h(e),
                i = p(e),
                n = null == (t = e.ownerDocument) ? void 0 : t.body,
                a = r(s.scrollWidth, s.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0),
                o = r(s.scrollHeight, s.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0),
                l = -i.scrollLeft + f(e),
                d = -i.scrollTop;
            return "rtl" === m(n || s).direction && (l += r(s.clientWidth, n ? n.clientWidth : 0) - a), {
                width: a,
                height: o,
                x: l,
                y: d
            }
        }(h(e)))
    }

    function R(e, t, n, o) {
        var l = "clippingParents" === t ? function(e) {
                var t = _(y(e)),
                    n = ["absolute", "fixed"].indexOf(m(e).position) >= 0 && i(e) ? T(e) : e;
                return s(n) ? t.filter((function(e) {
                    return s(e) && H(e, n) && "body" !== u(e)
                })) : []
            }(e) : [].concat(t),
            d = [].concat(l, [n]),
            c = d[0],
            p = d.reduce((function(t, s) {
                var i = q(e, s, o);
                return t.top = r(i.top, t.top), t.right = a(i.right, t.right), t.bottom = a(i.bottom, t.bottom), t.left = r(i.left, t.left), t
            }), q(e, c, o));
        return p.width = p.right - p.left, p.height = p.bottom - p.top, p.x = p.left, p.y = p.top, p
    }

    function F(e) {
        return e.split("-")[1]
    }

    function Y(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }

    function G(e) {
        var t, s = e.reference,
            i = e.element,
            n = e.placement,
            r = n ? B(n) : null,
            a = n ? F(n) : null,
            o = s.x + s.width / 2 - i.width / 2,
            l = s.y + s.height / 2 - i.height / 2;
        switch (r) {
            case C:
                t = {
                    x: o,
                    y: s.y - i.height
                };
                break;
            case S:
                t = {
                    x: o,
                    y: s.y + s.height
                };
                break;
            case M:
                t = {
                    x: s.x + s.width,
                    y: l
                };
                break;
            case P:
                t = {
                    x: s.x - i.width,
                    y: l
                };
                break;
            default:
                t = {
                    x: s.x,
                    y: s.y
                }
        }
        var d = r ? Y(r) : null;
        if (null != d) {
            var c = "y" === d ? "height" : "width";
            switch (a) {
                case O:
                    t[d] = t[d] - (s[c] / 2 - i[c] / 2);
                    break;
                case A:
                    t[d] = t[d] + (s[c] / 2 - i[c] / 2)
            }
        }
        return t
    }

    function X(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e)
    }

    function V(e, t) {
        return t.reduce((function(t, s) {
            return t[s] = e, t
        }), {})
    }

    function U(e, t) {
        void 0 === t && (t = {});
        var i = t,
            n = i.placement,
            r = void 0 === n ? e.placement : n,
            a = i.strategy,
            o = void 0 === a ? e.strategy : a,
            l = i.boundary,
            d = void 0 === l ? "clippingParents" : l,
            p = i.rootBoundary,
            u = void 0 === p ? L : p,
            f = i.elementContext,
            m = void 0 === f ? I : f,
            g = i.altBoundary,
            v = void 0 !== g && g,
            b = i.padding,
            y = void 0 === b ? 0 : b,
            w = X("number" != typeof y ? y : V(y, $)),
            _ = m === I ? "reference" : I,
            E = e.rects.popper,
            x = e.elements[v ? _ : m],
            T = R(s(x) ? x : x.contextElement || h(e.elements.popper), d, u, o),
            P = c(e.elements.reference),
            k = G({
                reference: P,
                element: E,
                strategy: "absolute",
                placement: r
            }),
            O = W(Object.assign({}, E, k)),
            A = m === I ? O : P,
            z = {
                top: T.top - A.top + w.top,
                bottom: A.bottom - T.bottom + w.bottom,
                left: T.left - A.left + w.left,
                right: A.right - T.right + w.right
            },
            D = e.modifiersData.offset;
        if (m === I && D) {
            var N = D[r];
            Object.keys(z).forEach((function(e) {
                var t = [M, S].indexOf(e) >= 0 ? 1 : -1,
                    s = [C, S].indexOf(e) >= 0 ? "y" : "x";
                z[e] += N[s] * t
            }))
        }
        return z
    }
    var Q = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function K() {
        for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function Z(e) {
        void 0 === e && (e = {});
        var t = e,
            i = t.defaultModifiers,
            n = void 0 === i ? [] : i,
            r = t.defaultOptions,
            a = void 0 === r ? Q : r;
        return function(e, t, i) {
            void 0 === i && (i = a);
            var r, o, l = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, Q, a),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                d = [],
                c = !1,
                p = {
                    state: l,
                    setOptions: function(i) {
                        var r = "function" == typeof i ? i(l.options) : i;
                        u(), l.options = Object.assign({}, a, l.options, r), l.scrollParents = {
                            reference: s(e) ? _(e) : e.contextElement ? _(e.contextElement) : [],
                            popper: _(t)
                        };
                        var o, c, h = function(e) {
                            var t = j(e);
                            return N.reduce((function(e, s) {
                                return e.concat(t.filter((function(e) {
                                    return e.phase === s
                                })))
                            }), [])
                        }((o = [].concat(n, l.options.modifiers), c = o.reduce((function(e, t) {
                            var s = e[t.name];
                            return e[t.name] = s ? Object.assign({}, s, t, {
                                options: Object.assign({}, s.options, t.options),
                                data: Object.assign({}, s.data, t.data)
                            }) : t, e
                        }), {}), Object.keys(c).map((function(e) {
                            return c[e]
                        }))));
                        return l.orderedModifiers = h.filter((function(e) {
                            return e.enabled
                        })), l.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                s = e.options,
                                i = void 0 === s ? {} : s,
                                n = e.effect;
                            if ("function" == typeof n) {
                                var r = n({
                                    state: l,
                                    name: t,
                                    instance: p,
                                    options: i
                                });
                                d.push(r || function() {})
                            }
                        })), p.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = l.elements,
                                t = e.reference,
                                s = e.popper;
                            if (K(t, s)) {
                                l.rects = {
                                    reference: v(t, T(s), "fixed" === l.options.strategy),
                                    popper: b(s)
                                }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach((function(e) {
                                    return l.modifiersData[e.name] = Object.assign({}, e.data)
                                }));
                                for (var i = 0; i < l.orderedModifiers.length; i++)
                                    if (!0 !== l.reset) {
                                        var n = l.orderedModifiers[i],
                                            r = n.fn,
                                            a = n.options,
                                            o = void 0 === a ? {} : a,
                                            d = n.name;
                                        "function" == typeof r && (l = r({
                                            state: l,
                                            options: o,
                                            name: d,
                                            instance: p
                                        }) || l)
                                    } else l.reset = !1, i = -1
                            }
                        }
                    },
                    update: (r = function() {
                        return new Promise((function(e) {
                            p.forceUpdate(), e(l)
                        }))
                    }, function() {
                        return o || (o = new Promise((function(e) {
                            Promise.resolve().then((function() {
                                o = void 0, e(r())
                            }))
                        }))), o
                    }),
                    destroy: function() {
                        u(), c = !0
                    }
                };
            if (!K(e, t)) return p;

            function u() {
                d.forEach((function(e) {
                    return e()
                })), d = []
            }
            return p.setOptions(i).then((function(e) {
                !c && i.onFirstUpdate && i.onFirstUpdate(e)
            })), p
        }
    }
    var J = {
            passive: !0
        },
        ee = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var s = e.state,
                    i = e.instance,
                    n = e.options,
                    r = n.scroll,
                    a = void 0 === r || r,
                    o = n.resize,
                    l = void 0 === o || o,
                    d = t(s.elements.popper),
                    c = [].concat(s.scrollParents.reference, s.scrollParents.popper);
                return a && c.forEach((function(e) {
                        e.addEventListener("scroll", i.update, J)
                    })), l && d.addEventListener("resize", i.update, J),
                    function() {
                        a && c.forEach((function(e) {
                            e.removeEventListener("scroll", i.update, J)
                        })), l && d.removeEventListener("resize", i.update, J)
                    }
            },
            data: {}
        },
        te = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state,
                    s = e.name;
                t.modifiersData[s] = G({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        },
        se = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

    function ie(e) {
        var s, i = e.popper,
            n = e.popperRect,
            r = e.placement,
            a = e.variation,
            l = e.offsets,
            d = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive,
            u = e.roundOffsets,
            f = e.isFixed,
            g = l.x,
            v = void 0 === g ? 0 : g,
            b = l.y,
            y = void 0 === b ? 0 : b,
            w = "function" == typeof u ? u({
                x: v,
                y: y
            }) : {
                x: v,
                y: y
            };
        v = w.x, y = w.y;
        var _ = l.hasOwnProperty("x"),
            E = l.hasOwnProperty("y"),
            x = P,
            k = C,
            $ = window;
        if (p) {
            var O = T(i),
                L = "clientHeight",
                I = "clientWidth";
            O === t(i) && "static" !== m(O = h(i)).position && "absolute" === d && (L = "scrollHeight", I = "scrollWidth"), O = O, (r === C || (r === P || r === M) && a === A) && (k = S, y -= (f && O === $ && $.visualViewport ? $.visualViewport.height : O[L]) - n.height, y *= c ? 1 : -1), r !== P && (r !== C && r !== S || a !== A) || (x = M, v -= (f && O === $ && $.visualViewport ? $.visualViewport.width : O[I]) - n.width, v *= c ? 1 : -1)
        }
        var z, D = Object.assign({
                position: d
            }, p && se),
            N = !0 === u ? function(e, t) {
                var s = e.x,
                    i = e.y,
                    n = t.devicePixelRatio || 1;
                return {
                    x: o(s * n) / n || 0,
                    y: o(i * n) / n || 0
                }
            }({
                x: v,
                y: y
            }, t(i)) : {
                x: v,
                y: y
            };
        return v = N.x, y = N.y, c ? Object.assign({}, D, ((z = {})[k] = E ? "0" : "", z[x] = _ ? "0" : "", z.transform = ($.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + y + "px)" : "translate3d(" + v + "px, " + y + "px, 0)", z)) : Object.assign({}, D, ((s = {})[k] = E ? y + "px" : "", s[x] = _ ? v + "px" : "", s.transform = "", s))
    }
    var ne = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    s = e.options,
                    i = s.gpuAcceleration,
                    n = void 0 === i || i,
                    r = s.adaptive,
                    a = void 0 === r || r,
                    o = s.roundOffsets,
                    l = void 0 === o || o,
                    d = {
                        placement: B(t.placement),
                        variation: F(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: n,
                        isFixed: "fixed" === t.options.strategy
                    };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, ie(Object.assign({}, d, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: a,
                    roundOffsets: l
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, ie(Object.assign({}, d, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l
                })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        },
        re = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var s = t.styles[e] || {},
                        n = t.attributes[e] || {},
                        r = t.elements[e];
                    i(r) && u(r) && (Object.assign(r.style, s), Object.keys(n).forEach((function(e) {
                        var t = n[e];
                        !1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    s = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, s.popper), t.styles = s, t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var n = t.elements[e],
                                r = t.attributes[e] || {},
                                a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : s[e]).reduce((function(e, t) {
                                    return e[t] = "", e
                                }), {});
                            i(n) && u(n) && (Object.assign(n.style, a), Object.keys(r).forEach((function(e) {
                                n.removeAttribute(e)
                            })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        },
        ae = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    s = e.options,
                    i = e.name,
                    n = s.offset,
                    r = void 0 === n ? [0, 0] : n,
                    a = D.reduce((function(e, s) {
                        return e[s] = function(e, t, s) {
                            var i = B(e),
                                n = [P, C].indexOf(i) >= 0 ? -1 : 1,
                                r = "function" == typeof s ? s(Object.assign({}, t, {
                                    placement: e
                                })) : s,
                                a = r[0],
                                o = r[1];
                            return a = a || 0, o = (o || 0) * n, [P, M].indexOf(i) >= 0 ? {
                                x: o,
                                y: a
                            } : {
                                x: a,
                                y: o
                            }
                        }(s, t.rects, r), e
                    }), {}),
                    o = a[t.placement],
                    l = o.x,
                    d = o.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += d), t.modifiersData[i] = a
            }
        },
        oe = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };

    function le(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return oe[e]
        }))
    }
    var de = {
        start: "end",
        end: "start"
    };

    function ce(e) {
        return e.replace(/start|end/g, (function(e) {
            return de[e]
        }))
    }

    function pe(e, t) {
        void 0 === t && (t = {});
        var s = t,
            i = s.placement,
            n = s.boundary,
            r = s.rootBoundary,
            a = s.padding,
            o = s.flipVariations,
            l = s.allowedAutoPlacements,
            d = void 0 === l ? D : l,
            c = F(i),
            p = c ? o ? z : z.filter((function(e) {
                return F(e) === c
            })) : $,
            u = p.filter((function(e) {
                return d.indexOf(e) >= 0
            }));
        0 === u.length && (u = p);
        var h = u.reduce((function(t, s) {
            return t[s] = U(e, {
                placement: s,
                boundary: n,
                rootBoundary: r,
                padding: a
            })[B(s)], t
        }), {});
        return Object.keys(h).sort((function(e, t) {
            return h[e] - h[t]
        }))
    }
    var ue = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state,
                s = e.options,
                i = e.name;
            if (!t.modifiersData[i]._skip) {
                for (var n = s.mainAxis, r = void 0 === n || n, a = s.altAxis, o = void 0 === a || a, l = s.fallbackPlacements, d = s.padding, c = s.boundary, p = s.rootBoundary, u = s.altBoundary, h = s.flipVariations, f = void 0 === h || h, m = s.allowedAutoPlacements, g = t.options.placement, v = B(g), b = l || (v !== g && f ? function(e) {
                        if (B(e) === k) return [];
                        var t = le(e);
                        return [ce(e), t, ce(t)]
                    }(g) : [le(g)]), y = [g].concat(b).reduce((function(e, s) {
                        return e.concat(B(s) === k ? pe(t, {
                            placement: s,
                            boundary: c,
                            rootBoundary: p,
                            padding: d,
                            flipVariations: f,
                            allowedAutoPlacements: m
                        }) : s)
                    }), []), w = t.rects.reference, _ = t.rects.popper, E = new Map, x = !0, T = y[0], $ = 0; $ < y.length; $++) {
                    var A = y[$],
                        L = B(A),
                        I = F(A) === O,
                        z = [C, S].indexOf(L) >= 0,
                        D = z ? "width" : "height",
                        N = U(t, {
                            placement: A,
                            boundary: c,
                            rootBoundary: p,
                            altBoundary: u,
                            padding: d
                        }),
                        j = z ? I ? M : P : I ? S : C;
                    w[D] > _[D] && (j = le(j));
                    var H = le(j),
                        W = [];
                    if (r && W.push(N[L] <= 0), o && W.push(N[j] <= 0, N[H] <= 0), W.every((function(e) {
                            return e
                        }))) {
                        T = A, x = !1;
                        break
                    }
                    E.set(A, W)
                }
                if (x)
                    for (var q = function(e) {
                            var t = y.find((function(t) {
                                var s = E.get(t);
                                if (s) return s.slice(0, e).every((function(e) {
                                    return e
                                }))
                            }));
                            if (t) return T = t, "break"
                        }, R = f ? 3 : 1; R > 0 && "break" !== q(R); R--);
                t.placement !== T && (t.modifiersData[i]._skip = !0, t.placement = T, t.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };

    function he(e, t, s) {
        return r(e, a(t, s))
    }
    var fe = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    s = e.options,
                    i = e.name,
                    n = s.mainAxis,
                    o = void 0 === n || n,
                    l = s.altAxis,
                    d = void 0 !== l && l,
                    c = s.boundary,
                    p = s.rootBoundary,
                    u = s.altBoundary,
                    h = s.padding,
                    f = s.tether,
                    m = void 0 === f || f,
                    g = s.tetherOffset,
                    v = void 0 === g ? 0 : g,
                    y = U(t, {
                        boundary: c,
                        rootBoundary: p,
                        padding: h,
                        altBoundary: u
                    }),
                    w = B(t.placement),
                    _ = F(t.placement),
                    E = !_,
                    x = Y(w),
                    k = "x" === x ? "y" : "x",
                    $ = t.modifiersData.popperOffsets,
                    A = t.rects.reference,
                    L = t.rects.popper,
                    I = "function" == typeof v ? v(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : v,
                    z = "number" == typeof I ? {
                        mainAxis: I,
                        altAxis: I
                    } : Object.assign({
                        mainAxis: 0,
                        altAxis: 0
                    }, I),
                    D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                    N = {
                        x: 0,
                        y: 0
                    };
                if ($) {
                    if (o) {
                        var j, H = "y" === x ? C : P,
                            W = "y" === x ? S : M,
                            q = "y" === x ? "height" : "width",
                            R = $[x],
                            G = R + y[H],
                            X = R - y[W],
                            V = m ? -L[q] / 2 : 0,
                            Q = _ === O ? A[q] : L[q],
                            K = _ === O ? -L[q] : -A[q],
                            Z = t.elements.arrow,
                            J = m && Z ? b(Z) : {
                                width: 0,
                                height: 0
                            },
                            ee = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            te = ee[H],
                            se = ee[W],
                            ie = he(0, A[q], J[q]),
                            ne = E ? A[q] / 2 - V - ie - te - z.mainAxis : Q - ie - te - z.mainAxis,
                            re = E ? -A[q] / 2 + V + ie + se + z.mainAxis : K + ie + se + z.mainAxis,
                            ae = t.elements.arrow && T(t.elements.arrow),
                            oe = ae ? "y" === x ? ae.clientTop || 0 : ae.clientLeft || 0 : 0,
                            le = null != (j = null == D ? void 0 : D[x]) ? j : 0,
                            de = R + re - le,
                            ce = he(m ? a(G, R + ne - le - oe) : G, R, m ? r(X, de) : X);
                        $[x] = ce, N[x] = ce - R
                    }
                    if (d) {
                        var pe, ue = "x" === x ? C : P,
                            fe = "x" === x ? S : M,
                            me = $[k],
                            ge = "y" === k ? "height" : "width",
                            ve = me + y[ue],
                            be = me - y[fe],
                            ye = -1 !== [C, P].indexOf(w),
                            we = null != (pe = null == D ? void 0 : D[k]) ? pe : 0,
                            _e = ye ? ve : me - A[ge] - L[ge] - we + z.altAxis,
                            Ee = ye ? me + A[ge] + L[ge] - we - z.altAxis : be,
                            xe = m && ye ? function(e, t, s) {
                                var i = he(e, t, s);
                                return i > s ? s : i
                            }(_e, me, Ee) : he(m ? _e : ve, me, m ? Ee : be);
                        $[k] = xe, N[k] = xe - me
                    }
                    t.modifiersData[i] = N
                }
            },
            requiresIfExists: ["offset"]
        },
        me = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, s = e.state,
                    i = e.name,
                    n = e.options,
                    r = s.elements.arrow,
                    a = s.modifiersData.popperOffsets,
                    o = B(s.placement),
                    l = Y(o),
                    d = [P, M].indexOf(o) >= 0 ? "height" : "width";
                if (r && a) {
                    var c = function(e, t) {
                            return X("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                                placement: t.placement
                            })) : e) ? e : V(e, $))
                        }(n.padding, s),
                        p = b(r),
                        u = "y" === l ? C : P,
                        h = "y" === l ? S : M,
                        f = s.rects.reference[d] + s.rects.reference[l] - a[l] - s.rects.popper[d],
                        m = a[l] - s.rects.reference[l],
                        g = T(r),
                        v = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0,
                        y = f / 2 - m / 2,
                        w = c[u],
                        _ = v - p[d] - c[h],
                        E = v / 2 - p[d] / 2 + y,
                        x = he(w, E, _),
                        k = l;
                    s.modifiersData[i] = ((t = {})[k] = x, t.centerOffset = x - E, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    s = e.options.element,
                    i = void 0 === s ? "[data-popper-arrow]" : s;
                null != i && ("string" != typeof i || (i = t.elements.popper.querySelector(i))) && H(t.elements.popper, i) && (t.elements.arrow = i)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };

    function ge(e, t, s) {
        return void 0 === s && (s = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - s.y,
            right: e.right - t.width + s.x,
            bottom: e.bottom - t.height + s.y,
            left: e.left - t.width - s.x
        }
    }

    function ve(e) {
        return [C, M, S, P].some((function(t) {
            return e[t] >= 0
        }))
    }
    var be = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state,
                    s = e.name,
                    i = t.rects.reference,
                    n = t.rects.popper,
                    r = t.modifiersData.preventOverflow,
                    a = U(t, {
                        elementContext: "reference"
                    }),
                    o = U(t, {
                        altBoundary: !0
                    }),
                    l = ge(a, i),
                    d = ge(o, n, r),
                    c = ve(l),
                    p = ve(d);
                t.modifiersData[s] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: d,
                    isReferenceHidden: c,
                    hasPopperEscaped: p
                }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": c,
                    "data-popper-escaped": p
                })
            }
        },
        ye = Z({
            defaultModifiers: [ee, te, ne, re]
        }),
        we = [ee, te, ne, re, ae, ue, fe, me, be],
        _e = Z({
            defaultModifiers: we
        });
    e.applyStyles = re, e.arrow = me, e.computeStyles = ne, e.createPopper = _e, e.createPopperLite = ye, e.defaultModifiers = we, e.detectOverflow = U, e.eventListeners = ee, e.flip = ue, e.hide = be, e.offset = ae, e.popperGenerator = Z, e.popperOffsets = te, e.preventOverflow = fe, Object.defineProperty(e, "__esModule", {
        value: !0
    })
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t(e.Popper)
}(this, (function(e) {
    "use strict";
    const t = function(e) {
            const t = Object.create(null, {
                [Symbol.toStringTag]: {
                    value: "Module"
                }
            });
            if (e)
                for (const s in e)
                    if ("default" !== s) {
                        const i = Object.getOwnPropertyDescriptor(e, s);
                        Object.defineProperty(t, s, i.get ? i : {
                            enumerable: !0,
                            get: () => e[s]
                        })
                    }
            return t.default = e, Object.freeze(t)
        }(e),
        s = new Map,
        i = {
            set(e, t, i) {
                s.has(e) || s.set(e, new Map);
                const n = s.get(e);
                n.has(t) || 0 === n.size ? n.set(t, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)
            },
            get: (e, t) => s.has(e) && s.get(e).get(t) || null,
            remove(e, t) {
                if (!s.has(e)) return;
                const i = s.get(e);
                i.delete(t), 0 === i.size && s.delete(e)
            }
        },
        n = "transitionend",
        r = e => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => "#" + CSS.escape(t))), e),
        a = e => {
            e.dispatchEvent(new Event(n))
        },
        o = e => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
        l = e => o(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(r(e)) : null,
        d = e => {
            if (!o(e) || 0 === e.getClientRects().length) return !1;
            const t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
                s = e.closest("details:not([open])");
            if (!s) return t;
            if (s !== e) {
                const t = e.closest("summary");
                if (t && t.parentNode !== s) return !1;
                if (null === t) return !1
            }
            return t
        },
        c = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
        p = e => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof e.getRootNode) {
                const t = e.getRootNode();
                return t instanceof ShadowRoot ? t : null
            }
            return e instanceof ShadowRoot ? e : e.parentNode ? p(e.parentNode) : null
        },
        u = () => {},
        h = e => {
            e.offsetHeight
        },
        f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
        m = [],
        g = () => "rtl" === document.documentElement.dir,
        v = e => {
            var t;
            t = () => {
                const t = f();
                if (t) {
                    const s = e.NAME,
                        i = t.fn[s];
                    t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = i, e.jQueryInterface)
                }
            }, "loading" === document.readyState ? (m.length || document.addEventListener("DOMContentLoaded", () => {
                for (const e of m) e()
            }), m.push(t)) : t()
        },
        b = (e, t = [], s = e) => "function" == typeof e ? e(...t) : s,
        y = (e, t, s = !0) => {
            if (!s) return void b(e);
            const i = (e => {
                if (!e) return 0;
                let {
                    transitionDuration: t,
                    transitionDelay: s
                } = window.getComputedStyle(e);
                const i = Number.parseFloat(t),
                    n = Number.parseFloat(s);
                return i || n ? (t = t.split(",")[0], s = s.split(",")[0], 1e3 * (Number.parseFloat(t) + Number.parseFloat(s))) : 0
            })(t) + 5;
            let r = !1;
            const o = ({
                target: s
            }) => {
                s === t && (r = !0, t.removeEventListener(n, o), b(e))
            };
            t.addEventListener(n, o), setTimeout(() => {
                r || a(t)
            }, i)
        },
        w = (e, t, s, i) => {
            const n = e.length;
            let r = e.indexOf(t);
            return -1 === r ? !s && i ? e[n - 1] : e[0] : (r += s ? 1 : -1, i && (r = (r + n) % n), e[Math.max(0, Math.min(r, n - 1))])
        },
        _ = /[^.]*(?=\..*)\.|.*/,
        E = /\..*/,
        x = /::\d+$/,
        T = {};
    let C = 1;
    const S = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        M = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function P(e, t) {
        return t && `${t}::${C++}` || e.uidEvent || C++
    }

    function k(e) {
        const t = P(e);
        return e.uidEvent = t, T[t] = T[t] || {}, T[t]
    }

    function $(e, t, s = null) {
        return Object.values(e).find(e => e.callable === t && e.delegationSelector === s)
    }

    function O(e, t, s) {
        const i = "string" == typeof t,
            n = i ? s : t || s;
        let r = z(e);
        return M.has(r) || (r = e), [i, n, r]
    }

    function A(e, t, s, i, n) {
        if ("string" != typeof t || !e) return;
        let [r, a, o] = O(t, s, i);
        if (t in S) {
            a = (e => function(t) {
                if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t)
            })(a)
        }
        const l = k(e),
            d = l[o] || (l[o] = {}),
            c = $(d, a, r ? s : null);
        if (c) return void(c.oneOff = c.oneOff && n);
        const p = P(a, t.replace(_, "")),
            u = r ? function(e, t, s) {
                return function i(n) {
                    const r = e.querySelectorAll(t);
                    for (let {
                            target: a
                        } = n; a && a !== this; a = a.parentNode)
                        for (const o of r)
                            if (o === a) return N(n, {
                                delegateTarget: a
                            }), i.oneOff && D.off(e, n.type, t, s), s.apply(a, [n])
                }
            }(e, s, a) : function(e, t) {
                return function s(i) {
                    return N(i, {
                        delegateTarget: e
                    }), s.oneOff && D.off(e, i.type, t), t.apply(e, [i])
                }
            }(e, a);
        u.delegationSelector = r ? s : null, u.callable = a, u.oneOff = n, u.uidEvent = p, d[p] = u, e.addEventListener(o, u, r)
    }

    function L(e, t, s, i, n) {
        const r = $(t[s], i, n);
        r && (e.removeEventListener(s, r, Boolean(n)), delete t[s][r.uidEvent])
    }

    function I(e, t, s, i) {
        const n = t[s] || {};
        for (const [r, a] of Object.entries(n)) r.includes(i) && L(e, t, s, a.callable, a.delegationSelector)
    }

    function z(e) {
        return e = e.replace(E, ""), S[e] || e
    }
    const D = {
        on(e, t, s, i) {
            A(e, t, s, i, !1)
        },
        one(e, t, s, i) {
            A(e, t, s, i, !0)
        },
        off(e, t, s, i) {
            if ("string" != typeof t || !e) return;
            const [n, r, a] = O(t, s, i), o = a !== t, l = k(e), d = l[a] || {}, c = t.startsWith(".");
            if (void 0 === r) {
                if (c)
                    for (const s of Object.keys(l)) I(e, l, s, t.slice(1));
                for (const [s, i] of Object.entries(d)) {
                    const n = s.replace(x, "");
                    o && !t.includes(n) || L(e, l, a, i.callable, i.delegationSelector)
                }
            } else {
                if (!Object.keys(d).length) return;
                L(e, l, a, r, n ? s : null)
            }
        },
        trigger(e, t, s) {
            if ("string" != typeof t || !e) return null;
            const i = f();
            let n = null,
                r = !0,
                a = !0,
                o = !1;
            t !== z(t) && i && (n = i.Event(t, s), i(e).trigger(n), r = !n.isPropagationStopped(), a = !n.isImmediatePropagationStopped(), o = n.isDefaultPrevented());
            const l = N(new Event(t, {
                bubbles: r,
                cancelable: !0
            }), s);
            return o && l.preventDefault(), a && e.dispatchEvent(l), l.defaultPrevented && n && n.preventDefault(), l
        }
    };

    function N(e, t = {}) {
        for (const [s, i] of Object.entries(t)) try {
            e[s] = i
        } catch (t) {
            Object.defineProperty(e, s, {
                configurable: !0,
                get: () => i
            })
        }
        return e
    }

    function j(e) {
        if ("true" === e) return !0;
        if ("false" === e) return !1;
        if (e === Number(e).toString()) return Number(e);
        if ("" === e || "null" === e) return null;
        if ("string" != typeof e) return e;
        try {
            return JSON.parse(decodeURIComponent(e))
        } catch (t) {
            return e
        }
    }

    function B(e) {
        return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
    }
    const H = {
        setDataAttribute(e, t, s) {
            e.setAttribute("data-bs-" + B(t), s)
        },
        removeDataAttribute(e, t) {
            e.removeAttribute("data-bs-" + B(t))
        },
        getDataAttributes(e) {
            if (!e) return {};
            const t = {},
                s = Object.keys(e.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"));
            for (const i of s) {
                let s = i.replace(/^bs/, "");
                s = s.charAt(0).toLowerCase() + s.slice(1, s.length), t[s] = j(e.dataset[i])
            }
            return t
        },
        getDataAttribute: (e, t) => j(e.getAttribute("data-bs-" + B(t)))
    };
    class W {
        static get Default() {
            return {}
        }
        static get DefaultType() {
            return {}
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        _getConfig(e) {
            return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
        }
        _configAfterMerge(e) {
            return e
        }
        _mergeConfigObj(e, t) {
            const s = o(t) ? H.getDataAttribute(t, "config") : {};
            return { ...this.constructor.Default,
                ..."object" == typeof s ? s : {},
                ...o(t) ? H.getDataAttributes(t) : {},
                ..."object" == typeof e ? e : {}
            }
        }
        _typeCheckConfig(e, t = this.constructor.DefaultType) {
            for (const [i, n] of Object.entries(t)) {
                const t = e[i],
                    r = o(t) ? "element" : null == (s = t) ? "" + s : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(n).test(r)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`)
            }
            var s
        }
    }
    class q extends W {
        constructor(e, t) {
            super(), (e = l(e)) && (this._element = e, this._config = this._getConfig(t), i.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            i.remove(this._element, this.constructor.DATA_KEY), D.off(this._element, this.constructor.EVENT_KEY);
            for (const e of Object.getOwnPropertyNames(this)) this[e] = null
        }
        _queueCallback(e, t, s = !0) {
            y(e, t, s)
        }
        _getConfig(e) {
            return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
        }
        static getInstance(e) {
            return i.get(l(e), this.DATA_KEY)
        }
        static getOrCreateInstance(e, t = {}) {
            return this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
        }
        static get VERSION() {
            return "5.3.0"
        }
        static get DATA_KEY() {
            return "bs." + this.NAME
        }
        static get EVENT_KEY() {
            return "." + this.DATA_KEY
        }
        static eventName(e) {
            return `${e}${this.EVENT_KEY}`
        }
    }
    const R = e => {
            let t = e.getAttribute("data-bs-target");
            if (!t || "#" === t) {
                let s = e.getAttribute("href");
                if (!s || !s.includes("#") && !s.startsWith(".")) return null;
                s.includes("#") && !s.startsWith("#") && (s = "#" + s.split("#")[1]), t = s && "#" !== s ? s.trim() : null
            }
            return r(t)
        },
        F = {
            find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
            findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
            children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
            parents(e, t) {
                const s = [];
                let i = e.parentNode.closest(t);
                for (; i;) s.push(i), i = i.parentNode.closest(t);
                return s
            },
            prev(e, t) {
                let s = e.previousElementSibling;
                for (; s;) {
                    if (s.matches(t)) return [s];
                    s = s.previousElementSibling
                }
                return []
            },
            next(e, t) {
                let s = e.nextElementSibling;
                for (; s;) {
                    if (s.matches(t)) return [s];
                    s = s.nextElementSibling
                }
                return []
            },
            focusableChildren(e) {
                const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => e + ':not([tabindex^="-"])').join(",");
                return this.find(t, e).filter(e => !c(e) && d(e))
            },
            getSelectorFromElement(e) {
                const t = R(e);
                return t && F.findOne(t) ? t : null
            },
            getElementFromSelector(e) {
                const t = R(e);
                return t ? F.findOne(t) : null
            },
            getMultipleElementsFromSelector(e) {
                const t = R(e);
                return t ? F.find(t) : []
            }
        },
        Y = (e, t = "hide") => {
            const s = "click.dismiss" + e.EVENT_KEY,
                i = e.NAME;
            D.on(document, s, `[data-bs-dismiss="${i}"]`, (function(s) {
                if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), c(this)) return;
                const n = F.getElementFromSelector(this) || this.closest("." + i);
                e.getOrCreateInstance(n)[t]()
            }))
        };
    class G extends q {
        static get NAME() {
            return "alert"
        }
        close() {
            if (D.trigger(this._element, "close.bs.alert").defaultPrevented) return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, e)
        }
        _destroyElement() {
            this._element.remove(), D.trigger(this._element, "closed.bs.alert"), this.dispose()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = G.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    Y(G, "close"), v(G);
    const X = '[data-bs-toggle="button"]';
    class V extends q {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = V.getOrCreateInstance(this);
                "toggle" === e && t[e]()
            }))
        }
    }
    D.on(document, "click.bs.button.data-api", X, e => {
        e.preventDefault();
        const t = e.target.closest(X);
        V.getOrCreateInstance(t).toggle()
    }), v(V);
    const U = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        },
        Q = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
    class K extends W {
        constructor(e, t) {
            super(), this._element = e, e && K.isSupported() && (this._config = this._getConfig(t), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
        }
        static get Default() {
            return U
        }
        static get DefaultType() {
            return Q
        }
        static get NAME() {
            return "swipe"
        }
        dispose() {
            D.off(this._element, ".bs.swipe")
        }
        _start(e) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX
        }
        _end(e) {
            this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), b(this._config.endCallback)
        }
        _move(e) {
            this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX
        }
        _handleSwipe() {
            const e = Math.abs(this._deltaX);
            if (e <= 40) return;
            const t = e / this._deltaX;
            this._deltaX = 0, t && b(t > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() {
            this._supportPointerEvents ? (D.on(this._element, "pointerdown.bs.swipe", e => this._start(e)), D.on(this._element, "pointerup.bs.swipe", e => this._end(e)), this._element.classList.add("pointer-event")) : (D.on(this._element, "touchstart.bs.swipe", e => this._start(e)), D.on(this._element, "touchmove.bs.swipe", e => this._move(e)), D.on(this._element, "touchend.bs.swipe", e => this._end(e)))
        }
        _eventIsPointerPenTouch(e) {
            return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
        }
    }
    const Z = "next",
        J = "prev",
        ee = "left",
        te = "right",
        se = "slid.bs.carousel",
        ie = "carousel",
        ne = "active",
        re = {
            ArrowLeft: te,
            ArrowRight: ee
        },
        ae = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        },
        oe = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
    class le extends q {
        constructor(e, t) {
            super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = F.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === ie && this.cycle()
        }
        static get Default() {
            return ae
        }
        static get DefaultType() {
            return oe
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(Z)
        }
        nextWhenVisible() {
            !document.hidden && d(this._element) && this.next()
        }
        prev() {
            this._slide(J)
        }
        pause() {
            this._isSliding && a(this._element), this._clearInterval()
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? D.one(this._element, se, () => this.cycle()) : this.cycle())
        }
        to(e) {
            const t = this._getItems();
            if (e > t.length - 1 || e < 0) return;
            if (this._isSliding) return void D.one(this._element, se, () => this.to(e));
            const s = this._getItemIndex(this._getActive());
            if (s === e) return;
            const i = e > s ? Z : J;
            this._slide(i, t[e])
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
        }
        _configAfterMerge(e) {
            return e.defaultInterval = e.interval, e
        }
        _addEventListeners() {
            this._config.keyboard && D.on(this._element, "keydown.bs.carousel", e => this._keydown(e)), "hover" === this._config.pause && (D.on(this._element, "mouseenter.bs.carousel", () => this.pause()), D.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())), this._config.touch && K.isSupported() && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            for (const e of F.find(".carousel-item img", this._element)) D.on(e, "dragstart.bs.carousel", e => e.preventDefault());
            const e = {
                leftCallback: () => this._slide(this._directionToOrder(ee)),
                rightCallback: () => this._slide(this._directionToOrder(te)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval))
                }
            };
            this._swipeHelper = new K(this._element, e)
        }
        _keydown(e) {
            if (/input|textarea/i.test(e.target.tagName)) return;
            const t = re[e.key];
            t && (e.preventDefault(), this._slide(this._directionToOrder(t)))
        }
        _getItemIndex(e) {
            return this._getItems().indexOf(e)
        }
        _setActiveIndicatorElement(e) {
            if (!this._indicatorsElement) return;
            const t = F.findOne(".active", this._indicatorsElement);
            t.classList.remove(ne), t.removeAttribute("aria-current");
            const s = F.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
            s && (s.classList.add(ne), s.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const e = this._activeElement || this._getActive();
            if (!e) return;
            const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            this._config.interval = t || this._config.defaultInterval
        }
        _slide(e, t = null) {
            if (this._isSliding) return;
            const s = this._getActive(),
                i = e === Z,
                n = t || w(this._getItems(), s, i, this._config.wrap);
            if (n === s) return;
            const r = this._getItemIndex(n),
                a = t => D.trigger(this._element, t, {
                    relatedTarget: n,
                    direction: this._orderToDirection(e),
                    from: this._getItemIndex(s),
                    to: r
                });
            if (a("slide.bs.carousel").defaultPrevented) return;
            if (!s || !n) return;
            const o = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(r), this._activeElement = n;
            const l = i ? "carousel-item-start" : "carousel-item-end",
                d = i ? "carousel-item-next" : "carousel-item-prev";
            n.classList.add(d), h(n), s.classList.add(l), n.classList.add(l), this._queueCallback(() => {
                n.classList.remove(l, d), n.classList.add(ne), s.classList.remove(ne, d, l), this._isSliding = !1, a(se)
            }, s, this._isAnimated()), o && this.cycle()
        }
        _isAnimated() {
            return this._element.classList.contains("slide")
        }
        _getActive() {
            return F.findOne(".active.carousel-item", this._element)
        }
        _getItems() {
            return F.find(".carousel-item", this._element)
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), this._interval = null)
        }
        _directionToOrder(e) {
            return g() ? e === ee ? J : Z : e === ee ? Z : J
        }
        _orderToDirection(e) {
            return g() ? e === J ? ee : te : e === J ? te : ee
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = le.getOrCreateInstance(this, e);
                if ("number" != typeof e) {
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                } else t.to(e)
            }))
        }
    }
    D.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", (function(e) {
        const t = F.getElementFromSelector(this);
        if (!t || !t.classList.contains(ie)) return;
        e.preventDefault();
        const s = le.getOrCreateInstance(t),
            i = this.getAttribute("data-bs-slide-to");
        return i ? (s.to(i), void s._maybeEnableCycle()) : "next" === H.getDataAttribute(this, "slide") ? (s.next(), void s._maybeEnableCycle()) : (s.prev(), void s._maybeEnableCycle())
    })), D.on(window, "load.bs.carousel.data-api", () => {
        const e = F.find('[data-bs-ride="carousel"]');
        for (const t of e) le.getOrCreateInstance(t)
    }), v(le);
    const de = "show",
        ce = "collapse",
        pe = "collapsing",
        ue = '[data-bs-toggle="collapse"]',
        he = {
            parent: null,
            toggle: !0
        },
        fe = {
            parent: "(null|element)",
            toggle: "boolean"
        };
    class me extends q {
        constructor(e, t) {
            super(e, t), this._isTransitioning = !1, this._triggerArray = [];
            const s = F.find(ue);
            for (const e of s) {
                const t = F.getSelectorFromElement(e),
                    s = F.find(t).filter(e => e === this._element);
                null !== t && s.length && this._triggerArray.push(e)
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }
        static get Default() {
            return he
        }
        static get DefaultType() {
            return fe
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let e = [];
            if (this._config.parent && (e = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => me.getOrCreateInstance(e, {
                    toggle: !1
                }))), e.length && e[0]._isTransitioning) return;
            if (D.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            for (const t of e) t.hide();
            const t = this._getDimension();
            this._element.classList.remove(ce), this._element.classList.add(pe), this._element.style[t] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const s = "scroll" + (t[0].toUpperCase() + t.slice(1));
            this._queueCallback(() => {
                this._isTransitioning = !1, this._element.classList.remove(pe), this._element.classList.add(ce, de), this._element.style[t] = "", D.trigger(this._element, "shown.bs.collapse")
            }, this._element, !0), this._element.style[t] = this._element[s] + "px"
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (D.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const e = this._getDimension();
            this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", h(this._element), this._element.classList.add(pe), this._element.classList.remove(ce, de);
            for (const e of this._triggerArray) {
                const t = F.getElementFromSelector(e);
                t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1)
            }
            this._isTransitioning = !0, this._element.style[e] = "", this._queueCallback(() => {
                this._isTransitioning = !1, this._element.classList.remove(pe), this._element.classList.add(ce), D.trigger(this._element, "hidden.bs.collapse")
            }, this._element, !0)
        }
        _isShown(e = this._element) {
            return e.classList.contains(de)
        }
        _configAfterMerge(e) {
            return e.toggle = Boolean(e.toggle), e.parent = l(e.parent), e
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const e = this._getFirstLevelChildren(ue);
            for (const t of e) {
                const e = F.getElementFromSelector(t);
                e && this._addAriaAndCollapsedClass([t], this._isShown(e))
            }
        }
        _getFirstLevelChildren(e) {
            const t = F.find(":scope .collapse .collapse", this._config.parent);
            return F.find(e, this._config.parent).filter(e => !t.includes(e))
        }
        _addAriaAndCollapsedClass(e, t) {
            if (e.length)
                for (const s of e) s.classList.toggle("collapsed", !t), s.setAttribute("aria-expanded", t)
        }
        static jQueryInterface(e) {
            const t = {};
            return "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1), this.each((function() {
                const s = me.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                    if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
                    s[e]()
                }
            }))
        }
    }
    D.on(document, "click.bs.collapse.data-api", ue, (function(e) {
        ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
        for (const e of F.getMultipleElementsFromSelector(this)) me.getOrCreateInstance(e, {
            toggle: !1
        }).toggle()
    })), v(me);
    const ge = "",
        ve = "ArrowUp",
        be = "ArrowDown",
        ye = "click.bs..data-api",
        we = "keydown.bs..data-api",
        _e = "show",
        Ee = '[data-bs-toggle=""]:not(.disabled):not(:disabled)',
        xe = ".-menu",
        Te = g() ? "top-end" : "top-start",
        Ce = g() ? "top-start" : "top-end",
        Se = g() ? "bottom-end" : "bottom-start",
        Me = g() ? "bottom-start" : "bottom-end",
        Pe = g() ? "left-start" : "right-start",
        ke = g() ? "right-start" : "left-start",
        $e = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        },
        Oe = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
    class Ae extends q {
        constructor(e, t) {
            super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = F.next(this._element, xe)[0] || F.prev(this._element, xe)[0] || F.findOne(xe, this._parent), this._inNavbar = this._detectNavbar()
        }
        static get Default() {
            return $e
        }
        static get DefaultType() {
            return Oe
        }
        static get NAME() {
            return ge
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (c(this._element) || this._isShown()) return;
            const e = {
                relatedTarget: this._element
            };
            if (!D.trigger(this._element, "show.bs.", e).defaultPrevented) {
                if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const e of [].concat(...document.body.children)) D.on(e, "mouseover", u);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(_e), this._element.classList.add(_e), D.trigger(this._element, "shown.bs.", e)
            }
        }
        hide() {
            if (c(this._element) || !this._isShown()) return;
            const e = {
                relatedTarget: this._element
            };
            this._completeHide(e)
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _completeHide(e) {
            if (!D.trigger(this._element, "hide.bs.", e).defaultPrevented) {
                if ("ontouchstart" in document.documentElement)
                    for (const e of [].concat(...document.body.children)) D.off(e, "mouseover", u);
                this._popper && this._popper.destroy(), this._menu.classList.remove(_e), this._element.classList.remove(_e), this._element.setAttribute("aria-expanded", "false"), H.removeDataAttribute(this._menu, "popper"), D.trigger(this._element, "hidden.bs.", e)
            }
        }
        _getConfig(e) {
            if ("object" == typeof(e = super._getConfig(e)).reference && !o(e.reference) && "function" != typeof e.reference.getBoundingClientRect) throw new TypeError(ge.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
            return e
        }
        _createPopper() {
            if (void 0 === t) throw new TypeError("Bootstrap's s require Popper (https://popper.js.org)");
            let e = this._element;
            "parent" === this._config.reference ? e = this._parent : o(this._config.reference) ? e = l(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
            const s = this._getPopperConfig();
            this._popper = t.createPopper(e, this._menu, s)
        }
        _isShown() {
            return this._menu.classList.contains(_e)
        }
        _getPlacement() {
            const e = this._parent;
            if (e.classList.contains("dropend")) return Pe;
            if (e.classList.contains("dropstart")) return ke;
            if (e.classList.contains("dropup-center")) return "top";
            if (e.classList.contains("-center")) return "bottom";
            const t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return e.classList.contains("dropup") ? t ? Ce : Te : t ? Me : Se
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: e
            } = this._config;
            return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
        }
        _getPopperConfig() {
            const e = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return (this._inNavbar || "static" === this._config.display) && (H.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), { ...e,
                ...b(this._config.popperConfig, [e])
            }
        }
        _selectMenuItem({
            key: e,
            target: t
        }) {
            const s = F.find(".-menu .-item:not(.disabled):not(:disabled)", this._menu).filter(e => d(e));
            s.length && w(s, t, e === be, !s.includes(t)).focus()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Ae.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
        static clearMenus(e) {
            if (2 === e.button || "keyup" === e.type && "Tab" !== e.key) return;
            const t = F.find('[data-bs-toggle=""]:not(.disabled):not(:disabled).show');
            for (const s of t) {
                const t = Ae.getInstance(s);
                if (!t || !1 === t._config.autoClose) continue;
                const i = e.composedPath(),
                    n = i.includes(t._menu);
                if (i.includes(t._element) || "inside" === t._config.autoClose && !n || "outside" === t._config.autoClose && n) continue;
                if (t._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName))) continue;
                const r = {
                    relatedTarget: t._element
                };
                "click" === e.type && (r.clickEvent = e), t._completeHide(r)
            }
        }
        static dataApiKeydownHandler(e) {
            const t = /input|textarea/i.test(e.target.tagName),
                s = "Escape" === e.key,
                i = [ve, be].includes(e.key);
            if (!i && !s) return;
            if (t && !s) return;
            e.preventDefault();
            const n = this.matches(Ee) ? this : F.prev(this, Ee)[0] || F.next(this, Ee)[0] || F.findOne(Ee, e.delegateTarget.parentNode),
                r = Ae.getOrCreateInstance(n);
            if (i) return e.stopPropagation(), r.show(), void r._selectMenuItem(e);
            r._isShown() && (e.stopPropagation(), r.hide(), n.focus())
        }
    }
    D.on(document, we, Ee, Ae.dataApiKeydownHandler), D.on(document, we, xe, Ae.dataApiKeydownHandler), D.on(document, ye, Ae.clearMenus), D.on(document, "keyup.bs..data-api", Ae.clearMenus), D.on(document, ye, Ee, (function(e) {
        e.preventDefault(), Ae.getOrCreateInstance(this).toggle()
    })), v(Ae);
    const Le = "mousedown.bs.backdrop",
        Ie = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        },
        ze = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
    class De extends W {
        constructor(e) {
            super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null
        }
        static get Default() {
            return Ie
        }
        static get DefaultType() {
            return ze
        }
        static get NAME() {
            return "backdrop"
        }
        show(e) {
            if (!this._config.isVisible) return void b(e);
            this._append();
            const t = this._getElement();
            this._config.isAnimated && h(t), t.classList.add("show"), this._emulateAnimation(() => {
                b(e)
            })
        }
        hide(e) {
            this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
                this.dispose(), b(e)
            })) : b(e)
        }
        dispose() {
            this._isAppended && (D.off(this._element, Le), this._element.remove(), this._isAppended = !1)
        }
        _getElement() {
            if (!this._element) {
                const e = document.createElement("div");
                e.className = this._config.className, this._config.isAnimated && e.classList.add("fade"), this._element = e
            }
            return this._element
        }
        _configAfterMerge(e) {
            return e.rootElement = l(e.rootElement), e
        }
        _append() {
            if (this._isAppended) return;
            const e = this._getElement();
            this._config.rootElement.append(e), D.on(e, Le, () => {
                b(this._config.clickCallback)
            }), this._isAppended = !0
        }
        _emulateAnimation(e) {
            y(e, this._getElement(), this._config.isAnimated)
        }
    }
    const Ne = ".bs.focustrap",
        je = "backward",
        Be = {
            autofocus: !0,
            trapElement: null
        },
        He = {
            autofocus: "boolean",
            trapElement: "element"
        };
    class We extends W {
        constructor(e) {
            super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null
        }
        static get Default() {
            return Be
        }
        static get DefaultType() {
            return He
        }
        static get NAME() {
            return "focustrap"
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(), D.off(document, Ne), D.on(document, "focusin.bs.focustrap", e => this._handleFocusin(e)), D.on(document, "keydown.tab.bs.focustrap", e => this._handleKeydown(e)), this._isActive = !0)
        }
        deactivate() {
            this._isActive && (this._isActive = !1, D.off(document, Ne))
        }
        _handleFocusin(e) {
            const {
                trapElement: t
            } = this._config;
            if (e.target === document || e.target === t || t.contains(e.target)) return;
            const s = F.focusableChildren(t);
            0 === s.length ? t.focus() : this._lastTabNavDirection === je ? s[s.length - 1].focus() : s[0].focus()
        }
        _handleKeydown(e) {
            "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? je : "forward")
        }
    }
    const qe = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        Re = ".sticky-top",
        Fe = "padding-right",
        Ye = "margin-right";
    class Ge {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const e = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - e)
        }
        hide() {
            const e = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, Fe, t => t + e), this._setElementAttributes(qe, Fe, t => t + e), this._setElementAttributes(Re, Ye, t => t - e)
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Fe), this._resetElementAttributes(qe, Fe), this._resetElementAttributes(Re, Ye)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(e, t, s) {
            const i = this.getWidth();
            this._applyManipulationCallback(e, e => {
                if (e !== this._element && window.innerWidth > e.clientWidth + i) return;
                this._saveInitialAttribute(e, t);
                const n = window.getComputedStyle(e).getPropertyValue(t);
                e.style.setProperty(t, s(Number.parseFloat(n)) + "px")
            })
        }
        _saveInitialAttribute(e, t) {
            const s = e.style.getPropertyValue(t);
            s && H.setDataAttribute(e, t, s)
        }
        _resetElementAttributes(e, t) {
            this._applyManipulationCallback(e, e => {
                const s = H.getDataAttribute(e, t);
                null !== s ? (H.removeDataAttribute(e, t), e.style.setProperty(t, s)) : e.style.removeProperty(t)
            })
        }
        _applyManipulationCallback(e, t) {
            if (o(e)) t(e);
            else
                for (const s of F.find(e, this._element)) t(s)
        }
    }
    const Xe = ".bs.modal",
        Ve = "hidden.bs.modal",
        Ue = "show.bs.modal",
        Qe = "modal-open",
        Ke = "modal-static",
        Ze = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        },
        Je = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
    class et extends q {
        constructor(e, t) {
            super(e, t), this._dialog = F.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Ge, this._addEventListeners()
        }
        static get Default() {
            return Ze
        }
        static get DefaultType() {
            return Je
        }
        static get NAME() {
            return "modal"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || this._isTransitioning || D.trigger(this._element, Ue, {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Qe), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)))
        }
        hide() {
            this._isShown && !this._isTransitioning && (D.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove("show"), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())))
        }
        dispose() {
            D.off(window, Xe), D.off(this._dialog, Xe), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new De({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _initializeFocusTrap() {
            return new We({
                trapElement: this._element
            })
        }
        _showElement(e) {
            document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
            const t = F.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0), h(this._element), this._element.classList.add("show"), this._queueCallback(() => {
                this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, D.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: e
                })
            }, this._dialog, this._isAnimated())
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.modal", e => {
                "Escape" === e.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
            }), D.on(window, "resize.bs.modal", () => {
                this._isShown && !this._isTransitioning && this._adjustDialog()
            }), D.on(this._element, "mousedown.dismiss.bs.modal", e => {
                D.one(this._element, "click.dismiss.bs.modal", t => {
                    this._element === e.target && this._element === t.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                })
            })
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
                document.body.classList.remove(Qe), this._resetAdjustments(), this._scrollBar.reset(), D.trigger(this._element, Ve)
            })
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (D.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._element.style.overflowY;
            "hidden" === t || this._element.classList.contains(Ke) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Ke), this._queueCallback(() => {
                this._element.classList.remove(Ke), this._queueCallback(() => {
                    this._element.style.overflowY = t
                }, this._dialog)
            }, this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._scrollBar.getWidth(),
                s = t > 0;
            if (s && !e) {
                const e = g() ? "paddingLeft" : "paddingRight";
                this._element.style[e] = t + "px"
            }
            if (!s && e) {
                const e = g() ? "paddingRight" : "paddingLeft";
                this._element.style[e] = t + "px"
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(e, t) {
            return this.each((function() {
                const s = et.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
                    s[e](t)
                }
            }))
        }
    }
    D.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(e) {
        const t = F.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), D.one(t, Ue, e => {
            e.defaultPrevented || D.one(t, Ve, () => {
                d(this) && this.focus()
            })
        });
        const s = F.findOne(".modal.show");
        s && et.getInstance(s).hide(), et.getOrCreateInstance(t).toggle(this)
    })), Y(et), v(et);
    const tt = "showing",
        st = ".offcanvas.show",
        it = "hidePrevented.bs.offcanvas",
        nt = "hidden.bs.offcanvas",
        rt = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        at = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class ot extends q {
        constructor(e, t) {
            super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
        }
        static get Default() {
            return rt
        }
        static get DefaultType() {
            return at
        }
        static get NAME() {
            return "offcanvas"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || D.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new Ge).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(tt), this._queueCallback(() => {
                this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add("show"), this._element.classList.remove(tt), D.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: e
                })
            }, this._element, !0))
        }
        hide() {
            this._isShown && (D.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add("hiding"), this._backdrop.hide(), this._queueCallback(() => {
                this._element.classList.remove("show", "hiding"), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new Ge).reset(), D.trigger(this._element, nt)
            }, this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        _initializeBackDrop() {
            const e = Boolean(this._config.backdrop);
            return new De({
                className: "offcanvas-backdrop",
                isVisible: e,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: e ? () => {
                    "static" !== this._config.backdrop ? this.hide() : D.trigger(this._element, it)
                } : null
            })
        }
        _initializeFocusTrap() {
            return new We({
                trapElement: this._element
            })
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.offcanvas", e => {
                "Escape" === e.key && (this._config.keyboard ? this.hide() : D.trigger(this._element, it))
            })
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = ot.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    D.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(e) {
        const t = F.getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), c(this)) return;
        D.one(t, nt, () => {
            d(this) && this.focus()
        });
        const s = F.findOne(st);
        s && s !== t && ot.getInstance(s).hide(), ot.getOrCreateInstance(t).toggle(this)
    })), D.on(window, "load.bs.offcanvas.data-api", () => {
        for (const e of F.find(st)) ot.getOrCreateInstance(e).show()
    }), D.on(window, "resize.bs.offcanvas", () => {
        for (const e of F.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(e).position && ot.getOrCreateInstance(e).hide()
    }), Y(ot), v(ot);
    const lt = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        dt = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        ct = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
        pt = (e, t) => {
            const s = e.nodeName.toLowerCase();
            return t.includes(s) ? !dt.has(s) || Boolean(ct.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(s))
        },
        ut = {
            allowList: lt,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        },
        ht = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        },
        ft = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
    class mt extends W {
        constructor(e) {
            super(), this._config = this._getConfig(e)
        }
        static get Default() {
            return ut
        }
        static get DefaultType() {
            return ht
        }
        static get NAME() {
            return "TemplateFactory"
        }
        getContent() {
            return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
        }
        hasContent() {
            return this.getContent().length > 0
        }
        changeContent(e) {
            return this._checkContent(e), this._config.content = { ...this._config.content,
                ...e
            }, this
        }
        toHtml() {
            const e = document.createElement("div");
            e.innerHTML = this._maybeSanitize(this._config.template);
            for (const [t, s] of Object.entries(this._config.content)) this._setContent(e, s, t);
            const t = e.children[0],
                s = this._resolvePossibleFunction(this._config.extraClass);
            return s && t.classList.add(...s.split(" ")), t
        }
        _typeCheckConfig(e) {
            super._typeCheckConfig(e), this._checkContent(e.content)
        }
        _checkContent(e) {
            for (const [t, s] of Object.entries(e)) super._typeCheckConfig({
                selector: t,
                entry: s
            }, ft)
        }
        _setContent(e, t, s) {
            const i = F.findOne(s, e);
            i && ((t = this._resolvePossibleFunction(t)) ? o(t) ? this._putElementInTemplate(l(t), i) : this._config.html ? i.innerHTML = this._maybeSanitize(t) : i.textContent = t : i.remove())
        }
        _maybeSanitize(e) {
            return this._config.sanitize ? function(e, t, s) {
                if (!e.length) return e;
                if (s && "function" == typeof s) return s(e);
                const i = (new window.DOMParser).parseFromString(e, "text/html"),
                    n = [].concat(...i.body.querySelectorAll("*"));
                for (const e of n) {
                    const s = e.nodeName.toLowerCase();
                    if (!Object.keys(t).includes(s)) {
                        e.remove();
                        continue
                    }
                    const i = [].concat(...e.attributes),
                        n = [].concat(t["*"] || [], t[s] || []);
                    for (const t of i) pt(t, n) || e.removeAttribute(t.nodeName)
                }
                return i.body.innerHTML
            }(e, this._config.allowList, this._config.sanitizeFn) : e
        }
        _resolvePossibleFunction(e) {
            return b(e, [this])
        }
        _putElementInTemplate(e, t) {
            if (this._config.html) return t.innerHTML = "", void t.append(e);
            t.textContent = e.textContent
        }
    }
    const gt = new Set(["sanitize", "allowList", "sanitizeFn"]),
        vt = "fade",
        bt = "show",
        yt = "hide.bs.modal",
        wt = "hover",
        _t = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: g() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: g() ? "right" : "left"
        },
        Et = {
            allowList: lt,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 6],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        },
        xt = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
    class Tt extends q {
        constructor(e, s) {
            if (void 0 === t) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(e, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
        }
        static get Default() {
            return Et
        }
        static get DefaultType() {
            return xt
        }
        static get NAME() {
            return "tooltip"
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle() {
            this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
        }
        dispose() {
            clearTimeout(this._timeout), D.off(this._element.closest(".modal"), yt, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const e = D.trigger(this._element, this.constructor.eventName("show")),
                t = (p(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (e.defaultPrevented || !t) return;
            this._disposePopper();
            const s = this._getTipElement();
            this._element.setAttribute("aria-describedby", s.getAttribute("id"));
            const {
                container: i
            } = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (i.append(s), D.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(s), s.classList.add(bt), "ontouchstart" in document.documentElement)
                for (const e of [].concat(...document.body.children)) D.on(e, "mouseover", u);
            this._queueCallback(() => {
                D.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
            }, this.tip, this._isAnimated())
        }
        hide() {
            if (this._isShown() && !D.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                if (this._getTipElement().classList.remove(bt), "ontouchstart" in document.documentElement)
                    for (const e of [].concat(...document.body.children)) D.off(e, "mouseover", u);
                this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this._isHovered = null, this._queueCallback(() => {
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), D.trigger(this._element, this.constructor.eventName("hidden")))
                }, this.tip, this._isAnimated())
            }
        }
        update() {
            this._popper && this._popper.update()
        }
        _isWithContent() {
            return Boolean(this._getTitle())
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
        }
        _createTipElement(e) {
            const t = this._getTemplateFactory(e).toHtml();
            if (!t) return null;
            t.classList.remove(vt, bt), t.classList.add(`bs-${this.constructor.NAME}-auto`);
            const s = (e => {
                do {
                    e += Math.floor(1e6 * Math.random())
                } while (document.getElementById(e));
                return e
            })(this.constructor.NAME).toString();
            return t.setAttribute("id", s), this._isAnimated() && t.classList.add(vt), t
        }
        setContent(e) {
            this._newContent = e, this._isShown() && (this._disposePopper(), this.show())
        }
        _getTemplateFactory(e) {
            return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new mt({ ...this._config,
                content: e,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            }), this._templateFactory
        }
        _getContentForTemplate() {
            return {
                ".tooltip-inner": this._getTitle()
            }
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
        }
        _initializeOnDelegatedTarget(e) {
            return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(vt)
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(bt)
        }
        _createPopper(e) {
            const s = b(this._config.placement, [this, e, this._element]),
                i = _t[s.toUpperCase()];
            return t.createPopper(this._element, e, this._getPopperConfig(i))
        }
        _getOffset() {
            const {
                offset: e
            } = this._config;
            return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
        }
        _resolvePossibleFunction(e) {
            return b(e, [this._element])
        }
        _getPopperConfig(e) {
            const t = {
                placement: e,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: e => {
                        this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
                    }
                }]
            };
            return { ...t,
                ...b(this._config.popperConfig, [t])
            }
        }
        _setListeners() {
            const e = this._config.trigger.split(" ");
            for (const t of e)
                if ("click" === t) D.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
                    this._initializeOnDelegatedTarget(e).toggle()
                });
                else if ("manual" !== t) {
                const e = t === wt ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                    s = t === wt ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                D.on(this._element, e, this._config.selector, e => {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger["focusin" === e.type ? "focus" : wt] = !0, t._enter()
                }), D.on(this._element, s, this._config.selector, e => {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger["focusout" === e.type ? "focus" : wt] = t._element.contains(e.relatedTarget), t._leave()
                })
            }
            this._hideModalHandler = () => {
                this._element && this.hide()
            }, D.on(this._element.closest(".modal"), yt, this._hideModalHandler)
        }
        _fixTitle() {
            const e = this._element.getAttribute("title");
            e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"))
        }
        _enter() {
            this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => {
                this._isHovered && this.show()
            }, this._config.delay.show))
        }
        _leave() {
            this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
                this._isHovered || this.hide()
            }, this._config.delay.hide))
        }
        _setTimeout(e, t) {
            clearTimeout(this._timeout), this._timeout = setTimeout(e, t)
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0)
        }
        _getConfig(e) {
            const t = H.getDataAttributes(this._element);
            for (const e of Object.keys(t)) gt.has(e) && delete t[e];
            return e = { ...t,
                ..."object" == typeof e && e ? e : {}
            }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
        }
        _configAfterMerge(e) {
            return e.container = !1 === e.container ? document.body : l(e.container), "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), e
        }
        _getDelegateConfig() {
            const e = {};
            for (const [t, s] of Object.entries(this._config)) this.constructor.Default[t] !== s && (e[t] = s);
            return e.selector = !1, e.trigger = "manual", e
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Tt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    v(Tt);
    const Ct = { ...Tt.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        },
        St = { ...Tt.DefaultType,
            content: "(null|string|element|function)"
        };
    class Mt extends Tt {
        static get Default() {
            return Ct
        }
        static get DefaultType() {
            return St
        }
        static get NAME() {
            return "popover"
        }
        _isWithContent() {
            return this._getTitle() || this._getContent()
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent()
            }
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Mt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    v(Mt);
    const Pt = "click.bs.scrollspy",
        kt = "active",
        $t = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        },
        Ot = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
    class At extends q {
        constructor(e, t) {
            super(e, t), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            }, this.refresh()
        }
        static get Default() {
            return $t
        }
        static get DefaultType() {
            return Ot
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
            for (const e of this._observableSections.values()) this._observer.observe(e)
        }
        dispose() {
            this._observer.disconnect(), super.dispose()
        }
        _configAfterMerge(e) {
            return e.target = l(e.target) || document.body, e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin, "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))), e
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && (D.off(this._config.target, Pt), D.on(this._config.target, Pt, "[href]", e => {
                const t = this._observableSections.get(e.target.hash);
                if (t) {
                    e.preventDefault();
                    const s = this._rootElement || window,
                        i = t.offsetTop - this._element.offsetTop;
                    if (s.scrollTo) return void s.scrollTo({
                        top: i,
                        behavior: "smooth"
                    });
                    s.scrollTop = i
                }
            }))
        }
        _getNewObserver() {
            const e = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver(e => this._observerCallback(e), e)
        }
        _observerCallback(e) {
            const t = e => this._targetLinks.get("#" + e.target.id),
                s = e => {
                    this._previousScrollData.visibleEntryTop = e.target.offsetTop, this._process(t(e))
                },
                i = (this._rootElement || document.documentElement).scrollTop,
                n = i >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = i;
            for (const r of e) {
                if (!r.isIntersecting) {
                    this._activeTarget = null, this._clearActiveClass(t(r));
                    continue
                }
                const e = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (n && e) {
                    if (s(r), !i) return
                } else n || e || s(r)
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map, this._observableSections = new Map;
            const e = F.find("[href]", this._config.target);
            for (const t of e) {
                if (!t.hash || c(t)) continue;
                const e = F.findOne(decodeURI(t.hash), this._element);
                d(e) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e))
            }
        }
        _process(e) {
            this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(kt), this._activateParents(e), D.trigger(this._element, "activate.bs.scrollspy", {
                relatedTarget: e
            }))
        }
        _activateParents(e) {
            if (e.classList.contains("-item")) F.findOne(".-toggle", e.closest(".")).classList.add(kt);
            else
                for (const t of F.parents(e, ".nav, .list-group"))
                    for (const e of F.prev(t, ".nav-link, .nav-item > .nav-link, .list-group-item")) e.classList.add(kt)
        }
        _clearActiveClass(e) {
            e.classList.remove(kt);
            const t = F.find("[href].active", e);
            for (const e of t) e.classList.remove(kt)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = At.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    D.on(window, "load.bs.scrollspy.data-api", () => {
        for (const e of F.find('[data-bs-spy="scroll"]')) At.getOrCreateInstance(e)
    }), v(At);
    const Lt = "ArrowLeft",
        It = "ArrowRight",
        zt = "ArrowUp",
        Dt = "ArrowDown",
        Nt = "active",
        jt = "show",
        Bt = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        Ht = '.nav-link:not(.-toggle), .list-group-item:not(.-toggle), [role="tab"]:not(.-toggle), ' + Bt;
    class Wt extends q {
        constructor(e) {
            super(e), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), D.on(this._element, "keydown.bs.tab", e => this._keydown(e)))
        }
        static get NAME() {
            return "tab"
        }
        show() {
            const e = this._element;
            if (this._elemIsActive(e)) return;
            const t = this._getActiveElem(),
                s = t ? D.trigger(t, "hide.bs.tab", {
                    relatedTarget: e
                }) : null;
            D.trigger(e, "show.bs.tab", {
                relatedTarget: t
            }).defaultPrevented || s && s.defaultPrevented || (this._deactivate(t, e), this._activate(e, t))
        }
        _activate(e, t) {
            e && (e.classList.add(Nt), this._activate(F.getElementFromSelector(e)), this._queueCallback(() => {
                "tab" === e.getAttribute("role") ? (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), D.trigger(e, "shown.bs.tab", {
                    relatedTarget: t
                })) : e.classList.add(jt)
            }, e, e.classList.contains("fade")))
        }
        _deactivate(e, t) {
            e && (e.classList.remove(Nt), e.blur(), this._deactivate(F.getElementFromSelector(e)), this._queueCallback(() => {
                "tab" === e.getAttribute("role") ? (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), D.trigger(e, "hidden.bs.tab", {
                    relatedTarget: t
                })) : e.classList.remove(jt)
            }, e, e.classList.contains("fade")))
        }
        _keydown(e) {
            if (![Lt, It, zt, Dt].includes(e.key)) return;
            e.stopPropagation(), e.preventDefault();
            const t = [It, Dt].includes(e.key),
                s = w(this._getChildren().filter(e => !c(e)), e.target, t, !0);
            s && (s.focus({
                preventScroll: !0
            }), Wt.getOrCreateInstance(s).show())
        }
        _getChildren() {
            return F.find(Ht, this._parent)
        }
        _getActiveElem() {
            return this._getChildren().find(e => this._elemIsActive(e)) || null
        }
        _setInitialAttributes(e, t) {
            this._setAttributeIfNotExists(e, "role", "tablist");
            for (const e of t) this._setInitialAttributesOnChild(e)
        }
        _setInitialAttributesOnChild(e) {
            e = this._getInnerElement(e);
            const t = this._elemIsActive(e),
                s = this._getOuterElement(e);
            e.setAttribute("aria-selected", t), s !== e && this._setAttributeIfNotExists(s, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e)
        }
        _setInitialAttributesOnTargetPanel(e) {
            const t = F.getElementFromSelector(e);
            t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", "" + e.id))
        }
        _toggleDropDown(e, t) {
            const s = this._getOuterElement(e);
            if (!s.classList.contains("")) return;
            const i = (e, i) => {
                const n = F.findOne(e, s);
                n && n.classList.toggle(i, t)
            };
            i(".-toggle", Nt), i(".-menu", jt), s.setAttribute("aria-expanded", t)
        }
        _setAttributeIfNotExists(e, t, s) {
            e.hasAttribute(t) || e.setAttribute(t, s)
        }
        _elemIsActive(e) {
            return e.classList.contains(Nt)
        }
        _getInnerElement(e) {
            return e.matches(Ht) ? e : F.findOne(Ht, e)
        }
        _getOuterElement(e) {
            return e.closest(".nav-item, .list-group-item") || e
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Wt.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    D.on(document, "click.bs.tab", Bt, (function(e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), c(this) || Wt.getOrCreateInstance(this).show()
    })), D.on(window, "load.bs.tab", () => {
        for (const e of F.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) Wt.getOrCreateInstance(e)
    }), v(Wt);
    const qt = "show",
        Rt = "showing",
        Ft = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Yt = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class Gt extends q {
        constructor(e, t) {
            super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get Default() {
            return Yt
        }
        static get DefaultType() {
            return Ft
        }
        static get NAME() {
            return "toast"
        }
        show() {
            D.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), h(this._element), this._element.classList.add(qt, Rt), this._queueCallback(() => {
                this._element.classList.remove(Rt), D.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }, this._element, this._config.animation))
        }
        hide() {
            this.isShown() && (D.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(Rt), this._queueCallback(() => {
                this._element.classList.add("hide"), this._element.classList.remove(Rt, qt), D.trigger(this._element, "hidden.bs.toast")
            }, this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(qt), super.dispose()
        }
        isShown() {
            return this._element.classList.contains(qt)
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
                this.hide()
            }, this._config.delay)))
        }
        _onInteraction(e, t) {
            switch (e.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = t;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = t
            }
            if (t) return void this._clearTimeout();
            const s = e.relatedTarget;
            this._element === s || this._element.contains(s) || this._maybeScheduleHide()
        }
        _setListeners() {
            D.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)), D.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)), D.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)), D.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Gt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    return Y(Gt), v(Gt), {
        Alert: G,
        Button: V,
        Carousel: le,
        Collapse: me,
        Modal: et,
        Offcanvas: ot,
        Popover: Mt,
        ScrollSpy: At,
        Tab: Wt,
        Toast: Gt,
        Tooltip: Tt
    }
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
    "use strict";

    function e(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function t(s, i) {
        void 0 === s && (s = {}), void 0 === i && (i = {}), Object.keys(i).forEach(n => {
            void 0 === s[n] ? s[n] = i[n] : e(i[n]) && e(s[n]) && Object.keys(i[n]).length > 0 && t(s[n], i[n])
        })
    }
    const s = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({
            initEvent() {}
        }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => []
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };

    function i() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, s), e
    }
    const n = {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({
            getPropertyValue: () => ""
        }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };

    function r() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, n), e
    }
    class a extends Array {
        constructor(e) {
            "number" == typeof e ? super(e) : (super(...e || []), function(e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                    get: () => t,
                    set(e) {
                        t.__proto__ = e
                    }
                })
            }(this))
        }
    }

    function o(e) {
        void 0 === e && (e = []);
        const t = [];
        return e.forEach(e => {
            Array.isArray(e) ? t.push(...o(e)) : t.push(e)
        }), t
    }

    function l(e, t) {
        return Array.prototype.filter.call(e, t)
    }

    function d(e, t) {
        const s = r(),
            n = i();
        let o = [];
        if (!t && e instanceof a) return e;
        if (!e) return new a(o);
        if ("string" == typeof e) {
            const s = e.trim();
            if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                let e = "div";
                0 === s.indexOf("<li") && (e = "ul"), 0 === s.indexOf("<tr") && (e = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (e = "tr"), 0 === s.indexOf("<tbody") && (e = "table"), 0 === s.indexOf("<option") && (e = "select");
                const t = n.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1) o.push(t.childNodes[e])
            } else o = function(e, t) {
                if ("string" != typeof e) return [e];
                const s = [],
                    i = t.querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                return s
            }(e.trim(), t || n)
        } else if (e.nodeType || e === s || e === n) o.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof a) return e;
            o = e
        }
        return new a(function(e) {
            const t = [];
            for (let s = 0; s < e.length; s += 1) - 1 === t.indexOf(e[s]) && t.push(e[s]);
            return t
        }(o))
    }
    d.fn = a.prototype;
    const c = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            const i = o(t.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.add(...i)
            }), this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            const i = o(t.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.remove(...i)
            }), this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            const i = o(t.map(e => e.split(" ")));
            return l(this, e => i.filter(t => e.classList.contains(t)).length > 0).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            const i = o(t.map(e => e.split(" ")));
            this.forEach(e => {
                i.forEach(t => {
                    e.classList.toggle(t)
                })
            })
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
                if (2 === arguments.length) this[s].setAttribute(e, t);
                else
                    for (const t in e) this[s][t] = e[t], this[s].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function(e) {
            for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            let [i, n, r, a] = t;

            function o(e) {
                const t = e.target;
                if (!t) return;
                const s = e.target.dom7EventData || [];
                if (s.indexOf(e) < 0 && s.unshift(e), d(t).is(n)) r.apply(t, s);
                else {
                    const e = d(t).parents();
                    for (let t = 0; t < e.length; t += 1) d(e[t]).is(n) && r.apply(e[t], s)
                }
            }

            function l(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }
            "function" == typeof t[1] && ([i, r, a] = t, n = void 0), a || (a = !1);
            const c = i.split(" ");
            let p;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (n)
                    for (p = 0; p < c.length; p += 1) {
                        const e = c[p];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({
                            listener: r,
                            proxyListener: o
                        }), t.addEventListener(e, o, a)
                    } else
                        for (p = 0; p < c.length; p += 1) {
                            const e = c[p];
                            t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({
                                listener: r,
                                proxyListener: l
                            }), t.addEventListener(e, l, a)
                        }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            let [i, n, r, a] = t;
            "function" == typeof t[1] && ([i, r, a] = t, n = void 0), a || (a = !1);
            const o = i.split(" ");
            for (let e = 0; e < o.length; e += 1) {
                const t = o[e];
                for (let e = 0; e < this.length; e += 1) {
                    const s = this[e];
                    let i;
                    if (!n && s.dom7Listeners ? i = s.dom7Listeners[t] : n && s.dom7LiveListeners && (i = s.dom7LiveListeners[t]), i && i.length)
                        for (let e = i.length - 1; e >= 0; e -= 1) {
                            const n = i[e];
                            r && n.listener === r || r && n.listener && n.listener.dom7proxy && n.listener.dom7proxy === r ? (s.removeEventListener(t, n.proxyListener, a), i.splice(e, 1)) : r || (s.removeEventListener(t, n.proxyListener, a), i.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function() {
            const e = r();
            for (var t = arguments.length, s = new Array(t), i = 0; i < t; i++) s[i] = arguments[i];
            const n = s[0].split(" "),
                a = s[1];
            for (let t = 0; t < n.length; t += 1) {
                const i = n[t];
                for (let t = 0; t < this.length; t += 1) {
                    const n = this[t];
                    if (e.CustomEvent) {
                        const t = new e.CustomEvent(i, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        });
                        n.dom7EventData = s.filter((e, t) => t > 0), n.dispatchEvent(t), n.dom7EventData = [], delete n.dom7EventData
                    }
                }
            }
            return this
        },
        transitionEnd: function(e) {
            const t = this;
            return e && t.on("transitionend", (function s(i) {
                i.target === this && (e.call(this, i), t.off("transitionend", s))
            })), this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            const e = r();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                const e = r(),
                    t = i(),
                    s = this[0],
                    n = s.getBoundingClientRect(),
                    a = t.body,
                    o = s.clientTop || a.clientTop || 0,
                    l = s.clientLeft || a.clientLeft || 0,
                    d = s === e ? e.scrollY : s.scrollTop,
                    c = s === e ? e.scrollX : s.scrollLeft;
                return {
                    top: n.top + d - o,
                    left: n.left + c - l
                }
            }
            return null
        },
        css: function(e, t) {
            const s = r();
            let i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (const t in e) this[i].style[t] = e[t];
                    return this
                }
                if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach((t, s) => {
                e.apply(t, [t, s])
            }), this) : this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            const t = r(),
                s = i(),
                n = this[0];
            let o, l;
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (o = d(e), l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1
            }
            if (e === s) return n === s;
            if (e === t) return n === t;
            if (e.nodeType || e instanceof a) {
                for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            let e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            const t = this.length;
            if (e > t - 1) return d([]);
            if (e < 0) {
                const s = t + e;
                return d(s < 0 ? [] : [this[s]])
            }
            return d([this[e]])
        },
        append: function() {
            let e;
            const t = i();
            for (let s = 0; s < arguments.length; s += 1) {
                e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
                for (let s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        const i = t.createElement("div");
                        for (i.innerHTML = e; i.firstChild;) this[s].appendChild(i.firstChild)
                    } else if (e instanceof a)
                    for (let t = 0; t < e.length; t += 1) this[s].appendChild(e[t]);
                else this[s].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            const t = i();
            let s, n;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof e) {
                    const i = t.createElement("div");
                    for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1) this[s].insertBefore(i.childNodes[n], this[s].childNodes[0])
                } else if (e instanceof a)
                for (n = 0; n < e.length; n += 1) this[s].insertBefore(e[n], this[s].childNodes[0]);
            else this[s].insertBefore(e, this[s].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e) ? d([this[0].nextElementSibling]) : d([]) : this[0].nextElementSibling ? d([this[0].nextElementSibling]) : d([]) : d([])
        },
        nextAll: function(e) {
            const t = [];
            let s = this[0];
            if (!s) return d([]);
            for (; s.nextElementSibling;) {
                const i = s.nextElementSibling;
                e ? d(i).is(e) && t.push(i) : t.push(i), s = i
            }
            return d(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? t.previousElementSibling && d(t.previousElementSibling).is(e) ? d([t.previousElementSibling]) : d([]) : t.previousElementSibling ? d([t.previousElementSibling]) : d([])
            }
            return d([])
        },
        prevAll: function(e) {
            const t = [];
            let s = this[0];
            if (!s) return d([]);
            for (; s.previousElementSibling;) {
                const i = s.previousElementSibling;
                e ? d(i).is(e) && t.push(i) : t.push(i), s = i
            }
            return d(t)
        },
        parent: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (e ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
            return d(t)
        },
        parents: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                let i = this[s].parentNode;
                for (; i;) e ? d(i).is(e) && t.push(i) : t.push(i), i = i.parentNode
            }
            return d(t)
        },
        closest: function(e) {
            let t = this;
            return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const i = this[s].querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1) t.push(i[e])
            }
            return d(t)
        },
        children: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const i = this[s].children;
                for (let s = 0; s < i.length; s += 1) e && !d(i[s]).is(e) || t.push(i[s])
            }
            return d(t)
        },
        filter: function(e) {
            return d(l(this, e))
        },
        remove: function() {
            for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };

    function p(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
    }

    function u() {
        return Date.now()
    }

    function h(e, t) {
        void 0 === t && (t = "x");
        const s = r();
        let i, n, a;
        const o = function(e) {
            const t = r();
            let s;
            return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
        }(e);
        return s.WebKitCSSMatrix ? (n = o.transform || o.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(e => e.replace(",", ".")).join(", ")), a = new s.WebKitCSSMatrix("none" === n ? "" : n)) : (a = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = a.toString().split(",")), "x" === t && (n = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0
    }

    function f(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }

    function m(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
    }

    function g() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
            const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
            if (null != i && !m(i)) {
                const s = Object.keys(Object(i)).filter(e => t.indexOf(e) < 0);
                for (let t = 0, n = s.length; t < n; t += 1) {
                    const n = s[t],
                        r = Object.getOwnPropertyDescriptor(i, n);
                    void 0 !== r && r.enumerable && (f(e[n]) && f(i[n]) ? i[n].__swiper__ ? e[n] = i[n] : g(e[n], i[n]) : !f(e[n]) && f(i[n]) ? (e[n] = {}, i[n].__swiper__ ? e[n] = i[n] : g(e[n], i[n])) : e[n] = i[n])
                }
            }
        }
        return e
    }

    function v(e, t, s) {
        e.style.setProperty(t, s)
    }

    function b(e) {
        let {
            swiper: t,
            targetPosition: s,
            side: i
        } = e;
        const n = r(),
            a = -t.translate;
        let o, l = null;
        const d = t.params.speed;
        t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
        const c = s > a ? "next" : "prev",
            p = (e, t) => "next" === c && e >= t || "prev" === c && e <= t,
            u = () => {
                o = (new Date).getTime(), null === l && (l = o);
                const e = Math.max(Math.min((o - l) / d, 1), 0),
                    r = .5 - Math.cos(e * Math.PI) / 2;
                let c = a + r * (s - a);
                if (p(c, s) && (c = s), t.wrapperEl.scrollTo({
                        [i]: c
                    }), p(c, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
                        [i]: c
                    })
                }), void n.cancelAnimationFrame(t.cssModeFrameID);
                t.cssModeFrameID = n.requestAnimationFrame(u)
            };
        u()
    }
    let y, w, _;

    function E() {
        return y || (y = function() {
            const e = r(),
                t = i();
            return {
                smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                passiveListener: function() {
                    let t = !1;
                    try {
                        const s = Object.defineProperty({}, "passive", {
                            get() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, s)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart" in e
            }
        }()), y
    }

    function x(e) {
        return void 0 === e && (e = {}), w || (w = function(e) {
            let {
                userAgent: t
            } = void 0 === e ? {} : e;
            const s = E(),
                i = r(),
                n = i.navigator.platform,
                a = t || i.navigator.userAgent,
                o = {
                    ios: !1,
                    android: !1
                },
                l = i.screen.width,
                d = i.screen.height,
                c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
            let p = a.match(/(iPad).*OS\s([\d_]+)/);
            const u = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                h = !p && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                f = "Win32" === n;
            let m = "MacIntel" === n;
            return !p && m && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${d}`) >= 0 && (p = a.match(/(Version)\/([\d.]+)/), p || (p = [0, 1, "13_0_0"]), m = !1), c && !f && (o.os = "android", o.android = !0), (p || h || u) && (o.os = "ios", o.ios = !0), o
        }(e)), w
    }

    function T() {
        return _ || (_ = function() {
            const e = r();
            return {
                isSafari: function() {
                    const t = e.navigator.userAgent.toLowerCase();
                    return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                }(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            }
        }()), _
    }

    function C(e) {
        let {
            swiper: t,
            runCallbacks: s,
            direction: i,
            step: n
        } = e;
        const {
            activeIndex: r,
            previousIndex: a
        } = t;
        let o = i;
        if (o || (o = r > a ? "next" : r < a ? "prev" : "reset"), t.emit("transition" + n), s && r !== a) {
            if ("reset" === o) return void t.emit("slideResetTransition" + n);
            t.emit("slideChangeTransition" + n), "next" === o ? t.emit("slideNextTransition" + n) : t.emit("slidePrevTransition" + n)
        }
    }

    function S(e) {
        const t = this,
            s = i(),
            n = r(),
            a = t.touchEventsData,
            {
                params: o,
                touches: l,
                enabled: c
            } = t;
        if (!c) return;
        if (t.animating && o.preventInteractionOnTransition) return;
        !t.animating && o.cssMode && o.loop && t.loopFix();
        let p = e;
        p.originalEvent && (p = p.originalEvent);
        let h = d(p.target);
        if ("wrapper" === o.touchEventsTarget && !h.closest(t.wrapperEl).length) return;
        if (a.isTouchEvent = "touchstart" === p.type, !a.isTouchEvent && "which" in p && 3 === p.which) return;
        if (!a.isTouchEvent && "button" in p && p.button > 0) return;
        if (a.isTouched && a.isMoved) return;
        const f = !!o.noSwipingClass && "" !== o.noSwipingClass,
            m = e.composedPath ? e.composedPath() : e.path;
        f && p.target && p.target.shadowRoot && m && (h = d(m[0]));
        const g = o.noSwipingSelector ? o.noSwipingSelector : "." + o.noSwipingClass,
            v = !(!p.target || !p.target.shadowRoot);
        if (o.noSwiping && (v ? function(e, t) {
                return void 0 === t && (t = this),
                    function t(s) {
                        if (!s || s === i() || s === r()) return null;
                        s.assignedSlot && (s = s.assignedSlot);
                        const n = s.closest(e);
                        return n || s.getRootNode ? n || t(s.getRootNode().host) : null
                    }(t)
            }(g, h[0]) : h.closest(g)[0])) return void(t.allowClick = !0);
        if (o.swipeHandler && !h.closest(o.swipeHandler)[0]) return;
        l.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX, l.currentY = "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY;
        const b = l.currentX,
            y = l.currentY,
            w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
            _ = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
        if (w && (b <= _ || b >= n.innerWidth - _)) {
            if ("prevent" !== w) return;
            e.preventDefault()
        }
        if (Object.assign(a, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0
            }), l.startX = b, l.startY = y, a.touchStartTime = u(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, o.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== p.type) {
            let e = !0;
            h.is(a.focusableElements) && (e = !1, "SELECT" === h[0].nodeName && (a.isTouched = !1)), s.activeElement && d(s.activeElement).is(a.focusableElements) && s.activeElement !== h[0] && s.activeElement.blur();
            const i = e && t.allowTouchMove && o.touchStartPreventDefault;
            !o.touchStartForcePreventDefault && !i || h[0].isContentEditable || p.preventDefault()
        }
        t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", p)
    }

    function M(e) {
        const t = i(),
            s = this,
            n = s.touchEventsData,
            {
                params: r,
                touches: a,
                rtlTranslate: o,
                enabled: l
            } = s;
        if (!l) return;
        let c = e;
        if (c.originalEvent && (c = c.originalEvent), !n.isTouched) return void(n.startMoving && n.isScrolling && s.emit("touchMoveOpposite", c));
        if (n.isTouchEvent && "touchmove" !== c.type) return;
        const p = "touchmove" === c.type && c.targetTouches && (c.targetTouches[0] || c.changedTouches[0]),
            h = "touchmove" === c.type ? p.pageX : c.pageX,
            f = "touchmove" === c.type ? p.pageY : c.pageY;
        if (c.preventedByNestedSwiper) return a.startX = h, void(a.startY = f);
        if (!s.allowTouchMove) return d(c.target).is(n.focusableElements) || (s.allowClick = !1), void(n.isTouched && (Object.assign(a, {
            startX: h,
            startY: f,
            currentX: h,
            currentY: f
        }), n.touchStartTime = u()));
        if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
            if (s.isVertical()) {
                if (f < a.startY && s.translate <= s.maxTranslate() || f > a.startY && s.translate >= s.minTranslate()) return n.isTouched = !1, void(n.isMoved = !1)
            } else if (h < a.startX && s.translate <= s.maxTranslate() || h > a.startX && s.translate >= s.minTranslate()) return;
        if (n.isTouchEvent && t.activeElement && c.target === t.activeElement && d(c.target).is(n.focusableElements)) return n.isMoved = !0, void(s.allowClick = !1);
        if (n.allowTouchCallbacks && s.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1) return;
        a.currentX = h, a.currentY = f;
        const m = a.currentX - a.startX,
            g = a.currentY - a.startY;
        if (s.params.threshold && Math.sqrt(m ** 2 + g ** 2) < s.params.threshold) return;
        if (void 0 === n.isScrolling) {
            let e;
            s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? n.isScrolling = !1 : m * m + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(m)) / Math.PI, n.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
        }
        if (n.isScrolling && s.emit("touchMoveOpposite", c), void 0 === n.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (n.startMoving = !0)), n.isScrolling) return void(n.isTouched = !1);
        if (!n.startMoving) return;
        s.allowClick = !1, !r.cssMode && c.cancelable && c.preventDefault(), r.touchMoveStopPropagation && !r.nested && c.stopPropagation(), n.isMoved || (r.loop && !r.cssMode && s.loopFix(), n.startTranslate = s.getTranslate(), s.setTransition(0), s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"), n.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", c)), s.emit("sliderMove", c), n.isMoved = !0;
        let v = s.isHorizontal() ? m : g;
        a.diff = v, v *= r.touchRatio, o && (v = -v), s.swipeDirection = v > 0 ? "prev" : "next", n.currentTranslate = v + n.startTranslate;
        let b = !0,
            y = r.resistanceRatio;
        if (r.touchReleaseOnEdges && (y = 0), v > 0 && n.currentTranslate > s.minTranslate() ? (b = !1, r.resistance && (n.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + n.startTranslate + v) ** y)) : v < 0 && n.currentTranslate < s.maxTranslate() && (b = !1, r.resistance && (n.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - n.startTranslate - v) ** y)), b && (c.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), s.allowSlidePrev || s.allowSlideNext || (n.currentTranslate = n.startTranslate), r.threshold > 0) {
            if (!(Math.abs(v) > r.threshold || n.allowThresholdMove)) return void(n.currentTranslate = n.startTranslate);
            if (!n.allowThresholdMove) return n.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, n.currentTranslate = n.startTranslate, void(a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
        }
        r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(n.currentTranslate), s.setTranslate(n.currentTranslate))
    }

    function P(e) {
        const t = this,
            s = t.touchEventsData,
            {
                params: i,
                touches: n,
                rtlTranslate: r,
                slidesGrid: a,
                enabled: o
            } = t;
        if (!o) return;
        let l = e;
        if (l.originalEvent && (l = l.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", l), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && i.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
        i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const d = u(),
            c = d - s.touchStartTime;
        if (t.allowClick) {
            const e = l.path || l.composedPath && l.composedPath();
            t.updateClickedSlide(e && e[0] || l.target), t.emit("tap click", l), c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)
        }
        if (s.lastClickTime = u(), p(() => {
                t.destroyed || (t.allowClick = !0)
            }), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
        let h;
        if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = i.followFinger ? r ? t.translate : -t.translate : -s.currentTranslate, i.cssMode) return;
        if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({
            currentPos: h
        });
        let f = 0,
            m = t.slidesSizesGrid[0];
        for (let e = 0; e < a.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
            const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== a[e + t] ? h >= a[e] && h < a[e + t] && (f = e, m = a[e + t] - a[e]) : h >= a[e] && (f = e, m = a[a.length - 1] - a[a.length - 2])
        }
        let g = null,
            v = null;
        i.rewind && (t.isBeginning ? v = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
        const b = (h - a[f]) / m,
            y = f < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (c > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (b >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? g : f + y) : t.slideTo(f)), "prev" === t.swipeDirection && (b > 1 - i.longSwipesRatio ? t.slideTo(f + y) : null !== v && b < 0 && Math.abs(b) > i.longSwipesRatio ? t.slideTo(v) : t.slideTo(f))
        } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            !t.navigation || l.target !== t.navigation.nextEl && l.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + y), "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f)) : l.target === t.navigation.nextEl ? t.slideTo(f + y) : t.slideTo(f)
        }
    }

    function k() {
        const e = this,
            {
                params: t,
                el: s
            } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const {
            allowSlideNext: i,
            allowSlidePrev: n,
            snapGrid: r
        } = e;
        e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = n, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }

    function $(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
    }

    function O() {
        const e = this,
            {
                wrapperEl: t,
                rtlTranslate: s,
                enabled: i
            } = e;
        if (!i) return;
        let n;
        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, n !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
    }
    Object.keys(c).forEach(e => {
        Object.defineProperty(d.fn, e, {
            value: c[e],
            writable: !0
        })
    });
    let A = !1;

    function L() {}
    const I = (e, t) => {
        const s = i(),
            {
                params: n,
                touchEvents: r,
                el: a,
                wrapperEl: o,
                device: l,
                support: d
            } = e,
            c = !!n.nested,
            p = "on" === t ? "addEventListener" : "removeEventListener",
            u = t;
        if (d.touch) {
            const t = !("touchstart" !== r.start || !d.passiveListener || !n.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            a[p](r.start, e.onTouchStart, t), a[p](r.move, e.onTouchMove, d.passiveListener ? {
                passive: !1,
                capture: c
            } : c), a[p](r.end, e.onTouchEnd, t), r.cancel && a[p](r.cancel, e.onTouchEnd, t)
        } else a[p](r.start, e.onTouchStart, !1), s[p](r.move, e.onTouchMove, c), s[p](r.end, e.onTouchEnd, !1);
        (n.preventClicks || n.preventClicksPropagation) && a[p]("click", e.onClick, !0), n.cssMode && o[p]("scroll", e.onScroll), n.updateOnWindowResize ? e[u](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", k, !0) : e[u]("observerUpdate", k, !0)
    };
    const z = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var D = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: !0,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };

    function N(e, t) {
        return function(s) {
            void 0 === s && (s = {});
            const i = Object.keys(s)[0],
                n = s[i];
            "object" == typeof n && null !== n ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = {
                auto: !0
            }), i in e && "enabled" in n ? (!0 === e[i] && (e[i] = {
                enabled: !0
            }), "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {
                enabled: !1
            }), g(t, s)) : g(t, s)) : g(t, s)
        }
    }
    const j = {
            eventsEmitter: {
                on(e, t, s) {
                    const i = this;
                    if (!i.eventsListeners || i.destroyed) return i;
                    if ("function" != typeof t) return i;
                    const n = s ? "unshift" : "push";
                    return e.split(" ").forEach(e => {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t)
                    }), i
                },
                once(e, t, s) {
                    const i = this;
                    if (!i.eventsListeners || i.destroyed) return i;
                    if ("function" != typeof t) return i;

                    function n() {
                        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                        for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++) r[a] = arguments[a];
                        t.apply(i, r)
                    }
                    return n.__emitterProxy = t, i.on(e, n, s)
                },
                onAny(e, t) {
                    const s = this;
                    if (!s.eventsListeners || s.destroyed) return s;
                    if ("function" != typeof e) return s;
                    const i = t ? "unshift" : "push";
                    return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
                },
                offAny(e) {
                    const t = this;
                    if (!t.eventsListeners || t.destroyed) return t;
                    if (!t.eventsAnyListeners) return t;
                    const s = t.eventsAnyListeners.indexOf(e);
                    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
                },
                off(e, t) {
                    const s = this;
                    return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach(e => {
                        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach((i, n) => {
                            (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(n, 1)
                        })
                    }), s) : s
                },
                emit() {
                    const e = this;
                    if (!e.eventsListeners || e.destroyed) return e;
                    if (!e.eventsListeners) return e;
                    let t, s, i;
                    for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                    return "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), i = e) : (t = r[0].events, s = r[0].data, i = r[0].context || e), s.unshift(i), (Array.isArray(t) ? t : t.split(" ")).forEach(t => {
                        e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(e => {
                            e.apply(i, [t, ...s])
                        }), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach(e => {
                            e.apply(i, s)
                        })
                    }), e
                }
            },
            update: {
                updateSize: function() {
                    const e = this;
                    let t, s;
                    const i = e.$el;
                    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10), s = s - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
                        width: t,
                        height: s,
                        size: e.isHorizontal() ? t : s
                    }))
                },
                updateSlides: function() {
                    const e = this;

                    function t(t) {
                        return e.isHorizontal() ? t : {
                            width: "height",
                            "margin-top": "margin-left",
                            "margin-bottom ": "margin-right",
                            "margin-left": "margin-top",
                            "margin-right": "margin-bottom",
                            "padding-left": "padding-top",
                            "padding-right": "padding-bottom",
                            marginRight: "marginBottom"
                        }[t]
                    }

                    function s(e, s) {
                        return parseFloat(e.getPropertyValue(t(s)) || 0)
                    }
                    const i = e.params,
                        {
                            $wrapperEl: n,
                            size: r,
                            rtlTranslate: a,
                            wrongRTL: o
                        } = e,
                        l = e.virtual && i.virtual.enabled,
                        d = l ? e.virtual.slides.length : e.slides.length,
                        c = n.children("." + e.params.slideClass),
                        p = l ? e.virtual.slides.length : c.length;
                    let u = [];
                    const h = [],
                        f = [];
                    let m = i.slidesOffsetBefore;
                    "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                    let g = i.slidesOffsetAfter;
                    "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                    const b = e.snapGrid.length,
                        y = e.slidesGrid.length;
                    let w = i.spaceBetween,
                        _ = -m,
                        E = 0,
                        x = 0;
                    if (void 0 === r) return;
                    "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * r), e.virtualSize = -w, a ? c.css({
                        marginLeft: "",
                        marginBottom: "",
                        marginTop: ""
                    }) : c.css({
                        marginRight: "",
                        marginBottom: "",
                        marginTop: ""
                    }), i.centeredSlides && i.cssMode && (v(e.wrapperEl, "--swiper-centered-offset-before", ""), v(e.wrapperEl, "--swiper-centered-offset-after", ""));
                    const T = i.grid && i.grid.rows > 1 && e.grid;
                    let C;
                    T && e.grid.initSlides(p);
                    const S = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter(e => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
                    for (let n = 0; n < p; n += 1) {
                        C = 0;
                        const a = c.eq(n);
                        if (T && e.grid.updateSlide(n, a, p, t), "none" !== a.css("display")) {
                            if ("auto" === i.slidesPerView) {
                                S && (c[n].style[t("width")] = "");
                                const r = getComputedStyle(a[0]),
                                    o = a[0].style.transform,
                                    l = a[0].style.webkitTransform;
                                if (o && (a[0].style.transform = "none"), l && (a[0].style.webkitTransform = "none"), i.roundLengths) C = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                                else {
                                    const e = s(r, "width"),
                                        t = s(r, "padding-left"),
                                        i = s(r, "padding-right"),
                                        n = s(r, "margin-left"),
                                        o = s(r, "margin-right"),
                                        l = r.getPropertyValue("box-sizing");
                                    if (l && "border-box" === l) C = e + n + o;
                                    else {
                                        const {
                                            clientWidth: s,
                                            offsetWidth: r
                                        } = a[0];
                                        C = e + t + i + n + o + (r - s)
                                    }
                                }
                                o && (a[0].style.transform = o), l && (a[0].style.webkitTransform = l), i.roundLengths && (C = Math.floor(C))
                            } else C = (r - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (C = Math.floor(C)), c[n] && (c[n].style[t("width")] = C + "px");
                            c[n] && (c[n].swiperSlideSize = C), f.push(C), i.centeredSlides ? (_ = _ + C / 2 + E / 2 + w, 0 === E && 0 !== n && (_ = _ - r / 2 - w), 0 === n && (_ = _ - r / 2 - w), Math.abs(_) < .001 && (_ = 0), i.roundLengths && (_ = Math.floor(_)), x % i.slidesPerGroup == 0 && u.push(_), h.push(_)) : (i.roundLengths && (_ = Math.floor(_)), (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 && u.push(_), h.push(_), _ = _ + C + w), e.virtualSize += C + w, E = C, x += 1
                        }
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, r) + g, a && o && ("slide" === i.effect || "coverflow" === i.effect) && n.css({
                            width: e.virtualSize + i.spaceBetween + "px"
                        }), i.setWrapperSize && n.css({
                            [t("width")]: e.virtualSize + i.spaceBetween + "px"
                        }), T && e.grid.updateWrapperSize(C, u, t), !i.centeredSlides) {
                        const t = [];
                        for (let s = 0; s < u.length; s += 1) {
                            let n = u[s];
                            i.roundLengths && (n = Math.floor(n)), u[s] <= e.virtualSize - r && t.push(n)
                        }
                        u = t, Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r)
                    }
                    if (0 === u.length && (u = [0]), 0 !== i.spaceBetween) {
                        const s = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
                        c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
                            [s]: w + "px"
                        })
                    }
                    if (i.centeredSlides && i.centeredSlidesBounds) {
                        let e = 0;
                        f.forEach(t => {
                            e += t + (i.spaceBetween ? i.spaceBetween : 0)
                        }), e -= i.spaceBetween;
                        const t = e - r;
                        u = u.map(e => e < 0 ? -m : e > t ? t + g : e)
                    }
                    if (i.centerInsufficientSlides) {
                        let e = 0;
                        if (f.forEach(t => {
                                e += t + (i.spaceBetween ? i.spaceBetween : 0)
                            }), e -= i.spaceBetween, e < r) {
                            const t = (r - e) / 2;
                            u.forEach((e, s) => {
                                u[s] = e - t
                            }), h.forEach((e, s) => {
                                h[s] = e + t
                            })
                        }
                    }
                    if (Object.assign(e, {
                            slides: c,
                            snapGrid: u,
                            slidesGrid: h,
                            slidesSizesGrid: f
                        }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
                        v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), v(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
                        const t = -e.snapGrid[0],
                            s = -e.slidesGrid[0];
                        e.snapGrid = e.snapGrid.map(e => e + t), e.slidesGrid = e.slidesGrid.map(e => e + s)
                    }
                    if (p !== d && e.emit("slidesLengthChange"), u.length !== b && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== y && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !(l || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
                        const t = i.containerModifierClass + "backface-hidden",
                            s = e.$el.hasClass(t);
                        p <= i.maxBackfaceHiddenSlides ? s || e.$el.addClass(t) : s && e.$el.removeClass(t)
                    }
                },
                updateAutoHeight: function(e) {
                    const t = this,
                        s = [],
                        i = t.virtual && t.params.virtual.enabled;
                    let n, r = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const a = e => i ? t.slides.filter(t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0];
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides)(t.visibleSlides || d([])).each(e => {
                            s.push(e)
                        });
                        else
                            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                                const e = t.activeIndex + n;
                                if (e > t.slides.length && !i) break;
                                s.push(a(e))
                            } else s.push(a(t.activeIndex));
                    for (n = 0; n < s.length; n += 1)
                        if (void 0 !== s[n]) {
                            const e = s[n].offsetHeight;
                            r = e > r ? e : r
                        }(r || 0 === r) && t.$wrapperEl.css("height", r + "px")
                },
                updateSlidesOffset: function() {
                    const e = this,
                        t = e.slides;
                    for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
                },
                updateSlidesProgress: function(e) {
                    void 0 === e && (e = this && this.translate || 0);
                    const t = this,
                        s = t.params,
                        {
                            slides: i,
                            rtlTranslate: n,
                            snapGrid: r
                        } = t;
                    if (0 === i.length) return;
                    void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                    let a = -e;
                    n && (a = e), i.removeClass(s.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (let e = 0; e < i.length; e += 1) {
                        const o = i[e];
                        let l = o.swiperSlideOffset;
                        s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                        const d = (a + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
                            c = (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
                            p = -(a - l),
                            u = p + t.slidesSizesGrid[e];
                        (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), i.eq(e).addClass(s.slideVisibleClass)), o.progress = n ? -d : d, o.originalProgress = n ? -c : c
                    }
                    t.visibleSlides = d(t.visibleSlides)
                },
                updateProgress: function(e) {
                    const t = this;
                    if (void 0 === e) {
                        const s = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * s || 0
                    }
                    const s = t.params,
                        i = t.maxTranslate() - t.minTranslate();
                    let {
                        progress: n,
                        isBeginning: r,
                        isEnd: a
                    } = t;
                    const o = r,
                        l = a;
                    0 === i ? (n = 0, r = !0, a = !0) : (n = (e - t.minTranslate()) / i, r = n <= 0, a = n >= 1), Object.assign(t, {
                        progress: n,
                        isBeginning: r,
                        isEnd: a
                    }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), a && !l && t.emit("reachEnd toEdge"), (o && !r || l && !a) && t.emit("fromEdge"), t.emit("progress", n)
                },
                updateSlidesClasses: function() {
                    const e = this,
                        {
                            slides: t,
                            params: s,
                            $wrapperEl: i,
                            activeIndex: n,
                            realIndex: r
                        } = e,
                        a = e.virtual && s.virtual.enabled;
                    let o;
                    t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`), o = a ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`) : t.eq(n), o.addClass(s.slideActiveClass), s.loop && (o.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));
                    let l = o.nextAll("." + s.slideClass).eq(0).addClass(s.slideNextClass);
                    s.loop && 0 === l.length && (l = t.eq(0), l.addClass(s.slideNextClass));
                    let d = o.prevAll("." + s.slideClass).eq(0).addClass(s.slidePrevClass);
                    s.loop && 0 === d.length && (d = t.eq(-1), d.addClass(s.slidePrevClass)), s.loop && (l.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass), d.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)), e.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    const t = this,
                        s = t.rtlTranslate ? t.translate : -t.translate,
                        {
                            slidesGrid: i,
                            snapGrid: n,
                            params: r,
                            activeIndex: a,
                            realIndex: o,
                            snapIndex: l
                        } = t;
                    let d, c = e;
                    if (void 0 === c) {
                        for (let e = 0; e < i.length; e += 1) void 0 !== i[e + 1] ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2 ? c = e : s >= i[e] && s < i[e + 1] && (c = e + 1) : s >= i[e] && (c = e);
                        r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
                    }
                    if (n.indexOf(s) >= 0) d = n.indexOf(s);
                    else {
                        const e = Math.min(r.slidesPerGroupSkip, c);
                        d = e + Math.floor((c - e) / r.slidesPerGroup)
                    }
                    if (d >= n.length && (d = n.length - 1), c === a) return void(d !== l && (t.snapIndex = d, t.emit("snapIndexChange")));
                    const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                    Object.assign(t, {
                        snapIndex: d,
                        realIndex: p,
                        previousIndex: a,
                        activeIndex: c
                    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
                },
                updateClickedSlide: function(e) {
                    const t = this,
                        s = t.params,
                        i = d(e).closest("." + s.slideClass)[0];
                    let n, r = !1;
                    if (i)
                        for (let e = 0; e < t.slides.length; e += 1)
                            if (t.slides[e] === i) {
                                r = !0, n = e;
                                break
                            }
                    if (!i || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(d(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function(e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    const {
                        params: t,
                        rtlTranslate: s,
                        translate: i,
                        $wrapperEl: n
                    } = this;
                    if (t.virtualTranslate) return s ? -i : i;
                    if (t.cssMode) return i;
                    let r = h(n[0], e);
                    return s && (r = -r), r || 0
                },
                setTranslate: function(e, t) {
                    const s = this,
                        {
                            rtlTranslate: i,
                            params: n,
                            $wrapperEl: r,
                            wrapperEl: a,
                            progress: o
                        } = s;
                    let l, d = 0,
                        c = 0;
                    s.isHorizontal() ? d = i ? -e : e : c = e, n.roundLengths && (d = Math.floor(d), c = Math.floor(c)), n.cssMode ? a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -c : n.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? d : c;
                    const p = s.maxTranslate() - s.minTranslate();
                    l = 0 === p ? 0 : (e - s.minTranslate()) / p, l !== o && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
                },
                minTranslate: function() {
                    return -this.snapGrid[0]
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function(e, t, s, i, n) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === i && (i = !0);
                    const r = this,
                        {
                            params: a,
                            wrapperEl: o
                        } = r;
                    if (r.animating && a.preventInteractionOnTransition) return !1;
                    const l = r.minTranslate(),
                        d = r.maxTranslate();
                    let c;
                    if (c = i && e > l ? l : i && e < d ? d : e, r.updateProgress(c), a.cssMode) {
                        const e = r.isHorizontal();
                        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
                        else {
                            if (!r.support.smoothScroll) return b({
                                swiper: r,
                                targetPosition: -c,
                                side: e ? "left" : "top"
                            }), !0;
                            o.scrollTo({
                                [e ? "left" : "top"]: -c,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function(e, t) {
                    const s = this;
                    s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    const s = this,
                        {
                            params: i
                        } = s;
                    i.cssMode || (i.autoHeight && s.updateAutoHeight(), C({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "Start"
                    }))
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    const s = this,
                        {
                            params: i
                        } = s;
                    s.animating = !1, i.cssMode || (s.setTransition(0), C({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "End"
                    }))
                }
            },
            slide: {
                slideTo: function(e, t, s, i, n) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const r = this;
                    let a = e;
                    a < 0 && (a = 0);
                    const {
                        params: o,
                        snapGrid: l,
                        slidesGrid: d,
                        previousIndex: c,
                        activeIndex: p,
                        rtlTranslate: u,
                        wrapperEl: h,
                        enabled: f
                    } = r;
                    if (r.animating && o.preventInteractionOnTransition || !f && !i && !n) return !1;
                    const m = Math.min(r.params.slidesPerGroupSkip, a);
                    let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
                    g >= l.length && (g = l.length - 1);
                    const v = -l[g];
                    if (o.normalizeSlideIndex)
                        for (let e = 0; e < d.length; e += 1) {
                            const t = -Math.floor(100 * v),
                                s = Math.floor(100 * d[e]),
                                i = Math.floor(100 * d[e + 1]);
                            void 0 !== d[e + 1] ? t >= s && t < i - (i - s) / 2 ? a = e : t >= s && t < i && (a = e + 1) : t >= s && (a = e)
                        }
                    if (r.initialized && a !== p) {
                        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (p || 0) !== a) return !1
                    }
                    let y;
                    if (a !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(v), y = a > p ? "next" : a < p ? "prev" : "reset", u && -v === r.translate || !u && v === r.translate) return r.updateActiveIndex(a), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(v), "reset" !== y && (r.transitionStart(s, y), r.transitionEnd(s, y)), !1;
                    if (o.cssMode) {
                        const e = r.isHorizontal(),
                            s = u ? v : -v;
                        if (0 === t) {
                            const t = r.virtual && r.params.virtual.enabled;
                            t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame(() => {
                                r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = !1
                            })
                        } else {
                            if (!r.support.smoothScroll) return b({
                                swiper: r,
                                targetPosition: s,
                                side: e ? "left" : "top"
                            }), !0;
                            h.scrollTo({
                                [e ? "left" : "top"]: s,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return r.setTransition(t), r.setTranslate(v), r.updateActiveIndex(a), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(s, y), 0 === t ? r.transitionEnd(s, y) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, y))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)), !0
                },
                slideToLoop: function(e, t, s, i) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const n = this;
                    let r = e;
                    return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, s, i)
                },
                slideNext: function(e, t, s) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    const i = this,
                        {
                            animating: n,
                            enabled: r,
                            params: a
                        } = i;
                    if (!r) return i;
                    let o = a.slidesPerGroup;
                    "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                    const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
                    if (a.loop) {
                        if (n && a.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }
                    return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
                },
                slidePrev: function(e, t, s) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    const i = this,
                        {
                            params: n,
                            animating: r,
                            snapGrid: a,
                            slidesGrid: o,
                            rtlTranslate: l,
                            enabled: d
                        } = i;
                    if (!d) return i;
                    if (n.loop) {
                        if (r && n.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }

                    function c(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    const p = c(l ? i.translate : -i.translate),
                        u = a.map(e => c(e));
                    let h = a[u.indexOf(p) - 1];
                    if (void 0 === h && n.cssMode) {
                        let e;
                        a.forEach((t, s) => {
                            p >= t && (e = s)
                        }), void 0 !== e && (h = a[e > 0 ? e - 1 : e])
                    }
                    let f = 0;
                    if (void 0 !== h && (f = o.indexOf(h), f < 0 && (f = i.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), n.rewind && i.isBeginning) {
                        const n = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                        return i.slideTo(n, e, t, s)
                    }
                    return i.slideTo(f, e, t, s)
                },
                slideReset: function(e, t, s) {
                    return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s)
                },
                slideToClosest: function(e, t, s, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
                    const n = this;
                    let r = n.activeIndex;
                    const a = Math.min(n.params.slidesPerGroupSkip, r),
                        o = a + Math.floor((r - a) / n.params.slidesPerGroup),
                        l = n.rtlTranslate ? n.translate : -n.translate;
                    if (l >= n.snapGrid[o]) {
                        const e = n.snapGrid[o];
                        l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup)
                    } else {
                        const e = n.snapGrid[o - 1];
                        l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup)
                    }
                    return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, s)
                },
                slideToClickedSlide: function() {
                    const e = this,
                        {
                            params: t,
                            $wrapperEl: s
                        } = e,
                        i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let n, r = e.clickedIndex;
                    if (t.loop) {
                        if (e.animating) return;
                        n = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), p(() => {
                            e.slideTo(r)
                        })) : e.slideTo(r) : r > e.slides.length - i ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), p(() => {
                            e.slideTo(r)
                        })) : e.slideTo(r)
                    } else e.slideTo(r)
                }
            },
            loop: {
                loopCreate: function() {
                    const e = this,
                        t = i(),
                        {
                            params: s,
                            $wrapperEl: n
                        } = e,
                        r = n.children().length > 0 ? d(n.children()[0].parentNode) : n;
                    r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
                    let a = r.children("." + s.slideClass);
                    if (s.loopFillGroupWithBlank) {
                        const e = s.slidesPerGroup - a.length % s.slidesPerGroup;
                        if (e !== s.slidesPerGroup) {
                            for (let i = 0; i < e; i += 1) {
                                const e = d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                                r.append(e)
                            }
                            a = r.children("." + s.slideClass)
                        }
                    }
                    "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length), e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)), e.loopedSlides += s.loopAdditionalSlides, e.loopedSlides > a.length && e.params.loopedSlidesLimit && (e.loopedSlides = a.length);
                    const o = [],
                        l = [];
                    a.each((e, t) => {
                        d(e).attr("data-swiper-slide-index", t)
                    });
                    for (let t = 0; t < e.loopedSlides; t += 1) {
                        const e = t - Math.floor(t / a.length) * a.length;
                        l.push(a.eq(e)[0]), o.unshift(a.eq(a.length - e - 1)[0])
                    }
                    for (let e = 0; e < l.length; e += 1) r.append(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1) r.prepend(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
                },
                loopFix: function() {
                    const e = this;
                    e.emit("beforeLoopFix");
                    const {
                        activeIndex: t,
                        slides: s,
                        loopedSlides: i,
                        allowSlidePrev: n,
                        allowSlideNext: r,
                        snapGrid: a,
                        rtlTranslate: o
                    } = e;
                    let l;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    const d = -a[t] - e.getTranslate();
                    t < i ? (l = s.length - 3 * i + t, l += i, e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)) : t >= s.length - i && (l = -s.length + t + i, l += i, e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)), e.allowSlidePrev = n, e.allowSlideNext = r, e.emit("loopFix")
                },
                loopDestroy: function() {
                    const {
                        $wrapperEl: e,
                        params: t,
                        slides: s
                    } = this;
                    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function(e) {
                    const t = this;
                    if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                    const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab"
                },
                unsetGrabCursor: function() {
                    const e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
                }
            },
            events: {
                attachEvents: function() {
                    const e = this,
                        t = i(),
                        {
                            params: s,
                            support: n
                        } = e;
                    e.onTouchStart = S.bind(e), e.onTouchMove = M.bind(e), e.onTouchEnd = P.bind(e), s.cssMode && (e.onScroll = O.bind(e)), e.onClick = $.bind(e), n.touch && !A && (t.addEventListener("touchstart", L), A = !0), I(e, "on")
                },
                detachEvents: function() {
                    I(this, "off")
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    const e = this,
                        {
                            activeIndex: t,
                            initialized: s,
                            loopedSlides: i = 0,
                            params: n,
                            $el: r
                        } = e,
                        a = n.breakpoints;
                    if (!a || a && 0 === Object.keys(a).length) return;
                    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in a ? a[o] : void 0) || e.originalParams,
                        d = z(e, n),
                        c = z(e, l),
                        p = n.enabled;
                    d && !c ? (r.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (r.addClass(n.containerModifierClass + "grid"), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === n.grid.fill) && r.addClass(n.containerModifierClass + "grid-column"), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(t => {
                        const s = n[t] && n[t].enabled,
                            i = l[t] && l[t].enabled;
                        s && !i && e[t].disable(), !s && i && e[t].enable()
                    });
                    const u = l.direction && l.direction !== n.direction,
                        h = n.loop && (l.slidesPerView !== n.slidesPerView || u);
                    u && s && e.changeDirection(), g(e.params, l);
                    const f = e.params.enabled;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), p && !f ? e.disable() : !p && f && e.enable(), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", l), h && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                },
                getBreakpoint: function(e, t, s) {
                    if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
                    let i = !1;
                    const n = r(),
                        a = "window" === t ? n.innerHeight : s.clientHeight,
                        o = Object.keys(e).map(e => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return {
                                    value: a * t,
                                    point: e
                                }
                            }
                            return {
                                value: e,
                                point: e
                            }
                        });
                    o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < o.length; e += 1) {
                        const {
                            point: r,
                            value: a
                        } = o[e];
                        "window" === t ? n.matchMedia(`(min-width: ${a}px)`).matches && (i = r) : a <= s.clientWidth && (i = r)
                    }
                    return i || "max"
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    const e = this,
                        {
                            isLocked: t,
                            params: s
                        } = e,
                        {
                            slidesOffsetBefore: i
                        } = s;
                    if (i) {
                        const t = e.slides.length - 1,
                            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                        e.isLocked = e.size > s
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                }
            },
            classes: {
                addClasses: function() {
                    const e = this,
                        {
                            classNames: t,
                            params: s,
                            rtl: i,
                            $el: n,
                            device: r,
                            support: a
                        } = e,
                        o = function(e, t) {
                            const s = [];
                            return e.forEach(e => {
                                "object" == typeof e ? Object.keys(e).forEach(i => {
                                    e[i] && s.push(t + i)
                                }) : "string" == typeof e && s.push(t + e)
                            }), s
                        }(["initialized", s.direction, {
                            "pointer-events": !a.touch
                        }, {
                            "free-mode": e.params.freeMode && s.freeMode.enabled
                        }, {
                            autoheight: s.autoHeight
                        }, {
                            rtl: i
                        }, {
                            grid: s.grid && s.grid.rows > 1
                        }, {
                            "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                        }, {
                            android: r.android
                        }, {
                            ios: r.ios
                        }, {
                            "css-mode": s.cssMode
                        }, {
                            centered: s.cssMode && s.centeredSlides
                        }, {
                            "watch-progress": s.watchSlidesProgress
                        }], s.containerModifierClass);
                    t.push(...o), n.addClass([...t].join(" ")), e.emitContainerClasses()
                },
                removeClasses: function() {
                    const {
                        $el: e,
                        classNames: t
                    } = this;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            },
            images: {
                loadImage: function(e, t, s, i, n, a) {
                    const o = r();
                    let l;

                    function c() {
                        a && a()
                    }
                    d(e).parent("picture")[0] || e.complete && n ? c() : t ? (l = new o.Image, l.onload = c, l.onerror = c, i && (l.sizes = i), s && (l.srcset = s), t && (l.src = t)) : c()
                },
                preloadImages: function() {
                    const e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                        const i = e.imagesToLoad[s];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        B = {};
    class H {
        constructor() {
            let e, t;
            for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++) i[n] = arguments[n];
            if (1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = g({}, t), e && !t.el && (t.el = e), t.el && d(t.el).length > 1) {
                const e = [];
                return d(t.el).each(s => {
                    const i = g({}, t, {
                        el: s
                    });
                    e.push(new H(i))
                }), e
            }
            const r = this;
            r.__swiper__ = !0, r.support = E(), r.device = x({
                userAgent: t.userAgent
            }), r.browser = T(), r.eventsListeners = {}, r.eventsAnyListeners = [], r.modules = [...r.__modules__], t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
            const a = {};
            r.modules.forEach(e => {
                e({
                    swiper: r,
                    extendParams: N(t, a),
                    on: r.on.bind(r),
                    once: r.once.bind(r),
                    off: r.off.bind(r),
                    emit: r.emit.bind(r)
                })
            });
            const o = g({}, D, a);
            return r.params = g({}, o, B, t), r.originalParams = g({}, r.params), r.passedParams = g({}, t), r.params && r.params.on && Object.keys(r.params.on).forEach(e => {
                r.on(e, r.params.on[e])
            }), r.params && r.params.onAny && r.onAny(r.params.onAny), r.$ = d, Object.assign(r, {
                enabled: r.params.enabled,
                el: e,
                classNames: [],
                slides: d(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === r.params.direction,
                isVertical: () => "vertical" === r.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: r.params.allowSlideNext,
                allowSlidePrev: r.params.allowSlidePrev,
                touchEvents: function() {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                        t = ["pointerdown", "pointermove", "pointerup"];
                    return r.touchEventsTouch = {
                        start: e[0],
                        move: e[1],
                        end: e[2],
                        cancel: e[3]
                    }, r.touchEventsDesktop = {
                        start: t[0],
                        move: t[1],
                        end: t[2]
                    }, r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: r.params.focusableElements,
                    lastClickTime: u(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: r.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }), r.emit("_swiper"), r.params.init && r.init(), r
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate(),
                n = (s.maxTranslate() - i) * e + i;
            s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each(s => {
                const i = e.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: i
                }), e.emit("_slideClass", s, i)
            }), e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const {
                params: s,
                slides: i,
                slidesGrid: n,
                slidesSizesGrid: r,
                size: a,
                activeIndex: o
            } = this;
            let l = 1;
            if (s.centeredSlides) {
                let e, t = i[o].swiperSlideSize;
                for (let s = o + 1; s < i.length; s += 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > a && (e = !0));
                for (let s = o - 1; s >= 0; s -= 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > a && (e = !0))
            } else if ("current" === e)
                for (let e = o + 1; e < i.length; e += 1)(t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
            else
                for (let e = o - 1; e >= 0; e -= 1) n[o] - n[e] < a && (l += 1);
            return l
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const {
                snapGrid: t,
                params: s
            } = e;

            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
            }
            let n;
            s.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (i(), e.params.autoHeight && e.updateAutoHeight()) : (n = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), n || i()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const s = this,
                i = s.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.$el.removeClass(`${s.params.containerModifierClass}${i}`).addClass(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.each(t => {
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }), s.emit("changeDirection"), t && s.update()), s
        }
        changeLanguageDirection(e) {
            const t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"), t.el.dir = "rtl") : (t.$el.removeClass(t.params.containerModifierClass + "rtl"), t.el.dir = "ltr"), t.update())
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const s = d(e || t.params.el);
            if (!(e = s[0])) return !1;
            e.swiper = t;
            const n = () => "." + (t.params.wrapperClass || "").trim().split(" ").join(".");
            let r = (() => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = d(e.shadowRoot.querySelector(n()));
                    return t.children = e => s.children(e), t
                }
                return s.children ? s.children(n()) : d(s).children(n())
            })();
            if (0 === r.length && t.params.createElements) {
                const e = i().createElement("div");
                r = d(e), e.className = t.params.wrapperClass, s.append(e), s.children("." + t.params.slideClass).each(e => {
                    r.append(e)
                })
            }
            return Object.assign(t, {
                $el: s,
                el: e,
                $wrapperEl: r,
                wrapperEl: r[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
                wrongRTL: "-webkit-box" === r.css("display")
            }), !0
        }
        init(e) {
            const t = this;
            return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
        }
        destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const s = this,
                {
                    params: i,
                    $el: n,
                    $wrapperEl: r,
                    slides: a
                } = s;
            return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), n.removeAttr("style"), r.removeAttr("style"), a && a.length && a.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(e => {
                s.off(e)
            }), !1 !== e && (s.$el[0].swiper = null, function(e) {
                const t = e;
                Object.keys(t).forEach(e => {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            }(s)), s.destroyed = !0), null
        }
        static extendDefaults(e) {
            g(B, e)
        }
        static get extendedDefaults() {
            return B
        }
        static get defaults() {
            return D
        }
        static installModule(e) {
            H.prototype.__modules__ || (H.prototype.__modules__ = []);
            const t = H.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach(e => H.installModule(e)), H) : (H.installModule(e), H)
        }
    }

    function W(e, t, s, n) {
        const r = i();
        return e.params.createElements && Object.keys(n).forEach(i => {
            if (!s[i] && !0 === s.auto) {
                let a = e.$el.children("." + n[i])[0];
                a || (a = r.createElement("div"), a.className = n[i], e.$el.append(a)), s[i] = a, t[i] = a
            }
        }), s
    }

    function q(e) {
        return void 0 === e && (e = ""), "." + e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")
    }

    function R(e) {
        const t = this,
            {
                $wrapperEl: s,
                params: i
            } = t;
        if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
            for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
        else s.append(e);
        i.loop && t.loopCreate(), i.observer || t.update()
    }

    function F(e) {
        const t = this,
            {
                params: s,
                $wrapperEl: i,
                activeIndex: n
            } = t;
        s.loop && t.loopDestroy();
        let r = n + 1;
        if ("object" == typeof e && "length" in e) {
            for (let t = 0; t < e.length; t += 1) e[t] && i.prepend(e[t]);
            r = n + e.length
        } else i.prepend(e);
        s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1)
    }

    function Y(e, t) {
        const s = this,
            {
                $wrapperEl: i,
                params: n,
                activeIndex: r
            } = s;
        let a = r;
        n.loop && (a -= s.loopedSlides, s.loopDestroy(), s.slides = i.children("." + n.slideClass));
        const o = s.slides.length;
        if (e <= 0) return void s.prependSlide(t);
        if (e >= o) return void s.appendSlide(t);
        let l = a > e ? a + 1 : a;
        const d = [];
        for (let t = o - 1; t >= e; t -= 1) {
            const e = s.slides.eq(t);
            e.remove(), d.unshift(e)
        }
        if ("object" == typeof t && "length" in t) {
            for (let e = 0; e < t.length; e += 1) t[e] && i.append(t[e]);
            l = a > e ? a + t.length : a
        } else i.append(t);
        for (let e = 0; e < d.length; e += 1) i.append(d[e]);
        n.loop && s.loopCreate(), n.observer || s.update(), n.loop ? s.slideTo(l + s.loopedSlides, 0, !1) : s.slideTo(l, 0, !1)
    }

    function G(e) {
        const t = this,
            {
                params: s,
                $wrapperEl: i,
                activeIndex: n
            } = t;
        let r = n;
        s.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + s.slideClass));
        let a, o = r;
        if ("object" == typeof e && "length" in e) {
            for (let s = 0; s < e.length; s += 1) a = e[s], t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1);
            o = Math.max(o, 0)
        } else a = e, t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1), o = Math.max(o, 0);
        s.loop && t.loopCreate(), s.observer || t.update(), s.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1)
    }

    function X() {
        const e = this,
            t = [];
        for (let s = 0; s < e.slides.length; s += 1) t.push(s);
        e.removeSlide(t)
    }

    function V(e) {
        const {
            effect: t,
            swiper: s,
            on: i,
            setTranslate: n,
            setTransition: r,
            overwriteParams: a,
            perspective: o,
            recreateShadows: l,
            getEffectParams: d
        } = e;
        let c;
        i("beforeInit", () => {
            if (s.params.effect !== t) return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`), o && o() && s.classNames.push(s.params.containerModifierClass + "3d");
            const e = a ? a() : {};
            Object.assign(s.params, e), Object.assign(s.originalParams, e)
        }), i("setTranslate", () => {
            s.params.effect === t && n()
        }), i("setTransition", (e, i) => {
            s.params.effect === t && r(i)
        }), i("transitionEnd", () => {
            if (s.params.effect === t && l) {
                if (!d || !d().slideShadows) return;
                s.slides.each(e => {
                    s.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
                }), l()
            }
        }), i("virtualUpdate", () => {
            s.params.effect === t && (s.slides.length || (c = !0), requestAnimationFrame(() => {
                c && s.slides && s.slides.length && (n(), c = !1)
            }))
        })
    }

    function U(e, t) {
        return e.transformEl ? t.find(e.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        }) : t
    }

    function Q(e) {
        let {
            swiper: t,
            duration: s,
            transformEl: i,
            allSlides: n
        } = e;
        const {
            slides: r,
            activeIndex: a,
            $wrapperEl: o
        } = t;
        if (t.params.virtualTranslate && 0 !== s) {
            let e, s = !1;
            e = n ? i ? r.find(i) : r : i ? r.eq(a).find(i) : r.eq(a), e.transitionEnd(() => {
                if (s) return;
                if (!t || t.destroyed) return;
                s = !0, t.animating = !1;
                const e = ["webkitTransitionEnd", "transitionend"];
                for (let t = 0; t < e.length; t += 1) o.trigger(e[t])
            })
        }
    }

    function K(e, t, s) {
        const i = "swiper-slide-shadow" + (s ? "-" + s : ""),
            n = e.transformEl ? t.find(e.transformEl) : t;
        let r = n.children("." + i);
        return r.length || (r = d(`<div class="swiper-slide-shadow${s?"-"+s:""}"></div>`), n.append(r)), r
    }
    Object.keys(j).forEach(e => {
        Object.keys(j[e]).forEach(t => {
            H.prototype[t] = j[e][t]
        })
    }), H.use([function(e) {
        let {
            swiper: t,
            on: s,
            emit: i
        } = e;
        const n = r();
        let a = null,
            o = null;
        const l = () => {
                t && !t.destroyed && t.initialized && (i("beforeResize"), i("resize"))
            },
            d = () => {
                t && !t.destroyed && t.initialized && i("orientationchange")
            };
        s("init", () => {
            t.params.resizeObserver && void 0 !== n.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver(e => {
                o = n.requestAnimationFrame(() => {
                    const {
                        width: s,
                        height: i
                    } = t;
                    let n = s,
                        r = i;
                    e.forEach(e => {
                        let {
                            contentBoxSize: s,
                            contentRect: i,
                            target: a
                        } = e;
                        a && a !== t.el || (n = i ? i.width : (s[0] || s).inlineSize, r = i ? i.height : (s[0] || s).blockSize)
                    }), n === s && r === i || l()
                })
            }), a.observe(t.el)) : (n.addEventListener("resize", l), n.addEventListener("orientationchange", d))
        }), s("destroy", () => {
            o && n.cancelAnimationFrame(o), a && a.unobserve && t.el && (a.unobserve(t.el), a = null), n.removeEventListener("resize", l), n.removeEventListener("orientationchange", d)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i,
            emit: n
        } = e;
        const a = [],
            o = r(),
            l = function(e, t) {
                void 0 === t && (t = {});
                const s = new(o.MutationObserver || o.WebkitMutationObserver)(e => {
                    if (1 === e.length) return void n("observerUpdate", e[0]);
                    const t = function() {
                        n("observerUpdate", e[0])
                    };
                    o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0)
                });
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), a.push(s)
            };
        s({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }), i("init", () => {
            if (t.params.observer) {
                if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1) l(e[t])
                }
                l(t.$el[0], {
                    childList: t.params.observeSlideChildren
                }), l(t.$wrapperEl[0], {
                    attributes: !1
                })
            }
        }), i("destroy", () => {
            a.forEach(e => {
                e.disconnect()
            }), a.splice(0, a.length)
        })
    }]);
    const Z = [function(e) {
        let t, {
            swiper: s,
            extendParams: i,
            on: n,
            emit: r
        } = e;

        function a(e, t) {
            const i = s.params.virtual;
            if (i.cache && s.virtual.cache[t]) return s.virtual.cache[t];
            const n = i.renderSlide ? d(i.renderSlide.call(s, e, t)) : d(`<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);
            return n.attr("data-swiper-slide-index") || n.attr("data-swiper-slide-index", t), i.cache && (s.virtual.cache[t] = n), n
        }

        function o(e) {
            const {
                slidesPerView: t,
                slidesPerGroup: i,
                centeredSlides: n
            } = s.params, {
                addSlidesBefore: o,
                addSlidesAfter: l
            } = s.params.virtual, {
                from: d,
                to: c,
                slides: p,
                slidesGrid: u,
                offset: h
            } = s.virtual;
            s.params.cssMode || s.updateActiveIndex();
            const f = s.activeIndex || 0;
            let m, g, v;
            m = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top", n ? (g = Math.floor(t / 2) + i + l, v = Math.floor(t / 2) + i + o) : (g = t + (i - 1) + l, v = i + o);
            const b = Math.max((f || 0) - v, 0),
                y = Math.min((f || 0) + g, p.length - 1),
                w = (s.slidesGrid[b] || 0) - (s.slidesGrid[0] || 0);

            function _() {
                s.updateSlides(), s.updateProgress(), s.updateSlidesClasses(), s.lazy && s.params.lazy.enabled && s.lazy.load(), r("virtualUpdate")
            }
            if (Object.assign(s.virtual, {
                    from: b,
                    to: y,
                    offset: w,
                    slidesGrid: s.slidesGrid
                }), d === b && c === y && !e) return s.slidesGrid !== u && w !== h && s.slides.css(m, w + "px"), s.updateProgress(), void r("virtualUpdate");
            if (s.params.virtual.renderExternal) return s.params.virtual.renderExternal.call(s, {
                offset: w,
                from: b,
                to: y,
                slides: function() {
                    const e = [];
                    for (let t = b; t <= y; t += 1) e.push(p[t]);
                    return e
                }()
            }), void(s.params.virtual.renderExternalUpdate ? _() : r("virtualUpdate"));
            const E = [],
                x = [];
            if (e) s.$wrapperEl.find("." + s.params.slideClass).remove();
            else
                for (let e = d; e <= c; e += 1)(e < b || e > y) && s.$wrapperEl.find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
            for (let t = 0; t < p.length; t += 1) t >= b && t <= y && (void 0 === c || e ? x.push(t) : (t > c && x.push(t), t < d && E.push(t)));
            x.forEach(e => {
                s.$wrapperEl.append(a(p[e], e))
            }), E.sort((e, t) => t - e).forEach(e => {
                s.$wrapperEl.prepend(a(p[e], e))
            }), s.$wrapperEl.children(".swiper-slide").css(m, w + "px"), _()
        }
        i({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        }), s.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        }, n("beforeInit", () => {
            s.params.virtual.enabled && (s.virtual.slides = s.params.virtual.slides, s.classNames.push(s.params.containerModifierClass + "virtual"), s.params.watchSlidesProgress = !0, s.originalParams.watchSlidesProgress = !0, s.params.initialSlide || o())
        }), n("setTranslate", () => {
            s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t), t = setTimeout(() => {
                o()
            }, 100)) : o())
        }), n("init update resize", () => {
            s.params.virtual.enabled && s.params.cssMode && v(s.wrapperEl, "--swiper-virtual-size", s.virtualSize + "px")
        }), Object.assign(s.virtual, {
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (let t = 0; t < e.length; t += 1) e[t] && s.virtual.slides.push(e[t]);
                else s.virtual.slides.push(e);
                o(!0)
            },
            prependSlide: function(e) {
                const t = s.activeIndex;
                let i = t + 1,
                    n = 1;
                if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1) e[t] && s.virtual.slides.unshift(e[t]);
                    i = t + e.length, n = e.length
                } else s.virtual.slides.unshift(e);
                if (s.params.virtual.cache) {
                    const e = s.virtual.cache,
                        t = {};
                    Object.keys(e).forEach(s => {
                        const i = e[s],
                            r = i.attr("data-swiper-slide-index");
                        r && i.attr("data-swiper-slide-index", parseInt(r, 10) + n), t[parseInt(s, 10) + n] = i
                    }), s.virtual.cache = t
                }
                o(!0), s.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null == e) return;
                let t = s.activeIndex;
                if (Array.isArray(e))
                    for (let i = e.length - 1; i >= 0; i -= 1) s.virtual.slides.splice(e[i], 1), s.params.virtual.cache && delete s.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0);
                else s.virtual.slides.splice(e, 1), s.params.virtual.cache && delete s.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                o(!0), s.slideTo(t, 0)
            },
            removeAllSlides: function() {
                s.virtual.slides = [], s.params.virtual.cache && (s.virtual.cache = {}), o(!0), s.slideTo(0, 0)
            },
            update: o
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: n,
            emit: a
        } = e;
        const o = i(),
            l = r();

        function c(e) {
            if (!t.enabled) return;
            const {
                rtlTranslate: s
            } = t;
            let i = e;
            i.originalEvent && (i = i.originalEvent);
            const n = i.keyCode || i.charCode,
                r = t.params.keyboard.pageUpDown,
                d = r && 33 === n,
                c = r && 34 === n,
                p = 37 === n,
                u = 39 === n,
                h = 38 === n,
                f = 40 === n;
            if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && f || c)) return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && h || d)) return !1;
            if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || o.activeElement && o.activeElement.nodeName && ("input" === o.activeElement.nodeName.toLowerCase() || "textarea" === o.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (d || c || p || u || h || f)) {
                    let e = !1;
                    if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                    const i = t.$el,
                        n = i[0].clientWidth,
                        r = i[0].clientHeight,
                        a = l.innerWidth,
                        o = l.innerHeight,
                        d = t.$el.offset();
                    s && (d.left -= t.$el[0].scrollLeft);
                    const c = [
                        [d.left, d.top],
                        [d.left + n, d.top],
                        [d.left, d.top + r],
                        [d.left + n, d.top + r]
                    ];
                    for (let t = 0; t < c.length; t += 1) {
                        const s = c[t];
                        if (s[0] >= 0 && s[0] <= a && s[1] >= 0 && s[1] <= o) {
                            if (0 === s[0] && 0 === s[1]) continue;
                            e = !0
                        }
                    }
                    if (!e) return
                }
                t.isHorizontal() ? ((d || c || p || u) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1), ((c || u) && !s || (d || p) && s) && t.slideNext(), ((d || p) && !s || (c || u) && s) && t.slidePrev()) : ((d || c || h || f) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (c || f) && t.slideNext(), (d || h) && t.slidePrev()), a("keyPress", n)
            }
        }

        function p() {
            t.keyboard.enabled || (d(o).on("keydown", c), t.keyboard.enabled = !0)
        }

        function u() {
            t.keyboard.enabled && (d(o).off("keydown", c), t.keyboard.enabled = !1)
        }
        t.keyboard = {
            enabled: !1
        }, s({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }), n("init", () => {
            t.params.keyboard.enabled && p()
        }), n("destroy", () => {
            t.keyboard.enabled && u()
        }), Object.assign(t.keyboard, {
            enable: p,
            disable: u
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i,
            emit: n
        } = e;
        const a = r();
        let o;
        s({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        }), t.mousewheel = {
            enabled: !1
        };
        let l, c = u();
        const h = [];

        function f() {
            t.enabled && (t.mouseEntered = !0)
        }

        function m() {
            t.enabled && (t.mouseEntered = !1)
        }

        function g(e) {
            return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta || t.params.mousewheel.thresholdTime && u() - c < t.params.mousewheel.thresholdTime || !(e.delta >= 6 && u() - c < 60) && (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), n("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), n("scroll", e.raw)), c = (new a.Date).getTime(), 1))
        }

        function v(e) {
            let s = e,
                i = !0;
            if (!t.enabled) return;
            const r = t.params.mousewheel;
            t.params.cssMode && s.preventDefault();
            let a = t.$el;
            if ("container" !== t.params.mousewheel.eventsTarget && (a = d(t.params.mousewheel.eventsTarget)), !t.mouseEntered && !a[0].contains(s.target) && !r.releaseOnEdges) return !0;
            s.originalEvent && (s = s.originalEvent);
            let c = 0;
            const f = t.rtlTranslate ? -1 : 1,
                m = function(e) {
                    let t = 0,
                        s = 0,
                        i = 0,
                        n = 0;
                    return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), i = 10 * t, n = 10 * s, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (i = e.deltaX), e.shiftKey && !i && (i = n, n = 0), (i || n) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, n *= 40) : (i *= 800, n *= 800)), i && !t && (t = i < 1 ? -1 : 1), n && !s && (s = n < 1 ? -1 : 1), {
                        spinX: t,
                        spinY: s,
                        pixelX: i,
                        pixelY: n
                    }
                }(s);
            if (r.forceToAxis)
                if (t.isHorizontal()) {
                    if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY))) return !0;
                    c = -m.pixelX * f
                } else {
                    if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX))) return !0;
                    c = -m.pixelY
                }
            else c = Math.abs(m.pixelX) > Math.abs(m.pixelY) ? -m.pixelX * f : -m.pixelY;
            if (0 === c) return !0;
            r.invert && (c = -c);
            let v = t.getTranslate() + c * r.sensitivity;
            if (v >= t.minTranslate() && (v = t.minTranslate()), v <= t.maxTranslate() && (v = t.maxTranslate()), i = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()), i && t.params.nested && s.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) {
                const e = {
                        time: u(),
                        delta: Math.abs(c),
                        direction: Math.sign(c)
                    },
                    i = l && e.time < l.time + 500 && e.delta <= l.delta && e.direction === l.direction;
                if (!i) {
                    l = void 0, t.params.loop && t.loopFix();
                    let a = t.getTranslate() + c * r.sensitivity;
                    const d = t.isBeginning,
                        u = t.isEnd;
                    if (a >= t.minTranslate() && (a = t.minTranslate()), a <= t.maxTranslate() && (a = t.maxTranslate()), t.setTransition(0), t.setTranslate(a), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!d && t.isBeginning || !u && t.isEnd) && t.updateSlidesClasses(), t.params.freeMode.sticky) {
                        clearTimeout(o), o = void 0, h.length >= 15 && h.shift();
                        const s = h.length ? h[h.length - 1] : void 0,
                            i = h[0];
                        if (h.push(e), s && (e.delta > s.delta || e.direction !== s.direction)) h.splice(0);
                        else if (h.length >= 15 && e.time - i.time < 500 && i.delta - e.delta >= 1 && e.delta <= 6) {
                            const s = c > 0 ? .8 : .2;
                            l = e, h.splice(0), o = p(() => {
                                t.slideToClosest(t.params.speed, !0, void 0, s)
                            }, 0)
                        }
                        o || (o = p(() => {
                            l = e, h.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5)
                        }, 500))
                    }
                    if (i || n("scroll", s), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), a === t.minTranslate() || a === t.maxTranslate()) return !0
                }
            } else {
                const s = {
                    time: u(),
                    delta: Math.abs(c),
                    direction: Math.sign(c),
                    raw: e
                };
                h.length >= 2 && h.shift();
                const i = h.length ? h[h.length - 1] : void 0;
                if (h.push(s), i ? (s.direction !== i.direction || s.delta > i.delta || s.time > i.time + 150) && g(s) : g(s), function(e) {
                        const s = t.params.mousewheel;
                        if (e.direction < 0) {
                            if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0
                        } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges) return !0;
                        return !1
                    }(s)) return !0
            }
            return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1
        }

        function b(e) {
            let s = t.$el;
            "container" !== t.params.mousewheel.eventsTarget && (s = d(t.params.mousewheel.eventsTarget)), s[e]("mouseenter", f), s[e]("mouseleave", m), s[e]("wheel", v)
        }

        function y() {
            return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", v), !0) : !t.mousewheel.enabled && (b("on"), t.mousewheel.enabled = !0, !0)
        }

        function w() {
            return t.params.cssMode ? (t.wrapperEl.addEventListener(event, v), !0) : !!t.mousewheel.enabled && (b("off"), t.mousewheel.enabled = !1, !0)
        }
        i("init", () => {
            !t.params.mousewheel.enabled && t.params.cssMode && w(), t.params.mousewheel.enabled && y()
        }), i("destroy", () => {
            t.params.cssMode && y(), t.mousewheel.enabled && w()
        }), Object.assign(t.mousewheel, {
            enable: y,
            disable: w
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i,
            emit: n
        } = e;

        function r(e) {
            let s;
            return e && (s = d(e), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.$el.find(e).length && (s = t.$el.find(e))), s
        }

        function a(e, s) {
            const i = t.params.navigation;
            e && e.length > 0 && (e[s ? "addClass" : "removeClass"](i.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s), t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](i.lockClass))
        }

        function o() {
            if (t.params.loop) return;
            const {
                $nextEl: e,
                $prevEl: s
            } = t.navigation;
            a(s, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind)
        }

        function l(e) {
            e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), n("navigationPrev"))
        }

        function c(e) {
            e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), n("navigationNext"))
        }

        function p() {
            const e = t.params.navigation;
            if (t.params.navigation = W(t, t.originalParams.navigation, t.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                }), !e.nextEl && !e.prevEl) return;
            const s = r(e.nextEl),
                i = r(e.prevEl);
            s && s.length > 0 && s.on("click", c), i && i.length > 0 && i.on("click", l), Object.assign(t.navigation, {
                $nextEl: s,
                nextEl: s && s[0],
                $prevEl: i,
                prevEl: i && i[0]
            }), t.enabled || (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass))
        }

        function u() {
            const {
                $nextEl: e,
                $prevEl: s
            } = t.navigation;
            e && e.length && (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)), s && s.length && (s.off("click", l), s.removeClass(t.params.navigation.disabledClass))
        }
        s({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        }), t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        }, i("init", () => {
            !1 === t.params.navigation.enabled ? h() : (p(), o())
        }), i("toEdge fromEdge lock unlock", () => {
            o()
        }), i("destroy", () => {
            u()
        }), i("enable disable", () => {
            const {
                $nextEl: e,
                $prevEl: s
            } = t.navigation;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass), s && s[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass)
        }), i("click", (e, s) => {
            const {
                $nextEl: i,
                $prevEl: r
            } = t.navigation, a = s.target;
            if (t.params.navigation.hideOnClick && !d(a).is(r) && !d(a).is(i)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === a || t.pagination.el.contains(a))) return;
                let e;
                i ? e = i.hasClass(t.params.navigation.hiddenClass) : r && (e = r.hasClass(t.params.navigation.hiddenClass)), n(!0 === e ? "navigationShow" : "navigationHide"), i && i.toggleClass(t.params.navigation.hiddenClass), r && r.toggleClass(t.params.navigation.hiddenClass)
            }
        });
        const h = () => {
            t.$el.addClass(t.params.navigation.navigationDisabledClass), u()
        };
        Object.assign(t.navigation, {
            enable: () => {
                t.$el.removeClass(t.params.navigation.navigationDisabledClass), p(), o()
            },
            disable: h,
            update: o,
            init: p,
            destroy: u
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i,
            emit: n
        } = e;
        const r = "swiper-pagination";
        let a;
        s({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: r + "-bullet",
                bulletActiveClass: r + "-bullet-active",
                modifierClass: r + "-",
                currentClass: r + "-current",
                totalClass: r + "-total",
                hiddenClass: r + "-hidden",
                progressbarFillClass: r + "-progressbar-fill",
                progressbarOppositeClass: r + "-progressbar-opposite",
                clickableClass: r + "-clickable",
                lockClass: r + "-lock",
                horizontalClass: r + "-horizontal",
                verticalClass: r + "-vertical",
                paginationDisabledClass: r + "-disabled"
            }
        }), t.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let o = 0;

        function l() {
            return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length
        }

        function c(e, s) {
            const {
                bulletActiveClass: i
            } = t.params.pagination;
            e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`)
        }

        function p() {
            const e = t.rtl,
                s = t.params.pagination;
            if (l()) return;
            const i = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                r = t.pagination.$el;
            let p;
            const u = t.params.loop ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
            if (t.params.loop ? (p = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup), p > i - 1 - 2 * t.loopedSlides && (p -= i - 2 * t.loopedSlides), p > u - 1 && (p -= u), p < 0 && "bullets" !== t.params.paginationType && (p = u + p)) : p = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0, "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                const i = t.pagination.bullets;
                let n, l, u;
                if (s.dynamicBullets && (a = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(t.isHorizontal() ? "width" : "height", a * (s.dynamicMainBullets + 4) + "px"), s.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (o += p - (t.previousIndex - t.loopedSlides || 0), o > s.dynamicMainBullets - 1 ? o = s.dynamicMainBullets - 1 : o < 0 && (o = 0)), n = Math.max(p - o, 0), l = n + (Math.min(i.length, s.dynamicMainBullets) - 1), u = (l + n) / 2), i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${s.bulletActiveClass}${e}`).join(" ")), r.length > 1) i.each(e => {
                    const t = d(e),
                        i = t.index();
                    i === p && t.addClass(s.bulletActiveClass), s.dynamicBullets && (i >= n && i <= l && t.addClass(s.bulletActiveClass + "-main"), i === n && c(t, "prev"), i === l && c(t, "next"))
                });
                else {
                    const e = i.eq(p),
                        r = e.index();
                    if (e.addClass(s.bulletActiveClass), s.dynamicBullets) {
                        const e = i.eq(n),
                            a = i.eq(l);
                        for (let e = n; e <= l; e += 1) i.eq(e).addClass(s.bulletActiveClass + "-main");
                        if (t.params.loop)
                            if (r >= i.length) {
                                for (let e = s.dynamicMainBullets; e >= 0; e -= 1) i.eq(i.length - e).addClass(s.bulletActiveClass + "-main");
                                i.eq(i.length - s.dynamicMainBullets - 1).addClass(s.bulletActiveClass + "-prev")
                            } else c(e, "prev"), c(a, "next");
                        else c(e, "prev"), c(a, "next")
                    }
                }
                if (s.dynamicBullets) {
                    const n = Math.min(i.length, s.dynamicMainBullets + 4),
                        r = (a * n - a) / 2 - u * a,
                        o = e ? "right" : "left";
                    i.css(t.isHorizontal() ? o : "top", r + "px")
                }
            }
            if ("fraction" === s.type && (r.find(q(s.currentClass)).text(s.formatFractionCurrent(p + 1)), r.find(q(s.totalClass)).text(s.formatFractionTotal(u))), "progressbar" === s.type) {
                let e;
                e = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                const i = (p + 1) / u;
                let n = 1,
                    a = 1;
                "horizontal" === e ? n = i : a = i, r.find(q(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`).transition(t.params.speed)
            }
            "custom" === s.type && s.renderCustom ? (r.html(s.renderCustom(t, p + 1, u)), n("paginationRender", r[0])) : n("paginationUpdate", r[0]), t.params.watchOverflow && t.enabled && r[t.isLocked ? "addClass" : "removeClass"](s.lockClass)
        }

        function u() {
            const e = t.params.pagination;
            if (l()) return;
            const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                i = t.pagination.$el;
            let r = "";
            if ("bullets" === e.type) {
                let n = t.params.loop ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && n > s && (n = s);
                for (let s = 0; s < n; s += 1) e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;
                i.html(r), t.pagination.bullets = i.find(q(e.bulletClass))
            }
            "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`, i.html(r)), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`, i.html(r)), "custom" !== e.type && n("paginationRender", t.pagination.$el[0])
        }

        function h() {
            t.params.pagination = W(t, t.originalParams.pagination, t.params.pagination, {
                el: "swiper-pagination"
            });
            const e = t.params.pagination;
            if (!e.el) return;
            let s = d(e.el);
            0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && s.length > 1 && (s = t.$el.find(e.el), s.length > 1 && (s = s.filter(e => d(e).parents(".swiper")[0] === t.el))), "bullets" === e.type && e.clickable && s.addClass(e.clickableClass), s.addClass(e.modifierClass + e.type), s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (s.addClass(`${e.modifierClass}${e.type}-dynamic`), o = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && s.addClass(e.progressbarOppositeClass), e.clickable && s.on("click", q(e.bulletClass), (function(e) {
                e.preventDefault();
                let s = d(this).index() * t.params.slidesPerGroup;
                t.params.loop && (s += t.loopedSlides), t.slideTo(s)
            })), Object.assign(t.pagination, {
                $el: s,
                el: s[0]
            }), t.enabled || s.addClass(e.lockClass))
        }

        function f() {
            const e = t.params.pagination;
            if (l()) return;
            const s = t.pagination.$el;
            s.removeClass(e.hiddenClass), s.removeClass(e.modifierClass + e.type), s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && s.off("click", q(e.bulletClass))
        }
        i("init", () => {
            !1 === t.params.pagination.enabled ? m() : (h(), u(), p())
        }), i("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && p()
        }), i("snapIndexChange", () => {
            t.params.loop || p()
        }), i("slidesLengthChange", () => {
            t.params.loop && (u(), p())
        }), i("snapGridLengthChange", () => {
            t.params.loop || (u(), p())
        }), i("destroy", () => {
            f()
        }), i("enable disable", () => {
            const {
                $el: e
            } = t.pagination;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass)
        }), i("lock unlock", () => {
            p()
        }), i("click", (e, s) => {
            const i = s.target,
                {
                    $el: r
                } = t.pagination;
            if (t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !d(i).hasClass(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl)) return;
                const e = r.hasClass(t.params.pagination.hiddenClass);
                n(!0 === e ? "paginationShow" : "paginationHide"), r.toggleClass(t.params.pagination.hiddenClass)
            }
        });
        const m = () => {
            t.$el.addClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass), f()
        };
        Object.assign(t.pagination, {
            enable: () => {
                t.$el.removeClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass), h(), u(), p()
            },
            disable: m,
            render: u,
            update: p,
            init: h,
            destroy: f
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: n,
            emit: r
        } = e;
        const a = i();
        let o, l, c, u, h = !1,
            f = null,
            m = null;

        function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const {
                scrollbar: e,
                rtlTranslate: s,
                progress: i
            } = t, {
                $dragEl: n,
                $el: r
            } = e, a = t.params.scrollbar;
            let o = l,
                d = (c - l) * i;
            s ? (d = -d, d > 0 ? (o = l - d, d = 0) : -d + l > c && (o = c + d)) : d < 0 ? (o = l + d, d = 0) : d + l > c && (o = c - d), t.isHorizontal() ? (n.transform(`translate3d(${d}px, 0, 0)`), n[0].style.width = o + "px") : (n.transform(`translate3d(0px, ${d}px, 0)`), n[0].style.height = o + "px"), a.hide && (clearTimeout(f), r[0].style.opacity = 1, f = setTimeout(() => {
                r[0].style.opacity = 0, r.transition(400)
            }, 1e3))
        }

        function v() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const {
                scrollbar: e
            } = t, {
                $dragEl: s,
                $el: i
            } = e;
            s[0].style.width = "", s[0].style.height = "", c = t.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, u = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), l = "auto" === t.params.scrollbar.dragSize ? c * u : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? s[0].style.width = l + "px" : s[0].style.height = l + "px", i[0].style.display = u >= 1 ? "none" : "", t.params.scrollbar.hide && (i[0].style.opacity = 0), t.params.watchOverflow && t.enabled && e.$el[t.isLocked ? "addClass" : "removeClass"](t.params.scrollbar.lockClass)
        }

        function b(e) {
            return t.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        }

        function y(e) {
            const {
                scrollbar: s,
                rtlTranslate: i
            } = t, {
                $el: n
            } = s;
            let r;
            r = (b(e) - n.offset()[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : l / 2)) / (c - l), r = Math.max(Math.min(r, 1), 0), i && (r = 1 - r);
            const a = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
            t.updateProgress(a), t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses()
        }

        function w(e) {
            const s = t.params.scrollbar,
                {
                    scrollbar: i,
                    $wrapperEl: n
                } = t,
                {
                    $el: a,
                    $dragEl: l
                } = i;
            h = !0, o = e.target === l[0] || e.target === l ? b(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), n.transition(100), l.transition(100), y(e), clearTimeout(m), a.transition(0), s.hide && a.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), r("scrollbarDragStart", e)
        }

        function _(e) {
            const {
                scrollbar: s,
                $wrapperEl: i
            } = t, {
                $el: n,
                $dragEl: a
            } = s;
            h && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, y(e), i.transition(0), n.transition(0), a.transition(0), r("scrollbarDragMove", e))
        }

        function E(e) {
            const s = t.params.scrollbar,
                {
                    scrollbar: i,
                    $wrapperEl: n
                } = t,
                {
                    $el: a
                } = i;
            h && (h = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), n.transition("")), s.hide && (clearTimeout(m), m = p(() => {
                a.css("opacity", 0), a.transition(400)
            }, 1e3)), r("scrollbarDragEnd", e), s.snapOnRelease && t.slideToClosest())
        }

        function x(e) {
            const {
                scrollbar: s,
                touchEventsTouch: i,
                touchEventsDesktop: n,
                params: r,
                support: o
            } = t, l = s.$el;
            if (!l) return;
            const d = l[0],
                c = !(!o.passiveListener || !r.passiveListeners) && {
                    passive: !1,
                    capture: !1
                },
                p = !(!o.passiveListener || !r.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
            if (!d) return;
            const u = "on" === e ? "addEventListener" : "removeEventListener";
            o.touch ? (d[u](i.start, w, c), d[u](i.move, _, c), d[u](i.end, E, p)) : (d[u](n.start, w, c), a[u](n.move, _, c), a[u](n.end, E, p))
        }

        function T() {
            const {
                scrollbar: e,
                $el: s
            } = t;
            t.params.scrollbar = W(t, t.originalParams.scrollbar, t.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const i = t.params.scrollbar;
            if (!i.el) return;
            let n = d(i.el);
            t.params.uniqueNavElements && "string" == typeof i.el && n.length > 1 && 1 === s.find(i.el).length && (n = s.find(i.el)), n.addClass(t.isHorizontal() ? i.horizontalClass : i.verticalClass);
            let r = n.find("." + t.params.scrollbar.dragClass);
            0 === r.length && (r = d(`<div class="${t.params.scrollbar.dragClass}"></div>`), n.append(r)), Object.assign(e, {
                $el: n,
                el: n[0],
                $dragEl: r,
                dragEl: r[0]
            }), i.draggable && t.params.scrollbar.el && t.scrollbar.el && x("on"), n && n[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }

        function C() {
            const e = t.params.scrollbar,
                s = t.scrollbar.$el;
            s && s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && x("off")
        }
        s({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: "swiper-scrollbar-horizontal",
                verticalClass: "swiper-scrollbar-vertical"
            }
        }), t.scrollbar = {
            el: null,
            dragEl: null,
            $el: null,
            $dragEl: null
        }, n("init", () => {
            !1 === t.params.scrollbar.enabled ? S() : (T(), v(), g())
        }), n("update resize observerUpdate lock unlock", () => {
            v()
        }), n("setTranslate", () => {
            g()
        }), n("setTransition", (e, s) => {
            ! function(e) {
                t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
            }(s)
        }), n("enable disable", () => {
            const {
                $el: e
            } = t.scrollbar;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }), n("destroy", () => {
            C()
        });
        const S = () => {
            t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), C()
        };
        Object.assign(t.scrollbar, {
            enable: () => {
                t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), T(), v(), g()
            },
            disable: S,
            updateSize: v,
            setTranslate: g,
            init: T,
            destroy: C
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            parallax: {
                enabled: !1
            }
        });
        const n = (e, s) => {
                const {
                    rtl: i
                } = t, n = d(e), r = i ? -1 : 1, a = n.attr("data-swiper-parallax") || "0";
                let o = n.attr("data-swiper-parallax-x"),
                    l = n.attr("data-swiper-parallax-y");
                const c = n.attr("data-swiper-parallax-scale"),
                    p = n.attr("data-swiper-parallax-opacity");
                if (o || l ? (o = o || "0", l = l || "0") : t.isHorizontal() ? (o = a, l = "0") : (l = a, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s * r + "%" : o * s * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px", null != p) {
                    const e = p - (p - 1) * (1 - Math.abs(s));
                    n[0].style.opacity = e
                }
                if (null == c) n.transform(`translate3d(${o}, ${l}, 0px)`);
                else {
                    const e = c - (c - 1) * (1 - Math.abs(s));
                    n.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`)
                }
            },
            r = () => {
                const {
                    $el: e,
                    slides: s,
                    progress: i,
                    snapGrid: r
                } = t;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                    n(e, i)
                }), s.each((e, s) => {
                    let a = e.progress;
                    t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (a += Math.ceil(s / 2) - i * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), d(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                        n(e, a)
                    })
                })
            };
        i("beforeInit", () => {
            t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0)
        }), i("init", () => {
            t.params.parallax.enabled && r()
        }), i("setTranslate", () => {
            t.params.parallax.enabled && r()
        }), i("setTransition", (e, s) => {
            t.params.parallax.enabled && function(e) {
                void 0 === e && (e = t.params.speed);
                const {
                    $el: s
                } = t;
                s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(t => {
                    const s = d(t);
                    let i = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (i = 0), s.transition(i)
                })
            }(s)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i,
            emit: n
        } = e;
        const a = r();
        s({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }), t.zoom = {
            enabled: !1
        };
        let o, l, c, p = 1,
            u = !1;
        const f = {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3
            },
            m = {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {}
            },
            g = {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0
            };
        let v = 1;

        function b(e) {
            if (e.targetTouches.length < 2) return 1;
            const t = e.targetTouches[0].pageX,
                s = e.targetTouches[0].pageY,
                i = e.targetTouches[1].pageX,
                n = e.targetTouches[1].pageY;
            return Math.sqrt((i - t) ** 2 + (n - s) ** 2)
        }

        function y(e) {
            const s = t.support,
                i = t.params.zoom;
            if (l = !1, c = !1, !s.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                l = !0, f.scaleStart = b(e)
            }
            f.$slideEl && f.$slideEl.length || (f.$slideEl = d(e.target).closest("." + t.params.slideClass), 0 === f.$slideEl.length && (f.$slideEl = t.slides.eq(t.activeIndex)), f.$imageEl = f.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + i.containerClass), f.maxRatio = f.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== f.$imageWrapEl.length) ? (f.$imageEl && f.$imageEl.transition(0), u = !0) : f.$imageEl = void 0
        }

        function w(e) {
            const s = t.support,
                i = t.params.zoom,
                n = t.zoom;
            if (!s.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                c = !0, f.scaleMove = b(e)
            }
            f.$imageEl && 0 !== f.$imageEl.length ? (s.gestures ? n.scale = e.scale * p : n.scale = f.scaleMove / f.scaleStart * p, n.scale > f.maxRatio && (n.scale = f.maxRatio - 1 + (n.scale - f.maxRatio + 1) ** .5), n.scale < i.minRatio && (n.scale = i.minRatio + 1 - (i.minRatio - n.scale + 1) ** .5), f.$imageEl.transform(`translate3d(0,0,0) scale(${n.scale})`)) : "gesturechange" === e.type && y(e)
        }

        function _(e) {
            const s = t.device,
                i = t.support,
                n = t.params.zoom,
                r = t.zoom;
            if (!i.gestures) {
                if (!l || !c) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !s.android) return;
                l = !1, c = !1
            }
            f.$imageEl && 0 !== f.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, f.maxRatio), n.minRatio), f.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`), p = r.scale, u = !1, 1 === r.scale && (f.$slideEl = void 0))
        }

        function E(e) {
            const s = t.zoom;
            if (!f.$imageEl || 0 === f.$imageEl.length) return;
            if (t.allowClick = !1, !m.isTouched || !f.$slideEl) return;
            m.isMoved || (m.width = f.$imageEl[0].offsetWidth, m.height = f.$imageEl[0].offsetHeight, m.startX = h(f.$imageWrapEl[0], "x") || 0, m.startY = h(f.$imageWrapEl[0], "y") || 0, f.slideWidth = f.$slideEl[0].offsetWidth, f.slideHeight = f.$slideEl[0].offsetHeight, f.$imageWrapEl.transition(0));
            const i = m.width * s.scale,
                n = m.height * s.scale;
            if (!(i < f.slideWidth && n < f.slideHeight)) {
                if (m.minX = Math.min(f.slideWidth / 2 - i / 2, 0), m.maxX = -m.minX, m.minY = Math.min(f.slideHeight / 2 - n / 2, 0), m.maxY = -m.minY, m.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !m.isMoved && !u) {
                    if (t.isHorizontal() && (Math.floor(m.minX) === Math.floor(m.startX) && m.touchesCurrent.x < m.touchesStart.x || Math.floor(m.maxX) === Math.floor(m.startX) && m.touchesCurrent.x > m.touchesStart.x)) return void(m.isTouched = !1);
                    if (!t.isHorizontal() && (Math.floor(m.minY) === Math.floor(m.startY) && m.touchesCurrent.y < m.touchesStart.y || Math.floor(m.maxY) === Math.floor(m.startY) && m.touchesCurrent.y > m.touchesStart.y)) return void(m.isTouched = !1)
                }
                e.cancelable && e.preventDefault(), e.stopPropagation(), m.isMoved = !0, m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX, m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY, m.currentX < m.minX && (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** .8), m.currentX > m.maxX && (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** .8), m.currentY < m.minY && (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** .8), m.currentY > m.maxY && (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** .8), g.prevPositionX || (g.prevPositionX = m.touchesCurrent.x), g.prevPositionY || (g.prevPositionY = m.touchesCurrent.y), g.prevTime || (g.prevTime = Date.now()), g.x = (m.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2, g.y = (m.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2, Math.abs(m.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0), Math.abs(m.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0), g.prevPositionX = m.touchesCurrent.x, g.prevPositionY = m.touchesCurrent.y, g.prevTime = Date.now(), f.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }
        }

        function x() {
            const e = t.zoom;
            f.$slideEl && t.previousIndex !== t.activeIndex && (f.$imageEl && f.$imageEl.transform("translate3d(0,0,0) scale(1)"), f.$imageWrapEl && f.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, p = 1, f.$slideEl = void 0, f.$imageEl = void 0, f.$imageWrapEl = void 0)
        }

        function T(e) {
            const s = t.zoom,
                i = t.params.zoom;
            if (f.$slideEl || (e && e.target && (f.$slideEl = d(e.target).closest("." + t.params.slideClass)), f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? f.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : f.$slideEl = t.slides.eq(t.activeIndex)), f.$imageEl = f.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + i.containerClass)), !f.$imageEl || 0 === f.$imageEl.length || !f.$imageWrapEl || 0 === f.$imageWrapEl.length) return;
            let n, r, o, l, c, u, h, g, v, b, y, w, _, E, x, T, C, S;
            t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), f.$slideEl.addClass("" + i.zoomedSlideClass), void 0 === m.touchesStart.x && e ? (n = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, r = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (n = m.touchesStart.x, r = m.touchesStart.y), s.scale = f.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, p = f.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, e ? (C = f.$slideEl[0].offsetWidth, S = f.$slideEl[0].offsetHeight, o = f.$slideEl.offset().left + a.scrollX, l = f.$slideEl.offset().top + a.scrollY, c = o + C / 2 - n, u = l + S / 2 - r, v = f.$imageEl[0].offsetWidth, b = f.$imageEl[0].offsetHeight, y = v * s.scale, w = b * s.scale, _ = Math.min(C / 2 - y / 2, 0), E = Math.min(S / 2 - w / 2, 0), x = -_, T = -E, h = c * s.scale, g = u * s.scale, h < _ && (h = _), h > x && (h = x), g < E && (g = E), g > T && (g = T)) : (h = 0, g = 0), f.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`), f.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)
        }

        function C() {
            const e = t.zoom,
                s = t.params.zoom;
            f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? f.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : f.$slideEl = t.slides.eq(t.activeIndex), f.$imageEl = f.$slideEl.find("." + s.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + s.containerClass)), f.$imageEl && 0 !== f.$imageEl.length && f.$imageWrapEl && 0 !== f.$imageWrapEl.length && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, p = 1, f.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), f.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), f.$slideEl.removeClass("" + s.zoomedSlideClass), f.$slideEl = void 0)
        }

        function S(e) {
            const s = t.zoom;
            s.scale && 1 !== s.scale ? C() : T(e)
        }

        function M() {
            const e = t.support;
            return {
                passiveListener: !("touchstart" !== t.touchEvents.start || !e.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !e.passiveListener || {
                    passive: !1,
                    capture: !0
                }
            }
        }

        function P() {
            return "." + t.params.slideClass
        }

        function k(e) {
            const {
                passiveListener: s
            } = M(), i = P();
            t.$wrapperEl[e]("gesturestart", i, y, s), t.$wrapperEl[e]("gesturechange", i, w, s), t.$wrapperEl[e]("gestureend", i, _, s)
        }

        function $() {
            o || (o = !0, k("on"))
        }

        function O() {
            o && (o = !1, k("off"))
        }

        function A() {
            const e = t.zoom;
            if (e.enabled) return;
            e.enabled = !0;
            const s = t.support,
                {
                    passiveListener: i,
                    activeListenerWithCapture: n
                } = M(),
                r = P();
            s.gestures ? (t.$wrapperEl.on(t.touchEvents.start, $, i), t.$wrapperEl.on(t.touchEvents.end, O, i)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.on(t.touchEvents.start, r, y, i), t.$wrapperEl.on(t.touchEvents.move, r, w, n), t.$wrapperEl.on(t.touchEvents.end, r, _, i), t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, r, _, i)), t.$wrapperEl.on(t.touchEvents.move, "." + t.params.zoom.containerClass, E, n)
        }

        function L() {
            const e = t.zoom;
            if (!e.enabled) return;
            const s = t.support;
            e.enabled = !1;
            const {
                passiveListener: i,
                activeListenerWithCapture: n
            } = M(), r = P();
            s.gestures ? (t.$wrapperEl.off(t.touchEvents.start, $, i), t.$wrapperEl.off(t.touchEvents.end, O, i)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.off(t.touchEvents.start, r, y, i), t.$wrapperEl.off(t.touchEvents.move, r, w, n), t.$wrapperEl.off(t.touchEvents.end, r, _, i), t.touchEvents.cancel && t.$wrapperEl.off(t.touchEvents.cancel, r, _, i)), t.$wrapperEl.off(t.touchEvents.move, "." + t.params.zoom.containerClass, E, n)
        }
        Object.defineProperty(t.zoom, "scale", {
            get: () => v,
            set(e) {
                if (v !== e) {
                    const t = f.$imageEl ? f.$imageEl[0] : void 0,
                        s = f.$slideEl ? f.$slideEl[0] : void 0;
                    n("zoomChange", e, t, s)
                }
                v = e
            }
        }), i("init", () => {
            t.params.zoom.enabled && A()
        }), i("destroy", () => {
            L()
        }), i("touchStart", (e, s) => {
            t.zoom.enabled && function(e) {
                const s = t.device;
                f.$imageEl && 0 !== f.$imageEl.length && (m.isTouched || (s.android && e.cancelable && e.preventDefault(), m.isTouched = !0, m.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            }(s)
        }), i("touchEnd", (e, s) => {
            t.zoom.enabled && function() {
                const e = t.zoom;
                if (!f.$imageEl || 0 === f.$imageEl.length) return;
                if (!m.isTouched || !m.isMoved) return m.isTouched = !1, void(m.isMoved = !1);
                m.isTouched = !1, m.isMoved = !1;
                let s = 300,
                    i = 300;
                const n = g.x * s,
                    r = m.currentX + n,
                    a = g.y * i,
                    o = m.currentY + a;
                0 !== g.x && (s = Math.abs((r - m.currentX) / g.x)), 0 !== g.y && (i = Math.abs((o - m.currentY) / g.y));
                const l = Math.max(s, i);
                m.currentX = r, m.currentY = o;
                const d = m.width * e.scale,
                    c = m.height * e.scale;
                m.minX = Math.min(f.slideWidth / 2 - d / 2, 0), m.maxX = -m.minX, m.minY = Math.min(f.slideHeight / 2 - c / 2, 0), m.maxY = -m.minY, m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX), m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY), f.$imageWrapEl.transition(l).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }()
        }), i("doubleTap", (e, s) => {
            !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && S(s)
        }), i("transitionEnd", () => {
            t.zoom.enabled && t.params.zoom.enabled && x()
        }), i("slideChange", () => {
            t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && x()
        }), Object.assign(t.zoom, {
            enable: A,
            disable: L,
            in: T,
            out: C,
            toggle: S
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i,
            emit: n
        } = e;
        s({
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        }), t.lazy = {};
        let a = !1,
            o = !1;

        function l(e, s) {
            void 0 === s && (s = !0);
            const i = t.params.lazy;
            if (void 0 === e) return;
            if (0 === t.slides.length) return;
            const r = t.virtual && t.params.virtual.enabled ? t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`) : t.slides.eq(e),
                a = r.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);
            !r.hasClass(i.elementClass) || r.hasClass(i.loadedClass) || r.hasClass(i.loadingClass) || a.push(r[0]), 0 !== a.length && a.each(e => {
                const a = d(e);
                a.addClass(i.loadingClass);
                const o = a.attr("data-background"),
                    c = a.attr("data-src"),
                    p = a.attr("data-srcset"),
                    u = a.attr("data-sizes"),
                    h = a.parent("picture");
                t.loadImage(a[0], c || o, p, u, !1, () => {
                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                        if (o ? (a.css("background-image", `url("${o}")`), a.removeAttr("data-background")) : (p && (a.attr("srcset", p), a.removeAttr("data-srcset")), u && (a.attr("sizes", u), a.removeAttr("data-sizes")), h.length && h.children("source").each(e => {
                                const t = d(e);
                                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                            }), c && (a.attr("src", c), a.removeAttr("data-src"))), a.addClass(i.loadedClass).removeClass(i.loadingClass), r.find("." + i.preloaderClass).remove(), t.params.loop && s) {
                            const e = r.attr("data-swiper-slide-index");
                            r.hasClass(t.params.slideDuplicateClass) ? l(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(), !1) : l(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)
                        }
                        n("lazyImageReady", r[0], a[0]), t.params.autoHeight && t.updateAutoHeight()
                    }
                }), n("lazyImageLoad", r[0], a[0])
            })
        }

        function c() {
            const {
                $wrapperEl: e,
                params: s,
                slides: i,
                activeIndex: n
            } = t, r = t.virtual && s.virtual.enabled, a = s.lazy;
            let c = s.slidesPerView;

            function p(t) {
                if (r) {
                    if (e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length) return !0
                } else if (i[t]) return !0;
                return !1
            }

            function u(e) {
                return r ? d(e).attr("data-swiper-slide-index") : d(e).index()
            }
            if ("auto" === c && (c = 0), o || (o = !0), t.params.watchSlidesProgress) e.children("." + s.slideVisibleClass).each(e => {
                l(r ? d(e).attr("data-swiper-slide-index") : d(e).index())
            });
            else if (c > 1)
                for (let e = n; e < n + c; e += 1) p(e) && l(e);
            else l(n);
            if (a.loadPrevNext)
                if (c > 1 || a.loadPrevNextAmount && a.loadPrevNextAmount > 1) {
                    const e = a.loadPrevNextAmount,
                        t = Math.ceil(c),
                        s = Math.min(n + t + Math.max(e, t), i.length),
                        r = Math.max(n - Math.max(t, e), 0);
                    for (let e = n + t; e < s; e += 1) p(e) && l(e);
                    for (let e = r; e < n; e += 1) p(e) && l(e)
                } else {
                    const t = e.children("." + s.slideNextClass);
                    t.length > 0 && l(u(t));
                    const i = e.children("." + s.slidePrevClass);
                    i.length > 0 && l(u(i))
                }
        }

        function p() {
            const e = r();
            if (!t || t.destroyed) return;
            const s = t.params.lazy.scrollingElement ? d(t.params.lazy.scrollingElement) : d(e),
                i = s[0] === e,
                n = i ? e.innerWidth : s[0].offsetWidth,
                o = i ? e.innerHeight : s[0].offsetHeight,
                l = t.$el.offset(),
                {
                    rtlTranslate: u
                } = t;
            let h = !1;
            u && (l.left -= t.$el[0].scrollLeft);
            const f = [
                [l.left, l.top],
                [l.left + t.width, l.top],
                [l.left, l.top + t.height],
                [l.left + t.width, l.top + t.height]
            ];
            for (let e = 0; e < f.length; e += 1) {
                const t = f[e];
                if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= o) {
                    if (0 === t[0] && 0 === t[1]) continue;
                    h = !0
                }
            }
            const m = !("touchstart" !== t.touchEvents.start || !t.support.passiveListener || !t.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            h ? (c(), s.off("scroll", p, m)) : a || (a = !0, s.on("scroll", p, m))
        }
        i("beforeInit", () => {
            t.params.lazy.enabled && t.params.preloadImages && (t.params.preloadImages = !1)
        }), i("init", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c())
        }), i("scroll", () => {
            t.params.freeMode && t.params.freeMode.enabled && !t.params.freeMode.sticky && c()
        }), i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c())
        }), i("transitionStart", () => {
            t.params.lazy.enabled && (t.params.lazy.loadOnTransitionStart || !t.params.lazy.loadOnTransitionStart && !o) && (t.params.lazy.checkInView ? p() : c())
        }), i("transitionEnd", () => {
            t.params.lazy.enabled && !t.params.lazy.loadOnTransitionStart && (t.params.lazy.checkInView ? p() : c())
        }), i("slideChange", () => {
            const {
                lazy: e,
                cssMode: s,
                watchSlidesProgress: i,
                touchReleaseOnEdges: n,
                resistanceRatio: r
            } = t.params;
            e.enabled && (s || i && (n || 0 === r)) && c()
        }), i("destroy", () => {
            t.$el && t.$el.find("." + t.params.lazy.loadingClass).removeClass(t.params.lazy.loadingClass)
        }), Object.assign(t.lazy, {
            load: c,
            loadInSlide: l
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;

        function n(e, t) {
            const s = function() {
                let e, t, s;
                return (i, n) => {
                    for (t = -1, e = i.length; e - t > 1;) s = e + t >> 1, i[s] <= n ? t = s : e = s;
                    return e
                }
            }();
            let i, n;
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                return e ? (n = s(this.x, e), i = n - 1, (e - this.x[i]) * (this.y[n] - this.y[i]) / (this.x[n] - this.x[i]) + this.y[i]) : 0
            }, this
        }

        function r() {
            t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline)
        }
        s({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }), t.controller = {
            control: void 0
        }, i("beforeInit", () => {
            t.controller.control = t.params.controller.control
        }), i("update", () => {
            r()
        }), i("resize", () => {
            r()
        }), i("observerUpdate", () => {
            r()
        }), i("setTranslate", (e, s, i) => {
            t.controller.control && t.controller.setTranslate(s, i)
        }), i("setTransition", (e, s, i) => {
            t.controller.control && t.controller.setTransition(s, i)
        }), Object.assign(t.controller, {
            setTranslate: function(e, s) {
                const i = t.controller.control;
                let r, a;
                const o = t.constructor;

                function l(e) {
                    const s = t.rtlTranslate ? -t.translate : t.translate;
                    "slide" === t.params.controller.by && (function(e) {
                        t.controller.spline || (t.controller.spline = t.params.loop ? new n(t.slidesGrid, e.slidesGrid) : new n(t.snapGrid, e.snapGrid))
                    }(e), a = -t.controller.spline.interpolate(-s)), a && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), a = (s - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (a = e.maxTranslate() - a), e.updateProgress(a), e.setTranslate(a, t), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(i))
                    for (let e = 0; e < i.length; e += 1) i[e] !== s && i[e] instanceof o && l(i[e]);
                else i instanceof o && s !== i && l(i)
            },
            setTransition: function(e, s) {
                const i = t.constructor,
                    n = t.controller.control;
                let r;

                function a(s) {
                    s.setTransition(e, t), 0 !== e && (s.transitionStart(), s.params.autoHeight && p(() => {
                        s.updateAutoHeight()
                    }), s.$wrapperEl.transitionEnd(() => {
                        n && (s.params.loop && "slide" === t.params.controller.by && s.loopFix(), s.transitionEnd())
                    }))
                }
                if (Array.isArray(n))
                    for (r = 0; r < n.length; r += 1) n[r] !== s && n[r] instanceof i && a(n[r]);
                else n instanceof i && s !== n && a(n)
            }
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null
            }
        }), t.a11y = {
            clicked: !1
        };
        let n = null;

        function r(e) {
            const t = n;
            0 !== t.length && (t.html(""), t.html(e))
        }

        function a(e) {
            e.attr("tabIndex", "0")
        }

        function o(e) {
            e.attr("tabIndex", "-1")
        }

        function l(e, t) {
            e.attr("role", t)
        }

        function c(e, t) {
            e.attr("aria-roledescription", t)
        }

        function p(e, t) {
            e.attr("aria-label", t)
        }

        function u(e) {
            e.attr("aria-disabled", !0)
        }

        function h(e) {
            e.attr("aria-disabled", !1)
        }

        function f(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode) return;
            const s = t.params.a11y,
                i = d(e.target);
            t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)), t.pagination && i.is(q(t.params.pagination.bulletClass)) && i[0].click()
        }

        function m() {
            return t.pagination && t.pagination.bullets && t.pagination.bullets.length
        }

        function g() {
            return m() && t.params.pagination.clickable
        }
        const v = (e, t, s) => {
                a(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", f)), p(e, s),
                    function(e, t) {
                        e.attr("aria-controls", t)
                    }(e, t)
            },
            b = () => {
                t.a11y.clicked = !0
            },
            y = () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        t.destroyed || (t.a11y.clicked = !1)
                    })
                })
            },
            w = e => {
                if (t.a11y.clicked) return;
                const s = e.target.closest("." + t.params.slideClass);
                if (!s || !t.slides.includes(s)) return;
                const i = t.slides.indexOf(s) === t.activeIndex,
                    n = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s);
                i || n || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(s), 0))
            },
            _ = () => {
                const e = t.params.a11y;
                e.itemRoleDescriptionMessage && c(d(t.slides), e.itemRoleDescriptionMessage), e.slideRole && l(d(t.slides), e.slideRole);
                const s = t.params.loop ? t.slides.filter(e => !e.classList.contains(t.params.slideDuplicateClass)).length : t.slides.length;
                e.slideLabelMessage && t.slides.each((i, n) => {
                    const r = d(i),
                        a = t.params.loop ? parseInt(r.attr("data-swiper-slide-index"), 10) : n;
                    p(r, e.slideLabelMessage.replace(/\{\{index\}\}/, a + 1).replace(/\{\{slidesLength\}\}/, s))
                })
            };
        i("beforeInit", () => {
            n = d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
        }), i("afterInit", () => {
            t.params.a11y.enabled && (() => {
                const e = t.params.a11y;
                t.$el.append(n);
                const s = t.$el;
                e.containerRoleDescriptionMessage && c(s, e.containerRoleDescriptionMessage), e.containerMessage && p(s, e.containerMessage);
                const i = t.$wrapperEl,
                    r = e.id || i.attr("id") || "swiper-wrapper-" + (void 0 === (a = 16) && (a = 16), "x".repeat(a).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)));
                var a;
                const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
                var l;
                let d, u;
                l = r, i.attr("id", l),
                    function(e, t) {
                        e.attr("aria-live", t)
                    }(i, o), _(), t.navigation && t.navigation.$nextEl && (d = t.navigation.$nextEl), t.navigation && t.navigation.$prevEl && (u = t.navigation.$prevEl), d && d.length && v(d, r, e.nextSlideMessage), u && u.length && v(u, r, e.prevSlideMessage), g() && t.pagination.$el.on("keydown", q(t.params.pagination.bulletClass), f), t.$el.on("focus", w, !0), t.$el.on("pointerdown", b, !0), t.$el.on("pointerup", y, !0)
            })()
        }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
            t.params.a11y.enabled && _()
        }), i("fromEdge toEdge afterInit lock unlock", () => {
            t.params.a11y.enabled && function() {
                if (t.params.loop || t.params.rewind || !t.navigation) return;
                const {
                    $nextEl: e,
                    $prevEl: s
                } = t.navigation;
                s && s.length > 0 && (t.isBeginning ? (u(s), o(s)) : (h(s), a(s))), e && e.length > 0 && (t.isEnd ? (u(e), o(e)) : (h(e), a(e)))
            }()
        }), i("paginationUpdate", () => {
            t.params.a11y.enabled && function() {
                const e = t.params.a11y;
                m() && t.pagination.bullets.each(s => {
                    const i = d(s);
                    t.params.pagination.clickable && (a(i), t.params.pagination.renderBullet || (l(i, "button"), p(i, e.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))), i.is("." + t.params.pagination.bulletActiveClass) ? i.attr("aria-current", "true") : i.removeAttr("aria-current")
                })
            }()
        }), i("destroy", () => {
            t.params.a11y.enabled && function() {
                let e, s;
                n && n.length > 0 && n.remove(), t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl), t.navigation && t.navigation.$prevEl && (s = t.navigation.$prevEl), e && e.off("keydown", f), s && s.off("keydown", f), g() && t.pagination.$el.off("keydown", q(t.params.pagination.bulletClass), f), t.$el.off("focus", w, !0), t.$el.off("pointerdown", b, !0), t.$el.off("pointerup", y, !0)
            }()
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides",
                keepQuery: !1
            }
        });
        let n = !1,
            a = {};
        const o = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
            l = e => {
                const t = r();
                let s;
                s = e ? new URL(e) : t.location;
                const i = s.pathname.slice(1).split("/").filter(e => "" !== e),
                    n = i.length;
                return {
                    key: i[n - 2],
                    value: i[n - 1]
                }
            },
            d = (e, s) => {
                const i = r();
                if (!n || !t.params.history.enabled) return;
                let a;
                a = t.params.url ? new URL(t.params.url) : i.location;
                const l = t.slides.eq(s);
                let d = o(l.attr("data-history"));
                if (t.params.history.root.length > 0) {
                    let s = t.params.history.root;
                    "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), d = `${s}/${e}/${d}`
                } else a.pathname.includes(e) || (d = `${e}/${d}`);
                t.params.history.keepQuery && (d += a.search);
                const c = i.history.state;
                c && c.value === d || (t.params.history.replaceState ? i.history.replaceState({
                    value: d
                }, null, d) : i.history.pushState({
                    value: d
                }, null, d))
            },
            c = (e, s, i) => {
                if (s)
                    for (let n = 0, r = t.slides.length; n < r; n += 1) {
                        const r = t.slides.eq(n);
                        if (o(r.attr("data-history")) === s && !r.hasClass(t.params.slideDuplicateClass)) {
                            const s = r.index();
                            t.slideTo(s, e, i)
                        }
                    } else t.slideTo(0, e, i)
            },
            p = () => {
                a = l(t.params.url), c(t.params.speed, a.value, !1)
            };
        i("init", () => {
            t.params.history.enabled && (() => {
                const e = r();
                if (t.params.history) {
                    if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void(t.params.hashNavigation.enabled = !0);
                    n = !0, a = l(t.params.url), (a.key || a.value) && (c(0, a.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", p))
                }
            })()
        }), i("destroy", () => {
            t.params.history.enabled && (() => {
                const e = r();
                t.params.history.replaceState || e.removeEventListener("popstate", p)
            })()
        }), i("transitionEnd _freeModeNoMomentumRelease", () => {
            n && d(t.params.history.key, t.activeIndex)
        }), i("slideChange", () => {
            n && t.params.cssMode && d(t.params.history.key, t.activeIndex)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            emit: n,
            on: a
        } = e, o = !1;
        const l = i(),
            c = r();
        s({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        });
        const p = () => {
                n("hashChange");
                const e = l.location.hash.replace("#", "");
                if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                    const s = t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();
                    if (void 0 === s) return;
                    t.slideTo(s)
                }
            },
            u = () => {
                if (o && t.params.hashNavigation.enabled)
                    if (t.params.hashNavigation.replaceState && c.history && c.history.replaceState) c.history.replaceState(null, null, "#" + t.slides.eq(t.activeIndex).attr("data-hash") || ""), n("hashSet");
                    else {
                        const e = t.slides.eq(t.activeIndex),
                            s = e.attr("data-hash") || e.attr("data-history");
                        l.location.hash = s || "", n("hashSet")
                    }
            };
        a("init", () => {
            t.params.hashNavigation.enabled && (() => {
                if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return;
                o = !0;
                const e = l.location.hash.replace("#", "");
                if (e) {
                    const s = 0;
                    for (let i = 0, n = t.slides.length; i < n; i += 1) {
                        const n = t.slides.eq(i);
                        if ((n.attr("data-hash") || n.attr("data-history")) === e && !n.hasClass(t.params.slideDuplicateClass)) {
                            const e = n.index();
                            t.slideTo(e, s, t.params.runCallbacksOnInit, !0)
                        }
                    }
                }
                t.params.hashNavigation.watchState && d(c).on("hashchange", p)
            })()
        }), a("destroy", () => {
            t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d(c).off("hashchange", p)
        }), a("transitionEnd _freeModeNoMomentumRelease", () => {
            o && u()
        }), a("slideChange", () => {
            o && t.params.cssMode && u()
        })
    }, function(e) {
        let t, {
            swiper: s,
            extendParams: n,
            on: r,
            emit: a
        } = e;

        function o() {
            if (!s.size) return s.autoplay.running = !1, void(s.autoplay.paused = !1);
            const e = s.slides.eq(s.activeIndex);
            let i = s.params.autoplay.delay;
            e.attr("data-swiper-autoplay") && (i = e.attr("data-swiper-autoplay") || s.params.autoplay.delay), clearTimeout(t), t = p(() => {
                let e;
                s.params.autoplay.reverseDirection ? s.params.loop ? (s.loopFix(), e = s.slidePrev(s.params.speed, !0, !0), a("autoplay")) : s.isBeginning ? s.params.autoplay.stopOnLastSlide ? d() : (e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0), a("autoplay")) : (e = s.slidePrev(s.params.speed, !0, !0), a("autoplay")) : s.params.loop ? (s.loopFix(), e = s.slideNext(s.params.speed, !0, !0), a("autoplay")) : s.isEnd ? s.params.autoplay.stopOnLastSlide ? d() : (e = s.slideTo(0, s.params.speed, !0, !0), a("autoplay")) : (e = s.slideNext(s.params.speed, !0, !0), a("autoplay")), (s.params.cssMode && s.autoplay.running || !1 === e) && o()
            }, i)
        }

        function l() {
            return void 0 === t && !s.autoplay.running && (s.autoplay.running = !0, a("autoplayStart"), o(), !0)
        }

        function d() {
            return !!s.autoplay.running && void 0 !== t && (t && (clearTimeout(t), t = void 0), s.autoplay.running = !1, a("autoplayStop"), !0)
        }

        function c(e) {
            s.autoplay.running && (s.autoplay.paused || (t && clearTimeout(t), s.autoplay.paused = !0, 0 !== e && s.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(e => {
                s.$wrapperEl[0].addEventListener(e, h)
            }) : (s.autoplay.paused = !1, o())))
        }

        function u() {
            const e = i();
            "hidden" === e.visibilityState && s.autoplay.running && c(), "visible" === e.visibilityState && s.autoplay.paused && (o(), s.autoplay.paused = !1)
        }

        function h(e) {
            s && !s.destroyed && s.$wrapperEl && e.target === s.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(e => {
                s.$wrapperEl[0].removeEventListener(e, h)
            }), s.autoplay.paused = !1, s.autoplay.running ? o() : d())
        }

        function f() {
            s.params.autoplay.disableOnInteraction ? d() : (a("autoplayPause"), c()), ["transitionend", "webkitTransitionEnd"].forEach(e => {
                s.$wrapperEl[0].removeEventListener(e, h)
            })
        }

        function m() {
            s.params.autoplay.disableOnInteraction || (s.autoplay.paused = !1, a("autoplayResume"), o())
        }
        s.autoplay = {
            running: !1,
            paused: !1
        }, n({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        }), r("init", () => {
            s.params.autoplay.enabled && (l(), i().addEventListener("visibilitychange", u), s.params.autoplay.pauseOnMouseEnter && (s.$el.on("mouseenter", f), s.$el.on("mouseleave", m)))
        }), r("beforeTransitionStart", (e, t, i) => {
            s.autoplay.running && (i || !s.params.autoplay.disableOnInteraction ? s.autoplay.pause(t) : d())
        }), r("sliderFirstMove", () => {
            s.autoplay.running && (s.params.autoplay.disableOnInteraction ? d() : c())
        }), r("touchEnd", () => {
            s.params.cssMode && s.autoplay.paused && !s.params.autoplay.disableOnInteraction && o()
        }), r("destroy", () => {
            s.$el.off("mouseenter", f), s.$el.off("mouseleave", m), s.autoplay.running && d(), i().removeEventListener("visibilitychange", u)
        }), Object.assign(s.autoplay, {
            pause: c,
            run: o,
            start: l,
            stop: d
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let n = !1,
            r = !1;

        function a() {
            const e = t.thumbs.swiper;
            if (!e || e.destroyed) return;
            const s = e.clickedIndex,
                i = e.clickedSlide;
            if (i && d(i).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
            if (null == s) return;
            let n;
            if (n = e.params.loop ? parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10) : s, t.params.loop) {
                let e = t.activeIndex;
                t.slides.eq(e).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, e = t.activeIndex);
                const s = t.slides.eq(e).prevAll(`[data-swiper-slide-index="${n}"]`).eq(0).index(),
                    i = t.slides.eq(e).nextAll(`[data-swiper-slide-index="${n}"]`).eq(0).index();
                n = void 0 === s ? i : void 0 === i ? s : i - e < e - s ? i : s
            }
            t.slideTo(n)
        }

        function o() {
            const {
                thumbs: e
            } = t.params;
            if (n) return !1;
            n = !0;
            const s = t.constructor;
            if (e.swiper instanceof s) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), Object.assign(t.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            });
            else if (f(e.swiper)) {
                const i = Object.assign({}, e.swiper);
                Object.assign(i, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), t.thumbs.swiper = new s(i), r = !0
            }
            return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", a), !0
        }

        function l(e) {
            const s = t.thumbs.swiper;
            if (!s || s.destroyed) return;
            const i = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
            let n = 1;
            const r = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (n = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (n = 1), n = Math.floor(n), s.slides.removeClass(r), s.params.loop || s.params.virtual && s.params.virtual.enabled)
                for (let e = 0; e < n; e += 1) s.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex+e}"]`).addClass(r);
            else
                for (let e = 0; e < n; e += 1) s.slides.eq(t.realIndex + e).addClass(r);
            const a = t.params.thumbs.autoScrollOffset,
                o = a && !s.params.loop;
            if (t.realIndex !== s.realIndex || o) {
                let n, r, l = s.activeIndex;
                if (s.params.loop) {
                    s.slides.eq(l).hasClass(s.params.slideDuplicateClass) && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, l = s.activeIndex);
                    const e = s.slides.eq(l).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),
                        i = s.slides.eq(l).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                    n = void 0 === e ? i : void 0 === i ? e : i - l == l - e ? s.params.slidesPerGroup > 1 ? i : l : i - l < l - e ? i : e, r = t.activeIndex > t.previousIndex ? "next" : "prev"
                } else n = t.realIndex, r = n > t.previousIndex ? "next" : "prev";
                o && (n += "next" === r ? a : -1 * a), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(n) < 0 && (s.params.centeredSlides ? n = n > l ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > l && s.params.slidesPerGroup, s.slideTo(n, e ? 0 : void 0))
            }
        }
        t.thumbs = {
            swiper: null
        }, i("beforeInit", () => {
            const {
                thumbs: e
            } = t.params;
            e && e.swiper && (o(), l(!0))
        }), i("slideChange update resize observerUpdate", () => {
            l()
        }), i("setTransition", (e, s) => {
            const i = t.thumbs.swiper;
            i && !i.destroyed && i.setTransition(s)
        }), i("beforeDestroy", () => {
            const e = t.thumbs.swiper;
            e && !e.destroyed && r && e.destroy()
        }), Object.assign(t.thumbs, {
            init: o,
            update: l
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            emit: i,
            once: n
        } = e;
        s({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }), Object.assign(t, {
            freeMode: {
                onTouchStart: function() {
                    const e = t.getTranslate();
                    t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({
                        currentPos: t.rtl ? t.translate : -t.translate
                    })
                },
                onTouchMove: function() {
                    const {
                        touchEventsData: e,
                        touches: s
                    } = t;
                    0 === e.velocities.length && e.velocities.push({
                        position: s[t.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime
                    }), e.velocities.push({
                        position: s[t.isHorizontal() ? "currentX" : "currentY"],
                        time: u()
                    })
                },
                onTouchEnd: function(e) {
                    let {
                        currentPos: s
                    } = e;
                    const {
                        params: r,
                        $wrapperEl: a,
                        rtlTranslate: o,
                        snapGrid: l,
                        touchEventsData: d
                    } = t, c = u() - d.touchStartTime;
                    if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
                    else if (s > -t.maxTranslate()) t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1);
                    else {
                        if (r.freeMode.momentum) {
                            if (d.velocities.length > 1) {
                                const e = d.velocities.pop(),
                                    s = d.velocities.pop(),
                                    i = e.position - s.position,
                                    n = e.time - s.time;
                                t.velocity = i / n, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (n > 150 || u() - e.time > 300) && (t.velocity = 0)
                            } else t.velocity = 0;
                            t.velocity *= r.freeMode.momentumVelocityRatio, d.velocities.length = 0;
                            let e = 1e3 * r.freeMode.momentumRatio;
                            const s = t.velocity * e;
                            let c = t.translate + s;
                            o && (c = -c);
                            let p, h = !1;
                            const f = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                            let m;
                            if (c < t.maxTranslate()) r.freeMode.momentumBounce ? (c + t.maxTranslate() < -f && (c = t.maxTranslate() - f), p = t.maxTranslate(), h = !0, d.allowMomentumBounce = !0) : c = t.maxTranslate(), r.loop && r.centeredSlides && (m = !0);
                            else if (c > t.minTranslate()) r.freeMode.momentumBounce ? (c - t.minTranslate() > f && (c = t.minTranslate() + f), p = t.minTranslate(), h = !0, d.allowMomentumBounce = !0) : c = t.minTranslate(), r.loop && r.centeredSlides && (m = !0);
                            else if (r.freeMode.sticky) {
                                let e;
                                for (let t = 0; t < l.length; t += 1)
                                    if (l[t] > -c) {
                                        e = t;
                                        break
                                    }
                                c = Math.abs(l[e] - c) < Math.abs(l[e - 1] - c) || "next" === t.swipeDirection ? l[e] : l[e - 1], c = -c
                            }
                            if (m && n("transitionEnd", () => {
                                    t.loopFix()
                                }), 0 !== t.velocity) {
                                if (e = o ? Math.abs((-c - t.translate) / t.velocity) : Math.abs((c - t.translate) / t.velocity), r.freeMode.sticky) {
                                    const s = Math.abs((o ? -c : c) - t.translate),
                                        i = t.slidesSizesGrid[t.activeIndex];
                                    e = s < i ? r.speed : s < 2 * i ? 1.5 * r.speed : 2.5 * r.speed
                                }
                            } else if (r.freeMode.sticky) return void t.slideToClosest();
                            r.freeMode.momentumBounce && h ? (t.updateProgress(p), t.setTransition(e), t.setTranslate(c), t.transitionStart(!0, t.swipeDirection), t.animating = !0, a.transitionEnd(() => {
                                t && !t.destroyed && d.allowMomentumBounce && (i("momentumBounce"), t.setTransition(r.speed), setTimeout(() => {
                                    t.setTranslate(p), a.transitionEnd(() => {
                                        t && !t.destroyed && t.transitionEnd()
                                    })
                                }, 0))
                            })) : t.velocity ? (i("_freeModeNoMomentumRelease"), t.updateProgress(c), t.setTransition(e), t.setTranslate(c), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, a.transitionEnd(() => {
                                t && !t.destroyed && t.transitionEnd()
                            }))) : t.updateProgress(c), t.updateActiveIndex(), t.updateSlidesClasses()
                        } else {
                            if (r.freeMode.sticky) return void t.slideToClosest();
                            r.freeMode && i("_freeModeNoMomentumRelease")
                        }(!r.freeMode.momentum || c >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                    }
                }
            }
        })
    }, function(e) {
        let t, s, i, {
            swiper: n,
            extendParams: r
        } = e;
        r({
            grid: {
                rows: 1,
                fill: "column"
            }
        }), n.grid = {
            initSlides: e => {
                const {
                    slidesPerView: r
                } = n.params, {
                    rows: a,
                    fill: o
                } = n.params.grid;
                s = t / a, i = Math.floor(e / a), t = Math.floor(e / a) === e / a ? e : Math.ceil(e / a) * a, "auto" !== r && "row" === o && (t = Math.max(t, r * a))
            },
            updateSlide: (e, r, a, o) => {
                const {
                    slidesPerGroup: l,
                    spaceBetween: d
                } = n.params, {
                    rows: c,
                    fill: p
                } = n.params.grid;
                let u, h, f;
                if ("row" === p && l > 1) {
                    const s = Math.floor(e / (l * c)),
                        i = e - c * l * s,
                        n = 0 === s ? l : Math.min(Math.ceil((a - s * c * l) / c), l);
                    f = Math.floor(i / n), h = i - f * n + s * l, u = h + f * t / c, r.css({
                        "-webkit-order": u,
                        order: u
                    })
                } else "column" === p ? (h = Math.floor(e / c), f = e - h * c, (h > i || h === i && f === c - 1) && (f += 1, f >= c && (f = 0, h += 1))) : (f = Math.floor(e / s), h = e - f * s);
                r.css(o("margin-top"), 0 !== f ? d && d + "px" : "")
            },
            updateWrapperSize: (e, s, i) => {
                const {
                    spaceBetween: r,
                    centeredSlides: a,
                    roundLengths: o
                } = n.params, {
                    rows: l
                } = n.params.grid;
                if (n.virtualSize = (e + r) * t, n.virtualSize = Math.ceil(n.virtualSize / l) - r, n.$wrapperEl.css({
                        [i("width")]: n.virtualSize + r + "px"
                    }), a) {
                    s.splice(0, s.length);
                    const e = [];
                    for (let t = 0; t < s.length; t += 1) {
                        let i = s[t];
                        o && (i = Math.floor(i)), s[t] < n.virtualSize + s[0] && e.push(i)
                    }
                    s.push(...e)
                }
            }
        }
    }, function(e) {
        let {
            swiper: t
        } = e;
        Object.assign(t, {
            appendSlide: R.bind(t),
            prependSlide: F.bind(t),
            addSlide: Y.bind(t),
            removeSlide: G.bind(t),
            removeAllSlides: X.bind(t)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            fadeEffect: {
                crossFade: !1,
                transformEl: null
            }
        }), V({
            effect: "fade",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {
                    slides: e
                } = t, s = t.params.fadeEffect;
                for (let i = 0; i < e.length; i += 1) {
                    const e = t.slides.eq(i);
                    let n = -e[0].swiperSlideOffset;
                    t.params.virtualTranslate || (n -= t.translate);
                    let r = 0;
                    t.isHorizontal() || (r = n, n = 0);
                    const a = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                    U(s, e).css({
                        opacity: a
                    }).transform(`translate3d(${n}px, ${r}px, 0px)`)
                }
            },
            setTransition: e => {
                const {
                    transformEl: s
                } = t.params.fadeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: s,
                    allSlides: !0
                })
            },
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        });
        const n = (e, t, s) => {
            let i = s ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                n = s ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === i.length && (i = d(`<div class="swiper-slide-shadow-${s?"left":"top"}"></div>`), e.append(i)), 0 === n.length && (n = d(`<div class="swiper-slide-shadow-${s?"right":"bottom"}"></div>`), e.append(n)), i.length && (i[0].style.opacity = Math.max(-t, 0)), n.length && (n[0].style.opacity = Math.max(t, 0))
        };
        V({
            effect: "cube",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {
                    $el: e,
                    $wrapperEl: s,
                    slides: i,
                    width: r,
                    height: a,
                    rtlTranslate: o,
                    size: l,
                    browser: c
                } = t, p = t.params.cubeEffect, u = t.isHorizontal(), h = t.virtual && t.params.virtual.enabled;
                let f, m = 0;
                p.shadow && (u ? (f = s.find(".swiper-cube-shadow"), 0 === f.length && (f = d('<div class="swiper-cube-shadow"></div>'), s.append(f)), f.css({
                    height: r + "px"
                })) : (f = e.find(".swiper-cube-shadow"), 0 === f.length && (f = d('<div class="swiper-cube-shadow"></div>'), e.append(f))));
                for (let e = 0; e < i.length; e += 1) {
                    const t = i.eq(e);
                    let s = e;
                    h && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                    let r = 90 * s,
                        a = Math.floor(r / 360);
                    o && (r = -r, a = Math.floor(-r / 360));
                    const d = Math.max(Math.min(t[0].progress, 1), -1);
                    let c = 0,
                        f = 0,
                        g = 0;
                    s % 4 == 0 ? (c = 4 * -a * l, g = 0) : (s - 1) % 4 == 0 ? (c = 0, g = 4 * -a * l) : (s - 2) % 4 == 0 ? (c = l + 4 * a * l, g = l) : (s - 3) % 4 == 0 && (c = -l, g = 3 * l + 4 * l * a), o && (c = -c), u || (f = c, c = 0);
                    const v = `rotateX(${u?0:-r}deg) rotateY(${u?r:0}deg) translate3d(${c}px, ${f}px, ${g}px)`;
                    d <= 1 && d > -1 && (m = 90 * s + 90 * d, o && (m = 90 * -s - 90 * d)), t.transform(v), p.slideShadows && n(t, d, u)
                }
                if (s.css({
                        "-webkit-transform-origin": `50% 50% -${l/2}px`,
                        "transform-origin": `50% 50% -${l/2}px`
                    }), p.shadow)
                    if (u) f.transform(`translate3d(0px, ${r/2+p.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`);
                    else {
                        const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                            t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                            s = p.shadowScale,
                            i = p.shadowScale / t,
                            n = p.shadowOffset;
                        f.transform(`scale3d(${s}, 1, ${i}) translate3d(0px, ${a/2+n}px, ${-a/2/i}px) rotateX(-90deg)`)
                    }
                const g = c.isSafari || c.isWebView ? -l / 2 : 0;
                s.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal()?0:m}deg) rotateY(${t.isHorizontal()?-m:0}deg)`), s[0].style.setProperty("--swiper-cube-translate-z", g + "px")
            },
            setTransition: e => {
                const {
                    $el: s,
                    slides: i
                } = t;
                i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && s.find(".swiper-cube-shadow").transition(e)
            },
            recreateShadows: () => {
                const e = t.isHorizontal();
                t.slides.each(t => {
                    const s = Math.max(Math.min(t.progress, 1), -1);
                    n(d(t), s, e)
                })
            },
            getEffectParams: () => t.params.cubeEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0,
                transformEl: null
            }
        });
        const n = (e, s, i) => {
            let n = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                r = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === n.length && (n = K(i, e, t.isHorizontal() ? "left" : "top")), 0 === r.length && (r = K(i, e, t.isHorizontal() ? "right" : "bottom")), n.length && (n[0].style.opacity = Math.max(-s, 0)), r.length && (r[0].style.opacity = Math.max(s, 0))
        };
        V({
            effect: "flip",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {
                    slides: e,
                    rtlTranslate: s
                } = t, i = t.params.flipEffect;
                for (let r = 0; r < e.length; r += 1) {
                    const a = e.eq(r);
                    let o = a[0].progress;
                    t.params.flipEffect.limitRotation && (o = Math.max(Math.min(a[0].progress, 1), -1));
                    const l = a[0].swiperSlideOffset;
                    let d = -180 * o,
                        c = 0,
                        p = t.params.cssMode ? -l - t.translate : -l,
                        u = 0;
                    t.isHorizontal() ? s && (d = -d) : (u = p, p = 0, c = -d, d = 0), a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length, i.slideShadows && n(a, o, i);
                    const h = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
                    U(i, a).transform(h)
                }
            },
            setTransition: e => {
                const {
                    transformEl: s
                } = t.params.flipEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: s
                })
            },
            recreateShadows: () => {
                const e = t.params.flipEffect;
                t.slides.each(s => {
                    const i = d(s);
                    let r = i[0].progress;
                    t.params.flipEffect.limitRotation && (r = Math.max(Math.min(s.progress, 1), -1)), n(i, r, e)
                })
            },
            getEffectParams: () => t.params.flipEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
                transformEl: null
            }
        }), V({
            effect: "coverflow",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {
                    width: e,
                    height: s,
                    slides: i,
                    slidesSizesGrid: n
                } = t, r = t.params.coverflowEffect, a = t.isHorizontal(), o = t.translate, l = a ? e / 2 - o : s / 2 - o, d = a ? r.rotate : -r.rotate, c = r.depth;
                for (let e = 0, t = i.length; e < t; e += 1) {
                    const t = i.eq(e),
                        s = n[e],
                        o = (l - t[0].swiperSlideOffset - s / 2) / s,
                        p = "function" == typeof r.modifier ? r.modifier(o) : o * r.modifier;
                    let u = a ? d * p : 0,
                        h = a ? 0 : d * p,
                        f = -c * Math.abs(p),
                        m = r.stretch;
                    "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(r.stretch) / 100 * s);
                    let g = a ? 0 : m * p,
                        v = a ? m * p : 0,
                        b = 1 - (1 - r.scale) * Math.abs(p);
                    Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(u) < .001 && (u = 0), Math.abs(h) < .001 && (h = 0), Math.abs(b) < .001 && (b = 0);
                    const y = `translate3d(${v}px,${g}px,${f}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${b})`;
                    if (U(r, t).transform(y), t[0].style.zIndex = 1 - Math.abs(Math.round(p)), r.slideShadows) {
                        let e = a ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                            s = a ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = K(r, t, a ? "left" : "top")), 0 === s.length && (s = K(r, t, a ? "right" : "bottom")), e.length && (e[0].style.opacity = p > 0 ? p : 0), s.length && (s[0].style.opacity = -p > 0 ? -p : 0)
                    }
                }
            },
            setTransition: e => {
                const {
                    transformEl: s
                } = t.params.coverflowEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            },
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            creativeEffect: {
                transformEl: null,
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const n = e => "string" == typeof e ? e : e + "px";
        V({
            effect: "creative",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {
                    slides: e,
                    $wrapperEl: s,
                    slidesSizesGrid: i
                } = t, r = t.params.creativeEffect, {
                    progressMultiplier: a
                } = r, o = t.params.centeredSlides;
                if (o) {
                    const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
                    s.transform(`translateX(calc(50% - ${e}px))`)
                }
                for (let s = 0; s < e.length; s += 1) {
                    const i = e.eq(s),
                        l = i[0].progress,
                        d = Math.min(Math.max(i[0].progress, -r.limitProgress), r.limitProgress);
                    let c = d;
                    o || (c = Math.min(Math.max(i[0].originalProgress, -r.limitProgress), r.limitProgress));
                    const p = i[0].swiperSlideOffset,
                        u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
                        h = [0, 0, 0];
                    let f = !1;
                    t.isHorizontal() || (u[1] = u[0], u[0] = 0);
                    let m = {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    };
                    d < 0 ? (m = r.next, f = !0) : d > 0 && (m = r.prev, f = !0), u.forEach((e, t) => {
                        u[t] = `calc(${e}px + (${n(m.translate[t])} * ${Math.abs(d*a)}))`
                    }), h.forEach((e, t) => {
                        h[t] = m.rotate[t] * Math.abs(d * a)
                    }), i[0].style.zIndex = -Math.abs(Math.round(l)) + e.length;
                    const g = u.join(", "),
                        v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                        b = c < 0 ? `scale(${1+(1-m.scale)*c*a})` : `scale(${1-(1-m.scale)*c*a})`,
                        y = c < 0 ? 1 + (1 - m.opacity) * c * a : 1 - (1 - m.opacity) * c * a,
                        w = `translate3d(${g}) ${v} ${b}`;
                    if (f && m.shadow || !f) {
                        let e = i.children(".swiper-slide-shadow");
                        if (0 === e.length && m.shadow && (e = K(r, i)), e.length) {
                            const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const _ = U(r, i);
                    _.transform(w).css({
                        opacity: y
                    }), m.origin && _.css("transform-origin", m.origin)
                }
            },
            setTransition: e => {
                const {
                    transformEl: s
                } = t.params.creativeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: s,
                    allSlides: !0
                })
            },
            perspective: () => t.params.creativeEffect.perspective,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: s,
            on: i
        } = e;
        s({
            cardsEffect: {
                slideShadows: !0,
                transformEl: null,
                rotate: !0,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        }), V({
            effect: "cards",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {
                    slides: e,
                    activeIndex: s
                } = t, i = t.params.cardsEffect, {
                    startTranslate: n,
                    isTouched: r
                } = t.touchEventsData, a = t.translate;
                for (let o = 0; o < e.length; o += 1) {
                    const l = e.eq(o),
                        d = l[0].progress,
                        c = Math.min(Math.max(d, -4), 4);
                    let p = l[0].swiperSlideOffset;
                    t.params.centeredSlides && !t.params.cssMode && t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (p -= e[0].swiperSlideOffset);
                    let u = t.params.cssMode ? -p - t.translate : -p,
                        h = 0;
                    const f = -100 * Math.abs(c);
                    let m = 1,
                        g = -i.perSlideRotate * c,
                        v = i.perSlideOffset - .75 * Math.abs(c);
                    const b = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o,
                        y = (b === s || b === s - 1) && c > 0 && c < 1 && (r || t.params.cssMode) && a < n,
                        w = (b === s || b === s + 1) && c < 0 && c > -1 && (r || t.params.cssMode) && a > n;
                    if (y || w) {
                        const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
                        g += -28 * c * e, m += -.5 * e, v += 96 * e, h = -25 * e * Math.abs(c) + "%"
                    }
                    if (u = c < 0 ? `calc(${u}px + (${v*Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v*Math.abs(c)}%))` : u + "px", !t.isHorizontal()) {
                        const e = h;
                        h = u, u = e
                    }
                    const _ = c < 0 ? "" + (1 + (1 - m) * c) : "" + (1 - (1 - m) * c),
                        E = `\n        translate3d(${u}, ${h}, ${f}px)\n        rotateZ(${i.rotate?g:0}deg)\n        scale(${_})\n      `;
                    if (i.slideShadows) {
                        let e = l.find(".swiper-slide-shadow");
                        0 === e.length && (e = K(i, l)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
                    }
                    l[0].style.zIndex = -Math.abs(Math.round(d)) + e.length, U(i, l).transform(E)
                }
            },
            setTransition: e => {
                const {
                    transformEl: s
                } = t.params.cardsEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: s
                })
            },
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }];
    return H.use(Z), H
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e || self).Typed = t()
}(this, (function() {
    function e() {
        return (e = Object.assign ? Object.assign.bind() : function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = arguments[t];
                for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
            }
            return e
        }).apply(this, arguments)
    }
    var t = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            smartBackspace: !0,
            shuffle: !1,
            backDelay: 700,
            fadeOut: !1,
            fadeOutClass: "typed-fade-out",
            fadeOutDelay: 500,
            loop: !1,
            loopCount: 1 / 0,
            showCursor: !0,
            cursorChar: "|",
            autoInsertCss: !0,
            attr: null,
            bindInputFocusEvents: !1,
            contentType: "html",
            onBegin: function(e) {},
            onComplete: function(e) {},
            preStringTyped: function(e, t) {},
            onStringTyped: function(e, t) {},
            onLastStringBackspaced: function(e) {},
            onTypingPaused: function(e, t) {},
            onTypingResumed: function(e, t) {},
            onReset: function(e) {},
            onStop: function(e, t) {},
            onStart: function(e, t) {},
            onDestroy: function(e) {}
        },
        s = new(function() {
            function s() {}
            var i = s.prototype;
            return i.load = function(s, i, n) {
                if (s.el = "string" == typeof n ? document.querySelector(n) : n, s.options = e({}, t, i), s.isInput = "input" === s.el.tagName.toLowerCase(), s.attr = s.options.attr, s.bindInputFocusEvents = s.options.bindInputFocusEvents, s.showCursor = !s.isInput && s.options.showCursor, s.cursorChar = s.options.cursorChar, s.cursorBlinking = !0, s.elContent = s.attr ? s.el.getAttribute(s.attr) : s.el.textContent, s.contentType = s.options.contentType, s.typeSpeed = s.options.typeSpeed, s.startDelay = s.options.startDelay, s.backSpeed = s.options.backSpeed, s.smartBackspace = s.options.smartBackspace, s.backDelay = s.options.backDelay, s.fadeOut = s.options.fadeOut, s.fadeOutClass = s.options.fadeOutClass, s.fadeOutDelay = s.options.fadeOutDelay, s.isPaused = !1, s.strings = s.options.strings.map((function(e) {
                        return e.trim()
                    })), s.stringsElement = "string" == typeof s.options.stringsElement ? document.querySelector(s.options.stringsElement) : s.options.stringsElement, s.stringsElement) {
                    s.strings = [], s.stringsElement.style.cssText = "clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";
                    var r = Array.prototype.slice.apply(s.stringsElement.children),
                        a = r.length;
                    if (a)
                        for (var o = 0; o < a; o += 1) s.strings.push(r[o].innerHTML.trim())
                }
                for (var l in s.strPos = 0, s.currentElContent = this.getCurrentElContent(s), s.currentElContent && s.currentElContent.length > 0 && (s.strPos = s.currentElContent.length - 1, s.strings.unshift(s.currentElContent)), s.sequence = [], s.strings) s.sequence[l] = l;
                s.arrayPos = 0, s.stopNum = 0, s.loop = s.options.loop, s.loopCount = s.options.loopCount, s.curLoop = 0, s.shuffle = s.options.shuffle, s.pause = {
                    status: !1,
                    typewrite: !0,
                    curString: "",
                    curStrPos: 0
                }, s.typingComplete = !1, s.autoInsertCss = s.options.autoInsertCss, s.autoInsertCss && (this.appendCursorAnimationCss(s), this.appendFadeOutAnimationCss(s))
            }, i.getCurrentElContent = function(e) {
                return e.attr ? e.el.getAttribute(e.attr) : e.isInput ? e.el.value : "html" === e.contentType ? e.el.innerHTML : e.el.textContent
            }, i.appendCursorAnimationCss = function(e) {
                var t = "data-typed-js-cursor-css";
                if (e.showCursor && !document.querySelector("[" + t + "]")) {
                    var s = document.createElement("style");
                    s.setAttribute(t, "true"), s.innerHTML = "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ", document.body.appendChild(s)
                }
            }, i.appendFadeOutAnimationCss = function(e) {
                var t = "data-typed-fadeout-js-css";
                if (e.fadeOut && !document.querySelector("[" + t + "]")) {
                    var s = document.createElement("style");
                    s.setAttribute(t, "true"), s.innerHTML = "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ", document.body.appendChild(s)
                }
            }, s
        }()),
        i = new(function() {
            function e() {}
            var t = e.prototype;
            return t.typeHtmlChars = function(e, t, s) {
                if ("html" !== s.contentType) return t;
                var i = e.substring(t).charAt(0);
                if ("<" === i || "&" === i) {
                    var n;
                    for (n = "<" === i ? ">" : ";"; e.substring(t + 1).charAt(0) !== n && !(1 + ++t > e.length););
                    t++
                }
                return t
            }, t.backSpaceHtmlChars = function(e, t, s) {
                if ("html" !== s.contentType) return t;
                var i = e.substring(t).charAt(0);
                if (">" === i || ";" === i) {
                    var n;
                    for (n = ">" === i ? "<" : "&"; e.substring(t - 1).charAt(0) !== n && !(--t < 0););
                    t--
                }
                return t
            }, e
        }());
    return function() {
        function e(e, t) {
            s.load(this, t, e), this.begin()
        }
        var t = e.prototype;
        return t.toggle = function() {
            this.pause.status ? this.start() : this.stop()
        }, t.stop = function() {
            this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos, this))
        }, t.start = function() {
            this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this))
        }, t.destroy = function() {
            this.reset(!1), this.options.onDestroy(this)
        }, t.reset = function(e) {
            void 0 === e && (e = !0), clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, e && (this.insertCursor(), this.options.onReset(this), this.begin())
        }, t.begin = function() {
            var e = this;
            this.options.onBegin(this), this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout((function() {
                0 === e.strPos ? e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos) : e.backspace(e.strings[e.sequence[e.arrayPos]], e.strPos)
            }), this.startDelay)
        }, t.typewrite = function(e, t) {
            var s = this;
            this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
            var n = this.humanizer(this.typeSpeed),
                r = 1;
            !0 !== this.pause.status ? this.timeout = setTimeout((function() {
                t = i.typeHtmlChars(e, t, s);
                var n = 0,
                    a = e.substring(t);
                if ("^" === a.charAt(0) && /^\^\d+/.test(a)) {
                    var o = 1;
                    o += (a = /\d+/.exec(a)[0]).length, n = parseInt(a), s.temporaryPause = !0, s.options.onTypingPaused(s.arrayPos, s), e = e.substring(0, t) + e.substring(t + o), s.toggleBlinking(!0)
                }
                if ("`" === a.charAt(0)) {
                    for (;
                        "`" !== e.substring(t + r).charAt(0) && (r++, !(t + r > e.length)););
                    var l = e.substring(0, t),
                        d = e.substring(l.length + 1, t + r),
                        c = e.substring(t + r + 1);
                    e = l + d + c, r--
                }
                s.timeout = setTimeout((function() {
                    s.toggleBlinking(!1), t >= e.length ? s.doneTyping(e, t) : s.keepTyping(e, t, r), s.temporaryPause && (s.temporaryPause = !1, s.options.onTypingResumed(s.arrayPos, s))
                }), n)
            }), n) : this.setPauseStatus(e, t, !0)
        }, t.keepTyping = function(e, t, s) {
            0 === t && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this));
            var i = e.substring(0, t += s);
            this.replaceText(i), this.typewrite(e, t)
        }, t.doneTyping = function(e, t) {
            var s = this;
            this.options.onStringTyped(this.arrayPos, this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), !1 === this.loop || this.curLoop === this.loopCount) || (this.timeout = setTimeout((function() {
                s.backspace(e, t)
            }), this.backDelay))
        }, t.backspace = function(e, t) {
            var s = this;
            if (!0 !== this.pause.status) {
                if (this.fadeOut) return this.initFadeOut();
                this.toggleBlinking(!1);
                var n = this.humanizer(this.backSpeed);
                this.timeout = setTimeout((function() {
                    t = i.backSpaceHtmlChars(e, t, s);
                    var n = e.substring(0, t);
                    if (s.replaceText(n), s.smartBackspace) {
                        var r = s.strings[s.arrayPos + 1];
                        s.stopNum = r && n === r.substring(0, t) ? t : 0
                    }
                    t > s.stopNum ? (t--, s.backspace(e, t)) : t <= s.stopNum && (s.arrayPos++, s.arrayPos === s.strings.length ? (s.arrayPos = 0, s.options.onLastStringBackspaced(), s.shuffleStringsIfNeeded(), s.begin()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], t))
                }), n)
            } else this.setPauseStatus(e, t, !1)
        }, t.complete = function() {
            this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0
        }, t.setPauseStatus = function(e, t, s) {
            this.pause.typewrite = s, this.pause.curString = e, this.pause.curStrPos = t
        }, t.toggleBlinking = function(e) {
            this.cursor && (this.pause.status || this.cursorBlinking !== e && (this.cursorBlinking = e, e ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink")))
        }, t.humanizer = function(e) {
            return Math.round(Math.random() * e / 2) + e
        }, t.shuffleStringsIfNeeded = function() {
            this.shuffle && (this.sequence = this.sequence.sort((function() {
                return Math.random() - .5
            })))
        }, t.initFadeOut = function() {
            var e = this;
            return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout((function() {
                e.arrayPos++, e.replaceText(""), e.strings.length > e.arrayPos ? e.typewrite(e.strings[e.sequence[e.arrayPos]], 0) : (e.typewrite(e.strings[0], 0), e.arrayPos = 0)
            }), this.fadeOutDelay)
        }, t.replaceText = function(e) {
            this.attr ? this.el.setAttribute(this.attr, e) : this.isInput ? this.el.value = e : "html" === this.contentType ? this.el.innerHTML = e : this.el.textContent = e
        }, t.bindFocusEvents = function() {
            var e = this;
            this.isInput && (this.el.addEventListener("focus", (function(t) {
                e.stop()
            })), this.el.addEventListener("blur", (function(t) {
                e.el.value && 0 !== e.el.value.length || e.start()
            })))
        }, t.insertCursor = function() {
            this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.setAttribute("aria-hidden", !0), this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)))
        }, e
    }()
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Pristine = t()
}(this, (function() {
    "use strict";
    var e = {
        en: {
            required: "This field is required",
            email: "This field requires a valid e-mail address",
            number: "This field requires a number",
            integer: "This field requires an integer value",
            url: "This field requires a valid website URL",
            tel: "This field requires a valid telephone number",
            maxlength: "This fields length must be < ${1}",
            minlength: "This fields length must be > ${1}",
            min: "Minimum value for this field is ${1}",
            max: "Maximum value for this field is ${1}",
            pattern: "Please match the requested format",
            equals: "The two fields do not match",
            default: "Please enter a correct value"
        }
    };

    function t(e) {
        var t = arguments;
        return this.replace(/\${([^{}]*)}/g, (function(e, s) {
            return t[s]
        }))
    }

    function s(e) {
        return e.pristine.self.form.querySelectorAll('input[name="' + e.getAttribute("name") + '"]:checked').length
    }
    var i = {
            classTo: "form-group",
            errorClass: "has-danger",
            successClass: "has-success",
            errorTextParent: "form-group",
            errorTextTag: "div",
            errorTextClass: "text-help"
        },
        n = ["required", "min", "max", "minlength", "maxlength", "pattern"],
        r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        a = /-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/,
        o = "en",
        l = {},
        d = function(e, t) {
            t.name = e, void 0 === t.priority && (t.priority = 1), l[e] = t
        };

    function c(s, r, d) {
        var c = this;

        function p(e, t, s, i) {
            var n = l[s];
            if (n && (e.push(n), i)) {
                var r = "pattern" === s ? [i] : i.split(",");
                r.unshift(null), t[s] = r
            }
        }

        function u(s) {
            for (var i = [], n = !0, r = 0; s.validators[r]; r++) {
                var a = s.validators[r],
                    l = s.params[a.name] ? s.params[a.name] : [];
                if (l[0] = s.input.value, !a.fn.apply(s.input, l) && (n = !1, "function" == typeof a.msg ? i.push(a.msg(s.input.value, l)) : "string" == typeof a.msg ? i.push(t.apply(a.msg, l)) : a.msg === Object(a.msg) && a.msg[o] ? i.push(t.apply(a.msg[o], l)) : s.messages[o] && s.messages[o][a.name] ? i.push(t.apply(s.messages[o][a.name], l)) : e[o] && e[o][a.name] ? i.push(t.apply(e[o][a.name], l)) : i.push(t.apply(e[o].default, l)), !0 === a.halt)) break
            }
            return s.errors = i, n
        }

        function h(e) {
            if (e.errorElements) return e.errorElements;
            var t = function(e, t) {
                    for (;
                        (e = e.parentElement) && !e.classList.contains(t););
                    return e
                }(e.input, c.config.classTo),
                s = null,
                i = null;
            return (s = c.config.classTo === c.config.errorTextParent ? t : t.querySelector("." + c.config.errorTextParent)) && ((i = s.querySelector(".pristine-error")) || ((i = document.createElement(c.config.errorTextTag)).className = "pristine-error " + c.config.errorTextClass, s.appendChild(i), i.pristineDisplay = i.style.display)), e.errorElements = [t, i]
        }

        function f(e) {
            var t = h(e),
                s = t[0],
                i = t[1],
                n = e.input,
                r = "error-" + (n.id || Math.floor((new Date).valueOf() * Math.random()));
            s && (s.classList.remove(c.config.successClass), s.classList.add(c.config.errorClass), n.setAttribute("aria-describedby", r), n.setAttribute("aria-invalid", "true")), i && (i.setAttribute("id", r), i.setAttribute("role", "alert"), i.innerHTML = e.errors.join("<br/>"), i.style.display = i.pristineDisplay || "")
        }

        function m(e) {
            var t = function(e) {
                var t = h(e),
                    s = t[0],
                    i = t[1],
                    n = e.input;
                return s && (s.classList.remove(c.config.errorClass), s.classList.remove(c.config.successClass), n.removeAttribute("aria-describedby"), n.removeAttribute("aria-invalid")), i && (i.removeAttribute("id"), i.removeAttribute("role"), i.innerHTML = "", i.style.display = "none"), t
            }(e)[0];
            t && t.classList.add(c.config.successClass)
        }
        return function(e, t, s) {
            e.setAttribute("novalidate", "true"), c.form = e, c.config = function(e, t) {
                for (var s in t) s in e || (e[s] = t[s]);
                return e
            }(t || {}, i), c.live = !(!1 === s), c.fields = Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function(e) {
                var t = [],
                    s = {},
                    i = {};
                return [].forEach.call(e.attributes, (function(e) {
                    if (/^data-pristine-/.test(e.name)) {
                        var r = e.name.substr(14),
                            o = r.match(a);
                        if (null !== o) {
                            var l = void 0 === o[1] ? "en" : o[1];
                            return i.hasOwnProperty(l) || (i[l] = {}), void(i[l][r.slice(0, r.length - o[0].length)] = e.value)
                        }
                        "type" === r && (r = e.value), p(t, s, r, e.value)
                    } else ~n.indexOf(e.name) ? p(t, s, e.name, e.value) : "type" === e.name && p(t, s, e.value)
                })), t.sort((function(e, t) {
                    return t.priority - e.priority
                })), c.live && e.addEventListener(~["radio", "checkbox"].indexOf(e.getAttribute("type")) ? "change" : "input", function(e) {
                    c.validate(e.target)
                }.bind(c)), e.pristine = {
                    input: e,
                    validators: t,
                    params: s,
                    messages: i,
                    self: c
                }
            }.bind(c))
        }(s, r, d), c.validate = function(e, t) {
            t = e && !0 === t || !0 === e;
            var s = c.fields;
            !0 !== e && !1 !== e && (e instanceof HTMLElement ? s = [e.pristine] : (e instanceof NodeList || e instanceof(window.$ || Array) || e instanceof Array) && (s = Array.from(e).map((function(e) {
                return e.pristine
            }))));
            for (var i = !0, n = 0; s[n]; n++) {
                var r = s[n];
                u(r) ? !t && m(r) : (i = !1, !t && f(r))
            }
            return i
        }, c.getErrors = function(e) {
            if (!e) {
                for (var t = [], s = 0; s < c.fields.length; s++) {
                    var i = c.fields[s];
                    i.errors.length && t.push({
                        input: i.input,
                        errors: i.errors
                    })
                }
                return t
            }
            return e.tagName && "select" === e.tagName.toLowerCase() ? e.pristine.errors : e.length ? e[0].pristine.errors : e.pristine.errors
        }, c.addValidator = function(e, t, s, i, n) {
            e instanceof HTMLElement ? (e.pristine.validators.push({
                fn: t,
                msg: s,
                priority: i,
                halt: n
            }), e.pristine.validators.sort((function(e, t) {
                return t.priority - e.priority
            }))) : console.warn("The parameter elem must be a dom element")
        }, c.addError = function(e, t) {
            (e = e.length ? e[0] : e).pristine.errors.push(t), f(e.pristine)
        }, c.reset = function() {
            for (var e = 0; c.fields[e]; e++) c.fields[e].errorElements = null;
            Array.from(c.form.querySelectorAll(".pristine-error")).map((function(e) {
                e.parentNode.removeChild(e)
            })), Array.from(c.form.querySelectorAll("." + c.config.classTo)).map((function(e) {
                e.classList.remove(c.config.successClass), e.classList.remove(c.config.errorClass)
            }))
        }, c.destroy = function() {
            c.reset(), c.fields.forEach((function(e) {
                delete e.input.pristine
            })), c.fields = []
        }, c.setGlobalConfig = function(e) {
            i = e
        }, c
    }
    return d("text", {
        fn: function(e) {
            return !0
        },
        priority: 0
    }), d("required", {
        fn: function(e) {
            return "radio" === this.type || "checkbox" === this.type ? s(this) : void 0 !== e && "" !== e.trim()
        },
        priority: 99,
        halt: !0
    }), d("email", {
        fn: function(e) {
            return !e || r.test(e)
        }
    }), d("number", {
        fn: function(e) {
            return !e || !isNaN(parseFloat(e))
        },
        priority: 2
    }), d("integer", {
        fn: function(e) {
            return !e || /^\d+$/.test(e)
        }
    }), d("minlength", {
        fn: function(e, t) {
            return !e || e.length >= parseInt(t)
        }
    }), d("maxlength", {
        fn: function(e, t) {
            return !e || e.length <= parseInt(t)
        }
    }), d("min", {
        fn: function(e, t) {
            return !e || ("checkbox" === this.type ? s(this) >= parseInt(t) : parseFloat(e) >= parseFloat(t))
        }
    }), d("max", {
        fn: function(e, t) {
            return !e || ("checkbox" === this.type ? s(this) <= parseInt(t) : parseFloat(e) <= parseFloat(t))
        }
    }), d("pattern", {
        fn: function(e, t) {
            var s = t.match(new RegExp("^/(.*?)/([gimy]*)$"));
            return !e || new RegExp(s[1], s[2]).test(e)
        }
    }), d("equals", {
        fn: function(e, t) {
            var s = document.querySelector(t);
            return s && (!e && !s.value || s.value === e)
        }
    }), c.addValidator = function(e, t, s, i, n) {
        d(e, {
            fn: t,
            msg: s,
            priority: i,
            halt: n
        })
    }, c.addMessages = function(t, s) {
        var i = e.hasOwnProperty(t) ? e[t] : e[t] = {};
        Object.keys(s).forEach((function(e, t) {
            i[e] = s[e]
        }))
    }, c.setLocale = function(e) {
        o = e
    }, c
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(s) {
        return t(e, s)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
}(window, (function(e, t) {
    "use strict";

    function s(s, r, o) {
        function l(e, t, i) {
            var n, r = "$()." + s + '("' + t + '")';
            return e.each((function(e, l) {
                var d = o.data(l, s);
                if (d) {
                    var c = d[t];
                    if (c && "_" != t.charAt(0)) {
                        var p = c.apply(d, i);
                        n = void 0 === n ? p : n
                    } else a(r + " is not a valid method")
                } else a(s + " not initialized. Cannot call methods, i.e. " + r)
            })), void 0 !== n ? n : e
        }

        function d(e, t) {
            e.each((function(e, i) {
                var n = o.data(i, s);
                n ? (n.option(t), n._init()) : (n = new r(i, t), o.data(i, s, n))
            }))
        }(o = o || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function(e) {
            o.isPlainObject(e) && (this.options = o.extend(!0, this.options, e))
        }), o.fn[s] = function(e) {
            if ("string" == typeof e) {
                var t = n.call(arguments, 1);
                return l(this, e, t)
            }
            return d(this, e), this
        }, i(o))
    }

    function i(e) {
        !e || e && e.bridget || (e.bridget = s)
    }
    var n = Array.prototype.slice,
        r = e.console,
        a = void 0 === r ? function() {} : function(e) {
            r.error(e)
        };
    return i(t || e.jQuery), s
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, (function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var s = this._events = this._events || {},
                i = s[e] = s[e] || [];
            return -1 == i.indexOf(t) && i.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var s = this._onceEvents = this._onceEvents || {};
            return (s[e] = s[e] || {})[t] = !0, this
        }
    }, t.off = function(e, t) {
        var s = this._events && this._events[e];
        if (s && s.length) {
            var i = s.indexOf(t);
            return -1 != i && s.splice(i, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var s = this._events && this._events[e];
        if (s && s.length) {
            s = s.slice(0), t = t || [];
            for (var i = this._onceEvents && this._onceEvents[e], n = 0; n < s.length; n++) {
                var r = s[n];
                i && i[r] && (this.off(e, r), delete i[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, (function() {
    "use strict";

    function e(e) {
        var t = parseFloat(e);
        return -1 == e.indexOf("%") && !isNaN(t) && t
    }

    function t(e) {
        var t = getComputedStyle(e);
        return t || r("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
    }

    function s() {
        if (!l) {
            l = !0;
            var s = document.createElement("div");
            s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style.boxSizing = "border-box";
            var r = document.body || document.documentElement;
            r.appendChild(s);
            var a = t(s);
            n = 200 == Math.round(e(a.width)), i.isBoxSizeOuter = n, r.removeChild(s)
        }
    }

    function i(i) {
        if (s(), "string" == typeof i && (i = document.querySelector(i)), i && "object" == typeof i && i.nodeType) {
            var r = t(i);
            if ("none" == r.display) return function() {
                for (var e = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, t = 0; o > t; t++) {
                    e[a[t]] = 0
                }
                return e
            }();
            var l = {};
            l.width = i.offsetWidth, l.height = i.offsetHeight;
            for (var d = l.isBorderBox = "border-box" == r.boxSizing, c = 0; o > c; c++) {
                var p = a[c],
                    u = r[p],
                    h = parseFloat(u);
                l[p] = isNaN(h) ? 0 : h
            }
            var f = l.paddingLeft + l.paddingRight,
                m = l.paddingTop + l.paddingBottom,
                g = l.marginLeft + l.marginRight,
                v = l.marginTop + l.marginBottom,
                b = l.borderLeftWidth + l.borderRightWidth,
                y = l.borderTopWidth + l.borderBottomWidth,
                w = d && n,
                _ = e(r.width);
            !1 !== _ && (l.width = _ + (w ? 0 : f + b));
            var E = e(r.height);
            return !1 !== E && (l.height = E + (w ? 0 : m + y)), l.innerWidth = l.width - (f + b), l.innerHeight = l.height - (m + y), l.outerWidth = l.width + g, l.outerHeight = l.height + v, l
        }
    }
    var n, r = "undefined" == typeof console ? function() {} : function(e) {
            console.error(e)
        },
        a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        o = a.length,
        l = !1;
    return i
})),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, (function() {
    "use strict";
    var e = function() {
        var e = window.Element.prototype;
        if (e.matches) return "matches";
        if (e.matchesSelector) return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], s = 0; s < t.length; s++) {
            var i = t[s] + "MatchesSelector";
            if (e[i]) return i
        }
    }();
    return function(t, s) {
        return t[e](s)
    }
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(s) {
        return t(e, s)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, (function(e, t) {
    var s = {
            extend: function(e, t) {
                for (var s in t) e[s] = t[s];
                return e
            },
            modulo: function(e, t) {
                return (e % t + t) % t
            }
        },
        i = Array.prototype.slice;
    s.makeArray = function(e) {
        return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? i.call(e) : [e]
    }, s.removeFrom = function(e, t) {
        var s = e.indexOf(t); - 1 != s && e.splice(s, 1)
    }, s.getParent = function(e, s) {
        for (; e.parentNode && e != document.body;)
            if (e = e.parentNode, t(e, s)) return e
    }, s.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, s.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, s.filterFindElements = function(e, i) {
        e = s.makeArray(e);
        var n = [];
        return e.forEach((function(e) {
            if (e instanceof HTMLElement) {
                if (!i) return void n.push(e);
                t(e, i) && n.push(e);
                for (var s = e.querySelectorAll(i), r = 0; r < s.length; r++) n.push(s[r])
            }
        })), n
    }, s.debounceMethod = function(e, t, s) {
        s = s || 100;
        var i = e.prototype[t],
            n = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[n];
            clearTimeout(e);
            var t = arguments,
                r = this;
            this[n] = setTimeout((function() {
                i.apply(r, t), delete r[n]
            }), s)
        }
    }, s.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
    }, s.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, (function(e, t, s) {
            return t + "-" + s
        })).toLowerCase()
    };
    var n = e.console;
    return s.htmlInit = function(t, i) {
        s.docReady((function() {
            var r = s.toDashed(i),
                a = "data-" + r,
                o = document.querySelectorAll("[" + a + "]"),
                l = document.querySelectorAll(".js-" + r),
                d = s.makeArray(o).concat(s.makeArray(l)),
                c = a + "-options",
                p = e.jQuery;
            d.forEach((function(e) {
                var s, r = e.getAttribute(a) || e.getAttribute(c);
                try {
                    s = r && JSON.parse(r)
                } catch (t) {
                    return void(n && n.error("Error parsing " + a + " on " + e.className + ": " + t))
                }
                var o = new t(e, s);
                p && p.data(e, i, o)
            }))
        }))
    }, s
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
}(window, (function(e, t) {
    "use strict";

    function s(e, t) {
        e && (this.element = e, this.layout = t, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }
    var i = document.documentElement.style,
        n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
        r = "string" == typeof i.transform ? "transform" : "WebkitTransform",
        a = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[n],
        o = {
            transform: r,
            transition: n,
            transitionDuration: n + "Duration",
            transitionProperty: n + "Property",
            transitionDelay: n + "Delay"
        },
        l = s.prototype = Object.create(e.prototype);
    l.constructor = s, l._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, l.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, l.getSize = function() {
        this.size = t(this.element)
    }, l.css = function(e) {
        var t = this.element.style;
        for (var s in e) {
            t[o[s] || s] = e[s]
        }
    }, l.getPosition = function() {
        var e = getComputedStyle(this.element),
            t = this.layout._getOption("originLeft"),
            s = this.layout._getOption("originTop"),
            i = e[t ? "left" : "right"],
            n = e[s ? "top" : "bottom"],
            r = parseFloat(i),
            a = parseFloat(n),
            o = this.layout.size; - 1 != i.indexOf("%") && (r = r / 100 * o.width), -1 != n.indexOf("%") && (a = a / 100 * o.height), r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= t ? o.paddingLeft : o.paddingRight, a -= s ? o.paddingTop : o.paddingBottom, this.position.x = r, this.position.y = a
    }, l.layoutPosition = function() {
        var e = this.layout.size,
            t = {},
            s = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = s ? "paddingLeft" : "paddingRight",
            r = s ? "left" : "right",
            a = s ? "right" : "left",
            o = this.position.x + e[n];
        t[r] = this.getXValue(o), t[a] = "";
        var l = i ? "paddingTop" : "paddingBottom",
            d = i ? "top" : "bottom",
            c = i ? "bottom" : "top",
            p = this.position.y + e[l];
        t[d] = this.getYValue(p), t[c] = "", this.css(t), this.emitEvent("layout", [this])
    }, l.getXValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
    }, l.getYValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
    }, l._transitionTo = function(e, t) {
        this.getPosition();
        var s = this.position.x,
            i = this.position.y,
            n = e == this.position.x && t == this.position.y;
        if (this.setPosition(e, t), !n || this.isTransitioning) {
            var r = e - s,
                a = t - i,
                o = {};
            o.transform = this.getTranslate(r, a), this.transition({
                to: o,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        } else this.layoutPosition()
    }, l.getTranslate = function(e, t) {
        return "translate3d(" + (e = this.layout._getOption("originLeft") ? e : -e) + "px, " + (t = this.layout._getOption("originTop") ? t : -t) + "px, 0)"
    }, l.goTo = function(e, t) {
        this.setPosition(e, t), this.layoutPosition()
    }, l.moveTo = l._transitionTo, l.setPosition = function(e, t) {
        this.position.x = parseFloat(e), this.position.y = parseFloat(t)
    }, l._nonTransition = function(e) {
        for (var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
    }, l.transition = function(e) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var t = this._transn;
            for (var s in e.onTransitionEnd) t.onEnd[s] = e.onTransitionEnd[s];
            for (s in e.to) t.ingProperties[s] = !0, e.isCleaning && (t.clean[s] = !0);
            if (e.from) {
                this.css(e.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
        } else this._nonTransition(e)
    };
    var d = "opacity," + function(e) {
        return e.replace(/([A-Z])/g, (function(e) {
            return "-" + e.toLowerCase()
        }))
    }(r);
    l.enableTransition = function() {
        if (!this.isTransitioning) {
            var e = this.layout.options.transitionDuration;
            e = "number" == typeof e ? e + "ms" : e, this.css({
                transitionProperty: d,
                transitionDuration: e,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(a, this, !1)
        }
    }, l.onwebkitTransitionEnd = function(e) {
        this.ontransitionend(e)
    }, l.onotransitionend = function(e) {
        this.ontransitionend(e)
    };
    var c = {
        "-webkit-transform": "transform"
    };
    l.ontransitionend = function(e) {
        if (e.target === this.element) {
            var t = this._transn,
                s = c[e.propertyName] || e.propertyName;
            if (delete t.ingProperties[s], function(e) {
                    for (var t in e) return !1;
                    return null, !0
                }(t.ingProperties) && this.disableTransition(), s in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[s]), s in t.onEnd) t.onEnd[s].call(this), delete t.onEnd[s];
            this.emitEvent("transitionEnd", [this])
        }
    }, l.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
    }, l._removeStyles = function(e) {
        var t = {};
        for (var s in e) t[s] = "";
        this.css(t)
    };
    var p = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return l.removeTransitionStyles = function() {
        this.css(p)
    }, l.stagger = function(e) {
        e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
    }, l.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, l.remove = function() {
        return n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function() {
            this.removeElem()
        })), void this.hide()) : void this.removeElem()
    }, l.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {};
        t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, l.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, l.getHideRevealTransitionEndProperty = function(e) {
        var t = this.layout.options[e];
        if (t.opacity) return "opacity";
        for (var s in t) return s
    }, l.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {};
        t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, l.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, l.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, s
})),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], (function(s, i, n, r) {
        return t(e, s, i, n, r)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, (function(e, t, s, i, n) {
    "use strict";

    function r(e, t) {
        var s = i.getQueryElement(e);
        if (s) {
            this.element = s, l && (this.$element = l(this.element)), this.options = i.extend({}, this.constructor.defaults), this.option(t);
            var n = ++c;
            this.element.outlayerGUID = n, p[n] = this, this._create(), this._getOption("initLayout") && this.layout()
        } else o && o.error("Bad element for " + this.constructor.namespace + ": " + (s || e))
    }

    function a(e) {
        function t() {
            e.apply(this, arguments)
        }
        return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
    }
    var o = e.console,
        l = e.jQuery,
        d = function() {},
        c = 0,
        p = {};
    r.namespace = "outlayer", r.Item = n, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var u = r.prototype;
    i.extend(u, t.prototype), u.option = function(e) {
        i.extend(this.options, e)
    }, u._getOption = function(e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, u._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), i.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, u.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, u._itemize = function(e) {
        for (var t = this._filterFindItemElements(e), s = this.constructor.Item, i = [], n = 0; n < t.length; n++) {
            var r = new s(t[n], this);
            i.push(r)
        }
        return i
    }, u._filterFindItemElements = function(e) {
        return i.filterFindElements(e, this.options.itemSelector)
    }, u.getItemElements = function() {
        return this.items.map((function(e) {
            return e.element
        }))
    }, u.layout = function() {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"),
            t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, u._init = u.layout, u._resetLayout = function() {
        this.getSize()
    }, u.getSize = function() {
        this.size = s(this.element)
    }, u._getMeasurement = function(e, t) {
        var i, n = this.options[e];
        n ? ("string" == typeof n ? i = this.element.querySelector(n) : n instanceof HTMLElement && (i = n), this[e] = i ? s(i)[t] : n) : this[e] = 0
    }, u.layoutItems = function(e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
    }, u._getItemsForLayout = function(e) {
        return e.filter((function(e) {
            return !e.isIgnored
        }))
    }, u._layoutItems = function(e, t) {
        if (this._emitCompleteOnItems("layout", e), e && e.length) {
            var s = [];
            e.forEach((function(e) {
                var i = this._getItemLayoutPosition(e);
                i.item = e, i.isInstant = t || e.isLayoutInstant, s.push(i)
            }), this), this._processLayoutQueue(s)
        }
    }, u._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, u._processLayoutQueue = function(e) {
        this.updateStagger(), e.forEach((function(e, t) {
            this._positionItem(e.item, e.x, e.y, e.isInstant, t)
        }), this)
    }, u.updateStagger = function() {
        var e = this.options.stagger;
        return null == e ? void(this.stagger = 0) : (this.stagger = function(e) {
            if ("number" == typeof e) return e;
            var t = e.match(/(^\d*\.?\d*)(\w*)/),
                s = t && t[1],
                i = t && t[2];
            return s.length ? (s = parseFloat(s)) * (h[i] || 1) : 0
        }(e), this.stagger)
    }, u._positionItem = function(e, t, s, i, n) {
        i ? e.goTo(t, s) : (e.stagger(n * this.stagger), e.moveTo(t, s))
    }, u._postLayout = function() {
        this.resizeContainer()
    }, u.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, u._getContainerSize = d, u._setContainerMeasure = function(e, t) {
        if (void 0 !== e) {
            var s = this.size;
            s.isBorderBox && (e += t ? s.paddingLeft + s.paddingRight + s.borderLeftWidth + s.borderRightWidth : s.paddingBottom + s.paddingTop + s.borderTopWidth + s.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
        }
    }, u._emitCompleteOnItems = function(e, t) {
        function s() {
            n.dispatchEvent(e + "Complete", null, [t])
        }

        function i() {
            ++a == r && s()
        }
        var n = this,
            r = t.length;
        if (t && r) {
            var a = 0;
            t.forEach((function(t) {
                t.once(e, i)
            }))
        } else s()
    }, u.dispatchEvent = function(e, t, s) {
        var i = t ? [t].concat(s) : s;
        if (this.emitEvent(e, i), l)
            if (this.$element = this.$element || l(this.element), t) {
                var n = l.Event(t);
                n.type = e, this.$element.trigger(n, s)
            } else this.$element.trigger(e, s)
    }, u.ignore = function(e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }, u.unignore = function(e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }, u.stamp = function(e) {
        (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
    }, u.unstamp = function(e) {
        (e = this._find(e)) && e.forEach((function(e) {
            i.removeFrom(this.stamps, e), this.unignore(e)
        }), this)
    }, u._find = function(e) {
        return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = i.makeArray(e)) : void 0
    }, u._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, u._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect(),
            t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, u._manageStamp = d, u._getElementOffset = function(e) {
        var t = e.getBoundingClientRect(),
            i = this._boundingRect,
            n = s(e);
        return {
            left: t.left - i.left - n.marginLeft,
            top: t.top - i.top - n.marginTop,
            right: i.right - t.right - n.marginRight,
            bottom: i.bottom - t.bottom - n.marginBottom
        }
    }, u.handleEvent = i.handleEvent, u.bindResize = function() {
        e.addEventListener("resize", this), this.isResizeBound = !0
    }, u.unbindResize = function() {
        e.removeEventListener("resize", this), this.isResizeBound = !1
    }, u.onresize = function() {
        this.resize()
    }, i.debounceMethod(r, "onresize", 100), u.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, u.needsResizeLayout = function() {
        var e = s(this.element);
        return this.size && e && e.innerWidth !== this.size.innerWidth
    }, u.addItems = function(e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t
    }, u.appended = function(e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, u.prepended = function(e) {
        var t = this._itemize(e);
        if (t.length) {
            var s = this.items.slice(0);
            this.items = t.concat(s), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(s)
        }
    }, u.reveal = function(e) {
        if (this._emitCompleteOnItems("reveal", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach((function(e, s) {
                e.stagger(s * t), e.reveal()
            }))
        }
    }, u.hide = function(e) {
        if (this._emitCompleteOnItems("hide", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach((function(e, s) {
                e.stagger(s * t), e.hide()
            }))
        }
    }, u.revealItemElements = function(e) {
        var t = this.getItems(e);
        this.reveal(t)
    }, u.hideItemElements = function(e) {
        var t = this.getItems(e);
        this.hide(t)
    }, u.getItem = function(e) {
        for (var t = 0; t < this.items.length; t++) {
            var s = this.items[t];
            if (s.element == e) return s
        }
    }, u.getItems = function(e) {
        e = i.makeArray(e);
        var t = [];
        return e.forEach((function(e) {
            var s = this.getItem(e);
            s && t.push(s)
        }), this), t
    }, u.remove = function(e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach((function(e) {
            e.remove(), i.removeFrom(this.items, e)
        }), this)
    }, u.destroy = function() {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach((function(e) {
            e.destroy()
        })), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete p[t], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
    }, r.data = function(e) {
        var t = (e = i.getQueryElement(e)) && e.outlayerGUID;
        return t && p[t]
    }, r.create = function(e, t) {
        var s = a(r);
        return s.defaults = i.extend({}, r.defaults), i.extend(s.defaults, t), s.compatOptions = i.extend({}, r.compatOptions), s.namespace = e, s.data = r.data, s.Item = a(n), i.htmlInit(s, e), l && l.bridget && l.bridget(e, s), s
    };
    var h = {
        ms: 1,
        s: 1e3
    };
    return r.Item = n, r
})),
function(e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, (function(e, t) {
    var s = e.create("masonry");
    s.compatOptions.fitWidth = "isFitWidth";
    var i = s.prototype;
    return i._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var e = 0; e < this.cols; e++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, i.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var e = this.items[0],
                s = e && e.element;
            this.columnWidth = s && t(s).outerWidth || this.containerWidth
        }
        var i = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            r = n / i,
            a = i - n % i;
        r = Math[a && 1 > a ? "round" : "floor"](r), this.cols = Math.max(r, 1)
    }, i.getContainerWidth = function() {
        var e = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            s = t(e);
        this.containerWidth = s && s.innerWidth
    }, i._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth,
            s = Math[t && 1 > t ? "round" : "ceil"](e.size.outerWidth / this.columnWidth);
        s = Math.min(s, this.cols);
        for (var i = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](s, e), n = {
                x: this.columnWidth * i.col,
                y: i.y
            }, r = i.y + e.size.outerHeight, a = s + i.col, o = i.col; a > o; o++) this.colYs[o] = r;
        return n
    }, i._getTopColPosition = function(e) {
        var t = this._getTopColGroup(e),
            s = Math.min.apply(Math, t);
        return {
            col: t.indexOf(s),
            y: s
        }
    }, i._getTopColGroup = function(e) {
        if (2 > e) return this.colYs;
        for (var t = [], s = this.cols + 1 - e, i = 0; s > i; i++) t[i] = this._getColGroupY(i, e);
        return t
    }, i._getColGroupY = function(e, t) {
        if (2 > t) return this.colYs[e];
        var s = this.colYs.slice(e, e + t);
        return Math.max.apply(Math, s)
    }, i._getHorizontalColPosition = function(e, t) {
        var s = this.horizontalColIndex % this.cols;
        s = e > 1 && s + e > this.cols ? 0 : s;
        var i = t.size.outerWidth && t.size.outerHeight;
        return this.horizontalColIndex = i ? s + e : this.horizontalColIndex, {
            col: s,
            y: this._getColGroupY(s, e)
        }
    }, i._manageStamp = function(e) {
        var s = t(e),
            i = this._getElementOffset(e),
            n = this._getOption("originLeft") ? i.left : i.right,
            r = n + s.outerWidth,
            a = Math.floor(n / this.columnWidth);
        a = Math.max(0, a);
        var o = Math.floor(r / this.columnWidth);
        o -= r % this.columnWidth ? 0 : 1, o = Math.min(this.cols - 1, o);
        for (var l = (this._getOption("originTop") ? i.top : i.bottom) + s.outerHeight, d = a; o >= d; d++) this.colYs[d] = Math.max(l, this.colYs[d])
    }, i._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
    }, i._getContainerFitWidth = function() {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }, i.needsResizeLayout = function() {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth
    }, s
}));
/*!
 * NioApp v1.0.0 (https://softnio.com/)
 * Developed by Softnio Team.
 * Copyright by Softnio.
 */
var NioApp = function(e, t) {
    "use strict";
    var s = {
        AppInfo: {
            name: "NioApp",
            version: "1.0.0",
            author: "Softnio"
        },
        Package: {
            name: "CopyGen",
            version: "1.1.0"
        }
    };
    return s.docReady = function(e) {
        document.addEventListener("DOMContentLoaded", e, !1)
    }, s.winLoad = function(e) {
        window.addEventListener("load", e, !1)
    }, s.onResize = function(e, t) {
        (t = void 0 === t ? window : t).addEventListener("resize", e)
    }, s
}(window, document);
NioApp = function(e) {
    "use strict";
    return e.BS = {}, e.Addons = {}, e.Custom = {}, e.Toggle = {}, e.body = document.querySelector("body"), e.Win = {
        height: window.innerHeight,
        width: window.innerWidth
    }, e.Break = {
        mb: 420,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
        any: 1 / 0
    }, e.State = {
        isRTL: !(!e.body.classList.contains("has-rtl") && "rtl" !== e.body.getAttribute("dir")),
        isTouch: "ontouchstart" in document.documentElement,
        isMobile: !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i),
        asMobile: e.Win.width < e.Break.md
    }, e.StateUpdate = function() {
        e.Win = {
            height: window.innerHeight,
            width: window.innerWidth
        }, e.State.asMobile = e.Win.width < e.Break.md
    }, e.SlideUp = function(e, t = 500) {
        e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.boxSizing = "border-box", e.style.height = e.offsetHeight + "px", e.offsetHeight, e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, window.setTimeout(() => {
            e.style.display = "none", e.style.removeProperty("height"), e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property")
        }, t)
    }, e.SlideDown = function(e, t = 500) {
        e.style.removeProperty("display");
        let s = window.getComputedStyle(e).display;
        "none" === s && (s = "block"), e.style.display = s;
        let i = e.offsetHeight;
        e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, e.offsetHeight, e.style.boxSizing = "border-box", e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = i + "px", e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), window.setTimeout(() => {
            e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property")
        }, t)
    }, e.SlideToggle = function(t, s = 500) {
        return "none" === window.getComputedStyle(t).display ? e.SlideDown(t, s) : e.SlideUp(t, s)
    }, e.getParents = function(e, t, s) {
        let i = void 0 === t ? document : document.querySelector(t);
        for (var n = [], r = e.parentNode; r !== i;) {
            var a = r;
            (void 0 === s || a.classList.contains(s)) && n.push(a), r = a.parentNode
        }
        return n
    }, e.extendObject = function(e, t) {
        return Object.keys(t).forEach((function(s) {
            e[s] = t[s]
        })), e
    }, e.BS.tooltip = function(e) {
        let t = document.querySelectorAll(e);
        [].slice.call(t).map((function(e) {
            return new bootstrap.Tooltip(e)
        }))
    }, e.onResize(e.StateUpdate), e
}(NioApp);