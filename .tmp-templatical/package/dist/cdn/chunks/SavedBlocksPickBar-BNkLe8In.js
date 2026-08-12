import { M as e, ct as t, g as n, it as r, p as i, v as a, x as o, y as s } from "./draggable-BRF_Q_jB.js";
import "./useEditorCore-CTYH6u4r.js";
import { t as c } from "./useI18n-aRMtgYRj.js";
import { Bt as l, n as u } from "./icons-DN008liP.js";
//#region src/components/SavedBlocksPickBar.vue?vue&type=script&setup=true&lang.ts
var d = {
	"data-testid": "saved-blocks-pick-bar",
	class: "tpl:absolute tpl:bottom-10 tpl:left-12 tpl:right-[320px] tpl:z-50 tpl:flex tpl:justify-center tpl:px-4",
	style: { "pointer-events": "none" }
}, f = ["aria-label"], p = { class: "tpl:flex tpl:flex-col" }, m = {
	"data-testid": "saved-blocks-pick-count",
	class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text)]"
}, h = { class: "tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, g = { class: "tpl:flex tpl:items-center tpl:gap-1.5" }, _ = ["disabled"], v = /* @__PURE__ */ o({
	__name: "SavedBlocksPickBar",
	props: { count: {} },
	emits: ["confirm", "cancel"],
	setup(o, { emit: v }) {
		let y = o, b = v, { t: x, format: S } = c();
		function C() {
			y.count > 0 && b("confirm");
		}
		return (c, v) => (e(), n("div", d, [i("div", {
			role: "toolbar",
			"aria-label": r(x).savedBlocks.pickToolbar,
			class: "tpl-scale-in tpl:flex tpl:items-center tpl:gap-3 tpl:rounded-[var(--tpl-radius-lg)] tpl:border tpl:py-2 tpl:pl-4 tpl:pr-2 tpl:border-[var(--tpl-border)]",
			style: {
				"pointer-events": "auto",
				"background-color": "var(--tpl-bg-elevated)",
				"box-shadow": "var(--tpl-shadow-xl)"
			}
		}, [i("div", p, [i("span", m, t(r(S)(r(x).savedBlocks.pickCount, { count: o.count })), 1), i("span", h, t(r(x).savedBlocks.pickHint), 1)]), i("div", g, [i("button", {
			type: "button",
			"data-testid": "saved-blocks-pick-cancel",
			class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]",
			onClick: v[0] ||= (e) => b("cancel")
		}, [s(r(u), {
			size: 13,
			"stroke-width": 2
		}), a(" " + t(r(x).savedBlocks.cancel), 1)]), i("button", {
			type: "button",
			"data-testid": "saved-blocks-pick-confirm",
			class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:rounded-md tpl:px-2.5 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
			disabled: o.count === 0,
			onClick: C
		}, [s(r(l), {
			size: 13,
			"stroke-width": 2
		}), a(" " + t(r(x).savedBlocks.save), 1)], 8, _)])], 8, f)]));
	}
});
//#endregion
export { v as default };

//# sourceMappingURL=SavedBlocksPickBar-BNkLe8In.js.map