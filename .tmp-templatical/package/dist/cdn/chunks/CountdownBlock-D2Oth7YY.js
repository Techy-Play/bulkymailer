import { M as e, P as t, Z as n, ct as r, f as i, g as a, h as o, it as s, p as c, st as l, u, x as d } from "./draggable-BRF_Q_jB.js";
import { g as f } from "./dist-Dp46rwVY.js";
import { t as p } from "./useI18n-aRMtgYRj.js";
//#region src/components/blocks/CountdownBlock.vue?vue&type=script&setup=true&lang.ts
var m = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:py-8 tpl:text-sm tpl:text-[var(--tpl-text-dim)]"
}, h = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:py-4 tpl:text-xs tpl:text-[var(--tpl-text-dim)] tpl:opacity-50"
}, g = { class: "tpl:text-center" }, _ = /* @__PURE__ */ d({
	__name: "CountdownBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(d) {
		let _ = d, { t: v } = p(), y = n(Date.now());
		f(() => {
			y.value = Date.now();
		}, 1e3);
		let b = i(() => {
			if (!_.block.targetDate) return null;
			let e = new Date(_.block.targetDate);
			return isNaN(e.getTime()) ? null : e.getTime();
		}), x = i(() => b.value ? y.value >= b.value : !1), S = i(() => {
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
		}), C = i(() => {
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
		}), w = i(() => ({
			backgroundColor: _.block.backgroundColor,
			fontFamily: _.block.fontFamily || "inherit"
		})), T = i(() => ({
			fontSize: `${_.block.digitFontSize}px`,
			fontWeight: "bold",
			color: _.block.digitColor,
			lineHeight: "1.2"
		})), E = i(() => ({
			fontSize: `${_.block.labelFontSize}px`,
			color: _.block.labelColor,
			marginTop: "4px"
		})), D = i(() => ({
			fontSize: `${_.block.digitFontSize}px`,
			color: _.block.digitColor,
			fontFamily: _.block.fontFamily || "inherit"
		}));
		return (n, i) => d.block.targetDate ? x.value && d.block.hideOnExpiry ? (e(), a("div", h, r(s(v).countdown.hidden), 1)) : x.value ? (e(), a("div", {
			key: 2,
			style: l(w.value),
			class: "tpl:py-4 tpl:text-center"
		}, [c("span", { style: l({
			fontSize: `${d.block.digitFontSize}px`,
			color: d.block.digitColor
		}) }, r(d.block.expiredMessage), 5)], 4)) : (e(), a("div", {
			key: 3,
			style: l(w.value),
			class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:py-4"
		}, [(e(!0), a(u, null, t(C.value, (t, n) => (e(), a(u, { key: t.label }, [n > 0 ? (e(), a("span", {
			key: 0,
			style: l(D.value),
			class: "tpl:self-start"
		}, r(d.block.separator), 5)) : o("", !0), c("div", g, [c("div", { style: l(T.value) }, r(t.value), 5), c("div", { style: l(E.value) }, r(t.label), 5)])], 64))), 128))], 4)) : (e(), a("div", m, r(s(v).countdown.setDate), 1));
	}
});
//#endregion
export { _ as default };

//# sourceMappingURL=CountdownBlock-D2Oth7YY.js.map