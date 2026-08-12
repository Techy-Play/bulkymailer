import { M as e, P as t, T as n, V as r, Z as i, c as a, d as o, f as s, g as c, h as l, it as u, l as ee, m as te, n as ne, ot as d, p as f, st as p, u as re, x as m, y as h } from "./draggable-BRF_Q_jB.js";
import { t as ie } from "./dist-BLF-S9_A.js";
import { U as ae, V as oe, u as se } from "./keys-CZOBuCQd.js";
import { t as ce } from "./useI18n-aRMtgYRj.js";
import { a as le, i as g, n as ue, r as de, t as fe } from "./usePopoverPosition-Dm1jv3y5.js";
import { n as pe } from "./icons-DN008liP.js";
//#region src/constants/styleConstants.ts
var _ = "tpl:block tpl:mb-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]", v = "tpl:w-full tpl:h-10 tpl:px-3.5 tpl:py-1.5 tpl:text-sm tpl:border tpl:rounded-[var(--tpl-radius-sm)] tpl:shadow-xs tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:outline-none focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)] placeholder:tpl:text-[var(--tpl-text-dim)]", y = "tpl:w-full tpl:h-10 tpl:px-3.5 tpl:py-1.5 tpl:text-sm tpl:border tpl:rounded-l-[var(--tpl-radius-sm)] tpl:rounded-r-none tpl:border-r-0 tpl:shadow-xs tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:outline-none focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)] placeholder:tpl:text-[var(--tpl-text-dim)]", b = "tpl:flex tpl:items-center tpl:px-2.5 tpl:text-xs tpl:border tpl:border-l-0 tpl:text-[var(--tpl-text-dim)] tpl:bg-[var(--tpl-bg-hover)] tpl:border-[var(--tpl-border)] tpl:rounded-r-[var(--tpl-radius-sm)]", me = "tpl:flex-1 tpl:h-10 tpl:px-3.5 tpl:py-1.5 tpl:text-xs tpl:font-mono tpl:border tpl:rounded-[var(--tpl-radius-sm)] tpl:shadow-xs tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:outline-none focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)]", x = "tpl:rounded-[var(--tpl-radius)] tpl:bg-[var(--tpl-bg-elevated)] tpl:p-4 tpl:border tpl:border-[var(--tpl-border)] tpl:transition-colors tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)]", S = "tpl:flex tpl:size-8 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-danger)] tpl:hover:bg-[var(--tpl-danger-light)] tpl:hover:text-[var(--tpl-danger)]", C = "tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-dashed tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-primary)] tpl:hover:text-[var(--tpl-primary)]", w = "tpl:w-full tpl:resize-y tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-2.5 tpl:py-2 tpl:font-mono tpl:text-xs tpl:text-[var(--tpl-text)] tpl:outline-none tpl:transition-all tpl:duration-150 tpl:placeholder:text-[var(--tpl-text-dim)] tpl:focus:border-[var(--tpl-primary)] tpl:focus:shadow-[0_0_0_3px_var(--tpl-primary-light)]", T = "tpl-btn tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:px-3.5 tpl:py-2 tpl:text-sm tpl:font-medium tpl:whitespace-nowrap tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-primary)] hover:tpl:text-[var(--tpl-bg)] tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50", E = [
	"10px",
	"12px",
	"14px",
	"16px",
	"18px",
	"20px",
	"24px",
	"28px",
	"32px",
	"36px",
	"48px",
	"64px"
], D = [
	"1",
	"1.2",
	"1.4",
	"1.5",
	"1.6",
	"1.8",
	"2",
	"2.5"
], O = [
	{
		label: "Normal",
		value: "normal"
	},
	{
		label: "-0.5px",
		value: "-0.5px"
	},
	{
		label: "0.5px",
		value: "0.5px"
	},
	{
		label: "1px",
		value: "1px"
	},
	{
		label: "1.5px",
		value: "1.5px"
	},
	{
		label: "2px",
		value: "2px"
	},
	{
		label: "3px",
		value: "3px"
	}
], k = "#000000", A = "#ffffff", j = "#ffff00", M = "#f2f2f2", N = (e, t = 0, n = 1) => e > n ? n : e < t ? t : e, P = (e, t = 0, n = 10 ** t) => Math.round(n * e) / n;
360 / (Math.PI * 2);
var F = (e) => ge(I(e)), I = (e) => (e[0] === "#" && (e = e.substring(1)), e.length < 6 ? {
	r: parseInt(e[0] + e[0], 16),
	g: parseInt(e[1] + e[1], 16),
	b: parseInt(e[2] + e[2], 16),
	a: e.length === 4 ? P(parseInt(e[3] + e[3], 16) / 255, 2) : 1
} : {
	r: parseInt(e.substring(0, 2), 16),
	g: parseInt(e.substring(2, 4), 16),
	b: parseInt(e.substring(4, 6), 16),
	a: e.length === 8 ? P(parseInt(e.substring(6, 8), 16) / 255, 2) : 1
}), L = (e) => he(B(e)), R = ({ h: e, s: t, v: n, a: r }) => {
	let i = (200 - t) * n / 100;
	return {
		h: P(e),
		s: P(i > 0 && i < 200 ? t * n / 100 / (i <= 100 ? i : 200 - i) * 100 : 0),
		l: P(i / 2),
		a: P(r, 2)
	};
}, z = (e) => {
	let { h: t, s: n, l: r } = R(e);
	return `hsl(${t}, ${n}%, ${r}%)`;
}, B = ({ h: e, s: t, v: n, a: r }) => {
	e = e / 360 * 6, t /= 100, n /= 100;
	let i = Math.floor(e), a = n * (1 - t), o = n * (1 - (e - i) * t), s = n * (1 - (1 - e + i) * t), c = i % 6;
	return {
		r: P([
			n,
			o,
			a,
			a,
			s,
			n
		][c] * 255),
		g: P([
			s,
			n,
			n,
			o,
			a,
			a
		][c] * 255),
		b: P([
			a,
			a,
			s,
			n,
			n,
			o
		][c] * 255),
		a: P(r, 2)
	};
}, V = (e) => {
	let t = e.toString(16);
	return t.length < 2 ? "0" + t : t;
}, he = ({ r: e, g: t, b: n, a: r }) => {
	let i = r < 1 ? V(P(r * 255)) : "";
	return "#" + V(e) + V(t) + V(n) + i;
}, ge = ({ r: e, g: t, b: n, a: r }) => {
	let i = Math.max(e, t, n), a = i - Math.min(e, t, n), o = a ? i === e ? (t - n) / a : i === t ? 2 + (n - e) / a : 4 + (e - t) / a : 0;
	return {
		h: P(60 * (o < 0 ? o + 6 : o)),
		s: P(i ? a / i * 100 : 0),
		v: P(i / 255 * 100),
		a: r
	};
}, H = (e, t) => {
	if (e === t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}, U = (e, t) => e.toLowerCase() === t.toLowerCase() || H(I(e), I(t)), W = {}, G = (e) => {
	let t = W[e];
	return t || (t = document.createElement("template"), t.innerHTML = e, W[e] = t), t;
}, K = (e, t, n) => {
	e.dispatchEvent(new CustomEvent(t, {
		bubbles: !0,
		detail: n
	}));
}, q = !1, J = (e) => "touches" in e, _e = (e) => q && !J(e) ? !1 : (q ||= J(e), !0), Y = (e, t) => {
	let n = J(t) ? t.touches[0] : t, r = e.el.getBoundingClientRect();
	K(e.el, "move", e.getMove({
		x: N((n.pageX - (r.left + window.pageXOffset)) / r.width),
		y: N((n.pageY - (r.top + window.pageYOffset)) / r.height)
	}));
}, ve = (e, t) => {
	let n = t.keyCode;
	n > 40 || e.xy && n < 37 || n < 33 || (t.preventDefault(), K(e.el, "move", e.getMove({
		x: n === 39 ? .01 : n === 37 ? -.01 : n === 34 ? .05 : n === 33 ? -.05 : n === 35 ? 1 : n === 36 ? -1 : 0,
		y: n === 40 ? .01 : n === 38 ? -.01 : 0
	}, !0)));
}, X = class {
	constructor(e, t, n, r) {
		let i = G(`<div role="slider" tabindex="0" part="${t}" ${n}><div part="${t}-pointer"></div></div>`);
		e.appendChild(i.content.cloneNode(!0));
		let a = e.querySelector(`[part=${t}]`);
		a.addEventListener("mousedown", this), a.addEventListener("touchstart", this), a.addEventListener("keydown", this), this.el = a, this.xy = r, this.nodes = [a.firstChild, a];
	}
	set dragging(e) {
		let t = e ? document.addEventListener : document.removeEventListener;
		t(q ? "touchmove" : "mousemove", this), t(q ? "touchend" : "mouseup", this);
	}
	handleEvent(e) {
		switch (e.type) {
			case "mousedown":
			case "touchstart":
				if (e.preventDefault(), !_e(e) || !q && e.button != 0) return;
				this.el.focus(), Y(this, e), this.dragging = !0;
				break;
			case "mousemove":
			case "touchmove":
				e.preventDefault(), Y(this, e);
				break;
			case "mouseup":
			case "touchend":
				this.dragging = !1;
				break;
			case "keydown": ve(this, e);
		}
	}
	style(e) {
		e.forEach((e, t) => {
			for (let n in e) this.nodes[t].style.setProperty(n, e[n]);
		});
	}
}, ye = class extends X {
	constructor(e) {
		super(e, "hue", "aria-label=\"Hue\" aria-valuemin=\"0\" aria-valuemax=\"360\"", !1);
	}
	update({ h: e }) {
		this.h = e, this.style([{
			left: `${e / 360 * 100}%`,
			color: z({
				h: e,
				s: 100,
				v: 100,
				a: 1
			})
		}]), this.el.setAttribute("aria-valuenow", `${P(e)}`);
	}
	getMove(e, t) {
		return { h: t ? N(this.h + e.x * 360, 0, 360) : 360 * e.x };
	}
}, be = class extends X {
	constructor(e) {
		super(e, "saturation", "aria-label=\"Color\"", !0);
	}
	update(e) {
		this.hsva = e, this.style([{
			top: `${100 - e.v}%`,
			left: `${e.s}%`,
			color: z(e)
		}, { "background-color": z({
			h: e.h,
			s: 100,
			v: 100,
			a: 1
		}) }]), this.el.setAttribute("aria-valuetext", `Saturation ${P(e.s)}%, Brightness ${P(e.v)}%`);
	}
	getMove(e, t) {
		return {
			s: t ? N(this.hsva.s + e.x * 100, 0, 100) : e.x * 100,
			v: t ? N(this.hsva.v - e.y * 100, 0, 100) : Math.round(100 - e.y * 100)
		};
	}
}, xe = ":host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:\"\";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}", Se = "[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}", Ce = "[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}", Z = Symbol("same"), Q = Symbol("color"), we = Symbol("hsva"), $ = Symbol("update"), Te = Symbol("parts"), Ee = Symbol("css"), De = Symbol("sliders"), Oe = class extends HTMLElement {
	static get observedAttributes() {
		return ["color"];
	}
	get [Ee]() {
		return [
			xe,
			Se,
			Ce
		];
	}
	get [De]() {
		return [be, ye];
	}
	get color() {
		return this[Q];
	}
	set color(e) {
		if (!this[Z](e)) {
			let t = this.colorModel.toHsva(e);
			this[$](t), this[Q] = e;
		}
	}
	constructor() {
		super();
		let e = G(`<style>${this[Ee].join("")}</style>`), t = this.attachShadow({ mode: "open" });
		t.appendChild(e.content.cloneNode(!0)), t.addEventListener("move", this), this[Te] = this[De].map((e) => new e(t));
	}
	connectedCallback() {
		if (this.hasOwnProperty("color")) {
			let e = this.color;
			delete this.color, this.color = e;
		} else this.color ||= this.colorModel.defaultColor;
	}
	attributeChangedCallback(e, t, n) {
		let r = this.colorModel.fromAttr(n);
		this[Z](r) || (this.color = r);
	}
	handleEvent(e) {
		let t = this[we], n = {
			...t,
			...e.detail
		};
		this[$](n);
		let r;
		!H(n, t) && !this[Z](r = this.colorModel.fromHsva(n)) && (this[Q] = r, K(this, "color-changed", { value: r }));
	}
	[Z](e) {
		return this.color && this.colorModel.equal(e, this.color);
	}
	[$](e) {
		this[we] = e, this[Te].forEach((t) => t.update(e));
	}
}, ke = {
	defaultColor: "#000",
	toHsva: F,
	fromHsva: ({ h: e, s: t, v: n }) => L({
		h: e,
		s: t,
		v: n,
		a: 1
	}),
	equal: U,
	fromAttr: (e) => e
}, Ae = class extends Oe {
	get colorModel() {
		return ke;
	}
};
customElements.define("hex-color-picker", class extends Ae {});
//#endregion
//#region src/components/ColorPicker.vue?vue&type=script&setup=true&lang.ts
var je = [
	"disabled",
	"aria-label",
	"title",
	"aria-expanded"
], Me = {
	key: 0,
	class: "tpl:relative tpl:flex-1"
}, Ne = [
	"value",
	"placeholder",
	"disabled",
	"aria-label"
], Pe = ["aria-label", "title"], Fe = ["data-tpl-theme"], Ie = ["aria-label"], Le = [
	"aria-label",
	"title",
	"aria-checked",
	"tabindex"
], Re = [
	"aria-label",
	"title",
	"aria-checked",
	"tabindex",
	"onClick"
], ze = ["color", "aria-label"], Be = {
	key: 2,
	class: "tpl:relative tpl:mt-2"
}, Ve = [
	"value",
	"placeholder",
	"disabled",
	"aria-label"
], He = ["aria-label", "title"], Ue = /* @__PURE__ */ m({
	__name: "ColorPicker",
	props: {
		modelValue: {},
		placeholder: { default: "" },
		seedColor: { default: "#ffffff" },
		swatchOnly: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" },
		ariaLabel: { default: "" },
		presets: { default: void 0 },
		allowCustom: {
			type: Boolean,
			default: void 0
		}
	},
	emits: ["update:modelValue"],
	setup(m, { emit: _ }) {
		let v = m, y = _, { t: b } = ce(), x = i(!1), S = i(), C = i(), w = i(!1);
		ie(S, () => {
			x.value = !1;
		}, { ignore: [C] });
		let T = s(() => !v.modelValue), E = s(() => g(v.modelValue)), D = s(() => g(v.modelValue || v.seedColor)), O = s(() => !v.disabled && !T.value), k = n(se, le), A = s(() => [...new Set(v.presets ?? k.presets)]), j = s(() => v.allowCustom ?? k.allowCustom), M = s(() => A.value.length > 0), N = s(() => j.value || !M.value), P = s(() => de(v.modelValue));
		function F(e) {
			return P.value !== "" && de(e) === P.value;
		}
		function I(e) {
			y("update:modelValue", e);
		}
		let L = s(() => M.value && !N.value);
		function R(e) {
			return L.value ? e + 1 : e;
		}
		let z = s(() => {
			if (L.value && T.value) return 0;
			let e = A.value.findIndex((e) => F(e));
			return e === -1 ? 0 : R(e);
		});
		function B() {
			return z.value === 0 ? 0 : -1;
		}
		function V(e) {
			return R(e) === z.value ? 0 : -1;
		}
		function he(e) {
			if (![
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft",
				"ArrowUp"
			].includes(e.key)) return;
			let t = Array.from(e.currentTarget.querySelectorAll("[role=\"radio\"]")), n = e.target.closest("[role=\"radio\"]"), r = n ? t.indexOf(n) : -1;
			r !== -1 && (t[(r + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus(), e.preventDefault());
		}
		function ge(e) {
			w.value = !0, y("update:modelValue", e.detail.value);
		}
		function H() {
			w.value = !1;
		}
		function U() {
			!w.value && T.value && y("update:modelValue", D.value);
		}
		function W(e) {
			y("update:modelValue", e.target.value);
		}
		function G() {
			y("update:modelValue", "");
		}
		let K = ue(), { toLocal: q } = fe(), J = n(oe, null), _e = n(ae, null), Y = i({
			top: 0,
			left: 0
		});
		function ve() {
			if (!v.disabled) {
				if (!x.value) {
					let e = C.value?.getBoundingClientRect();
					if (e) {
						let t = e.bottom + 8 + 240 <= window.innerHeight ? e.bottom + 8 : Math.max(8, e.top - 240 - 8);
						Y.value = q({
							top: t,
							left: e.left
						});
					}
				}
				x.value = !x.value;
			}
		}
		return (n, i) => (e(), c("div", { class: d(["tpl:flex tpl:items-center tpl:gap-2 tpl:relative", m.disabled && "tpl:opacity-60 tpl:cursor-not-allowed"]) }, [
			f("button", {
				ref_key: "swatchRef",
				ref: C,
				type: "button",
				disabled: m.disabled,
				"aria-label": m.ariaLabel || u(b).colorPicker.pickColor,
				title: m.ariaLabel || void 0,
				"aria-expanded": x.value,
				class: d([
					"tpl:shrink-0 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-0.5 tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
					m.disabled ? "tpl:cursor-not-allowed" : "tpl:cursor-pointer",
					x.value ? "tpl:border-[var(--tpl-primary)] tpl:shadow-[var(--tpl-ring)]" : !m.disabled && "hover:tpl:border-[var(--tpl-text-dim)]",
					m.size === "sm" ? "tpl:size-8" : "tpl:size-10"
				]),
				onClick: ve
			}, [f("span", {
				class: d(["tpl:block tpl:size-full tpl:rounded-[calc(var(--tpl-radius-sm)-2px)]", { "tpl-color-swatch-empty": T.value }]),
				style: p(T.value ? void 0 : { backgroundColor: E.value })
			}, null, 6)], 10, je),
			!m.swatchOnly && N.value ? (e(), c("div", Me, [f("input", {
				type: "text",
				class: d([u(me), "tpl:w-full"]),
				style: p(O.value ? { paddingRight: "2.25rem" } : void 0),
				value: E.value,
				placeholder: m.placeholder || u(b).colorPicker.notSet,
				disabled: m.disabled,
				"aria-label": u(b).colorPicker.hexValue,
				onInput: W
			}, null, 46, Ne), O.value ? (e(), c("button", {
				key: 0,
				type: "button",
				"aria-label": u(b).colorPicker.clear,
				title: u(b).colorPicker.clear,
				class: "tpl:absolute tpl:right-2 tpl:top-1/2 tpl:flex tpl:size-6 tpl:-translate-y-1/2 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)] hover:tpl:text-[var(--tpl-text)]",
				onClick: G
			}, [h(u(pe), {
				size: 14,
				"stroke-width": 1.5
			})], 8, Pe)) : l("", !0)])) : l("", !0),
			(e(), te(o, {
				to: u(K),
				disabled: !u(K)
			}, [h(ne, {
				"enter-active-class": "tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
				"enter-from-class": "tpl:opacity-0 tpl:scale-95 tpl:translate-y-1",
				"enter-to-class": "tpl:opacity-100 tpl:scale-100 tpl:translate-y-0",
				"leave-active-class": "tpl:transition-all tpl:duration-[80ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
				"leave-from-class": "tpl:opacity-100 tpl:scale-100 tpl:translate-y-0",
				"leave-to-class": "tpl:opacity-0 tpl:scale-95 tpl:translate-y-1"
			}, {
				default: r(() => [x.value ? (e(), c("div", {
					key: 0,
					ref_key: "popoverRef",
					ref: S,
					"data-tpl-theme": u(_e),
					class: "tpl-color-popover tpl:absolute tpl:z-modal tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:p-3 tpl:shadow-lg",
					style: p({
						top: `${Y.value.top}px`,
						left: `${Y.value.left}px`,
						...u(J)
					})
				}, [
					M.value ? (e(), c("div", {
						key: 0,
						role: "radiogroup",
						"aria-label": u(b).colorPicker.presetColors,
						class: d(["tpl:flex tpl:flex-wrap tpl:gap-1.5", N.value && "tpl:mb-2"]),
						onKeydown: he
					}, [L.value ? (e(), c("button", {
						key: 0,
						type: "button",
						role: "radio",
						"aria-label": u(b).colorPicker.clear,
						title: u(b).colorPicker.clear,
						"aria-checked": T.value,
						tabindex: B(),
						class: d(["tpl-color-swatch-empty tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:outline-none tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:focus-visible:ring-2 tpl:focus-visible:ring-[var(--tpl-primary)] tpl:focus-visible:ring-offset-1 tpl:focus-visible:ring-offset-[var(--tpl-bg-elevated)]", T.value ? "tpl:ring-2 tpl:ring-[var(--tpl-primary)] tpl:ring-offset-1 tpl:ring-offset-[var(--tpl-bg-elevated)]" : "hover:tpl:border-[var(--tpl-text-dim)]"]),
						onClick: G
					}, null, 10, Le)) : l("", !0), (e(!0), c(re, null, t(A.value, (t, n) => (e(), c("button", {
						key: t,
						type: "button",
						role: "radio",
						"aria-label": t,
						title: t,
						"aria-checked": F(t),
						tabindex: V(n),
						style: p({ backgroundColor: t }),
						class: d(["tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:outline-none tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:focus-visible:ring-2 tpl:focus-visible:ring-[var(--tpl-primary)] tpl:focus-visible:ring-offset-1 tpl:focus-visible:ring-offset-[var(--tpl-bg-elevated)]", F(t) ? "tpl:ring-2 tpl:ring-[var(--tpl-primary)] tpl:ring-offset-1 tpl:ring-offset-[var(--tpl-bg-elevated)]" : "hover:tpl:border-[var(--tpl-text-dim)]"]),
						onClick: (e) => I(t)
					}, null, 14, Re))), 128))], 42, Ie)) : l("", !0),
					N.value ? (e(), c("hex-color-picker", {
						key: 1,
						color: D.value,
						"aria-label": u(b).colorPicker.pickColor,
						onColorChanged: ge,
						onPointerdown: H,
						onPointerup: U,
						onKeydown: i[0] ||= a((e) => x.value = !1, ["escape"])
					}, null, 40, ze)) : l("", !0),
					m.swatchOnly && N.value ? (e(), c("div", Be, [f("input", {
						type: "text",
						class: d([u(me), "tpl:w-full"]),
						style: p(O.value ? { paddingRight: "2.25rem" } : void 0),
						value: E.value,
						placeholder: m.placeholder || u(b).colorPicker.notSet,
						disabled: m.disabled,
						"aria-label": u(b).colorPicker.hexValue,
						onChange: W,
						onKeydown: i[1] ||= a(ee((e) => e.target.blur(), ["prevent"]), ["enter"])
					}, null, 46, Ve), O.value ? (e(), c("button", {
						key: 0,
						type: "button",
						"aria-label": u(b).colorPicker.clear,
						title: u(b).colorPicker.clear,
						class: "tpl:absolute tpl:right-2 tpl:top-1/2 tpl:flex tpl:size-6 tpl:-translate-y-1/2 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)] hover:tpl:text-[var(--tpl-text)]",
						onClick: G
					}, [h(u(pe), {
						size: 14,
						"stroke-width": 1.5
					})], 8, He)) : l("", !0)])) : l("", !0)
				], 12, Fe)) : l("", !0)]),
				_: 1
			})], 8, ["to", "disabled"]))
		], 2));
	}
});
//#endregion
export { S as _, k as a, D as c, T as d, v as f, w as g, _ as h, M as i, C as l, b as m, A as n, E as o, y as p, j as r, O as s, Ue as t, x as u };

//# sourceMappingURL=ColorPicker-yxvrro60.js.map