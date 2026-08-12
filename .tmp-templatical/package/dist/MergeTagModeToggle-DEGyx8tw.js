import { A as e, Dt as t, O as n, Ot as r, _ as i, c as a, d as o, l as s, nt as c, r as l, s as u, u as d, x as f } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { j as p } from "./dist-CQ0fVBQ3.js";
import { E as m } from "./keys-BI6VSUh4.js";
import { t as h } from "./useI18n-BkHfCWC6.js";
import { t as g } from "./createLucideIcon-D7GKhya2.js";
import { t as _ } from "./sparkles-BHEE-vRD.js";
var v = g("monitor", [
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "21",
		y2: "21",
		key: "1svkeh"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "17",
		y2: "21",
		key: "vw1qmm"
	}]
]), y = g("smartphone", [["rect", {
	width: "14",
	height: "20",
	x: "5",
	y: "2",
	rx: "2",
	ry: "2",
	key: "1yt0o3"
}], ["path", {
	d: "M12 18h.01",
	key: "mhygvu"
}]]), b = g("text-cursor-input", [
	["path", {
		d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6",
		key: "1528k5"
	}],
	["path", {
		d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7",
		key: "13ksps"
	}],
	["path", {
		d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1",
		key: "1n9rhb"
	}],
	["path", {
		d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1",
		key: "1mj8rg"
	}],
	["path", {
		d: "M9 6v12",
		key: "velyjx"
	}]
]), x = ["aria-label"], S = [
	"aria-checked",
	"aria-label",
	"title",
	"onClick"
], C = /* @__PURE__ */ i({
	__name: "ViewportToggle",
	props: { viewport: {} },
	emits: ["change"],
	setup(i, { emit: d }) {
		let f = i, p = d, { t: m } = h(), g = u(() => [{
			value: "desktop",
			label: m.viewport.desktop
		}, {
			value: "mobile",
			label: m.viewport.mobile
		}]), _ = u(() => `translateX(${g.value.findIndex((e) => e.value === f.viewport) * 100}%)`);
		return (u, d) => (n(), o("div", {
			role: "radiogroup",
			"aria-label": c(m).viewport.label,
			class: "tpl:relative tpl:grid tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1",
			style: t({
				gridTemplateColumns: `repeat(${g.value.length}, 1fr)`,
				backgroundColor: "var(--tpl-bg-hover)"
			})
		}, [a("div", {
			class: "tpl:absolute tpl:inset-y-1 tpl:rounded-[var(--tpl-radius-sm)]",
			style: t({
				left: "4px",
				width: `calc((100% - 8px) / ${g.value.length})`,
				transform: _.value,
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow)",
				transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			})
		}, null, 4), (n(!0), o(l, null, e(g.value, (e) => (n(), o("button", {
			key: e.value,
			role: "radio",
			"aria-checked": i.viewport === e.value,
			"aria-label": e.label,
			class: "tpl:relative tpl:z-10 tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium",
			style: t({
				color: i.viewport === e.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				transition: "color 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			title: e.label,
			onClick: (t) => p("change", e.value)
		}, [e.value === "desktop" ? (n(), s(c(v), {
			key: 0,
			size: 18,
			"stroke-width": 1.5
		})) : (n(), s(c(y), {
			key: 1,
			size: 18,
			"stroke-width": 1.5
		})), a("span", null, r(e.label), 1)], 12, S))), 128))], 12, x));
	}
}), w = ["aria-label"], T = [
	"aria-checked",
	"aria-label",
	"title",
	"onClick"
], E = /* @__PURE__ */ i({
	__name: "MergeTagModeToggle",
	props: { sampleMode: { type: Boolean } },
	emits: ["change"],
	setup(i, { emit: g }) {
		let v = i, y = g, { t: x } = h(), S = f(m, []), C = u(() => p(S)), E = u(() => [{
			value: !0,
			label: x.mergeTagPreview.sample
		}, {
			value: !1,
			label: x.mergeTagPreview.labelView
		}]), D = u(() => `translateX(${E.value.findIndex((e) => e.value === v.sampleMode) * 100}%)`);
		return (u, f) => C.value ? (n(), o("div", {
			key: 0,
			role: "radiogroup",
			"aria-label": c(x).mergeTagPreview.label,
			"data-testid": "merge-tag-mode-toggle",
			class: "tpl:relative tpl:grid tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1",
			style: t({
				gridTemplateColumns: `repeat(${E.value.length}, 1fr)`,
				backgroundColor: "var(--tpl-bg-hover)"
			})
		}, [a("div", {
			class: "tpl:absolute tpl:inset-y-1 tpl:rounded-[var(--tpl-radius-sm)]",
			style: t({
				left: "4px",
				width: `calc((100% - 8px) / ${E.value.length})`,
				transform: D.value,
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow)",
				transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			})
		}, null, 4), (n(!0), o(l, null, e(E.value, (e) => (n(), o("button", {
			key: String(e.value),
			role: "radio",
			"aria-checked": i.sampleMode === e.value,
			"aria-label": e.label,
			class: "tpl:relative tpl:z-10 tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium",
			style: t({
				color: i.sampleMode === e.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				transition: "color 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			title: e.label,
			onClick: (t) => y("change", e.value)
		}, [e.value ? (n(), s(c(_), {
			key: 0,
			size: 18,
			"stroke-width": 1.5
		})) : (n(), s(c(b), {
			key: 1,
			size: 18,
			"stroke-width": 1.5
		})), a("span", null, r(e.label), 1)], 12, T))), 128))], 12, w)) : d("", !0);
	}
});
//#endregion
export { v as i, C as n, y as r, E as t };
