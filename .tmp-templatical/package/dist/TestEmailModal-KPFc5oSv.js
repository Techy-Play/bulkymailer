import { A as e, Et as t, I as n, O as r, Ot as i, R as a, Y as o, _ as s, c, d as l, h as u, l as d, m as f, nt as p, r as m, s as h, u as g, x as _, z as v } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as ee, i as te } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { j as ne } from "./dist-CQ0fVBQ3.js";
import { W as re } from "./useEditorCore-BMbxdUbY.js";
import { E as ie, L as ae, g as oe, k as se } from "./keys-BI6VSUh4.js";
import { t as ce } from "./useI18n-BkHfCWC6.js";
import { t as le } from "./check-Bqimqf7l.js";
import { t as ue } from "./loader-circle-GADaYcyQ.js";
import { n as de, t as fe } from "./MergeTagModeToggle-DEGyx8tw.js";
import { t as pe } from "./TplModal-D_FA3Wm3.js";
import { t as me } from "./BlockPreviewCanvas-BxSoA1QV.js";
//#region src/utils/validateEmailShape.ts
var y = /[,;<>()[\]\\"'`|/?#@!$%^&*+=~{}]/;
function he(e) {
	let t = e.trim();
	if (t.length === 0 || /\s/.test(t)) return !1;
	let n = t.split("@");
	if (n.length !== 2) return !1;
	let [r, i] = n;
	if (r.length === 0 || y.test(i)) return !1;
	let a = i.indexOf(".");
	return a > 0 && a < i.length - 1;
}
//#endregion
//#region src/components/TestEmailModal.vue?vue&type=script&setup=true&lang.ts
var ge = ["aria-busy"], b = {
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
}, Se = { key: 1 }, R = /* @__PURE__ */ s({
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
	setup(s, { emit: y }) {
		let R = s, z = y, { t: B } = ce(), Ce = _(oe, null), V = o(""), H = o("desktop"), we = _(ae, void 0), U = re({
			resolvePreview: we ?? void 0,
			getContent: () => Ce?.content.value ?? {
				blocks: [],
				settings: {}
			},
			isActive: () => R.visible,
			getRecipient: () => V.value || void 0
		}), W = _(se, null), G = o(ne(_(ie, []))), K = h({
			get: () => U.isConfigured ? !1 : W?.value ?? G.value,
			set: (e) => {
				W ? W.value = e : G.value = e;
			}
		}), Te = h(() => U.content.value.blocks ?? []), q = h(() => R.allowedRecipients !== void 0 && R.allowedRecipients.length > 0), Ee = h(() => R.allowedRecipients?.length === 1);
		n(() => R.visible, (e) => {
			e && (V.value = R.defaultRecipient ?? R.allowedRecipients?.[0] ?? "");
		}, { immediate: !0 });
		let J = h(() => q.value ? V.value.length > 0 : he(V.value)), Y = h(() => J.value && !R.isSending && !R.justSent), X = h(() => !q.value && V.value.trim().length > 0 && !J.value), Z = h(() => R.error ? R.error.kind === "provider" ? R.error.message : B.testEmail.recipientNotAllowed : null);
		function Q() {
			Y.value && z("send", V.value.trim());
		}
		function $() {
			R.isSending || z("close");
		}
		function De(e) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Q()), e.key === "Escape" && $();
		}
		return (n, o) => (r(), d(pe, {
			visible: s.visible,
			onClose: $,
			onKeydown: De
		}, {
			default: a(() => [c("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-busy": s.isSending,
				"aria-labelledby": "tpl-test-email-title",
				class: "tpl-scale-in tpl:mx-4 tpl:flex tpl:max-h-[90vh] tpl:w-full tpl:max-w-2xl tpl:flex-col tpl:rounded-[var(--tpl-radius-lg)] tpl:p-5",
				style: {
					"background-color": "var(--tpl-bg-elevated)",
					"box-shadow": "var(--tpl-shadow-xl)"
				}
			}, [
				c("h3", b, i(p(B).testEmail.title), 1),
				c("div", x, [
					c("label", S, i(p(B).testEmail.recipientLabel), 1),
					Ee.value ? (r(), l("input", {
						key: 0,
						id: "tpl-test-email-recipient",
						type: "text",
						value: V.value,
						disabled: "",
						"data-testid": "test-email-recipient",
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:opacity-70 tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, null, 8, C)) : q.value ? v((r(), l("select", {
						key: 1,
						id: "tpl-test-email-recipient",
						"onUpdate:modelValue": o[0] ||= (e) => V.value = e,
						disabled: s.isSending || s.justSent,
						"data-testid": "test-email-recipient",
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, [(r(!0), l(m, null, e(s.allowedRecipients, (e) => (r(), l("option", {
						key: e,
						value: e
					}, i(e), 9, T))), 128))], 8, w)), [[te, V.value]]) : v((r(), l("input", {
						key: 2,
						id: "tpl-test-email-recipient",
						"onUpdate:modelValue": o[1] ||= (e) => V.value = e,
						type: "email",
						autocomplete: "email",
						spellcheck: "false",
						placeholder: p(B).testEmail.recipientPlaceholder,
						disabled: s.isSending || s.justSent,
						"data-testid": "test-email-recipient",
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, null, 8, E)), [[ee, V.value]]),
					X.value ? (r(), l("p", D, i(p(B).testEmail.invalidAddress), 1)) : g("", !0)
				]),
				c("div", O, [c("div", k, [c("span", A, i(p(B).testEmail.preview), 1), c("div", j, [p(U).supersedesSamples.value ? g("", !0) : (r(), d(fe, {
					key: 0,
					"sample-mode": K.value,
					onChange: o[2] ||= (e) => K.value = e
				}, null, 8, ["sample-mode"])), u(de, {
					viewport: H.value,
					onChange: o[3] ||= (e) => H.value = e
				}, null, 8, ["viewport"])])]), c("p", M, i(p(U).supersedesSamples.value ? p(B).previewResolution.hint : K.value ? p(B).testEmail.previewHintSample : p(B).testEmail.previewHint), 1)]),
				c("div", N, [p(U).isInitialResolve.value ? (r(), l("div", P, [c("span", F, i(p(B).previewResolution.resolving), 1), (r(), l(m, null, e(3, (e) => c("div", {
					key: e,
					"aria-hidden": "true",
					class: "tpl-pulse tpl:h-16 tpl:rounded-md tpl:bg-[var(--tpl-bg-hover)]"
				})), 64))])) : p(U).hasFailed.value ? (r(), l("p", I, i(p(B).previewResolution.failed), 1)) : g("", !0), p(U).isInitialResolve.value ? g("", !0) : (r(), d(me, {
					key: 2,
					blocks: Te.value,
					viewport: H.value,
					"apply-condition-filter": !p(U).isConfigured
				}, null, 8, [
					"blocks",
					"viewport",
					"apply-condition-filter"
				]))]),
				s.justSent ? (r(), l("p", L, [u(p(le), {
					size: 13,
					"stroke-width": 2.5
				}), f(" " + i(p(B).testEmail.success), 1)])) : Z.value ? (r(), l("p", _e, i(Z.value), 1)) : g("", !0),
				c("div", ve, [c("button", {
					type: "button",
					"data-testid": "test-email-cancel",
					class: t(["tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]", { "tpl:cursor-not-allowed tpl:opacity-50": s.isSending }]),
					disabled: s.isSending,
					onClick: $
				}, i(p(B).testEmail.cancel), 11, ye), c("button", {
					type: "button",
					"data-testid": "test-email-send",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !Y.value,
					onClick: Q
				}, [s.isSending ? (r(), l("span", xe, [u(p(ue), {
					class: "tpl:animate-spin",
					size: 12,
					"stroke-width": 2
				}), f(" " + i(p(B).testEmail.sending), 1)])) : (r(), l("span", Se, i(p(B).testEmail.send), 1))], 8, be)])
			], 8, ge)]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { R as default };
