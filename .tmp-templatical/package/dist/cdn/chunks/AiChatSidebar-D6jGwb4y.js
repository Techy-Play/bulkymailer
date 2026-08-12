import { H as e, M as t, O as n, P as r, T as i, V as ee, Z as a, ct as o, g as s, h as c, it as l, m as u, n as d, o as te, ot as ne, p as f, u as p, v as m, x as h, y as g, z as _ } from "./draggable-BRF_Q_jB.js";
import { _ as re, g as ie } from "./dist-Dp46rwVY.js";
import { E as ae, G as v, g as oe, i as se, l as ce } from "./keys-CZOBuCQd.js";
import { E as y, Mt as b, N as le, V as ue, at as de, c as fe, d as pe, n as me } from "./icons-DN008liP.js";
import { t as x } from "./LoadingTrack-CiNg9s16.js";
import { t as S } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as C } from "./useAliveFlag-Ctyt3GgH.js";
import { _ as w } from "./cloud-CxNsW3hp.js";
//#region src/cloud/components/AiChatSidebar.vue?vue&type=script&setup=true&lang.ts
var T = {
	key: 0,
	class: "tpl-ai-sidebar tpl:absolute tpl:top-14 tpl:right-0 tpl:bottom-0 tpl:z-panel tpl:flex tpl:w-[360px] tpl:flex-col tpl:border-l tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)]"
}, E = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3" }, D = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-primary)]" }, O = { class: "tpl:flex tpl:items-center tpl:gap-1" }, k = ["title"], A = { class: "tpl:relative tpl:flex tpl:min-h-0 tpl:flex-1 tpl:flex-col" }, j = {
	key: 0,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, M = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, N = {
	key: 1,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, P = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, F = {
	key: 2,
	class: "tpl:flex tpl:flex-col tpl:gap-4"
}, I = {
	key: 0,
	class: "tpl:self-end tpl:rounded-[var(--tpl-radius-sm)] tpl:px-3.5 tpl:py-2.5 tpl:text-sm",
	style: {
		"background-color": "var(--tpl-primary-light)",
		color: "var(--tpl-text)",
		"max-width": "85%",
		"box-shadow": "var(--tpl-shadow)"
	}
}, L = {
	key: 1,
	class: "tpl:flex tpl:flex-col tpl:gap-2"
}, R = {
	key: 1,
	class: "tpl:rounded-[var(--tpl-radius-sm)] tpl:px-3.5 tpl:py-2.5 tpl:text-sm tpl:whitespace-pre-wrap",
	style: {
		"max-width": "85%",
		"background-color": "var(--tpl-bg)",
		color: "var(--tpl-text)",
		"box-shadow": "var(--tpl-shadow)"
	}
}, z = {
	key: 0,
	class: "tpl:mx-3 tpl:mb-2 tpl:flex tpl:items-start tpl:gap-2 tpl:rounded-lg tpl:px-3 tpl:py-2 tpl:text-xs",
	style: {
		"background-color": "var(--tpl-danger-light)",
		color: "var(--tpl-danger)"
	}
}, he = {
	key: 1,
	class: "tpl:absolute tpl:right-0 tpl:bottom-0 tpl:left-0 tpl:z-10 tpl:px-3 tpl:pb-3",
	style: {
		"background-color": "color-mix(\n              in srgb,\n              var(--tpl-bg) 50%,\n              transparent\n            )",
		"backdrop-filter": "blur(2px)"
	}
}, ge = { class: "tpl:flex tpl:flex-col tpl:gap-1.5" }, _e = ["onClick"], ve = { class: "tpl:border-t tpl:p-3 tpl:border-[var(--tpl-border)]" }, ye = { class: "tpl-ai-input-wrapper tpl:flex tpl:items-end tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)]" }, be = ["placeholder", "disabled"], xe = ["disabled"], Se = { class: "tpl:m-0 tpl:px-1 tpl:pt-2 tpl:text-center tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, B = /*#__PURE__*/ S(/* @__PURE__ */ h({
	__name: "AiChatSidebar",
	props: {
		visible: { type: Boolean },
		onApply: { type: Function }
	},
	emits: ["close"],
	setup(h, { emit: S }) {
		let B = h, Ce = S, V = v(ce, "AiChatSidebar"), H = v(oe, "AiChatSidebar"), we = v(se, "AiChatSidebar"), U = i(ae, []), W = C(), G = w({
			authManager: we,
			getTemplateId: () => H.state.template?.id ?? null,
			onApply: B.onApply,
			onError: void 0
		}), K = a(""), q = a(null), J = a(!1), Y = a(0), { pause: X, resume: Te } = ie(() => {
			Y.value < (G.suggestions.value?.length ?? 0) ? Y.value++ : X();
		}, 150, { immediate: !1 }), { start: Ee } = re(() => Te(), 100, { immediate: !1 });
		_(() => G.suggestions.value?.length ?? 0, (e) => {
			if (X(), e === 0) {
				Y.value = 0;
				return;
			}
			Y.value = 0, Ee();
		});
		function Z() {
			n(() => {
				q.value && (q.value.scrollTop = q.value.scrollHeight);
			});
		}
		_(() => G.messages.value?.length ?? 0, () => Z()), _(() => B.visible, async (e) => {
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
		return (n, i) => (t(), u(d, {
			"enter-active-class": "tpl-ai-slide-enter-active",
			"enter-from-class": "tpl:translate-x-full",
			"enter-to-class": "tpl:translate-x-0",
			"leave-active-class": "tpl-ai-slide-leave-active",
			"leave-from-class": "tpl:translate-x-0",
			"leave-to-class": "tpl:translate-x-full"
		}, {
			default: ee(() => [h.visible ? (t(), s("div", T, [
				f("div", E, [f("div", D, [g(l(y), {
					size: 13,
					"stroke-width": 2
				}), f("span", null, o(l(V).aiChat.title), 1)]), f("div", O, [(l(G).messages.value?.length ?? 0) > 0 ? (t(), s("button", {
					key: 0,
					class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
					title: l(V).aiChat.clear,
					onClick: i[0] ||= (e) => l(G).clearChat()
				}, [g(l(pe), {
					size: 14,
					"stroke-width": 2
				})], 8, k)) : c("", !0), f("button", {
					class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
					onClick: i[1] ||= (e) => Ce("close")
				}, [g(l(me), {
					size: 14,
					"stroke-width": 2
				})])])]),
				f("div", A, [
					f("div", {
						ref_key: "messagesContainer",
						ref: q,
						class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4"
					}, [l(G).isLoadingHistory.value ? (t(), s("div", j, [g(l(de), {
						class: "tpl-spinner tpl:text-[var(--tpl-text-muted)]",
						size: 24,
						"stroke-width": 2
					}), f("p", M, o(l(V).aiChat.loadingHistory), 1)])) : (l(G).messages.value?.length ?? 0) === 0 ? (t(), s("div", N, [g(l(y), {
						size: 32,
						"stroke-width": 1.5,
						class: "tpl:text-[var(--tpl-text-dim)]"
					}), f("p", P, o(l(V).aiChat.placeholder), 1)])) : (t(), s("div", F, [(t(!0), s(p, null, r(l(G).messages.value, (e, n) => (t(), s("div", {
						key: e.id,
						class: "tpl:flex tpl:flex-col tpl:gap-2"
					}, [e.role === "user" ? (t(), s("div", I, o(e.content), 1)) : (t(), s("div", L, [!$(e.content) && l(G).isGenerating.value && n === (l(G).messages.value?.length ?? 0) - 1 ? (t(), u(x, { key: 0 })) : (t(), s("div", R, o($(e.content) || l(V).aiChat.applied), 1)), e.id === l(G).lastApplyMessageId.value && !l(G).isGenerating.value ? (t(), s("button", {
						key: 2,
						class: "tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:self-start tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
						style: {
							"border-color": "var(--tpl-border)",
							color: "var(--tpl-text-muted)",
							"background-color": "transparent"
						},
						onClick: i[2] ||= (e) => l(G).toggleLastRevert()
					}, [l(G).isLastChangeReverted.value ? (t(), s(p, { key: 0 }, [g(l(ue), {
						size: 12,
						"stroke-width": 2
					}), m(" " + o(l(V).aiChat.reapply), 1)], 64)) : (t(), s(p, { key: 1 }, [g(l(fe), {
						size: 12,
						"stroke-width": 2
					}), m(" " + o(l(V).aiChat.revert), 1)], 64))])) : c("", !0)]))]))), 128))]))], 512),
					l(G).error.value ? (t(), s("div", z, [g(l(b), {
						size: 14,
						"stroke-width": 2,
						class: "tpl:mt-0.5 tpl:shrink-0"
					}), f("span", null, o(l(G).error.value === "ai_apply_failed" ? l(V).aiChat.applyFailed : l(V).aiChat.error), 1)])) : c("", !0),
					(l(G).suggestions.value?.length ?? 0) > 0 ? (t(), s("div", he, [f("div", ge, [(t(!0), s(p, null, r(l(G).suggestions.value ?? [], (e, n) => (t(), s("button", {
						key: n,
						class: ne(["tpl-suggestion-btn tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:px-3 tpl:py-2 tpl:text-left tpl:text-xs tpl:leading-snug tpl:transition-all tpl:duration-300 tpl:ease-out", (l(G).suggestions.value?.length ?? 0) - 1 - n < Y.value ? "tpl:translate-y-0 tpl:opacity-100" : "tpl:pointer-events-none tpl:-translate-y-2 tpl:opacity-0"]),
						style: {
							"border-color": "var(--tpl-border)",
							color: "var(--tpl-primary)",
							"background-color": "var(--tpl-bg)",
							"box-shadow": "var(--tpl-shadow)"
						},
						onClick: (t) => De(e)
					}, o(e), 11, _e))), 128))])])) : c("", !0)
				]),
				f("div", ve, [f("div", ye, [e(f("textarea", {
					"onUpdate:modelValue": i[3] ||= (e) => K.value = e,
					class: "tpl:max-h-32 tpl:min-h-[64px] tpl:flex-1 tpl:resize-none tpl:border-none tpl:bg-transparent tpl:font-sans tpl:text-sm tpl:outline-none tpl:text-[var(--tpl-text)]",
					placeholder: l(V).aiChat.inputPlaceholder,
					disabled: l(G).isGenerating.value,
					rows: "3",
					onKeydown: Oe
				}, null, 40, be), [[te, K.value]]), f("button", {
					class: "tpl-ai-send-btn tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1.5 tpl:transition-all tpl:duration-150 tpl:disabled:opacity-40 tpl:text-[var(--tpl-primary)]",
					disabled: !K.value.trim() || l(G).isGenerating.value,
					onClick: Q
				}, [g(l(le), {
					size: 16,
					"stroke-width": 2
				})], 8, xe)]), f("p", Se, o(l(V).aiMenu.disclaimer), 1)])
			])) : c("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-a55e4bff"]]);
//#endregion
export { B as default };

//# sourceMappingURL=AiChatSidebar-D6jGwb4y.js.map