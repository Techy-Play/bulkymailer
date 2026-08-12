import { Ct as e, F as t, S as n, St as r, Tt as i, _t as a, a as o, at as s, bt as c, ct as l, dt as u, f as d, ft as f, gt as p, ht as m, it as h, kt as ee, lt as g, mt as _, n as v, o as y, ot as te, pt as ne, st as b, t as x, ut as re, vt as S, w as C, wt as w, xt as T, y as ie, yt as E } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
//#region ../../node_modules/.pnpm/@vue+runtime-dom@3.5.41/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var D = void 0, ae = typeof window < "u" && window.trustedTypes;
if (ae) try {
	D = /* @__PURE__ */ ae.createPolicy("vue", { createHTML: (e) => e });
} catch (e) {
	process.env.NODE_ENV !== "production" && t(`Error creating trusted types policy: ${e}`);
}
var oe = D ? (e) => D.createHTML(e) : (e) => e, se = "http://www.w3.org/2000/svg", ce = "http://www.w3.org/1998/Math/MathML", O = typeof document < "u" ? document : null, le = O && /* @__PURE__ */ O.createElement("template"), ue = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? O.createElementNS(se, e) : t === "mathml" ? O.createElementNS(ce, e) : n ? O.createElement(e, { is: n }) : O.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => O.createTextNode(e),
	createComment: (e) => O.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => O.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			le.innerHTML = oe(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = le.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, k = "transition", A = "animation", j = /* @__PURE__ */ Symbol("_vtc"), de = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, fe = /* @__PURE__ */ b({}, v, de), pe = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = fe, e))((e, { slots: t }) => ie(x, me(e), t)), M = (e, t = []) => {
	u(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, N = (e) => e ? u(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function me(e) {
	let t = {};
	for (let n in e) n in de || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: l = o, appearToClass: u = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: f = `${n}-leave-active`, leaveToClass: p = `${n}-leave-to` } = e, m = he(i), h = m && m[0], ee = m && m[1], { onBeforeEnter: g, onEnter: _, onEnterCancelled: v, onLeave: y, onLeaveCancelled: te, onBeforeAppear: ne = g, onAppear: x = _, onAppearCancelled: re = v } = t, S = (e, t, n, r) => {
		e._enterCancelled = r, I(e, t ? u : s), I(e, t ? l : o), n && n();
	}, C = (e, t) => {
		e._isLeaving = !1, I(e, d), I(e, p), I(e, f), t && t();
	}, w = (e) => (t, n) => {
		let i = e ? x : _, o = () => S(t, e, n);
		M(i, [t, o]), L(() => {
			I(t, e ? c : a), F(t, e ? u : s), N(i) || R(t, r, h, o);
		});
	};
	return b(t, {
		onBeforeEnter(e) {
			M(g, [e]), F(e, a), F(e, o);
		},
		onBeforeAppear(e) {
			M(ne, [e]), F(e, c), F(e, l);
		},
		onEnter: w(!1),
		onAppear: w(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => C(e, t);
			F(e, d), e._enterCancelled ? (F(e, f), V(e)) : (V(e), F(e, f)), L(() => {
				e._isLeaving && (I(e, d), F(e, p), N(y) || R(e, r, ee, n));
			}), M(y, [e, n]);
		},
		onEnterCancelled(e) {
			S(e, !1, void 0, !0), M(v, [e]);
		},
		onAppearCancelled(e) {
			S(e, !0, void 0, !0), M(re, [e]);
		},
		onLeaveCancelled(e) {
			C(e), M(te, [e]);
		}
	});
}
function he(e) {
	if (e == null) return null;
	if (p(e)) return [P(e.enter), P(e.leave)];
	{
		let t = P(e);
		return [t, t];
	}
}
function P(e) {
	let t = ee(e);
	return process.env.NODE_ENV !== "production" && o(t, "<transition> explicit duration"), t;
}
function F(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[j] || (e[j] = /* @__PURE__ */ new Set())).add(t);
}
function I(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[j];
	n && (n.delete(t), n.size || (e[j] = void 0));
}
function L(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var ge = 0;
function R(e, t, n, r) {
	let i = e._endId = ++ge, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = _e(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function _e(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${k}Delay`), a = r(`${k}Duration`), o = z(i, a), s = r(`${A}Delay`), c = r(`${A}Duration`), l = z(s, c), u = null, d = 0, f = 0;
	t === k ? o > 0 && (u = k, d = o, f = a.length) : t === A ? l > 0 && (u = A, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? k : A : null, f = u ? u === k ? a.length : c.length : 0);
	let p = u === k && /\b(?:transform|all)(?:,|$)/.test(r(`${k}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function z(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => B(t) + B(e[n])));
}
function B(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function V(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function ve(e, t, n) {
	let r = e[j];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var H = /* @__PURE__ */ Symbol("_vod"), ye = /* @__PURE__ */ Symbol("_vsh"), be = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[H] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : U(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), U(e, !0), r.enter(e)) : r.leave(e, () => {
			U(e, !1);
		}) : U(e, t));
	},
	beforeUnmount(e, { value: t }) {
		U(e, t);
	}
};
function U(e, t) {
	e.style.display = t ? e[H] : "none", e[ye] = !t;
}
var xe = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "CSS_VAR_TEXT"), Se = /(?:^|;)\s*display\s*:/;
function Ce(e, t, n) {
	let r = e.style, i = T(n), a = !1;
	if (n && !i) {
		if (t) if (T(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? W(r, t, "");
		}
		else for (let e in t) n[e] ?? W(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? W(r, i, "") : Oe(e, i, !T(t) && t ? t[i] : void 0, o) || W(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[xe];
			e && (n += ";" + e), r.cssText = n, a = Se.test(n);
		}
	} else t && e.removeAttribute("style");
	H in e && (e[H] = a ? r.display : "", e[ye] && (r.display = "none"));
}
var we = /[^\\];\s*$/, Te = /\s*!important$/;
function W(e, n, r) {
	if (u(r)) r.forEach((t) => W(e, n, t));
	else if (r ??= "", process.env.NODE_ENV !== "production" && we.test(r) && t(`Unexpected semicolon at the end of '${n}' style value: '${r}'`), n.startsWith("--")) e.setProperty(n, r);
	else {
		let t = De(e, n);
		Te.test(r) ? e.setProperty(l(t), r.replace(Te, ""), "important") : e[t] = r;
	}
}
var Ee = [
	"Webkit",
	"Moz",
	"ms"
], G = {};
function De(e, t) {
	let n = G[t];
	if (n) return n;
	let r = s(t);
	if (r !== "filter" && r in e) return G[t] = r;
	r = te(r);
	for (let n = 0; n < Ee.length; n++) {
		let i = Ee[n] + r;
		if (i in e) return G[t] = i;
	}
	return t;
}
function Oe(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && T(r) && n === r;
}
var ke = "http://www.w3.org/1999/xlink";
function Ae(e, t, n, i, a, o = c(t)) {
	i && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ke, t.slice(6, t.length)) : e.setAttributeNS(ke, t, n) : n == null || o && !g(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : r(n) ? String(n) : n);
}
function je(e, n, r, i, a) {
	if (n === "innerHTML" || n === "textContent") {
		r != null && (e[n] = n === "innerHTML" ? oe(r) : r);
		return;
	}
	let o = e.tagName;
	if (n === "value" && o !== "PROGRESS" && !o.includes("-")) {
		let t = o === "OPTION" ? e.getAttribute("value") || "" : e.value, i = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
		(t !== i || !("_value" in e)) && (e.value = i), r ?? e.removeAttribute(n), e._value = r;
		return;
	}
	let s = !1;
	if (r === "" || r == null) {
		let t = typeof e[n];
		t === "boolean" ? r = g(r) : r == null && t === "string" ? (r = "", s = !0) : t === "number" && (r = 0, s = !0);
	}
	try {
		e[n] = r;
	} catch (e) {
		process.env.NODE_ENV !== "production" && !s && t(`Failed setting prop "${n}" on <${o.toLowerCase()}>: value ${r} is invalid.`, e);
	}
	s && e.removeAttribute(a || n);
}
function K(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Me(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var Ne = /* @__PURE__ */ Symbol("_vei");
function Pe(e, t, n, r, i = null) {
	let a = e[Ne] || (e[Ne] = {}), o = a[t];
	if (r && o) o.value = process.env.NODE_ENV === "production" ? r : He(r, t);
	else {
		let [n, s] = Le(t);
		r ? K(e, n, a[t] = Ve(process.env.NODE_ENV === "production" ? r : He(r, t), i), s) : o && (Me(e, n, o, s), a[t] = void 0);
	}
}
var Fe = /(Once|Passive|Capture)$/, Ie = /^on:?(?:Once|Passive|Capture)$/;
function Le(e) {
	let t, n;
	for (; (n = e.match(Fe)) && !Ie.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : l(e.slice(2)), t];
}
var Re = 0, ze = /* @__PURE__ */ Promise.resolve(), Be = () => Re ||= (ze.then(() => Re = 0), Date.now());
function Ve(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (u(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && y(e, t, 5, a);
			}
		} else y(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Be(), n;
}
function He(e, n) {
	return f(e) || u(e) ? e : (t(`Wrong type passed as event handler to ${n} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`), h);
}
var Ue = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, We = (e, t, n, r, i, o) => {
	let c = i === "svg";
	t === "class" ? ve(e, r, c) : t === "style" ? Ce(e, n, r) : a(t) ? m(t) || Pe(e, t, n, r, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ge(e, t, r, c)) ? (je(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ae(e, t, r, c, o, t !== "value")) : e._isVueCE && (Ke(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !T(r))) ? je(e, s(t), r, o, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ae(e, t, r, c));
};
function Ge(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ue(t) && f(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ue(t) && T(n) ? !1 : t in e;
}
function Ke(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = s(t);
	return Array.isArray(n) ? n.some((e) => s(e) === r) : Object.keys(n).some((e) => s(e) === r);
}
var q = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return u(t) ? (e) => re(t, e) : t;
};
function qe(e) {
	e.target.composing = !0;
}
function Je(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var J = /* @__PURE__ */ Symbol("_assign"), Y = /* @__PURE__ */ Symbol("_initialValue");
function X(e, t, n) {
	return t && (e = e.trim()), n && (e = i(e)), e;
}
var Ye = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Y] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Y] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[J] = q(i);
		let a = r || i.props && i.props.type === "number";
		K(e, t ? "change" : "input", (t) => {
			t.target.composing || e[J](X(e.value, n, a));
		}), (n || a) && K(e, "change", () => {
			e.value = X(e.value, n, a);
		}), t || (K(e, "compositionstart", qe), K(e, "compositionend", Je), K(e, "change", Je));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Y];
		delete e[Y], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[J](X(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: a, number: o } }, s) {
		if (e[J] = q(s), e.composing) return;
		let c = (o || e.type === "number") && !/^0\d/.test(e.value) ? i(e.value) : e.value, l = t ?? "";
		if (c === l) return;
		let u = e.getRootNode();
		(u instanceof Document || u instanceof ShadowRoot) && u.activeElement === e && e.type !== "range" && (r && t === n || a && e.value.trim() === l) || (e.value = l);
	}
}, Xe = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, K(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? i(Q(e)) : Q(e));
			e[J](e.multiple ? E(e._modelValue) ? new Set(t) : t : t[0]), e._assigning = !0, C(() => {
				e._assigning = !1;
			});
		}), e[J] = q(r);
	},
	mounted(e, { value: t }) {
		Z(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[J] = q(n);
	},
	updated(e, { value: t }) {
		e._assigning || Z(e, t);
	}
};
function Z(n, r) {
	let i = n.multiple, a = u(r);
	if (i && !a && !E(r)) {
		process.env.NODE_ENV !== "production" && t(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(r).slice(8, -1)}.`);
		return;
	}
	for (let t = 0, o = n.options.length; t < o; t++) {
		let o = n.options[t], s = Q(o);
		if (i) if (a) {
			let e = typeof s;
			o.selected = e === "string" || e === "number" ? r.some((e) => String(e) === String(s)) : w(r, s) > -1;
		} else o.selected = r.has(s);
		else if (e(Q(o), r)) {
			n.selectedIndex !== t && (n.selectedIndex = t);
			return;
		}
	}
	!i && n.selectedIndex !== -1 && (n.selectedIndex = -1);
}
function Q(e) {
	return "_value" in e ? e._value : e.value;
}
var Ze = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Qe = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Ze.some((n) => e[`${n}Key`] && !t.includes(n))
}, $e = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Qe[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, et = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, tt = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = l(n.key);
		if (t.some((e) => e === r || et[e] === r)) return e(n);
	}));
}, nt = /* @__PURE__ */ b({ patchProp: We }, ue), rt;
function $() {
	return rt ||= d(nt);
}
var it = ((...e) => {
	$().render(...e);
}), at = ((...e) => {
	let t = $().createApp(...e);
	process.env.NODE_ENV !== "production" && (st(t), ct(t));
	let { mount: n } = t;
	return t.mount = (e) => {
		let r = lt(e);
		if (!r) return;
		let i = t._component;
		!f(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, ot(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function ot(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function st(e) {
	Object.defineProperty(e.config, "isNativeTag", {
		value: (e) => ne(e) || S(e) || _(e),
		writable: !1
	});
}
function ct(e) {
	if (n()) {
		let n = e.config.isCustomElement;
		Object.defineProperty(e.config, "isCustomElement", {
			get() {
				return n;
			},
			set() {
				t("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
			}
		});
		let r = e.config.compilerOptions, i = "The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka \"full build\"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader's `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc";
		Object.defineProperty(e.config, "compilerOptions", {
			get() {
				return t(i), r;
			},
			set() {
				t(i);
			}
		});
	}
}
function lt(e) {
	if (T(e)) {
		let n = document.querySelector(e);
		return process.env.NODE_ENV !== "production" && !n && t(`Failed to mount app: mount target selector "${e}" returned null.`), n;
	}
	return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && t("mounting on a ShadowRoot with `{mode: \"closed\"}` may lead to unpredictable bugs"), e;
}
//#endregion
export { Ye as a, $e as c, Xe as i, at as n, be as o, it as r, tt as s, pe as t };
