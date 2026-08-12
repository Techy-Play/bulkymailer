import { A as e, Dt as t, O as n, Ot as r, Y as i, _ as a, c as o, d as s, nt as c, r as l, s as u, u as d } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { p as f } from "./dist-DDfXShPv.js";
import { t as p } from "./useI18n-BkHfCWC6.js";
//#region src/components/blocks/CountdownBlock.vue?vue&type=script&setup=true&lang.ts
var m = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:py-8 tpl:text-sm tpl:text-[var(--tpl-text-dim)]"
}, h = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:py-4 tpl:text-xs tpl:text-[var(--tpl-text-dim)] tpl:opacity-50"
}, g = { class: "tpl:text-center" }, _ = /* @__PURE__ */ a({
	__name: "CountdownBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(a) {
		let _ = a, { t: v } = p(), y = i(Date.now());
		f(() => {
			y.value = Date.now();
		}, 1e3);
		let b = u(() => {
			if (!_.block.targetDate) return null;
			let e = new Date(_.block.targetDate);
			return isNaN(e.getTime()) ? null : e.getTime();
		}), x = u(() => b.value ? y.value >= b.value : !1), S = u(() => {
			if (!b.value || x.value) return {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			};
			let e = b.value - y.value, t = Math.floor(e / 1e3);
			return {
				days: Math.floor(t / 86400),
				hours: Math.floor(t % 86400 / 3600),
				minutes: Math.floor(t % 3600 / 60),
				seconds: t % 60
			};
		}), C = u(() => {
			let e = [];
			return _.block.showDays && e.push({
				value: String(S.value.days).padStart(2, "0"),
				label: _.block.labelDays
			}), _.block.showHours && e.push({
				value: String(S.value.hours).padStart(2, "0"),
				label: _.block.labelHours
			}), _.block.showMinutes && e.push({
				value: String(S.value.minutes).padStart(2, "0"),
				label: _.block.labelMinutes
			}), _.block.showSeconds && e.push({
				value: String(S.value.seconds).padStart(2, "0"),
				label: _.block.labelSeconds
			}), e;
		}), w = u(() => ({
			backgroundColor: _.block.backgroundColor,
			fontFamily: _.block.fontFamily || "inherit"
		})), T = u(() => ({
			fontSize: `${_.block.digitFontSize}px`,
			fontWeight: "bold",
			color: _.block.digitColor,
			lineHeight: "1.2"
		})), E = u(() => ({
			fontSize: `${_.block.labelFontSize}px`,
			color: _.block.labelColor,
			marginTop: "4px"
		})), D = u(() => ({
			fontSize: `${_.block.digitFontSize}px`,
			color: _.block.digitColor,
			fontFamily: _.block.fontFamily || "inherit"
		}));
		return (i, u) => a.block.targetDate ? x.value && a.block.hideOnExpiry ? (n(), s("div", h, r(c(v).countdown.hidden), 1)) : x.value ? (n(), s("div", {
			key: 2,
			style: t(w.value),
			class: "tpl:py-4 tpl:text-center"
		}, [o("span", { style: t({
			fontSize: `${a.block.digitFontSize}px`,
			color: a.block.digitColor
		}) }, r(a.block.expiredMessage), 5)], 4)) : (n(), s("div", {
			key: 3,
			style: t(w.value),
			class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:py-4"
		}, [(n(!0), s(l, null, e(C.value, (e, i) => (n(), s(l, { key: e.label }, [i > 0 ? (n(), s("span", {
			key: 0,
			style: t(D.value),
			class: "tpl:self-start"
		}, r(a.block.separator), 5)) : d("", !0), o("div", g, [o("div", { style: t(T.value) }, r(e.value), 5), o("div", { style: t(E.value) }, r(e.label), 5)])], 64))), 128))], 4)) : (n(), s("div", m, r(c(v).countdown.setDate), 1));
	}
});
//#endregion
export { _ as default };
