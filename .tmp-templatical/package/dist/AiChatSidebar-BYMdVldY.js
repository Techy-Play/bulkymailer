import { A as e, Et as t, I as n, O as r, Ot as i, R as ee, Y as a, _ as o, c as s, d as c, h as l, l as u, m as d, nt as f, r as p, u as m, w as te, x as ne, z as re } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as h, t as g } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { m as ie, p as ae } from "./dist-DDfXShPv.js";
import { E as oe, G as _, g as se, i as ce, l as le } from "./keys-BI6VSUh4.js";
import { t as v } from "./createLucideIcon-D7GKhya2.js";
import { t as ue } from "./circle-alert-6q_jgtv_.js";
import { t as de } from "./loader-circle-GADaYcyQ.js";
import { t as fe } from "./send-BYp4k38T.js";
import { t as y } from "./sparkles-BHEE-vRD.js";
import { t as pe } from "./trash-2-BoNT8wbq.js";
import { t as me } from "./x-B4WnJVRx.js";
import { t as b } from "./LoadingTrack-DH3OEM3z.js";
import { t as x } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as S } from "./useAliveFlag-eT67QCMf.js";
import { o as C } from "./cloud-BJLg_SlM.js";
var w = v("redo-2", [["path", {
	d: "m15 14 5-5-5-5",
	key: "12vg1m"
}], ["path", {
	d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
	key: "6uklza"
}]]), T = v("undo-2", [["path", {
	d: "M9 14 4 9l5-5",
	key: "102s5s"
}], ["path", {
	d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
	key: "f3b9sd"
}]]), E = {
	key: 0,
	class: "tpl-ai-sidebar tpl:absolute tpl:top-14 tpl:right-0 tpl:bottom-0 tpl:z-panel tpl:flex tpl:w-[360px] tpl:flex-col tpl:border-l tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)]"
}, D = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3" }, O = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-primary)]" }, k = { class: "tpl:flex tpl:items-center tpl:gap-1" }, A = ["title"], j = { class: "tpl:relative tpl:flex tpl:min-h-0 tpl:flex-1 tpl:flex-col" }, M = {
	key: 0,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, N = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, P = {
	key: 1,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, F = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, I = {
	key: 2,
	class: "tpl:flex tpl:flex-col tpl:gap-4"
}, L = {
	key: 0,
	class: "tpl:self-end tpl:rounded-[var(--tpl-radius-sm)] tpl:px-3.5 tpl:py-2.5 tpl:text-sm",
	style: {
		"background-color": "var(--tpl-primary-light)",
		color: "var(--tpl-text)",
		"max-width": "85%",
		"box-shadow": "var(--tpl-shadow)"
	}
}, R = {
	key: 1,
	class: "tpl:flex tpl:flex-col tpl:gap-2"
}, z = {
	key: 1,
	class: "tpl:rounded-[var(--tpl-radius-sm)] tpl:px-3.5 tpl:py-2.5 tpl:text-sm tpl:whitespace-pre-wrap",
	style: {
		"max-width": "85%",
		"background-color": "var(--tpl-bg)",
		color: "var(--tpl-text)",
		"box-shadow": "var(--tpl-shadow)"
	}
}, he = {
	key: 0,
	class: "tpl:mx-3 tpl:mb-2 tpl:flex tpl:items-start tpl:gap-2 tpl:rounded-lg tpl:px-3 tpl:py-2 tpl:text-xs",
	style: {
		"background-color": "var(--tpl-danger-light)",
		color: "var(--tpl-danger)"
	}
}, ge = {
	key: 1,
	class: "tpl:absolute tpl:right-0 tpl:bottom-0 tpl:left-0 tpl:z-10 tpl:px-3 tpl:pb-3",
	style: {
		"background-color": "color-mix(\n              in srgb,\n              var(--tpl-bg) 50%,\n              transparent\n            )",
		"backdrop-filter": "blur(2px)"
	}
}, _e = { class: "tpl:flex tpl:flex-col tpl:gap-1.5" }, ve = ["onClick"], ye = { class: "tpl:border-t tpl:p-3 tpl:border-[var(--tpl-border)]" }, be = { class: "tpl-ai-input-wrapper tpl:flex tpl:items-end tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)]" }, xe = ["placeholder", "disabled"], Se = ["disabled"], Ce = { class: "tpl:m-0 tpl:px-1 tpl:pt-2 tpl:text-center tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, B = /*#__PURE__*/ x(/* @__PURE__ */ o({
	__name: "AiChatSidebar",
	props: {
		visible: { type: Boolean },
		onApply: { type: Function }
	},
	emits: ["close"],
	setup(o, { emit: v }) {
		let x = o, B = v, V = _(le, "AiChatSidebar"), H = _(se, "AiChatSidebar"), we = _(ce, "AiChatSidebar"), U = ne(oe, []), W = S(), G = C({
			authManager: we,
			getTemplateId: () => H.state.template?.id ?? null,
			onApply: x.onApply,
			onError: void 0
		}), K = a(""), q = a(null), J = a(!1), Y = a(0), { pause: X, resume: Te } = ae(() => {
			let e = G.suggestions.value?.length ?? 0;
			Y.value < e ? Y.value++ : X();
		}, 150, { immediate: !1 }), { start: Ee } = ie(() => Te(), 100, { immediate: !1 });
		n(() => G.suggestions.value?.length ?? 0, (e) => {
			if (X(), e === 0) {
				Y.value = 0;
				return;
			}
			Y.value = 0, Ee();
		});
		function Z() {
			te(() => {
				q.value && (q.value.scrollTop = q.value.scrollHeight);
			});
		}
		n(() => G.messages.value?.length ?? 0, () => Z()), n(() => x.visible, async (e) => {
			if (e && !J.value) {
				if (J.value = !0, await G.loadConversation(), !W.alive) return;
				(G.messages.value?.length ?? 0) === 0 && H.content.value.blocks.length === 0 && G.loadSuggestions(H.content.value, U);
			}
		});
		async function Q() {
			let e = K.value.trim();
			!e || G.isGenerating.value || (K.value = "", G.error.value = null, G.failedPrompt.value = null, Z(), await G.sendPrompt(e, H.content.value, U), W.alive && (G.failedPrompt.value && (K.value = G.failedPrompt.value), Z()));
		}
		function $(e) {
			return e.replace(/```json[\s\S]*?```/g, "").replace(/```json[\s\S]*/g, "").trim();
		}
		function De(e) {
			X(), K.value = e, Q();
		}
		function Oe(e) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Q());
		}
		return (n, a) => (r(), u(g, {
			"enter-active-class": "tpl-ai-slide-enter-active",
			"enter-from-class": "tpl:translate-x-full",
			"enter-to-class": "tpl:translate-x-0",
			"leave-active-class": "tpl-ai-slide-leave-active",
			"leave-from-class": "tpl:translate-x-0",
			"leave-to-class": "tpl:translate-x-full"
		}, {
			default: ee(() => [o.visible ? (r(), c("div", E, [
				s("div", D, [s("div", O, [l(f(y), {
					size: 13,
					"stroke-width": 2
				}), s("span", null, i(f(V).aiChat.title), 1)]), s("div", k, [(f(G).messages.value?.length ?? 0) > 0 ? (r(), c("button", {
					key: 0,
					class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
					title: f(V).aiChat.clear,
					onClick: a[0] ||= (e) => f(G).clearChat()
				}, [l(f(pe), {
					size: 14,
					"stroke-width": 2
				})], 8, A)) : m("", !0), s("button", {
					class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
					onClick: a[1] ||= (e) => B("close")
				}, [l(f(me), {
					size: 14,
					"stroke-width": 2
				})])])]),
				s("div", j, [
					s("div", {
						ref_key: "messagesContainer",
						ref: q,
						class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4"
					}, [f(G).isLoadingHistory.value ? (r(), c("div", M, [l(f(de), {
						class: "tpl-spinner tpl:text-[var(--tpl-text-muted)]",
						size: 24,
						"stroke-width": 2
					}), s("p", N, i(f(V).aiChat.loadingHistory), 1)])) : (f(G).messages.value?.length ?? 0) === 0 ? (r(), c("div", P, [l(f(y), {
						size: 32,
						"stroke-width": 1.5,
						class: "tpl:text-[var(--tpl-text-dim)]"
					}), s("p", F, i(f(V).aiChat.placeholder), 1)])) : (r(), c("div", I, [(r(!0), c(p, null, e(f(G).messages.value, (e, t) => (r(), c("div", {
						key: e.id,
						class: "tpl:flex tpl:flex-col tpl:gap-2"
					}, [e.role === "user" ? (r(), c("div", L, i(e.content), 1)) : (r(), c("div", R, [!$(e.content) && f(G).isGenerating.value && t === (f(G).messages.value?.length ?? 0) - 1 ? (r(), u(b, { key: 0 })) : (r(), c("div", z, i($(e.content) || f(V).aiChat.applied), 1)), e.id === f(G).lastApplyMessageId.value && !f(G).isGenerating.value ? (r(), c("button", {
						key: 2,
						class: "tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:self-start tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
						style: {
							"border-color": "var(--tpl-border)",
							color: "var(--tpl-text-muted)",
							"background-color": "transparent"
						},
						onClick: a[2] ||= (e) => f(G).toggleLastRevert()
					}, [f(G).isLastChangeReverted.value ? (r(), c(p, { key: 0 }, [l(f(w), {
						size: 12,
						"stroke-width": 2
					}), d(" " + i(f(V).aiChat.reapply), 1)], 64)) : (r(), c(p, { key: 1 }, [l(f(T), {
						size: 12,
						"stroke-width": 2
					}), d(" " + i(f(V).aiChat.revert), 1)], 64))])) : m("", !0)]))]))), 128))]))], 512),
					f(G).error.value ? (r(), c("div", he, [l(f(ue), {
						size: 14,
						"stroke-width": 2,
						class: "tpl:mt-0.5 tpl:shrink-0"
					}), s("span", null, i(f(G).error.value === "ai_apply_failed" ? f(V).aiChat.applyFailed : f(V).aiChat.error), 1)])) : m("", !0),
					(f(G).suggestions.value?.length ?? 0) > 0 ? (r(), c("div", ge, [s("div", _e, [(r(!0), c(p, null, e(f(G).suggestions.value ?? [], (e, n) => (r(), c("button", {
						key: n,
						class: t(["tpl-suggestion-btn tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:px-3 tpl:py-2 tpl:text-left tpl:text-xs tpl:leading-snug tpl:transition-all tpl:duration-300 tpl:ease-out", (f(G).suggestions.value?.length ?? 0) - 1 - n < Y.value ? "tpl:translate-y-0 tpl:opacity-100" : "tpl:pointer-events-none tpl:-translate-y-2 tpl:opacity-0"]),
						style: {
							"border-color": "var(--tpl-border)",
							color: "var(--tpl-primary)",
							"background-color": "var(--tpl-bg)",
							"box-shadow": "var(--tpl-shadow)"
						},
						onClick: (t) => De(e)
					}, i(e), 11, ve))), 128))])])) : m("", !0)
				]),
				s("div", ye, [s("div", be, [re(s("textarea", {
					"onUpdate:modelValue": a[3] ||= (e) => K.value = e,
					class: "tpl:max-h-32 tpl:min-h-[64px] tpl:flex-1 tpl:resize-none tpl:border-none tpl:bg-transparent tpl:font-sans tpl:text-sm tpl:outline-none tpl:text-[var(--tpl-text)]",
					placeholder: f(V).aiChat.inputPlaceholder,
					disabled: f(G).isGenerating.value,
					rows: "3",
					onKeydown: Oe
				}, null, 40, xe), [[h, K.value]]), s("button", {
					class: "tpl-ai-send-btn tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1.5 tpl:transition-all tpl:duration-150 tpl:disabled:opacity-40 tpl:text-[var(--tpl-primary)]",
					disabled: !K.value.trim() || f(G).isGenerating.value,
					onClick: Q
				}, [l(f(fe), {
					size: 16,
					"stroke-width": 2
				})], 8, Se)]), s("p", Ce, i(f(V).aiMenu.disclaimer), 1)])
			])) : m("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-a55e4bff"]]);
//#endregion
export { B as default };
