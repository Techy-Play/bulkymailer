import { Et as e, O as t, _ as n, d as r, l as i, nt as a, s as o, u as s, x as c } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { B as l } from "./keys-BI6VSUh4.js";
import { t as u } from "./useI18n-BkHfCWC6.js";
import { t as d } from "./circle-alert-6q_jgtv_.js";
import { t as f } from "./triangle-alert-CiN0ssB3.js";
//#region src/components/canvas/BlockIssueBadge.vue?vue&type=script&setup=true&lang.ts
var p = ["title", "aria-label"], m = /* @__PURE__ */ n({
	__name: "BlockIssueBadge",
	props: { blockId: {} },
	setup(n) {
		let m = n, { t: h } = u(), g = c(l, null), _ = o(() => (g?.issues.value ?? []).filter((e) => e.blockId === m.blockId)), v = o(() => _.value.some((e) => e.severity === "error") ? "error" : _.value.some((e) => e.severity === "warning") ? "warning" : null), y = o(() => v.value === "error" ? h.issues.badgeError : h.issues.badgeWarning);
		return (n, o) => v.value ? (t(), r("span", {
			key: 0,
			class: e(["tpl:absolute tpl:top-1 tpl:right-1 tpl:z-10 tpl:flex tpl:size-5 tpl:items-center tpl:justify-center tpl:rounded-full tpl:bg-[var(--tpl-bg)] tpl:shadow-[var(--tpl-shadow-sm)] tpl:ring-1 tpl:ring-[var(--tpl-border)]", v.value === "error" ? "tpl:text-[var(--tpl-danger)]" : "tpl:text-[var(--tpl-warning)]"]),
			title: y.value,
			"aria-label": y.value,
			role: "img"
		}, [v.value === "error" ? (t(), i(a(d), {
			key: 0,
			size: 14,
			"stroke-width": 2.25,
			fill: "currentColor",
			stroke: "var(--tpl-bg)"
		})) : (t(), i(a(f), {
			key: 1,
			size: 14,
			"stroke-width": 2.25,
			fill: "currentColor",
			stroke: "var(--tpl-bg)"
		}))], 10, p)) : s("", !0);
	}
});
//#endregion
export { m as default };
