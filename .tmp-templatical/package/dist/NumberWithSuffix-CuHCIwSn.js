import { A as e, Dt as t, Et as n, N as r, O as i, Ot as a, _ as o, c as s, d as c, j as l, l as u, m as d, nt as f, r as p, s as m, u as h } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { h as g, m as _, p as v } from "./ColorPicker-VPq4ASC8.js";
//#region src/components/ToggleSwitch.vue?vue&type=script&setup=true&lang.ts
var y = { key: 0 }, b = {
	key: 0,
	class: "tpl:text-[var(--tpl-danger)]"
}, x = [
	"aria-checked",
	"aria-label",
	"disabled"
], S = /* @__PURE__ */ o({
	__name: "ToggleSwitch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: { type: Boolean },
		required: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = t;
		return (t, o) => (i(), c("label", { class: n(["tpl:flex tpl:items-center tpl:justify-between tpl:gap-2", e.disabled ? "tpl:cursor-not-allowed" : "tpl:cursor-pointer"]) }, [t.$slots.default || e.label || e.required ? (i(), c("span", y, [l(t.$slots, "default", {}, () => [d(a(e.label), 1)]), e.required ? (i(), c("span", b, " *")) : h("", !0)])) : h("", !0), s("button", {
			type: "button",
			role: "switch",
			"aria-checked": e.modelValue,
			"aria-label": e.label,
			disabled: e.disabled,
			class: n([
				"tpl:relative tpl:inline-flex tpl:h-5 tpl:w-9 tpl:shrink-0 tpl:rounded-full tpl:border-2 tpl:border-transparent tpl:transition-colors tpl:duration-200",
				e.modelValue ? "tpl:bg-[var(--tpl-primary)]" : "tpl:bg-[var(--tpl-border)]",
				e.disabled ? "tpl:cursor-not-allowed tpl:opacity-60" : "tpl:cursor-pointer"
			]),
			onClick: o[0] ||= (t) => !e.disabled && r("update:modelValue", !e.modelValue)
		}, [s("span", { class: n(["tpl:pointer-events-none tpl:inline-block tpl:size-4 tpl:rounded-full tpl:bg-[var(--tpl-bg)] tpl:shadow tpl:transition-transform tpl:duration-200", e.modelValue ? "tpl:translate-x-4" : "tpl:translate-x-0"]) }, null, 2)], 10, x)], 2));
	}
}), C = [
	"aria-checked",
	"aria-label",
	"title",
	"onClick"
], w = { key: 1 }, T = /* @__PURE__ */ o({
	__name: "SlidingPillSelect",
	props: {
		options: {},
		modelValue: {}
	},
	emits: ["update:modelValue"],
	setup(n, { emit: o }) {
		let s = n, l = o, d = m(() => s.options.findIndex((e) => e.value === s.modelValue)), f = m(() => `translateX(${Math.max(d.value, 0) * 100}%)`);
		return (o, s) => (i(), c("div", {
			role: "radiogroup",
			class: "tpl:relative tpl:grid tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1",
			style: t({
				gridTemplateColumns: `repeat(${n.options.length}, 1fr)`,
				backgroundColor: "var(--tpl-bg-hover)"
			})
		}, [d.value >= 0 ? (i(), c("div", {
			key: 0,
			class: "tpl:absolute tpl:inset-y-1 tpl:rounded-[var(--tpl-radius-sm)]",
			style: t({
				left: "4px",
				width: `calc((100% - 8px) / ${n.options.length})`,
				transform: f.value,
				backgroundColor: "var(--tpl-bg)",
				boxShadow: "var(--tpl-shadow)",
				transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			})
		}, null, 4)) : h("", !0), (i(!0), c(p, null, e(n.options, (e) => (i(), c("button", {
			key: e.value,
			role: "radio",
			"aria-checked": n.modelValue === e.value,
			"aria-label": e.label,
			class: "tpl:relative tpl:z-10 tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:py-[5px] tpl:text-xs tpl:font-medium",
			style: t({
				color: n.modelValue === e.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
				transition: "color 120ms cubic-bezier(0.16, 1, 0.3, 1)"
			}),
			title: e.label,
			onClick: (t) => l("update:modelValue", e.value)
		}, [e.icon ? (i(), u(r(e.icon), {
			key: 0,
			size: 14,
			"stroke-width": 2
		})) : (i(), c("span", w, a(e.label), 1))], 12, C))), 128))], 4));
	}
}), E = { class: "tpl:mb-3.5" }, D = /* @__PURE__ */ o({
	__name: "FieldRow",
	props: { label: {} },
	setup(e) {
		return (t, r) => (i(), c("div", E, [e.label ? (i(), c("label", {
			key: 0,
			class: n(f(g))
		}, a(e.label), 3)) : h("", !0), l(t.$slots, "default")]));
	}
}), O = { class: "tpl:flex tpl:items-stretch" }, k = [
	"value",
	"min",
	"max"
], A = /* @__PURE__ */ o({
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
		return (t, o) => (i(), c("div", O, [s("input", {
			type: "number",
			class: n(f(v)),
			value: e.modelValue,
			min: e.min,
			max: e.max,
			onInput: o[0] ||= (e) => r("update:modelValue", Number(e.target.value))
		}, null, 42, k), s("span", { class: n(f(_)) }, a(e.suffix), 3)]));
	}
});
//#endregion
export { S as i, D as n, T as r, A as t };
