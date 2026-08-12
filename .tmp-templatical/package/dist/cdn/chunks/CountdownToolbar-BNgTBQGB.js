import { M as e, P as t, V as n, ct as r, f as i, g as a, it as o, m as s, ot as c, p as l, u, x as d, y as f } from "./draggable-BRF_Q_jB.js";
import { t as p } from "./useI18n-aRMtgYRj.js";
import { f as m, t as h } from "./ColorPicker-yxvrro60.js";
import { i as g, n as _, r as v, t as y } from "./NumberWithSuffix-vVwCWrd_.js";
//#region src/components/toolbar/CountdownToolbar.vue?vue&type=script&setup=true&lang.ts
var b = ["value"], x = ["value"], S = ["value"], C = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-2" }, w = ["value"], T = { value: "" }, E = ["value"], D = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-3" }, O = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-3" }, k = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-2" }, A = [
	"value",
	"placeholder",
	"onInput"
], j = ["value", "placeholder"], M = ["value"], N = /* @__PURE__ */ d({
	__name: "CountdownToolbar",
	props: {
		block: {},
		fontFamilies: {}
	},
	emits: ["update"],
	setup(d, { emit: N }) {
		let P = N, { t: F } = p(), I = [
			"UTC",
			"America/New_York",
			"America/Chicago",
			"America/Denver",
			"America/Los_Angeles",
			"Europe/London",
			"Europe/Berlin",
			"Europe/Paris",
			"Europe/Moscow",
			"Asia/Dubai",
			"Asia/Kolkata",
			"Asia/Shanghai",
			"Asia/Tokyo",
			"Australia/Sydney",
			"Pacific/Auckland"
		], L = [
			{
				value: ":",
				label: ":"
			},
			{
				value: "-",
				label: "-"
			},
			{
				value: " ",
				label: "␣"
			}
		], R = [
			"Days",
			"Hours",
			"Minutes",
			"Seconds"
		], z = i(() => R.map((e) => ({
			unit: e,
			showKey: `show${e}`,
			labelKey: `label${e}`,
			translationKey: e.toLowerCase()
		})));
		function B(e, t) {
			P("update", { [e]: t });
		}
		return (i, p) => (e(), a(u, null, [
			f(_, { label: o(F).countdown.targetDate }, {
				default: n(() => [l("input", {
					type: "datetime-local",
					class: c(o(m)),
					value: d.block.targetDate,
					onInput: p[0] ||= (e) => B("targetDate", e.target.value)
				}, null, 42, b)]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.timezone }, {
				default: n(() => [l("select", {
					class: c(o(m)),
					value: d.block.timezone,
					onChange: p[1] ||= (e) => B("timezone", e.target.value)
				}, [(e(), a(u, null, t(I, (e) => l("option", {
					key: e,
					value: e
				}, r(e), 9, S)), 64))], 42, x)]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.display }, {
				default: n(() => [l("div", C, [(e(!0), a(u, null, t(z.value, (t) => (e(), s(g, {
					key: t.unit,
					class: "tpl:text-[12px] tpl:text-[var(--tpl-text)]",
					"model-value": d.block[t.showKey],
					label: o(F).countdown[t.translationKey],
					"onUpdate:modelValue": (e) => B(t.showKey, e)
				}, null, 8, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				]))), 128))])]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.separator }, {
				default: n(() => [f(v, {
					options: L,
					"model-value": d.block.separator,
					"onUpdate:modelValue": p[2] ||= (e) => B("separator", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.fontFamily }, {
				default: n(() => [l("select", {
					class: c(o(m)),
					value: d.block.fontFamily || "",
					onChange: p[3] ||= (e) => B("fontFamily", e.target.value || void 0)
				}, [l("option", T, r(o(F).countdown.inheritFont), 1), (e(!0), a(u, null, t(d.fontFamilies, (t) => (e(), a("option", {
					key: t.value,
					value: t.value
				}, r(t.label), 9, E))), 128))], 42, w)]),
				_: 1
			}, 8, ["label"]),
			l("div", D, [f(_, { label: o(F).countdown.digitFontSize }, {
				default: n(() => [f(y, {
					"model-value": d.block.digitFontSize,
					min: 12,
					max: 72,
					suffix: "px",
					"onUpdate:modelValue": p[4] ||= (e) => B("digitFontSize", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]), f(_, { label: o(F).countdown.labelFontSize }, {
				default: n(() => [f(y, {
					"model-value": d.block.labelFontSize,
					min: 8,
					max: 24,
					suffix: "px",
					"onUpdate:modelValue": p[5] ||= (e) => B("labelFontSize", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"])]),
			l("div", O, [f(_, { label: o(F).countdown.digitColor }, {
				default: n(() => [f(h, {
					"model-value": d.block.digitColor,
					"onUpdate:modelValue": p[6] ||= (e) => B("digitColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]), f(_, { label: o(F).countdown.labelColor }, {
				default: n(() => [f(h, {
					"model-value": d.block.labelColor,
					"onUpdate:modelValue": p[7] ||= (e) => B("labelColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"])]),
			f(_, { label: o(F).countdown.background }, {
				default: n(() => [f(h, {
					"model-value": d.block.backgroundColor,
					"onUpdate:modelValue": p[8] ||= (e) => B("backgroundColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.labels }, {
				default: n(() => [l("div", k, [(e(!0), a(u, null, t(z.value, (t) => (e(), a("input", {
					key: t.unit,
					type: "text",
					class: c(o(m)),
					value: d.block[t.labelKey],
					placeholder: o(F).countdown[t.translationKey],
					onInput: (e) => B(t.labelKey, e.target.value)
				}, null, 42, A))), 128))])]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.expiry }, {
				default: n(() => [l("input", {
					type: "text",
					class: c(o(m)),
					value: d.block.expiredMessage,
					placeholder: o(F).countdown.expiredMessagePlaceholder,
					onInput: p[9] ||= (e) => B("expiredMessage", e.target.value)
				}, null, 42, j)]),
				_: 1
			}, 8, ["label"]),
			f(_, { label: o(F).countdown.expiredImageUrl }, {
				default: n(() => [l("input", {
					type: "url",
					class: c(o(m)),
					value: d.block.expiredImageUrl,
					placeholder: "https://...",
					onInput: p[10] ||= (e) => B("expiredImageUrl", e.target.value)
				}, null, 42, M)]),
				_: 1
			}, 8, ["label"]),
			f(g, {
				class: "tpl:mb-3.5 tpl:text-[12px] tpl:text-[var(--tpl-text)]",
				"model-value": d.block.hideOnExpiry,
				label: o(F).countdown.hideOnExpiry,
				"onUpdate:modelValue": p[11] ||= (e) => B("hideOnExpiry", e)
			}, null, 8, ["model-value", "label"])
		], 64));
	}
});
//#endregion
export { N as default };

//# sourceMappingURL=CountdownToolbar-BNgTBQGB.js.map