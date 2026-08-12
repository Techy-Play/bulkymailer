import { C as e, F as t, G as n, H as r, J as i, K as a, L as o, M as s, N as c, O as l, P as u, T as d, V as f, Y as p, Z as m, b as h, c as g, ct as _, f as v, g as y, h as b, it as x, l as S, m as C, n as w, o as T, ot as E, p as D, s as O, st as k, t as A, u as j, v as M, x as N, y as P, z as F } from "./draggable-BRF_Q_jB.js";
import { B as I, C as ee, F as L, a as R, b as z, c as B, d as V, i as H, l as te, r as ne, y as re } from "./src-CZjSXPYq.js";
import { A as ie, C as ae, I as oe, L as U, N as se, O as ce, _ as le, a as ue, c as de, d as fe, f as pe, g as me, h as he, i as ge, j as _e, k as ve, l as ye, m as be, n as xe, o as Se, p as Ce, r as we, s as Te, v as Ee, y as De } from "./useEditorCore-CTYH6u4r.js";
import { _ as Oe, d as ke } from "./dist-Dp46rwVY.js";
import { A as Ae, B as je, G as Me, H as Ne, I as Pe, M as Fe, O as Ie, P as Le, R as Re, T as ze, U as Be, V as Ve, W as He, c as Ue, f as We, g as Ge, h as Ke, k as qe, m as Je, n as Ye, o as Xe, p as Ze, r as Qe, s as $e, u as et, v as tt } from "./keys-CZOBuCQd.js";
import { t as W } from "./useI18n-aRMtgYRj.js";
import { a as nt, n as rt } from "./usePopoverPosition-Dm1jv3y5.js";
import { $ as it, At as at, B as ot, E as st, Et as ct, F as lt, It as ut, J as dt, M as ft, Mt as pt, O as mt, Ot as ht, P as gt, Rt as _t, T as vt, Tt as yt, W as G, X as bt, _ as xt, at as St, b as Ct, ct as wt, d as Tt, et as Et, ft as Dt, g as Ot, it as kt, m as At, mt as jt, n as Mt, pt as Nt, rt as Pt, s as Ft, tt as It, ut as Lt, vt as Rt, w as zt, wt as Bt } from "./icons-DN008liP.js";
import { t as Vt } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as Ht } from "./useCloudI18n-CML0BxqX.js";
import { t as Ut } from "./useMergeTag-8a8BnIZp.js";
import { t as Wt } from "./useAliveFlag-Ctyt3GgH.js";
import { n as Gt, t as Kt } from "./emailFrameWidth-BmFCN2dp.js";
import { t as qt } from "./readableTextColor-f8Kykfnh.js";
import { t as Jt } from "./blockTypeIcons-CrPzyP_k.js";
import { _ as Yt, f as K, g as Xt, h as q, i as Zt, l as Qt, m as J, n as $t, p as Y, t as X, u as en } from "./ColorPicker-yxvrro60.js";
import { n as tn, r as nn } from "./MergeTagSuggestion-CvZLI6Np.js";
import { i as Z, n as Q, r as rn, t as an } from "./NumberWithSuffix-vVwCWrd_.js";
import { t as on } from "./TplModal-C1iguuZz.js";
//#region src/composables/useSavedBlocksFeature.ts
function sn(e) {
	let { provider: t, editor: n } = e, r = oe({
		provider: t,
		onError: e.onError
	}), i = m(!1), a = m(!1), o = m(!1), s = m(/* @__PURE__ */ new Set()), l = v(() => o.value), u = v(() => s.value.size);
	function d(e) {
		r.canCreate.value && (n.state.previewMode || (s.value = /* @__PURE__ */ new Set([e]), o.value = !0));
	}
	function f(e) {
		if (!o.value) return;
		let t = new Set(s.value);
		t.has(e) ? t.delete(e) : t.add(e), s.value = t;
	}
	function p(e) {
		return s.value.has(e);
	}
	function h() {
		o.value = !1, s.value = /* @__PURE__ */ new Set();
	}
	function g() {
		u.value !== 0 && (o.value = !1, i.value = !0, S());
	}
	function _() {
		i.value = !1, s.value = /* @__PURE__ */ new Set();
	}
	F(() => n.state.previewMode, (e) => {
		e && o.value && h();
	});
	function y() {
		a.value = !0, S();
	}
	function b() {
		a.value = !1;
	}
	function x(e, t) {
		for (let r = 0; r < e.content.length; r++) {
			let i = re(e.content[r]), a = t === void 0 ? void 0 : t + r;
			n.addBlock(i, void 0, void 0, a);
		}
		a.value = !1;
	}
	function S() {
		r.load().catch(() => {});
	}
	let C = v(() => r.savedBlocks.value.length), w = v(() => e.isAvailable?.() ?? !0);
	return c(Re, r), {
		headless: r,
		isPicking: l,
		pickedIds: s,
		pickedCount: u,
		startPicking: d,
		togglePick: f,
		isPicked: p,
		confirmPicking: g,
		cancelPicking: h,
		isSaveDialogOpen: i,
		closeSaveDialog: _,
		isBrowserOpen: a,
		openBrowser: y,
		closeBrowser: b,
		insert: x,
		refresh: S,
		capability: {
			startPicking: d,
			togglePick: f,
			isPicked: p,
			isPicking: l,
			confirmPicking: g,
			cancelPicking: h,
			openBrowser: y,
			count: C,
			isAvailable: w,
			canCreate: r.canCreate,
			canUpdate: r.canUpdate,
			canDelete: r.canDelete
		},
		count: C,
		isAvailable: w
	};
}
//#endregion
//#region src/utils/toMjml.ts
async function cn() {
	try {
		return await import("./src-uc_Mb_yH.js");
	} catch {
		return null;
	}
}
async function ln(e) {
	let t = await cn();
	if (!t) throw Error("[Templatical] toMjml() requires the @templatical/renderer package. Please install it.");
	let n = e.getCustomBlockStylesheet;
	return t.renderToMjml(e.getContent(), {
		renderCustomBlock: e.renderCustomBlock,
		...n ? { getCustomBlockStylesheet: (e) => n(e) } : {}
	});
}
//#endregion
//#region src/composables/useTestEmailFeature.ts
var un = 1200;
function dn(e) {
	let { provider: t } = e, n = m(!1), r = m(!1), a = m(!1), o = m(null), s = null, c = !1;
	function l() {
		s !== null && (clearTimeout(s), s = null);
	}
	i(l);
	let u = v(() => t.allowedRecipients), d = v(() => {
		let e = t.defaultRecipient;
		if (e === void 0) return;
		let n = u.value;
		if (!(n && !n.includes(e))) return e;
	}), f = v(() => u.value?.length === 0 ? !1 : e.isAvailable?.() ?? !0);
	function p() {
		f.value && (o.value = null, a.value = !1, l(), n.value = !0);
	}
	function h() {
		l(), n.value = !1, a.value = !1;
	}
	async function g() {
		if (!(!t.includeMjml || !e.renderMjml)) try {
			return await e.renderMjml();
		} catch (e) {
			if (await cn() === null) {
				c || (c = !0, _e.warn("testEmail.includeMjml is set but @templatical/renderer is not installed — sending the template as JSON only. Install it to receive `payload.mjml`."));
				return;
			}
			throw e;
		}
	}
	async function _(n) {
		if (r.value) return;
		let i = u.value;
		if (i && !i.includes(n)) {
			o.value = { kind: "recipientNotAllowed" };
			return;
		}
		r.value = !0, o.value = null;
		try {
			let r = await g();
			await t.send({
				recipient: n,
				content: e.getContent(),
				...r === void 0 ? {} : { mjml: r },
				...i === void 0 ? {} : { allowedRecipients: i }
			}), a.value = !0, s = setTimeout(h, un);
		} catch (t) {
			let n = t instanceof Error ? t : Error(String(t));
			o.value = {
				kind: "provider",
				message: n.message
			}, e.onError?.(n);
		} finally {
			r.value = !1;
		}
	}
	return {
		isModalOpen: n,
		open: p,
		close: h,
		isSending: r,
		justSent: a,
		error: o,
		send: _,
		allowedRecipients: u,
		defaultRecipient: d,
		isAvailable: f,
		capability: {
			open: p,
			isAvailable: f
		}
	};
}
//#endregion
//#region src/utils/resolveLintOptions.ts
function fn(e) {
	return {
		...e.lint,
		locale: e.locale
	};
}
//#endregion
//#region src/components/Canvas.vue?vue&type=script&setup=true&lang.ts
var pn = ["aria-label"], mn = {
	key: 0,
	role: "status",
	"aria-busy": "true",
	"data-testid": "preview-resolution-loading",
	class: "tpl:flex tpl:flex-col tpl:gap-3 tpl:p-6"
}, hn = { class: "tpl:sr-only" }, gn = {
	key: 1,
	role: "status",
	"data-testid": "preview-resolution-failed",
	class: "tpl:mx-6 tpl:mt-4 tpl:rounded-md tpl:px-3 tpl:py-2 tpl:text-xs tpl:text-[var(--tpl-text-muted)] tpl:bg-[var(--tpl-bg-hover)]"
}, _n = {
	key: 0,
	class: "tpl-canvas-empty-content tpl:flex tpl:flex-col tpl:items-center"
}, vn = { class: "tpl-canvas-empty-icon tpl:mb-4 tpl:text-[var(--tpl-primary)]" }, yn = { class: "tpl-canvas-empty-title tpl:m-0 tpl:mb-2 tpl:text-base tpl:font-semibold tpl:text-[var(--tpl-primary)]" }, bn = { class: "tpl-canvas-empty-text tpl:m-0 tpl:text-sm tpl:text-[var(--tpl-text-dim)]" }, xn = {
	key: 0,
	class: "tpl:m-0 tpl:mt-2 tpl:flex tpl:flex-wrap tpl:items-center tpl:justify-center tpl:gap-x-1 tpl:gap-y-0.5 tpl:text-sm tpl:text-[var(--tpl-text-dim)]"
}, Sn = {
	key: 1,
	class: "tpl:m-0 tpl:mt-4 tpl:flex tpl:flex-wrap tpl:items-center tpl:justify-center tpl:gap-x-1 tpl:gap-y-0.5 tpl:text-sm tpl:text-[var(--tpl-text-dim)]"
}, Cn = { class: "tpl:relative" }, wn = {
	class: "tpl:inline-flex tpl:size-3 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-[8px] tpl:font-bold",
	style: { "background-color": "color-mix(\n                        in srgb,\n                        var(--tpl-bg) 30%,\n                        transparent\n                      )" }
}, Tn = /*#__PURE__*/ Vt(/* @__PURE__ */ N({
	__name: "Canvas",
	props: {
		viewport: {},
		content: {},
		selectedBlockId: {},
		darkMode: { type: Boolean },
		previewMode: { type: Boolean },
		lockedBlocks: {}
	},
	emits: [
		"select-block",
		"open-ai-chat",
		"open-design-reference"
	],
	setup(e, { emit: t }) {
		let n = {
			section: Te,
			title: de,
			paragraph: Ce,
			image: he,
			button: ve,
			divider: Ee,
			spacer: ge,
			html: le,
			social: ue,
			menu: be,
			table: we,
			video: xe,
			custom: De
		}, i = e, a = t, { t: l } = W(), { t: p } = Ht(), h = Me(Ge, "Canvas"), g = d(We, null), S = d($e, null), w = d(Ue, {}), T = d(qe, null), N = d(Pe, null);
		c(He, v(() => i.previewMode && (T?.value ?? !1) && !N?.isConfigured));
		let F = v(() => (w.plan?.hasFeature("ai_generation") ?? !1) && (w.ai?.isFeatureEnabled("chat") ?? !1)), I = v(() => (w.plan?.hasFeature("ai_generation") ?? !1) && (w.ai?.isFeatureEnabled("designToTemplate") ?? !1)), ee = d(Qe, null), L = v({
			get: () => i.content.blocks,
			set: (e) => {
				h.setContent({
					...i.content,
					blocks: e
				});
			}
		}), R = v(() => Gt(i.content.settings, i.viewport)), z = v(() => R.value + 192), B = v(() => fe(i.content.settings)), V = v(() => L.value.length === 0 && !i.previewMode), H = m(0), te = v(() => V.value && H.value > 0);
		function ne() {
			V.value && (H.value += 1);
		}
		function re() {
			V.value && (H.value = Math.max(0, H.value - 1));
		}
		function ie() {
			H.value = 0;
		}
		function ae(e) {
			i.previewMode || w.savedBlocks?.isPicking.value || e.target === e.currentTarget && a("select-block", null);
		}
		function oe(e) {
			return pe(e, S, n);
		}
		function U(e) {
			return i.lockedBlocks?.get(e) ?? null;
		}
		function se(e) {
			if (i.previewMode || U(e)) return;
			let t = w.savedBlocks;
			if (t?.isPicking.value) {
				t.togglePick(e);
				return;
			}
			a("select-block", e);
		}
		function ce(e) {
			return w.savedBlocks?.isPicked(e) ?? !1;
		}
		let me = v(() => w.savedBlocks?.isPicking.value === !0);
		function _e(e, t) {
			e.type === "custom" && h.updateBlock(e.id, {
				fieldValues: t.fieldValues,
				dataSourceFetched: t.dataSourceFetched
			});
		}
		return (t, n) => (s(), y("div", {
			class: "tpl-canvas-stage tpl:relative tpl:flex tpl:justify-center tpl:rounded-lg",
			style: k({
				width: `${z.value}px`,
				boxShadow: e.darkMode ? "none" : "var(--tpl-shadow-xl)",
				transition: x(Kt)
			})
		}, [D("div", {
			class: "tpl-canvas-bg tpl:absolute tpl:inset-0 tpl:rounded-lg tpl:pointer-events-none",
			style: k({
				backgroundColor: e.content.settings.backgroundColor,
				...e.darkMode ? { filter: "invert(1) hue-rotate(180deg)" } : {},
				transition: "filter 300ms ease"
			})
		}, null, 4), D("div", {
			"data-testid": "canvas-wrapper",
			role: "region",
			"aria-label": x(l).landmarks.canvas,
			class: "tpl-canvas-wrapper tpl:relative",
			style: k({
				width: `${R.value}px`,
				transition: x(Kt)
			})
		}, [D("div", {
			class: E(["tpl-canvas tpl:relative tpl:rounded-lg", {
				"tpl-canvas--dark-mode": e.darkMode,
				"tpl-preview-mode": e.previewMode
			}]),
			style: k(B.value),
			onClick: ae
		}, [x(N)?.isInitialResolve.value ? (s(), y("div", mn, [D("span", hn, _(x(l).previewResolution.resolving), 1), (s(), y(j, null, u(3, (e) => D("div", {
			key: e,
			"aria-hidden": "true",
			class: "tpl-pulse tpl:h-16 tpl:rounded-md tpl:bg-[var(--tpl-bg-hover)]"
		})), 64))])) : x(N)?.hasFailed.value ? (s(), y("p", gn, _(x(l).previewResolution.failed), 1)) : b("", !0), r(P(x(A), {
			modelValue: L.value,
			"onUpdate:modelValue": n[2] ||= (e) => L.value = e,
			group: "blocks",
			animation: 150,
			"ghost-class": "tpl-ghost",
			"drag-class": "tpl-dragging",
			handle: ".tpl-block-btn",
			"invert-swap": !0,
			"inverted-swap-threshold": .65,
			disabled: e.previewMode,
			draggable: ".tpl-block-item",
			"force-fallback": !0,
			class: E([
				"tpl-canvas-blocks",
				V.value ? "tpl-canvas-empty tpl:m-6 tpl:flex tpl:min-h-[400px] tpl:flex-col tpl:items-center tpl:justify-center tpl:rounded-xl tpl:border-2 tpl:border-dashed tpl:px-10 tpl:py-12 tpl:text-center tpl:bg-[var(--tpl-bg-elevated)] tpl:font-[var(--tpl-font-family)] tpl:transition-colors tpl:duration-150" : "",
				V.value && te.value ? "tpl-canvas-empty--drag-over tpl:border-[var(--tpl-primary-hover)] tpl:bg-[var(--tpl-primary-light)]" : "",
				V.value && !te.value ? "tpl:border-[var(--tpl-primary)]" : ""
			]),
			onDragenter: ne,
			onDragleave: re,
			onDrop: ie
		}, {
			default: f(() => [V.value ? (s(), y("div", _n, [
				D("div", vn, [P(x(vt), {
					size: 48,
					"stroke-width": 1
				})]),
				D("p", yn, _(x(l).canvas.noBlocks), 1),
				D("p", bn, _(x(l).canvas.dragHint), 1),
				F.value && x(p) ? (s(), y("p", xn, [
					M(_(x(l).canvas.aiHintChat) + " ", 1),
					D("button", {
						class: "tpl:inline-flex tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:whitespace-nowrap tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-2 tpl:py-0.5 tpl:text-sm tpl:font-semibold tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary-hover)]",
						onClick: n[0] ||= (e) => a("open-ai-chat")
					}, [P(x(st), {
						size: 14,
						"stroke-width": 2
					}), M(" " + _(x(p).aiMenu.aiAssistant), 1)]),
					M(" " + _(x(l).canvas.aiHintChatSuffix), 1)
				])) : b("", !0),
				I.value && x(p) ? (s(), y("p", Sn, [
					M(_(x(l).canvas.aiHintDesign) + " ", 1),
					D("button", {
						class: "tpl:inline-flex tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:whitespace-nowrap tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-2 tpl:py-0.5 tpl:text-sm tpl:font-semibold tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary-hover)]",
						onClick: n[1] ||= (e) => a("open-design-reference")
					}, [P(x(jt), {
						size: 14,
						"stroke-width": 2
					}), M(" " + _(x(p).aiMenu.designToTemplate), 1)]),
					M(" " + _(x(l).canvas.aiHintDesignSuffix), 1)
				])) : b("", !0)
			])) : b("", !0), (s(!0), y(j, null, u(L.value, (t) => r((s(), y("div", {
				key: t.id,
				class: "tpl-block-item"
			}, [D("div", Cn, [U(t.id) ? (s(), y("div", {
				key: 0,
				class: "tpl-collab-lock tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-[4] tpl:rounded-sm",
				style: k({
					outline: `2px solid ${U(t.id).color}`,
					outlineOffset: "-1px"
				})
			}, [D("span", {
				class: "tpl:absolute tpl:-top-0.5 tpl:left-1/2 tpl:z-[5] tpl:flex tpl:-translate-x-1/2 tpl:-translate-y-full tpl:items-center tpl:gap-1 tpl:rounded-full tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:whitespace-nowrap",
				style: k({
					backgroundColor: U(t.id).color,
					color: x(qt)(U(t.id).color)
				})
			}, [D("span", wn, _(U(t.id).name.charAt(0)), 1), M(" " + _(U(t.id).name), 1)], 4)], 4)) : b("", !0), P(ye, {
				block: t,
				"is-selected": !e.previewMode && !me.value && e.selectedBlockId === t.id && !U(t.id),
				picked: ce(t.id),
				viewport: e.viewport,
				"preview-mode": e.previewMode,
				onSelect: (e) => se(t.id)
			}, {
				default: f(() => [(s(), C(o(oe(t)), {
					block: t,
					viewport: e.viewport,
					onFetchData: (e) => _e(t, e),
					onUpdate: (e) => x(h).updateBlock(t.id, e)
				}, null, 40, [
					"block",
					"viewport",
					"onFetchData",
					"onUpdate"
				]))]),
				_: 2
			}, 1032, [
				"block",
				"is-selected",
				"picked",
				"viewport",
				"preview-mode",
				"onSelect"
			])])])), [[O, x(ee) === !1 || !x(g)?.isHidden(t.id)]])), 128))]),
			_: 1
		}, 8, [
			"modelValue",
			"disabled",
			"class"
		]), [[O, !x(N)?.isInitialResolve.value]])], 6)], 12, pn)], 4));
	}
}), [["__scopeId", "data-v-0af1c100"]]), En = N({
	name: "CustomBlockStylesheets",
	setup() {
		let t = d(Je, null);
		return () => t ? t.value.map((t, n) => e("style", {
			key: n,
			"data-tpl-custom-block-stylesheet": "",
			innerHTML: t
		})) : null;
	}
});
//#endregion
//#region src/utils/resolvePaletteBlocks.ts
function Dn(e, t) {
	if (!t || t.length === 0) return {
		items: e,
		unknown: []
	};
	let n = new Map(e.map((e) => [e.type, e])), r = [], i = [], a = /* @__PURE__ */ new Set();
	for (let e of t) {
		if (a.has(e)) continue;
		a.add(e);
		let t = n.get(e);
		t ? r.push(t) : i.push(e);
	}
	return {
		items: r,
		unknown: i
	};
}
//#endregion
//#region src/components/Sidebar.vue?vue&type=script&setup=true&lang.ts
var On = ["aria-label"], kn = {
	key: 0,
	class: "tpl:border-b tpl:px-1 tpl:pb-1 tpl:border-[var(--tpl-border)]"
}, An = ["aria-label"], jn = {
	key: 0,
	class: "tpl:truncate tpl:text-sm tpl:font-medium"
}, Mn = [
	"data-palette-type",
	"aria-label",
	"onClick",
	"onKeydown"
], Nn = { class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-center tpl:transition-transform tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:scale-105" }, Pn = {
	key: 0,
	class: "tpl:truncate tpl:text-sm tpl:font-medium"
}, Fn = /* @__PURE__ */ N({
	__name: "Sidebar",
	setup(e) {
		let { t, format: n } = W(), r = d(Ze, []), i = d(Le, void 0), a = d(Xe, void 0), c = d(Ge, null), l = d(Ue, {}), p = v(() => l.savedBlocks?.isAvailable.value === !0), h = m(!1), g = m(!1);
		function S() {
			g.value || (h.value = !1);
		}
		function w() {
			g.value = !0;
		}
		function T() {
			g.value = !1, h.value = !1;
		}
		let E = [
			"section",
			"image",
			"title",
			"paragraph",
			"button",
			"divider",
			"video",
			"social",
			"menu",
			"table",
			"spacer",
			"html"
		], O = v(() => {
			let e = E.map((e) => ({
				type: e,
				label: se(e, t)
			}));
			return l.plan && e.splice(-1, 0, {
				type: "countdown",
				label: se("countdown", t)
			}), e;
		}), M = v(() => r.map((e) => ({
			type: `custom:${e.type}`,
			label: e.name,
			isCustom: !0,
			icon: e.icon
		}))), N = v(() => [...O.value, ...M.value]), I = v(() => Dn(N.value, i)), L = v(() => I.value.items), R = /* @__PURE__ */ new Set();
		F(() => I.value.unknown, (e) => {
			for (let t of e) R.has(t) || (R.add(t), _e.warn(`config.paletteBlocks: "${t}" is not a built-in or registered custom block (use the "custom:" prefix for custom blocks) — skipping it in the palette.`));
		}, { immediate: !0 });
		function B(e) {
			if (e.isCustom) {
				let t = e.type.replace("custom:", ""), n = r.find((e) => e.type === t);
				if (n) return ee(n);
			}
			return z(e.type, a);
		}
		function V(e) {
			if (!c) return;
			let t = B(e);
			c.addBlock(t), c.selectBlock(t.id);
		}
		function H(e, t) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), V(t));
		}
		return (e, r) => (s(), y("aside", {
			"aria-label": x(t).sidebarNav.palette,
			class: "tpl-sidebar-rail tpl:absolute tpl:top-14 tpl:bottom-0 tpl:left-0 tpl:z-40 tpl:flex tpl:flex-col tpl:overflow-hidden",
			style: k({
				width: h.value ? "200px" : "48px",
				backgroundColor: "var(--tpl-bg-elevated)",
				borderRight: "1px solid var(--tpl-border)",
				boxShadow: h.value ? "var(--tpl-shadow-lg)" : "none",
				transition: "width 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			onMouseenter: r[1] ||= (e) => h.value = !0,
			onMouseleave: S,
			onFocusin: r[2] ||= (e) => h.value = !0,
			onFocusout: r[3] ||= (e) => h.value = !1
		}, [p.value ? (s(), y("div", kn, [D("button", {
			type: "button",
			"aria-label": x(t).sidebarNav.browseSavedBlocks,
			class: "tpl:flex tpl:h-10 tpl:w-full tpl:cursor-pointer tpl:items-center tpl:gap-3 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:px-3 tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-[120ms] hover:tpl:bg-[var(--tpl-primary-light)] hover:tpl:text-[var(--tpl-primary)]",
			style: k({ justifyContent: h.value ? "flex-start" : "center" }),
			onClick: r[0] ||= (e) => x(l).savedBlocks?.openBrowser()
		}, [P(x(bt), {
			size: 20,
			"stroke-width": 1.5,
			class: "tpl:shrink-0"
		}), h.value ? (s(), y("span", jn, _(x(t).savedBlocks.title), 1)) : b("", !0)], 12, An)])) : b("", !0), P(x(A), {
			"model-value": L.value,
			group: {
				name: "blocks",
				pull: "clone",
				put: !1
			},
			clone: B,
			sort: !1,
			animation: 150,
			"force-fallback": !0,
			class: "tpl:flex tpl:min-h-0 tpl:flex-1 tpl:flex-col tpl:gap-0.5 tpl:overflow-y-auto tpl:p-1",
			onChoose: w,
			onEnd: T
		}, {
			default: f(() => [(s(!0), y(j, null, u(L.value, (e) => (s(), y("button", {
				key: e.type,
				type: "button",
				"data-palette-type": e.type,
				"aria-label": x(n)(x(t).sidebarNav.insertBlock, { block: e.label }),
				class: "tpl:flex tpl:h-10 tpl:w-full tpl:shrink-0 tpl:cursor-grab tpl:items-center tpl:gap-3 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:px-3 tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-primary-light)] hover:tpl:text-[var(--tpl-primary)] active:tpl:cursor-grabbing",
				style: k({ justifyContent: h.value ? "flex-start" : "center" }),
				onClick: (t) => V(e),
				onKeydown: (t) => H(t, e)
			}, [D("div", Nn, [x(Jt)[e.type] ? (s(), C(o(x(Jt)[e.type]), {
				key: 0,
				size: 20,
				"stroke-width": 1.5
			})) : e.isCustom ? (s(), C(ce, {
				key: 1,
				icon: e.icon,
				size: 20
			}, null, 8, ["icon"])) : b("", !0)]), h.value ? (s(), y("span", Pn, _(e.label), 1)) : b("", !0)], 44, Mn))), 128))]),
			_: 1
		}, 8, ["model-value"])], 44, On));
	}
});
//#endregion
//#region src/utils/mergeTagTrigger.ts
function In(e, t, n, r) {
	if (!n) return null;
	let i = e.slice(0, t), a = i.lastIndexOf(n);
	if (a === -1) return null;
	let o = i.slice(a + n.length);
	return /\s/.test(o) || r && o.includes(r) ? null : {
		triggerStart: a,
		caret: t,
		query: o
	};
}
//#endregion
//#region src/utils/textFieldCaret.ts
var Ln = /* @__PURE__ */ "boxSizing.width.borderTopWidth.borderRightWidth.borderBottomWidth.borderLeftWidth.borderStyle.paddingTop.paddingRight.paddingBottom.paddingLeft.fontStyle.fontVariant.fontWeight.fontStretch.fontSize.lineHeight.fontFamily.textAlign.textTransform.textIndent.letterSpacing.wordSpacing.tabSize.whiteSpace.wordWrap.wordBreak".split(".");
function Rn(e, t, n) {
	return {
		left: e,
		top: t,
		bottom: n,
		right: e,
		width: 0,
		height: n - t,
		x: e,
		y: t,
		toJSON: () => ({})
	};
}
function zn(e, t) {
	let n = e.ownerDocument, r = n.defaultView;
	if (!r) return null;
	let i = e.tagName === "INPUT", a = r.getComputedStyle(e), o = n.createElement("div");
	o.setAttribute("aria-hidden", "true");
	let s = o.style;
	s.position = "absolute", s.visibility = "hidden", s.top = "0", s.left = "0", s.overflow = "hidden", s.whiteSpace = i ? "pre" : "pre-wrap", s.wordWrap = i ? "normal" : "break-word";
	let c = s, l = a;
	for (let e of Ln) c[e] = l[e];
	i && (s.width = "auto", s.whiteSpace = "pre");
	let u = e.value, d = u.slice(0, t);
	i && (d = d.replace(/\s/g, "\xA0")), o.textContent = d;
	let f = n.createElement("span");
	f.textContent = u.slice(t) || ".", o.appendChild(f), n.body.appendChild(o);
	let p = f.offsetTop, m = f.offsetLeft;
	n.body.removeChild(o);
	let h = e.getBoundingClientRect(), g = parseFloat(a.borderTopWidth) || 0, _ = parseFloat(a.borderLeftWidth) || 0, v = parseFloat(a.lineHeight) || parseFloat(a.fontSize) || 0, y = h.left + m + _ - e.scrollLeft;
	if (i) return Rn(y, h.top, h.bottom);
	let b = h.top + p + g - e.scrollTop;
	return Rn(y, b, b + v);
}
//#endregion
//#region src/composables/useMergeTagAutocomplete.ts
var Bn = /* @__PURE__ */ new Set([
	"ArrowLeft",
	"ArrowRight",
	"Home",
	"End"
]);
function Vn(e) {
	let { elementRef: t, modelValue: r, emit: o, mergeTags: s, syntax: c, enabled: u, onInsert: f } = e, p = te(c), m = B(c), h = u && p !== null && s.length > 0, g = d(Ne, null), _ = (a(g) ? g.value : g)?.mergeTag?.suggestionEmpty ?? "No matching merge tags", v = rt(), y = tn(_, v), b = !1;
	n() && i(() => {
		b = !0, y.close();
	});
	function x(e) {
		let t = e.value ?? "";
		return In(t, e.selectionStart ?? t.length, p, m);
	}
	function S(e, n, i) {
		let a = e.value ?? r(), s = a.slice(n.caret), c = m && s.startsWith(m) ? m.length : 0, u = a.slice(0, n.triggerStart), d = a.slice(n.caret + c), p = u + i.value + d, h = u.length + i.value.length;
		f?.(), o(p), y.close(), l(() => {
			if (b) return;
			let e = t.value;
			e?.focus(), e?.setSelectionRange(h, h);
		});
	}
	function C() {
		if (!h || b) return;
		let e = t.value;
		if (!e) {
			y.close();
			return;
		}
		let n = x(e);
		if (!n) {
			y.close();
			return;
		}
		let r = nn(s, n.query), i = () => zn(e, n.triggerStart), a = (t) => S(e, n, t);
		y.isOpen() ? y.update({
			items: r,
			getRect: i,
			onCommand: a
		}) : y.open({
			items: r,
			getRect: i,
			anchorEl: e,
			onCommand: a
		});
	}
	function w(e) {
		return y.isOpen() ? e.key === "Escape" ? (y.close(), !0) : Bn.has(e.key) ? (y.close(), !1) : y.handleKeyDown(e) : !1;
	}
	return {
		available: h,
		refresh: C,
		handleKeydown: w,
		close: () => y.close(),
		isOpen: () => y.isOpen()
	};
}
//#endregion
//#region src/composables/useMergeTagField.ts
function Hn(e) {
	let { modelValue: t, emit: r, elementRef: a } = e, { mergeTags: o, canRequestMergeTag: s, isRequesting: c, isMergeTagValue: u, getMergeTagLabel: d, requestMergeTag: f, syntax: p, autocomplete: h } = Ut(), { canInsertLogicTag: g, isRequesting: _, requestLogicTag: y } = ae(), b = m(!1), x = !1, S = !1;
	n() && i(() => {
		S = !0;
	});
	let C = Vn({
		elementRef: a,
		modelValue: t,
		emit: r,
		mergeTags: o,
		syntax: p,
		enabled: h,
		onInsert: () => {
			b.value = !0;
		}
	}), w = v(() => {
		let e = t();
		if (!e) return [];
		let n = [], r = `(${p.value.source}|${p.logic.source})`, i = new RegExp(r, "g"), a = 0, o;
		for (; (o = i.exec(e)) !== null;) {
			o.index > a && n.push({
				type: "text",
				value: e.slice(a, o.index)
			});
			let t = o[0];
			u(t) ? n.push({
				type: "mergeTag",
				value: t,
				label: d(t)
			}) : V(t, p) ? n.push({
				type: "logicMergeTag",
				value: t,
				keyword: R(t, p)
			}) : n.push({
				type: "text",
				value: t
			}), a = o.index + t.length;
		}
		return a < e.length && n.push({
			type: "text",
			value: e.slice(a)
		}), n;
	}), T = v(() => w.value.some((e) => e.type === "mergeTag" || e.type === "logicMergeTag"));
	function E() {
		b.value = !0, l(() => {
			a.value?.focus();
			let e = t()?.length || 0;
			a.value?.setSelectionRange(e, e);
		});
	}
	function D() {
		x || (b.value = !1);
	}
	function O(e) {
		r(e.target.value), C.refresh();
	}
	function k(e) {
		if (C.handleKeydown(e)) {
			e.preventDefault();
			return;
		}
		e.key === "Escape" && D();
	}
	function A() {
		C.refresh();
	}
	function j() {
		C.close(), D();
	}
	function M() {
		r("");
	}
	async function N() {
		let e = b.value && a.value ? a.value.selectionStart ?? t().length : t().length;
		x = !0;
		let n;
		try {
			n = await f();
		} finally {
			x = !1;
		}
		if (!S && n) {
			let i = t().slice(0, e), o = t().slice(e), s = i + n.value + o;
			r(s), b.value = !0, l(() => {
				if (S) return;
				let t = e + n.value.length;
				a.value?.focus(), a.value?.setSelectionRange(t, t);
			});
		}
	}
	async function P() {
		let e = a.value, n = e?.selectionStart ?? t().length, i = e?.selectionEnd ?? n;
		x = !0;
		let o;
		try {
			o = await y();
		} finally {
			x = !1;
		}
		if (S || !o) return;
		let s = t(), c, u;
		"before" in o ? (c = s.slice(0, n) + o.before + s.slice(n, i) + o.after + s.slice(i), u = n + o.before.length + (i - n)) : (c = s.slice(0, n) + o.value + s.slice(n), u = n + o.value.length), r(c), b.value = !0, l(() => {
			S || (a.value?.focus(), a.value?.setSelectionRange(u, u));
		});
	}
	return {
		segments: w,
		hasMergeTags: T,
		canRequestMergeTag: s,
		isRequestingMergeTag: c,
		canInsertLogicTag: g,
		isRequestingLogicTag: _,
		isEditing: b,
		startEditing: E,
		stopEditing: D,
		handleInput: O,
		handleKeydown: k,
		handleClick: A,
		handleBlur: j,
		clearValue: M,
		insertMergeTag: N,
		insertLogicTag: P,
		autocompleteAvailable: C.available
	};
}
//#endregion
//#region src/components/MergeTagSegments.vue?vue&type=script&setup=true&lang.ts
var Un = ["aria-label", "onKeydown"], Wn = ["data-tooltip"], Gn = ["data-tooltip"], Kn = {
	key: 2,
	class: "tpl:text-sm tpl:text-[var(--tpl-text)]"
}, qn = ["aria-label", "title"], Jn = /* @__PURE__ */ N({
	__name: "MergeTagSegments",
	props: {
		segments: {},
		displayClass: {},
		pulse: { type: Boolean }
	},
	emits: ["edit", "clear"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		function i() {
			n("edit");
		}
		return (t, a) => (s(), y("div", {
			role: "button",
			tabindex: "0",
			"aria-label": x(r).mergeTag.clickToEdit,
			class: E([e.displayClass, { "tpl-pulse-fill": e.pulse }]),
			onClick: i,
			onKeydown: [g(i, ["enter"]), g(S(i, ["prevent"]), ["space"])]
		}, [(s(!0), y(j, null, u(e.segments, (e, t) => (s(), y(j, { key: `${e.type}-${t}-${e.value}` }, [e.type === "mergeTag" ? (s(), y("span", {
			key: 0,
			class: "tpl-tooltip tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[0.9em] tpl:font-medium",
			"data-tooltip": e.value,
			style: {
				"background-color": "color-mix(\n            in srgb,\n            var(--tpl-primary) 20%,\n            transparent\n          )",
				color: "var(--tpl-primary)"
			}
		}, _(e.label), 9, Wn)) : e.type === "logicMergeTag" ? (s(), y("span", {
			key: 1,
			class: "tpl-tooltip tpl:inline-flex tpl:items-center tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[0.8em] tpl:font-bold tpl:tracking-wide tpl:uppercase",
			"data-tooltip": e.value,
			style: {
				"background-color": "transparent",
				border: "1.5px solid\n            color-mix(in srgb, var(--tpl-primary) 50%, transparent)",
				color: "var(--tpl-primary)"
			}
		}, _(e.keyword), 9, Gn)) : (s(), y("span", Kn, _(e.value), 1))], 64))), 128)), D("button", {
			type: "button",
			class: "tpl:ml-auto tpl:flex tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-none tpl:bg-transparent tpl:p-0 tpl:text-[var(--tpl-text-dim)] tpl:opacity-60 tpl:transition-all hover:tpl:text-[var(--tpl-danger)] hover:tpl:opacity-100",
			"aria-label": x(r).mergeTag.remove,
			title: x(r).mergeTag.remove,
			onClick: a[0] ||= S((e) => n("clear"), ["stop"])
		}, [P(x(Mt), {
			size: 12,
			"stroke-width": 2.5
		})], 8, qn)], 42, Un));
	}
}), Yn = [
	"aria-label",
	"title",
	"disabled"
], Xn = "tpl:flex tpl:items-center tpl:justify-center tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:px-2 tpl:py-1 tpl:text-xs tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-[120ms] hover:tpl:bg-[var(--tpl-primary-light)] hover:tpl:text-[var(--tpl-primary)] hover:tpl:border-[var(--tpl-primary)]", Zn = /* @__PURE__ */ N({
	__name: "MergeTagInsertButton",
	props: { disabled: { type: Boolean } },
	emits: ["insert"],
	setup(e) {
		let { t } = W();
		return (n, r) => (s(), y("button", {
			type: "button",
			class: E([Xn, "tpl:mt-1.5"]),
			"aria-label": x(t).mergeTag.insert,
			title: x(t).mergeTag.insert,
			disabled: e.disabled,
			onMousedown: r[0] ||= S(() => {}, ["prevent"]),
			onClick: r[1] ||= (e) => n.$emit("insert")
		}, [P(x(lt), {
			size: 12,
			"stroke-width": 2
		}), M(" " + _(x(t).mergeTag.insertShort), 1)], 42, Yn));
	}
}), Qn = [
	"aria-label",
	"title",
	"disabled"
], $n = "tpl:flex tpl:items-center tpl:justify-center tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:px-2 tpl:py-1 tpl:text-xs tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-[120ms] hover:tpl:bg-[var(--tpl-primary-light)] hover:tpl:text-[var(--tpl-primary)] hover:tpl:border-[var(--tpl-primary)]", er = /* @__PURE__ */ N({
	__name: "LogicTagInsertButton",
	props: { disabled: { type: Boolean } },
	emits: ["insert"],
	setup(e) {
		let { t } = W();
		return (n, r) => (s(), y("button", {
			type: "button",
			class: E([$n, "tpl:mt-1.5"]),
			"aria-label": x(t).logicTag.insert,
			title: x(t).logicTag.insert,
			disabled: e.disabled,
			"data-testid": "field-insert-logic-button",
			onMousedown: r[0] ||= S(() => {}, ["prevent"]),
			onClick: r[1] ||= (e) => n.$emit("insert")
		}, [P(x(_t), {
			size: 12,
			"stroke-width": 2
		}), M(" " + _(x(t).logicTag.insertShort), 1)], 42, Qn));
	}
}), tr = { key: 0 }, nr = {
	key: 0,
	class: "tpl:flex tpl:flex-wrap tpl:gap-1.5"
}, rr = { key: 1 }, ir = [
	"value",
	"placeholder",
	"rows"
], ar = {
	key: 0,
	class: "tpl:flex tpl:flex-wrap tpl:gap-1.5"
}, or = "tpl:w-full tpl:resize-y tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:shadow-xs tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:text-sm tpl:text-[var(--tpl-text)] tpl:outline-none tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:placeholder:text-[var(--tpl-text-dim)] tpl:focus:border-[var(--tpl-primary)] tpl:focus:shadow-[var(--tpl-ring)]", sr = "tpl:flex tpl:w-full tpl:min-h-20 tpl:cursor-pointer tpl:items-start tpl:flex-wrap tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:shadow-xs tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:px-3 tpl:py-2 tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]", cr = /* @__PURE__ */ N({
	__name: "MergeTagTextarea",
	props: {
		modelValue: {},
		placeholder: { default: "" },
		rows: { default: 3 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = m(null), { segments: a, hasMergeTags: o, canRequestMergeTag: c, isRequestingMergeTag: l, canInsertLogicTag: u, isRequestingLogicTag: d, isEditing: f, startEditing: p, handleInput: h, handleKeydown: g, handleClick: _, handleBlur: v, clearValue: S, insertMergeTag: w, insertLogicTag: T } = Hn({
			modelValue: () => n.modelValue,
			emit: (e) => r("update:modelValue", e),
			elementRef: i
		});
		return (t, n) => x(o) && !x(f) ? (s(), y("div", tr, [P(Jn, {
			segments: x(a),
			"display-class": sr,
			onEdit: x(p),
			onClear: x(S)
		}, null, 8, [
			"segments",
			"onEdit",
			"onClear"
		]), x(c) || x(u) ? (s(), y("div", nr, [x(c) ? (s(), C(Zn, {
			key: 0,
			disabled: x(l),
			onInsert: x(w)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0), x(u) ? (s(), C(er, {
			key: 1,
			disabled: x(d),
			onInsert: x(T)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0)])) : b("", !0)])) : (s(), y("div", rr, [D("textarea", {
			ref_key: "textareaRef",
			ref: i,
			class: E(or),
			value: e.modelValue,
			placeholder: e.placeholder,
			rows: e.rows,
			onInput: n[0] ||= (...e) => x(h) && x(h)(...e),
			onKeydown: n[1] ||= (...e) => x(g) && x(g)(...e),
			onClick: n[2] ||= (...e) => x(_) && x(_)(...e),
			onBlur: n[3] ||= (...e) => x(v) && x(v)(...e)
		}, null, 40, ir), x(c) || x(u) ? (s(), y("div", ar, [x(c) ? (s(), C(Zn, {
			key: 0,
			disabled: x(l),
			onInsert: x(w)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0), x(u) ? (s(), C(er, {
			key: 1,
			disabled: x(d),
			onInsert: x(T)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0)])) : b("", !0)]));
	}
}), lr = { class: "tpl:flex tpl:w-full tpl:flex-1 tpl:flex-col tpl:bg-[var(--tpl-bg-elevated)]" }, ur = { class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:gap-3 tpl:overflow-y-auto tpl:p-4" }, dr = { class: "tpl:mb-3.5 tpl:flex tpl:items-center tpl:gap-2 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, fr = { class: "tpl:mb-3.5" }, pr = { class: "tpl:grid tpl:grid-cols-4 tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1 tpl:bg-[var(--tpl-bg-hover)]" }, mr = ["onClick"], hr = { class: "tpl:flex tpl:items-stretch" }, gr = ["value"], _r = { class: "tpl:mb-3.5 tpl:flex tpl:items-center tpl:gap-2 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, vr = { class: "tpl:mb-3.5" }, yr = { class: "tpl:mb-3.5" }, br = { class: "tpl:mb-3.5" }, xr = { class: "tpl:mb-3.5" }, Sr = ["value"], Cr = ["value"], wr = { class: "tpl:mb-3.5 tpl:flex tpl:items-center tpl:gap-2 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Tr = ["value"], Er = { class: "tpl:mt-1 tpl:text-xs tpl:leading-relaxed tpl:text-[var(--tpl-text-dim)]" }, Dr = { class: "tpl:mb-3.5 tpl:flex tpl:items-center tpl:gap-2 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Or = { class: "tpl:mt-1 tpl:flex tpl:items-start tpl:justify-between tpl:gap-2" }, kr = { class: "tpl:text-xs tpl:leading-relaxed tpl:text-[var(--tpl-text-dim)]" }, Ar = { class: "tpl:shrink-0 tpl:text-xs tpl:tabular-nums tpl:text-[var(--tpl-text-dim)]" }, jr = { class: "tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-3" }, Mr = { class: "tpl:mb-2.5 tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text-muted)]" }, Nr = { class: "tpl:m-0 tpl:pl-[18px] tpl:text-xs tpl:leading-relaxed tpl:text-[var(--tpl-text-dim)]" }, Pr = { class: "tpl:mb-1 tpl:last:mb-0" }, Fr = { class: "tpl:mb-1 tpl:last:mb-0" }, Ir = { class: "tpl:mb-1 tpl:last:mb-0" }, Lr = 150, Rr = /* @__PURE__ */ N({
	__name: "TemplateSettings",
	props: { settings: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = Me(tt, "TemplateSettings"), o = v(() => a.fonts.value), c = v(() => o.value.some((e) => e.value === n.settings.fontFamily) ? n.settings.fontFamily : a.defaultFont.value), l = [
			{
				value: 480,
				label: "480px"
			},
			{
				value: 600,
				label: "600px"
			},
			{
				value: 700,
				label: "700px"
			},
			{
				value: 800,
				label: "800px"
			}
		];
		return (t, n) => (s(), y("aside", lr, [D("div", ur, [
			D("div", { class: E(x(en)) }, [
				D("div", dr, [P(x(zt), {
					class: "tpl:text-[var(--tpl-text-muted)]",
					size: 14,
					"stroke-width": 2
				}), D("span", null, _(x(i).templateSettings.layout), 1)]),
				D("div", fr, [D("label", { class: E(x(q)) }, _(x(i).templateSettings.widthPreset), 3), D("div", pr, [(s(), y(j, null, u(l, (t) => D("button", {
					key: t.value,
					class: "tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-2 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
					style: k({
						backgroundColor: e.settings.width === t.value ? "var(--tpl-bg)" : "transparent",
						color: e.settings.width === t.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
						boxShadow: e.settings.width === t.value ? "var(--tpl-shadow)" : "none"
					}),
					onClick: (e) => r("update", { width: t.value })
				}, _(t.label), 13, mr)), 64))])]),
				D("div", null, [D("label", { class: E(x(q)) }, _(x(i).templateSettings.customWidth), 3), D("div", hr, [D("input", {
					type: "number",
					class: E(x(Y)),
					value: e.settings.width,
					min: "300",
					max: "900",
					onInput: n[0] ||= (e) => r("update", { width: Number(e.target.value) })
				}, null, 42, gr), D("span", { class: E(x(J)) }, "px", 2)])])
			], 2),
			D("div", { class: E(x(en)) }, [
				D("div", _r, [P(x(at), {
					class: "tpl:text-[var(--tpl-text-muted)]",
					size: 14,
					"stroke-width": 2
				}), D("span", null, _(x(i).templateSettings.appearance), 1)]),
				D("div", vr, [D("label", { class: E(x(q)) }, _(x(i).templateSettings.backgroundColor), 3), P(X, {
					"model-value": e.settings.backgroundColor,
					placeholder: x($t),
					"onUpdate:modelValue": n[1] ||= (e) => r("update", { backgroundColor: e })
				}, null, 8, ["model-value", "placeholder"])]),
				D("div", yr, [D("label", { class: E(x(q)) }, _(x(i).templateSettings.textColor), 3), P(X, {
					"model-value": e.settings.textColor ?? "",
					"seed-color": "#1a1a1a",
					"onUpdate:modelValue": n[2] ||= (e) => r("update", { textColor: e })
				}, null, 8, ["model-value"])]),
				D("div", br, [D("label", { class: E(x(q)) }, _(x(i).templateSettings.linkColor), 3), P(X, {
					"model-value": e.settings.linkColor ?? "",
					"seed-color": "#0066cc",
					"onUpdate:modelValue": n[3] ||= (e) => r("update", { linkColor: e || void 0 })
				}, null, 8, ["model-value"])]),
				D("div", xr, [P(Z, {
					class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
					"model-value": e.settings.linkUnderline,
					label: x(i).templateSettings.linkUnderline,
					"onUpdate:modelValue": n[4] ||= (e) => r("update", { linkUnderline: e })
				}, null, 8, ["model-value", "label"])]),
				D("div", null, [D("label", { class: E(x(q)) }, _(x(i).templateSettings.fontFamily), 3), D("select", {
					class: E(x(K)),
					value: c.value,
					onChange: n[5] ||= (e) => r("update", { fontFamily: e.target.value })
				}, [(s(!0), y(j, null, u(o.value, (e) => (s(), y("option", {
					key: e.value,
					value: e.value
				}, _(e.label), 9, Cr))), 128))], 42, Sr)])
			], 2),
			D("div", { class: E(x(en)) }, [D("div", wr, [P(x(Rt), {
				class: "tpl:text-[var(--tpl-text-muted)]",
				size: 14,
				"stroke-width": 2
			}), D("span", null, _(x(i).templateSettings.language), 1)]), D("div", null, [
				D("label", { class: E(x(q)) }, _(x(i).templateSettings.contentLocale), 3),
				D("input", {
					type: "text",
					class: E(x(K)),
					value: e.settings.locale ?? "",
					placeholder: "en",
					spellcheck: "false",
					autocapitalize: "off",
					autocomplete: "off",
					onInput: n[6] ||= (e) => r("update", { locale: e.target.value.trim() || void 0 })
				}, null, 42, Tr),
				D("p", Er, _(x(i).templateSettings.contentLocaleHint), 1)
			])], 2),
			D("div", { class: E(x(en)) }, [D("div", Dr, [P(x(Bt), {
				class: "tpl:text-[var(--tpl-text-muted)]",
				size: 14,
				"stroke-width": 2
			}), D("span", null, _(x(i).templateSettings.preheaderText), 1)]), D("div", null, [P(cr, {
				"model-value": e.settings.preheaderText ?? "",
				placeholder: x(i).templateSettings.preheaderTextPlaceholder,
				rows: 2,
				"onUpdate:modelValue": n[7] ||= (e) => r("update", { preheaderText: e.replace(/[\r\n]/g, " ") || void 0 })
			}, null, 8, ["model-value", "placeholder"]), D("div", Or, [D("span", kr, _(x(i).templateSettings.preheaderTextHint), 1), D("span", Ar, _((e.settings.preheaderText ?? "").length) + "/" + _(Lr), 1)])])], 2),
			D("div", jr, [D("div", Mr, [P(x(Dt), {
				size: 14,
				"stroke-width": 2
			}), D("span", null, _(x(i).templateSettings.tips), 1)]), D("ul", Nr, [
				D("li", Pr, _(x(i).templateSettings.tip1), 1),
				D("li", Fr, _(x(i).templateSettings.tip2), 1),
				D("li", Ir, _(x(i).templateSettings.tip3), 1)
			])])
		])]));
	}
}), zr = { key: 0 }, Br = {
	key: 0,
	class: "tpl:flex tpl:flex-wrap tpl:gap-1.5"
}, Vr = { key: 1 }, Hr = [
	"type",
	"value",
	"placeholder"
], Ur = {
	key: 0,
	class: "tpl:flex tpl:flex-wrap tpl:gap-1.5"
}, Wr = "tpl:flex tpl:w-full tpl:min-h-10 tpl:cursor-pointer tpl:items-center tpl:flex-wrap tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:shadow-xs tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:px-3.5 tpl:py-1.5 tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]", $ = /*#__PURE__*/ Vt(/* @__PURE__ */ N({
	__name: "MergeTagInput",
	props: {
		modelValue: {},
		type: { default: "text" },
		placeholder: { default: "" },
		pulse: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = m(null), { segments: a, hasMergeTags: o, canRequestMergeTag: c, isRequestingMergeTag: l, canInsertLogicTag: u, isRequestingLogicTag: d, isEditing: f, startEditing: p, handleInput: h, handleKeydown: g, handleClick: _, handleBlur: v, clearValue: S, insertMergeTag: w, insertLogicTag: T } = Hn({
			modelValue: () => n.modelValue,
			emit: (e) => r("update:modelValue", e),
			elementRef: i
		});
		return (t, n) => x(o) && !x(f) ? (s(), y("div", zr, [P(Jn, {
			segments: x(a),
			"display-class": Wr,
			pulse: e.pulse,
			onEdit: x(p),
			onClear: x(S)
		}, null, 8, [
			"segments",
			"pulse",
			"onEdit",
			"onClear"
		]), x(c) || x(u) ? (s(), y("div", Br, [x(c) ? (s(), C(Zn, {
			key: 0,
			disabled: x(l),
			onInsert: x(w)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0), x(u) ? (s(), C(er, {
			key: 1,
			disabled: x(d),
			onInsert: x(T)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0)])) : b("", !0)])) : (s(), y("div", Vr, [D("input", {
			ref_key: "inputRef",
			ref: i,
			type: e.type,
			class: E([x(K), { "tpl-pulse-fill": e.pulse }]),
			value: e.modelValue,
			placeholder: e.placeholder,
			onInput: n[0] ||= (...e) => x(h) && x(h)(...e),
			onKeydown: n[1] ||= (...e) => x(g) && x(g)(...e),
			onClick: n[2] ||= (...e) => x(_) && x(_)(...e),
			onBlur: n[3] ||= (...e) => x(v) && x(v)(...e)
		}, null, 42, Hr), x(c) || x(u) ? (s(), y("div", Ur, [x(c) ? (s(), C(Zn, {
			key: 0,
			disabled: x(l),
			onInsert: x(w)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0), x(u) ? (s(), C(er, {
			key: 1,
			disabled: x(d),
			onInsert: x(T)
		}, null, 8, ["disabled", "onInsert"])) : b("", !0)])) : b("", !0)]));
	}
}), [["__scopeId", "data-v-d6563be6"]]), Gr = { class: "tpl:mb-3.5" }, Kr = ["value"], qr = { value: "" }, Jr = ["value"], Yr = { class: "tpl:mb-3.5" }, Xr = { class: "tpl:mb-3.5" }, Zr = { class: "tpl:mb-3.5" }, Qr = { class: "tpl:mb-3.5" }, $r = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-3" }, ei = { class: "tpl:mb-3.5" }, ti = { class: "tpl:flex tpl:items-stretch" }, ni = ["value"], ri = { class: "tpl:mb-3.5" }, ii = { class: "tpl:flex tpl:items-stretch" }, ai = ["value"], oi = { class: "tpl:mb-3.5" }, si = ["value"], ci = { value: "auto" }, li = { value: "full" }, ui = { value: "custom" }, di = {
	key: 0,
	class: "tpl:mt-2 tpl:flex tpl:items-stretch"
}, fi = ["value"], pi = 200, mi = /* @__PURE__ */ N({
	__name: "ButtonToolbar",
	props: {
		block: {},
		fontFamilies: {}
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = v(() => n.block.width === "full" ? "full" : typeof n.block.width == "number" ? "custom" : "auto");
		function o(e, t) {
			r("update", { [e]: t });
		}
		function c(e) {
			if (e === "full") {
				o("width", "full");
				return;
			}
			if (e === "custom") {
				o("width", typeof n.block.width == "number" ? n.block.width : pi);
				return;
			}
			o("width", void 0);
		}
		function l(e) {
			let t = Number(e);
			!Number.isFinite(t) || t <= 0 || o("width", t);
		}
		return (t, n) => (s(), y(j, null, [
			D("div", Gr, [D("label", { class: E(x(q)) }, _(x(i).button.fontFamily), 3), D("select", {
				class: E(x(K)),
				value: e.block.fontFamily || "",
				onChange: n[0] ||= (e) => o("fontFamily", e.target.value || void 0)
			}, [D("option", qr, _(x(i).button.inheritFont), 1), (s(!0), y(j, null, u(e.fontFamilies, (e) => (s(), y("option", {
				key: e.value,
				value: e.value
			}, _(e.label), 9, Jr))), 128))], 42, Kr)]),
			D("div", Yr, [D("label", { class: E(x(q)) }, _(x(i).button.text), 3), P($, {
				"model-value": e.block.text,
				type: "text",
				"onUpdate:modelValue": n[1] ||= (e) => o("text", e)
			}, null, 8, ["model-value"])]),
			D("div", Xr, [
				D("label", { class: E(x(q)) }, _(x(i).button.url), 3),
				P($, {
					"model-value": e.block.url,
					type: "url",
					placeholder: x(i).button.urlPlaceholder,
					"onUpdate:modelValue": n[2] ||= (e) => o("url", e)
				}, null, 8, ["model-value", "placeholder"]),
				e.block.url ? (s(), C(Z, {
					key: 0,
					class: "tpl:mt-2 tpl:text-[12px] tpl:text-[var(--tpl-text-muted)]",
					"model-value": e.block.openInNewTab ?? !1,
					label: x(i).button.openInNewTab,
					"onUpdate:modelValue": n[3] ||= (e) => o("openInNewTab", e)
				}, null, 8, ["model-value", "label"])) : b("", !0)
			]),
			D("div", Zr, [D("label", { class: E(x(q)) }, _(x(i).button.background), 3), P(X, {
				"model-value": e.block.backgroundColor,
				"onUpdate:modelValue": n[4] ||= (e) => o("backgroundColor", e)
			}, null, 8, ["model-value"])]),
			D("div", Qr, [D("label", { class: E(x(q)) }, _(x(i).button.textColor), 3), P(X, {
				"model-value": e.block.textColor,
				"onUpdate:modelValue": n[5] ||= (e) => o("textColor", e)
			}, null, 8, ["model-value"])]),
			D("div", $r, [D("div", ei, [D("label", { class: E(x(q)) }, _(x(i).button.borderRadius), 3), D("div", ti, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.borderRadius,
				min: "0",
				max: "50",
				onInput: n[6] ||= (e) => o("borderRadius", Number(e.target.value))
			}, null, 42, ni), D("span", { class: E(x(J)) }, "px", 2)])]), D("div", ri, [D("label", { class: E(x(q)) }, _(x(i).button.fontSize), 3), D("div", ii, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.fontSize,
				min: "10",
				max: "36",
				onInput: n[7] ||= (e) => o("fontSize", Number(e.target.value))
			}, null, 42, ai), D("span", { class: E(x(J)) }, "px", 2)])])]),
			D("div", oi, [
				D("label", { class: E(x(q)) }, _(x(i).button.width), 3),
				D("select", {
					class: E(x(K)),
					value: a.value,
					onChange: n[8] ||= (e) => c(e.target.value)
				}, [
					D("option", ci, _(x(i).button.widthAuto), 1),
					D("option", li, _(x(i).button.fullWidth), 1),
					D("option", ui, _(x(i).button.widthCustom), 1)
				], 42, si),
				a.value === "custom" ? (s(), y("div", di, [D("input", {
					type: "number",
					class: E(x(Y)),
					value: typeof e.block.width == "number" ? e.block.width : pi,
					min: "20",
					onInput: n[9] ||= (e) => l(e.target.value)
				}, null, 42, fi), D("span", { class: E(x(J)) }, "px", 2)])) : b("", !0)
			])
		], 64));
	}
}), hi = { class: "spacing-control" }, gi = { class: "tpl:mb-2 tpl:block tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]" }, _i = { class: "tpl:flex tpl:flex-col tpl:items-center tpl:gap-1.5" }, vi = { class: "tpl:flex tpl:items-center" }, yi = ["aria-label"], bi = ["value", "aria-label"], xi = ["aria-label"], Si = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Ci = { class: "tpl:flex tpl:items-center" }, wi = ["aria-label"], Ti = ["value", "aria-label"], Ei = ["aria-label"], Di = ["aria-label", "title"], Oi = { class: "tpl:flex tpl:items-center" }, ki = ["aria-label"], Ai = ["value", "aria-label"], ji = ["aria-label"], Mi = { class: "tpl:flex tpl:items-center" }, Ni = ["aria-label"], Pi = ["value", "aria-label"], Fi = ["aria-label"], Ii = "tpl:flex tpl:items-center tpl:justify-center tpl:w-8 tpl:h-8 tpl:text-[var(--tpl-text-muted)] tpl:bg-[var(--tpl-bg)] tpl:border tpl:border-[var(--tpl-border)] tpl:cursor-pointer tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)] hover:tpl:text-[var(--tpl-text)] active:tpl:bg-[var(--tpl-bg-active)]", Li = "tpl:w-10 tpl:h-8 tpl:text-center tpl:text-xs tpl:font-medium tpl:border-y tpl:border-x-0 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:outline-none tpl:transition-all tpl:duration-[120ms] focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)]", Ri = /*#__PURE__*/ Vt(/* @__PURE__ */ N({
	__name: "SpacingControl",
	props: {
		modelValue: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = v(() => n.modelValue.top === n.modelValue.right && n.modelValue.right === n.modelValue.bottom && n.modelValue.bottom === n.modelValue.left), o = m(a.value);
		F(a, (e) => {
			!e && o.value && (o.value = !1);
		});
		function c(e, t) {
			let i = Math.max(0, n.modelValue[e] + t);
			o.value ? r("update:modelValue", {
				top: i,
				right: i,
				bottom: i,
				left: i
			}) : r("update:modelValue", {
				...n.modelValue,
				[e]: i
			});
		}
		function l(e, t) {
			let i = Math.max(0, t);
			o.value ? r("update:modelValue", {
				top: i,
				right: i,
				bottom: i,
				left: i
			}) : r("update:modelValue", {
				...n.modelValue,
				[e]: i
			});
		}
		function u() {
			if (o.value = !o.value, o.value) {
				let e = n.modelValue.top;
				r("update:modelValue", {
					top: e,
					right: e,
					bottom: e,
					left: e
				});
			}
		}
		return (t, n) => (s(), y("div", hi, [D("label", gi, _(e.label), 1), D("div", _i, [
			D("div", vi, [
				D("button", {
					"aria-label": x(i).spacingControl.decreaseTop,
					class: E([Ii, "tpl:rounded-l-[var(--tpl-radius-sm)]"]),
					onClick: n[0] ||= (e) => c("top", -1)
				}, [P(x(It), {
					size: 12,
					"stroke-width": 2
				})], 10, yi),
				D("input", {
					type: "number",
					class: E(Li),
					value: e.modelValue.top,
					"aria-label": x(i).spacingControl.top,
					min: "0",
					onInput: n[1] ||= (e) => l("top", Number(e.target.value))
				}, null, 40, bi),
				D("button", {
					"aria-label": x(i).spacingControl.increaseTop,
					class: E([Ii, "tpl:rounded-r-[var(--tpl-radius-sm)]"]),
					onClick: n[2] ||= (e) => c("top", 1)
				}, [P(x(G), {
					size: 12,
					"stroke-width": 2
				})], 10, xi)
			]),
			D("div", Si, [
				D("div", Ci, [
					D("button", {
						"aria-label": x(i).spacingControl.decreaseLeft,
						class: E([Ii, "tpl:rounded-l-[var(--tpl-radius-sm)]"]),
						onClick: n[3] ||= (e) => c("left", -1)
					}, [P(x(It), {
						size: 12,
						"stroke-width": 2
					})], 10, wi),
					D("input", {
						type: "number",
						class: E(Li),
						value: e.modelValue.left,
						"aria-label": x(i).spacingControl.left,
						min: "0",
						onInput: n[4] ||= (e) => l("left", Number(e.target.value))
					}, null, 40, Ti),
					D("button", {
						"aria-label": x(i).spacingControl.increaseLeft,
						class: E([Ii, "tpl:rounded-r-[var(--tpl-radius-sm)]"]),
						onClick: n[5] ||= (e) => c("left", 1)
					}, [P(x(G), {
						size: 12,
						"stroke-width": 2
					})], 10, Ei)
				]),
				D("button", {
					class: E(["tpl:flex tpl:h-8 tpl:w-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]", o.value ? "tpl:border-[var(--tpl-primary)] tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary)]" : "tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text-muted)] hover:tpl:bg-[var(--tpl-bg-hover)]"]),
					"aria-label": o.value ? x(i).spacingControl.unlock : x(i).spacingControl.lockAll,
					title: o.value ? x(i).spacingControl.unlock : x(i).spacingControl.lockAll,
					onClick: u
				}, [o.value ? (s(), C(x(Pt), {
					key: 0,
					size: 14,
					"stroke-width": 2
				})) : (s(), C(x(kt), {
					key: 1,
					size: 14,
					"stroke-width": 2
				}))], 10, Di),
				D("div", Oi, [
					D("button", {
						"aria-label": x(i).spacingControl.decreaseRight,
						class: E([Ii, "tpl:rounded-l-[var(--tpl-radius-sm)]"]),
						onClick: n[6] ||= (e) => c("right", -1)
					}, [P(x(It), {
						size: 12,
						"stroke-width": 2
					})], 10, ki),
					D("input", {
						type: "number",
						class: E(Li),
						value: e.modelValue.right,
						"aria-label": x(i).spacingControl.right,
						min: "0",
						onInput: n[7] ||= (e) => l("right", Number(e.target.value))
					}, null, 40, Ai),
					D("button", {
						"aria-label": x(i).spacingControl.increaseRight,
						class: E([Ii, "tpl:rounded-r-[var(--tpl-radius-sm)]"]),
						onClick: n[8] ||= (e) => c("right", 1)
					}, [P(x(G), {
						size: 12,
						"stroke-width": 2
					})], 10, ji)
				])
			]),
			D("div", Mi, [
				D("button", {
					"aria-label": x(i).spacingControl.decreaseBottom,
					class: E([Ii, "tpl:rounded-l-[var(--tpl-radius-sm)]"]),
					onClick: n[9] ||= (e) => c("bottom", -1)
				}, [P(x(It), {
					size: 12,
					"stroke-width": 2
				})], 10, Ni),
				D("input", {
					type: "number",
					class: E(Li),
					value: e.modelValue.bottom,
					"aria-label": x(i).spacingControl.bottom,
					min: "0",
					onInput: n[10] ||= (e) => l("bottom", Number(e.target.value))
				}, null, 40, Pi),
				D("button", {
					"aria-label": x(i).spacingControl.increaseBottom,
					class: E([Ii, "tpl:rounded-r-[var(--tpl-radius-sm)]"]),
					onClick: n[11] ||= (e) => c("bottom", 1)
				}, [P(x(G), {
					size: 12,
					"stroke-width": 2
				})], 10, Fi)
			])
		])]));
	}
}), [["__scopeId", "data-v-9a9c8a07"]]), zi = ["data-testid"], Bi = { class: "tpl:mt-3" }, Vi = /* @__PURE__ */ N({
	__name: "CollapsibleSection",
	props: {
		title: {},
		open: { type: Boolean },
		noBorder: { type: Boolean },
		headerTestId: {}
	},
	emits: ["toggle"],
	setup(e) {
		return (n, i) => (s(), y("div", { class: E(["tpl:py-3", e.noBorder ? "" : "tpl:border-t tpl:border-[var(--tpl-border)]"]) }, [D("button", {
			type: "button",
			"data-testid": e.headerTestId,
			class: "tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:gap-1.5 tpl:border-none tpl:bg-transparent tpl:p-0 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
			onClick: i[0] ||= (e) => n.$emit("toggle")
		}, [P(x(ut), {
			class: E(["tpl:transition-transform tpl:duration-200", e.open ? "tpl:rotate-0" : "tpl:-rotate-90"]),
			size: 12,
			"stroke-width": 2
		}, null, 8, ["class"]), D("span", null, _(e.title), 1)], 8, zi), r(D("div", Bi, [t(n.$slots, "default")], 512), [[O, e.open]])], 2));
	}
}), Hi = { class: "tpl:space-y-2" }, Ui = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Wi = { class: "tpl:space-y-2" }, Gi = ["value"], Ki = { value: "" }, qi = ["label"], Ji = ["value"], Yi = ["value"], Xi = {
	key: 0,
	value: "__custom__"
}, Zi = {
	key: 0,
	class: "tpl:space-y-2"
}, Qi = { class: "tpl:mb-1 tpl:block tpl:text-[11px] tpl:font-medium tpl:text-[var(--tpl-text-muted)]" }, $i = { class: "tpl:mb-1 tpl:block tpl:text-[11px] tpl:font-medium tpl:text-[var(--tpl-text-muted)]" }, ea = { class: "tpl:flex tpl:justify-end" }, ta = ["disabled"], na = {
	key: 0,
	class: "tpl:text-[11px] tpl:text-[var(--tpl-text-muted)]"
}, ra = { class: "tpl:space-y-1" }, ia = { class: "tpl:m-0 tpl:overflow-x-auto tpl:rounded tpl:bg-[var(--tpl-bg)] tpl:p-2 tpl:font-mono tpl:text-[10px] tpl:text-[var(--tpl-text-muted)]" }, aa = {
	key: 0,
	class: "tpl:m-0 tpl:overflow-x-auto tpl:rounded tpl:bg-[var(--tpl-bg)] tpl:p-2 tpl:font-mono tpl:text-[10px] tpl:text-[var(--tpl-text-muted)]"
}, oa = /* @__PURE__ */ N({
	__name: "CommonBlockSettings",
	props: {
		block: {},
		isFirstSection: { type: Boolean }
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = W(), c = d(Ke, []), l = d(Ye, !1), h = p(/* @__PURE__ */ new Set()), g = m(!1), S = m(""), w = m(""), O = [{
			key: "desktop",
			icon: Et,
			labelKey: "showOnDesktop"
		}, {
			key: "mobile",
			icon: mt,
			labelKey: "showOnMobile"
		}];
		function k(e) {
			h.has(e) ? h.delete(e) : h.add(e);
		}
		let A = v(() => c.length > 0 || l), N = v(() => n.block.displayCondition ? !c.some((e) => e.label === n.block.displayCondition?.label) : !1);
		function I() {
			g.value = !0, N.value && n.block.displayCondition ? (S.value = n.block.displayCondition.before, w.value = n.block.displayCondition.after ?? "") : (S.value = "", w.value = "");
		}
		function ee() {
			S.value.trim() && (i("update", { displayCondition: {
				label: a.blockSettings.customCondition,
				before: S.value.trim(),
				after: w.value.trim()
			} }), g.value = !1, S.value = "", w.value = "");
		}
		F(() => n.block.displayCondition, (e) => {
			if (!e) {
				g.value = !1, S.value = "", w.value = "";
				return;
			}
			N.value && (S.value = e.before, w.value = e.after ?? "");
		}, { immediate: !0 });
		let L = v(() => {
			let e = {};
			for (let t of c) {
				let n = t.group ?? "";
				e[n] || (e[n] = []), e[n].push(t);
			}
			return e;
		});
		function R(e, t) {
			i("update", { styles: {
				...n.block.styles,
				[e]: t
			} });
		}
		function z(e) {
			return n.block.visibility?.[e] !== !1;
		}
		function B(e) {
			let t = {
				desktop: z("desktop"),
				mobile: z("mobile")
			};
			t[e] = !t[e], i("update", { visibility: t });
		}
		return (t, n) => (s(), y("div", { class: E(["tpl:flex tpl:flex-col", e.isFirstSection ? "" : "tpl:mt-4"]) }, [
			P(Vi, {
				title: x(a).blockSettings.spacing,
				open: h.has("spacing"),
				"no-border": e.isFirstSection,
				onToggle: n[1] ||= (e) => k("spacing")
			}, {
				default: f(() => [P(Ri, {
					label: x(a).blockSettings.padding,
					"model-value": e.block.styles.padding,
					"onUpdate:modelValue": n[0] ||= (e) => R("padding", e)
				}, null, 8, ["label", "model-value"])]),
				_: 1
			}, 8, [
				"title",
				"open",
				"no-border"
			]),
			P(Vi, {
				title: x(a).blockSettings.background,
				open: h.has("bg"),
				onToggle: n[3] ||= (e) => k("bg")
			}, {
				default: f(() => [D("label", { class: E(x(q)) }, _(x(a).blockSettings.color), 3), P(X, {
					"model-value": e.block.styles.backgroundColor ?? "",
					"onUpdate:modelValue": n[2] ||= (e) => R("backgroundColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["title", "open"]),
			P(Vi, {
				title: x(a).blockSettings.display,
				open: h.has("display"),
				onToggle: n[4] ||= (e) => k("display")
			}, {
				default: f(() => [D("div", Hi, [(s(), y(j, null, u(O, (e) => P(Z, {
					key: e.key,
					class: "tpl:text-xs tpl:text-[var(--tpl-text)]",
					"model-value": z(e.key),
					label: x(a).blockSettings[e.labelKey],
					"onUpdate:modelValue": (t) => B(e.key)
				}, {
					default: f(() => [D("span", Ui, [(s(), C(o(e.icon), {
						size: 14,
						"stroke-width": 1.5
					})), M(" " + _(x(a).blockSettings[e.labelKey]), 1)])]),
					_: 2
				}, 1032, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				])), 64))])]),
				_: 1
			}, 8, ["title", "open"]),
			A.value ? (s(), C(Vi, {
				key: 0,
				"header-test-id": "display-condition-section",
				title: x(a).blockSettings.displayCondition,
				open: h.has("condition"),
				onToggle: n[8] ||= (e) => k("condition")
			}, {
				default: f(() => [D("div", Wi, [D("select", {
					"data-testid": "display-condition-select",
					class: E(["tpl:w-full tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-2 tpl:text-xs tpl:outline-none tpl:transition-all tpl:duration-150 tpl:focus:border-[var(--tpl-primary)] tpl:focus:shadow-[0_0_0_3px_var(--tpl-primary-light)]", e.block.displayCondition ? "tpl:border-[var(--tpl-primary)] tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-text)]" : "tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"]),
					value: g.value || N.value ? "__custom__" : e.block.displayCondition?.label ?? "",
					onChange: n[5] ||= (e) => {
						let t = e.target.value;
						if (t === "__custom__") {
							I();
							return;
						}
						if (g.value = !1, !t) {
							i("update", { displayCondition: void 0 });
							return;
						}
						let n = x(c).find((e) => e.label === t);
						n && i("update", { displayCondition: n });
					}
				}, [
					D("option", Ki, _(x(a).blockSettings.noCondition), 1),
					(s(!0), y(j, null, u(L.value, (e, t) => (s(), y(j, { key: t }, [t ? (s(), y("optgroup", {
						key: 0,
						label: String(t)
					}, [(s(!0), y(j, null, u(e, (e) => (s(), y("option", {
						key: e.label,
						value: e.label
					}, _(e.label), 9, Ji))), 128))], 8, qi)) : (s(!0), y(j, { key: 1 }, u(e, (e) => (s(), y("option", {
						key: e.label,
						value: e.label
					}, _(e.label), 9, Yi))), 128))], 64))), 128)),
					x(l) ? (s(), y("option", Xi, _(x(a).blockSettings.customCondition), 1)) : b("", !0)
				], 42, Gi), g.value || N.value ? (s(), y("div", Zi, [
					D("div", null, [D("label", Qi, _(x(a).blockSettings.customConditionBefore), 1), r(D("textarea", {
						"onUpdate:modelValue": n[6] ||= (e) => S.value = e,
						rows: "2",
						class: E(x(Xt))
					}, null, 2), [[T, S.value]])]),
					D("div", null, [D("label", $i, _(x(a).blockSettings.customConditionAfter), 1), r(D("textarea", {
						"onUpdate:modelValue": n[7] ||= (e) => w.value = e,
						rows: "2",
						class: E(x(Xt))
					}, null, 2), [[T, w.value]])]),
					D("div", ea, [D("button", {
						type: "button",
						class: "tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-[var(--tpl-primary)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-bg)] tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:opacity-50",
						disabled: !S.value.trim(),
						onClick: ee
					}, _(x(a).blockSettings.applyCondition), 9, ta)])
				])) : e.block.displayCondition && !N.value ? (s(), y(j, { key: 1 }, [e.block.displayCondition.description ? (s(), y("p", na, _(e.block.displayCondition.description), 1)) : b("", !0), D("div", ra, [D("pre", ia, _(e.block.displayCondition.before), 1), e.block.displayCondition.after ? (s(), y("pre", aa, _(e.block.displayCondition.after), 1)) : b("", !0)])], 64)) : b("", !0)])]),
				_: 1
			}, 8, ["title", "open"])) : b("", !0)
		], 2));
	}
}), sa = ["title"], ca = /* @__PURE__ */ N({
	__name: "BooleanField",
	props: {
		field: {},
		modelValue: { type: Boolean },
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), y("div", {
			class: "tpl:mb-3.5",
			title: e.readOnly ? x(r).customBlocks.dataSource.readOnlyTooltip : void 0
		}, [P(Z, {
			class: "tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
			"model-value": e.modelValue,
			label: e.field.label,
			required: e.field.required,
			disabled: e.readOnly,
			"onUpdate:modelValue": i[0] ||= (e) => n("update:modelValue", e)
		}, {
			default: f(() => [M(_(e.field.label) + " ", 1), e.readOnly ? (s(), C(x(Pt), {
				key: 0,
				size: 12,
				class: "tpl:inline tpl:text-[var(--tpl-text-dim)]"
			})) : b("", !0)]),
			_: 1
		}, 8, [
			"model-value",
			"label",
			"required",
			"disabled"
		])], 8, sa));
	}
}), la = { class: "tpl:mb-3.5" }, ua = {
	key: 1,
	class: "tpl:text-[var(--tpl-danger)]"
}, da = /* @__PURE__ */ N({
	__name: "FieldWrapper",
	props: {
		label: {},
		required: { type: Boolean },
		readOnly: { type: Boolean }
	},
	setup(e) {
		return (n, r) => (s(), y("div", la, [D("label", { class: E(x(q)) }, [
			M(_(e.label) + " ", 1),
			e.readOnly ? (s(), C(x(Pt), {
				key: 0,
				size: 12,
				class: "tpl:inline tpl:text-[var(--tpl-text-dim)]"
			})) : b("", !0),
			e.required ? (s(), y("span", ua, "*")) : b("", !0)
		], 2), t(n.$slots, "default")]));
	}
}), fa = /* @__PURE__ */ N({
	__name: "ColorField",
	props: {
		field: {},
		modelValue: {},
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = d(et, nt), o = v(() => ie(n.field, a));
		return (t, n) => (s(), C(da, {
			label: e.field.label,
			required: e.field.required,
			"read-only": e.readOnly
		}, {
			default: f(() => [P(X, {
				"model-value": e.modelValue,
				placeholder: e.field.placeholder,
				disabled: e.readOnly,
				presets: o.value.presets,
				"allow-custom": o.value.allowCustom,
				title: e.readOnly ? x(i).customBlocks.dataSource.readOnlyTooltip : void 0,
				"onUpdate:modelValue": n[0] ||= (e) => r("update:modelValue", e)
			}, null, 8, [
				"model-value",
				"placeholder",
				"disabled",
				"presets",
				"allow-custom",
				"title"
			])]),
			_: 1
		}, 8, [
			"label",
			"required",
			"read-only"
		]));
	}
}), pa = {
	key: 0,
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-10 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-xs tpl:font-medium tpl:border-[var(--tpl-primary)] tpl:text-[var(--tpl-primary)]",
	style: { "background-color": "color-mix(in srgb, var(--tpl-bg) 90%, transparent)" }
}, ma = [
	"value",
	"placeholder",
	"title"
], ha = ["value", "placeholder"], ga = /* @__PURE__ */ N({
	__name: "ImageField",
	props: {
		field: {},
		modelValue: {},
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = d(Fe, null), o = Wt(), c = v(() => !!a);
		async function l() {
			let e = await a?.({ accept: ["images"] });
			o.alive && e && r("update:modelValue", e.url);
		}
		let u = m(), p = m(!1), h = v(() => c.value && !p.value && !n.readOnly);
		async function g(e) {
			if (a) {
				p.value = !0;
				try {
					let t = await a({
						accept: ["images"],
						files: e
					});
					if (!o.alive) return;
					t && r("update:modelValue", t.url);
				} finally {
					o.alive && (p.value = !1);
				}
			}
		}
		let { isOver: S } = me({
			target: u,
			enabled: h,
			onFiles: g
		});
		return (t, n) => (s(), C(da, {
			label: e.field.label,
			required: e.field.required,
			"read-only": e.readOnly
		}, {
			default: f(() => [D("div", {
				ref_key: "dropZoneRef",
				ref: u,
				class: "tpl:relative"
			}, [
				h.value && (x(S) || p.value) ? (s(), y("div", pa, [p.value ? (s(), y(j, { key: 0 }, [P(x(St), {
					class: "tpl-spinner",
					size: 18,
					"stroke-width": 2
				}), M(" " + _(x(i).image.uploading), 1)], 64)) : (s(), y(j, { key: 1 }, [P(x(Ft), {
					size: 18,
					"stroke-width": 1.5
				}), M(" " + _(x(i).image.dropToUpload), 1)], 64))])) : b("", !0),
				e.readOnly ? (s(), y("input", {
					key: 1,
					type: "url",
					class: E([x(K), "tpl:opacity-60 tpl:cursor-not-allowed"]),
					value: e.modelValue,
					placeholder: e.field.placeholder || "https://...",
					disabled: "",
					title: x(i).customBlocks.dataSource.readOnlyTooltip
				}, null, 10, ma)) : (s(), y("input", {
					key: 2,
					type: "url",
					class: E(x(K)),
					value: e.modelValue,
					placeholder: e.field.placeholder || "https://...",
					onInput: n[0] ||= (e) => r("update:modelValue", e.target.value)
				}, null, 42, ha)),
				c.value && !e.readOnly ? (s(), y("button", {
					key: 3,
					class: "tpl:mt-2 tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-primary)] tpl:bg-[var(--tpl-bg)]",
					onClick: n[1] ||= (e) => l()
				}, [P(x(Nt), {
					size: 14,
					"stroke-width": 1.5
				}), M(" " + _(x(i).image.browseMedia), 1)])) : b("", !0)
			], 512)]),
			_: 1
		}, 8, [
			"label",
			"required",
			"read-only"
		]));
	}
}), _a = [
	"value",
	"placeholder",
	"min",
	"max",
	"step",
	"disabled",
	"title"
], va = /* @__PURE__ */ N({
	__name: "NumberField",
	props: {
		field: {},
		modelValue: {},
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), C(da, {
			label: e.field.label,
			required: e.field.required,
			"read-only": e.readOnly
		}, {
			default: f(() => [D("input", {
				type: "number",
				class: E([x(K), e.readOnly && "tpl:opacity-60 tpl:cursor-not-allowed"]),
				value: e.modelValue,
				placeholder: e.field.placeholder,
				min: e.field.min,
				max: e.field.max,
				step: e.field.step,
				disabled: e.readOnly,
				title: e.readOnly ? x(r).customBlocks.dataSource.readOnlyTooltip : void 0,
				onInput: i[0] ||= (t) => !e.readOnly && n("update:modelValue", Number(t.target.value))
			}, null, 42, _a)]),
			_: 1
		}, 8, [
			"label",
			"required",
			"read-only"
		]));
	}
}), ya = { class: "tpl:flex tpl:flex-col tpl:gap-2" }, ba = { class: "tpl:mb-2 tpl:flex tpl:items-center tpl:justify-between" }, xa = { class: "tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-dim)]" }, Sa = ["title", "onClick"], Ca = {
	key: 1,
	class: "tpl:m-0 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, wa = /* @__PURE__ */ N({
	__name: "RepeatableField",
	props: {
		field: {},
		modelValue: {},
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = v(() => n.modelValue || []), c = v(() => !n.field.maxItems || a.value.length < n.field.maxItems), l = v(() => !n.field.minItems || a.value.length > n.field.minItems);
		function d() {
			if (!c.value || n.readOnly) return;
			let e = {};
			for (let t of n.field.fields) e[t.key] = t.default ?? "";
			r("update:modelValue", [...a.value, e]);
		}
		function p(e) {
			if (!l.value || n.readOnly) return;
			let t = [...a.value];
			t.splice(e, 1), r("update:modelValue", t);
		}
		function m(e, t, n) {
			let i = a.value.map((r, i) => i === e ? {
				...r,
				[t]: n
			} : r);
			r("update:modelValue", i);
		}
		return (t, n) => (s(), C(da, {
			label: e.field.label,
			required: e.field.required,
			"read-only": e.readOnly
		}, {
			default: f(() => [D("div", ya, [
				(s(!0), y(j, null, u(a.value, (t, n) => (s(), y("div", {
					key: `${e.field.key}-${n}`,
					class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:p-3"
				}, [D("div", ba, [D("span", xa, " #" + _(n + 1), 1), l.value && !e.readOnly ? (s(), y("button", {
					key: 0,
					type: "button",
					class: "tpl:flex tpl:size-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-danger)] tpl:hover:bg-[var(--tpl-danger-light)] tpl:hover:text-[var(--tpl-danger)]",
					title: x(i).customBlocks.fields.removeItem,
					onClick: (e) => p(n)
				}, [P(x(Tt), {
					size: 12,
					"stroke-width": 2
				})], 8, Sa)) : b("", !0)]), (s(!0), y(j, null, u(e.field.fields, (r) => (s(), C(o(x(Na)(r.type)), {
					key: r.key,
					field: r,
					"model-value": t[r.key],
					"read-only": e.readOnly,
					"onUpdate:modelValue": (e) => m(n, r.key, e)
				}, null, 8, [
					"field",
					"model-value",
					"read-only",
					"onUpdate:modelValue"
				]))), 128))]))), 128)),
				c.value && !e.readOnly ? (s(), y("button", {
					key: 0,
					type: "button",
					class: E(x(Qt)),
					onClick: d
				}, [P(x(G), {
					size: 14,
					"stroke-width": 2
				}), M(" " + _(x(i).customBlocks.fields.addItem), 1)], 2)) : b("", !0),
				!c.value && !e.readOnly ? (s(), y("p", Ca, _(x(i).customBlocks.fields.maxItemsReached), 1)) : b("", !0)
			])]),
			_: 1
		}, 8, [
			"label",
			"required",
			"read-only"
		]));
	}
}), Ta = [
	"value",
	"disabled",
	"title"
], Ea = ["value"], Da = /* @__PURE__ */ N({
	__name: "SelectField",
	props: {
		field: {},
		modelValue: {},
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), C(da, {
			label: e.field.label,
			required: e.field.required,
			"read-only": e.readOnly
		}, {
			default: f(() => [D("select", {
				class: E([x(K), e.readOnly && "tpl:opacity-60 tpl:cursor-not-allowed"]),
				value: e.modelValue,
				disabled: e.readOnly,
				title: e.readOnly ? x(r).customBlocks.dataSource.readOnlyTooltip : void 0,
				onChange: i[0] ||= (t) => !e.readOnly && n("update:modelValue", t.target.value)
			}, [(s(!0), y(j, null, u(e.field.options, (e) => (s(), y("option", {
				key: e.value,
				value: e.value
			}, _(e.label), 9, Ea))), 128))], 42, Ta)]),
			_: 1
		}, 8, [
			"label",
			"required",
			"read-only"
		]));
	}
}), Oa = [
	"value",
	"placeholder",
	"title"
], ka = /* @__PURE__ */ N({
	__name: "TextField",
	props: {
		field: {},
		modelValue: {},
		readOnly: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), C(da, {
			label: e.field.label,
			required: e.field.required,
			"read-only": e.readOnly
		}, {
			default: f(() => [e.readOnly ? (s(), y("input", {
				key: 0,
				type: "text",
				class: E([x(K), "tpl:opacity-60 tpl:cursor-not-allowed"]),
				value: e.modelValue,
				placeholder: e.field.placeholder,
				disabled: "",
				title: x(r).customBlocks.dataSource.readOnlyTooltip
			}, null, 10, Oa)) : (s(), C($, {
				key: 1,
				"model-value": e.modelValue,
				placeholder: e.field.placeholder,
				"onUpdate:modelValue": i[0] ||= (e) => n("update:modelValue", e)
			}, null, 8, ["model-value", "placeholder"]))]),
			_: 1
		}, 8, [
			"label",
			"required",
			"read-only"
		]));
	}
}), Aa = [
	"value",
	"placeholder",
	"title"
], ja = "tpl:w-full tpl:resize-y tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:text-sm tpl:text-[var(--tpl-text)] tpl:outline-none tpl:opacity-60 tpl:cursor-not-allowed", Ma = {
	text: ka,
	textarea: /* @__PURE__ */ N({
		__name: "TextareaField",
		props: {
			field: {},
			modelValue: {},
			readOnly: { type: Boolean }
		},
		emits: ["update:modelValue"],
		setup(e, { emit: t }) {
			let n = t, { t: r } = W();
			return (t, i) => (s(), C(da, {
				label: e.field.label,
				required: e.field.required,
				"read-only": e.readOnly
			}, {
				default: f(() => [e.readOnly ? (s(), y("textarea", {
					key: 0,
					value: e.modelValue,
					placeholder: e.field.placeholder,
					rows: "3",
					disabled: "",
					title: x(r).customBlocks.dataSource.readOnlyTooltip,
					class: E(ja)
				}, null, 8, Aa)) : (s(), C(cr, {
					key: 1,
					"model-value": e.modelValue,
					placeholder: e.field.placeholder,
					"onUpdate:modelValue": i[0] ||= (e) => n("update:modelValue", e)
				}, null, 8, ["model-value", "placeholder"]))]),
				_: 1
			}, 8, [
				"label",
				"required",
				"read-only"
			]));
		}
	}),
	image: ga,
	color: fa,
	number: va,
	select: Da,
	boolean: ca,
	repeatable: wa
};
function Na(e) {
	return Ma[e] ?? ka;
}
//#endregion
//#region src/components/toolbar/CustomBlockToolbar.vue?vue&type=script&setup=true&lang.ts
var Pa = {
	key: 0,
	class: "tpl:p-4"
}, Fa = { class: "tpl:m-0 tpl:text-center tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Ia = { key: 1 }, La = {
	key: 0,
	class: "tpl:m-0 tpl:mb-3 tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, Ra = {
	key: 1,
	class: "tpl:mb-4"
}, za = {
	key: 1,
	class: "tpl:flex tpl:h-[32px] tpl:items-center"
}, Ba = {
	key: 0,
	class: "tpl:w-full tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, Va = {
	key: 2,
	class: "tpl:m-0 tpl:mt-2 tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-danger)]"
}, Ha = /* @__PURE__ */ N({
	__name: "CustomBlockToolbar",
	props: { block: {} },
	emits: ["updateFieldValues", "updateDataSourceFetched"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = d(Ze, []), c = v(() => a.find((e) => e.type === n.block.customType)), l = v(() => n.block), { isFetching: f, fetchError: p, fetch: m, hasDataSource: h, needsFetch: g } = U({
			definition: c,
			block: l,
			onUpdate: (e, t) => {
				r("updateFieldValues", e), r("updateDataSourceFetched", t);
			}
		});
		function S(e) {
			return e.readOnly === !0 && h.value && !!n.block.dataSourceFetched;
		}
		function w(e, t) {
			r("updateFieldValues", {
				...n.block.fieldValues,
				[e]: t
			});
		}
		return (t, n) => c.value ? (s(), y("div", Ia, [
			c.value.description ? (s(), y("p", La, _(c.value.description), 1)) : b("", !0),
			x(h) ? (s(), y("div", Ra, [x(g) && !x(f) ? (s(), y("button", {
				key: 0,
				type: "button",
				class: "tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded-md tpl:px-3 tpl:py-2.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-bg)] tpl:transition-all tpl:duration-150 tpl:bg-[var(--tpl-primary)]",
				onClick: n[0] ||= (...e) => x(m) && x(m)(...e)
			}, _(c.value?.dataSource?.label || x(i).customBlocks.dataSource.fetchButton), 1)) : (s(), y("div", za, [x(f) ? (s(), y("div", Ba, _(x(i).customBlocks.dataSource.fetching), 1)) : (s(), y("button", {
				key: 1,
				type: "button",
				class: "tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-primary)] tpl:hover:text-[var(--tpl-primary)]",
				onClick: n[1] ||= (...e) => x(m) && x(m)(...e)
			}, [P(x(ot), { size: 12 }), M(" " + _(x(i).customBlocks.dataSource.changeButton), 1)]))])), x(p) ? (s(), y("p", Va, [P(x(pt), {
				size: 14,
				class: "tpl:shrink-0"
			}), M(" " + _(x(i).customBlocks.dataSource.fetchError), 1)])) : b("", !0)])) : b("", !0),
			(s(!0), y(j, null, u(c.value.fields, (t) => (s(), C(o(x(Na)(t.type)), {
				key: t.key,
				field: t,
				"model-value": e.block.fieldValues[t.key],
				"read-only": S(t),
				"onUpdate:modelValue": (e) => w(t.key, e)
			}, null, 8, [
				"field",
				"model-value",
				"read-only",
				"onUpdate:modelValue"
			]))), 128))
		])) : (s(), y("div", Pa, [D("p", Fa, _(x(i).customBlocks.toolbar.noDefinition), 1)]));
	}
}), Ua = { class: "tpl:mb-3.5" }, Wa = { class: "tpl:mb-3.5" }, Ga = { class: "tpl:mb-3.5" }, Ka = { class: "tpl:flex tpl:items-stretch" }, qa = ["value"], Ja = /* @__PURE__ */ N({
	__name: "DividerToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		function i(e, t) {
			n("update", { [e]: t });
		}
		return (t, n) => (s(), y(j, null, [
			D("div", Ua, [D("label", { class: E(x(q)) }, _(x(r).divider.style), 3), P(rn, {
				options: [
					{
						value: "solid",
						label: x(r).divider.solid
					},
					{
						value: "dashed",
						label: x(r).divider.dashed
					},
					{
						value: "dotted",
						label: x(r).divider.dotted
					}
				],
				"model-value": e.block.lineStyle,
				"onUpdate:modelValue": n[0] ||= (e) => i("lineStyle", e)
			}, null, 8, ["options", "model-value"])]),
			D("div", Wa, [D("label", { class: E(x(q)) }, _(x(r).divider.color), 3), P(X, {
				"model-value": e.block.color,
				"onUpdate:modelValue": n[1] ||= (e) => i("color", e)
			}, null, 8, ["model-value"])]),
			D("div", Ga, [D("label", { class: E(x(q)) }, _(x(r).divider.thickness), 3), D("div", Ka, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.thickness,
				min: "1",
				max: "10",
				onInput: n[2] ||= (e) => i("thickness", Number(e.target.value))
			}, null, 42, qa), D("span", { class: E(x(J)) }, "px", 2)])])
		], 64));
	}
}), Ya = { class: "tpl:mb-3.5" }, Xa = ["value"], Za = { class: "tpl:mt-1.5 tpl:flex tpl:items-start tpl:gap-1.5 tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, Qa = /* @__PURE__ */ N({
	__name: "HtmlToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), y("div", Ya, [
			D("label", { class: E(x(q)) }, _(x(r).html.content), 3),
			D("textarea", {
				value: e.block.content,
				placeholder: "<div>...</div>",
				rows: "10",
				class: E(x(Xt)),
				onInput: i[0] ||= (e) => n("update", { content: e.target.value })
			}, null, 42, Xa),
			D("p", Za, [P(x(Dt), {
				size: 12,
				class: "tpl:mt-0.5 tpl:shrink-0"
			}), M(" " + _(x(r).html.sanitizationHint), 1)])
		]));
	}
}), $a = { class: "tpl:mb-3.5" }, eo = {
	key: 0,
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-10 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-xs tpl:font-medium tpl:border-[var(--tpl-primary)] tpl:text-[var(--tpl-primary)]",
	style: { "background-color": "color-mix(in srgb, var(--tpl-bg) 90%, transparent)" }
}, to = {
	key: 0,
	class: "tpl:mb-3.5"
}, no = ["value", "placeholder"], ro = { class: "tpl:mb-3.5" }, io = { class: "tpl:block tpl:text-[var(--tpl-text-dim)]" }, ao = { class: "tpl:mb-3.5" }, oo = ["value"], so = { value: "full" }, co = { value: "custom" }, lo = {
	key: 0,
	class: "tpl:mt-2 tpl:flex tpl:items-stretch"
}, uo = ["value"], fo = { class: "tpl:mb-3.5" }, po = { class: "tpl:mb-3.5" }, mo = 350, ho = /* @__PURE__ */ N({
	__name: "ImageToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = d(Fe, null), o = d(Ae, ne.liquid), c = Wt(), l = v(() => !!a), u = m(!1), p = m(!1), { start: h } = Oe(() => {
			u.value = !1;
		}, 1e3, { immediate: !1 }), g = [
			300,
			400,
			500
		], S = v(() => {
			let e = n.block.width;
			return e === "full" ? "full" : g.includes(e) ? String(e) : "custom";
		});
		function w(e, t) {
			r("update", { [e]: t });
		}
		function T(e) {
			if (e === "custom") {
				let e = n.block.width;
				(typeof e != "number" || g.includes(e)) && w("width", mo);
				return;
			}
			w("width", e === "full" ? "full" : Number(e));
		}
		function O(e) {
			let t = Number(e);
			!Number.isFinite(t) || t <= 0 || w("width", t);
		}
		async function k() {
			let e = await a?.({ accept: ["images"] });
			c.alive && e && (w("src", e.url), e.alt && (w("alt", e.alt), p.value = !0), u.value = !0, h());
		}
		let A = m(), N = m(!1), F = v(() => H(n.block.src, o)), I = v(() => l.value && !N.value && !F.value);
		async function ee(e) {
			if (a) {
				N.value = !0;
				try {
					let t = await a({
						accept: ["images"],
						files: e
					});
					if (!c.alive) return;
					t && (w("src", t.url), t.alt && (w("alt", t.alt), p.value = !0), u.value = !0, h());
				} finally {
					c.alive && (N.value = !1);
				}
			}
		}
		let { isOver: L } = me({
			target: A,
			enabled: I,
			onFiles: ee
		});
		return (t, n) => (s(), y(j, null, [
			D("div", $a, [D("label", { class: E(x(q)) }, _(x(i).image.imageUrl), 3), D("div", {
				ref_key: "dropZoneRef",
				ref: A,
				class: "tpl:relative"
			}, [
				I.value && (x(L) || N.value) ? (s(), y("div", eo, [N.value ? (s(), y(j, { key: 0 }, [P(x(St), {
					class: "tpl-spinner",
					size: 18,
					"stroke-width": 2
				}), M(" " + _(x(i).image.uploading), 1)], 64)) : (s(), y(j, { key: 1 }, [P(x(Ft), {
					size: 18,
					"stroke-width": 1.5
				}), M(" " + _(x(i).image.dropToUpload), 1)], 64))])) : b("", !0),
				P($, {
					"model-value": e.block.src,
					type: "url",
					placeholder: x(i).image.imageUrlPlaceholder,
					pulse: u.value,
					"onUpdate:modelValue": n[0] ||= (e) => w("src", e)
				}, null, 8, [
					"model-value",
					"placeholder",
					"pulse"
				]),
				l.value ? (s(), y("button", {
					key: 1,
					class: "tpl:mt-2 tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-primary)",
						"background-color": "var(--tpl-bg)"
					},
					onClick: k
				}, [P(x(Nt), {
					size: 14,
					"stroke-width": 1.5
				}), M(" " + _(x(i).image.browseMedia), 1)])) : b("", !0)
			], 512)]),
			x(H)(e.block.src, x(o)) ? (s(), y("div", to, [D("label", { class: E(x(q)) }, [M(_(x(i).image.placeholderUrl) + " ", 1), n[9] ||= D("span", { class: "tpl:font-normal tpl:text-[var(--tpl-text-dim)]" }, _("(optional)"), -1)], 2), D("input", {
				type: "url",
				class: E(x(K)),
				value: e.block.placeholderUrl || "",
				placeholder: x(i).image.placeholderUrlPlaceholder,
				onInput: n[1] ||= (e) => w("placeholderUrl", e.target.value)
			}, null, 42, no)])) : b("", !0),
			D("div", ro, [
				D("label", { class: E(x(q)) }, _(x(i).image.altText), 3),
				P($, {
					"model-value": e.block.alt,
					type: "text",
					placeholder: x(i).image.altTextPlaceholder,
					pulse: p.value,
					disabled: e.block.decorative === !0,
					"onUpdate:modelValue": n[2] ||= (e) => w("alt", e)
				}, null, 8, [
					"model-value",
					"placeholder",
					"pulse",
					"disabled"
				]),
				P(Z, {
					class: "tpl:mt-2 tpl:text-[12px] tpl:text-[var(--tpl-text-muted)]",
					"model-value": e.block.decorative === !0,
					label: x(i).image.decorative,
					"onUpdate:modelValue": n[3] ||= (e) => w("decorative", e)
				}, {
					default: f(() => [D("span", null, [M(_(x(i).image.decorative) + " ", 1), D("span", io, _(x(i).image.decorativeHint), 1)])]),
					_: 1
				}, 8, ["model-value", "label"])
			]),
			D("div", ao, [
				D("label", { class: E(x(q)) }, _(x(i).image.width), 3),
				D("select", {
					class: E(x(K)),
					value: S.value,
					onChange: n[4] ||= (e) => T(e.target.value)
				}, [
					D("option", so, _(x(i).image.fullWidth), 1),
					n[10] ||= D("option", { value: "300" }, "300px", -1),
					n[11] ||= D("option", { value: "400" }, "400px", -1),
					n[12] ||= D("option", { value: "500" }, "500px", -1),
					D("option", co, _(x(i).image.widthCustom), 1)
				], 42, oo),
				S.value === "custom" ? (s(), y("div", lo, [D("input", {
					type: "number",
					class: E(x(Y)),
					value: typeof e.block.width == "number" ? e.block.width : mo,
					min: "20",
					onInput: n[5] ||= (e) => O(e.target.value)
				}, null, 42, uo), D("span", { class: E(x(J)) }, "px", 2)])) : b("", !0)
			]),
			D("div", fo, [D("label", { class: E(x(q)) }, _(x(i).title.align), 3), P(rn, {
				options: [
					{
						value: "left",
						label: x(i).title.alignLeft
					},
					{
						value: "center",
						label: x(i).title.alignCenter
					},
					{
						value: "right",
						label: x(i).title.alignRight
					}
				],
				"model-value": e.block.align,
				"onUpdate:modelValue": n[6] ||= (e) => w("align", e)
			}, null, 8, ["options", "model-value"])]),
			D("div", po, [
				D("label", { class: E(x(q)) }, _(x(i).image.linkUrl), 3),
				P($, {
					"model-value": e.block.linkUrl || "",
					type: "url",
					placeholder: x(i).image.imageUrlPlaceholder,
					"onUpdate:modelValue": n[7] ||= (e) => w("linkUrl", e)
				}, null, 8, ["model-value", "placeholder"]),
				e.block.linkUrl ? (s(), C(Z, {
					key: 0,
					class: "tpl:mt-2 tpl:text-[12px] tpl:text-[var(--tpl-text-muted)]",
					"model-value": e.block.linkOpenInNewTab ?? !1,
					label: x(i).image.openInNewTab,
					"onUpdate:modelValue": n[8] ||= (e) => w("linkOpenInNewTab", e)
				}, null, 8, ["model-value", "label"])) : b("", !0)
			])
		], 64));
	}
}), go = { class: "tpl:flex tpl:flex-col tpl:gap-2" }, _o = { class: "tpl:flex tpl:items-center tpl:gap-2" }, vo = [
	"value",
	"placeholder",
	"onInput"
], yo = ["title", "onClick"], bo = { class: "tpl:flex tpl:flex-wrap tpl:items-center tpl:gap-x-3 tpl:gap-y-1.5 tpl:text-xs tpl:text-[var(--tpl-text-muted)]" }, xo = { class: "tpl:flex tpl:items-center tpl:gap-2" }, So = ["value"], Co = { value: "" }, wo = ["value"], To = ["value"], Eo = /* @__PURE__ */ N({
	__name: "MenuToolbar",
	props: {
		block: {},
		fontFamilies: {}
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = v(() => [
			{
				key: "openInNewTab",
				label: i.menu.openInNewTab
			},
			{
				key: "bold",
				label: i.menu.bold
			},
			{
				key: "underline",
				label: i.menu.underline
			}
		]), o = v(() => [
			{
				value: "left",
				label: i.title.alignLeft,
				icon: At
			},
			{
				value: "center",
				label: i.title.alignCenter,
				icon: xt
			},
			{
				value: "right",
				label: i.title.alignRight,
				icon: Ot
			}
		]);
		function c(e, t) {
			r("update", { [e]: t });
		}
		function l() {
			let e = {
				id: L(),
				text: "",
				url: "",
				openInNewTab: !1,
				bold: !1,
				underline: !1
			};
			r("update", { items: [...n.block.items, e] });
		}
		function d(e, t, i) {
			let a = n.block.items.map((n) => n.id === e ? {
				...n,
				[t]: i
			} : n);
			r("update", { items: a });
		}
		function p(e) {
			r("update", { items: n.block.items.filter((t) => t.id !== e) });
		}
		return (t, n) => (s(), y(j, null, [
			P(Q, { label: x(i).menu.items }, {
				default: f(() => [D("div", go, [(s(!0), y(j, null, u(e.block.items, (t) => (s(), y("div", {
					key: t.id,
					class: "tpl:flex tpl:flex-col tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:p-2"
				}, [
					D("div", _o, [D("input", {
						type: "text",
						class: E([x(K), "tpl:flex-1"]),
						value: t.text,
						placeholder: x(i).menu.text,
						onInput: (e) => d(t.id, "text", e.target.value)
					}, null, 42, vo), D("button", {
						class: E(x(Yt)),
						title: x(i).menu.removeItem,
						onClick: (e) => p(t.id)
					}, [P(x(Mt), {
						size: 14,
						"stroke-width": 2
					})], 10, yo)]),
					P($, {
						"model-value": t.url,
						type: "url",
						placeholder: x(i).menu.urlPlaceholder,
						"onUpdate:modelValue": (e) => d(t.id, "url", e)
					}, null, 8, [
						"model-value",
						"placeholder",
						"onUpdate:modelValue"
					]),
					D("div", bo, [(s(!0), y(j, null, u(a.value, (e) => (s(), C(Z, {
						key: e.key,
						"model-value": t[e.key],
						label: e.label,
						"onUpdate:modelValue": (n) => d(t.id, e.key, n)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]))), 128))]),
					D("div", xo, [D("label", { class: E([x(q), "tpl:!mb-0"]) }, _(x(i).menu.color), 3), P(X, {
						"swatch-only": "",
						"model-value": t.color || e.block.linkColor || e.block.color || "",
						"onUpdate:modelValue": (e) => d(t.id, "color", e)
					}, null, 8, ["model-value", "onUpdate:modelValue"])])
				]))), 128)), D("button", {
					class: E(x(Qt)),
					onClick: l
				}, [P(x(G), {
					size: 14,
					"stroke-width": 2
				}), M(" " + _(x(i).menu.addItem), 1)], 2)])]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.fontFamily }, {
				default: f(() => [D("select", {
					class: E(x(K)),
					value: e.block.fontFamily || "",
					onChange: n[0] ||= (e) => c("fontFamily", e.target.value || void 0)
				}, [D("option", Co, _(x(i).title.inheritFont), 1), (s(!0), y(j, null, u(e.fontFamilies, (e) => (s(), y("option", {
					key: e.value,
					value: e.value
				}, _(e.label), 9, wo))), 128))], 42, So)]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.fontSize }, {
				default: f(() => [P(an, {
					"model-value": e.block.fontSize,
					min: 8,
					max: 48,
					suffix: "px",
					"onUpdate:modelValue": n[1] ||= (e) => c("fontSize", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.color }, {
				default: f(() => [P(X, {
					"model-value": e.block.color ?? "",
					"onUpdate:modelValue": n[2] ||= (e) => c("color", e || void 0)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.linkColor }, {
				default: f(() => [P(X, {
					"model-value": e.block.linkColor || e.block.color || "",
					"onUpdate:modelValue": n[3] ||= (e) => c("linkColor", e || void 0)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.textAlign }, {
				default: f(() => [P(rn, {
					options: o.value,
					"model-value": e.block.textAlign,
					"onUpdate:modelValue": n[4] ||= (e) => c("textAlign", e)
				}, null, 8, ["options", "model-value"])]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.separator }, {
				default: f(() => [D("input", {
					type: "text",
					class: E(x(K)),
					value: e.block.separator,
					onInput: n[5] ||= (e) => c("separator", e.target.value)
				}, null, 42, To)]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.separatorColor }, {
				default: f(() => [P(X, {
					"model-value": e.block.separatorColor,
					"onUpdate:modelValue": n[6] ||= (e) => c("separatorColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			P(Q, { label: x(i).menu.spacing }, {
				default: f(() => [P(an, {
					"model-value": e.block.spacing,
					min: 0,
					max: 50,
					suffix: "px",
					"onUpdate:modelValue": n[7] ||= (e) => c("spacing", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"])
		], 64));
	}
});
//#endregion
//#region src/utils/rebalanceColumnChildren.ts
function Do(e) {
	return e === "1" ? 1 : e === "3" ? 3 : 2;
}
function Oo(e, t) {
	let n = Do(t);
	if (e.length === n) return e;
	if (e.length < n) {
		let t = Array.from({ length: n - e.length }, () => []);
		return [...e, ...t];
	}
	let r = e.slice(0, n), i = e.slice(n).flat(), a = [...r[n - 1], ...i];
	return [...r.slice(0, n - 1), a];
}
//#endregion
//#region src/components/toolbar/SectionToolbar.vue?vue&type=script&setup=true&lang.ts
var ko = { class: "tpl:mb-3.5" }, Ao = ["value"], jo = ["value"], Mo = {
	key: 0,
	class: "tpl:mb-3.5"
}, No = { class: "tpl:mb-3.5" }, Po = { class: "tpl:flex tpl:items-stretch" }, Fo = ["value"], Io = { class: "tpl:mb-3.5" }, Lo = {
	key: 0,
	class: "tpl:mt-3 tpl:ml-0.5 tpl:space-y-3 tpl:border-l tpl:border-[var(--tpl-border)] tpl:pl-3"
}, Ro = { class: "tpl:flex tpl:items-stretch" }, zo = ["value"], Bo = /* @__PURE__ */ N({
	__name: "SectionToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = v(() => [
			{
				value: "1",
				label: i.section.column1
			},
			{
				value: "2",
				label: i.section.column2
			},
			{
				value: "3",
				label: i.section.column3
			},
			{
				value: "1-2",
				label: i.section.ratio12
			},
			{
				value: "2-1",
				label: i.section.ratio21
			}
		]);
		function o(e) {
			let t = e.target.value, i = Oo(n.block.children, t);
			r("update", {
				columns: t,
				children: i
			});
		}
		function c(e) {
			r("update", { stackOnMobile: e });
		}
		function l(e) {
			let t = Number(e.target.value);
			r("update", { borderRadius: t });
		}
		function d(e) {
			r("update", { wrapper: e ? { padding: {
				top: 20,
				right: 20,
				bottom: 20,
				left: 20
			} } : void 0 });
		}
		function f(e) {
			r("update", { wrapper: {
				...n.block.wrapper,
				...e
			} });
		}
		function p(e) {
			f({ padding: e });
		}
		function m(e) {
			f({ borderRadius: Number(e.target.value) });
		}
		return (t, n) => (s(), y(j, null, [
			D("div", ko, [D("label", { class: E(x(q)) }, _(x(i).section.columns), 3), D("select", {
				class: E(x(K)),
				value: e.block.columns,
				onChange: o
			}, [(s(!0), y(j, null, u(a.value, (e) => (s(), y("option", {
				key: e.value,
				value: e.value
			}, _(e.label), 9, jo))), 128))], 42, Ao)]),
			e.block.columns === "1" ? b("", !0) : (s(), y("div", Mo, [P(Z, {
				class: "tpl:text-xs tpl:text-[var(--tpl-text)]",
				"model-value": e.block.stackOnMobile !== !1,
				label: x(i).section.stackOnMobile,
				"onUpdate:modelValue": n[0] ||= (e) => c(e)
			}, null, 8, ["model-value", "label"])])),
			D("div", No, [D("label", { class: E(x(q)) }, _(x(i).section.borderRadius), 3), D("div", Po, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.borderRadius ?? 0,
				min: "0",
				max: "50",
				onInput: l
			}, null, 42, Fo), D("span", { class: E(x(J)) }, "px", 2)])]),
			D("div", Io, [P(Z, {
				class: "tpl:text-xs tpl:text-[var(--tpl-text)]",
				"model-value": !!e.block.wrapper,
				label: x(i).section.wrapperEnable,
				"onUpdate:modelValue": n[1] ||= (e) => d(e)
			}, null, 8, ["model-value", "label"]), e.block.wrapper ? (s(), y("div", Lo, [
				D("div", null, [D("label", { class: E(x(q)) }, _(x(i).blockSettings.color), 3), P(X, {
					"model-value": e.block.wrapper.backgroundColor ?? "",
					"onUpdate:modelValue": n[2] ||= (e) => f({ backgroundColor: e })
				}, null, 8, ["model-value"])]),
				P(Ri, {
					label: x(i).blockSettings.padding,
					"model-value": e.block.wrapper.padding ?? {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					},
					"onUpdate:modelValue": p
				}, null, 8, ["label", "model-value"]),
				D("div", null, [D("label", { class: E(x(q)) }, _(x(i).section.borderRadius), 3), D("div", Ro, [D("input", {
					type: "number",
					class: E(x(Y)),
					value: e.block.wrapper.borderRadius ?? 0,
					min: "0",
					max: "50",
					onInput: m
				}, null, 42, zo), D("span", { class: E(x(J)) }, "px", 2)])])
			])) : b("", !0)])
		], 64));
	}
}), Vo = { class: "tpl:mb-3.5" }, Ho = { class: "tpl:flex tpl:flex-col tpl:gap-2" }, Uo = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Wo = ["value", "onChange"], Go = ["value"], Ko = ["title", "onClick"], qo = { class: "tpl:mb-3.5" }, Jo = ["value"], Yo = { value: "solid" }, Xo = { value: "outlined" }, Zo = { value: "rounded" }, Qo = { value: "square" }, $o = { value: "circle" }, es = { class: "tpl:mb-3.5" }, ts = { class: "tpl:mb-3.5" }, ns = { class: "tpl:flex tpl:items-stretch" }, rs = ["value"], is = { class: "tpl:mb-3.5" }, as = /* @__PURE__ */ N({
	__name: "SocialToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W();
		function a(e, t) {
			r("update", { [e]: t });
		}
		function o() {
			let e = {
				id: L(),
				platform: "facebook",
				url: ""
			};
			r("update", { icons: [...n.block.icons, e] });
		}
		function c(e, t, i) {
			let a = n.block.icons.map((n) => n.id === e ? {
				...n,
				[t]: i
			} : n);
			r("update", { icons: a });
		}
		function l(e) {
			r("update", { icons: n.block.icons.filter((t) => t.id !== e) });
		}
		return (t, n) => (s(), y(j, null, [
			D("div", Vo, [D("label", { class: E(x(q)) }, _(x(i).social.icons), 3), D("div", Ho, [(s(!0), y(j, null, u(e.block.icons, (e) => (s(), y("div", {
				key: e.id,
				class: "tpl:flex tpl:flex-col tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:p-2"
			}, [D("div", Uo, [D("select", {
				"data-testid": "social-platform-select",
				class: E([x(K), "tpl:flex-1"]),
				value: e.platform,
				onChange: (t) => c(e.id, "platform", t.target.value)
			}, [(s(!0), y(j, null, u(x(Se), (e) => (s(), y("option", {
				key: e,
				value: e
			}, _(x(i).social.platforms[e]), 9, Go))), 128))], 42, Wo), D("button", {
				class: E(x(Yt)),
				title: x(i).social.removeIcon,
				onClick: (t) => l(e.id)
			}, [P(x(Mt), {
				size: 14,
				"stroke-width": 2
			})], 10, Ko)]), P($, {
				"model-value": e.url,
				type: "url",
				placeholder: x(i).social.urlPlaceholder,
				"onUpdate:modelValue": (t) => c(e.id, "url", t)
			}, null, 8, [
				"model-value",
				"placeholder",
				"onUpdate:modelValue"
			])]))), 128)), D("button", {
				class: E(x(Qt)),
				onClick: o
			}, [P(x(G), {
				size: 14,
				"stroke-width": 2
			}), M(" " + _(x(i).social.addIcon), 1)], 2)])]),
			D("div", qo, [D("label", { class: E(x(q)) }, _(x(i).social.style), 3), D("select", {
				class: E(x(K)),
				value: e.block.iconStyle,
				onChange: n[0] ||= (e) => a("iconStyle", e.target.value)
			}, [
				D("option", Yo, _(x(i).social.styleSolid), 1),
				D("option", Xo, _(x(i).social.styleOutlined), 1),
				D("option", Zo, _(x(i).social.styleRounded), 1),
				D("option", Qo, _(x(i).social.styleSquare), 1),
				D("option", $o, _(x(i).social.styleCircle), 1)
			], 42, Jo)]),
			D("div", es, [D("label", { class: E(x(q)) }, _(x(i).social.size), 3), P(rn, {
				options: [
					{
						value: "small",
						label: x(i).social.sizeSmall
					},
					{
						value: "medium",
						label: x(i).social.sizeMedium
					},
					{
						value: "large",
						label: x(i).social.sizeLarge
					}
				],
				"model-value": e.block.iconSize,
				"onUpdate:modelValue": n[1] ||= (e) => a("iconSize", e)
			}, null, 8, ["options", "model-value"])]),
			D("div", ts, [D("label", { class: E(x(q)) }, _(x(i).social.spacing), 3), D("div", ns, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.spacing,
				min: "0",
				max: "50",
				onInput: n[2] ||= (e) => a("spacing", Number(e.target.value))
			}, null, 42, rs), D("span", { class: E(x(J)) }, "px", 2)])]),
			D("div", is, [D("label", { class: E(x(q)) }, _(x(i).social.align), 3), P(rn, {
				options: [
					{
						value: "left",
						label: x(i).title.alignLeft,
						icon: x(At)
					},
					{
						value: "center",
						label: x(i).title.alignCenter,
						icon: x(xt)
					},
					{
						value: "right",
						label: x(i).title.alignRight,
						icon: x(Ot)
					}
				],
				"model-value": e.block.align,
				"onUpdate:modelValue": n[3] ||= (e) => a("align", e)
			}, null, 8, ["options", "model-value"])])
		], 64));
	}
}), os = { class: "tpl:mb-3.5" }, ss = { class: "tpl:flex tpl:items-stretch" }, cs = ["value"], ls = ["value"], us = /* @__PURE__ */ N({
	__name: "SpacerToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), y("div", os, [
			D("label", { class: E(x(q)) }, _(x(r).spacer.height), 3),
			D("div", ss, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.height,
				min: "10",
				max: "100",
				onInput: i[0] ||= (e) => n("update", { height: Number(e.target.value) })
			}, null, 42, cs), D("span", { class: E(x(J)) }, "px", 2)]),
			D("input", {
				type: "range",
				class: "tpl:mt-2 tpl:w-full tpl:accent-[var(--tpl-primary)]",
				value: e.block.height,
				min: "10",
				max: "100",
				onInput: i[1] ||= (e) => n("update", { height: Number(e.target.value) })
			}, null, 40, ls)
		]));
	}
}), ds = { class: "tpl:mb-3.5" }, fs = { class: "tpl:flex tpl:items-center tpl:gap-3" }, ps = { class: "tpl:flex tpl:flex-1 tpl:items-center tpl:gap-1.5" }, ms = { class: "tpl:text-xs tpl:text-[var(--tpl-text-muted)]" }, hs = { class: "tpl:flex tpl:items-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)]" }, gs = ["disabled"], _s = { class: "tpl:min-w-[20px] tpl:text-center tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]" }, vs = { class: "tpl:flex tpl:flex-1 tpl:items-center tpl:gap-1.5" }, ys = { class: "tpl:text-xs tpl:text-[var(--tpl-text-muted)]" }, bs = { class: "tpl:flex tpl:items-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)]" }, xs = ["disabled"], Ss = { class: "tpl:min-w-[20px] tpl:text-center tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]" }, Cs = { class: "tpl:mb-3.5" }, ws = {
	key: 0,
	class: "tpl:mb-3.5"
}, Ts = { class: "tpl:mb-3.5" }, Es = { class: "tpl:mb-3.5" }, Ds = { class: "tpl:flex tpl:items-stretch" }, Os = ["value"], ks = { class: "tpl:mb-3.5" }, As = { class: "tpl:flex tpl:items-stretch" }, js = ["value"], Ms = { class: "tpl:mb-3.5" }, Ns = ["value"], Ps = { value: "" }, Fs = ["value"], Is = { class: "tpl:mb-3.5" }, Ls = { class: "tpl:flex tpl:items-stretch" }, Rs = ["value"], zs = { class: "tpl:mb-3.5" }, Bs = { class: "tpl:mb-3.5" }, Vs = /* @__PURE__ */ N({
	__name: "TableToolbar",
	props: {
		block: {},
		fontFamilies: {}
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = v(() => n.block.rows.length > 0 ? n.block.rows[0].cells.length : 0);
		function o(e, t) {
			r("update", { [e]: t });
		}
		function c() {
			let e = n.block.rows.length > 0 ? n.block.rows[0].cells.length : 3, t = {
				id: L(),
				cells: Array.from({ length: e }, () => ({
					id: L(),
					content: ""
				}))
			};
			r("update", { rows: [...n.block.rows, t] });
		}
		function l(e) {
			r("update", { rows: n.block.rows.filter((t) => t.id !== e) });
		}
		function d() {
			let e = n.block.rows.map((e) => ({
				...e,
				cells: [...e.cells, {
					id: L(),
					content: ""
				}]
			}));
			r("update", { rows: e });
		}
		function f(e) {
			let t = n.block.rows.map((t) => ({
				...t,
				cells: t.cells.filter((t, n) => n !== e)
			}));
			r("update", { rows: t });
		}
		return (t, n) => (s(), y(j, null, [
			D("div", ds, [D("label", { class: E(x(q)) }, _(x(i).table.dimensions), 3), D("div", fs, [D("div", ps, [D("span", ms, _(x(i).table.rows), 1), D("div", hs, [
				D("button", {
					class: "tpl:flex tpl:items-center tpl:justify-center tpl:px-1.5 tpl:py-1 tpl:text-[var(--tpl-text-muted)] tpl:transition-colors tpl:duration-150 tpl:hover:text-[var(--tpl-primary)] tpl:disabled:opacity-30",
					disabled: e.block.rows.length <= 1,
					onClick: n[0] ||= (t) => l(e.block.rows[e.block.rows.length - 1].id)
				}, [P(x(It), {
					size: 12,
					"stroke-width": 2
				})], 8, gs),
				D("span", _s, _(e.block.rows.length), 1),
				D("button", {
					class: "tpl:flex tpl:items-center tpl:justify-center tpl:px-1.5 tpl:py-1 tpl:text-[var(--tpl-text-muted)] tpl:transition-colors tpl:duration-150 tpl:hover:text-[var(--tpl-primary)]",
					onClick: c
				}, [P(x(G), {
					size: 12,
					"stroke-width": 2
				})])
			])]), D("div", vs, [D("span", ys, _(x(i).table.columns), 1), D("div", bs, [
				D("button", {
					class: "tpl:flex tpl:items-center tpl:justify-center tpl:px-1.5 tpl:py-1 tpl:text-[var(--tpl-text-muted)] tpl:transition-colors tpl:duration-150 tpl:hover:text-[var(--tpl-primary)] tpl:disabled:opacity-30",
					disabled: a.value <= 1,
					onClick: n[1] ||= (e) => f(a.value - 1)
				}, [P(x(It), {
					size: 12,
					"stroke-width": 2
				})], 8, xs),
				D("span", Ss, _(a.value), 1),
				D("button", {
					class: "tpl:flex tpl:items-center tpl:justify-center tpl:px-1.5 tpl:py-1 tpl:text-[var(--tpl-text-muted)] tpl:transition-colors tpl:duration-150 tpl:hover:text-[var(--tpl-primary)]",
					onClick: d
				}, [P(x(G), {
					size: 12,
					"stroke-width": 2
				})])
			])])])]),
			D("div", Cs, [P(Z, {
				class: "tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
				"model-value": e.block.hasHeaderRow,
				label: x(i).table.hasHeaderRow,
				"onUpdate:modelValue": n[2] ||= (e) => o("hasHeaderRow", e)
			}, null, 8, ["model-value", "label"])]),
			e.block.hasHeaderRow ? (s(), y("div", ws, [D("label", { class: E(x(q)) }, _(x(i).table.headerBackgroundColor), 3), P(X, {
				"model-value": e.block.headerBackgroundColor ?? "",
				"seed-color": x(Zt),
				placeholder: x(i).table.noHeaderBg,
				"onUpdate:modelValue": n[3] ||= (e) => o("headerBackgroundColor", e || null)
			}, null, 8, [
				"model-value",
				"seed-color",
				"placeholder"
			])])) : b("", !0),
			D("div", Ts, [D("label", { class: E(x(q)) }, _(x(i).table.borderColor), 3), P(X, {
				"model-value": e.block.borderColor,
				"onUpdate:modelValue": n[4] ||= (e) => o("borderColor", e)
			}, null, 8, ["model-value"])]),
			D("div", Es, [D("label", { class: E(x(q)) }, _(x(i).table.borderWidth), 3), D("div", Ds, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.borderWidth,
				min: "0",
				max: "10",
				onInput: n[5] ||= (e) => o("borderWidth", Number(e.target.value))
			}, null, 42, Os), D("span", { class: E(x(J)) }, "px", 2)])]),
			D("div", ks, [D("label", { class: E(x(q)) }, _(x(i).table.cellPadding), 3), D("div", As, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.cellPadding,
				min: "0",
				max: "30",
				onInput: n[6] ||= (e) => o("cellPadding", Number(e.target.value))
			}, null, 42, js), D("span", { class: E(x(J)) }, "px", 2)])]),
			D("div", Ms, [D("label", { class: E(x(q)) }, _(x(i).table.fontFamily), 3), D("select", {
				class: E(x(K)),
				value: e.block.fontFamily || "",
				onChange: n[7] ||= (e) => o("fontFamily", e.target.value || void 0)
			}, [D("option", Ps, _(x(i).title.inheritFont), 1), (s(!0), y(j, null, u(e.fontFamilies, (e) => (s(), y("option", {
				key: e.value,
				value: e.value
			}, _(e.label), 9, Fs))), 128))], 42, Ns)]),
			D("div", Is, [D("label", { class: E(x(q)) }, _(x(i).table.fontSize), 3), D("div", Ls, [D("input", {
				type: "number",
				class: E(x(Y)),
				value: e.block.fontSize,
				min: "10",
				max: "32",
				onInput: n[8] ||= (e) => o("fontSize", Number(e.target.value))
			}, null, 42, Rs), D("span", { class: E(x(J)) }, "px", 2)])]),
			D("div", zs, [D("label", { class: E(x(q)) }, _(x(i).table.color), 3), P(X, {
				"model-value": e.block.color ?? "",
				"onUpdate:modelValue": n[9] ||= (e) => o("color", e || void 0)
			}, null, 8, ["model-value"])]),
			D("div", Bs, [D("label", { class: E(x(q)) }, _(x(i).table.textAlign), 3), P(rn, {
				options: [
					{
						value: "left",
						label: x(i).title.alignLeft,
						icon: x(At)
					},
					{
						value: "center",
						label: x(i).title.alignCenter,
						icon: x(xt)
					},
					{
						value: "right",
						label: x(i).title.alignRight,
						icon: x(Ot)
					}
				],
				"model-value": e.block.textAlign,
				"onUpdate:modelValue": n[10] ||= (e) => o("textAlign", e)
			}, null, 8, ["options", "model-value"])])
		], 64));
	}
}), Hs = { class: "tpl:mb-3.5" }, Us = ["value"], Ws = { value: 1 }, Gs = { value: 2 }, Ks = { value: 3 }, qs = { value: 4 }, Js = { class: "tpl:mb-3.5" }, Ys = ["value"], Xs = { value: "" }, Zs = ["value"], Qs = { class: "tpl:mb-3.5" }, $s = { class: "tpl:mb-3.5" }, ec = /* @__PURE__ */ N({
	__name: "TitleToolbar",
	props: {
		block: {},
		fontFamilies: {}
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		function i(e, t) {
			n("update", { [e]: t });
		}
		return (t, n) => (s(), y(j, null, [
			D("div", Hs, [D("label", { class: E(x(q)) }, _(x(r).title.level), 3), D("select", {
				class: E(x(K)),
				value: e.block.level,
				onChange: n[0] ||= (e) => i("level", Number(e.target.value))
			}, [
				D("option", Ws, _(x(r).title.heading1), 1),
				D("option", Gs, _(x(r).title.heading2), 1),
				D("option", Ks, _(x(r).title.heading3), 1),
				D("option", qs, _(x(r).title.heading4), 1)
			], 42, Us)]),
			D("div", Js, [D("label", { class: E(x(q)) }, _(x(r).title.fontFamily), 3), D("select", {
				class: E(x(K)),
				value: e.block.fontFamily || "",
				onChange: n[1] ||= (e) => i("fontFamily", e.target.value || void 0)
			}, [D("option", Xs, _(x(r).title.inheritFont), 1), (s(!0), y(j, null, u(e.fontFamilies, (e) => (s(), y("option", {
				key: e.value,
				value: e.value
			}, _(e.label), 9, Zs))), 128))], 42, Ys)]),
			D("div", Qs, [D("label", { class: E(x(q)) }, _(x(r).title.color), 3), P(X, {
				"model-value": e.block.color ?? "",
				"onUpdate:modelValue": n[2] ||= (e) => i("color", e || void 0)
			}, null, 8, ["model-value"])]),
			D("div", $s, [D("label", { class: E(x(q)) }, _(x(r).title.align), 3), P(rn, {
				options: [
					{
						value: "left",
						label: x(r).title.alignLeft,
						icon: x(At)
					},
					{
						value: "center",
						label: x(r).title.alignCenter,
						icon: x(xt)
					},
					{
						value: "right",
						label: x(r).title.alignRight,
						icon: x(Ot)
					}
				],
				"model-value": e.block.textAlign,
				"onUpdate:modelValue": n[3] ||= (e) => i("textAlign", e)
			}, null, 8, ["options", "model-value"])])
		], 64));
	}
}), tc = { class: "tpl:mb-3.5" }, nc = {
	key: 0,
	class: "tpl:mb-3.5"
}, rc = { class: "tpl:font-normal tpl:text-[var(--tpl-text-dim)]" }, ic = [
	"value",
	"placeholder",
	"title"
], ac = { class: "tpl:mb-3.5" }, oc = { class: "tpl:font-normal tpl:text-[var(--tpl-text-dim)]" }, sc = { class: "tpl:mb-3.5" }, cc = { class: "tpl:mb-3.5" }, lc = ["value"], uc = { value: "full" }, dc = { class: "tpl:mb-3.5" }, fc = /* @__PURE__ */ N({
	__name: "VideoToolbar",
	props: { block: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = W(), a = d(Fe, null), o = d(Ae, ne.liquid), c = Wt(), l = v(() => !!a), u = v(() => H(n.block.url, o)), f = m(!1), { start: p } = Oe(() => {
			f.value = !1;
		}, 1e3, { immediate: !1 });
		function h(e, t) {
			r("update", { [e]: t });
		}
		async function g() {
			let e = await a?.({ accept: ["images"] });
			c.alive && e && (h("thumbnailUrl", e.url), f.value = !0, p());
		}
		return (t, n) => (s(), y(j, null, [
			D("div", tc, [
				D("label", { class: E(x(q)) }, _(x(i).video.videoUrl), 3),
				P($, {
					"model-value": e.block.url,
					type: "url",
					placeholder: x(i).video.videoUrlPlaceholder,
					"onUpdate:modelValue": n[0] ||= (e) => h("url", e)
				}, null, 8, ["model-value", "placeholder"]),
				e.block.url ? (s(), C(Z, {
					key: 0,
					class: "tpl:mt-2 tpl:text-[12px] tpl:text-[var(--tpl-text-muted)]",
					"model-value": e.block.openInNewTab ?? !1,
					label: x(i).video.openInNewTab,
					"onUpdate:modelValue": n[1] ||= (e) => h("openInNewTab", e)
				}, null, 8, ["model-value", "label"])) : b("", !0)
			]),
			u.value ? (s(), y("div", nc, [D("label", { class: E(x(q)) }, [M(_(x(i).video.placeholderUrl) + " ", 1), D("span", rc, _(x(i).video.optional), 1)], 2), D("input", {
				type: "url",
				class: E(x(K)),
				value: e.block.placeholderUrl || "",
				placeholder: x(i).video.placeholderUrlPlaceholder,
				title: x(i).video.placeholderUrlTooltip,
				onInput: n[2] ||= (e) => h("placeholderUrl", e.target.value)
			}, null, 42, ic)])) : b("", !0),
			D("div", ac, [
				D("label", { class: E(x(q)) }, [M(_(x(i).video.customThumbnail) + " ", 1), D("span", oc, _(x(i).video.optional), 1)], 2),
				P($, {
					"model-value": e.block.thumbnailUrl,
					type: "url",
					placeholder: x(i).video.thumbnailPlaceholder,
					pulse: f.value,
					"onUpdate:modelValue": n[3] ||= (e) => h("thumbnailUrl", e)
				}, null, 8, [
					"model-value",
					"placeholder",
					"pulse"
				]),
				l.value ? (s(), y("button", {
					key: 0,
					class: "tpl:mt-2 tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-primary)",
						"background-color": "var(--tpl-bg)"
					},
					onClick: g
				}, [P(x(Nt), {
					size: 14,
					"stroke-width": 1.5
				}), M(" " + _(x(i).image.browseMedia), 1)])) : b("", !0)
			]),
			D("div", sc, [D("label", { class: E(x(q)) }, _(x(i).video.altText), 3), P($, {
				"model-value": e.block.alt,
				type: "text",
				placeholder: x(i).video.altTextPlaceholder,
				"onUpdate:modelValue": n[4] ||= (e) => h("alt", e)
			}, null, 8, ["model-value", "placeholder"])]),
			D("div", cc, [D("label", { class: E(x(q)) }, _(x(i).video.width), 3), D("select", {
				class: E(x(K)),
				value: e.block.width,
				onChange: n[5] ||= (e) => h("width", e.target.value === "full" ? "full" : Number(e.target.value))
			}, [
				D("option", uc, _(x(i).video.fullWidth), 1),
				n[7] ||= D("option", { value: "300" }, "300px", -1),
				n[8] ||= D("option", { value: "400" }, "400px", -1),
				n[9] ||= D("option", { value: "500" }, "500px", -1)
			], 42, lc)]),
			D("div", dc, [D("label", { class: E(x(q)) }, _(x(i).title.align), 3), P(rn, {
				options: [
					{
						value: "left",
						label: x(i).title.alignLeft
					},
					{
						value: "center",
						label: x(i).title.alignCenter
					},
					{
						value: "right",
						label: x(i).title.alignRight
					}
				],
				"model-value": e.block.align,
				"onUpdate:modelValue": n[6] ||= (e) => h("align", e)
			}, null, 8, ["options", "model-value"])])
		], 64));
	}
}), pc = ["aria-label"], mc = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3.5" }, hc = { class: "tpl:flex tpl:items-center tpl:gap-2 tpl:text-[var(--tpl-primary)]" }, gc = { class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, _c = { class: "tpl:flex tpl:gap-1" }, vc = ["title"], yc = ["title"], bc = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4" }, xc = /*#__PURE__*/ Vt(/* @__PURE__ */ N({
	__name: "Toolbar",
	props: { block: {} },
	emits: [
		"update",
		"delete",
		"duplicate"
	],
	setup(e, { emit: t }) {
		let n = h(() => import("./CountdownToolbar-BNgTBQGB.js")), r = e, i = t, { t: a } = W(), c = Me(tt, "Toolbar"), l = d(Ze, []), u = v(() => r.block.type), f = v(() => I(r.block)), p = v(() => {
			if (f.value) return l.find((e) => e.type === r.block.customType);
		}), m = v(() => f.value ? p.value?.name ?? r.block.customType : se(u.value, a)), g = c.fonts;
		function S(e) {
			i("update", e);
		}
		return (t, r) => (s(), y("aside", {
			"aria-label": x(a).landmarks.blockToolbar,
			class: "tpl:flex tpl:w-full tpl:flex-1 tpl:flex-col tpl:bg-[var(--tpl-bg-elevated)]"
		}, [D("div", mc, [D("div", hc, [x(Jt)[u.value] ? (s(), C(o(x(Jt)[u.value]), {
			key: 0,
			size: 16,
			"stroke-width": 1.5
		})) : f.value ? (s(), C(x(ht), {
			key: 1,
			size: 16,
			"stroke-width": 1.5
		})) : b("", !0), D("h3", gc, _(m.value), 1)]), D("div", _c, [D("button", {
			class: "tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)] tpl:hover:text-[var(--tpl-text)]",
			title: x(a).toolbar.duplicate,
			onClick: r[0] ||= (e) => i("duplicate")
		}, [P(x(ct), {
			size: 14,
			"stroke-width": 2
		})], 8, vc), D("button", {
			class: "tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-danger)] tpl:hover:bg-[var(--tpl-danger-light)] tpl:hover:text-[var(--tpl-danger)]",
			title: x(a).toolbar.delete,
			onClick: r[1] ||= (e) => i("delete")
		}, [P(x(Tt), {
			size: 14,
			"stroke-width": 2
		})], 8, yc)])]), D("div", bc, [f.value ? (s(), C(Ha, {
			key: 0,
			block: e.block,
			onUpdateFieldValues: r[2] ||= (e) => i("update", { fieldValues: e }),
			onUpdateDataSourceFetched: r[3] ||= (e) => i("update", { dataSourceFetched: e })
		}, null, 8, ["block"])) : u.value === "section" ? (s(), C(Bo, {
			key: 1,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "title" ? (s(), C(ec, {
			key: 2,
			block: e.block,
			"font-families": x(g),
			onUpdate: S
		}, null, 8, ["block", "font-families"])) : u.value === "paragraph" ? (s(), y(j, { key: 3 }, [], 64)) : u.value === "image" ? (s(), C(ho, {
			key: 4,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "video" ? (s(), C(fc, {
			key: 5,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "button" ? (s(), C(mi, {
			key: 6,
			block: e.block,
			"font-families": x(g),
			onUpdate: S
		}, null, 8, ["block", "font-families"])) : u.value === "divider" ? (s(), C(Ja, {
			key: 7,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "social" ? (s(), C(as, {
			key: 8,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "menu" ? (s(), C(Eo, {
			key: 9,
			block: e.block,
			"font-families": x(g),
			onUpdate: S
		}, null, 8, ["block", "font-families"])) : u.value === "table" ? (s(), C(Vs, {
			key: 10,
			block: e.block,
			"font-families": x(g),
			onUpdate: S
		}, null, 8, ["block", "font-families"])) : u.value === "spacer" ? (s(), C(us, {
			key: 11,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "html" ? (s(), C(Qa, {
			key: 12,
			block: e.block,
			onUpdate: S
		}, null, 8, ["block"])) : u.value === "countdown" ? (s(), C(x(n), {
			key: 13,
			block: e.block,
			"font-families": x(g),
			onUpdate: S
		}, null, 8, ["block", "font-families"])) : b("", !0), P(oa, {
			block: e.block,
			"is-first-section": u.value === "paragraph",
			onUpdate: S
		}, null, 8, ["block", "is-first-section"])])], 8, pc));
	}
}), [["__scopeId", "data-v-2ac88283"]]), Sc = ["aria-label"], Cc = {
	role: "tablist",
	class: "tpl:relative tpl:flex tpl:gap-1 tpl:border-b tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-active)] tpl:p-1.5"
}, wc = [
	"aria-selected",
	"aria-label",
	"title"
], Tc = { key: 0 }, Ec = [
	"aria-selected",
	"aria-label",
	"title"
], Dc = { key: 0 }, Oc = [
	"aria-selected",
	"aria-label",
	"title"
], kc = { key: 0 }, Ac = {
	key: 1,
	class: "tpl:ml-1 tpl:rounded-full tpl:bg-[var(--tpl-bg-hover)] tpl:px-1.5 tpl:text-[10px]"
}, jc = {
	key: 0,
	id: "tpl-tabpanel-content",
	role: "tabpanel",
	"aria-labelledby": "tpl-tab-content",
	class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:overflow-y-auto"
}, Mc = {
	key: 1,
	class: "tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:px-6 tpl:py-10 tpl:text-center tpl:text-[var(--tpl-text-muted)]"
}, Nc = { class: "tpl:mb-4 tpl:text-[var(--tpl-text-dim)]" }, Pc = { class: "tpl:m-0 tpl:mb-2 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Fc = { class: "tpl:m-0 tpl:text-sm tpl:leading-normal" }, Ic = {
	key: 1,
	id: "tpl-tabpanel-settings",
	role: "tabpanel",
	"aria-labelledby": "tpl-tab-settings",
	class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:overflow-y-auto"
}, Lc = {
	key: 2,
	id: "tpl-tabpanel-issues",
	role: "tabpanel",
	"aria-labelledby": "tpl-tab-issues",
	class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:overflow-y-auto"
}, Rc = /* @__PURE__ */ N({
	__name: "RightSidebar",
	props: {
		selectedBlock: {},
		settings: {},
		shiftedLeft: { type: Boolean }
	},
	emits: [
		"update-block",
		"delete-block",
		"duplicate-block",
		"update-settings"
	],
	setup(e, { emit: t }) {
		let n = h(() => import("./IssuesPanel-CjiZ8cLW.js")), r = e, i = t, { t: a } = W(), o = m("content"), c = d(je, null), l = v(() => c !== null), u = v(() => c?.issues.value.length ?? 0);
		function f(e) {
			return o.value === e ? "tpl:flex-1 tpl:text-[var(--tpl-primary)]" : "tpl:shrink-0 tpl:text-[var(--tpl-text-muted)] hover:tpl:text-[var(--tpl-text)]";
		}
		function p(e) {
			return o.value === e ? {
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow-md)"
			} : { backgroundColor: "transparent" };
		}
		return F(() => r.selectedBlock, (e) => {
			e && (o.value = "content");
		}), (t, r) => (s(), y("aside", {
			"aria-label": x(a).landmarks.rightSidebar,
			class: E(["tpl-right-sidebar tpl:absolute tpl:top-14 tpl:bottom-0 tpl:z-40 tpl:flex tpl:w-[320px] tpl:flex-col tpl:bg-[var(--tpl-bg-elevated)] tpl:transition-all tpl:duration-200 tpl:border-l tpl:border-[var(--tpl-border)]", e.shiftedLeft ? "tpl:right-[360px]" : "tpl:right-0"])
		}, [
			D("div", Cc, [
				D("button", {
					id: "tpl-tab-content",
					role: "tab",
					"aria-selected": o.value === "content",
					"aria-controls": "tpl-tabpanel-content",
					"aria-label": x(a).sidebar.content,
					title: x(a).sidebar.content,
					class: E(["tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]", f("content")]),
					style: k(p("content")),
					onClick: r[0] ||= (e) => o.value = "content"
				}, [P(x(dt), {
					size: 14,
					"stroke-width": 2
				}), o.value === "content" ? (s(), y("span", Tc, _(x(a).sidebar.content), 1)) : b("", !0)], 14, wc),
				D("button", {
					id: "tpl-tab-settings",
					role: "tab",
					"aria-selected": o.value === "settings",
					"aria-controls": "tpl-tabpanel-settings",
					"aria-label": x(a).sidebar.settings,
					title: x(a).sidebar.settings,
					class: E(["tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]", f("settings")]),
					style: k(p("settings")),
					onClick: r[1] ||= (e) => o.value = "settings"
				}, [P(x(ft), {
					size: 14,
					"stroke-width": 1.5
				}), o.value === "settings" ? (s(), y("span", Dc, _(x(a).sidebar.settings), 1)) : b("", !0)], 14, Ec),
				l.value ? (s(), y("button", {
					key: 0,
					id: "tpl-tab-issues",
					role: "tab",
					"aria-selected": o.value === "issues",
					"aria-controls": "tpl-tabpanel-issues",
					"aria-label": x(a).issues.panelTabLabel,
					title: x(a).issues.panelTabLabel,
					class: E(["tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]", f("issues")]),
					style: k(p("issues")),
					onClick: r[2] ||= (e) => o.value = "issues"
				}, [
					P(x(wt), {
						size: 14,
						"stroke-width": 1.5
					}),
					o.value === "issues" ? (s(), y("span", kc, _(x(a).issues.panelTabLabel), 1)) : b("", !0),
					u.value > 0 ? (s(), y("span", Ac, _(u.value), 1)) : b("", !0)
				], 14, Oc)) : b("", !0)
			]),
			o.value === "content" ? (s(), y("div", jc, [e.selectedBlock ? (s(), C(xc, {
				key: 0,
				block: e.selectedBlock,
				onUpdate: r[3] ||= (e) => i("update-block", e),
				onDelete: r[4] ||= (e) => i("delete-block"),
				onDuplicate: r[5] ||= (e) => i("duplicate-block")
			}, null, 8, ["block"])) : (s(), y("div", Mc, [
				D("div", Nc, [P(x(Lt), {
					size: 40,
					"stroke-width": 1.5
				})]),
				D("h3", Pc, _(x(a).sidebar.noSelection), 1),
				D("p", Fc, _(x(a).sidebar.noSelectionHint), 1)
			]))])) : b("", !0),
			o.value === "settings" ? (s(), y("div", Ic, [P(Rr, {
				settings: e.settings,
				onUpdate: r[6] ||= (e) => i("update-settings", e)
			}, null, 8, ["settings"])])) : b("", !0),
			o.value === "issues" && l.value ? (s(), y("div", Lc, [P(x(n))])) : b("", !0)
		], 10, Sc));
	}
}), zc = {
	class: "tpl-small-screen-notice tpl:absolute tpl:inset-0 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-4 tpl:px-6 tpl:py-10 tpl:text-center tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text-muted)]",
	style: { "z-index": "10001" },
	role: "status",
	"data-testid": "small-screen-notice"
}, Bc = { class: "tpl:text-[var(--tpl-text-dim)]" }, Vc = { class: "tpl:m-0 tpl:text-base tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Hc = { class: "tpl:m-0 tpl:max-w-sm tpl:text-sm tpl:leading-normal" }, Uc = /* @__PURE__ */ N({
	__name: "SmallScreenNotice",
	setup(e) {
		let { t } = W();
		return (e, n) => (s(), y("div", zc, [
			D("div", Bc, [P(x(Et), {
				size: 48,
				"stroke-width": 1.5
			})]),
			D("h2", Vc, _(x(t).smallScreen.title), 1),
			D("p", Hc, _(x(t).smallScreen.message), 1)
		]));
	}
}), Wc = [
	"aria-label",
	"title",
	"aria-pressed"
], Gc = /*#__PURE__*/ Vt(/* @__PURE__ */ N({
	__name: "PreviewToggle",
	props: { previewMode: { type: Boolean } },
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), y("button", {
			class: "tpl-preview-toggle tpl:relative tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:p-2 tpl:transition-all tpl:duration-150",
			style: k({
				color: e.previewMode ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				backgroundColor: e.previewMode ? "var(--tpl-primary-light)" : "transparent"
			}),
			"aria-label": e.previewMode ? x(r).previewMode.disable : x(r).previewMode.enable,
			title: e.previewMode ? x(r).previewMode.disable : x(r).previewMode.enable,
			"aria-pressed": e.previewMode,
			onClick: i[0] ||= (t) => n("change", !e.previewMode)
		}, [P(w, {
			"enter-active-class": "tpl-icon-enter-active",
			"leave-active-class": "tpl-icon-leave-active",
			"enter-from-class": "tpl-icon-enter-from",
			"leave-to-class": "tpl-icon-leave-to",
			mode: "out-in"
		}, {
			default: f(() => [e.previewMode ? (s(), C(x(Bt), {
				key: "eye",
				size: 18,
				"stroke-width": 1.5
			})) : (s(), C(x(yt), {
				key: "eye-off",
				size: 18,
				"stroke-width": 1.5
			}))]),
			_: 1
		})], 12, Wc));
	}
}), [["__scopeId", "data-v-af87d02a"]]), Kc = [
	"aria-label",
	"title",
	"aria-pressed"
], qc = /*#__PURE__*/ Vt(/* @__PURE__ */ N({
	__name: "DarkModeToggle",
	props: { darkMode: { type: Boolean } },
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = W();
		return (t, i) => (s(), y("button", {
			class: "tpl-dark-mode-toggle tpl:relative tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:p-2 tpl:transition-all tpl:duration-150",
			style: k({
				color: e.darkMode ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				backgroundColor: e.darkMode ? "var(--tpl-primary-light)" : "transparent"
			}),
			"aria-label": e.darkMode ? x(r).darkMode.disable : x(r).darkMode.enable,
			title: e.darkMode ? x(r).darkMode.disable : x(r).darkMode.enable,
			"aria-pressed": e.darkMode,
			onClick: i[0] ||= (t) => n("change", !e.darkMode)
		}, [P(w, {
			"enter-active-class": "tpl-icon-enter-active",
			"leave-active-class": "tpl-icon-leave-active",
			"enter-from-class": "tpl-icon-enter-from",
			"leave-to-class": "tpl-icon-leave-to",
			mode: "out-in"
		}, {
			default: f(() => [e.darkMode ? (s(), C(x(it), {
				key: "moon",
				size: 18,
				"stroke-width": 1.5
			})) : (s(), C(x(Ct), {
				key: "sun",
				size: 18,
				"stroke-width": 1.5
			}))]),
			_: 1
		})], 12, Kc));
	}
}), [["__scopeId", "data-v-f8694f76"]]), Jc = {
	class: "tpl:pointer-events-auto tpl:flex tpl:items-center tpl:gap-1.5 tpl:rounded-tl-lg tpl:p-1",
	style: {
		"background-color": "color-mix(\n          in srgb,\n          var(--tpl-canvas-bg) 85%,\n          transparent\n        )",
		"backdrop-filter": "blur(8px)",
		"-webkit-backdrop-filter": "blur(8px)"
	}
}, Yc = {
	href: "https://github.com/templatical/sdk",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "tpl:transition-colors tpl:duration-150 hover:tpl:opacity-80 tpl:text-[var(--tpl-text-dim)]",
	style: { "text-decoration": "none" }
}, Xc = /* @__PURE__ */ N({
	__name: "EditorFooter",
	props: { positionClass: {} },
	setup(e) {
		let { t } = W();
		return (n, r) => (s(), y("footer", { class: E(["tpl:pointer-events-none tpl:absolute tpl:bottom-0 tpl:z-50 tpl:flex tpl:h-8 tpl:items-center tpl:justify-end tpl:pr-4 tpl:text-[9px] tpl:opacity-90 tpl:transition-all tpl:duration-300 tpl:text-[var(--tpl-text-dim)]", e.positionClass]) }, [D("div", Jc, [
			D("span", null, _(x(t).footer.poweredBy), 1),
			r[0] ||= D("a", {
				href: "https://templatical.com",
				target: "_blank",
				rel: "noopener noreferrer",
				class: "tpl:inline-flex tpl:items-center tpl:gap-1 tpl:font-medium tpl:transition-colors tpl:duration-150 hover:tpl:opacity-80 tpl:text-[var(--tpl-text-muted)]",
				style: { "text-decoration": "none" }
			}, [D("img", {
				width: "14",
				height: "14",
				src: "https://templatical.com/logo.svg",
				alt: ""
			}), M(" Templatical ")], -1),
			r[1] ||= D("span", { class: "tpl:text-[var(--tpl-border)]" }, "·", -1),
			D("a", Yc, _(x(t).footer.openSource), 1)
		])], 2));
	}
}), Zc = ["aria-labelledby", "data-tpl-theme"], Qc = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:gap-3 tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-3 tpl:py-2.5" }, $c = ["id"], el = ["aria-label"], tl = { class: "tpl:relative tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-3 tpl:py-2.5" }, nl = [
	"id",
	"placeholder",
	"aria-label",
	"aria-activedescendant"
], rl = {
	key: 0,
	class: "tpl:flex tpl:gap-1.5 tpl:overflow-x-auto tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-3 tpl:py-2",
	"data-testid": "merge-tag-picker-group-pills"
}, il = ["data-group-name", "onClick"], al = ["aria-label"], ol = {
	key: 0,
	class: "tpl:px-3 tpl:py-6 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]",
	"data-testid": "merge-tag-picker-empty"
}, sl = {
	key: 1,
	class: "tpl:px-3 tpl:py-6 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]",
	"data-testid": "merge-tag-picker-empty"
}, cl = [
	"aria-expanded",
	"data-group-name",
	"data-group-collapsed",
	"onClick"
], ll = { class: "tpl:ml-1 tpl:font-normal" }, ul = [
	"id",
	"aria-selected",
	"data-selected",
	"data-merge-tag-index",
	"data-merge-tag-value",
	"title",
	"onMousemove",
	"onClick"
], dl = { class: "tpl:text-sm tpl:font-medium" }, fl = { class: "tpl:line-clamp-2 tpl:font-mono tpl:text-xs tpl:text-ellipsis tpl:break-all tpl:text-[var(--tpl-text-dim)]" }, pl = {
	key: 0,
	class: "tpl:line-clamp-2 tpl:text-xs tpl:text-ellipsis tpl:text-[var(--tpl-text-dim)]"
}, ml = {
	key: 1,
	"data-testid": "merge-tag-picker-sample",
	class: "tpl:line-clamp-1 tpl:text-xs tpl:text-ellipsis tpl:text-[var(--tpl-text-dim)]"
}, hl = "tpl-merge-tag-picker-list", gl = /* @__PURE__ */ N({
	__name: "MergeTagPickerModal",
	setup(e) {
		let t = Me(Ie, "MergeTagPickerModal"), { t: n, format: i } = W(), a = d(Ve, null), o = d(Be, null), c = m(""), p = ke(c, 200), h = m(null), w = v(() => p.value.trim().length > 0), O = m(0), A = v(() => t.tags.value.some((e) => !!e.group)), M = m(/* @__PURE__ */ new Set());
		function N(e) {
			return M.value.has(e);
		}
		function I(e) {
			let t = new Set(M.value);
			t.has(e) ? t.delete(e) : t.add(e), M.value = t, O.value = 0;
		}
		let ee = v(() => {
			let e = p.value.trim().toLowerCase();
			return e ? t.tags.value.filter((t) => [
				t.label,
				t.value,
				t.description ?? ""
			].join(" ").toLowerCase().includes(e)) : t.tags.value;
		}), L = v(() => {
			if (!A.value) return [];
			let e = n.mergeTag.picker.otherGroup, r = /* @__PURE__ */ new Set(), i = [];
			for (let n of t.tags.value) {
				let t = n.group ?? e;
				r.has(t) || (r.add(t), i.push(t));
			}
			return i;
		}), R = v(() => {
			let e = ee.value;
			if (!A.value || w.value) return e.map((e, t) => ({
				kind: "tag",
				tag: e,
				index: t
			}));
			let t = n.mergeTag.picker.otherGroup, r = /* @__PURE__ */ new Map(), i = [];
			for (let n of e) {
				let e = n.group ?? t;
				r.has(e) || (r.set(e, []), i.push(e)), r.get(e).push(n);
			}
			let a = [], o = 0;
			for (let e of i) {
				let t = r.get(e);
				if (a.push({
					kind: "header",
					group: e,
					count: t.length
				}), !M.value.has(e)) for (let e of t) a.push({
					kind: "tag",
					tag: e,
					index: o
				}), o++;
			}
			return a;
		}), z = v(() => R.value.flatMap((e) => e.kind === "tag" ? [e.tag] : []));
		F(() => t.isOpen.value, (e) => {
			e && (c.value = "", O.value = 0, M.value = /* @__PURE__ */ new Set(), l(() => {
				h.value?.focus();
			}));
		}), F(z, (e) => {
			O.value >= e.length && (O.value = Math.max(0, e.length - 1));
		});
		function B(e) {
			t.resolve(e);
		}
		function V() {
			t.resolve(null);
		}
		function H(e) {
			if (z.value.length === 0) return;
			let t = O.value + e;
			O.value = Math.max(0, Math.min(z.value.length - 1, t)), ie();
		}
		let te = m(null), ne = m({});
		function re(e, t) {
			ne.value[e] = t ?? null;
		}
		function ie() {
			l(() => {
				let e = te.value;
				e && e.querySelector(`[data-merge-tag-index="${O.value}"]`)?.scrollIntoView({ block: "nearest" });
			});
		}
		function ae(e) {
			if (M.value.has(e)) {
				let t = new Set(M.value);
				t.delete(e), M.value = t;
			}
			l(() => {
				let t = te.value;
				if (!t) return;
				let n = 0, r = !1;
				for (let i of Array.from(t.children)) {
					if (i.dataset.testid === "merge-tag-picker-group-header" && i.dataset.groupName === e) {
						r = !0;
						break;
					}
					n += i.offsetHeight;
				}
				r && t.scrollTo({
					top: n,
					behavior: "smooth"
				});
			});
		}
		function oe(e) {
			if (e.key === "ArrowDown") e.preventDefault(), H(1);
			else if (e.key === "ArrowUp") e.preventDefault(), H(-1);
			else if (e.key === "Enter") {
				e.preventDefault();
				let t = z.value[O.value];
				t && B(t);
			}
		}
		function U() {
			if (z.value.length !== 0) return `${hl}-opt-${O.value}`;
		}
		function se(e) {
			return `${hl}-opt-${e}`;
		}
		let ce = v(() => t.tags.value.length === 0), le = v(() => !ce.value && ee.value.length === 0), ue = v(() => A.value && L.value.length > 1 && !w.value);
		return (e, l) => (s(), C(on, {
			visible: x(t).isOpen.value,
			onClose: V,
			onKeydown: oe
		}, {
			default: f(() => [D("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": `${hl}-title`,
				"data-tpl-theme": x(o),
				"data-testid": "merge-tag-picker-modal",
				class: "tpl tpl:flex tpl:max-h-[80vh] tpl:w-[min(420px,92vw)] tpl:flex-col tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:shadow-[var(--tpl-shadow-lg)]",
				style: k(x(a))
			}, [
				D("header", Qc, [D("h2", {
					id: `${hl}-title`,
					class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
				}, _(x(n).mergeTag.picker.title), 9, $c), D("button", {
					type: "button",
					class: "tpl:flex tpl:h-7 tpl:w-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
					"aria-label": x(n).mergeTag.picker.close,
					"data-testid": "merge-tag-picker-close",
					onClick: V
				}, [P(x(Mt), {
					size: 16,
					"stroke-width": 2
				})], 8, el)]),
				D("div", tl, [P(x(gt), {
					class: "tpl:pointer-events-none tpl:absolute tpl:top-1/2 tpl:left-5 tpl:-translate-y-1/2 tpl:text-[var(--tpl-text-dim)]",
					size: 14,
					"stroke-width": 2
				}), r(D("input", {
					id: `${hl}-search`,
					ref_key: "searchInputRef",
					ref: h,
					"onUpdate:modelValue": l[0] ||= (e) => c.value = e,
					type: "text",
					class: "tpl:w-full tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:py-1.5 tpl:pr-3 tpl:pl-8 tpl:text-sm tpl:text-[var(--tpl-text)] tpl:outline-none tpl:focus:border-[var(--tpl-primary)]",
					placeholder: x(n).mergeTag.picker.searchPlaceholder,
					"aria-label": x(n).mergeTag.picker.searchAriaLabel,
					"aria-controls": hl,
					"aria-activedescendant": U(),
					"data-testid": "merge-tag-picker-search",
					onKeydown: l[1] ||= g(S(() => {}, ["prevent"]), ["enter"])
				}, null, 40, nl), [[T, c.value]])]),
				ue.value ? (s(), y("div", rl, [(s(!0), y(j, null, u(L.value, (e) => (s(), y("button", {
					key: e,
					type: "button",
					class: "tpl:flex tpl:flex-shrink-0 tpl:cursor-pointer tpl:items-center tpl:rounded-full tpl:border tpl:border-[var(--tpl-border)] tpl:bg-transparent tpl:px-2.5 tpl:py-0.5 tpl:text-[11px] tpl:font-medium tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
					"data-testid": "merge-tag-picker-group-pill",
					"data-group-name": e,
					onClick: (t) => ae(e)
				}, _(e), 9, il))), 128))])) : b("", !0),
				D("div", {
					id: hl,
					ref_key: "listRef",
					ref: te,
					class: "tpl:relative tpl:max-h-[60vh] tpl:flex-1 tpl:overflow-y-auto",
					role: "listbox",
					"aria-label": x(n).mergeTag.picker.title,
					"data-testid": "merge-tag-picker-list"
				}, [ce.value ? (s(), y("div", ol, _(x(n).mergeTag.picker.empty), 1)) : le.value ? (s(), y("div", sl, _(x(n).mergeTag.picker.noResults), 1)) : (s(!0), y(j, { key: 2 }, u(R.value, (e, t) => (s(), y(j, { key: t }, [e.kind === "header" ? (s(), y("button", {
					key: 0,
					ref_for: !0,
					ref: (t) => re(e.group, t),
					type: "button",
					"aria-expanded": !N(e.group),
					"aria-controls": hl,
					class: "tpl:sticky tpl:top-0 tpl:z-10 tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:gap-1.5 tpl:border-none tpl:bg-[var(--tpl-bg-elevated)] tpl:px-3 tpl:pt-2.5 tpl:pb-1 tpl:text-left tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:hover:bg-[var(--tpl-bg-hover)]",
					"data-testid": "merge-tag-picker-group-header",
					"data-group-name": e.group,
					"data-group-collapsed": N(e.group) ? "true" : "false",
					onClick: (t) => I(e.group)
				}, [
					P(x(ut), {
						size: 12,
						"stroke-width": 2,
						class: E(["tpl:transition-transform", N(e.group) ? "tpl:-rotate-90" : ""])
					}, null, 8, ["class"]),
					D("span", null, _(e.group), 1),
					D("span", ll, " (" + _(x(i)(x(n).mergeTag.picker.groupCount, { count: e.count })) + ") ", 1)
				], 8, cl)) : (s(), y("button", {
					key: 1,
					id: se(e.index),
					type: "button",
					role: "option",
					"aria-selected": e.index === O.value,
					"data-selected": e.index === O.value ? "true" : "false",
					"data-merge-tag-index": e.index,
					"data-merge-tag-value": e.tag.value,
					title: e.tag.description ? `${e.tag.value} — ${e.tag.description}` : e.tag.value,
					class: E(["tpl:flex tpl:w-full tpl:cursor-pointer tpl:flex-col tpl:items-start tpl:gap-0.5 tpl:border-none tpl:px-3 tpl:py-1.5 tpl:text-left tpl:transition-colors", e.index === O.value ? "tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary)]" : "tpl:bg-transparent tpl:text-[var(--tpl-text)] tpl:hover:bg-[var(--tpl-bg-hover)]"]),
					"data-testid": "merge-tag-picker-item",
					onMousemove: (t) => O.value = e.index,
					onClick: (t) => B(e.tag)
				}, [
					D("span", dl, _(e.tag.label), 1),
					D("span", fl, _(e.tag.value), 1),
					e.tag.description ? (s(), y("span", pl, _(e.tag.description), 1)) : b("", !0),
					e.tag.sample === void 0 ? b("", !0) : (s(), y("span", ml, _(x(i)(x(n).mergeTag.picker.sample, { sample: e.tag.sample })), 1))
				], 42, ul))], 64))), 128))], 8, al)
			], 12, Zc)]),
			_: 1
		}, 8, ["visible"]));
	}
}), _l = ["data-logic-keyword"], vl = /* @__PURE__ */ N({
	__name: "LogicTagBadge",
	props: {
		value: {},
		syntax: {}
	},
	setup(e) {
		let t = e, n = v(() => V(t.value, t.syntax)), r = v(() => R(t.value, t.syntax));
		return (e, t) => n.value ? (s(), y("span", {
			key: 0,
			class: "tpl:inline-flex tpl:flex-shrink-0 tpl:items-center tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:leading-none tpl:font-bold tpl:tracking-wide tpl:uppercase",
			style: {
				border: "1.5px solid\n        color-mix(in srgb, var(--tpl-primary) 50%, transparent)",
				color: "var(--tpl-primary)"
			},
			"data-testid": "merge-tag-logic-badge",
			"data-logic-keyword": r.value
		}, _(r.value), 9, _l)) : b("", !0);
	}
}), yl = ["aria-labelledby", "data-tpl-theme"], bl = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:gap-3 tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-3 tpl:py-2.5" }, xl = ["id"], Sl = ["aria-label"], Cl = { class: "tpl:relative tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-3 tpl:py-2.5" }, wl = [
	"id",
	"placeholder",
	"aria-label",
	"aria-activedescendant"
], Tl = ["aria-label"], El = {
	key: 0,
	class: "tpl:px-3 tpl:py-6 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]",
	"data-testid": "logic-picker-empty"
}, Dl = {
	key: 1,
	class: "tpl:px-3 tpl:py-6 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]",
	"data-testid": "logic-picker-empty"
}, Ol = ["data-group-name"], kl = [
	"id",
	"aria-selected",
	"data-selected",
	"data-logic-index",
	"data-logic-kind",
	"onMousemove",
	"onClick"
], Al = { class: "tpl:flex tpl:w-full tpl:items-center tpl:justify-between tpl:gap-2" }, jl = { class: "tpl:text-sm tpl:font-medium" }, Ml = {
	key: 0,
	class: "tpl:flex tpl:items-center"
}, Nl = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:gap-1"
}, Pl = { class: "tpl:line-clamp-2 tpl:font-mono tpl:text-xs tpl:text-ellipsis tpl:break-all tpl:text-[var(--tpl-text-dim)]" }, Fl = {
	key: 0,
	class: "tpl:line-clamp-2 tpl:text-xs tpl:text-ellipsis tpl:text-[var(--tpl-text-dim)]"
}, Il = "tpl-logic-picker-list", Ll = /* @__PURE__ */ N({
	__name: "LogicTagPickerModal",
	setup(e) {
		let t = Me(ze, "LogicTagPickerModal"), { t: n } = W(), i = d(Ae, ne.liquid), a = d(Ve, null), o = d(Be, null), c = m(""), p = ke(c, 200), h = m(null), w = v(() => p.value.trim().length > 0), O = m(0);
		function A(e) {
			let t = p.value.trim().toLowerCase();
			return !t || e.filter(Boolean).join(" ").toLowerCase().includes(t);
		}
		let M = v(() => t.tags.value.filter((e) => A([
			e.label,
			e.value,
			e.description
		]))), N = v(() => t.pairs.value.filter((e) => A([
			e.label,
			e.before,
			e.after,
			e.description
		]))), I = v(() => [...N.value.map((e) => ({
			kind: "pair",
			pair: e,
			group: e.group
		})), ...M.value.map((e) => ({
			kind: "tag",
			tag: e,
			group: e.group
		}))]), ee = v(() => t.tags.value.some((e) => !!e.group) || t.pairs.value.some((e) => !!e.group));
		function L(e) {
			let t = n.logicTag.picker.otherGroup, r = /* @__PURE__ */ new Map(), i = [];
			for (let n of e) {
				let e = n.group ?? t;
				r.has(e) || (r.set(e, []), i.push(e)), r.get(e).push(n);
			}
			return i.map((e) => [e, r.get(e)]);
		}
		let R = v(() => {
			let e = [], t = [], n = 0, r = (r) => {
				r.kind === "tag" ? (e.push({
					kind: "tag",
					tag: r.tag,
					index: n
				}), t.push(r.tag)) : (e.push({
					kind: "pair",
					pair: r.pair,
					index: n
				}), t.push(r.pair)), n++;
			}, i = I.value;
			if (w.value || !ee.value) for (let e of i) r(e);
			else for (let [t, n] of L(i)) {
				e.push({
					kind: "header",
					label: t
				});
				for (let e of n) r(e);
			}
			return {
				rows: e,
				items: t
			};
		}), z = v(() => R.value.items), B = v(() => t.tags.value.length === 0 && t.pairs.value.length === 0), V = v(() => !B.value && z.value.length === 0);
		F(() => t.isOpen.value, (e) => {
			e && (c.value = "", O.value = 0, l(() => h.value?.focus()));
		}), F(z, (e) => {
			O.value >= e.length && (O.value = Math.max(0, e.length - 1));
		});
		let H = m(null);
		function te(e) {
			t.resolve(e);
		}
		function re() {
			t.resolve(null);
		}
		function ie(e) {
			z.value.length !== 0 && (O.value = Math.max(0, Math.min(z.value.length - 1, O.value + e)), l(() => {
				H.value?.querySelector(`[data-logic-index="${O.value}"]`)?.scrollIntoView({ block: "nearest" });
			}));
		}
		function ae(e) {
			if (e.key === "ArrowDown") e.preventDefault(), ie(1);
			else if (e.key === "ArrowUp") e.preventDefault(), ie(-1);
			else if (e.key === "Enter") {
				e.preventDefault();
				let t = z.value[O.value];
				t && te(t);
			}
		}
		function oe(e) {
			return `${Il}-opt-${e}`;
		}
		function U() {
			return z.value.length === 0 ? void 0 : `${Il}-opt-${O.value}`;
		}
		return (e, l) => (s(), C(on, {
			visible: x(t).isOpen.value,
			onClose: re,
			onKeydown: ae
		}, {
			default: f(() => [D("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": `${Il}-title`,
				"data-tpl-theme": x(o),
				"data-testid": "logic-picker-modal",
				class: "tpl tpl:flex tpl:max-h-[80vh] tpl:w-[min(420px,92vw)] tpl:flex-col tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:shadow-[var(--tpl-shadow-lg)]",
				style: k(x(a))
			}, [
				D("header", bl, [D("h2", {
					id: `${Il}-title`,
					class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
				}, _(x(n).logicTag.picker.title), 9, xl), D("button", {
					type: "button",
					class: "tpl:flex tpl:h-7 tpl:w-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
					"aria-label": x(n).logicTag.picker.close,
					"data-testid": "logic-picker-close",
					onClick: re
				}, [P(x(Mt), {
					size: 16,
					"stroke-width": 2
				})], 8, Sl)]),
				D("div", Cl, [P(x(gt), {
					class: "tpl:pointer-events-none tpl:absolute tpl:top-1/2 tpl:left-5 tpl:-translate-y-1/2 tpl:text-[var(--tpl-text-dim)]",
					size: 14,
					"stroke-width": 2
				}), r(D("input", {
					id: `${Il}-search`,
					ref_key: "searchInputRef",
					ref: h,
					"onUpdate:modelValue": l[0] ||= (e) => c.value = e,
					type: "text",
					class: "tpl:w-full tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:py-1.5 tpl:pr-3 tpl:pl-8 tpl:text-sm tpl:text-[var(--tpl-text)] tpl:outline-none tpl:focus:border-[var(--tpl-primary)]",
					placeholder: x(n).logicTag.picker.searchPlaceholder,
					"aria-label": x(n).logicTag.picker.searchAriaLabel,
					"aria-controls": Il,
					"aria-activedescendant": U(),
					"data-testid": "logic-picker-search",
					onKeydown: l[1] ||= g(S(() => {}, ["prevent"]), ["enter"])
				}, null, 40, wl), [[T, c.value]])]),
				D("div", {
					id: Il,
					ref_key: "listRef",
					ref: H,
					class: "tpl:relative tpl:max-h-[60vh] tpl:flex-1 tpl:overflow-y-auto",
					role: "listbox",
					"aria-label": x(n).logicTag.picker.title,
					"data-testid": "logic-picker-list"
				}, [B.value ? (s(), y("div", El, _(x(n).logicTag.picker.empty), 1)) : V.value ? (s(), y("div", Dl, _(x(n).logicTag.picker.noResults), 1)) : (s(!0), y(j, { key: 2 }, u(R.value.rows, (e, t) => (s(), y(j, { key: t }, [e.kind === "header" ? (s(), y("div", {
					key: 0,
					class: "tpl:px-3 tpl:pt-2.5 tpl:pb-1 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-dim)]",
					"data-testid": "logic-picker-header",
					"data-group-name": e.label
				}, _(e.label), 9, Ol)) : (s(), y("button", {
					key: 1,
					id: oe(e.index),
					type: "button",
					role: "option",
					"aria-selected": e.index === O.value,
					"data-selected": e.index === O.value ? "true" : "false",
					"data-logic-index": e.index,
					"data-logic-kind": e.kind,
					class: E(["tpl:flex tpl:w-full tpl:cursor-pointer tpl:flex-col tpl:items-start tpl:gap-0.5 tpl:border-none tpl:px-3 tpl:py-1.5 tpl:text-left tpl:transition-colors", e.index === O.value ? "tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary)]" : "tpl:bg-transparent tpl:text-[var(--tpl-text)] tpl:hover:bg-[var(--tpl-bg-hover)]"]),
					"data-testid": "logic-picker-item",
					onMousemove: (t) => O.value = e.index,
					onClick: (t) => te(e.kind === "tag" ? e.tag : e.pair)
				}, [
					D("span", Al, [D("span", jl, _(e.kind === "tag" ? e.tag.label : e.pair.label), 1), e.kind === "tag" ? (s(), y("span", Ml, [P(vl, {
						value: e.tag.value,
						syntax: x(i)
					}, null, 8, ["value", "syntax"])])) : (s(), y("span", Nl, [
						P(vl, {
							value: e.pair.before,
							syntax: x(i)
						}, null, 8, ["value", "syntax"]),
						l[2] ||= D("span", { class: "tpl:text-[var(--tpl-text-dim)]" }, "…", -1),
						P(vl, {
							value: e.pair.after,
							syntax: x(i)
						}, null, 8, ["value", "syntax"])
					]))]),
					D("span", Pl, _(e.kind === "tag" ? e.tag.value : `${e.pair.before} … ${e.pair.after}`), 1),
					(e.kind === "tag" ? e.tag.description : e.pair.description) ? (s(), y("span", Fl, _(e.kind === "tag" ? e.tag.description : e.pair.description), 1)) : b("", !0)
				], 42, kl))], 64))), 128))], 8, Tl)
			], 12, yl)]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { Gc as a, Fn as c, fn as d, dn as f, qc as i, En as l, sn as m, gl as n, Uc as o, ln as p, Xc as r, Rc as s, Ll as t, Tn as u };

//# sourceMappingURL=styles-BzP13r-I.js.map