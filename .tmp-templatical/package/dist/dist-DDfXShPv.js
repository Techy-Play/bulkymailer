import { E as e, H as t, I as n, K as r, W as i, X as a, Y as o, Z as s, b as c, et as l, v as u, w as d, x as f } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.41_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function p(e, n) {
	return t() ? (r(e, n), !0) : !1;
}
var m = /* @__PURE__ */ new WeakMap(), h = (...e) => {
	let n = e[0], r = u()?.proxy ?? t();
	if (r == null && !c()) throw Error("injectLocal must be called in setup");
	return r && m.has(r) && n in m.get(r) ? m.get(r)[n] : f(...e);
}, g = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var _ = (e) => e != null, v = Object.prototype.toString, y = (e) => v.call(e) === "[object Object]", b = () => {}, x = /* #__PURE__ */ S();
function S() {
	var e, t;
	return g && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function C(e, t) {
	function n(...n) {
		return new Promise((r, i) => {
			Promise.resolve(e(() => t.apply(this, n), {
				fn: t,
				thisArg: this,
				args: n
			})).then(r).catch(i);
		});
	}
	return "cancel" in e && Object.assign(n, {
		cancel: e.cancel,
		flush: e.flush,
		isPending: e.isPending
	}), n;
}
var w = (e) => e();
function T(e, t = {}) {
	let n, r, i = b, o = b, c = s(!1), u = (e) => {
		clearTimeout(e), i(), i = b;
	}, d;
	return Object.assign((a) => {
		let s = l(e), f = l(t.maxWait);
		return n && u(n), s <= 0 || f !== void 0 && f <= 0 ? (r &&= (u(r), void 0), c.value = !1, Promise.resolve(a())) : (c.value = !0, new Promise((e, l) => {
			i = t.rejectOnCancel ? l : e, o = e, d = a, f && !r && (r = setTimeout(() => {
				n && u(n), r = void 0, c.value = !1, e(d());
			}, f)), n = setTimeout(() => {
				r && u(r), r = void 0, c.value = !1, e(a());
			}, s);
		}));
	}, {
		cancel: () => {
			n &&= (u(n), void 0), r &&= (u(r), void 0), c.value = !1, o = b;
		},
		flush: () => {
			if (c.value) {
				n &&= (clearTimeout(n), void 0), r &&= (clearTimeout(r), void 0), c.value = !1;
				let e = o;
				i = b, o = b, e(d());
			}
		},
		isPending: a(c)
	});
}
function E(e) {
	return e.endsWith("rem") ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function D(e) {
	return Array.isArray(e) ? e : [e];
}
function O(e) {
	return e || u();
}
function k(e, t = 200, n = {}) {
	return C(T(t, n), e);
}
function A(e, t = 200, r = {}) {
	let i = o(l(e)), s = k(() => {
		i.value = e.value;
	}, t, r);
	return n(e, () => s()), a(i);
}
function j(e, t, r = {}) {
	let { eventFilter: i = w, ...a } = r;
	return n(e, C(i, t), a);
}
function M(t, n = !0, r) {
	O(r) ? e(t, r) : n ? t() : d(t);
}
function N(e, t = 1e3, r = {}) {
	let { immediate: o = !0, immediateCallback: c = !1 } = r, u = null, d = s(!1);
	function f() {
		u &&= (clearInterval(u), null);
	}
	function m() {
		d.value = !1, f();
	}
	function h() {
		let n = l(t);
		n <= 0 || (d.value = !0, c && e(), f(), d.value && (u = setInterval(e, n)));
	}
	return o && g && h(), (i(t) || typeof t == "function") && p(n(t, () => {
		d.value && g && h();
	})), p(m), {
		isActive: a(d),
		pause: m,
		resume: h
	};
}
function P(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, o = s(!1), c;
	function u() {
		c &&= (clearTimeout(c), void 0);
	}
	function d() {
		o.value = !1, u();
	}
	function f(...n) {
		i && e(), u(), o.value = !0, c = setTimeout(() => {
			o.value = !1, c = void 0, e(...n);
		}, l(t));
	}
	return r && (o.value = !0, g && f()), p(d), {
		isPending: a(o),
		start: f,
		stop: d
	};
}
function F(e = !1, t = {}) {
	let { truthyValue: n = !0, falsyValue: r = !1 } = t, a = i(e), o = s(e);
	function c(e) {
		if (arguments.length) return o.value = e, o.value;
		{
			let e = l(n);
			return o.value = o.value === e ? l(r) : e, o.value;
		}
	}
	return a ? c : [o, c];
}
function I(e, t, n = {}) {
	let { debounce: r = 0, maxWait: i = void 0, ...a } = n;
	return j(e, t, {
		...a,
		eventFilter: T(r, { maxWait: i })
	});
}
function L(e, t, r) {
	return n(e, t, {
		...r,
		immediate: !0
	});
}
//#endregion
export { L as _, b as a, A as c, p as d, k as f, I as g, F as h, y as i, D as l, P as m, g as n, _ as o, N as p, x as r, E as s, h as t, M as u };
