import { A as e, Et as t, N as n, O as r, Ot as i, _ as a, c as o, d as s, h as c, l, m as u, nt as d, r as f, s as p, u as m, x as h } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { B as g, g as _ } from "./keys-BI6VSUh4.js";
import { t as v } from "./useI18n-BkHfCWC6.js";
import { t as y } from "./createLucideIcon-D7GKhya2.js";
import { t as b } from "./circle-alert-6q_jgtv_.js";
import { t as x } from "./info-DSYRzSZo.js";
import { t as S } from "./list-checks-URZOyLhr.js";
import { t as C } from "./triangle-alert-CiN0ssB3.js";
var w = y("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), T = y("wrench", [["path", {
	d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
	key: "1ngwbx"
}]]), E = { class: "tpl:flex tpl:flex-col tpl:gap-4 tpl:p-4" }, D = { class: "tpl:flex tpl:items-center tpl:gap-2" }, O = { class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, k = ["title"], A = {
	key: 0,
	class: "tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, j = {
	key: 1,
	class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-3 tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, M = { class: "tpl:ml-auto tpl:font-normal tpl:opacity-70" }, N = {
	key: 1,
	class: "tpl:m-0 tpl:mb-3 tpl:flex tpl:list-none tpl:flex-col tpl:gap-2 tpl:p-0"
}, P = { class: "tpl:m-0 tpl:mb-2 tpl:text-xs tpl:text-[var(--tpl-text)]" }, F = { class: "tpl:m-0 tpl:mb-2 tpl:font-mono tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]" }, I = { class: "tpl:flex tpl:gap-1.5" }, L = ["onClick"], R = ["title", "onClick"], z = /* @__PURE__ */ a({
	__name: "IssuesPanel",
	setup(a) {
		let { t: y, format: z } = v(), B = h(g, null), V = h(_, null), H = p(() => (B?.issues.value ?? []).filter((e) => e.severity === "error")), U = p(() => (B?.issues.value ?? []).filter((e) => e.severity === "warning")), W = p(() => (B?.issues.value ?? []).filter((e) => e.severity === "info")), G = p(() => H.value.length + U.value.length + W.value.length);
		function K(e) {
			V && e.blockId && V.selectBlock(e.blockId);
		}
		function q(e) {
			B?.applyFix(e);
		}
		return (a, p) => (r(), s("div", E, [o("header", D, [
			c(d(S), {
				size: 16,
				"stroke-width": 1.5
			}),
			o("h3", O, i(d(y).issues.panelTitle), 1),
			G.value > 0 ? (r(), s("span", {
				key: 0,
				class: "tpl:ml-auto tpl:rounded-full tpl:bg-[var(--tpl-bg-hover)] tpl:px-2 tpl:py-0.5 tpl:text-[11px] tpl:text-[var(--tpl-text-muted)]",
				title: d(z)(d(y).issues.issueCountTooltip, { count: G.value })
			}, i(G.value), 9, k)) : m("", !0)
		]), !d(B) || d(B).unavailable.value ? (r(), s("div", A)) : G.value === 0 ? (r(), s("div", j, i(d(y).issues.emptyState), 1)) : (r(!0), s(f, { key: 2 }, e([
			{
				key: "errors",
				title: d(y).issues.groupErrors,
				icon: d(b),
				items: H.value,
				tone: "tpl:text-[var(--tpl-danger)]"
			},
			{
				key: "warnings",
				title: d(y).issues.groupWarnings,
				icon: d(C),
				items: U.value,
				tone: "tpl:text-[var(--tpl-warning)]"
			},
			{
				key: "info",
				title: d(y).issues.groupInfo,
				icon: d(x),
				items: W.value,
				tone: "tpl:text-[var(--tpl-text-muted)]"
			}
		], (a) => (r(), s("section", { key: a.key }, [a.items.length > 0 ? (r(), s("header", {
			key: 0,
			class: t(["tpl:mb-2 tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-[11px] tpl:font-semibold tpl:uppercase tpl:tracking-wide", a.tone])
		}, [
			(r(), l(n(a.icon), {
				size: 12,
				"stroke-width": 2
			})),
			u(" " + i(a.title) + " ", 1),
			o("span", M, i(a.items.length), 1)
		], 2)) : m("", !0), a.items.length > 0 ? (r(), s("ul", N, [(r(!0), s(f, null, e(a.items, (e) => (r(), s("li", {
			key: `${e.ruleId}-${e.blockId ?? "template"}`,
			class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-3"
		}, [
			o("p", P, i(e.message), 1),
			o("p", F, i(e.ruleId), 1),
			o("div", I, [e.blockId ? (r(), s("button", {
				key: 0,
				type: "button",
				class: "tpl:flex tpl:items-center tpl:gap-1 tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:px-2 tpl:py-1 tpl:text-[11px] tpl:font-medium tpl:text-[var(--tpl-text)]",
				onClick: (t) => K(e)
			}, [c(d(w), {
				size: 10,
				"stroke-width": 2
			}), u(" " + i(d(y).issues.jump), 1)], 8, L)) : m("", !0), e.fix ? (r(), s("button", {
				key: 1,
				type: "button",
				class: "tpl:flex tpl:items-center tpl:gap-1 tpl:rounded-md tpl:bg-[var(--tpl-primary)] tpl:px-2 tpl:py-1 tpl:text-[11px] tpl:font-medium tpl:text-white",
				title: e.fix.description,
				onClick: (t) => q(e)
			}, [c(d(T), {
				size: 10,
				"stroke-width": 2
			}), u(" " + i(d(y).issues.fix), 1)], 8, R)) : m("", !0)])
		]))), 128))])) : m("", !0)]))), 128))]));
	}
});
//#endregion
export { z as default };
