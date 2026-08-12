import { H as e, M as t, O as n, P as r, V as i, Z as a, ct as o, f as s, g as c, h as l, it as u, m as d, n as f, o as p, ot as m, p as h, st as ee, u as g, v as te, x as _, y as v, z as y } from "./draggable-BRF_Q_jB.js";
import { G as b, d as ne, g as re, i as ie } from "./keys-CZOBuCQd.js";
import { t as ae } from "./useI18n-aRMtgYRj.js";
import { It as oe, Lt as se, N as x, Nt as ce, R as le, at as S, d as C, jt as ue, n as w, nt as de, q as T } from "./icons-DN008liP.js";
import { t as E } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as fe } from "./useCloudI18n-CML0BxqX.js";
import { t as pe } from "./formatRelativeTime-CtUU-QZ8.js";
//#region src/cloud/components/CommentsSidebar.vue?vue&type=script&setup=true&lang.ts
var me = {
	key: 0,
	class: "tpl-comments-sidebar tpl:absolute tpl:top-14 tpl:right-0 tpl:bottom-0 tpl:z-panel tpl:flex tpl:w-[360px] tpl:flex-col tpl:border-l tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)]"
}, he = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3" }, ge = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text)]" }, _e = {
	key: 0,
	class: "tpl:ml-1 tpl:inline-flex tpl:size-5 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-[10px] tpl:font-semibold tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]"
}, ve = { class: "tpl:flex tpl:gap-1 tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-2" }, ye = { class: "tpl:flex-1 tpl:overflow-y-auto" }, be = {
	key: 0,
	class: "tpl:flex tpl:h-full tpl:items-center tpl:justify-center"
}, xe = {
	key: 1,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:px-6 tpl:text-center"
}, Se = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Ce = {
	key: 2,
	class: "tpl:flex tpl:flex-col tpl:gap-3 tpl:p-3"
}, we = { class: "tpl-comment-card tpl:rounded-lg tpl:border tpl:px-3.5 tpl:py-3" }, Te = { class: "tpl:flex tpl:items-start tpl:justify-between tpl:gap-2" }, Ee = { class: "tpl:flex tpl:items-center tpl:gap-1.5" }, De = { class: "tpl:text-xs tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Oe = { class: "tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]" }, ke = {
	key: 0,
	class: "tpl:text-[10px] tpl:italic tpl:text-[var(--tpl-text-dim)]"
}, Ae = { class: "tpl:flex tpl:items-center tpl:gap-0.5" }, je = ["title", "onClick"], Me = ["title", "onClick"], Ne = ["title", "onClick"], Pe = {
	key: 0,
	class: "tpl:mt-1 tpl:flex tpl:items-center tpl:gap-1 tpl:text-[10px] tpl:text-[var(--tpl-primary)]"
}, Fe = {
	key: 0,
	class: "tpl:mt-1 tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:bg-[var(--tpl-warning-light)] tpl:text-[var(--tpl-warning)]"
}, Ie = ["onClick"], Le = {
	key: 2,
	class: "tpl:mt-2"
}, Re = ["onKeydown"], ze = { class: "tpl:mt-1.5 tpl:flex tpl:gap-1.5" }, Be = ["disabled", "onClick"], Ve = {
	key: 3,
	class: "tpl:mt-1.5 tpl:text-xs tpl:leading-relaxed tpl:whitespace-pre-wrap tpl:text-[var(--tpl-text)]"
}, He = {
	key: 4,
	class: "tpl:mt-2 tpl:flex tpl:items-center tpl:gap-2 tpl:rounded-md tpl:px-2.5 tpl:py-2 tpl:text-xs tpl:bg-[var(--tpl-danger-light)] tpl:text-[var(--tpl-danger)]"
}, Ue = { class: "tpl:flex-1" }, We = ["onClick"], Ge = {
	key: 5,
	class: "tpl:mt-2 tpl:flex tpl:items-center tpl:gap-2"
}, Ke = ["title", "onClick"], qe = ["onClick"], Je = {
	key: 0,
	class: "tpl-comment-replies tpl:ml-5 tpl:pl-3 tpl:pt-2"
}, Ye = { class: "tpl:flex tpl:items-start tpl:justify-between tpl:gap-2" }, Xe = { class: "tpl:flex tpl:items-center tpl:gap-1.5" }, Ze = { class: "tpl:text-xs tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Qe = { class: "tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]" }, $e = {
	key: 0,
	class: "tpl:text-[10px] tpl:italic tpl:text-[var(--tpl-text-dim)]"
}, et = { class: "tpl:flex tpl:items-center tpl:gap-0.5" }, tt = ["title", "onClick"], nt = ["title", "onClick"], rt = {
	key: 0,
	class: "tpl:mt-1.5"
}, it = ["onKeydown"], at = { class: "tpl:mt-1.5 tpl:flex tpl:gap-1.5" }, ot = ["disabled", "onClick"], st = {
	key: 1,
	class: "tpl:mt-1 tpl:text-xs tpl:leading-relaxed tpl:whitespace-pre-wrap tpl:text-[var(--tpl-text)]"
}, ct = {
	key: 2,
	class: "tpl:mt-2 tpl:flex tpl:items-center tpl:gap-2 tpl:rounded-md tpl:px-2.5 tpl:py-2 tpl:text-xs tpl:bg-[var(--tpl-danger-light)] tpl:text-[var(--tpl-danger)]"
}, lt = { class: "tpl:flex-1" }, ut = ["onClick"], dt = {
	key: 0,
	class: "tpl-comment-replies tpl:ml-5 tpl:pl-3 tpl:pt-2"
}, ft = { class: "tpl:flex tpl:items-end tpl:gap-2" }, pt = ["placeholder", "onKeydown"], mt = { class: "tpl:flex tpl:shrink-0 tpl:flex-col tpl:gap-1" }, ht = ["disabled", "onClick"], gt = { class: "tpl:border-t tpl:p-3 tpl:border-[var(--tpl-border)]" }, _t = {
	key: 0,
	class: "tpl:flex tpl:min-h-[68px] tpl:items-center tpl:rounded-md tpl:px-3 tpl:py-2 tpl:text-xs tpl:bg-[var(--tpl-warning-light)] tpl:text-[var(--tpl-warning)]"
}, vt = {
	key: 1,
	class: "tpl-comments-input-wrapper tpl:flex tpl:min-h-[68px] tpl:items-end tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:border tpl:px-3 tpl:py-2 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)]"
}, yt = ["placeholder", "disabled"], bt = ["disabled"], D = /*#__PURE__*/ E(/* @__PURE__ */ _({
	__name: "CommentsSidebar",
	props: { visible: { type: Boolean } },
	emits: ["close", "filterBlock"],
	setup(_, { expose: E, emit: D }) {
		let xt = _, O = D, { format: k } = ae(), { t: A } = fe(), j = b(re, "CommentsSidebar"), St = b(ie, "CommentsSidebar"), M = b(ne, "CommentsSidebar"), N = a("unresolved"), P = a(null), F = a(""), I = a(null), L = a(""), R = a(null), z = a(""), B = a(/* @__PURE__ */ new Set()), V = a(null), H = a(null), Ct = s(() => St.userConfig?.id ?? null), wt = s(() => {
			let e = /* @__PURE__ */ new Set();
			for (let t of j.content.value.blocks) if (e.add(t.id), t.type === "section") for (let n of t.children) for (let t of n) e.add(t.id);
			return e;
		});
		function Tt(e) {
			return e ? !wt.value.has(e) : !1;
		}
		let Et = s(() => N.value !== "block" || !P.value ? !1 : !(j.savedBlockIds?.value.has(P.value) ?? !0)), U = s(() => {
			let e = M.comments.value;
			return N.value === "unresolved" ? e = e.filter((e) => !e.resolved_at) : N.value === "block" && P.value && (e = e.filter((e) => e.block_id === P.value)), e;
		});
		y(() => xt.visible, (e) => {
			e && M.loadComments();
		}), y(() => j.state.selectedBlockId, (e) => {
			N.value === "block" && e && (P.value = e);
		});
		function W(e, t) {
			N.value = e, P.value = e === "block" ? t ?? null : null;
		}
		function Dt(e) {
			W("block", e), O("filterBlock", e);
		}
		function Ot(e) {
			B.value.has(e) ? B.value.delete(e) : B.value.add(e);
		}
		function kt(e) {
			I.value = e, L.value = "", R.value = null, B.value.has(e) || B.value.add(e);
		}
		function At() {
			I.value = null, L.value = "";
		}
		function G(e) {
			R.value = e.id, z.value = e.body, I.value = null;
		}
		function K() {
			R.value = null, z.value = "";
		}
		function q(e) {
			V.value = e;
		}
		function J() {
			V.value = null;
		}
		async function Y() {
			let e = F.value.trim();
			e && (await M.addComment(e, (N.value === "block" ? P.value : void 0) ?? void 0), F.value = "");
		}
		async function X(e) {
			let t = L.value.trim();
			if (!t) return;
			let n = M.comments.value.find((t) => t.id === e);
			await M.addComment(t, n?.block_id ?? void 0, e), I.value = null, L.value = "";
		}
		async function Z(e) {
			let t = z.value.trim();
			t && (await M.editComment(e, t), R.value = null, z.value = "");
		}
		async function Q(e) {
			await M.removeComment(e), V.value = null;
		}
		async function jt(e) {
			await M.toggleResolve(e);
		}
		function $(e) {
			return e.author_identifier === Ct.value;
		}
		function Mt(e) {
			return pe(e, A.snapshotHistory) ?? e;
		}
		function Nt(e) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Y());
		}
		function Pt(e, t) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), X(t));
		}
		function Ft(e, t) {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Z(t)), e.key === "Escape" && K();
		}
		function It() {
			n(() => {
				H.value?.focus();
			});
		}
		return E({
			filterByBlock: Dt,
			focusNewComment: It
		}), (n, a) => (t(), d(f, {
			"enter-active-class": "tpl-comments-slide-enter-active",
			"enter-from-class": "tpl:translate-x-full",
			"enter-to-class": "tpl:translate-x-0",
			"leave-active-class": "tpl-comments-slide-leave-active",
			"leave-from-class": "tpl:translate-x-0",
			"leave-to-class": "tpl:translate-x-full"
		}, {
			default: i(() => [_.visible ? (t(), c("div", me, [
				h("div", he, [h("div", ge, [
					v(u(de), {
						size: 13,
						"stroke-width": 2
					}),
					h("span", null, o(u(A).comments.title), 1),
					u(M).unresolvedCount.value > 0 ? (t(), c("span", _e, o(u(M).unresolvedCount.value), 1)) : l("", !0)
				]), h("button", {
					class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
					onClick: a[0] ||= (e) => O("close")
				}, [v(u(w), {
					size: 14,
					"stroke-width": 2
				})])]),
				h("div", ve, [
					h("button", {
						class: m(["tpl-comment-filter tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:transition-colors tpl:duration-150", N.value === "unresolved" ? "tpl-comment-filter--active" : ""]),
						onClick: a[1] ||= (e) => W("unresolved")
					}, o(u(A).comments.filterUnresolved), 3),
					h("button", {
						class: m(["tpl-comment-filter tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:transition-colors tpl:duration-150", N.value === "all" ? "tpl-comment-filter--active" : ""]),
						onClick: a[2] ||= (e) => W("all")
					}, o(u(A).comments.filterAll), 3),
					u(j).state.selectedBlockId ? (t(), c("button", {
						key: 0,
						class: m(["tpl-comment-filter tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:transition-colors tpl:duration-150", N.value === "block" ? "tpl-comment-filter--active" : ""]),
						onClick: a[3] ||= (e) => W("block", u(j).state.selectedBlockId ?? void 0)
					}, o(u(A).comments.filterBlock), 3)) : l("", !0)
				]),
				h("div", ye, [u(M).isLoading.value ? (t(), c("div", be, [v(u(S), {
					class: "tpl-spinner tpl:text-[var(--tpl-text-muted)]",
					size: 24,
					"stroke-width": 2
				})])) : U.value.length === 0 ? (t(), c("div", xe, [v(u(de), {
					size: 32,
					"stroke-width": 1.5,
					class: "tpl:text-[var(--tpl-text-dim)]"
				}), h("p", Se, o(N.value === "all" ? u(A).comments.noCommentsHint : u(A).comments.noComments), 1)])) : (t(), c("div", Ce, [(t(!0), c(g, null, r(U.value, (n) => (t(), c("div", {
					key: n.id,
					class: "tpl-comment-thread"
				}, [
					h("div", we, [
						h("div", Te, [h("div", Ee, [
							h("span", De, o($(n) ? u(A).comments.ownedByYou : n.author_name), 1),
							h("span", Oe, o(Mt(n.created_at)), 1),
							n.updated_at === n.created_at ? l("", !0) : (t(), c("span", ke, " (" + o(u(A).comments.edited) + ") ", 1))
						]), h("div", Ae, [
							h("button", {
								class: "tpl-comment-action tpl:rounded tpl:p-1 tpl:transition-colors tpl:duration-150",
								title: n.resolved_at ? u(A).comments.unresolve : u(A).comments.resolve,
								onClick: (e) => jt(n.id)
							}, [v(u(ue), {
								size: 13,
								"stroke-width": 2,
								class: "tpl-resolve-icon",
								style: ee({ color: n.resolved_at ? "var(--tpl-primary)" : void 0 })
							}, null, 8, ["style"])], 8, je),
							$(n) ? (t(), c("button", {
								key: 0,
								class: "tpl-comment-action tpl:rounded tpl:p-1 tpl:transition-colors tpl:duration-150",
								title: u(A).comments.edit,
								onClick: (e) => G(n)
							}, [v(u(T), {
								size: 12,
								"stroke-width": 2
							})], 8, Me)) : l("", !0),
							$(n) ? (t(), c("button", {
								key: 1,
								class: "tpl-comment-action tpl-comment-delete tpl:rounded tpl:p-1 tpl:transition-colors tpl:duration-150",
								title: u(A).comments.delete,
								onClick: (e) => q(n.id)
							}, [v(u(C), {
								size: 12,
								"stroke-width": 2
							})], 8, Ne)) : l("", !0)
						])]),
						v(f, { name: "tpl-resolve" }, {
							default: i(() => [n.resolved_at ? (t(), c("div", Pe, [v(u(se), {
								size: 10,
								"stroke-width": 2.5
							}), h("span", null, o(u(k)(u(A).comments.resolvedBy, { name: n.resolved_by_name ?? "" })), 1)])) : l("", !0)]),
							_: 2
						}, 1024),
						n.block_id && Tt(n.block_id) ? (t(), c("span", Fe, o(u(A).comments.missingBlock), 1)) : n.block_id ? (t(), c("button", {
							key: 1,
							class: "tpl:mt-1 tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[10px] tpl:font-medium tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)]",
							onClick: (e) => u(j).selectBlock(n.block_id ?? "")
						}, " Block ", 8, Ie)) : l("", !0),
						R.value === n.id ? (t(), c("div", Le, [e(h("textarea", {
							"onUpdate:modelValue": a[4] ||= (e) => z.value = e,
							class: "tpl:w-full tpl:resize-none tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-2 tpl:font-sans tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
							rows: "3",
							onKeydown: (e) => Ft(e, n.id)
						}, null, 40, Re), [[p, z.value]]), h("div", ze, [h("button", {
							class: "tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
							disabled: !z.value.trim() || u(M).isSubmitting.value,
							onClick: (e) => Z(n.id)
						}, o(u(A).comments.save), 9, Be), h("button", {
							class: "tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
							onClick: a[5] ||= (e) => K()
						}, o(u(A).comments.cancel), 1)])])) : (t(), c("p", Ve, o(n.body), 1)),
						V.value === n.id ? (t(), c("div", He, [
							h("span", Ue, o(u(A).comments.deleteConfirm), 1),
							h("button", {
								class: "tpl:rounded tpl:px-2 tpl:py-0.5 tpl:text-xs tpl:font-medium tpl:bg-[var(--tpl-danger)] tpl:text-[var(--tpl-bg)]",
								onClick: (e) => Q(n.id)
							}, o(u(A).comments.delete), 9, We),
							h("button", {
								class: "tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
								onClick: a[6] ||= (e) => J()
							}, o(u(A).comments.cancel), 1)
						])) : l("", !0),
						R.value !== n.id && V.value !== n.id ? (t(), c("div", Ge, [h("button", {
							class: "tpl-comment-action tpl:rounded tpl:p-1 tpl:transition-colors tpl:duration-150",
							title: u(A).comments.reply,
							onClick: (e) => kt(n.id)
						}, [v(u(le), {
							size: 13,
							"stroke-width": 2,
							class: "tpl:text-[var(--tpl-primary)]"
						})], 8, Ke), (n.replies?.length ?? 0) > 0 ? (t(), c("button", {
							key: 0,
							class: "tpl:flex tpl:items-center tpl:gap-0.5 tpl:text-[11px] tpl:font-medium tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
							onClick: (e) => Ot(n.id)
						}, [B.value.has(n.id) ? (t(), d(u(ce), {
							key: 0,
							size: 11,
							"stroke-width": 2
						})) : (t(), d(u(oe), {
							key: 1,
							size: 11,
							"stroke-width": 2
						})), te(" " + o((n.replies?.length ?? 0) === 1 ? u(k)(u(A).comments.replyOne, { count: String(n.replies?.length ?? 0) }) : u(k)(u(A).comments.replyMany, { count: String(n.replies?.length ?? 0) })), 1)], 8, qe)) : l("", !0)])) : l("", !0)
					]),
					v(f, { name: "tpl-replies" }, {
						default: i(() => [B.value.has(n.id) && (n.replies?.length ?? 0) > 0 ? (t(), c("div", Je, [(t(!0), c(g, null, r(n.replies, (r, i) => (t(), c("div", {
							key: r.id,
							class: m(["tpl-comment-reply-card tpl:relative tpl:rounded-lg tpl:border tpl:px-3.5 tpl:py-2.5", i < (n.replies?.length ?? 0) - 1 ? "tpl:mb-2" : ""])
						}, [
							h("div", Ye, [h("div", Xe, [
								h("span", Ze, o($(r) ? u(A).comments.ownedByYou : r.author_name), 1),
								h("span", Qe, o(Mt(r.created_at)), 1),
								r.updated_at === r.created_at ? l("", !0) : (t(), c("span", $e, " (" + o(u(A).comments.edited) + ") ", 1))
							]), h("div", et, [$(r) ? (t(), c("button", {
								key: 0,
								class: "tpl-comment-action tpl:rounded tpl:p-1 tpl:transition-colors tpl:duration-150",
								title: u(A).comments.edit,
								onClick: (e) => G(r)
							}, [v(u(T), {
								size: 11,
								"stroke-width": 2
							})], 8, tt)) : l("", !0), $(r) ? (t(), c("button", {
								key: 1,
								class: "tpl-comment-action tpl-comment-delete tpl:rounded tpl:p-1 tpl:transition-colors tpl:duration-150",
								title: u(A).comments.delete,
								onClick: (e) => q(r.id)
							}, [v(u(C), {
								size: 11,
								"stroke-width": 2
							})], 8, nt)) : l("", !0)])]),
							R.value === r.id ? (t(), c("div", rt, [e(h("textarea", {
								"onUpdate:modelValue": a[7] ||= (e) => z.value = e,
								class: "tpl:w-full tpl:resize-none tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-2 tpl:font-sans tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
								rows: "2",
								onKeydown: (e) => Ft(e, r.id)
							}, null, 40, it), [[p, z.value]]), h("div", at, [h("button", {
								class: "tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
								disabled: !z.value.trim() || u(M).isSubmitting.value,
								onClick: (e) => Z(r.id)
							}, o(u(A).comments.save), 9, ot), h("button", {
								class: "tpl:rounded-md tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
								onClick: a[8] ||= (e) => K()
							}, o(u(A).comments.cancel), 1)])])) : (t(), c("p", st, o(r.body), 1)),
							V.value === r.id ? (t(), c("div", ct, [
								h("span", lt, o(u(A).comments.deleteConfirm), 1),
								h("button", {
									class: "tpl:rounded tpl:px-2 tpl:py-0.5 tpl:text-xs tpl:font-medium tpl:bg-[var(--tpl-danger)] tpl:text-[var(--tpl-bg)]",
									onClick: (e) => Q(r.id)
								}, o(u(A).comments.delete), 9, ut),
								h("button", {
									class: "tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)]",
									onClick: a[9] ||= (e) => J()
								}, o(u(A).comments.cancel), 1)
							])) : l("", !0)
						], 2))), 128))])) : l("", !0)]),
						_: 2
					}, 1024),
					v(f, { name: "tpl-replies" }, {
						default: i(() => [I.value === n.id ? (t(), c("div", dt, [h("div", ft, [e(h("textarea", {
							"onUpdate:modelValue": a[10] ||= (e) => L.value = e,
							class: "tpl:flex-1 tpl:resize-none tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-2 tpl:font-sans tpl:text-xs tpl:outline-none tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text)]",
							placeholder: u(A).comments.replyPlaceholder,
							rows: "2",
							onKeydown: (e) => Pt(e, n.id)
						}, null, 40, pt), [[p, L.value]]), h("div", mt, [h("button", {
							class: "tpl:flex tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1.5 tpl:transition-colors tpl:duration-150 tpl:disabled:opacity-40 tpl:text-[var(--tpl-primary)]",
							disabled: !L.value.trim() || u(M).isSubmitting.value,
							onClick: (e) => X(n.id)
						}, [v(u(x), {
							size: 14,
							"stroke-width": 2
						})], 8, ht), h("button", {
							class: "tpl:flex tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
							onClick: a[11] ||= (e) => At()
						}, [v(u(w), {
							size: 14,
							"stroke-width": 2
						})])])])])) : l("", !0)]),
						_: 2
					}, 1024)
				]))), 128))]))]),
				h("div", gt, [Et.value ? (t(), c("div", _t, o(u(A).comments.saveTemplateFirst), 1)) : (t(), c("div", vt, [e(h("textarea", {
					ref_key: "newCommentInput",
					ref: H,
					"onUpdate:modelValue": a[12] ||= (e) => F.value = e,
					class: "tpl:max-h-24 tpl:min-h-[48px] tpl:flex-1 tpl:resize-none tpl:border-none tpl:bg-transparent tpl:font-sans tpl:text-xs tpl:outline-none tpl:text-[var(--tpl-text)]",
					placeholder: u(A).comments.placeholder,
					disabled: u(M).isSubmitting.value,
					rows: "2",
					onKeydown: Nt
				}, null, 40, yt), [[p, F.value]]), h("button", {
					class: "tpl-comments-send-btn tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1.5 tpl:transition-all tpl:duration-150 tpl:disabled:opacity-40 tpl:text-[var(--tpl-primary)]",
					disabled: !F.value.trim() || u(M).isSubmitting.value,
					onClick: Y
				}, [u(M).isSubmitting.value ? (t(), d(u(S), {
					key: 0,
					class: "tpl-spinner",
					size: 16,
					"stroke-width": 2
				})) : (t(), d(u(x), {
					key: 1,
					size: 16,
					"stroke-width": 2
				}))], 8, bt)]))])
			])) : l("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d204f573"]]);
//#endregion
export { D as default };

//# sourceMappingURL=CommentsSidebar-FPbg-FuU.js.map