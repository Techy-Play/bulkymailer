import { $ as e, A as t, B as n, Q as r, S as i, X as a, Z as o, et as s, f as c, it as l, nt as u, w as d, z as f } from "./draggable-BRF_Q_jB.js";
import { _ as p, a as m, b as h, c as g, f as _, i as v, l as y, m as b, n as x, o as S, p as C, r as w, s as T, t as E, u as D } from "./dist-Dp46rwVY.js";
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.41_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var O = m ? window : void 0, k = m ? window.document : void 0, A = m ? window.navigator : void 0;
function j(e) {
	let t = u(e);
	return t?.$el ?? t;
}
function M(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = c(() => {
		let t = _(u(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return h(() => [
		n.value?.map((e) => j(e)) ?? [O].filter((e) => e != null),
		_(u(n.value ? e[1] : e[0])),
		_(l(n.value ? e[2] : e[1])),
		u(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = T(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
var N = !1;
function P(e, t, n = {}) {
	let { window: r = O, ignore: i = [], capture: a = !0, detectIframe: o = !1, controls: s = !1 } = n;
	if (!r) return s ? {
		stop: g,
		cancel: g,
		trigger: g
	} : g;
	if (S && !N) {
		N = !0;
		let e = { passive: !0 };
		Array.from(r.document.body.children).forEach((t) => t.addEventListener("click", g, e)), r.document.documentElement.addEventListener("click", g, e);
	}
	let c = !0, l = (e) => u(i).some((t) => {
		if (typeof t == "string") return Array.from(r.document.querySelectorAll(t)).some((t) => t === e.target || e.composedPath().includes(t));
		{
			let n = j(t);
			return n && (e.target === n || e.composedPath().includes(n));
		}
	});
	function d(e) {
		let t = u(e);
		return t && t.$.subTree.shapeFlag === 16;
	}
	function f(e, t) {
		let n = u(e), r = n.$.subTree && n.$.subTree.children;
		return r == null || !Array.isArray(r) ? !1 : r.some((e) => e.el === t.target || t.composedPath().includes(e.el));
	}
	let p = (n) => {
		let r = j(e);
		if (n.target != null && !(!(r instanceof Element) && d(e) && f(e, n)) && !(!r || r === n.target || n.composedPath().includes(r))) {
			if ("detail" in n && n.detail === 0 && (c = !l(n)), !c) {
				c = !0;
				return;
			}
			t(n);
		}
	}, m = !1, h = [
		M(r, "click", (e) => {
			m || (m = !0, setTimeout(() => {
				m = !1;
			}, 0), p(e));
		}, {
			passive: !0,
			capture: a
		}),
		M(r, "pointerdown", (t) => {
			let n = j(e);
			c = !l(t) && !!(n && !t.composedPath().includes(n));
		}, { passive: !0 }),
		o && M(r, "blur", (n) => {
			setTimeout(() => {
				let i = j(e), a = r.document.activeElement;
				for (; a?.shadowRoot;) a = a.shadowRoot.activeElement;
				a?.tagName === "IFRAME" && !i?.contains(r.document.activeElement) && t(n);
			}, 0);
		}, { passive: !0 })
	].filter(Boolean), _ = () => h.forEach((e) => e());
	return s ? {
		stop: _,
		cancel: () => {
			c = !1;
		},
		trigger: (e) => {
			c = !0, p(e), c = !1;
		}
	} : _;
}
function F() {
	let n = e(!1), r = i();
	return r && t(() => {
		n.value = !0;
	}, r), n;
}
/* @__NO_SIDE_EFFECTS__ */
function I(e) {
	return F(), c(() => !!e());
}
function L(e, t, n = {}) {
	let { window: r = O, ...i } = n, a, o = /* @__PURE__ */ I(() => r && "MutationObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, l = f(c(() => {
		let t = _(u(e)).map(j).filter(y);
		return new Set(t);
	}), (e) => {
		s(), o.value && e.size && (a = new MutationObserver(t), e.forEach((e) => a.observe(e, i)));
	}, {
		immediate: !0,
		flush: "post"
	}), d = () => a?.takeRecords(), p = () => {
		l(), s();
	};
	return b(p), {
		isSupported: o,
		stop: p,
		takeRecords: d
	};
}
var R = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function z() {
	let e = d() ? v(R, null) : null;
	return typeof e == "number" ? e : void 0;
}
function B(t, r = {}) {
	let { window: i = O, ssrWidth: a = /* @__PURE__ */ z() } = r, o = /* @__PURE__ */ I(() => i && "matchMedia" in i && typeof i.matchMedia == "function"), s = e(typeof a == "number"), l = e(), d = e(!1);
	return n(() => {
		if (s.value) {
			s.value = !o.value;
			let e = u(t).split(",");
			d.value = e.some((e) => {
				let t = e.includes("not all"), n = e.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), r = e.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), i = !!(n || r);
				return n && i && (i = a >= D(n[1])), r && i && (i = a <= D(r[1])), t ? !i : i;
			});
			return;
		}
		o.value && (l.value = i.matchMedia(u(t)), d.value = l.value.matches);
	}), M(l, "change", (e) => {
		d.value = e.matches;
	}, { passive: !0 }), c(() => d.value);
}
function V(t, n = {}) {
	let { controls: r = !1, navigator: i = A } = n, a = /* @__PURE__ */ I(() => i && "permissions" in i), o = e(), c = typeof t == "string" ? { name: t } : t, l = e(), u = () => {
		l.value = o.value?.state ?? "prompt";
	};
	M(o, "change", u, { passive: !0 });
	let d = x(async () => {
		if (a.value) {
			if (!o.value) try {
				o.value = await i.permissions.query(c);
			} catch {
				o.value = void 0;
			} finally {
				u();
			}
			if (r) return s(o.value);
		}
	});
	return d(), r ? {
		state: l,
		isSupported: a,
		query: d
	} : l;
}
function H(t = {}) {
	let { navigator: n = A, read: i = !1, source: a, copiedDuring: o = 1500, legacy: s = !1 } = t, l = /* @__PURE__ */ I(() => n && "clipboard" in n), d = V("clipboard-read"), f = V("clipboard-write"), m = c(() => l.value || s), h = e(""), g = e(!1), _ = e(!1), v = p(() => g.value = !1, o, { immediate: !1 }), y = 0;
	async function b() {
		let e = !(l.value && T(d.value));
		if (!e) try {
			h.value = await n.clipboard.readText();
		} catch {
			e = !0;
		}
		e && (h.value = w());
	}
	m.value && i && M(["copy", "cut"], b, { passive: !0 });
	async function x(e) {
		let t = e ?? u(a);
		if (m.value && t != null) {
			_.value = !0;
			let e = !(l.value && T(f.value));
			if (!e) try {
				let e = S(t);
				await n.clipboard.write([e]);
			} catch {
				e = !0;
			}
			if (e) if (typeof t == "string") h.value = t, C(t);
			else {
				let e = ++y, n = await t();
				n != null && e === y && (h.value = n, C(n));
			}
			g.value = !0, v.start(), _.value = !1;
		}
	}
	function S(e) {
		return typeof e == "string" ? (h.value = e, new ClipboardItem({ "text/plain": e })) : new ClipboardItem({ "text/plain": e().then((e = "") => (h.value = e, new Blob([e], { type: "text/plain" }))) });
	}
	function C(e) {
		let t = document.createElement("textarea");
		t.value = e, t.style.position = "absolute", t.style.opacity = "0", t.setAttribute("readonly", ""), document.body.appendChild(t), t.select(), document.execCommand("copy"), t.remove();
	}
	function w() {
		var e, t;
		return ((e = document) == null || (t = e.getSelection) == null || (t = t.call(e)) == null ? void 0 : t.toString()) ?? "";
	}
	function T(e) {
		return e === "granted" || e === "prompt";
	}
	return {
		copyPending: r(_),
		isSupported: m,
		text: r(h),
		copied: r(g),
		copy: x
	};
}
function U(t, n = {}) {
	let r = e(!1), i = e(null), a = 0, o = !0;
	if (m) {
		let e = typeof n == "function" ? { onDrop: n } : n, s = e.multiple ?? !0, c = e.preventDefaultForUnhandled ?? !1, u = (e) => {
			let t = Array.from(e.dataTransfer?.files ?? []);
			return t.length === 0 ? null : s ? t : [t[0]];
		}, d = (t) => {
			let n = l(e.dataTypes);
			return typeof n == "function" ? n(t) : !n?.length || t.length !== 0 && t.every((e) => n.some((t) => e.includes(t)));
		}, f = (t) => {
			if (e.checkValidity) return e.checkValidity(t);
			let n = Array.from(t ?? []).map((e) => e.type);
			return d(n) && (s || t.length <= 1);
		}, p = () => /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent) && !("chrome" in window), m = (t, n) => {
			let s = t.dataTransfer?.items;
			if (o = (s && f(s)) ?? !1, c && t.preventDefault(), !p() && !o) {
				t.dataTransfer && (t.dataTransfer.dropEffect = "none");
				return;
			}
			t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "copy");
			let l = u(t);
			switch (n) {
				case "enter":
					var d;
					a += 1, r.value = !0, (d = e.onEnter) == null || d.call(e, null, t);
					break;
				case "over":
					var m;
					(m = e.onOver) == null || m.call(e, null, t);
					break;
				case "leave":
					var h;
					--a, a === 0 && (r.value = !1), (h = e.onLeave) == null || h.call(e, null, t);
					break;
				case "drop": if (a = 0, r.value = !1, o) {
					var g;
					i.value = l, (g = e.onDrop) == null || g.call(e, l, t);
				}
			}
		};
		M(t, "dragenter", (e) => m(e, "enter")), M(t, "dragover", (e) => m(e, "over")), M(t, "dragleave", (e) => m(e, "leave")), M(t, "drop", (e) => m(e, "drop"));
	}
	return {
		files: i,
		isOverDropZone: r
	};
}
function W(e, t, n = {}) {
	let { window: r = O, ...i } = n, a, o = /* @__PURE__ */ I(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, l = f(c(() => {
		let t = u(e);
		return Array.isArray(t) ? t.map((e) => j(e)) : [j(t)];
	}), (e) => {
		if (s(), o.value && r) {
			a = new ResizeObserver(t);
			for (let t of e) t && a.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), d = () => {
		s(), l();
	};
	return b(d), {
		isSupported: o,
		stop: d
	};
}
function G(t, n = {}) {
	let { reset: r = !0, windowResize: i = !0, windowScroll: a = !0, immediate: o = !0, updateTiming: s = "sync" } = n, c = e(0), l = e(0), u = e(0), d = e(0), p = e(0), m = e(0), h = e(0), g = e(0);
	function _() {
		let e = j(t);
		if (!e) {
			r && (c.value = 0, l.value = 0, u.value = 0, d.value = 0, p.value = 0, m.value = 0, h.value = 0, g.value = 0);
			return;
		}
		let n = e.getBoundingClientRect();
		c.value = n.height, l.value = n.bottom, u.value = n.left, d.value = n.right, p.value = n.top, m.value = n.width, h.value = n.x, g.value = n.y;
	}
	function v() {
		s === "sync" ? _() : s === "next-frame" && requestAnimationFrame(() => _());
	}
	return W(t, v), f(() => j(t), (e) => !e && v()), L(t, v, { attributeFilter: ["style", "class"] }), a && M("scroll", v, {
		capture: !0,
		passive: !0
	}), i && M("resize", v, { passive: !0 }), C(() => {
		o && v();
	}), {
		height: c,
		bottom: l,
		left: u,
		right: d,
		top: p,
		width: m,
		x: h,
		y: g,
		update: v
	};
}
function K(t, n, r = {}) {
	let { root: i, rootMargin: a, threshold: o = 0, window: s = O, immediate: l = !0 } = r, d = /* @__PURE__ */ I(() => s && "IntersectionObserver" in s), p = c(() => _(u(t)).map(j).filter(y)), m = g, h = e(l), v = d.value ? f(() => [
		p.value,
		j(i),
		u(a),
		h.value
	], ([e, t, r]) => {
		if (m(), !h.value || !e.length) return;
		let i = new IntersectionObserver(n, {
			root: j(t),
			rootMargin: r,
			threshold: o
		});
		e.forEach((e) => e && i.observe(e)), m = () => {
			i.disconnect(), m = g;
		};
	}, {
		immediate: l,
		flush: "post"
	}) : g, x = () => {
		m(), v(), h.value = !1;
	};
	return b(x), {
		isSupported: d,
		isActive: h,
		pause() {
			m(), h.value = !1;
		},
		resume() {
			h.value = !0;
		},
		stop: x
	};
}
var q = {
	multiple: !0,
	accept: "*",
	reset: !1,
	directory: !1
};
function J(e) {
	if (!e) return null;
	if (e instanceof FileList) return e;
	let t = new DataTransfer();
	for (let n of e) t.items.add(n);
	return t.files;
}
function Y(e = {}) {
	let { document: t = k } = e, r = o(J(e.initialFiles)), { on: i, trigger: s } = E(), { on: l, trigger: d } = E(), f = c(() => {
		let n = j(e.input) ?? (t ? t.createElement("input") : void 0);
		return n && (n.type = "file", n.onchange = (e) => {
			r.value = e.target.files, s(r.value);
		}, n.oncancel = () => {
			d();
		}), n;
	}), p = () => {
		r.value = null, f.value && f.value.value && (f.value.value = "", s(null));
	}, m = (e) => {
		let t = f.value;
		t && (t.multiple = u(e.multiple), t.accept = u(e.accept), t.webkitdirectory = u(e.directory), w(e, "capture") && (t.capture = u(e.capture)));
	};
	return n(() => {
		m(e);
	}), {
		files: a(r),
		open: (t) => {
			let n = f.value;
			if (!n) return;
			let r = {
				...q,
				...e,
				...t
			};
			m(r), u(r.reset) && p(), n.click();
		},
		reset: p,
		onCancel: l,
		onChange: i
	};
}
//#endregion
export { M as a, B as c, G as i, H as n, Y as o, U as r, K as s, P as t };

//# sourceMappingURL=dist-BLF-S9_A.js.map