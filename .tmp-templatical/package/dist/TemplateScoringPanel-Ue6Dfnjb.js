import { A as e, Dt as t, Et as n, I as r, N as i, O as a, Ot as o, R as ee, Y as s, _ as c, c as l, d as u, h as d, l as f, m as p, nt as m, r as h, u as g, x as te } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { t as ne } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { E as re, G as _, g as ie, z as v } from "./keys-BI6VSUh4.js";
import { t as y } from "./createLucideIcon-D7GKhya2.js";
import { t as b } from "./chevron-down-CYOoeGBd.js";
import { t as x } from "./circle-alert-6q_jgtv_.js";
import { n as S, t as C } from "./refresh-cw-Z4wXfduO.js";
import { t as ae } from "./info-DSYRzSZo.js";
import { t as w } from "./loader-circle-GADaYcyQ.js";
import { t as T } from "./shield-check-Cm0RePnW.js";
import { t as E } from "./sparkles-BHEE-vRD.js";
import { t as oe } from "./triangle-alert-CiN0ssB3.js";
import { t as se } from "./x-B4WnJVRx.js";
import { t as ce } from "./LoadingTrack-DH3OEM3z.js";
import { t as D } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as le } from "./useCloudI18n-KgIWl-IE.js";
var O = y("shield-x", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "m14.5 9.5-5 5",
		key: "17q4r4"
	}],
	["path", {
		d: "m9.5 9.5 5 5",
		key: "18nt4w"
	}]
]), k = y("zap", [["path", {
	d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
	key: "1v7up4"
}]]);
//#endregion
//#region src/cloud/utils/scoringStyles.ts
function A(e) {
	return e >= 80 ? "var(--tpl-success)" : e >= 60 ? "var(--tpl-warning)" : "var(--tpl-danger)";
}
function j(e) {
	return e >= 80 ? "var(--tpl-success-light)" : e >= 60 ? "var(--tpl-warning-light)" : "var(--tpl-danger-light)";
}
function M(e) {
	return e === "high" ? "var(--tpl-danger)" : e === "medium" ? "var(--tpl-warning)" : "var(--tpl-text-muted)";
}
function N(e) {
	return e === "high" ? "var(--tpl-danger-light)" : e === "medium" ? "var(--tpl-warning-light)" : "var(--tpl-bg-hover)";
}
//#endregion
//#region src/cloud/components/TemplateScoringPanel.vue?vue&type=script&setup=true&lang.ts
var P = {
	key: 0,
	class: "tpl-scoring-panel tpl:absolute tpl:top-14 tpl:right-0 tpl:bottom-0 tpl:z-panel tpl:flex tpl:w-[360px] tpl:flex-col tpl:border-l tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)]"
}, F = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3" }, I = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-primary)]" }, L = { class: "tpl:flex tpl:items-center tpl:gap-1" }, R = ["title"], z = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4" }, B = {
	key: 0,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, V = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, H = {
	key: 1,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, U = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, W = {
	key: 2,
	class: "tpl:flex tpl:flex-col tpl:gap-4"
}, ue = { class: "tpl:text-xs tpl:font-medium tpl:uppercase tpl:tracking-wider tpl:text-[var(--tpl-text-muted)]" }, de = {
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
}, De = { class: "tpl:max-w-[240px] tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Oe = { class: "tpl:m-0 tpl:px-4 tpl:pb-2 tpl:pt-2 tpl:text-center tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, G = /*#__PURE__*/ D(/* @__PURE__ */ c({
	__name: "TemplateScoringPanel",
	props: { visible: { type: Boolean } },
	emits: ["close"],
	setup(c, { emit: y }) {
		let D = c, G = y, { t: K } = le(), q = _(ie, "TemplateScoringPanel"), J = _(v, "TemplateScoringPanel"), Y = te(re, []), X = s({
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
			spam: O,
			readability: S,
			accessibility: E,
			bestPractices: k
		};
		function Q() {
			J.score(q.content.value, Y);
		}
		r(() => D.visible, (e) => {
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
		return (r, s) => (a(), f(ne, {
			"enter-active-class": "tpl-scoring-slide-enter-active",
			"enter-from-class": "tpl:translate-x-full",
			"enter-to-class": "tpl:translate-x-0",
			"leave-active-class": "tpl-scoring-slide-leave-active",
			"leave-from-class": "tpl:translate-x-0",
			"leave-to-class": "tpl:translate-x-full"
		}, {
			default: ee(() => [c.visible ? (a(), u("div", P, [l("div", F, [l("div", I, [d(m(T), {
				size: 13,
				"stroke-width": 2
			}), l("span", null, o(m(K).scoring.title), 1)]), l("div", L, [m(J).scoringResult.value && !m(J).isScoring.value ? (a(), u("button", {
				key: 0,
				class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
				title: m(K).scoring.rescore,
				onClick: s[0] ||= (e) => Q()
			}, [d(m(C), {
				size: 14,
				"stroke-width": 2
			})], 8, R)) : g("", !0), l("button", {
				class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
				onClick: s[1] ||= (e) => G("close")
			}, [d(m(se), {
				size: 14,
				"stroke-width": 2
			})])])]), l("div", z, [m(J).isScoring.value ? (a(), u("div", B, [l("p", V, o(m(K).scoring.scoring), 1), d(ce, { class: "tpl:w-3/4" })])) : m(J).error.value && !m(J).scoringResult.value ? (a(), u("div", H, [
				d(m(x), {
					size: 32,
					"stroke-width": 1.5,
					class: "tpl:text-[var(--tpl-danger)]"
				}),
				l("p", U, o(m(K).scoring.error), 1),
				l("button", {
					class: "tpl:mt-2 tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-muted)]",
					onClick: s[2] ||= (e) => Q()
				}, [d(m(C), {
					size: 12,
					"stroke-width": 2
				}), p(" " + o(m(K).scoring.rescore), 1)])
			])) : m(J).scoringResult.value ? (a(), u("div", W, [
				l("div", {
					class: "tpl:flex tpl:flex-col tpl:items-center tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:p-5",
					style: t({ backgroundColor: m(j)(m(J).scoringResult.value.score) })
				}, [
					l("span", {
						class: "tpl:text-4xl tpl:font-bold tpl:tabular-nums",
						style: t({ color: m(A)(m(J).scoringResult.value.score) })
					}, o(m(J).scoringResult.value.score), 5),
					l("span", ue, o(m(K).scoring.overallScore), 1),
					$() > 0 ? (a(), u("span", de, o($()) + " " + o(m(K).scoring.findings), 1)) : g("", !0)
				], 4),
				m(J).fixError.value ? (a(), u("div", fe, [d(m(x), {
					size: 14,
					"stroke-width": 2,
					class: "tpl:mt-0.5 tpl:shrink-0"
				}), l("span", null, o(m(K).scoring.fixError), 1)])) : g("", !0),
				(a(), u(h, null, e(Z, (r) => l("div", {
					key: r,
					class: "tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)]"
				}, [l("button", {
					class: "tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:gap-2.5 tpl:px-3 tpl:py-2.5 tpl:text-left tpl:transition-colors tpl:duration-100 tpl:bg-[var(--tpl-bg)]",
					onClick: (e) => ke(r)
				}, [
					(a(), f(i(Ae[r]), {
						size: 14,
						"stroke-width": 2,
						style: t({ color: m(A)(m(J).scoringResult.value.categories[r].score) })
					}, null, 8, ["style"])),
					l("span", me, o(m(K).scoring.categories[r]), 1),
					l("span", {
						class: "tpl:rounded-full tpl:px-2 tpl:py-0.5 tpl:text-xs tpl:font-semibold tpl:tabular-nums",
						style: t({
							color: m(A)(m(J).scoringResult.value.categories[r].score),
							backgroundColor: m(j)(m(J).scoringResult.value.categories[r].score)
						})
					}, o(m(J).scoringResult.value.categories[r].score), 5),
					m(J).scoringResult.value.categories[r].findings.length > 0 ? (a(), u("span", he, o(m(J).scoringResult.value.categories[r].findings.length), 1)) : g("", !0),
					d(m(b), {
						size: 12,
						"stroke-width": 2,
						class: n(["tpl:transition-transform tpl:duration-200 tpl:text-[var(--tpl-text-dim)]", X.value[r] ? "tpl:rotate-0" : "tpl:-rotate-90"])
					}, null, 8, ["class"])
				], 8, pe), X.value[r] ? (a(), u("div", ge, [m(J).scoringResult.value.categories[r].findings.length === 0 ? (a(), u("div", _e, o(m(K).scoring.noFindings), 1)) : g("", !0), (a(!0), u(h, null, e(m(J).scoringResult.value.categories[r].findings, (e) => (a(), u("div", {
					key: e.id,
					class: "tpl:border-t tpl:px-3 tpl:py-2.5 first:tpl:border-t-0 tpl:border-[var(--tpl-border-light)]"
				}, [l("div", ve, [(a(), f(i(e.severity === "high" ? m(x) : e.severity === "medium" ? m(oe) : m(ae)), {
					size: 13,
					"stroke-width": 2,
					class: "tpl:mt-0.5 tpl:shrink-0",
					style: t({ color: m(M)(e.severity) })
				}, null, 8, ["style"])), l("div", ye, [
					l("div", be, [l("span", {
						class: "tpl:mt-0.5 tpl:shrink-0 tpl:rounded tpl:px-1 tpl:py-px tpl:text-[10px] tpl:font-medium tpl:leading-tight",
						style: t({
							color: m(M)(e.severity),
							backgroundColor: m(N)(e.severity)
						})
					}, o(m(K).scoring.severity[e.severity]), 5), l("span", xe, o(e.message), 1)]),
					e.suggestion ? (a(), u("p", Se, o(e.suggestion), 1)) : g("", !0),
					e.blockId ? (a(), u("div", Ce, [l("button", {
						class: "tpl-scoring-fix-btn tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded tpl:border tpl:px-3 tpl:py-1.5 tpl:text-[11px] tpl:font-medium tpl:transition-all tpl:duration-150 tpl:disabled:opacity-50 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-primary)]",
						style: { "background-color": "transparent" },
						disabled: m(J).fixingFindingId.value !== null,
						onClick: (t) => je(e)
					}, [m(J).fixingFindingId.value === e.id ? (a(), f(m(w), {
						key: 0,
						class: "tpl-spinner",
						size: 11,
						"stroke-width": 2
					})) : (a(), f(m(E), {
						key: 1,
						size: 11,
						"stroke-width": 2
					})), p(" " + o(m(J).fixingFindingId.value === e.id ? m(K).scoring.fixing : m(K).scoring.fix), 1)], 8, we), m(J).fixError.value ? (a(), u("p", Te, o(m(J).fixError.value), 1)) : g("", !0)])) : g("", !0)
				])])]))), 128))])) : g("", !0)])), 64))
			])) : (a(), u("div", Ee, [d(m(T), {
				size: 32,
				"stroke-width": 1.5,
				class: "tpl:text-[var(--tpl-text-dim)]"
			}), l("p", De, o(m(K).scoring.emptyState), 1)])), l("p", Oe, o(m(K).aiMenu.disclaimer), 1)])])) : g("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c23c73d4"]]);
//#endregion
export { G as default };
