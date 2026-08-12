import { L as e, M as t, P as n, ct as r, f as i, g as a, m as o, p as s, st as c, u as l, x as u } from "./draggable-BRF_Q_jB.js";
import "./useEditorCore-CTYH6u4r.js";
import { G as d, t as f } from "./keys-CZOBuCQd.js";
import { A as p, E as m, mt as h } from "./icons-DN008liP.js";
import { t as g } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as _ } from "./useCloudI18n-CML0BxqX.js";
//#region src/cloud/components/AiFeatureMenu.vue?vue&type=script&setup=true&lang.ts
var v = {
	class: "tpl-ai-feature-menu tpl:w-[280px] tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:py-1 tpl:bg-[var(--tpl-bg-elevated)] tpl:border tpl:border-[var(--tpl-border)] tpl:shadow-[var(--tpl-shadow-lg)]",
	style: {
		"backdrop-filter": "blur(8px)",
		"-webkit-backdrop-filter": "blur(8px)"
	}
}, y = ["onClick"], b = { class: "tpl:flex tpl:min-w-0 tpl:flex-col tpl:gap-0.5" }, x = { class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text)]" }, S = { class: "tpl:text-xs tpl:leading-snug tpl:text-[var(--tpl-text-muted)]" }, C = /*#__PURE__*/ g(/* @__PURE__ */ u({
	__name: "AiFeatureMenu",
	props: { activeFeature: {} },
	emits: ["select"],
	setup(u, { emit: g }) {
		let C = g, { t: w } = _(), T = d(f, "AiFeatureMenu"), E = {
			"ai-chat": "chat",
			"design-reference": "designToTemplate",
			scoring: "scoring"
		}, D = [
			{
				key: "ai-chat",
				icon: m
			},
			{
				key: "design-reference",
				icon: h
			},
			{
				key: "scoring",
				icon: p
			}
		], O = i(() => D.filter((e) => T.isFeatureEnabled(E[e.key])));
		function k(e) {
			return e === "ai-chat" ? w.aiMenu.aiAssistant : e === "design-reference" ? w.aiMenu.designToTemplate : w.aiMenu.templateScore;
		}
		function A(e) {
			return e === "ai-chat" ? w.aiMenu.aiAssistantDesc : e === "design-reference" ? w.aiMenu.designToTemplateDesc : w.aiMenu.templateScoreDesc;
		}
		return (i, d) => (t(), a("div", v, [(t(!0), a(l, null, n(O.value, (n) => (t(), a("button", {
			key: n.key,
			class: "tpl-ai-feature-menu-item tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-start tpl:gap-3 tpl:border-none tpl:px-3 tpl:py-2.5 tpl:text-left tpl:transition-colors tpl:duration-100",
			style: c({ backgroundColor: u.activeFeature === n.key ? "var(--tpl-primary-light)" : "transparent" }),
			onClick: (e) => C("select", n.key)
		}, [s("div", {
			class: "tpl:mt-0.5 tpl:flex tpl:size-7 tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)]",
			style: c({
				backgroundColor: u.activeFeature === n.key ? "var(--tpl-primary)" : "var(--tpl-bg-active)",
				color: u.activeFeature === n.key ? "var(--tpl-bg)" : "var(--tpl-text-muted)"
			})
		}, [(t(), o(e(n.icon), {
			size: 15,
			"stroke-width": 2
		}))], 4), s("div", b, [s("span", x, r(k(n.key)), 1), s("span", S, r(A(n.key)), 1)])], 12, y))), 128))]));
	}
}), [["__scopeId", "data-v-07839fa3"]]);
//#endregion
export { C as default };

//# sourceMappingURL=AiFeatureMenu-BtEcjxLL.js.map