import { M as e, P as t, T as n, ct as r, f as i, g as a, h as o, it as s, m as c, p as l, st as u, u as d, x as f } from "./draggable-BRF_Q_jB.js";
import { u as p } from "./src-CZjSXPYq.js";
import { E as m } from "./keys-CZOBuCQd.js";
import { t as h } from "./useI18n-aRMtgYRj.js";
import { E as g, O as _, et as v, p as y } from "./icons-DN008liP.js";
//#region src/components/ViewportToggle.vue?vue&type=script&setup=true&lang.ts
var b = ["aria-label"], x = [
	"aria-checked",
	"aria-label",
	"title",
	"onClick"
], S = /* @__PURE__ */ f({
	__name: "ViewportToggle",
	props: { viewport: {} },
	emits: ["change"],
	setup(n, { emit: o }) {
		let f = n, p = o, { t: m } = h(), g = i(() => [{
			value: "desktop",
			label: m.viewport.desktop
		}, {
			value: "mobile",
			label: m.viewport.mobile
		}]), y = i(() => `translateX(${g.value.findIndex((e) => e.value === f.viewport) * 100}%)`);
		return (i, o) => (e(), a("div", {
			role: "radiogroup",
			"aria-label": s(m).viewport.label,
			class: "tpl:relative tpl:grid tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1",
			style: u({
				gridTemplateColumns: `repeat(${g.value.length}, 1fr)`,
				backgroundColor: "var(--tpl-bg-hover)"
			})
		}, [l("div", {
			class: "tpl:absolute tpl:inset-y-1 tpl:rounded-[var(--tpl-radius-sm)]",
			style: u({
				left: "4px",
				width: `calc((100% - 8px) / ${g.value.length})`,
				transform: y.value,
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow)",
				transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			})
		}, null, 4), (e(!0), a(d, null, t(g.value, (t) => (e(), a("button", {
			key: t.value,
			role: "radio",
			"aria-checked": n.viewport === t.value,
			"aria-label": t.label,
			class: "tpl:relative tpl:z-10 tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium",
			style: u({
				color: n.viewport === t.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				transition: "color 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			title: t.label,
			onClick: (e) => p("change", t.value)
		}, [t.value === "desktop" ? (e(), c(s(v), {
			key: 0,
			size: 18,
			"stroke-width": 1.5
		})) : (e(), c(s(_), {
			key: 1,
			size: 18,
			"stroke-width": 1.5
		})), l("span", null, r(t.label), 1)], 12, x))), 128))], 12, b));
	}
}), C = ["aria-label"], w = [
	"aria-checked",
	"aria-label",
	"title",
	"onClick"
], T = /* @__PURE__ */ f({
	__name: "MergeTagModeToggle",
	props: { sampleMode: { type: Boolean } },
	emits: ["change"],
	setup(f, { emit: _ }) {
		let v = f, b = _, { t: x } = h(), S = n(m, []), T = i(() => p(S)), E = i(() => [{
			value: !0,
			label: x.mergeTagPreview.sample
		}, {
			value: !1,
			label: x.mergeTagPreview.labelView
		}]), D = i(() => `translateX(${E.value.findIndex((e) => e.value === v.sampleMode) * 100}%)`);
		return (n, i) => T.value ? (e(), a("div", {
			key: 0,
			role: "radiogroup",
			"aria-label": s(x).mergeTagPreview.label,
			"data-testid": "merge-tag-mode-toggle",
			class: "tpl:relative tpl:grid tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1",
			style: u({
				gridTemplateColumns: `repeat(${E.value.length}, 1fr)`,
				backgroundColor: "var(--tpl-bg-hover)"
			})
		}, [l("div", {
			class: "tpl:absolute tpl:inset-y-1 tpl:rounded-[var(--tpl-radius-sm)]",
			style: u({
				left: "4px",
				width: `calc((100% - 8px) / ${E.value.length})`,
				transform: D.value,
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow)",
				transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			})
		}, null, 4), (e(!0), a(d, null, t(E.value, (t) => (e(), a("button", {
			key: String(t.value),
			role: "radio",
			"aria-checked": f.sampleMode === t.value,
			"aria-label": t.label,
			class: "tpl:relative tpl:z-10 tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium",
			style: u({
				color: f.sampleMode === t.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				transition: "color 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			title: t.label,
			onClick: (e) => b("change", t.value)
		}, [t.value ? (e(), c(s(g), {
			key: 0,
			size: 18,
			"stroke-width": 1.5
		})) : (e(), c(s(y), {
			key: 1,
			size: 18,
			"stroke-width": 1.5
		})), l("span", null, r(t.label), 1)], 12, w))), 128))], 12, C)) : o("", !0);
	}
});
//#endregion
export { S as n, T as t };

//# sourceMappingURL=MergeTagModeToggle-CiYbOKzd.js.map