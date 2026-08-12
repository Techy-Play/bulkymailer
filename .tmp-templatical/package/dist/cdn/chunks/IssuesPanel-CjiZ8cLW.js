import { L as e, M as t, P as n, T as r, ct as i, f as a, g as o, h as s, it as c, m as l, ot as u, p as d, u as f, v as p, x as m, y as h } from "./draggable-BRF_Q_jB.js";
import { B as g, g as _ } from "./keys-CZOBuCQd.js";
import { t as v } from "./useI18n-aRMtgYRj.js";
import { Ht as y, Mt as b, ct as x, ft as S, r as C, u as w } from "./icons-DN008liP.js";
//#region src/components/sidebar/IssuesPanel.vue?vue&type=script&setup=true&lang.ts
var T = { class: "tpl:flex tpl:flex-col tpl:gap-4 tpl:p-4" }, E = { class: "tpl:flex tpl:items-center tpl:gap-2" }, D = { class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, O = ["title"], k = {
	key: 0,
	class: "tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, A = {
	key: 1,
	class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-3 tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, j = { class: "tpl:ml-auto tpl:font-normal tpl:opacity-70" }, M = {
	key: 1,
	class: "tpl:m-0 tpl:mb-3 tpl:flex tpl:list-none tpl:flex-col tpl:gap-2 tpl:p-0"
}, N = { class: "tpl:m-0 tpl:mb-2 tpl:text-xs tpl:text-[var(--tpl-text)]" }, P = { class: "tpl:m-0 tpl:mb-2 tpl:font-mono tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]" }, F = { class: "tpl:flex tpl:gap-1.5" }, I = ["onClick"], L = ["title", "onClick"], R = /* @__PURE__ */ m({
	__name: "IssuesPanel",
	setup(m) {
		let { t: R, format: z } = v(), B = r(g, null), V = r(_, null), H = a(() => (B?.issues.value ?? []).filter((e) => e.severity === "error")), U = a(() => (B?.issues.value ?? []).filter((e) => e.severity === "warning")), W = a(() => (B?.issues.value ?? []).filter((e) => e.severity === "info")), G = a(() => H.value.length + U.value.length + W.value.length);
		function K(e) {
			V && e.blockId && V.selectBlock(e.blockId);
		}
		function q(e) {
			B?.applyFix(e);
		}
		return (r, a) => (t(), o("div", T, [d("header", E, [
			h(c(x), {
				size: 16,
				"stroke-width": 1.5
			}),
			d("h3", D, i(c(R).issues.panelTitle), 1),
			G.value > 0 ? (t(), o("span", {
				key: 0,
				class: "tpl:ml-auto tpl:rounded-full tpl:bg-[var(--tpl-bg-hover)] tpl:px-2 tpl:py-0.5 tpl:text-[11px] tpl:text-[var(--tpl-text-muted)]",
				title: c(z)(c(R).issues.issueCountTooltip, { count: G.value })
			}, i(G.value), 9, O)) : s("", !0)
		]), !c(B) || c(B).unavailable.value ? (t(), o("div", k)) : G.value === 0 ? (t(), o("div", A, i(c(R).issues.emptyState), 1)) : (t(!0), o(f, { key: 2 }, n([
			{
				key: "errors",
				title: c(R).issues.groupErrors,
				icon: c(b),
				items: H.value,
				tone: "tpl:text-[var(--tpl-danger)]"
			},
			{
				key: "warnings",
				title: c(R).issues.groupWarnings,
				icon: c(w),
				items: U.value,
				tone: "tpl:text-[var(--tpl-warning)]"
			},
			{
				key: "info",
				title: c(R).issues.groupInfo,
				icon: c(S),
				items: W.value,
				tone: "tpl:text-[var(--tpl-text-muted)]"
			}
		], (r) => (t(), o("section", { key: r.key }, [r.items.length > 0 ? (t(), o("header", {
			key: 0,
			class: u(["tpl:mb-2 tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-[11px] tpl:font-semibold tpl:uppercase tpl:tracking-wide", r.tone])
		}, [
			(t(), l(e(r.icon), {
				size: 12,
				"stroke-width": 2
			})),
			p(" " + i(r.title) + " ", 1),
			d("span", j, i(r.items.length), 1)
		], 2)) : s("", !0), r.items.length > 0 ? (t(), o("ul", M, [(t(!0), o(f, null, n(r.items, (e) => (t(), o("li", {
			key: `${e.ruleId}-${e.blockId ?? "template"}`,
			class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-3"
		}, [
			d("p", N, i(e.message), 1),
			d("p", P, i(e.ruleId), 1),
			d("div", F, [e.blockId ? (t(), o("button", {
				key: 0,
				type: "button",
				class: "tpl:flex tpl:items-center tpl:gap-1 tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:px-2 tpl:py-1 tpl:text-[11px] tpl:font-medium tpl:text-[var(--tpl-text)]",
				onClick: (t) => K(e)
			}, [h(c(y), {
				size: 10,
				"stroke-width": 2
			}), p(" " + i(c(R).issues.jump), 1)], 8, I)) : s("", !0), e.fix ? (t(), o("button", {
				key: 1,
				type: "button",
				class: "tpl:flex tpl:items-center tpl:gap-1 tpl:rounded-md tpl:bg-[var(--tpl-primary)] tpl:px-2 tpl:py-1 tpl:text-[11px] tpl:font-medium tpl:text-white",
				title: e.fix.description,
				onClick: (t) => q(e)
			}, [h(c(C), {
				size: 10,
				"stroke-width": 2
			}), p(" " + i(c(R).issues.fix), 1)], 8, L)) : s("", !0)])
		]))), 128))])) : s("", !0)]))), 128))]));
	}
});
//#endregion
export { R as default };

//# sourceMappingURL=IssuesPanel-CjiZ8cLW.js.map