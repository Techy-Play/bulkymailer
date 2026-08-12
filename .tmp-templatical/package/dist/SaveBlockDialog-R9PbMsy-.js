import { A as e, Dt as t, E as n, Et as r, I as i, N as a, O as o, Ot as s, R as c, T as l, Y as u, _ as d, c as f, d as p, h as m, l as h, m as g, nt as _, r as v, s as y, u as b, x, z as S } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as C, c as w, s as T } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { H as E, P as D, c as O } from "./useEditorCore-BMbxdUbY.js";
import { G as k, R as A, g as j, p as M } from "./keys-BI6VSUh4.js";
import { t as ee } from "./useI18n-BkHfCWC6.js";
import { t as te } from "./chevron-down-CYOoeGBd.js";
import { t as N } from "./chevron-up-DYknsfm0.js";
import { t as P } from "./loader-circle-GADaYcyQ.js";
import { n as F } from "./emailFrameWidth-BmFCN2dp.js";
import { t as I } from "./TplModal-D_FA3Wm3.js";
import { t as L } from "./BlockPreviewCanvas-BxSoA1QV.js";
//#region src/components/SavedBlockPreviewRow.vue?vue&type=script&setup=true&lang.ts
var R = ["data-block-id"], z = ["aria-label", "title"], B = { class: "tpl:relative tpl:min-w-0 tpl:flex-1" }, V = {
	key: 0,
	"data-testid": "saved-blocks-preview-fade",
	"aria-hidden": "true",
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-x-0 tpl:bottom-0 tpl:h-10",
	style: { background: "linear-gradient(\n            to bottom,\n            transparent,\n            var(--tpl-bg) 90%\n          )" }
}, H = ["aria-label", "aria-expanded"], U = 240, W = /* @__PURE__ */ d({
	__name: "SavedBlockPreviewRow",
	props: {
		block: {},
		position: {},
		total: {}
	},
	emits: ["move"],
	setup(e, { emit: r }) {
		let i = e, c = r, { t: d, format: v } = ee(), S = x(M, []), C = x(j, null), O = y(() => F(C?.content.value.settings)), k = u(null), A = u(null), P = u(1), I = u(null), W = u(!1), G = null, K = y(() => I.value !== null && I.value > U), q = y(() => I.value === null ? null : W.value || !K.value ? I.value : U);
		function J() {
			let e = k.value, t = A.value;
			if (!e || !t) return;
			let n = e.clientWidth;
			if (n <= 0) return;
			let r = Math.min(1, n / O.value);
			P.value = r, I.value = t.offsetHeight * r;
		}
		n(() => {
			J(), !(typeof ResizeObserver > "u") && (G = new ResizeObserver(() => J()), k.value && G.observe(k.value), A.value && G.observe(A.value));
		}), l(() => {
			G?.disconnect(), G = null;
		});
		let Y = y(() => E(i.block, d, S)), X = y(() => v(d.savedBlocks.reorderHandle, {
			block: Y.value,
			position: i.position,
			total: i.total
		})), Z = y(() => v(W.value ? d.savedBlocks.collapsePreview : d.savedBlocks.expandPreview, { block: Y.value }));
		return (n, r) => (o(), p("div", {
			"data-testid": "saved-blocks-reorder-row",
			"data-block-id": e.block.id,
			class: "tpl:flex tpl:items-start tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:p-1.5 tpl:border-[var(--tpl-border)]",
			style: { "background-color": "var(--tpl-bg)" }
		}, [f("button", {
			type: "button",
			"data-testid": "saved-blocks-reorder-handle",
			class: "tpl-saved-block-reorder-handle tpl:mt-0.5 tpl:shrink-0 tpl:cursor-grab tpl:rounded tpl:border-none tpl:bg-transparent tpl:p-0.5 tpl:text-[var(--tpl-text-dim)]",
			"aria-label": X.value,
			title: _(d).savedBlocks.reorderHint,
			onKeydown: [r[0] ||= T(w((e) => c("move", -1), ["prevent"]), ["up"]), r[1] ||= T(w((e) => c("move", 1), ["prevent"]), ["down"])]
		}, [m(_(D), {
			size: 14,
			"stroke-width": 1.5
		})], 40, z), f("div", B, [
			f("div", {
				ref_key: "frameEl",
				ref: k,
				class: "tpl:overflow-hidden",
				style: t({ height: q.value === null ? void 0 : `${q.value}px` })
			}, [f("div", {
				ref_key: "contentEl",
				ref: A,
				style: t({
					width: `${O.value}px`,
					transform: `scale(${P.value})`,
					transformOrigin: "top left"
				})
			}, [m(L, { blocks: [e.block] }, null, 8, ["blocks"])], 4)], 4),
			K.value && !W.value ? (o(), p("div", V)) : b("", !0),
			K.value ? (o(), p("button", {
				key: 1,
				type: "button",
				"data-testid": "saved-blocks-preview-toggle",
				class: "tpl:absolute tpl:bottom-1 tpl:right-1 tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-0.5 tpl:rounded tpl:border tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:text-[var(--tpl-text-muted)]",
				"aria-label": Z.value,
				"aria-expanded": W.value,
				onClick: r[2] ||= (e) => W.value = !W.value
			}, [(o(), h(a(W.value ? _(N) : _(te)), {
				size: 11,
				"stroke-width": 2
			})), g(" " + s(W.value ? _(d).savedBlocks.collapse : _(d).savedBlocks.expand), 1)], 8, H)) : b("", !0)
		])], 8, R));
	}
}), G = ["aria-busy"], K = {
	id: "tpl-save-block-title",
	class: "tpl:mb-4 tpl:shrink-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
}, q = { class: "tpl:mb-3 tpl:shrink-0" }, J = { class: "tpl:mb-1.5 tpl:block tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]" }, Y = ["placeholder", "disabled"], X = { class: "tpl:mb-3 tpl:shrink-0" }, Z = {
	for: "tpl-save-block-category",
	class: "tpl:mb-1.5 tpl:block tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]"
}, ne = ["placeholder", "disabled"], re = { id: "tpl-saved-block-categories" }, ie = ["value"], ae = {
	"data-testid": "saved-blocks-save-summary",
	class: "tpl:mb-1.5 tpl:shrink-0 tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, oe = { class: "tpl:text-[var(--tpl-text-dim)]" }, se = {
	key: 0,
	class: "tpl:mb-1.5 tpl:shrink-0 tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]"
}, ce = {
	class: "tpl-sr-only",
	role: "status",
	"aria-live": "polite",
	"aria-atomic": "true"
}, le = {
	key: 1,
	role: "alert",
	class: "tpl:mb-3 tpl:shrink-0 tpl:text-xs tpl:text-[var(--tpl-danger)]"
}, ue = { class: "tpl:flex tpl:shrink-0 tpl:justify-end tpl:gap-2" }, de = ["disabled"], fe = ["disabled"], pe = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-1.5"
}, me = { key: 1 }, Q = /* @__PURE__ */ d({
	__name: "SaveBlockDialog",
	props: {
		visible: { type: Boolean },
		pickedIds: {}
	},
	emits: ["close", "saved"],
	setup(t, { emit: n }) {
		let a = t, l = n, { t: d, format: w } = ee(), T = k(j, "SaveBlockDialog"), D = k(A, "SaveBlockDialog"), te = x(M, []), N = u(""), F = u(""), L = u(!1), R = u(null), z = u(""), B = u([]), V = y(() => {
			let e = new Map(T.content.value.blocks.map((e) => [e.id, e]));
			return B.value.map((t) => e.get(t)).filter((e) => e !== void 0);
		}), H = y({
			get: () => V.value,
			set: (e) => {
				B.value = e.map((e) => e.id);
			}
		});
		function U(e, t) {
			let n = V.value.map((e) => e.id), r = n.indexOf(e), i = r + t;
			if (r === -1 || i < 0 || i >= n.length) return;
			[n[r], n[i]] = [n[i], n[r]], B.value = n;
			let a = V.value[i];
			z.value = a ? w(d.savedBlocks.reorderAnnouncement, {
				block: Q(a),
				position: i + 1,
				total: n.length
			}) : "";
		}
		function Q(e) {
			return E(e, d, te);
		}
		let he = y(() => V.value.map(Q).join(", "));
		i(() => a.visible, (e) => {
			e && (N.value = "", F.value = "", R.value = null, z.value = "", B.value = [...a.pickedIds]);
		}, { immediate: !0 });
		let ge = y(() => N.value.trim().length > 0 && V.value.length > 0 && !L.value);
		async function _e() {
			if (!ge.value) return;
			let e = V.value;
			if (e.length !== 0) {
				L.value = !0, R.value = null;
				try {
					await D.create(N.value.trim(), e, F.value.trim() || void 0), l("saved"), l("close");
				} catch (e) {
					R.value = e.message;
				} finally {
					L.value = !1;
				}
			}
		}
		function $() {
			L.value || l("close");
		}
		function ve(e) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), _e()), e.key === "Escape" && $();
		}
		return (n, i) => (o(), h(I, {
			visible: t.visible,
			onClose: $,
			onKeydown: ve
		}, {
			default: c(() => [f("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-busy": L.value,
				"aria-labelledby": "tpl-save-block-title",
				class: "tpl-scale-in tpl:mx-4 tpl:flex tpl:w-full tpl:max-w-2xl tpl:flex-col tpl:rounded-[var(--tpl-radius-lg)] tpl:p-5",
				style: {
					"background-color": "var(--tpl-bg-elevated)",
					"box-shadow": "var(--tpl-shadow-xl)",
					"max-height": "90vh"
				}
			}, [
				f("h3", K, s(_(d).savedBlocks.saveAsBlock), 1),
				f("div", q, [f("label", J, s(_(d).savedBlocks.name), 1), S(f("input", {
					"onUpdate:modelValue": i[0] ||= (e) => N.value = e,
					type: "text",
					"data-testid": "saved-blocks-name-input",
					placeholder: _(d).savedBlocks.namePlaceholder,
					class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
					disabled: L.value
				}, null, 8, Y), [[C, N.value]])]),
				f("div", X, [
					f("label", Z, s(_(d).savedBlocks.category), 1),
					S(f("input", {
						id: "tpl-save-block-category",
						"onUpdate:modelValue": i[1] ||= (e) => F.value = e,
						type: "text",
						"data-testid": "saved-blocks-category-input",
						list: "tpl-saved-block-categories",
						placeholder: _(d).savedBlocks.categoryPlaceholder,
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
						disabled: L.value
					}, null, 8, ne), [[C, F.value]]),
					f("datalist", re, [(o(!0), p(v, null, e(_(D).categories.value, (e) => (o(), p("option", {
						key: e,
						value: e
					}, null, 8, ie))), 128))])
				]),
				f("p", ae, [g(s(_(w)(_(d).savedBlocks.savingCount, { count: V.value.length })) + " ", 1), f("span", oe, s(he.value), 1)]),
				V.value.length > 1 ? (o(), p("p", se, s(_(d).savedBlocks.reorderHint), 1)) : b("", !0),
				m(_(O), {
					modelValue: H.value,
					"onUpdate:modelValue": i[2] ||= (e) => H.value = e,
					"data-testid": "saved-blocks-reorder-list",
					animation: 150,
					"ghost-class": "tpl-ghost",
					"drag-class": "tpl-dragging",
					handle: ".tpl-saved-block-reorder-handle",
					"force-fallback": !0,
					class: "tpl:mb-4 tpl:flex tpl:min-h-0 tpl:flex-1 tpl:flex-col tpl:gap-1.5 tpl:overflow-y-auto"
				}, {
					default: c(() => [(o(!0), p(v, null, e(H.value, (e, t) => (o(), h(W, {
						key: e.id,
						block: e,
						position: t + 1,
						total: H.value.length,
						onMove: (t) => U(e.id, t)
					}, null, 8, [
						"block",
						"position",
						"total",
						"onMove"
					]))), 128))]),
					_: 1
				}, 8, ["modelValue"]),
				f("div", ce, s(z.value), 1),
				R.value ? (o(), p("p", le, s(R.value), 1)) : b("", !0),
				f("div", ue, [f("button", {
					type: "button",
					class: r(["tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]", { "tpl:cursor-not-allowed tpl:opacity-50": L.value }]),
					disabled: L.value,
					onClick: $
				}, s(_(d).savedBlocks.cancel), 11, de), f("button", {
					type: "button",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !ge.value,
					onClick: _e
				}, [L.value ? (o(), p("span", pe, [m(_(P), {
					class: "tpl:animate-spin",
					size: 12,
					"stroke-width": 2
				}), g(" " + s(_(d).savedBlocks.saving), 1)])) : (o(), p("span", me, s(_(d).savedBlocks.save), 1))], 8, fe)])
			], 8, G)]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { Q as default };
