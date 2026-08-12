import { A as e, Et as t, O as n, Ot as r, Y as i, _ as a, c as o, d as s, r as c, u as l, y as u } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { c as d, n as f } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { F as p, Sn as m, i as h, vn as g, xn as _, yn as v } from "./dist-CcQFPJMF.js";
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var y = Math.min, b = Math.max, x = Math.round, S = Math.floor, C = (e) => ({
	x: e,
	y: e
}), w = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function T(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function E(e) {
	return e.split("-")[0];
}
function D(e) {
	return e.split("-")[1];
}
function O(e) {
	return e === "x" ? "y" : "x";
}
function k(e) {
	return e === "y" ? "height" : "width";
}
function A(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function j(e) {
	return O(A(e));
}
function M(e, t, n) {
	n === void 0 && (n = !1);
	let r = D(e), i = j(e), a = k(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = N(o)), [o, N(o)];
}
function ee(e) {
	let t = N(e);
	return [
		te(e),
		t,
		te(t)
	];
}
function te(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ne = ["left", "right"], re = ["right", "left"], ie = ["top", "bottom"], ae = ["bottom", "top"];
function oe(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? re : ne : t ? ne : re;
		case "left":
		case "right": return t ? ie : ae;
		default: return [];
	}
}
function se(e, t, n, r) {
	let i = D(e), a = oe(E(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(te)))), a;
}
function N(e) {
	let t = E(e);
	return w[t] + e.slice(t.length);
}
function ce(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function le(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ce(e);
}
function P(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function ue(e, t, n) {
	let { reference: r, floating: i } = e, a = A(t), o = j(t), s = k(o), c = E(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = D(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function de(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = T(t, e), p = le(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = P(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = P(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var fe = 50, pe = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: de
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = ue(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < fe && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = ue(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, me = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = T(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = E(r), _ = A(o), v = E(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [N(o)] : ee(o)), x = p !== "none";
			!d && x && b.push(...se(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], D = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = M(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (D = [...D, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === A(t) || D.every((e) => A(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: D
					},
					reset: { placement: t }
				};
				let n = D.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = D.filter((e) => {
							if (x) {
								let t = A(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, he = /*#__PURE__*/ new Set(["left", "top"]);
async function ge(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = E(n), s = D(n), c = A(n) === "y", l = he.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = T(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var _e = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await ge(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function F() {
	return typeof window < "u";
}
function I(e) {
	return ve(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function L(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function R(e) {
	return ((ve(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ve(e) {
	return F() ? e instanceof Node || e instanceof L(e).Node : !1;
}
function z(e) {
	return F() ? e instanceof Element || e instanceof L(e).Element : !1;
}
function B(e) {
	return F() ? e instanceof HTMLElement || e instanceof L(e).HTMLElement : !1;
}
function ye(e) {
	return !F() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof L(e).ShadowRoot;
}
function V(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = K(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function be(e) {
	return /^(table|td|th)$/.test(I(e));
}
function H(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var xe = /transform|translate|scale|rotate|perspective|filter/, Se = /paint|layout|strict|content/, U = (e) => !!e && e !== "none", Ce;
function W(e) {
	let t = z(e) ? K(e) : e;
	return U(t.transform) || U(t.translate) || U(t.scale) || U(t.rotate) || U(t.perspective) || !Te() && (U(t.backdropFilter) || U(t.filter)) || xe.test(t.willChange || "") || Se.test(t.contain || "");
}
function we(e) {
	let t = J(e);
	for (; B(t) && !G(t);) {
		if (W(t)) return t;
		if (H(t)) return null;
		t = J(t);
	}
	return null;
}
function Te() {
	return Ce ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Ce;
}
function G(e) {
	return /^(html|body|#document)$/.test(I(e));
}
function K(e) {
	return L(e).getComputedStyle(e);
}
function q(e) {
	return z(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function J(e) {
	if (I(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || ye(e) && e.host || R(e);
	return ye(t) ? t.host : t;
}
function Ee(e) {
	let t = J(e);
	return G(t) ? (e.ownerDocument || e).body : B(t) && V(t) ? t : Ee(t);
}
function Y(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Ee(e), i = r === e.ownerDocument?.body, a = L(r);
	if (i) {
		let e = De(a);
		return t.concat(a, a.visualViewport || [], V(r) ? r : [], e && n ? Y(e) : []);
	}
	return t.concat(r, Y(r, [], n));
}
function De(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Oe(e) {
	let t = K(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = B(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = x(n) !== a || x(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function ke(e) {
	return z(e) ? e : e.contextElement;
}
function X(e) {
	let t = ke(e);
	if (!B(t)) return C(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Oe(t), o = (a ? x(n.width) : n.width) / r, s = (a ? x(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ae = /*#__PURE__*/ C(0);
function je(e) {
	let t = L(e);
	return !Te() || !t.visualViewport ? Ae : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Me(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === L(e);
}
function Z(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = ke(e), o = C(1);
	t && (r ? z(r) && (o = X(r)) : o = X(e));
	let s = Me(a, n, r) ? je(a) : C(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = L(a), t = z(r) ? L(r) : r, n = e, i = De(n);
		for (; i && t !== n;) {
			let e = X(i), t = i.getBoundingClientRect(), r = K(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = L(i), i = De(n);
		}
	}
	return P({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Q(e, t) {
	let n = q(e).scrollLeft;
	return t ? t.left + n : Z(R(e)).left + n;
}
function Ne(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Q(e, n),
		y: n.top + t.scrollTop
	};
}
function Pe(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = R(r), s = t ? H(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = C(1), u = C(0), d = B(r);
	if ((d || !a) && ((I(r) !== "body" || V(o)) && (c = q(r)), d)) {
		let e = Z(r);
		l = X(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ne(o, c) : C(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Fe(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Ie(e) {
	let t = q(e), n = e.ownerDocument.body, r = b(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = b(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Q(e), o = -t.scrollTop;
	return K(n).direction === "rtl" && (a += b(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Le = 25;
function Re(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = L(e), a = R(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Te() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Q(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Le && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function ze(e, t) {
	let n = Z(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = X(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Be(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Re(e, n, t);
	else if (t === "document") r = Ie(R(e));
	else if (z(t)) r = ze(t, n);
	else {
		let n = je(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return P(r);
}
function Ve(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Y(e, [], !1).filter((e) => z(e) && I(e) !== "body"), i = null, a = K(e).position === "fixed", o = a ? J(e) : e;
	for (; z(o) && !G(o);) {
		let e = K(o), t = W(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = J(o);
	}
	return t.set(e, r), r;
}
function He(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? H(t) ? [] : Ve(t, this._c) : [].concat(n), r], o = Be(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Be(t, a[e], i);
		s = b(n.top, s), c = y(n.right, c), l = y(n.bottom, l), u = b(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Ue(e) {
	let { width: t, height: n } = Oe(e);
	return {
		width: t,
		height: n
	};
}
function We(e, t, n) {
	let r = B(t), i = R(t), a = n === "fixed", o = Z(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = C(0);
	if ((r || !a) && ((I(t) !== "body" || V(i)) && (s = q(t)), r)) {
		let e = Z(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Q(i));
	let l = i && !r && !a ? Ne(i, s) : C(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function $(e) {
	return K(e).position === "static";
}
function Ge(e, t) {
	if (!B(e) || K(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return R(e) === n && (n = n.ownerDocument.body), n;
}
function Ke(e, t) {
	let n = L(e);
	if (H(e)) return n;
	if (!B(e)) {
		let t = J(e);
		for (; t && !G(t);) {
			if (z(t) && !$(t)) return t;
			t = J(t);
		}
		return n;
	}
	let r = Ge(e, t);
	for (; r && be(r) && $(r);) r = Ge(r, t);
	return r && G(r) && $(r) && !W(r) ? n : r || we(e) || n;
}
var qe = async function(e) {
	let t = this.getOffsetParent || Ke, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: We(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Je(e) {
	return K(e).direction === "rtl";
}
var Ye = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Pe,
	getDocumentElement: R,
	getClippingRect: He,
	getOffsetParent: Ke,
	getElementRects: qe,
	getClientRects: Fe,
	getDimensions: Ue,
	getScale: X,
	isElement: z,
	isRTL: Je
};
function Xe(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ze(e, t, n) {
	let r = null, i, a = R(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = S(d), h = S(a.clientWidth - (u + f)), g = S(a.clientHeight - (d + p)), _ = S(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: b(0, y(1, c)) || 1
		}, x = !0;
		function C(t) {
			let n = t[0].intersectionRatio;
			if (!Xe(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!x) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			x = !1;
		}
		try {
			r = new IntersectionObserver(C, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(C, v);
		}
		r.observe(e);
	}
	let c = L(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Qe(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = ke(e), u = i || a ? [...l ? Y(l) : [], ...t ? Y(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Ze(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Z(e) : null;
	c && g();
	function g() {
		let t = Z(e);
		h && !Xe(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var $e = _e, et = me, tt = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Ye,
		...i.platform,
		_c: r
	};
	return pe(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@tiptap+suggestion@3.29.2_@floating-ui+dom@1.8.0_@tiptap+core@3.29.2_@tiptap+pm@3.29.2__@tiptap+pm@3.29.2/node_modules/@tiptap/suggestion/dist/index.js
function nt(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = p(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), m = o.nodeBefore?.isText && o.nodeBefore.text;
	if (!m) return null;
	let h = o.pos - m.length, g = Array.from(m.matchAll(f)).pop();
	if (!g || g.input === void 0 || g.index === void 0) return null;
	let _ = g.input.slice(Math.max(0, g.index - 1), g.index), v = RegExp(`^[${i?.join("")}\0]?$`).test(_);
	if (i !== null && !v) return null;
	let y = h + g.index, b = y + g[0].length;
	return s && l.test(m.slice(b - 1, b + 1)) && (g[0] += " ", b += 1), y < o.pos && b >= o.pos ? {
		range: {
			from: y,
			to: b
		},
		query: g[0].slice(t.length),
		text: g[0]
	} : null;
}
function rt(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function it(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function at(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : it(e);
}
function ot({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !rt(r);
}
function st({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function ct({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
	return {
		handleKeyDown(t, n) {
			var r;
			let i = e.getState(t.state);
			return i.active ? n.key === "Escape" || n.key === "Esc" ? ((r = a?.onKeyDown) == null || r.call(a, {
				view: t,
				event: n,
				range: i.range
			}), o(t), !0) : (a?.onKeyDown)?.call(a, {
				view: t,
				event: n,
				range: i.range
			}) || !1 : !1;
		},
		decorations(a) {
			let { active: o, range: s, decorationId: c, query: l } = e.getState(a);
			if (!o) return null;
			let u = !l?.length, d = [n];
			return u && d.push(i), v.create(a.doc, [g.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function lt({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
	return {
		init() {
			return {
				active: !1,
				range: {
					from: 0,
					to: 0
				},
				query: null,
				text: null,
				composing: !1,
				dismissedRange: null
			};
		},
		apply(d, f, p, m) {
			let { isEditable: h } = e, { composing: g } = e.view, { selection: _ } = d, { empty: v, from: y } = _, b = { ...f }, x = d.getMeta(u);
			if (x && x.exit) return b.active = !1, b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null, b.dismissedRange = f.active ? { ...f.range } : f.dismissedRange, b;
			if (b.composing = g, d.docChanged && b.dismissedRange !== null && (b.dismissedRange = {
				from: d.mapping.map(b.dismissedRange.from),
				to: d.mapping.map(b.dismissedRange.to)
			}), h && (v || e.view.composing)) {
				(y < f.range.from || y > f.range.to) && !g && !f.composing && (b.active = !1);
				let u = o({
					char: t,
					allowSpaces: n,
					allowToIncludeChar: r,
					allowedPrefixes: i,
					startOfLine: a,
					$position: _.$from
				}), p = `id_${Math.floor(Math.random() * 4294967295)}`;
				u && s({
					editor: e,
					state: m,
					range: u.range,
					isActive: f.active
				}) && (!c || c({
					editor: e,
					range: u.range,
					query: u.query,
					text: u.text,
					transaction: d
				})) ? (b.dismissedRange !== null && !l({
					match: u,
					dismissedRange: b.dismissedRange,
					state: m,
					transaction: d
				}) && (b.dismissedRange = null), b.dismissedRange === null ? (b.active = !0, b.decorationId = f.decorationId || p, b.range = u.range, b.query = u.query, b.text = u.text) : b.active = !1) : (u || (b.dismissedRange = null), b.active = !1);
			} else b.active = !1;
			return b.active || (b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null), b;
		}
	};
}
function ut({ editor: e, items: t }) {
	let n = null, r = null, i = null, a = () => {
		r !== null && (clearTimeout(r), r = null), i?.(), i = null;
	}, o = (e) => new Promise((t) => {
		i = t, r = setTimeout(() => {
			r = null;
			let e = i;
			i = null, e?.();
		}, e);
	}), s = () => {
		n?.abort(), a(), n = null;
	};
	return {
		abort: s,
		fetch: async (r, i) => {
			s(), n = new AbortController();
			let a = n;
			if (i > 0 && await o(i), n !== a || a.signal.aborted) return { status: "aborted" };
			try {
				let i = await t({
					editor: e,
					query: r,
					signal: a.signal
				});
				return n !== a || a.signal.aborted ? { status: "aborted" } : {
					status: "resolved",
					items: i
				};
			} catch {
				return n !== a || a.signal.aborted ? { status: "aborted" } : { status: "error" };
			}
		}
	};
}
function dt({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [$e({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(et()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function ft(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function pt({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && ft(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = Qe(c, o, () => {
			tt(c, o, {
				placement: n.placement,
				strategy: n.strategy,
				middleware: n.middleware
			}).then(({ x: e, y: t, placement: n, strategy: r }) => {
				if (s.onPosition) {
					s.onPosition({
						x: e,
						y: t,
						placement: n,
						strategy: r
					});
					return;
				}
				Object.assign(o.style, {
					position: r,
					left: `${e}px`,
					top: `${t}px`
				}), l || (l = !0, o.style.visibility = "");
			});
		}, s.autoUpdate), f;
		return i && (f = (e) => {
			let n = e.target;
			!(n instanceof Node) || o.contains(n) || t.contains(n) || a();
		}, document.addEventListener("pointerdown", f, !0)), () => {
			d(), f && document.removeEventListener("pointerdown", f, !0), u && o.remove();
		};
	};
}
function mt({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = ut({
		editor: e,
		items: n
	}), v = dt({
		placement: s,
		offset: c,
		flip: u,
		floatingUi: d
	});
	function y(e, t) {
		var n, i, a;
		switch (e) {
			case "started":
				(n = r?.onStart) == null || n.call(r, t);
				break;
			case "updated":
				(i = r?.onUpdate) == null || i.call(r, t);
				break;
			case "stopped": (a = r?.onExit) == null || a.call(r, t);
		}
	}
	return {
		update: async (n, d) => {
			var b, x;
			let S = t.getState(d), C = t.getState(n.state);
			if (!S || !C) return;
			let w = null, T = S.query !== C.query, E = S.text !== C.text, D = S.range.from !== C.range.from || S.range.to !== C.range.to, O = T || E || D;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && O) w = "updated";
			else return;
			let k = w === "stopped" ? S : C, A = n.dom.querySelector(`[data-decoration-id="${k.decorationId}"]`), j = m(n, A), M = i === 0 || (k.query ? k.query.length >= i : !1), ee = (w === "started" || w === "updated") && M;
			if (g = {
				editor: e,
				range: k.range,
				query: k.query || "",
				text: k.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: k.range,
					props: t
				}),
				decorationNode: A,
				clientRect: j,
				loading: ee,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: pt({
					getReferenceRect: j,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") if (!ee) _.abort(), g = {
				...g,
				items: o ?? [],
				loading: !1
			};
			else {
				g = {
					...g,
					items: o ?? [],
					loading: !0
				}, w = "updated", y(w, g);
				let e = await _.fetch(k.query || "", a);
				if (e.status === "aborted") return;
				if (!t.getState(n.state)?.active) {
					_.abort();
					return;
				}
				g = e.status === "resolved" ? {
					...g,
					items: e.items,
					loading: !1
				} : {
					...g,
					loading: !1
				};
			}
			if (w === "stopped") {
				_.abort(), y(w, g), g = void 0;
				return;
			}
			w === "updated" && y(w, g);
		},
		destroy: () => {
			var e;
			_.abort(), g && ((e = r?.onExit) == null || e.call(r, g));
		}
	};
}
var ht = new m("suggestion");
function gt({ pluginKey: e = ht, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: v = {}, container: y, flip: b = !0, floatingUi: x, dismissOnOutsideClick: S = !0, render: C = () => ({}), allow: w = () => !0, findSuggestionMatch: T = nt, shouldShow: E, shouldResetDismissed: D }) {
	let O = C?.(), k = r && !i, A = (n, r) => at(t, n, r, e);
	function j(e) {
		return ot({
			...e,
			editor: t,
			shouldResetDismissed: D,
			effectiveAllowSpaces: k
		});
	}
	let M = (t) => st({
		view: t,
		pluginKeyRef: e
	});
	return new _({
		key: e,
		view: () => mt({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: O,
			minQueryLength: p,
			debounce: m,
			initialItems: h,
			placement: g,
			offset: v,
			container: y,
			flip: b,
			floatingUi: x,
			dismissOnOutsideClick: S,
			command: d,
			clientRectFor: A,
			dispatchExit: M
		}),
		state: lt({
			editor: t,
			char: n,
			effectiveAllowSpaces: k,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: T,
			allow: w,
			shouldShow: E,
			shouldKeepDismissed: j,
			pluginKey: e
		}),
		props: ct({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: O,
			dispatchExit: M
		})
	});
}
var _t = gt, vt = ["id"], yt = {
	key: 0,
	class: "tpl:px-3 tpl:py-2 tpl:text-xs tpl:text-[var(--tpl-text-dim)]",
	"data-testid": "merge-tag-suggestion-empty"
}, bt = [
	"id",
	"aria-selected",
	"data-selected",
	"data-merge-tag-value",
	"onMousedown",
	"onMousemove"
], xt = { class: "tpl:font-medium" }, St = { class: "tpl:text-[var(--tpl-text-dim)] tpl:font-mono" }, Ct = /* @__PURE__ */ a({
	__name: "MergeTagSuggestionList",
	props: {
		items: {},
		selectedIndex: {},
		emptyText: {},
		listId: {}
	},
	emits: ["select", "hover"],
	setup(i) {
		let a = i;
		function u(e) {
			return a.listId ? `${a.listId}-opt-${e}` : void 0;
		}
		return (a, f) => (n(), s("div", {
			id: i.listId,
			class: "tpl:min-w-[200px] tpl:max-w-[320px] tpl:max-h-[50vh] tpl:overflow-y-auto tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:py-1 tpl:shadow-lg",
			role: "listbox",
			"data-testid": "merge-tag-suggestion-list"
		}, [i.items.length === 0 ? (n(), s("div", yt, r(i.emptyText), 1)) : l("", !0), (n(!0), s(c, null, e(i.items, (e, c) => (n(), s("button", {
			key: e.value,
			id: u(c),
			type: "button",
			role: "option",
			"aria-selected": c === i.selectedIndex,
			"data-selected": c === i.selectedIndex ? "true" : "false",
			"data-merge-tag-value": e.value,
			class: t(["tpl:flex tpl:w-full tpl:flex-col tpl:items-start tpl:gap-0.5 tpl:px-3 tpl:py-1.5 tpl:text-left tpl:text-xs tpl:transition-colors", c === i.selectedIndex ? "tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary)]" : "tpl:text-[var(--tpl-text)] hover:tpl:bg-[var(--tpl-bg-hover)]"]),
			onMousedown: d((t) => a.$emit("select", e), ["prevent", "stop"]),
			onMousemove: (e) => c !== i.selectedIndex && a.$emit("hover", c)
		}, [o("span", xt, r(e.label), 1), o("span", St, r(e.value), 1)], 42, bt))), 128))], 8, vt));
	}
}), wt = 10, Tt = 0;
function Et(e, t) {
	let n = t.trim().toLowerCase();
	return n === "" ? e.slice(0, wt) : e.filter((e) => {
		let t = e.label.toLowerCase(), r = e.value.toLowerCase();
		return t.includes(n) || r.includes(n);
	}).slice(0, wt);
}
function Dt(e, t, n, r) {
	return t.length === 0 ? e.key === "Enter" || e.key === "Tab" : e.key === "ArrowDown" ? (n.value = (n.value + 1) % t.length, !0) : e.key === "ArrowUp" ? (n.value = (n.value - 1 + t.length) % t.length, !0) : e.key === "Enter" || e.key === "Tab" ? (r(t[n.value]), !0) : !1;
}
function Ot(e, t) {
	let n = null, r = null, a = null, o = i([]), s = i(0), c = null, l = `tpl-merge-tag-suggestion-${++Tt}`, d = null, p = [], m = null;
	function h() {
		b(d?.() ?? null);
	}
	function g() {
		h(), m !== null && cancelAnimationFrame(m), m = requestAnimationFrame(() => {
			m = null, h();
		});
	}
	function _(e) {
		let t = [], n = e?.parentElement ?? null;
		for (; n && n !== document.body && n !== document.documentElement;) {
			let e = window.getComputedStyle(n), r = e.overflow + e.overflowX + e.overflowY;
			/(auto|scroll|overlay)/.test(r) && t.push(n), n = n.parentElement;
		}
		return t;
	}
	function v(e) {
		p = [window, ..._(e)];
		for (let e of p) e.addEventListener("scroll", h, {
			passive: !0,
			capture: !0
		});
		window.addEventListener("resize", h, { passive: !0 });
	}
	function y() {
		for (let e of p) e.removeEventListener("scroll", h, { capture: !0 });
		window.removeEventListener("resize", h), p = [];
	}
	function b(e) {
		if (!r || !e || e.bottom < 0 || e.top > window.innerHeight) return;
		r.style.position = "absolute", r.style.zIndex = "9999";
		let t = r.offsetParent?.getBoundingClientRect(), n = t?.top ?? 0, i = t?.left ?? 0;
		r.style.left = `${e.left - i}px`, r.style.top = `${e.bottom - n}px`;
		let a = r.offsetHeight;
		if (a !== 0 && window.innerHeight - e.bottom < a) {
			let t = Math.max(0, e.top - a);
			r.style.top = `${t - n}px`;
		}
	}
	function x(e, t) {
		let n = t?.closest("[data-tpl-theme]");
		if (!n) return;
		let r = n.getAttribute("data-tpl-theme");
		r && e.setAttribute("data-tpl-theme", r);
		let i = window.getComputedStyle(n);
		for (let t = 0; t < i.length; t++) {
			let n = i[t];
			n.startsWith("--tpl-") && e.style.setProperty(n, i.getPropertyValue(n));
		}
		e.style.fontFamily = i.fontFamily, e.style.fontSize = i.fontSize, e.style.lineHeight = i.lineHeight;
	}
	function S(e) {
		a && (e ? (a.setAttribute("role", "combobox"), a.setAttribute("aria-haspopup", "listbox"), a.setAttribute("aria-expanded", "true"), a.setAttribute("aria-controls", l)) : (a.removeAttribute("aria-expanded"), a.removeAttribute("aria-controls"), a.removeAttribute("aria-activedescendant"), a.removeAttribute("aria-haspopup"), a.removeAttribute("role")));
	}
	function C() {
		if (a) {
			if (o.value.length === 0) {
				a.removeAttribute("aria-activedescendant");
				return;
			}
			a.setAttribute("aria-activedescendant", `${l}-opt-${s.value}`);
		}
	}
	function w(e) {
		c?.(e);
	}
	return {
		open: ({ items: i, getRect: p, anchorEl: m, onCommand: h }) => {
			o.value = i, s.value = 0, c = h, r = document.createElement("div"), r.setAttribute("data-testid", "merge-tag-suggestion-popup"), a = m, x(r, m), (t?.value ?? document.body).appendChild(r), n = f({ render() {
				return u(Ct, {
					items: o.value,
					selectedIndex: s.value,
					emptyText: e,
					listId: l,
					onSelect: (e) => w(e),
					onHover: (e) => {
						s.value = e, C();
					}
				});
			} }), n.mount(r), S(!0), C(), d = p, g(), v(m);
		},
		update: ({ items: e, getRect: t, onCommand: n }) => {
			o.value = e, s.value >= e.length && (s.value = 0), c = n, C(), d = t, g();
		},
		handleKeyDown: (e) => {
			let t = Dt(e, o.value, s, w);
			return t && C(), t;
		},
		close: () => {
			r !== null && (m !== null && (cancelAnimationFrame(m), m = null), y(), S(!1), n?.unmount(), r.remove(), n = null, r = null, a = null, c = null, d = null);
		},
		isOpen: () => r !== null
	};
}
function kt(e, t) {
	return () => {
		let n = Ot(e, t);
		return {
			onStart: (e) => {
				let t = e.editor.view?.dom;
				n.open({
					items: e.items,
					getRect: e.clientRect ?? null,
					anchorEl: t ?? null,
					onCommand: (t) => e.command(t)
				});
			},
			onUpdate: (e) => {
				n.update({
					items: e.items,
					getRect: e.clientRect ?? null,
					onCommand: (t) => e.command(t)
				});
			},
			onKeyDown: (e) => e.event.key === "Escape" || n.handleKeyDown(e.event),
			onExit: () => n.close()
		};
	};
}
var At = h.create({
	name: "mergeTagSuggestion",
	addOptions() {
		return {
			mergeTags: [],
			char: "{{",
			emptyText: "No matching merge tags",
			popoverRoot: null
		};
	},
	addProseMirrorPlugins() {
		let e = this.options.mergeTags, t = this.options.emptyText, n = this.options.popoverRoot, r = {
			char: this.options.char,
			allowSpaces: !1,
			startOfLine: !1,
			allowedPrefixes: null,
			items: ({ query: t }) => Et(e, t),
			command: ({ editor: e, range: t, props: n }) => {
				e.chain().focus().insertContentAt(t, {
					type: "mergeTagNode",
					attrs: {
						label: n.label,
						value: n.value
					}
				}).run();
			},
			render: kt(t, n)
		};
		return [_t({
			editor: this.editor,
			...r
		})];
	}
});
//#endregion
export { Dt as i, Ot as n, Et as r, At as t };
