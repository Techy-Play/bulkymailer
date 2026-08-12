import { F as e, L as t, M as n, P as r, ct as i, f as a, g as o, h as s, it as c, m as l, ot as u, p as d, st as f, u as p, v as m, x as h } from "./draggable-BRF_Q_jB.js";
import { h as g, m as _, p as v } from "./ColorPicker-yxvrro60.js";
//#region src/components/ToggleSwitch.vue?vue&type=script&setup=true&lang.ts
var y = { key: 0 }, b = {
	key: 0,
	class: "tpl:text-[var(--tpl-danger)]"
}, x = [
	"aria-checked",
	"aria-label",
	"disabled"
], S = /* @__PURE__ */ h({
	__name: "ToggleSwitch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: { type: Boolean },
		required: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(t, { emit: r }) {
		let a = r;
		return (r, c) => (n(), o("label", { class: u(["tpl:flex tpl:items-center tpl:justify-between tpl:gap-2", t.disabled ? "tpl:cursor-not-allowed" : "tpl:cursor-pointer"]) }, [r.$slots.default || t.label || t.required ? (n(), o("span", y, [e(r.$slots, "default", {}, () => [m(i(t.label), 1)]), t.required ? (n(), o("span", b, " *")) : s("", !0)])) : s("", !0), d("button", {
			type: "button",
			role: "switch",
			"aria-checked": t.modelValue,
			"aria-label": t.label,
			disabled: t.disabled,
			class: u([
				"tpl:relative tpl:inline-flex tpl:h-5 tpl:w-9 tpl:shrink-0 tpl:rounded-full tpl:border-2 tpl:border-transparent tpl:transition-colors tpl:duration-200",
				t.modelValue ? "tpl:bg-[var(--tpl-primary)]" : "tpl:bg-[var(--tpl-border)]",
				t.disabled ? "tpl:cursor-not-allowed tpl:opacity-60" : "tpl:cursor-pointer"
			]),
			onClick: c[0] ||= (e) => !t.disabled && a("update:modelValue", !t.modelValue)
		}, [d("span", { class: u(["tpl:pointer-events-none tpl:inline-block tpl:size-4 tpl:rounded-full tpl:bg-[var(--tpl-bg)] tpl:shadow tpl:transition-transform tpl:duration-200", t.modelValue ? "tpl:translate-x-4" : "tpl:translate-x-0"]) }, null, 2)], 10, x)], 2));
	}
}), C = [
	"aria-checked",
	"aria-label",
	"title",
	"onClick"
], w = { key: 1 }, T = /* @__PURE__ */ h({
	__name: "SlidingPillSelect",
	props: {
		options: {},
		modelValue: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: c }) {
		let u = e, d = c, m = a(() => u.options.findIndex((e) => e.value === u.modelValue)), h = a(() => `translateX(${Math.max(m.value, 0) * 100}%)`);
		return (a, c) => (n(), o("div", {
			role: "radiogroup",
			class: "tpl:relative tpl:grid tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1",
			style: f({
				gridTemplateColumns: `repeat(${e.options.length}, 1fr)`,
				backgroundColor: "var(--tpl-bg-hover)"
			})
		}, [m.value >= 0 ? (n(), o("div", {
			key: 0,
			class: "tpl:absolute tpl:inset-y-1 tpl:rounded-[var(--tpl-radius-sm)]",
			style: f({
				left: "4px",
				width: `calc((100% - 8px) / ${e.options.length})`,
				transform: h.value,
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow)",
				transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			})
		}, null, 4)) : s("", !0), (n(!0), o(p, null, r(e.options, (r) => (n(), o("button", {
			key: r.value,
			role: "radio",
			"aria-checked": e.modelValue === r.value,
			"aria-label": r.label,
			class: "tpl:relative tpl:z-10 tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:py-[5px] tpl:text-xs tpl:font-medium",
			style: f({
				color: e.modelValue === r.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				transition: "color 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			title: r.label,
			onClick: (e) => d("update:modelValue", r.value)
		}, [r.icon ? (n(), l(t(r.icon), {
			key: 0,
			size: 14,
			"stroke-width": 2
		})) : (n(), o("span", w, i(r.label), 1))], 12, C))), 128))], 4));
	}
}), E = { class: "tpl:mb-3.5" }, D = /* @__PURE__ */ h({
	__name: "FieldRow",
	props: { label: {} },
	setup(t) {
		return (r, a) => (n(), o("div", E, [t.label ? (n(), o("label", {
			key: 0,
			class: u(c(g))
		}, i(t.label), 3)) : s("", !0), e(r.$slots, "default")]));
	}
}), O = { class: "tpl:flex tpl:items-stretch" }, k = [
	"value",
	"min",
	"max"
], A = /* @__PURE__ */ h({
	__name: "NumberWithSuffix",
	props: {
		modelValue: {},
		min: {},
		max: {},
		suffix: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = t;
		return (t, a) => (n(), o("div", O, [d("input", {
			type: "number",
			class: u(c(v)),
			value: e.modelValue,
			min: e.min,
			max: e.max,
			onInput: a[0] ||= (e) => r("update:modelValue", Number(e.target.value))
		}, null, 42, k), d("span", { class: u(c(_)) }, i(e.suffix), 3)]));
	}
});
//#endregion
export { S as i, D as n, T as r, A as t };

//# sourceMappingURL=NumberWithSuffix-vVwCWrd_.js.map