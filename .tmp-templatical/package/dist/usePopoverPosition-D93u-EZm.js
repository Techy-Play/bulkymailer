import { E as e, I as t, L as n, Y as r, Z as i, b as a, et as o, nt as s, s as c, v as l, x as u } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { _ as d, a as f, d as p, i as m, l as h, n as g, o as _, r as v, s as y, t as b, u as x } from "./dist-DDfXShPv.js";
import { F as S } from "./keys-BI6VSUh4.js";
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.41_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var C = g ? window : void 0;
g && window.document, g && window.navigator, g && window.location;
function w(e) {
	let t = o(e);
	return t?.$el ?? t;
}
function T(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = c(() => {
		let t = h(o(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return d(() => [
		n.value?.map((e) => w(e)) ?? [C].filter((e) => e != null),
		h(o(n.value ? e[1] : e[0])),
		h(s(n.value ? e[2] : e[1])),
		o(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = m(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
var E = !1;
function D(e, t, n = {}) {
	let { window: r = C, ignore: i = [], capture: a = !0, detectIframe: s = !1, controls: c = !1 } = n;
	if (!r) return c ? {
		stop: f,
		cancel: f,
		trigger: f
	} : f;
	if (v && !E) {
		E = !0;
		let e = { passive: !0 };
		Array.from(r.document.body.children).forEach((t) => t.addEventListener("click", f, e)), r.document.documentElement.addEventListener("click", f, e);
	}
	let l = !0, u = (e) => o(i).some((t) => {
		if (typeof t == "string") return Array.from(r.document.querySelectorAll(t)).some((t) => t === e.target || e.composedPath().includes(t));
		{
			let n = w(t);
			return n && (e.target === n || e.composedPath().includes(n));
		}
	});
	function d(e) {
		let t = o(e);
		return t && t.$.subTree.shapeFlag === 16;
	}
	function p(e, t) {
		let n = o(e), r = n.$.subTree && n.$.subTree.children;
		return r == null || !Array.isArray(r) ? !1 : r.some((e) => e.el === t.target || t.composedPath().includes(e.el));
	}
	let m = (n) => {
		let r = w(e);
		if (n.target != null && !(!(r instanceof Element) && d(e) && p(e, n)) && !(!r || r === n.target || n.composedPath().includes(r))) {
			if ("detail" in n && n.detail === 0 && (l = !u(n)), !l) {
				l = !0;
				return;
			}
			t(n);
		}
	}, h = !1, g = [
		T(r, "click", (e) => {
			h || (h = !0, setTimeout(() => {
				h = !1;
			}, 0), m(e));
		}, {
			passive: !0,
			capture: a
		}),
		T(r, "pointerdown", (t) => {
			let n = w(e);
			l = !u(t) && !!(n && !t.composedPath().includes(n));
		}, { passive: !0 }),
		s && T(r, "blur", (n) => {
			setTimeout(() => {
				let i = w(e), a = r.document.activeElement;
				for (; a?.shadowRoot;) a = a.shadowRoot.activeElement;
				a?.tagName === "IFRAME" && !i?.contains(r.document.activeElement) && t(n);
			}, 0);
		}, { passive: !0 })
	].filter(Boolean), _ = () => g.forEach((e) => e());
	return c ? {
		stop: _,
		cancel: () => {
			l = !1;
		},
		trigger: (e) => {
			l = !0, m(e), l = !1;
		}
	} : _;
}
function O() {
	let t = i(!1), n = l();
	return n && e(() => {
		t.value = !0;
	}, n), t;
}
/* @__NO_SIDE_EFFECTS__ */
function k(e) {
	let t = O();
	return c(() => (t.value, !!e()));
}
function A(e, n, r = {}) {
	let { window: i = C, ...a } = r, s, l = /* @__PURE__ */ k(() => i && "MutationObserver" in i), u = () => {
		s &&= (s.disconnect(), void 0);
	}, d = t(c(() => {
		let t = h(o(e)).map(w).filter(_);
		return new Set(t);
	}), (e) => {
		u(), l.value && e.size && (s = new MutationObserver(n), e.forEach((e) => s.observe(e, a)));
	}, {
		immediate: !0,
		flush: "post"
	}), f = () => s?.takeRecords(), m = () => {
		d(), u();
	};
	return p(m), {
		isSupported: l,
		stop: m,
		takeRecords: f
	};
}
var j = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function M() {
	let e = a() ? b(j, null) : null;
	return typeof e == "number" ? e : void 0;
}
function N(e, t = {}) {
	let { window: r = C, ssrWidth: a = /* @__PURE__ */ M() } = t, s = /* @__PURE__ */ k(() => r && "matchMedia" in r && typeof r.matchMedia == "function"), l = i(typeof a == "number"), u = i(), d = i(!1);
	return n(() => {
		if (l.value) {
			l.value = !s.value;
			let t = o(e).split(",");
			d.value = t.some((e) => {
				let t = e.includes("not all"), n = e.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), r = e.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), i = !!(n || r);
				return n && i && (i = a >= y(n[1])), r && i && (i = a <= y(r[1])), t ? !i : i;
			});
			return;
		}
		s.value && (u.value = r.matchMedia(o(e)), d.value = u.value.matches);
	}), T(u, "change", (e) => {
		d.value = e.matches;
	}, { passive: !0 }), c(() => d.value);
}
function P(e, t = {}) {
	let n = i(!1), r = i(null), a = 0, o = !0;
	if (g) {
		let i = typeof t == "function" ? { onDrop: t } : t, c = i.multiple ?? !0, l = i.preventDefaultForUnhandled ?? !1, u = (e) => {
			let t = Array.from(e.dataTransfer?.files ?? []);
			return t.length === 0 ? null : c ? t : [t[0]];
		}, d = (e) => {
			let t = s(i.dataTypes);
			return typeof t == "function" ? t(e) : !t?.length || e.length !== 0 && e.every((e) => t.some((t) => e.includes(t)));
		}, f = (e) => {
			if (i.checkValidity) return i.checkValidity(e);
			let t = Array.from(e ?? []).map((e) => e.type), n = d(t), r = c || e.length <= 1;
			return n && r;
		}, p = () => /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent) && !("chrome" in window), m = (e, t) => {
			let s = e.dataTransfer?.items;
			if (o = (s && f(s)) ?? !1, l && e.preventDefault(), !p() && !o) {
				e.dataTransfer && (e.dataTransfer.dropEffect = "none");
				return;
			}
			e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
			let c = u(e);
			switch (t) {
				case "enter":
					var d;
					a += 1, n.value = !0, (d = i.onEnter) == null || d.call(i, null, e);
					break;
				case "over":
					var m;
					(m = i.onOver) == null || m.call(i, null, e);
					break;
				case "leave":
					var h;
					--a, a === 0 && (n.value = !1), (h = i.onLeave) == null || h.call(i, null, e);
					break;
				case "drop": if (a = 0, n.value = !1, o) {
					var g;
					r.value = c, (g = i.onDrop) == null || g.call(i, c, e);
				}
			}
		};
		T(e, "dragenter", (e) => m(e, "enter")), T(e, "dragover", (e) => m(e, "over")), T(e, "dragleave", (e) => m(e, "leave")), T(e, "drop", (e) => m(e, "drop"));
	}
	return {
		files: r,
		isOverDropZone: n
	};
}
function F(e, n, r = {}) {
	let { window: i = C, ...a } = r, s, l = /* @__PURE__ */ k(() => i && "ResizeObserver" in i), u = () => {
		s &&= (s.disconnect(), void 0);
	}, d = t(c(() => {
		let t = o(e);
		return Array.isArray(t) ? t.map((e) => w(e)) : [w(t)];
	}), (e) => {
		if (u(), l.value && i) {
			s = new ResizeObserver(n);
			for (let t of e) t && s.observe(t, a);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), f = () => {
		u(), d();
	};
	return p(f), {
		isSupported: l,
		stop: f
	};
}
function I(e, n = {}) {
	let { reset: r = !0, windowResize: a = !0, windowScroll: o = !0, immediate: s = !0, updateTiming: c = "sync" } = n, l = i(0), u = i(0), d = i(0), f = i(0), p = i(0), m = i(0), h = i(0), g = i(0);
	function _() {
		let t = w(e);
		if (!t) {
			r && (l.value = 0, u.value = 0, d.value = 0, f.value = 0, p.value = 0, m.value = 0, h.value = 0, g.value = 0);
			return;
		}
		let n = t.getBoundingClientRect();
		l.value = n.height, u.value = n.bottom, d.value = n.left, f.value = n.right, p.value = n.top, m.value = n.width, h.value = n.x, g.value = n.y;
	}
	function v() {
		c === "sync" ? _() : c === "next-frame" && requestAnimationFrame(() => _());
	}
	return F(e, v), t(() => w(e), (e) => !e && v()), A(e, v, { attributeFilter: ["style", "class"] }), o && T("scroll", v, {
		capture: !0,
		passive: !0
	}), a && T("resize", v, { passive: !0 }), x(() => {
		s && v();
	}), {
		height: l,
		bottom: u,
		left: d,
		right: f,
		top: p,
		width: m,
		x: h,
		y: g,
		update: v
	};
}
//#endregion
//#region src/utils/resolveColorsConfig.ts
var L = {
	presets: [],
	allowCustom: !0,
	allowCustomIgnored: !1,
	invalidPresets: []
}, R = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
function z(e, t = L) {
	let n, r;
	if (e?.presets === void 0) n = t.presets, r = [];
	else {
		n = [], r = [];
		for (let t of e.presets) R.test(t) ? n.push(t) : r.push(t);
	}
	let i = e?.allowCustom ?? t.allowCustom, a = !i && n.length === 0;
	return {
		presets: n,
		allowCustom: a ? !0 : i,
		allowCustomIgnored: a,
		invalidPresets: r
	};
}
//#endregion
//#region src/utils/color.ts
function B(e) {
	let t = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(e.trim());
	if (!t) return e;
	let n = (e) => Number(e).toString(16).padStart(2, "0");
	return `#${n(t[1])}${n(t[2])}${n(t[3])}`;
}
function V(e) {
	let t = B(e), n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t);
	return n ? `#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}`.toLowerCase() : /^#[0-9a-f]{6}$/i.test(t) ? t.toLowerCase() : t;
}
//#endregion
//#region src/composables/usePopoverRoot.ts
function H() {
	return u(S, r(null));
}
//#endregion
//#region src/composables/usePopoverPosition.ts
function U() {
	let e = H();
	function t(t) {
		let n = e.value?.getBoundingClientRect();
		return n ? {
			top: t.top - n.top,
			left: t.left - n.left
		} : {
			top: t.top,
			left: t.left
		};
	}
	return { toLocal: t };
}
//#endregion
export { L as a, P as c, N as d, B as i, I as l, H as n, z as o, V as r, D as s, U as t, T as u };
