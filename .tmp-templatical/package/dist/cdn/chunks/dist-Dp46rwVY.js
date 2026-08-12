import { $ as e, A as t, G as n, J as r, K as i, O as a, Q as o, S as s, T as c, Z as l, nt as u, w as d, z as f } from "./draggable-BRF_Q_jB.js";
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.41_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function p(e, t) {
	return n() ? (r(e, t), !0) : !1;
}
function m() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return p(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
var h = /* @__PURE__ */ new WeakMap(), g = (...e) => {
	let t = e[0], r = s()?.proxy ?? n();
	if (r == null && !d()) throw Error("injectLocal must be called in setup");
	return r && h.has(r) && t in h.get(r) ? h.get(r)[t] : c(...e);
}, _ = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var v = (e) => e != null, y = Object.prototype.toString, b = (e) => y.call(e) === "[object Object]", x = () => {}, S = (e, t) => Object.hasOwn(e, t), C = /* #__PURE__ */ w();
function w() {
	var e, t;
	return _ && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function T(e, t) {
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
var E = (e) => e();
function D(t, n = {}) {
	let r, i, a = x, s = x, c = e(!1), l = (e) => {
		clearTimeout(e), a(), a = x;
	}, d;
	return Object.assign((e) => {
		let o = u(t), f = u(n.maxWait);
		return r && l(r), o <= 0 || f !== void 0 && f <= 0 ? (i &&= (l(i), void 0), c.value = !1, Promise.resolve(e())) : (c.value = !0, new Promise((t, u) => {
			a = n.rejectOnCancel ? u : t, s = t, d = e, f && !i && (i = setTimeout(() => {
				r && l(r), i = void 0, c.value = !1, t(d());
			}, f)), r = setTimeout(() => {
				i && l(i), i = void 0, c.value = !1, t(e());
			}, o);
		}));
	}, {
		cancel: () => {
			r &&= (l(r), void 0), i &&= (l(i), void 0), c.value = !1, s = x;
		},
		flush: () => {
			if (c.value) {
				r &&= (clearTimeout(r), void 0), i &&= (clearTimeout(i), void 0), c.value = !1;
				let e = s;
				a = x, s = x, e(d());
			}
		},
		isPending: o(c)
	});
}
function O(e) {
	let t;
	function n() {
		return t ||= e(), t;
	}
	return n.reset = async () => {
		let e = t;
		t = void 0, e && await e;
	}, n;
}
function k(e) {
	return e.endsWith("rem") ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function A(e) {
	return Array.isArray(e) ? e : [e];
}
function j(e) {
	return e || s();
}
function M(e, t = 200, n = {}) {
	return T(D(t, n), e);
}
function N(e, t = 200, n = {}) {
	let r = l(u(e)), i = M(() => {
		r.value = e.value;
	}, t, n);
	return f(e, () => i()), o(r);
}
function P(e, t, n = {}) {
	let { eventFilter: r = E, ...i } = n;
	return f(e, T(r, t), i);
}
function F(e, n = !0, r) {
	j(r) ? t(e, r) : n ? e() : a(e);
}
function I(t, n = 1e3, r = {}) {
	let { immediate: a = !0, immediateCallback: s = !1 } = r, c = null, l = e(!1);
	function d() {
		c &&= (clearInterval(c), null);
	}
	function m() {
		l.value = !1, d();
	}
	function h() {
		let e = u(n);
		e <= 0 || (l.value = !0, s && t(), d(), l.value && (c = setInterval(t, e)));
	}
	return a && _ && h(), (i(n) || typeof n == "function") && p(f(n, () => {
		l.value && _ && h();
	})), p(m), {
		isActive: o(l),
		pause: m,
		resume: h
	};
}
function L(t, n, r = {}) {
	let { immediate: i = !0, immediateCallback: a = !1 } = r, s = e(!1), c;
	function l() {
		c &&= (clearTimeout(c), void 0);
	}
	function d() {
		s.value = !1, l();
	}
	function f(...e) {
		a && t(), l(), s.value = !0, c = setTimeout(() => {
			s.value = !1, c = void 0, t(...e);
		}, u(n));
	}
	return i && (s.value = !0, _ && f()), p(d), {
		isPending: o(s),
		start: f,
		stop: d
	};
}
function R(t = !1, n = {}) {
	let { truthyValue: r = !0, falsyValue: a = !1 } = n, o = i(t), s = e(t);
	function c(e) {
		if (arguments.length) return s.value = e, s.value;
		{
			let e = u(r);
			return s.value = s.value === e ? u(a) : e, s.value;
		}
	}
	return o ? c : [s, c];
}
function z(e, t, n = {}) {
	let { debounce: r = 0, maxWait: i = void 0, ...a } = n;
	return P(e, t, {
		...a,
		eventFilter: D(r, { maxWait: i })
	});
}
function B(e, t, n) {
	return f(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
export { L as _, _ as a, B as b, x as c, N as d, A as f, I as g, M as h, g as i, v as l, p as m, O as n, C as o, F as p, S as r, b as s, m as t, k as u, R as v, z as y };

//# sourceMappingURL=dist-Dp46rwVY.js.map