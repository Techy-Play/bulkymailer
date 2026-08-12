import { A as e, Et as t, O as n, Ot as r, R as i, _ as a, c as o, d as s, h as c, l, nt as u, r as d, s as f } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { t as p } from "./useI18n-BkHfCWC6.js";
import { f as m, t as h } from "./ColorPicker-VPq4ASC8.js";
import { i as g, n as _, r as v, t as y } from "./NumberWithSuffix-CuHCIwSn.js";
//#region src/components/toolbar/CountdownToolbar.vue?vue&type=script&setup=true&lang.ts
var b = ["value"], x = ["value"], S = ["value"], C = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-2" }, w = ["value"], T = { value: "" }, E = ["value"], D = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-3" }, O = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-3" }, k = { class: "tpl:grid tpl:grid-cols-2 tpl:gap-2" }, A = [
	"value",
	"placeholder",
	"onInput"
], j = ["value", "placeholder"], M = ["value"], N = /* @__PURE__ */ a({
	__name: "CountdownToolbar",
	props: {
		block: {},
		fontFamilies: {}
	},
	emits: ["update"],
	setup(a, { emit: N }) {
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
		], z = f(() => R.map((e) => ({
			unit: e,
			showKey: `show${e}`,
			labelKey: `label${e}`,
			translationKey: e.toLowerCase()
		})));
		function B(e, t) {
			P("update", { [e]: t });
		}
		return (f, p) => (n(), s(d, null, [
			c(_, { label: u(F).countdown.targetDate }, {
				default: i(() => [o("input", {
					type: "datetime-local",
					class: t(u(m)),
					value: a.block.targetDate,
					onInput: p[0] ||= (e) => B("targetDate", e.target.value)
				}, null, 42, b)]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.timezone }, {
				default: i(() => [o("select", {
					class: t(u(m)),
					value: a.block.timezone,
					onChange: p[1] ||= (e) => B("timezone", e.target.value)
				}, [(n(), s(d, null, e(I, (e) => o("option", {
					key: e,
					value: e
				}, r(e), 9, S)), 64))], 42, x)]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.display }, {
				default: i(() => [o("div", C, [(n(!0), s(d, null, e(z.value, (e) => (n(), l(g, {
					key: e.unit,
					class: "tpl:text-[12px] tpl:text-[var(--tpl-text)]",
					"model-value": a.block[e.showKey],
					label: u(F).countdown[e.translationKey],
					"onUpdate:modelValue": (t) => B(e.showKey, t)
				}, null, 8, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				]))), 128))])]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.separator }, {
				default: i(() => [c(v, {
					options: L,
					"model-value": a.block.separator,
					"onUpdate:modelValue": p[2] ||= (e) => B("separator", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.fontFamily }, {
				default: i(() => [o("select", {
					class: t(u(m)),
					value: a.block.fontFamily || "",
					onChange: p[3] ||= (e) => B("fontFamily", e.target.value || void 0)
				}, [o("option", T, r(u(F).countdown.inheritFont), 1), (n(!0), s(d, null, e(a.fontFamilies, (e) => (n(), s("option", {
					key: e.value,
					value: e.value
				}, r(e.label), 9, E))), 128))], 42, w)]),
				_: 1
			}, 8, ["label"]),
			o("div", D, [c(_, { label: u(F).countdown.digitFontSize }, {
				default: i(() => [c(y, {
					"model-value": a.block.digitFontSize,
					min: 12,
					max: 72,
					suffix: "px",
					"onUpdate:modelValue": p[4] ||= (e) => B("digitFontSize", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]), c(_, { label: u(F).countdown.labelFontSize }, {
				default: i(() => [c(y, {
					"model-value": a.block.labelFontSize,
					min: 8,
					max: 24,
					suffix: "px",
					"onUpdate:modelValue": p[5] ||= (e) => B("labelFontSize", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"])]),
			o("div", O, [c(_, { label: u(F).countdown.digitColor }, {
				default: i(() => [c(h, {
					"model-value": a.block.digitColor,
					"onUpdate:modelValue": p[6] ||= (e) => B("digitColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]), c(_, { label: u(F).countdown.labelColor }, {
				default: i(() => [c(h, {
					"model-value": a.block.labelColor,
					"onUpdate:modelValue": p[7] ||= (e) => B("labelColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"])]),
			c(_, { label: u(F).countdown.background }, {
				default: i(() => [c(h, {
					"model-value": a.block.backgroundColor,
					"onUpdate:modelValue": p[8] ||= (e) => B("backgroundColor", e)
				}, null, 8, ["model-value"])]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.labels }, {
				default: i(() => [o("div", k, [(n(!0), s(d, null, e(z.value, (e) => (n(), s("input", {
					key: e.unit,
					type: "text",
					class: t(u(m)),
					value: a.block[e.labelKey],
					placeholder: u(F).countdown[e.translationKey],
					onInput: (t) => B(e.labelKey, t.target.value)
				}, null, 42, A))), 128))])]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.expiry }, {
				default: i(() => [o("input", {
					type: "text",
					class: t(u(m)),
					value: a.block.expiredMessage,
					placeholder: u(F).countdown.expiredMessagePlaceholder,
					onInput: p[9] ||= (e) => B("expiredMessage", e.target.value)
				}, null, 42, j)]),
				_: 1
			}, 8, ["label"]),
			c(_, { label: u(F).countdown.expiredImageUrl }, {
				default: i(() => [o("input", {
					type: "url",
					class: t(u(m)),
					value: a.block.expiredImageUrl,
					placeholder: "https://...",
					onInput: p[10] ||= (e) => B("expiredImageUrl", e.target.value)
				}, null, 42, M)]),
				_: 1
			}, 8, ["label"]),
			c(g, {
				class: "tpl:mb-3.5 tpl:text-[12px] tpl:text-[var(--tpl-text)]",
				"model-value": a.block.hideOnExpiry,
				label: u(F).countdown.hideOnExpiry,
				"onUpdate:modelValue": p[11] ||= (e) => B("hideOnExpiry", e)
			}, null, 8, ["model-value", "label"])
		], 64));
	}
});
//#endregion
export { N as default };
