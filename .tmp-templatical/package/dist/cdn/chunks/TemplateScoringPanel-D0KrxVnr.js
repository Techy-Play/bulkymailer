import { L as e, M as t, P as n, T as r, V as i, Z as a, ct as o, g as s, h as c, it as l, m as u, n as d, ot as ee, p as f, st as p, u as m, v as h, x as g, y as _, z as te } from "./draggable-BRF_Q_jB.js";
import { E as ne, G as v, g as y, z as b } from "./keys-CZOBuCQd.js";
import { A as x, B as S, E as C, It as re, Mt as w, at as ie, ft as ae, k as oe, n as se, t as ce, u as le, wt as ue } from "./icons-DN008liP.js";
import { t as T } from "./LoadingTrack-CiNg9s16.js";
import { t as E } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as D } from "./useCloudI18n-CML0BxqX.js";
//#region src/cloud/utils/scoringStyles.ts
function O(e) {
	return e >= 80 ? "var(--tpl-success)" : e >= 60 ? "var(--tpl-warning)" : "var(--tpl-danger)";
}
function k(e) {
	return e >= 80 ? "var(--tpl-success-light)" : e >= 60 ? "var(--tpl-warning-light)" : "var(--tpl-danger-light)";
}
function A(e) {
	return e === "high" ? "var(--tpl-danger)" : e === "medium" ? "var(--tpl-warning)" : "var(--tpl-text-muted)";
}
function j(e) {
	return e === "high" ? "var(--tpl-danger-light)" : e === "medium" ? "var(--tpl-warning-light)" : "var(--tpl-bg-hover)";
}
//#endregion
//#region src/cloud/components/TemplateScoringPanel.vue?vue&type=script&setup=true&lang.ts
var M = {
	key: 0,
	class: "tpl-scoring-panel tpl:absolute tpl:top-14 tpl:right-0 tpl:bottom-0 tpl:z-panel tpl:flex tpl:w-[360px] tpl:flex-col tpl:border-l tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)]"
}, N = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3" }, P = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-primary)]" }, F = { class: "tpl:flex tpl:items-center tpl:gap-1" }, I = ["title"], L = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4" }, R = {
	key: 0,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, z = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, B = {
	key: 1,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, V = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, H = {
	key: 2,
	class: "tpl:flex tpl:flex-col tpl:gap-4"
}, U = { class: "tpl:text-xs tpl:font-medium tpl:uppercase tpl:tracking-wider tpl:text-[var(--tpl-text-muted)]" }, de = {
	key: 0,
	class: "tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, fe = {
	key: 0,
	class: "tpl:flex tpl:items-start tpl:gap-2 tpl:rounded-lg tpl:px-3 tpl:py-2 tpl:text-xs tpl:bg-[var(--tpl-danger-light)] tpl:text-[var(--tpl-danger)]"
}, pe = ["onClick"], me = { class: "tpl:flex-1 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]" }, he = {
	key: 0,
	class: "tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]"
}, ge = {
	key: 0,
	class: "tpl:border-t tpl:border-[var(--tpl-border)]"
}, _e = {
	key: 0,
	class: "tpl:px-3 tpl:py-3 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, ve = { class: "tpl:flex tpl:items-start tpl:gap-2" }, ye = { class: "tpl:flex-1 tpl:min-w-0" }, be = { class: "tpl:flex tpl:items-start tpl:gap-1.5" }, xe = { class: "tpl:text-xs tpl:leading-snug tpl:text-[var(--tpl-text)]" }, Se = {
	key: 0,
	class: "tpl:mt-1 tpl:text-[11px] tpl:leading-snug tpl:text-[var(--tpl-text-dim)]"
}, Ce = {
	key: 1,
	class: "tpl:mt-2 tpl:flex tpl:justify-center"
}, we = ["disabled", "onClick"], Te = {
	key: 0,
	class: "tpl:mt-1.5 tpl:text-[11px] tpl:text-[var(--tpl-danger)]"
}, Ee = {
	key: 3,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, De = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Oe = { class: "tpl:m-0 tpl:px-4 tpl:pb-2 tpl:pt-2 tpl:text-center tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, W = /*#__PURE__*/ E(/* @__PURE__ */ g({
	__name: "TemplateScoringPanel",
	props: { visible: { type: Boolean } },
	emits: ["close"],
	setup(g, { emit: E }) {
		let W = g, G = E, { t: K } = D(), q = v(y, "TemplateScoringPanel"), J = v(b, "TemplateScoringPanel"), Y = r(ne, []), X = a({
			spam: !0,
			readability: !0,
			accessibility: !0,
			bestPractices: !0
		});
		function ke(e) {
			X.value[e] = !X.value[e];
		}
		let Z = [
			"spam",
			"readability",
			"accessibility",
			"bestPractices"
		], Ae = {
			spam: oe,
			readability: ue,
			accessibility: C,
			bestPractices: ce
		};
		function Q() {
			J.score(q.content.value, Y);
		}
		te(() => W.visible, (e) => {
			e && !J.scoringResult.value && !J.isScoring.value && Q();
		});
		async function je(e) {
			if (!e.blockId) return;
			let t = q.content.value.blocks.find((t) => t.id === e.blockId);
			if (!t) return;
			let n = t.content;
			if (!n) return;
			let r = await J.fixFinding(n, e, Y);
			r && (q.updateBlock(e.blockId, { content: r }), J.removeFinding(e.category, e.id));
		}
		function $() {
			return J.scoringResult.value ? Z.reduce((e, t) => e + (J.scoringResult.value?.categories[t]?.findings.length ?? 0), 0) : 0;
		}
		return (r, a) => (t(), u(d, {
			"enter-active-class": "tpl-scoring-slide-enter-active",
			"enter-from-class": "tpl:translate-x-full",
			"enter-to-class": "tpl:translate-x-0",
			"leave-active-class": "tpl-scoring-slide-leave-active",
			"leave-from-class": "tpl:translate-x-0",
			"leave-to-class": "tpl:translate-x-full"
		}, {
			default: i(() => [g.visible ? (t(), s("div", M, [f("div", N, [f("div", P, [_(l(x), {
				size: 13,
				"stroke-width": 2
			}), f("span", null, o(l(K).scoring.title), 1)]), f("div", F, [l(J).scoringResult.value && !l(J).isScoring.value ? (t(), s("button", {
				key: 0,
				class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
				title: l(K).scoring.rescore,
				onClick: a[0] ||= (e) => Q()
			}, [_(l(S), {
				size: 14,
				"stroke-width": 2
			})], 8, I)) : c("", !0), f("button", {
				class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
				onClick: a[1] ||= (e) => G("close")
			}, [_(l(se), {
				size: 14,
				"stroke-width": 2
			})])])]), f("div", L, [l(J).isScoring.value ? (t(), s("div", R, [f("p", z, o(l(K).scoring.scoring), 1), _(T, { class: "tpl:w-3/4" })])) : l(J).error.value && !l(J).scoringResult.value ? (t(), s("div", B, [
				_(l(w), {
					size: 32,
					"stroke-width": 1.5,
					class: "tpl:text-[var(--tpl-danger)]"
				}),
				f("p", V, o(l(K).scoring.error), 1),
				f("button", {
					class: "tpl:mt-2 tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-muted)]",
					onClick: a[2] ||= (e) => Q()
				}, [_(l(S), {
					size: 12,
					"stroke-width": 2
				}), h(" " + o(l(K).scoring.rescore), 1)])
			])) : l(J).scoringResult.value ? (t(), s("div", H, [
				f("div", {
					class: "tpl:flex tpl:flex-col tpl:items-center tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:p-5",
					style: p({ backgroundColor: l(k)(l(J).scoringResult.value.score) })
				}, [
					f("span", {
						class: "tpl:text-4xl tpl:font-bold tpl:tabular-nums",
						style: p({ color: l(O)(l(J).scoringResult.value.score) })
					}, o(l(J).scoringResult.value.score), 5),
					f("span", U, o(l(K).scoring.overallScore), 1),
					$() > 0 ? (t(), s("span", de, o($()) + " " + o(l(K).scoring.findings), 1)) : c("", !0)
				], 4),
				l(J).fixError.value ? (t(), s("div", fe, [_(l(w), {
					size: 14,
					"stroke-width": 2,
					class: "tpl:mt-0.5 tpl:shrink-0"
				}), f("span", null, o(l(K).scoring.fixError), 1)])) : c("", !0),
				(t(), s(m, null, n(Z, (r) => f("div", {
					key: r,
					class: "tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)]"
				}, [f("button", {
					class: "tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:gap-2.5 tpl:px-3 tpl:py-2.5 tpl:text-left tpl:transition-colors tpl:duration-100 tpl:bg-[var(--tpl-bg)]",
					onClick: (e) => ke(r)
				}, [
					(t(), u(e(Ae[r]), {
						size: 14,
						"stroke-width": 2,
						style: p({ color: l(O)(l(J).scoringResult.value.categories[r].score) })
					}, null, 8, ["style"])),
					f("span", me, o(l(K).scoring.categories[r]), 1),
					f("span", {
						class: "tpl:rounded-full tpl:px-2 tpl:py-0.5 tpl:text-xs tpl:font-semibold tpl:tabular-nums",
						style: p({
							color: l(O)(l(J).scoringResult.value.categories[r].score),
							backgroundColor: l(k)(l(J).scoringResult.value.categories[r].score)
						})
					}, o(l(J).scoringResult.value.categories[r].score), 5),
					l(J).scoringResult.value.categories[r].findings.length > 0 ? (t(), s("span", he, o(l(J).scoringResult.value.categories[r].findings.length), 1)) : c("", !0),
					_(l(re), {
						size: 12,
						"stroke-width": 2,
						class: ee(["tpl:transition-transform tpl:duration-200 tpl:text-[var(--tpl-text-dim)]", X.value[r] ? "tpl:rotate-0" : "tpl:-rotate-90"])
					}, null, 8, ["class"])
				], 8, pe), X.value[r] ? (t(), s("div", ge, [l(J).scoringResult.value.categories[r].findings.length === 0 ? (t(), s("div", _e, o(l(K).scoring.noFindings), 1)) : c("", !0), (t(!0), s(m, null, n(l(J).scoringResult.value.categories[r].findings, (n) => (t(), s("div", {
					key: n.id,
					class: "tpl:border-t tpl:px-3 tpl:py-2.5 first:tpl:border-t-0 tpl:border-[var(--tpl-border-light)]"
				}, [f("div", ve, [(t(), u(e(l(n.severity === "high" ? w : n.severity === "medium" ? le : ae)), {
					size: 13,
					"stroke-width": 2,
					class: "tpl:mt-0.5 tpl:shrink-0",
					style: p({ color: l(A)(n.severity) })
				}, null, 8, ["style"])), f("div", ye, [
					f("div", be, [f("span", {
						class: "tpl:mt-0.5 tpl:shrink-0 tpl:rounded tpl:px-1 tpl:py-px tpl:text-[10px] tpl:font-medium tpl:leading-tight",
						style: p({
							color: l(A)(n.severity),
							backgroundColor: l(j)(n.severity)
						})
					}, o(l(K).scoring.severity[n.severity]), 5), f("span", xe, o(n.message), 1)]),
					n.suggestion ? (t(), s("p", Se, o(n.suggestion), 1)) : c("", !0),
					n.blockId ? (t(), s("div", Ce, [f("button", {
						class: "tpl-scoring-fix-btn tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded tpl:border tpl:px-3 tpl:py-1.5 tpl:text-[11px] tpl:font-medium tpl:transition-all tpl:duration-150 tpl:disabled:opacity-50 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-primary)]",
						style: { "background-color": "transparent" },
						disabled: l(J).fixingFindingId.value !== null,
						onClick: (e) => je(n)
					}, [l(J).fixingFindingId.value === n.id ? (t(), u(l(ie), {
						key: 0,
						class: "tpl-spinner",
						size: 11,
						"stroke-width": 2
					})) : (t(), u(l(C), {
						key: 1,
						size: 11,
						"stroke-width": 2
					})), h(" " + o(l(J).fixingFindingId.value === n.id ? l(K).scoring.fixing : l(K).scoring.fix), 1)], 8, we), l(J).fixError.value ? (t(), s("p", Te, o(l(J).fixError.value), 1)) : c("", !0)])) : c("", !0)
				])])]))), 128))])) : c("", !0)])), 64))
			])) : (t(), s("div", Ee, [_(l(x), {
				size: 32,
				"stroke-width": 1.5,
				class: "tpl:text-[var(--tpl-text-dim)]"
			}), f("p", De, o(l(K).scoring.emptyState), 1)])), f("p", Oe, o(l(K).aiMenu.disclaimer), 1)])])) : c("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c23c73d4"]]);
//#endregion
export { W as default };

//# sourceMappingURL=TemplateScoringPanel-D0KrxVnr.js.map