import { H as e, M as t, P as n, T as r, V as i, Z as a, a as ee, ct as o, f as s, g as c, h as l, it as u, m as d, o as te, ot as ne, p as f, u as p, v as m, x as h, y as g, z as re } from "./draggable-BRF_Q_jB.js";
import { u as ie } from "./src-CZjSXPYq.js";
import { P as ae } from "./useEditorCore-CTYH6u4r.js";
import { E as oe, L as se, g as ce, k as le } from "./keys-CZOBuCQd.js";
import { t as ue } from "./useI18n-aRMtgYRj.js";
import { Lt as de, at as fe } from "./icons-DN008liP.js";
import { n as pe, t as me } from "./MergeTagModeToggle-CiYbOKzd.js";
import { t as he } from "./TplModal-C1iguuZz.js";
import { t as ge } from "./BlockPreviewCanvas-D8pfTFWi.js";
//#region src/utils/validateEmailShape.ts
var _ = /[,;<>()[\]\\"'`|/?#@!$%^&*+=~{}]/;
function v(e) {
	let t = e.trim();
	if (t.length === 0 || /\s/.test(t)) return !1;
	let n = t.split("@");
	if (n.length !== 2) return !1;
	let [r, i] = n;
	if (r.length === 0 || _.test(i)) return !1;
	let a = i.indexOf(".");
	return a > 0 && a < i.length - 1;
}
//#endregion
//#region src/components/TestEmailModal.vue?vue&type=script&setup=true&lang.ts
var y = ["aria-busy"], b = {
	id: "tpl-test-email-title",
	class: "tpl:mb-4 tpl:shrink-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
}, x = { class: "tpl:mb-3 tpl:shrink-0" }, S = {
	for: "tpl-test-email-recipient",
	class: "tpl:mb-1.5 tpl:block tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]"
}, C = ["value"], w = ["disabled"], T = ["value"], E = ["placeholder", "disabled"], D = {
	key: 3,
	class: "tpl:mt-1.5 tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, O = { class: "tpl:mb-2 tpl:shrink-0" }, k = { class: "tpl:flex tpl:flex-wrap tpl:items-center tpl:justify-between tpl:gap-2" }, A = { class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]" }, j = { class: "tpl:flex tpl:items-center tpl:gap-2" }, M = {
	"data-testid": "test-email-preview-hint",
	class: "tpl:mt-1 tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, N = {
	id: "tpl-test-email-preview",
	"data-testid": "test-email-preview",
	class: "tpl:mb-3 tpl:min-h-0 tpl:flex-1 tpl:overflow-y-auto tpl:rounded-[var(--tpl-radius-sm)] tpl:p-3 tpl:bg-[var(--tpl-canvas-bg)]"
}, P = {
	key: 0,
	role: "status",
	"aria-busy": "true",
	"data-testid": "preview-resolution-loading",
	class: "tpl:flex tpl:flex-col tpl:gap-3"
}, F = { class: "tpl:sr-only" }, I = {
	key: 1,
	role: "status",
	"data-testid": "preview-resolution-failed",
	class: "tpl:mb-2 tpl:rounded-md tpl:px-3 tpl:py-2 tpl:text-xs tpl:text-[var(--tpl-text-muted)] tpl:bg-[var(--tpl-bg-hover)]"
}, L = {
	key: 0,
	role: "status",
	"data-testid": "test-email-success",
	class: "tpl:mb-3 tpl:flex tpl:shrink-0 tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-success,var(--tpl-primary))]"
}, _e = {
	key: 1,
	role: "alert",
	"data-testid": "test-email-error",
	class: "tpl:mb-3 tpl:shrink-0 tpl:text-xs tpl:text-[var(--tpl-danger)]"
}, ve = { class: "tpl:flex tpl:shrink-0 tpl:justify-end tpl:gap-2" }, ye = ["disabled"], be = ["disabled"], xe = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-1.5"
}, Se = { key: 1 }, R = /* @__PURE__ */ h({
	__name: "TestEmailModal",
	props: {
		visible: { type: Boolean },
		allowedRecipients: {},
		defaultRecipient: {},
		isSending: { type: Boolean },
		justSent: { type: Boolean },
		error: {}
	},
	emits: ["send", "close"],
	setup(h, { emit: _ }) {
		let R = h, z = _, { t: B } = ue(), Ce = r(ce, null), V = a(""), H = a("desktop"), we = r(se, void 0), U = ae({
			resolvePreview: we ?? void 0,
			getContent: () => Ce?.content.value ?? {
				blocks: [],
				settings: {}
			},
			isActive: () => R.visible,
			getRecipient: () => V.value || void 0
		}), W = r(le, null), G = a(ie(r(oe, []))), K = s({
			get: () => U.isConfigured ? !1 : W?.value ?? G.value,
			set: (e) => {
				W ? W.value = e : G.value = e;
			}
		}), Te = s(() => U.content.value.blocks ?? []), q = s(() => R.allowedRecipients !== void 0 && R.allowedRecipients.length > 0), Ee = s(() => R.allowedRecipients?.length === 1);
		re(() => R.visible, (e) => {
			e && (V.value = R.defaultRecipient ?? R.allowedRecipients?.[0] ?? "");
		}, { immediate: !0 });
		let J = s(() => q.value ? V.value.length > 0 : v(V.value)), Y = s(() => J.value && !R.isSending && !R.justSent), X = s(() => !q.value && V.value.trim().length > 0 && !J.value), Z = s(() => R.error ? R.error.kind === "provider" ? R.error.message : B.testEmail.recipientNotAllowed : null);
		function Q() {
			Y.value && z("send", V.value.trim());
		}
		function $() {
			R.isSending || z("close");
		}
		function De(e) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Q()), e.key === "Escape" && $();
		}
		return (r, a) => (t(), d(he, {
			visible: h.visible,
			onClose: $,
			onKeydown: De
		}, {
			default: i(() => [f("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-busy": h.isSending,
				"aria-labelledby": "tpl-test-email-title",
				class: "tpl-scale-in tpl:mx-4 tpl:flex tpl:max-h-[90vh] tpl:w-full tpl:max-w-2xl tpl:flex-col tpl:rounded-[var(--tpl-radius-lg)] tpl:p-5",
				style: {
					"background-color": "var(--tpl-bg-elevated)",
					"box-shadow": "var(--tpl-shadow-xl)"
				}
			}, [
				f("h3", b, o(u(B).testEmail.title), 1),
				f("div", x, [
					f("label", S, o(u(B).testEmail.recipientLabel), 1),
					Ee.value ? (t(), c("input", {
						key: 0,
						id: "tpl-test-email-recipient",
						type: "text",
						value: V.value,
						disabled: "",
						"data-testid": "test-email-recipient",
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:opacity-70 tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, null, 8, C)) : q.value ? e((t(), c("select", {
						key: 1,
						id: "tpl-test-email-recipient",
						"onUpdate:modelValue": a[0] ||= (e) => V.value = e,
						disabled: h.isSending || h.justSent,
						"data-testid": "test-email-recipient",
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, [(t(!0), c(p, null, n(h.allowedRecipients, (e) => (t(), c("option", {
						key: e,
						value: e
					}, o(e), 9, T))), 128))], 8, w)), [[ee, V.value]]) : e((t(), c("input", {
						key: 2,
						id: "tpl-test-email-recipient",
						"onUpdate:modelValue": a[1] ||= (e) => V.value = e,
						type: "email",
						autocomplete: "email",
						spellcheck: "false",
						placeholder: u(B).testEmail.recipientPlaceholder,
						disabled: h.isSending || h.justSent,
						"data-testid": "test-email-recipient",
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, null, 8, E)), [[te, V.value]]),
					X.value ? (t(), c("p", D, o(u(B).testEmail.invalidAddress), 1)) : l("", !0)
				]),
				f("div", O, [f("div", k, [f("span", A, o(u(B).testEmail.preview), 1), f("div", j, [u(U).supersedesSamples.value ? l("", !0) : (t(), d(me, {
					key: 0,
					"sample-mode": K.value,
					onChange: a[2] ||= (e) => K.value = e
				}, null, 8, ["sample-mode"])), g(pe, {
					viewport: H.value,
					onChange: a[3] ||= (e) => H.value = e
				}, null, 8, ["viewport"])])]), f("p", M, o(u(U).supersedesSamples.value ? u(B).previewResolution.hint : K.value ? u(B).testEmail.previewHintSample : u(B).testEmail.previewHint), 1)]),
				f("div", N, [u(U).isInitialResolve.value ? (t(), c("div", P, [f("span", F, o(u(B).previewResolution.resolving), 1), (t(), c(p, null, n(3, (e) => f("div", {
					key: e,
					"aria-hidden": "true",
					class: "tpl-pulse tpl:h-16 tpl:rounded-md tpl:bg-[var(--tpl-bg-hover)]"
				})), 64))])) : u(U).hasFailed.value ? (t(), c("p", I, o(u(B).previewResolution.failed), 1)) : l("", !0), u(U).isInitialResolve.value ? l("", !0) : (t(), d(ge, {
					key: 2,
					blocks: Te.value,
					viewport: H.value,
					"apply-condition-filter": !u(U).isConfigured
				}, null, 8, [
					"blocks",
					"viewport",
					"apply-condition-filter"
				]))]),
				h.justSent ? (t(), c("p", L, [g(u(de), {
					size: 13,
					"stroke-width": 2.5
				}), m(" " + o(u(B).testEmail.success), 1)])) : Z.value ? (t(), c("p", _e, o(Z.value), 1)) : l("", !0),
				f("div", ve, [f("button", {
					type: "button",
					"data-testid": "test-email-cancel",
					class: ne(["tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]", { "tpl:cursor-not-allowed tpl:opacity-50": h.isSending }]),
					disabled: h.isSending,
					onClick: $
				}, o(u(B).testEmail.cancel), 11, ye), f("button", {
					type: "button",
					"data-testid": "test-email-send",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !Y.value,
					onClick: Q
				}, [h.isSending ? (t(), c("span", xe, [g(u(fe), {
					class: "tpl:animate-spin",
					size: 12,
					"stroke-width": 2
				}), m(" " + o(u(B).testEmail.sending), 1)])) : (t(), c("span", Se, o(u(B).testEmail.send), 1))], 8, be)])
			], 8, y)]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { R as default };

//# sourceMappingURL=TestEmailModal-_RbTD787.js.map