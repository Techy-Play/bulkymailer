import { O as e, Ot as t, _ as n, c as r, d as i, h as a, m as o, nt as s } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { R as c } from "./useEditorCore-BMbxdUbY.js";
import { t as l } from "./useI18n-BkHfCWC6.js";
import { t as u } from "./x-B4WnJVRx.js";
//#region src/components/SavedBlocksPickBar.vue?vue&type=script&setup=true&lang.ts
var d = {
	"data-testid": "saved-blocks-pick-bar",
	class: "tpl:absolute tpl:bottom-10 tpl:left-12 tpl:right-[320px] tpl:z-50 tpl:flex tpl:justify-center tpl:px-4",
	style: { "pointer-events": "none" }
}, f = ["aria-label"], p = { class: "tpl:flex tpl:flex-col" }, m = {
	"data-testid": "saved-blocks-pick-count",
	class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text)]"
}, h = { class: "tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, g = { class: "tpl:flex tpl:items-center tpl:gap-1.5" }, _ = ["disabled"], v = /* @__PURE__ */ n({
	__name: "SavedBlocksPickBar",
	props: { count: {} },
	emits: ["confirm", "cancel"],
	setup(n, { emit: v }) {
		let y = n, b = v, { t: x, format: S } = l();
		function C() {
			y.count > 0 && b("confirm");
		}
		return (l, v) => (e(), i("div", d, [r("div", {
			role: "toolbar",
			"aria-label": s(x).savedBlocks.pickToolbar,
			class: "tpl-scale-in tpl:flex tpl:items-center tpl:gap-3 tpl:rounded-[var(--tpl-radius-lg)] tpl:border tpl:py-2 tpl:pl-4 tpl:pr-2 tpl:border-[var(--tpl-border)]",
			style: {
				"pointer-events": "auto",
				"background-color": "var(--tpl-bg-elevated)",
				"box-shadow": "var(--tpl-shadow-xl)"
			}
		}, [r("div", p, [r("span", m, t(s(S)(s(x).savedBlocks.pickCount, { count: n.count })), 1), r("span", h, t(s(x).savedBlocks.pickHint), 1)]), r("div", g, [r("button", {
			type: "button",
			"data-testid": "saved-blocks-pick-cancel",
			class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]",
			onClick: v[0] ||= (e) => b("cancel")
		}, [a(s(u), {
			size: 13,
			"stroke-width": 2
		}), o(" " + t(s(x).savedBlocks.cancel), 1)]), r("button", {
			type: "button",
			"data-testid": "saved-blocks-pick-confirm",
			class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:rounded-md tpl:px-2.5 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
			disabled: n.count === 0,
			onClick: C
		}, [a(s(c), {
			size: 13,
			"stroke-width": 2
		}), o(" " + t(s(x).savedBlocks.save), 1)], 8, _)])], 8, f)]));
	}
});
//#endregion
export { v as default };
