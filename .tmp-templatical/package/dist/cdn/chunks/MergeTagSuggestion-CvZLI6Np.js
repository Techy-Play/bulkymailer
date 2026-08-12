import { C as e, M as t, P as n, Z as r, ct as i, g as a, h as o, l as s, ot as c, p as l, r as u, u as d, x as f } from "./draggable-BRF_Q_jB.js";
import { h as p, m } from "./tiptap-CgwK_fKJ.js";
//#region src/components/MergeTagSuggestionList.vue?vue&type=script&setup=true&lang.ts
var h = ["id"], g = {
	key: 0,
	class: "tpl:px-3 tpl:py-2 tpl:text-xs tpl:text-[var(--tpl-text-dim)]",
	"data-testid": "merge-tag-suggestion-empty"
}, _ = [
	"id",
	"aria-selected",
	"data-selected",
	"data-merge-tag-value",
	"onMousedown",
	"onMousemove"
], v = { class: "tpl:font-medium" }, y = { class: "tpl:text-[var(--tpl-text-dim)] tpl:font-mono" }, b = /* @__PURE__ */ f({
	__name: "MergeTagSuggestionList",
	props: {
		items: {},
		selectedIndex: {},
		emptyText: {},
		listId: {}
	},
	emits: ["select", "hover"],
	setup(e) {
		let r = e;
		function u(e) {
			return r.listId ? `${r.listId}-opt-${e}` : void 0;
		}
		return (r, f) => (t(), a("div", {
			id: e.listId,
			class: "tpl:min-w-[200px] tpl:max-w-[320px] tpl:max-h-[50vh] tpl:overflow-y-auto tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:py-1 tpl:shadow-lg",
			role: "listbox",
			"data-testid": "merge-tag-suggestion-list"
		}, [e.items.length === 0 ? (t(), a("div", g, i(e.emptyText), 1)) : o("", !0), (t(!0), a(d, null, n(e.items, (n, o) => (t(), a("button", {
			key: n.value,
			id: u(o),
			type: "button",
			role: "option",
			"aria-selected": o === e.selectedIndex,
			"data-selected": o === e.selectedIndex ? "true" : "false",
			"data-merge-tag-value": n.value,
			class: c(["tpl:flex tpl:w-full tpl:flex-col tpl:items-start tpl:gap-0.5 tpl:px-3 tpl:py-1.5 tpl:text-left tpl:text-xs tpl:transition-colors", o === e.selectedIndex ? "tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary)]" : "tpl:text-[var(--tpl-text)] hover:tpl:bg-[var(--tpl-bg-hover)]"]),
			onMousedown: s((e) => r.$emit("select", n), ["prevent", "stop"]),
			onMousemove: (t) => o !== e.selectedIndex && r.$emit("hover", o)
		}, [l("span", v, i(n.label), 1), l("span", y, i(n.value), 1)], 42, _))), 128))], 8, h));
	}
}), x = 10, S = 0;
function C(e, t) {
	let n = t.trim().toLowerCase();
	return n === "" ? e.slice(0, x) : e.filter((e) => {
		let t = e.label.toLowerCase(), r = e.value.toLowerCase();
		return t.includes(n) || r.includes(n);
	}).slice(0, x);
}
function w(e, t, n, r) {
	return t.length === 0 ? e.key === "Enter" || e.key === "Tab" : e.key === "ArrowDown" ? (n.value = (n.value + 1) % t.length, !0) : e.key === "ArrowUp" ? (n.value = (n.value - 1 + t.length) % t.length, !0) : e.key === "Enter" || e.key === "Tab" ? (r(t[n.value]), !0) : !1;
}
function T(t, n) {
	let i = null, a = null, o = null, s = r([]), c = r(0), l = null, d = `tpl-merge-tag-suggestion-${++S}`, f = null, p = [], m = null;
	function h() {
		x(f?.() ?? null);
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
	function x(e) {
		if (!a || !e || e.bottom < 0 || e.top > window.innerHeight) return;
		a.style.position = "absolute", a.style.zIndex = "9999";
		let t = a.offsetParent?.getBoundingClientRect(), n = t?.top ?? 0;
		a.style.left = `${e.left - (t?.left ?? 0)}px`, a.style.top = `${e.bottom - n}px`;
		let r = a.offsetHeight;
		if (r !== 0 && window.innerHeight - e.bottom < r) {
			let t = Math.max(0, e.top - r);
			a.style.top = `${t - n}px`;
		}
	}
	function C(e, t) {
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
	function T(e) {
		o && (e ? (o.setAttribute("role", "combobox"), o.setAttribute("aria-haspopup", "listbox"), o.setAttribute("aria-expanded", "true"), o.setAttribute("aria-controls", d)) : (o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls"), o.removeAttribute("aria-activedescendant"), o.removeAttribute("aria-haspopup"), o.removeAttribute("role")));
	}
	function E() {
		if (o) {
			if (s.value.length === 0) {
				o.removeAttribute("aria-activedescendant");
				return;
			}
			o.setAttribute("aria-activedescendant", `${d}-opt-${c.value}`);
		}
	}
	function D(e) {
		l?.(e);
	}
	return {
		open: ({ items: r, getRect: p, anchorEl: m, onCommand: h }) => {
			s.value = r, c.value = 0, l = h, a = document.createElement("div"), a.setAttribute("data-testid", "merge-tag-suggestion-popup"), o = m, C(a, m), (n?.value ?? document.body).appendChild(a), i = u({ render() {
				return e(b, {
					items: s.value,
					selectedIndex: c.value,
					emptyText: t,
					listId: d,
					onSelect: (e) => D(e),
					onHover: (e) => {
						c.value = e, E();
					}
				});
			} }), i.mount(a), T(!0), E(), f = p, g(), v(m);
		},
		update: ({ items: e, getRect: t, onCommand: n }) => {
			s.value = e, c.value >= e.length && (c.value = 0), l = n, E(), f = t, g();
		},
		handleKeyDown: (e) => {
			let t = w(e, s.value, c, D);
			return t && E(), t;
		},
		close: () => {
			a !== null && (m !== null && (cancelAnimationFrame(m), m = null), y(), T(!1), i?.unmount(), a.remove(), i = null, a = null, o = null, l = null, f = null);
		},
		isOpen: () => a !== null
	};
}
function E(e, t) {
	return () => {
		let n = T(e, t);
		return {
			onStart: (e) => {
				n.open({
					items: e.items,
					getRect: e.clientRect ?? null,
					anchorEl: e.editor.view?.dom ?? null,
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
var D = p.create({
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
			items: ({ query: t }) => C(e, t),
			command: ({ editor: e, range: t, props: n }) => {
				e.chain().focus().insertContentAt(t, {
					type: "mergeTagNode",
					attrs: {
						label: n.label,
						value: n.value
					}
				}).run();
			},
			render: E(t, n)
		};
		return [m({
			editor: this.editor,
			...r
		})];
	}
});
//#endregion
export { w as i, T as n, C as r, D as t };

//# sourceMappingURL=MergeTagSuggestion-CvZLI6Np.js.map