import { M as e, P as t, V as n, Z as r, ct as i, f as a, g as o, h as s, it as c, l, n as u, ot as d, p as f, u as p, x as m, y as h, z as g } from "./draggable-BRF_Q_jB.js";
import "./useEditorCore-CTYH6u4r.js";
import { t as _ } from "./dist-BLF-S9_A.js";
import { t as v } from "./useI18n-aRMtgYRj.js";
import { Ft as y, It as b, Pt as x, at as S, kt as C } from "./icons-DN008liP.js";
import { n as w } from "./useCloudI18n-CML0BxqX.js";
import { t as T } from "./formatRelativeTime-CtUU-QZ8.js";
//#region src/cloud/components/SnapshotHistory.vue?vue&type=script&setup=true&lang.ts
var E = ["disabled", "title"], D = ["title"], O = {
	key: 0,
	class: "tpl-scale-in tpl:absolute tpl:top-full tpl:left-1/2 tpl:z-50 tpl:mt-2 tpl:w-72 tpl:-translate-x-1/2 tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:bg-[var(--tpl-bg-elevated)] tpl:border tpl:border-[var(--tpl-border)] tpl:shadow-[var(--tpl-shadow-lg)]",
	style: {
		"backdrop-filter": "blur(8px)",
		"-webkit-backdrop-filter": "blur(8px)"
	}
}, k = { class: "tpl:border-b tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-semibold tpl:text-[var(--tpl-text)] tpl:border-[var(--tpl-border)]" }, A = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:py-8"
}, j = {
	key: 1,
	class: "tpl:px-3 tpl:py-6 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, M = {
	key: 2,
	class: "tpl:max-h-64 tpl:overflow-y-auto"
}, N = ["disabled", "onClick"], P = { class: "tpl:flex tpl:flex-col tpl:gap-0.5" }, F = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]" }, I = {
	key: 0,
	class: "tpl:rounded tpl:px-1 tpl:py-0.5 tpl:text-[10px] tpl:font-normal tpl:bg-[var(--tpl-bg-active)] tpl:text-[var(--tpl-text-muted)]"
}, L = ["disabled", "title"], R = /* @__PURE__ */ m({
	__name: "SnapshotHistory",
	props: {
		snapshots: {},
		isLoading: { type: Boolean },
		isRestoring: { type: Boolean }
	},
	emits: ["load", "navigate"],
	setup(m, { emit: R }) {
		let z = m, B = R, { format: V } = v(), { t: H } = w(), U = r(!1), W = r(null), G = r(-1);
		g(() => z.snapshots.length, () => {
			G.value = -1;
		});
		let K = a(() => G.value > 0 && z.snapshots.length > 0 && !z.isRestoring), q = a(() => G.value < z.snapshots.length - 1 && z.snapshots.length > 0 && !z.isRestoring);
		function J() {
			K.value && (G.value--, B("navigate", z.snapshots[G.value]));
		}
		function Y() {
			q.value && (G.value++, B("navigate", z.snapshots[G.value]));
		}
		function X() {
			U.value = !U.value, U.value && z.snapshots.length === 0 && B("load");
		}
		function Z(e) {
			let t = z.snapshots.findIndex((t) => t.id === e);
			t !== -1 && (G.value = t, B("navigate", z.snapshots[t])), U.value = !1;
		}
		function Q(e) {
			let t = T(e, H.snapshotHistory, V, 7);
			return t === null ? new Date(e).toLocaleDateString(void 0, {
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			}) : t;
		}
		return _(W, () => {
			U.value = !1;
		}), (r, a) => (e(), o("div", {
			ref_key: "dropdownRef",
			ref: W,
			class: "tpl:relative tpl:flex tpl:items-center tpl:gap-0.5"
		}, [
			f("button", {
				class: "tpl:flex tpl:size-7 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:transition-colors tpl:duration-150 hover:tpl:bg-[var(--tpl-bg-hover)] disabled:tpl:cursor-not-allowed disabled:tpl:opacity-30 disabled:hover:tpl:bg-transparent tpl:text-[var(--tpl-text-muted)]",
				disabled: !q.value,
				title: c(H).snapshotHistory.olderSnapshot,
				onClick: l(Y, ["stop"])
			}, [h(c(y), {
				size: 14,
				"stroke-width": 2
			})], 8, E),
			f("button", {
				class: "tpl:flex tpl:h-7 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:gap-0.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:px-1.5 tpl:transition-colors tpl:duration-150 hover:tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)]",
				title: c(H).snapshotHistory.tooltip,
				onClick: l(X, ["stop"])
			}, [h(c(C), {
				size: 16,
				"stroke-width": 1.5
			}), h(c(b), {
				class: d(["tpl:transition-transform tpl:duration-150", { "tpl:rotate-180": U.value }]),
				size: 10,
				"stroke-width": 2
			}, null, 8, ["class"])], 8, D),
			h(u, { name: "tpl-dropdown" }, {
				default: n(() => [U.value ? (e(), o("div", O, [f("div", k, i(c(H).snapshotHistory.dropdownTitle), 1), m.isLoading ? (e(), o("div", A, [h(c(S), {
					class: "tpl:animate-spin tpl:text-[var(--tpl-primary)]",
					size: 20,
					"stroke-width": 2
				})])) : m.snapshots.length === 0 ? (e(), o("div", j, i(c(H).snapshotHistory.noSnapshots), 1)) : (e(), o("div", M, [(e(!0), o(p, null, t(m.snapshots, (t) => (e(), o("button", {
					key: t.id,
					class: "tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:border-b tpl:border-b-[var(--tpl-border-light)] tpl:border-l-2 tpl:border-l-transparent tpl:px-3 tpl:py-2.5 tpl:text-left tpl:transition-all tpl:duration-150 last:tpl:border-b-0 hover:tpl:border-l-[var(--tpl-primary)] hover:tpl:bg-[var(--tpl-bg-hover)]",
					style: { "background-color": "transparent" },
					disabled: m.isRestoring,
					onClick: (e) => Z(t.id)
				}, [f("div", P, [f("div", F, [f("span", null, i(Q(t.created_at)), 1), t.is_autosave ? (e(), o("span", I, i(c(H).snapshotHistory.auto), 1)) : s("", !0)])])], 8, N))), 128))]))])) : s("", !0)]),
				_: 1
			}),
			f("button", {
				class: "tpl:flex tpl:size-7 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:transition-colors tpl:duration-150 hover:tpl:bg-[var(--tpl-bg-hover)] disabled:tpl:cursor-not-allowed disabled:tpl:opacity-30 disabled:hover:tpl:bg-transparent tpl:text-[var(--tpl-text-muted)]",
				disabled: !K.value,
				title: c(H).snapshotHistory.newerSnapshot,
				onClick: l(J, ["stop"])
			}, [h(c(x), {
				size: 14,
				"stroke-width": 2
			})], 8, L)
		], 512));
	}
});
//#endregion
export { R as default };

//# sourceMappingURL=SnapshotHistory-CYVi7fvQ.js.map