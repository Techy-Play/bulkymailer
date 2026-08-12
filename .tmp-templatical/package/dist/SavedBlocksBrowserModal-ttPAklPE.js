import { A as e, Dt as t, Et as n, I as r, N as i, O as a, Ot as o, R as ee, Y as s, _ as c, c as l, d as u, g as te, h as d, l as f, nt as p, r as m, s as h, u as g, w as ne, z as _ } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as v, c as y, i as b, s as x } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import "./useEditorCore-BMbxdUbY.js";
import { G as S, R as re, g as ie } from "./keys-BI6VSUh4.js";
import { t as ae } from "./useI18n-BkHfCWC6.js";
import { n as oe, r as C, t as w } from "./blockTypeIcons-BoZeK6l7.js";
import { t as se } from "./pencil-BGwkOpD_.js";
import { t as ce } from "./trash-2-BoNT8wbq.js";
import { t as le } from "./x-B4WnJVRx.js";
import { t as ue } from "./TplModal-D_FA3Wm3.js";
import { t as de } from "./formatRelativeTime-CtUU-QZ8.js";
//#region src/components/SavedBlocksBrowserModal.vue?vue&type=script&setup=true&lang.ts
var fe = {
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
}, pe = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:px-5 tpl:py-4 tpl:border-[var(--tpl-border)]" }, me = {
	id: "tpl-saved-blocks-browser-title",
	class: "tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
}, he = ["aria-label"], ge = { class: "tpl:flex tpl:min-h-0 tpl:flex-1 tpl:overflow-hidden" }, _e = { class: "tpl:flex tpl:w-[300px] tpl:shrink-0 tpl:flex-col tpl:overflow-hidden" }, ve = { class: "tpl:flex tpl:flex-col tpl:gap-2 tpl:px-4 tpl:pt-4 tpl:pb-3" }, ye = { class: "tpl:relative" }, be = ["placeholder", "disabled"], xe = ["aria-label"], Se = { value: "" }, Ce = ["value"], we = { id: "tpl-saved-block-browser-categories" }, Te = ["value"], T = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:px-4 tpl:pb-4" }, E = ["aria-label"], D = {
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
}, Je = { class: "tpl:mt-2 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]" }, Ye = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-t tpl:px-5 tpl:py-3 tpl:border-[var(--tpl-border)]" }, Xe = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Ze = { class: "tpl:shrink-0 tpl:text-xs tpl:text-[var(--tpl-text-dim)]" }, Qe = ["value"], k = { class: "tpl:flex tpl:gap-2" }, $e = ["disabled"], A = /* @__PURE__ */ c({
	__name: "SavedBlocksBrowserModal",
	props: { visible: { type: Boolean } },
	emits: ["close", "insert"],
	setup(c, { emit: A }) {
		let et = c, j = A, tt = te(() => import("./BlockPreviewCanvas-BxSoA1QV.js").then((e) => e.n)), { t: M, format: N } = ae(), P = S(re, "SavedBlocksBrowserModal"), F = S(ie, "SavedBlocksBrowserModal"), I = s(""), L = s(""), R = s(null), z = s(null), B = s(null), V = s(""), H = s(""), U = s(null), W = s("end"), G = h(() => {
			let e = I.value.trim().toLowerCase(), t = L.value;
			return P.savedBlocks.value.filter((n) => !(e && !n.name.toLowerCase().includes(e) || t && n.category !== t));
		}), K = h(() => P.isLoading.value && P.savedBlocks.value.length === 0), nt = h(() => I.value.trim().length > 0 || L.value !== ""), q = h(() => R.value ? P.savedBlocks.value.find((e) => e.id === R.value) ?? null : null), rt = h(() => {
			let e = [{
				value: "beginning",
				label: M.savedBlocks.insertAtBeginning
			}], t = F.content.value.blocks;
			for (let n = 0; n < t.length; n++) {
				let r = t[n], i = r.type, a = M.blocks[i] ?? r.type;
				e.push({
					value: r.id,
					label: N(M.savedBlocks.insertAfterBlock, { block: `${a} ${n + 1}` })
				});
			}
			return e.push({
				value: "end",
				label: M.savedBlocks.insertAtEnd
			}), e;
		}), it = h(() => {
			if (W.value === "end") return;
			if (W.value === "beginning") return 0;
			let e = F.content.value.blocks.findIndex((e) => e.id === W.value);
			if (e !== -1) return e + 1;
		});
		r(() => et.visible, (e) => {
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
			for (let r of e.content) if (!n.has(r.type) && w[r.type] && (n.add(r.type), t.push({
				type: r.type,
				icon: w[r.type]
			})), t.length >= 5) break;
			return t;
		}
		function J(e) {
			let t = new Set(e.content.map((e) => e.type));
			return Math.max(0, t.size - 5);
		}
		function Y(e) {
			let t = e.updatedAt ?? e.createdAt;
			return t ? de(t, M.savedBlocks.time, N) ?? "" : "";
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
			P.canUpdateBlock(e) && (B.value = e.id, V.value = e.name, H.value = e.category ?? "", z.value = null, await ne(), U.value?.focus(), U.value?.select());
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
		return (r, s) => (a(), f(ue, {
			visible: c.visible,
			onClose: $,
			onKeydown: ut
		}, {
			default: ee(() => [l("div", fe, [
				l("div", pe, [l("h3", me, o(p(M).savedBlocks.browse), 1), l("button", {
					"aria-label": p(M).savedBlocks.close,
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:p-1 tpl:transition-colors tpl:duration-100 tpl:text-[var(--tpl-text-dim)]",
					onClick: $
				}, [d(p(le), {
					size: 16,
					"stroke-width": 2
				})], 8, he)]),
				l("div", ge, [l("div", _e, [
					l("div", ve, [l("div", ye, [d(p(oe), {
						size: 14,
						"stroke-width": 2,
						class: "tpl:pointer-events-none tpl:absolute tpl:left-3 tpl:top-1/2 tpl:-translate-y-1/2 tpl:text-[var(--tpl-text-dim)]"
					}), _(l("input", {
						"onUpdate:modelValue": s[0] ||= (e) => I.value = e,
						type: "text",
						placeholder: p(M).savedBlocks.search,
						disabled: K.value,
						class: "tpl:h-9 tpl:w-full tpl:rounded-md tpl:border tpl:pl-9 tpl:pr-3 tpl:text-sm tpl:outline-none tpl:disabled:opacity-50 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, null, 8, be), [[v, I.value]])]), p(P).categories.value.length > 0 ? _((a(), u("select", {
						key: 0,
						"onUpdate:modelValue": s[1] ||= (e) => L.value = e,
						"data-testid": "saved-blocks-category-filter",
						"aria-label": p(M).savedBlocks.filterByCategory,
						class: "tpl:h-8 tpl:w-full tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
					}, [l("option", Se, o(p(M).savedBlocks.allCategories), 1), (a(!0), u(m, null, e(p(P).categories.value, (e) => (a(), u("option", {
						key: e,
						value: e
					}, o(e), 9, Ce))), 128))], 8, xe)), [[b, L.value]]) : g("", !0)]),
					l("datalist", we, [(a(!0), u(m, null, e(p(P).categories.value, (e) => (a(), u("option", {
						key: e,
						value: e
					}, null, 8, Te))), 128))]),
					l("div", T, [K.value ? (a(), u("div", {
						key: 0,
						"data-testid": "saved-blocks-loading",
						class: "tpl:flex tpl:flex-col tpl:gap-1",
						role: "status",
						"aria-busy": "true",
						"aria-label": p(M).savedBlocks.loading
					}, [(a(), u(m, null, e(3, (e) => l("div", {
						key: e,
						"aria-hidden": "true",
						class: "tpl-saved-block-skeleton tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-border)]"
					}, [...s[7] ||= [l("div", { class: "tpl:h-3 tpl:w-1/2 tpl:rounded tpl:bg-[var(--tpl-bg-hover)]" }, null, -1), l("div", { class: "tpl:mt-2 tpl:h-2.5 tpl:w-1/4 tpl:rounded tpl:bg-[var(--tpl-bg-hover)]" }, null, -1)]])), 64))], 8, E)) : G.value.length > 0 ? (a(), u("div", D, [(a(!0), u(m, null, e(G.value, (r) => (a(), u(m, { key: r.id }, [B.value === r.id ? (a(), u("div", {
						key: 0,
						class: "tpl:flex tpl:w-full tpl:flex-col tpl:gap-1 tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-primary)]",
						style: { "background-color": "var(--tpl-primary-light)" },
						onFocusout: (e) => lt(e, r.id)
					}, [_(l("input", {
						ref_for: !0,
						ref: (e) => U.value = e,
						"onUpdate:modelValue": s[2] ||= (e) => V.value = e,
						type: "text",
						"aria-label": p(M).savedBlocks.rename,
						class: "tpl:h-7 tpl:w-full tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
						onKeydown: [x(y((e) => Z(r.id), ["prevent", "stop"]), ["enter"]), s[3] ||= x(y((e) => X(), ["prevent", "stop"]), ["esc"])]
					}, null, 40, Ee), [[v, V.value]]), _(l("input", {
						"onUpdate:modelValue": s[4] ||= (e) => H.value = e,
						type: "text",
						"data-testid": "saved-blocks-edit-category",
						"aria-label": p(M).savedBlocks.category,
						placeholder: p(M).savedBlocks.categoryPlaceholder,
						list: "tpl-saved-block-browser-categories",
						class: "tpl:h-7 tpl:w-full tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
						onKeydown: [x(y((e) => Z(r.id), ["prevent", "stop"]), ["enter"]), s[5] ||= x(y((e) => X(), ["prevent", "stop"]), ["esc"])]
					}, null, 40, De), [[v, H.value]])], 40, O)) : (a(), u("button", {
						key: 1,
						type: "button",
						"data-testid": "saved-block-card",
						"aria-pressed": R.value === r.id,
						class: "tpl:group/card tpl:w-full tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-md)] tpl:border tpl:bg-transparent tpl:px-3 tpl:py-2 tpl:text-left tpl:transition-all tpl:duration-[120ms]",
						style: t({
							borderColor: R.value === r.id ? "var(--tpl-primary)" : "var(--tpl-border)",
							backgroundColor: R.value === r.id ? "var(--tpl-primary-light)" : "transparent"
						}),
						onClick: (e) => R.value = r.id
					}, [
						l("div", ke, [l("span", Ae, o(r.name), 1), l("span", je, o(p(N)(p(M).savedBlocks.blockCount, { count: r.content.length })), 1)]),
						r.category ? (a(), u("div", Me, [l("span", Ne, o(r.category), 1)])) : g("", !0),
						l("div", Pe, [
							(a(!0), u(m, null, e(at(r), (e) => (a(), f(i(e.icon), {
								key: e.type,
								size: 14,
								"stroke-width": 1.5,
								class: "tpl:text-[var(--tpl-text-dim)]"
							}))), 128)),
							J(r) > 0 ? (a(), u("span", Fe, " +" + o(J(r)), 1)) : g("", !0),
							Y(r) ? (a(), u("span", {
								key: 1,
								"data-testid": "saved-block-updated",
								class: "tpl:ml-1 tpl:truncate tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]",
								title: ot(r)
							}, o(Y(r)), 9, Ie)) : g("", !0),
							z.value === r.id ? (a(), u("button", {
								key: 2,
								"aria-label": p(M).savedBlocks.deleteConfirm,
								class: "tpl:ml-auto tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:transition-colors tpl:duration-100 tpl:border-[var(--tpl-danger)] tpl:text-[var(--tpl-danger)]",
								style: { "background-color": "transparent" },
								onClick: y((e) => st(r.id), ["stop"])
							}, o(p(M).savedBlocks.deleteConfirm), 9, Le)) : (a(), u(m, { key: 3 }, [p(P).canUpdateBlock(r) ? (a(), u("button", {
								key: 0,
								class: "tpl-saved-block-rename-btn tpl:ml-auto tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:p-0.5 tpl:transition-colors tpl:duration-100 tpl:text-[var(--tpl-text-dim)]",
								"aria-label": p(M).savedBlocks.rename,
								title: p(M).savedBlocks.rename,
								onClick: y((e) => ct(r), ["stop"])
							}, [d(p(se), {
								size: 12,
								"stroke-width": 1.5
							})], 8, Re)) : g("", !0), p(P).canDeleteBlock(r) ? (a(), u("button", {
								key: 1,
								class: n(["tpl-saved-block-delete-btn tpl:cursor-pointer tpl:rounded-md tpl:border-none tpl:bg-transparent tpl:p-0.5 tpl:transition-colors tpl:duration-100 tpl:text-[var(--tpl-text-dim)]", { "tpl:ml-auto": !p(P).canUpdateBlock(r) }]),
								"aria-label": p(M).savedBlocks.delete,
								title: p(M).savedBlocks.delete,
								onClick: y((e) => z.value = r.id, ["stop"])
							}, [d(p(ce), {
								size: 12,
								"stroke-width": 1.5
							})], 10, ze)) : g("", !0)], 64))
						])
					], 12, Oe))], 64))), 128))])) : (a(), u("div", Be, [d(p(C), {
						size: 32,
						"stroke-width": 1,
						class: "tpl:text-[var(--tpl-text-dim)]"
					}), nt.value ? (a(), u("p", Ve, o(p(M).savedBlocks.noResults), 1)) : (a(), u(m, { key: 1 }, [l("p", He, o(p(M).savedBlocks.empty), 1), l("p", Ue, o(p(M).savedBlocks.emptyHint), 1)], 64))]))])
				]), l("div", We, [q.value ? (a(), u("div", Ge, [l("div", Ke, [d(p(tt), { blocks: q.value.content }, null, 8, ["blocks"])])])) : (a(), u("div", qe, [d(p(C), {
					size: 32,
					"stroke-width": 1,
					class: "tpl:text-[var(--tpl-text-dim)]"
				}), l("p", Je, o(p(M).savedBlocks.selectToPreview), 1)]))])]),
				l("div", Ye, [l("div", Xe, [l("label", Ze, o(p(M).savedBlocks.insertPosition), 1), _(l("select", {
					"onUpdate:modelValue": s[6] ||= (e) => W.value = e,
					class: "tpl:h-7 tpl:max-w-[220px] tpl:rounded-md tpl:border tpl:px-2 tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]"
				}, [(a(!0), u(m, null, e(rt.value, (e) => (a(), u("option", {
					key: e.value,
					value: e.value
				}, o(e.label), 9, Qe))), 128))], 512), [[b, W.value]])]), l("div", k, [l("button", {
					type: "button",
					"data-testid": "saved-blocks-browser-close",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]",
					onClick: $
				}, o(p(M).savedBlocks.close), 1), l("button", {
					type: "button",
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !q.value,
					onClick: Q
				}, o(p(M).savedBlocks.insert), 9, $e)])])
			])]),
			_: 1
		}, 8, ["visible"]));
	}
});
//#endregion
export { A as default };
