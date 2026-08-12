import { M as e, T as t, f as n, g as r, h as i, it as a, m as o, ot as s, x as c } from "./draggable-BRF_Q_jB.js";
import { B as l } from "./keys-CZOBuCQd.js";
import { t as u } from "./useI18n-aRMtgYRj.js";
import { Mt as d, u as f } from "./icons-DN008liP.js";
//#region src/components/canvas/BlockIssueBadge.vue?vue&type=script&setup=true&lang.ts
var p = ["title", "aria-label"], m = /* @__PURE__ */ c({
	__name: "BlockIssueBadge",
	props: { blockId: {} },
	setup(c) {
		let m = c, { t: h } = u(), g = t(l, null), _ = n(() => (g?.issues.value ?? []).filter((e) => e.blockId === m.blockId)), v = n(() => _.value.some((e) => e.severity === "error") ? "error" : _.value.some((e) => e.severity === "warning") ? "warning" : null), y = n(() => v.value === "error" ? h.issues.badgeError : h.issues.badgeWarning);
		return (t, n) => v.value ? (e(), r("span", {
			key: 0,
			class: s(["tpl:absolute tpl:top-1 tpl:right-1 tpl:z-10 tpl:flex tpl:size-5 tpl:items-center tpl:justify-center tpl:rounded-full tpl:bg-[var(--tpl-bg)] tpl:shadow-[var(--tpl-shadow-sm)] tpl:ring-1 tpl:ring-[var(--tpl-border)]", v.value === "error" ? "tpl:text-[var(--tpl-danger)]" : "tpl:text-[var(--tpl-warning)]"]),
			title: y.value,
			"aria-label": y.value,
			role: "img"
		}, [v.value === "error" ? (e(), o(a(d), {
			key: 0,
			size: 14,
			"stroke-width": 2.25,
			fill: "currentColor",
			stroke: "var(--tpl-bg)"
		})) : (e(), o(a(f), {
			key: 1,
			size: 14,
			"stroke-width": 2.25,
			fill: "currentColor",
			stroke: "var(--tpl-bg)"
		}))], 10, p)) : i("", !0);
	}
});
//#endregion
export { m as default };

//# sourceMappingURL=BlockIssueBadge-dnqZk6pl.js.map