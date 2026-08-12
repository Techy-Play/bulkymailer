import { H as e, L as t, M as n, O as r, P as i, V as ee, Z as a, a as o, b as te, c as s, ct as c, f as l, g as u, h as d, it as f, l as p, m, o as h, ot as ne, p as g, st as re, u as _, x as v, y, z as ie } from "./draggable-BRF_Q_jB.js";
import "./useEditorCore-CTYH6u4r.js";
import { G as b, R as ae, g as oe } from "./keys-CZOBuCQd.js";
import { t as se } from "./useI18n-aRMtgYRj.js";
import { P as ce, X as x, d as le, n as ue, q as de } from "./icons-DN008liP.js";
import { t as S } from "./blockTypeIcons-CrPzyP_k.js";
import { t as fe } from "./TplModal-C1iguuZz.js";
import { t as pe } from "./formatRelativeTime-CtUU-QZ8.js";
//#region src/components/SavedBlocksBrowserModal.vue?vue&type=script&setup=true&lang.ts
var me = {
	role: "dialog",
	"aria-modal": "true",
	"data-testid": "saved-blocks-browser",
	"aria-labelledby": "tpl-saved-blocks-browser-title",
	class: "tpl-scale-in tpl:mx-4 tpl:flex tpl:w-[1000px] tpl:max-w-[calc(100vw_-_2*var(--tpl-base-size))] tpl:flex-col tpl:rounded-[var(--tpl-radius-lg)]",
	style: {
		"background-color": "var(--tpl-bg-elevated)",
		"box-shadow": "var(--tpl-shadow-xl)",
		"max-height": "90vh"
	}
}, he = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:px-5 tpl:py-4 tpl:border-[var(--tpl-border)]" }, ge = {
	id: "tpl-saved-blocks-browser-title",
	class: "tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
}, _e = ["aria-label"], ve = { class: "tpl:flex tpl:min-h-0 tpl:flex-1 tpl:overflow-hidden" }, ye = { class: "tpl:flex tpl:w-[300px] tpl:shrink-0 tpl:flex-col tpl:overflow-hidden" }, be = { class: "tpl:flex tpl:flex-col tpl:gap-2 tpl:px-4 tpl:pt-4 tpl:pb-3" }, xe = { class: "tpl:relative" }, Se = ["placeholder", "disabled"], Ce = ["aria-label"], we = { value: "" }, Te = ["value"], C = { id: "tpl-saved-block-browser-categories" }, w = ["value"], T = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:px-4 tpl:pb-4" }, E = ["aria-label"], D = {
	key: 1,
	class: "tpl:flex tpl:flex-col tpl:gap-1"
}, O = ["onFocusout"], Ee = ["aria-label", "onKeydown"], De = [
	"aria-label",
	"placeholder",
	"onKeydown"
], Oe = ["aria-pressed", "onClick"], ke = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Ae = { class: "tpl:flex-1 tpl:truncate tpl:text-xs tpl:font-semibold tpl:text-[var(--tpl-text)]" }, je = { class: "tpl:shrink-0 tpl:rounded-full tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)]" }, Me = {
	key: 0,
	class: "tpl:mt-1 tpl:flex tpl:items-center"
}, Ne = {
	"data-testid": "saved-block-category",
	class: "tpl:max-w-full tpl:truncate tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary)]"
}, Pe = { class: "tpl:mt-1 tpl:flex tpl:items-center tpl:gap-1" }, Fe = {
	key: 0,
	class: "tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]"
}, Ie = ["title"], Le = ["aria-label", "onClick"], Re = [
	"aria-label",
	"title",
	"onClick"
], ze = [
	"aria-label",
	"title",
	"onClick"
], Be = {
	key: 2,
	class: "tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:py-12"
}, Ve = {
	key: 0,
	class: "tpl:mt-2 tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, He = { class: "tpl:mt-2 tpl:text-xs tpl:text-[var(--tpl-text-dim)]" }, Ue = { class: "tpl:mt-1 tpl:max-w-[220px] tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]" }, We = { class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:overflow-hidden tpl:border-l tpl:border-[var(--tpl-border)]" }, Ge = {
	key: 0,
	class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:overflow-hidden"
}, Ke = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4" }, qe = {
	key: 1,
	class: "tpl:flex tpl:flex-1 tpl:flex-col tpl:items-center tpl:justify-center tpl:px-4"
}, Je = { class: "tpl:mt-2 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]" }, Ye = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-t tpl:px-5 tpl:py-3 tpl:border-[var(--tpl-border)]" }, Xe = { class: "tpl:flex tpl:items-center tpl:gap-2" }, k = { class: "tpl:shrink-0 tpl:text-xs tpl:text-[var(--tpl-text-dim)]" }, Ze = ["value"], Qe = { class: "tpl:flex tpl:gap-2" }, $e = ["disabled"], A = /* @__PURE__ */ v({
	__name: "SavedBlocksBrowserModal",
	props: { visible: { type: Boolean } },
	emits: ["close", "insert"],
	setup(v, { emit: A }) {
		let et = v, j = A, tt = te(() => import("./BlockPreviewCanvas-D8pfTFWi.js").then((e) => e.n)), { t: M, format: N } = se(), P = b(ae, "SavedBlocksBrowserModal"), F = b(oe, "SavedBlocksBrowserModal"), I = a(""), L = a(""), R = a(null), z = a(null), B = a(null), V = a(""), H = a(""), U = a(null), W = a("end"), G = l(() => {
			let e = I.value.trim().toLowerCase(), t = L.value;
			return P.savedBlocks.value.filter((n) => !(e && !n.name.toLowerCase().includes(e) || t && n.category !== t));
		}), K = l(() => P.isLoading.value && P.savedBlocks.value.length === 0), nt = l(() => I.value.trim().length > 0 || L.value !== ""), q = l(() => R.value ? P.savedBlocks.value.find((e) => e.id === R.value) ?? null : null), rt = l(() => {
			let e = [{
				value: "beginning",
				label: M.savedBlocks.insertAtBeginning
			}], t = F.content.value.blocks;
			for (let n = 0; n < t.length; n++) {
				let r = t[n];
				e.push({
					value: r.id,
					label: N(M.savedBlocks.insertAfterBlock, { block: `${M.blocks[r.type] ?? r.type} ${n + 1}` })
				});
			}
			return e.push({
				value: "end",
				label: M.savedBlocks.insertAtEnd
			}), e;
		}), it = l(() => {
			if (W.value === "end") return;
			if (W.value === "beginning") return 0;
			let e = F.content.value.blocks.findIndex((e) => e.id === W.value);
			if (e !== -1) return e + 1;
		});
		ie(() => et.visible, (e) => {
			if (e) {
				I.value = "", L.value = "", R.value = null, z.value = null, B.value = null;
				let e = F.state.selectedBlockId;
				if (e) {
					let t = F.content.value.blocks.findIndex((t) => t.id === e);
					W.value = t === -1 ? "end" : e;
				} else W.value = "end";
			}
		}, { immediate: !0 });
		function at(e) {
			let t = [], n = /* @__PURE__ */ new Set();
			for (let r of e.content) if (!n.has(r.type) && S[r.type] && (n.add(r.type), t.push({
				type: r.type,
				icon: S[r.type]
			})), t.length >= 5) break;
			return t;
		}
		function J(e) {
			let t = new Set(e.content.map((e) => e.type));
			return Math.max(0, t.size - 5);
		}
		function Y(e) {
			let t = e.updatedAt ?? e.createdAt;
			return t ? pe(t, M.savedBlocks.time, N) ?? "" : "";
		}
		function ot(e) {
			let t = e.updatedAt ?? e.createdAt;
			if (!t) return "";
			let n = new Date(t);
			return Number.isNaN(n.getTime()) ? "" : n.toLocaleString();
		}
		async function st(e) {
			try {
				await P.remove(e), R.value === e && (R.value = null);
			} finally {
				z.value = null;
			}
		}
		async function ct(e) {
			P.canUpdateBlock(e) && (B.value = e.id, V.value = e.name, H.value = e.category ?? "", z.value = null, await r(), U.value?.focus(), U.value?.select());
		}
		function X() {
			B.value = null, V.value = "", H.value = "";
		}
		async function Z(e) {
			if (B.value !== e) return;
			let t = V.value.trim(), n = H.value.trim(), r = P.savedBlocks.value.find((t) => t.id === e), i = {};
			if (t && t !== r?.name && (i.name = t), n !== (r?.category ?? "") && (i.category = n), Object.keys(i).length === 0) {
				X();
				return;
			}
			try {
				await P.update(e, i);
			} finally {
				X();
			}
		}
		function lt(e, t) {
			let n = e.currentTarget, r = e.relatedTarget;
			r && n.contains(r) || Z(t);
		}
		function Q() {
			q.value && j("insert", q.value, it.value);
		}
		function $() {
			j("close");
		}
		function ut(e) {
			B.value || (e.key === "Escape" && $(), e.key === "Enter" && q.value && (e.preventDefault(), Q()));
		}
		return (r, a) => (n(), m(fe, {
			visible: v.visible,
			onClose: $,
			onKeydown: ut
		}, {
			default: ee(() => [g("div", me, [
				g("div", he, [g("h3", ge, c(f(M).savedBlocks.browse), 1), g("button", {
					"aria-label": f(M).savedBlocks.close,
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:p-1 tpl:transition-colors tpl:duration-100 tpl:text-[var(--tpl-text-dim)]",
					onClick: $
				}, [y(f(ue), {
					size: 16,
					"stroke-width": 2
				})], 8, _e)]),
				g("div", ve, [g("div", ye, [
					g("div", be, [g("div", xe, [y(f(ce), {
						size: 14,
						"stroke-width": 2,
						class: "tpl:pointer-events-none tpl:absolute tpl:left-3 tpl:top-1/2 tpl:-translate-y-1/2 tpl:text-[var(--tpl-text-dim)]"
					}), e(g("input", {
						"onUpdate:modelValue": a[0] ||= (e) => I.value = e,
						type: "text",
						placeholder: f(M).savedBlocks.search,
						disabled: K.value,
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:pl-9 tpl:pr-3 tpl:text-sm tpl:outline-none tpl:disabled:opacity-50 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, null, 8, Se), [[h, I.value]])]), f(P).categories.value.length > 0 ? e((n(), u("select", {
						key: 0,
						"onUpdate:modelValue": a[1] ||= (e) => L.value = e,
						"data-testid": "saved-blocks-category-filter",
						"aria-label": f(M).savedBlocks.filterByCategory,
						class: "tpl:h-8 tpl:w-full tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, [g("option", we, c(f(M).savedBlocks.allCategories), 1), (n(!0), u(_, null, i(f(P).categories.value, (e) => (n(), u("option", {
						key: e,
						value: e
					}, c(e), 9, Te))), 128))], 8, Ce)), [[o, L.value]]) : d("", !0)]),
					g("datalist", C, [(n(!0), u(_, null, i(f(P).categories.value, (e) => (n(), u("option", {
						key: e,
						value: e
					}, null, 8, w))), 128))]),
					g("div", T, [K.value ? (n(), u("div", {
						key: 0,
						"data-testid": "saved-blocks-loading",
						class: "tpl:flex tpl:flex-col tpl:gap-1",
						role: "status",
						"aria-busy": "true",
						"aria-label": f(M).savedBlocks.loading
					}, [(n(), u(_, null, i(3, (e) => g("div", {
						key: e,
						"aria-hidden": "true",
						class: "tpl-saved-block-skeleton tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-border)]"
					}, [...a[7] ||= [g("div", { class: "tpl:h-3 tpl:w-1/2 tpl:rounded tpl:bg-[var(--tpl-bg-hover)]" }, null, -1), g("div", { class: "tpl:mt-2 tpl:h-2.5 tpl:w-1/4 tpl:rounded tpl:bg-[var(--tpl-bg-hover)]" }, null, -1)]])), 64))], 8, E)) : G.value.length > 0 ? (n(), u("div", D, [(n(!0), u(_, null, i(G.value, (r) => (n(), u(_, { key: r.id }, [B.value === r.id ? (n(), u("div", {
						key: 0,
						class: "tpl:flex tpl:w-full tpl:flex-col tpl:gap-1 tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-primary)]",
						style: { "background-color": "var(--tpl-primary-light)" },
						onFocusout: (e) => lt(e, r.id)
					}, [e(g("input", {
						ref_for: !0,
						ref: (e) => U.value = e,
						"onUpdate:modelValue": a[2] ||= (e) => V.value = e,
						type: "text",
						"aria-label": f(M).savedBlocks.rename,
						class: "tpl:h-7 tpl:w-full tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
						onKeydown: [s(p((e) => Z(r.id), ["prevent", "stop"]), ["enter"]), a[3] ||= s(p((e) => X(), ["prevent", "stop"]), ["esc"])]
					}, null, 40, Ee), [[h, V.value]]), e(g("input", {
						"onUpdate:modelValue": a[4] ||= (e) => H.value = e,
						type: "text",
						"data-testid": "saved-blocks-edit-category",
						"aria-label": f(M).savedBlocks.category,
						placeholder: f(M).savedBlocks.categoryPlaceholder,
						list: "tpl-saved-block-browser-categories",
						class: "tpl:h-7 tpl:w-full tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
						onKeydown: [s(p((e) => Z(r.id), ["prevent", "stop"]), ["enter"]), a[5] ||= s(p((e) => X(), ["prevent", "stop"]), ["esc"])]
					}, null, 40, De), [[h, H.value]])], 40, O)) : (n(), u("button", {
						key: 1,
						type: "button",
						"data-testid": "saved-block-card",
						"aria-pressed": R.value === r.id,
						class: "tpl:group/card tpl:w-full tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:bg-transparent tpl:px-3 tpl:py-2 tpl:text-left tpl:transition-all tpl:duration-[120ms]",
						style: re({
							borderColor: R.value === r.id ? "var(--tpl-primary)" : "var(--tpl-border)",
							backgroundColor: R.value === r.id ? "var(--tpl-primary-light)" : "transparent"
						}),
						onClick: (e) => R.value = r.id
					}, [
						g("div", ke, [g("span", Ae, c(r.name), 1), g("span", je, c(f(N)(f(M).savedBlocks.blockCount, { count: r.content.length })), 1)]),
						r.category ? (n(), u("div", Me, [g("span", Ne, c(r.category), 1)])) : d("", !0),
						g("div", Pe, [
							(n(!0), u(_, null, i(at(r), (e) => (n(), m(t(e.icon), {
								key: e.type,
								size: 14,
								"stroke-width": 1.5,
								class: "tpl:text-[var(--tpl-text-dim)]"
							}))), 128)),
							J(r) > 0 ? (n(), u("span", Fe, " +" + c(J(r)), 1)) : d("", !0),
							Y(r) ? (n(), u("span", {
								key: 1,
								"data-testid": "saved-block-updated",
								class: "tpl:ml-1 tpl:truncate tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]",
								title: ot(r)
							}, c(Y(r)), 9, Ie)) : d("", !0),
							z.value === r.id ? (n(), u("button", {
								key: 2,
								"aria-label": f(M).savedBlocks.deleteConfirm,
								class: "tpl:ml-auto tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:transition-colors tpl:duration-100 tpl:border-[var(--tpl-danger)] tpl:text-[var(--tpl-danger)]",
								style: { "background-color": "transparent" },
								onClick: p((e) => st(r.id), ["stop"])
							}, c(f(M).savedBlocks.deleteConfirm), 9, Le)) : (n(), u(_, { key: 3 }, [f(P).canUpdateBlock(r) ? (n(), u("button", {
								key: 0,
								class: "tpl-saved-block-rename-btn tpl:ml-auto tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:p-0.5 tpl:transition-colors tpl:duration-100 tpl:text-[var(--tpl-text-dim)]",
								"aria-label": f(M).savedBlocks.rename,
								title: f(M).savedBlocks.rename,
								onClick: p((e) => ct(r), ["stop"])
							}, [y(f(de), {
								size: 12,
								"stroke-width": 1.5
							})], 8, Re)) : d("", !0), f(P).canDeleteBlock(r) ? (n(), u("button", {
								key: 1,
								class: ne(["tpl-saved-block-delete-btn tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:p-0.5 tpl:transition-colors tpl:duration-100 tpl:text-[var(--tpl-text-dim)]", { "tpl:ml-auto": !f(P).canUpdateBlock(r) }]),
								"aria-label": f(M).savedBlocks.delete,
								title: f(M).savedBlocks.delete,
								onClick: p((e) => z.value = r.id, ["stop"])
							}, [y(f(le), {
								size: 12,
								"stroke-width": 1.5
							})], 10, ze)) : d("", !0)], 64))
						])
					], 12, Oe))], 64))), 128))])) : (n(), u("div", Be, [y(f(x), {
						size: 32,
						"stroke-width": 1,
						class: "tpl:text-[var(--tpl-text-dim)]"
					}), nt.value ? (n(), u("p", Ve, c(f(M).savedBlocks.noResults), 1)) : (n(), u(_, { key: 1 }, [g("p", He, c(f(M).savedBlocks.empty), 1), g("p", Ue, c(f(M).savedBlocks.emptyHint), 1)], 64))]))])
				]), g("div", We, [q.value ? (n(), u("div", Ge, [g("div", Ke, [y(f(tt), { blocks: q.value.content }, null, 8, ["blocks"])])])) : (n(), u("div", qe, [y(f(x), {
					size: 32,
					"stroke-width": 1,
					class: "tpl:text-[var(--tpl-text-dim)]"
				}), g("p", Je, c(f(M).savedBlocks.selectToPreview), 1)]))])]),
				g("div", Ye, [g("div", Xe, [g("label", k, c(f(M).savedBlocks.insertPosition), 1), e(g("select", {
					"onUpdate:modelValue": a[6] ||= (e) => W.value = e,
					class: "tpl:h-7 tpl:max-w-[220px] tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
				}, [(n(!0), u(_, null, i(rt.value, (e) => (n(), u("option", {
					key: e.value,
					value: e.value
				}, c(e.label), 9, Ze))), 128))], 512), [[o, W.value]])]), g("div", Qe, [g("button", {
					type: "button",
					"data-testid": "saved-blocks-browser-close",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]",
					onClick: $
				}, c(f(M).savedBlocks.close), 1), g("button", {
					type: "button",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !q.value,
					onClick: Q
				}, c(f(M).savedBlocks.insert), 9, $e)])])
			])]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { A as default };

//# sourceMappingURL=SavedBlocksBrowserModal-jMnNd4wn.js.map