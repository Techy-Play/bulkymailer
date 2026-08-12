import { A as e, Dt as t, N as n, O as r, Ot as i, _ as a, c as o, d as s, l as c, r as l, s as u } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import "./useEditorCore-BMbxdUbY.js";
import { G as d, t as f } from "./keys-BI6VSUh4.js";
import { t as p } from "./image-up-BfukboIn.js";
import { t as m } from "./shield-check-Cm0RePnW.js";
import { t as h } from "./sparkles-BHEE-vRD.js";
import { t as g } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as _ } from "./useCloudI18n-KgIWl-IE.js";
//#region src/cloud/components/AiFeatureMenu.vue?vue&type=script&setup=true&lang.ts
var v = {
	class: "tpl-ai-feature-menu tpl:w-[280px] tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:py-1 tpl:bg-[var(--tpl-bg-elevated)] tpl:border tpl:border-[var(--tpl-border)] tpl:shadow-[var(--tpl-shadow-lg)]",
	style: {
		"backdrop-filter": "blur(8px)",
		"-webkit-backdrop-filter": "blur(8px)"
	}
}, y = ["onClick"], b = { class: "tpl:flex tpl:min-w-0 tpl:flex-col tpl:gap-0.5" }, x = { class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text)]" }, S = { class: "tpl:text-xs tpl:leading-snug tpl:text-[var(--tpl-text-muted)]" }, C = /*#__PURE__*/ g(/* @__PURE__ */ a({
	__name: "AiFeatureMenu",
	props: { activeFeature: {} },
	emits: ["select"],
	setup(a, { emit: g }) {
		let C = g, { t: w } = _(), T = d(f, "AiFeatureMenu"), E = {
			"ai-chat": "chat",
			"design-reference": "designToTemplate",
			scoring: "scoring"
		}, D = [
			{
				key: "ai-chat",
				icon: h
			},
			{
				key: "design-reference",
				icon: p
			},
			{
				key: "scoring",
				icon: m
			}
		], O = u(() => D.filter((e) => T.isFeatureEnabled(E[e.key])));
		function k(e) {
			return e === "ai-chat" ? w.aiMenu.aiAssistant : e === "design-reference" ? w.aiMenu.designToTemplate : w.aiMenu.templateScore;
		}
		function A(e) {
			return e === "ai-chat" ? w.aiMenu.aiAssistantDesc : e === "design-reference" ? w.aiMenu.designToTemplateDesc : w.aiMenu.templateScoreDesc;
		}
		return (u, d) => (r(), s("div", v, [(r(!0), s(l, null, e(O.value, (e) => (r(), s("button", {
			key: e.key,
			class: "tpl-ai-feature-menu-item tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-start tpl:gap-3 tpl:border-none tpl:px-3 tpl:py-2.5 tpl:text-left tpl:transition-colors tpl:duration-100",
			style: t({ backgroundColor: a.activeFeature === e.key ? "var(--tpl-primary-light)" : "transparent" }),
			onClick: (t) => C("select", e.key)
		}, [o("div", {
			class: "tpl:mt-0.5 tpl:flex tpl:size-7 tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)]",
			style: t({
				backgroundColor: a.activeFeature === e.key ? "var(--tpl-primary)" : "var(--tpl-bg-active)",
				color: a.activeFeature === e.key ? "var(--tpl-bg)" : "var(--tpl-text-muted)"
			})
		}, [(r(), c(n(e.icon), {
			size: 15,
			"stroke-width": 2
		}))], 4), o("div", b, [o("span", x, i(k(e.key)), 1), o("span", S, i(A(e.key)), 1)])], 12, y))), 128))]));
	}
}), [["__scopeId", "data-v-07839fa3"]]);
//#endregion
export { C as default };
