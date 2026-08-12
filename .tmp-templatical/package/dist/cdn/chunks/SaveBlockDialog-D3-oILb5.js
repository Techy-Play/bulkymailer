import { A as e, H as t, L as n, M as r, P as i, T as a, V as o, Z as s, c, ct as l, f as u, g as d, h as f, it as p, k as m, l as h, m as g, o as _, ot as v, p as y, st as b, t as x, u as S, v as C, x as w, y as T, z as E } from "./draggable-BRF_Q_jB.js";
import { M as ee } from "./useEditorCore-CTYH6u4r.js";
import { G as D, R as O, g as k, p as A } from "./keys-CZOBuCQd.js";
import { t as te } from "./useI18n-aRMtgYRj.js";
import { It as j, Nt as M, at as N, gt as P } from "./icons-DN008liP.js";
import { n as F } from "./emailFrameWidth-BmFCN2dp.js";
import { t as I } from "./TplModal-C1iguuZz.js";
import { t as L } from "./BlockPreviewCanvas-D8pfTFWi.js";
//#region src/components/SavedBlockPreviewRow.vue?vue&type=script&setup=true&lang.ts
var R = ["data-block-id"], z = ["aria-label", "title"], B = { class: "tpl:relative tpl:min-w-0 tpl:flex-1" }, V = {
	key: 0,
	"data-testid": "saved-blocks-preview-fade",
	"aria-hidden": "true",
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-x-0 tpl:bottom-0 tpl:h-10",
	style: { background: "linear-gradient(\n            to bottom,\n            transparent,\n            var(--tpl-bg) 90%\n          )" }
}, H = ["aria-label", "aria-expanded"], U = 240, W = /* @__PURE__ */ w({
	__name: "SavedBlockPreviewRow",
	props: {
		block: {},
		position: {},
		total: {}
	},
	emits: ["move"],
	setup(t, { emit: i }) {
		let o = t, _ = i, { t: v, format: x } = te(), S = a(A, []), w = a(k, null), E = u(() => F(w?.content.value.settings)), D = s(null), O = s(null), N = s(1), I = s(null), W = s(!1), G = null, K = u(() => I.value !== null && I.value > U), q = u(() => I.value === null ? null : W.value || !K.value ? I.value : U);
		function J() {
			let e = D.value, t = O.value;
			if (!e || !t) return;
			let n = e.clientWidth;
			if (n <= 0) return;
			let r = Math.min(1, n / E.value);
			N.value = r, I.value = t.offsetHeight * r;
		}
		e(() => {
			J(), !(typeof ResizeObserver > "u") && (G = new ResizeObserver(() => J()), D.value && G.observe(D.value), O.value && G.observe(O.value));
		}), m(() => {
			G?.disconnect(), G = null;
		});
		let Y = u(() => ee(o.block, v, S)), X = u(() => x(v.savedBlocks.reorderHandle, {
			block: Y.value,
			position: o.position,
			total: o.total
		})), Z = u(() => x(W.value ? v.savedBlocks.collapsePreview : v.savedBlocks.expandPreview, { block: Y.value }));
		return (e, i) => (r(), d("div", {
			"data-testid": "saved-blocks-reorder-row",
			"data-block-id": t.block.id,
			class: "tpl:flex tpl:items-start tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:p-1.5 tpl:border-[var(--tpl-border)]",
			style: { "background-color": "var(--tpl-bg)" }
		}, [y("button", {
			type: "button",
			"data-testid": "saved-blocks-reorder-handle",
			class: "tpl-saved-block-reorder-handle tpl:mt-0.5 tpl:shrink-0 tpl:cursor-grab tpl:rounded tpl:border-none tpl:bg-transparent tpl:p-0.5 tpl:text-[var(--tpl-text-dim)]",
			"aria-label": X.value,
			title: p(v).savedBlocks.reorderHint,
			onKeydown: [i[0] ||= c(h((e) => _("move", -1), ["prevent"]), ["up"]), i[1] ||= c(h((e) => _("move", 1), ["prevent"]), ["down"])]
		}, [T(p(P), {
			size: 14,
			"stroke-width": 1.5
		})], 40, z), y("div", B, [
			y("div", {
				ref_key: "frameEl",
				ref: D,
				class: "tpl:overflow-hidden",
				style: b({ height: q.value === null ? void 0 : `${q.value}px` })
			}, [y("div", {
				ref_key: "contentEl",
				ref: O,
				style: b({
					width: `${E.value}px`,
					transform: `scale(${N.value})`,
					transformOrigin: "top left"
				})
			}, [T(L, { blocks: [t.block] }, null, 8, ["blocks"])], 4)], 4),
			K.value && !W.value ? (r(), d("div", V)) : f("", !0),
			K.value ? (r(), d("button", {
				key: 1,
				type: "button",
				"data-testid": "saved-blocks-preview-toggle",
				class: "tpl:absolute tpl:bottom-1 tpl:right-1 tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-0.5 tpl:rounded tpl:border tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:text-[var(--tpl-text-muted)]",
				"aria-label": Z.value,
				"aria-expanded": W.value,
				onClick: i[2] ||= (e) => W.value = !W.value
			}, [(r(), g(n(p(W.value ? M : j)), {
				size: 11,
				"stroke-width": 2
			})), C(" " + l(W.value ? p(v).savedBlocks.collapse : p(v).savedBlocks.expand), 1)], 8, H)) : f("", !0)
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
}, me = { key: 1 }, Q = /* @__PURE__ */ w({
	__name: "SaveBlockDialog",
	props: {
		visible: { type: Boolean },
		pickedIds: {}
	},
	emits: ["close", "saved"],
	setup(e, { emit: n }) {
		let c = e, m = n, { t: h, format: b } = te(), w = D(k, "SaveBlockDialog"), j = D(O, "SaveBlockDialog"), M = a(A, []), P = s(""), F = s(""), L = s(!1), R = s(null), z = s(""), B = s([]), V = u(() => {
			let e = new Map(w.content.value.blocks.map((e) => [e.id, e]));
			return B.value.map((t) => e.get(t)).filter((e) => e !== void 0);
		}), H = u({
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
			z.value = a ? b(h.savedBlocks.reorderAnnouncement, {
				block: Q(a),
				position: i + 1,
				total: n.length
			}) : "";
		}
		function Q(e) {
			return ee(e, h, M);
		}
		let he = u(() => V.value.map(Q).join(", "));
		E(() => c.visible, (e) => {
			e && (P.value = "", F.value = "", R.value = null, z.value = "", B.value = [...c.pickedIds]);
		}, { immediate: !0 });
		let ge = u(() => P.value.trim().length > 0 && V.value.length > 0 && !L.value);
		async function _e() {
			if (!ge.value) return;
			let e = V.value;
			if (e.length !== 0) {
				L.value = !0, R.value = null;
				try {
					await j.create(P.value.trim(), e, F.value.trim() || void 0), m("saved"), m("close");
				} catch (e) {
					R.value = e.message;
				} finally {
					L.value = !1;
				}
			}
		}
		function $() {
			L.value || m("close");
		}
		function ve(e) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), _e()), e.key === "Escape" && $();
		}
		return (n, a) => (r(), g(I, {
			visible: e.visible,
			onClose: $,
			onKeydown: ve
		}, {
			default: o(() => [y("div", {
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
				y("h3", K, l(p(h).savedBlocks.saveAsBlock), 1),
				y("div", q, [y("label", J, l(p(h).savedBlocks.name), 1), t(y("input", {
					"onUpdate:modelValue": a[0] ||= (e) => P.value = e,
					type: "text",
					"data-testid": "saved-blocks-name-input",
					placeholder: p(h).savedBlocks.namePlaceholder,
					class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
					disabled: L.value
				}, null, 8, Y), [[_, P.value]])]),
				y("div", X, [
					y("label", Z, l(p(h).savedBlocks.category), 1),
					t(y("input", {
						id: "tpl-save-block-category",
						"onUpdate:modelValue": a[1] ||= (e) => F.value = e,
						type: "text",
						"data-testid": "saved-blocks-category-input",
						list: "tpl-saved-block-categories",
						placeholder: p(h).savedBlocks.categoryPlaceholder,
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1 tpl:text-sm tpl:shadow-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
						disabled: L.value
					}, null, 8, ne), [[_, F.value]]),
					y("datalist", re, [(r(!0), d(S, null, i(p(j).categories.value, (e) => (r(), d("option", {
						key: e,
						value: e
					}, null, 8, ie))), 128))])
				]),
				y("p", ae, [C(l(p(b)(p(h).savedBlocks.savingCount, { count: V.value.length })) + " ", 1), y("span", oe, l(he.value), 1)]),
				V.value.length > 1 ? (r(), d("p", se, l(p(h).savedBlocks.reorderHint), 1)) : f("", !0),
				T(p(x), {
					modelValue: H.value,
					"onUpdate:modelValue": a[2] ||= (e) => H.value = e,
					"data-testid": "saved-blocks-reorder-list",
					animation: 150,
					"ghost-class": "tpl-ghost",
					"drag-class": "tpl-dragging",
					handle: ".tpl-saved-block-reorder-handle",
					"force-fallback": !0,
					class: "tpl:mb-4 tpl:flex tpl:min-h-0 tpl:flex-1 tpl:flex-col tpl:gap-1.5 tpl:overflow-y-auto"
				}, {
					default: o(() => [(r(!0), d(S, null, i(H.value, (e, t) => (r(), g(W, {
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
				y("div", ce, l(z.value), 1),
				R.value ? (r(), d("p", le, l(R.value), 1)) : f("", !0),
				y("div", ue, [y("button", {
					type: "button",
					class: v(["tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]", { "tpl:cursor-not-allowed tpl:opacity-50": L.value }]),
					disabled: L.value,
					onClick: $
				}, l(p(h).savedBlocks.cancel), 11, de), y("button", {
					type: "button",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !ge.value,
					onClick: _e
				}, [L.value ? (r(), d("span", pe, [T(p(N), {
					class: "tpl:animate-spin",
					size: 12,
					"stroke-width": 2
				}), C(" " + l(p(h).savedBlocks.saving), 1)])) : (r(), d("span", me, l(p(h).savedBlocks.save), 1))], 8, fe)])
			], 8, G)]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { Q as default };

//# sourceMappingURL=SaveBlockDialog-D3-oILb5.js.map