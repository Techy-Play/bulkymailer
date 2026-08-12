import { A as e, Et as t, I as n, O as r, Ot as i, R as a, Y as o, _ as s, c, d as l, h as u, nt as d, r as f, s as p, u as m } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { c as h, t as g } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import "./useEditorCore-BMbxdUbY.js";
import { s as _ } from "./usePopoverPosition-D93u-EZm.js";
import { t as v } from "./useI18n-BkHfCWC6.js";
import { t as y } from "./createLucideIcon-D7GKhya2.js";
import { t as b } from "./chevron-down-CYOoeGBd.js";
import { t as x } from "./clock-CnadSSTD.js";
import { t as S } from "./loader-circle-GADaYcyQ.js";
import { n as C } from "./useCloudI18n-KgIWl-IE.js";
import { t as w } from "./formatRelativeTime-CtUU-QZ8.js";
var T = y("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), E = y("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), D = ["disabled", "title"], O = ["title"], k = {
	key: 0,
	class: "tpl-scale-in tpl:absolute tpl:top-full tpl:left-1/2 tpl:z-50 tpl:mt-2 tpl:w-72 tpl:-translate-x-1/2 tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:bg-[var(--tpl-bg-elevated)] tpl:border tpl:border-[var(--tpl-border)] tpl:shadow-[var(--tpl-shadow-lg)]",
	style: {
		"backdrop-filter": "blur(8px)",
		"-webkit-backdrop-filter": "blur(8px)"
	}
}, A = { class: "tpl:border-b tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-semibold tpl:text-[var(--tpl-text)] tpl:border-[var(--tpl-border)]" }, j = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:py-8"
}, M = {
	key: 1,
	class: "tpl:px-3 tpl:py-6 tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, N = {
	key: 2,
	class: "tpl:max-h-64 tpl:overflow-y-auto"
}, P = ["disabled", "onClick"], F = { class: "tpl:flex tpl:flex-col tpl:gap-0.5" }, I = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]" }, L = {
	key: 0,
	class: "tpl:rounded tpl:px-1 tpl:py-0.5 tpl:text-[10px] tpl:font-normal tpl:bg-[var(--tpl-bg-active)] tpl:text-[var(--tpl-text-muted)]"
}, R = ["disabled", "title"], z = /* @__PURE__ */ s({
	__name: "SnapshotHistory",
	props: {
		snapshots: {},
		isLoading: { type: Boolean },
		isRestoring: { type: Boolean }
	},
	emits: ["load", "navigate"],
	setup(s, { emit: y }) {
		let z = s, B = y, { format: V } = v(), { t: H } = C(), U = o(!1), W = o(null), G = o(-1);
		n(() => z.snapshots.length, () => {
			G.value = -1;
		});
		let K = p(() => G.value > 0 && z.snapshots.length > 0 && !z.isRestoring), q = p(() => G.value < z.snapshots.length - 1 && z.snapshots.length > 0 && !z.isRestoring);
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
			let t = w(e, H.snapshotHistory, V, 7);
			return t === null ? new Date(e).toLocaleDateString(void 0, {
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			}) : t;
		}
		return _(W, () => {
			U.value = !1;
		}), (n, o) => (r(), l("div", {
			ref_key: "dropdownRef",
			ref: W,
			class: "tpl:relative tpl:flex tpl:items-center tpl:gap-0.5"
		}, [
			c("button", {
				class: "tpl:flex tpl:size-7 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:transition-colors tpl:duration-150 hover:tpl:bg-[var(--tpl-bg-hover)] disabled:tpl:cursor-not-allowed disabled:tpl:opacity-30 disabled:hover:tpl:bg-transparent tpl:text-[var(--tpl-text-muted)]",
				disabled: !q.value,
				title: d(H).snapshotHistory.olderSnapshot,
				onClick: h(Y, ["stop"])
			}, [u(d(T), {
				size: 14,
				"stroke-width": 2
			})], 8, D),
			c("button", {
				class: "tpl:flex tpl:h-7 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:gap-0.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:px-1.5 tpl:transition-colors tpl:duration-150 hover:tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)]",
				title: d(H).snapshotHistory.tooltip,
				onClick: h(X, ["stop"])
			}, [u(d(x), {
				size: 16,
				"stroke-width": 1.5
			}), u(d(b), {
				class: t(["tpl:transition-transform tpl:duration-150", { "tpl:rotate-180": U.value }]),
				size: 10,
				"stroke-width": 2
			}, null, 8, ["class"])], 8, O),
			u(g, { name: "tpl-dropdown" }, {
				default: a(() => [U.value ? (r(), l("div", k, [c("div", A, i(d(H).snapshotHistory.dropdownTitle), 1), s.isLoading ? (r(), l("div", j, [u(d(S), {
					class: "tpl:animate-spin tpl:text-[var(--tpl-primary)]",
					size: 20,
					"stroke-width": 2
				})])) : s.snapshots.length === 0 ? (r(), l("div", M, i(d(H).snapshotHistory.noSnapshots), 1)) : (r(), l("div", N, [(r(!0), l(f, null, e(s.snapshots, (e) => (r(), l("button", {
					key: e.id,
					class: "tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:border-b tpl:border-b-[var(--tpl-border-light)] tpl:border-l-2 tpl:border-l-transparent tpl:px-3 tpl:py-2.5 tpl:text-left tpl:transition-all tpl:duration-150 last:tpl:border-b-0 hover:tpl:border-l-[var(--tpl-primary)] hover:tpl:bg-[var(--tpl-bg-hover)]",
					style: { "background-color": "transparent" },
					disabled: s.isRestoring,
					onClick: (t) => Z(e.id)
				}, [c("div", F, [c("div", I, [c("span", null, i(Q(e.created_at)), 1), e.is_autosave ? (r(), l("span", L, i(d(H).snapshotHistory.auto), 1)) : m("", !0)])])], 8, P))), 128))]))])) : m("", !0)]),
				_: 1
			}),
			c("button", {
				class: "tpl:flex tpl:size-7 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:transition-colors tpl:duration-150 hover:tpl:bg-[var(--tpl-bg-hover)] disabled:tpl:cursor-not-allowed disabled:tpl:opacity-30 disabled:hover:tpl:bg-transparent tpl:text-[var(--tpl-text-muted)]",
				disabled: !K.value,
				title: d(H).snapshotHistory.newerSnapshot,
				onClick: h(J, ["stop"])
			}, [u(d(E), {
				size: 14,
				"stroke-width": 2
			})], 8, R)
		], 512));
	}
});
//#endregion
export { z as default };
