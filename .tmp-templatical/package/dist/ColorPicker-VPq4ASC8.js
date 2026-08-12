import { A as e, Dt as t, Et as n, O as r, R as i, Y as a, _ as o, c as s, d as c, h as l, i as ee, l as te, nt as u, r as ne, s as d, u as f, x as p } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { c as re, s as m, t as ie } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { a as ae, i as oe, n as se, r as h, s as ce, t as le } from "./usePopoverPosition-D93u-EZm.js";
import { U as ue, V as de, u as fe } from "./keys-BI6VSUh4.js";
import { t as pe } from "./useI18n-BkHfCWC6.js";
import { t as g } from "./x-B4WnJVRx.js";
//#region src/constants/styleConstants.ts
var me = "tpl:block tpl:mb-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-text-muted)]", _ = "tpl:w-full tpl:h-10 tpl:px-3.5 tpl:py-1.5 tpl:text-sm tpl:border tpl:rounded-[var(--tpl-radius-sm)] tpl:shadow-xs tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:outline-none focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)] placeholder:tpl:text-[var(--tpl-text-dim)]", v = "tpl:w-full tpl:h-10 tpl:px-3.5 tpl:py-1.5 tpl:text-sm tpl:border tpl:rounded-l-[var(--tpl-radius-sm)] tpl:rounded-r-none tpl:border-r-0 tpl:shadow-xs tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:outline-none focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)] placeholder:tpl:text-[var(--tpl-text-dim)]", y = "tpl:flex tpl:items-center tpl:px-2.5 tpl:text-xs tpl:border tpl:border-l-0 tpl:text-[var(--tpl-text-dim)] tpl:bg-[var(--tpl-bg-hover)] tpl:border-[var(--tpl-border)] tpl:rounded-r-[var(--tpl-radius-sm)]", b = "tpl:flex-1 tpl:h-10 tpl:px-3.5 tpl:py-1.5 tpl:text-xs tpl:font-mono tpl:border tpl:rounded-[var(--tpl-radius-sm)] tpl:shadow-xs tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)] tpl:border-[var(--tpl-border)] tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:outline-none focus:tpl:border-[var(--tpl-primary)] focus:tpl:shadow-[var(--tpl-ring)]", x = "tpl:rounded-[var(--tpl-radius)] tpl:bg-[var(--tpl-bg-elevated)] tpl:p-4 tpl:border tpl:border-[var(--tpl-border)] tpl:transition-colors tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)]", S = "tpl:flex tpl:size-8 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-danger)] tpl:hover:bg-[var(--tpl-danger-light)] tpl:hover:text-[var(--tpl-danger)]", C = "tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-dashed tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:border-[var(--tpl-primary)] tpl:hover:text-[var(--tpl-primary)]", w = "tpl:w-full tpl:resize-y tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-2.5 tpl:py-2 tpl:font-mono tpl:text-xs tpl:text-[var(--tpl-text)] tpl:outline-none tpl:transition-all tpl:duration-150 tpl:placeholder:text-[var(--tpl-text-dim)] tpl:focus:border-[var(--tpl-primary)] tpl:focus:shadow-[0_0_0_3px_var(--tpl-primary-light)]", T = "tpl-btn tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:px-3.5 tpl:py-2 tpl:text-sm tpl:font-medium tpl:whitespace-nowrap tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-primary)] hover:tpl:text-[var(--tpl-bg)] tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50", E = [
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
], k = "#000000", A = "#ffffff", he = "#ffff00", j = "#f2f2f2", M = (e, t = 0, n = 1) => e > n ? n : e < t ? t : e, N = (e, t = 0, n = 10 ** t) => Math.round(n * e) / n;
360 / (Math.PI * 2);
var P = (e) => V(F(e)), F = (e) => (e[0] === "#" && (e = e.substring(1)), e.length < 6 ? {
	r: parseInt(e[0] + e[0], 16),
	g: parseInt(e[1] + e[1], 16),
	b: parseInt(e[2] + e[2], 16),
	a: e.length === 4 ? N(parseInt(e[3] + e[3], 16) / 255, 2) : 1
} : {
	r: parseInt(e.substring(0, 2), 16),
	g: parseInt(e.substring(2, 4), 16),
	b: parseInt(e.substring(4, 6), 16),
	a: e.length === 8 ? N(parseInt(e.substring(6, 8), 16) / 255, 2) : 1
}), I = (e) => B(ge(e)), L = ({ h: e, s: t, v: n, a: r }) => {
	let i = (200 - t) * n / 100;
	return {
		h: N(e),
		s: N(i > 0 && i < 200 ? t * n / 100 / (i <= 100 ? i : 200 - i) * 100 : 0),
		l: N(i / 2),
		a: N(r, 2)
	};
}, R = (e) => {
	let { h: t, s: n, l: r } = L(e);
	return `hsl(${t}, ${n}%, ${r}%)`;
}, ge = ({ h: e, s: t, v: n, a: r }) => {
	e = e / 360 * 6, t /= 100, n /= 100;
	let i = Math.floor(e), a = n * (1 - t), o = n * (1 - (e - i) * t), s = n * (1 - (1 - e + i) * t), c = i % 6;
	return {
		r: N([
			n,
			o,
			a,
			a,
			s,
			n
		][c] * 255),
		g: N([
			s,
			n,
			n,
			o,
			a,
			a
		][c] * 255),
		b: N([
			a,
			a,
			s,
			n,
			n,
			o
		][c] * 255),
		a: N(r, 2)
	};
}, z = (e) => {
	let t = e.toString(16);
	return t.length < 2 ? "0" + t : t;
}, B = ({ r: e, g: t, b: n, a: r }) => {
	let i = r < 1 ? z(N(r * 255)) : "";
	return "#" + z(e) + z(t) + z(n) + i;
}, V = ({ r: e, g: t, b: n, a: r }) => {
	let i = Math.max(e, t, n), a = i - Math.min(e, t, n), o = a ? i === e ? (t - n) / a : i === t ? 2 + (n - e) / a : 4 + (e - t) / a : 0;
	return {
		h: N(60 * (o < 0 ? o + 6 : o)),
		s: N(i ? a / i * 100 : 0),
		v: N(i / 255 * 100),
		a: r
	};
}, H = (e, t) => {
	if (e === t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}, U = (e, t) => e.toLowerCase() === t.toLowerCase() || H(F(e), F(t)), W = {}, G = (e) => {
	let t = W[e];
	return t || (t = document.createElement("template"), t.innerHTML = e, W[e] = t), t;
}, K = (e, t, n) => {
	e.dispatchEvent(new CustomEvent(t, {
		bubbles: !0,
		detail: n
	}));
}, q = !1, J = (e) => "touches" in e, Y = (e) => q && !J(e) ? !1 : (q ||= J(e), !0), X = (e, t) => {
	let n = J(t) ? t.touches[0] : t, r = e.el.getBoundingClientRect();
	K(e.el, "move", e.getMove({
		x: M((n.pageX - (r.left + window.pageXOffset)) / r.width),
		y: M((n.pageY - (r.top + window.pageYOffset)) / r.height)
	}));
}, _e = (e, t) => {
	let n = t.keyCode;
	n > 40 || e.xy && n < 37 || n < 33 || (t.preventDefault(), K(e.el, "move", e.getMove({
		x: n === 39 ? .01 : n === 37 ? -.01 : n === 34 ? .05 : n === 33 ? -.05 : n === 35 ? 1 : n === 36 ? -1 : 0,
		y: n === 40 ? .01 : n === 38 ? -.01 : 0
	}, !0)));
}, ve = class {
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
				if (e.preventDefault(), !Y(e) || !q && e.button != 0) return;
				this.el.focus(), X(this, e), this.dragging = !0;
				break;
			case "mousemove":
			case "touchmove":
				e.preventDefault(), X(this, e);
				break;
			case "mouseup":
			case "touchend":
				this.dragging = !1;
				break;
			case "keydown": _e(this, e);
		}
	}
	style(e) {
		e.forEach((e, t) => {
			for (let n in e) this.nodes[t].style.setProperty(n, e[n]);
		});
	}
}, ye = class extends ve {
	constructor(e) {
		super(e, "hue", "aria-label=\"Hue\" aria-valuemin=\"0\" aria-valuemax=\"360\"", !1);
	}
	update({ h: e }) {
		this.h = e, this.style([{
			left: `${e / 360 * 100}%`,
			color: R({
				h: e,
				s: 100,
				v: 100,
				a: 1
			})
		}]), this.el.setAttribute("aria-valuenow", `${N(e)}`);
	}
	getMove(e, t) {
		return { h: t ? M(this.h + e.x * 360, 0, 360) : 360 * e.x };
	}
}, be = class extends ve {
	constructor(e) {
		super(e, "saturation", "aria-label=\"Color\"", !0);
	}
	update(e) {
		this.hsva = e, this.style([{
			top: `${100 - e.v}%`,
			left: `${e.s}%`,
			color: R(e)
		}, { "background-color": R({
			h: e.h,
			s: 100,
			v: 100,
			a: 1
		}) }]), this.el.setAttribute("aria-valuetext", `Saturation ${N(e.s)}%, Brightness ${N(e.v)}%`);
	}
	getMove(e, t) {
		return {
			s: t ? M(this.hsva.s + e.x * 100, 0, 100) : e.x * 100,
			v: t ? M(this.hsva.v - e.y * 100, 0, 100) : Math.round(100 - e.y * 100)
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
	toHsva: P,
	fromHsva: ({ h: e, s: t, v: n }) => I({
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
}, je = class extends Ae {};
customElements.define("hex-color-picker", je);
//#endregion
//#region src/components/ColorPicker.vue?vue&type=script&setup=true&lang.ts
var Me = [
	"disabled",
	"aria-label",
	"title",
	"aria-expanded"
], Ne = {
	key: 0,
	class: "tpl:relative tpl:flex-1"
}, Pe = [
	"value",
	"placeholder",
	"disabled",
	"aria-label"
], Fe = ["aria-label", "title"], Ie = ["data-tpl-theme"], Le = ["aria-label"], Re = [
	"aria-label",
	"title",
	"aria-checked",
	"tabindex"
], ze = [
	"aria-label",
	"title",
	"aria-checked",
	"tabindex",
	"onClick"
], Be = ["color", "aria-label"], Ve = {
	key: 2,
	class: "tpl:relative tpl:mt-2"
}, He = [
	"value",
	"placeholder",
	"disabled",
	"aria-label"
], Ue = ["aria-label", "title"], We = /* @__PURE__ */ o({
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
	setup(o, { emit: me }) {
		let _ = o, v = me, { t: y } = pe(), x = a(!1), S = a(), C = a(), w = a(!1);
		ce(S, () => {
			x.value = !1;
		}, { ignore: [C] });
		let T = d(() => !_.modelValue), E = d(() => oe(_.modelValue)), D = d(() => oe(_.modelValue || _.seedColor)), O = d(() => !_.disabled && !T.value), k = p(fe, ae), A = d(() => [...new Set(_.presets ?? k.presets)]), he = d(() => _.allowCustom ?? k.allowCustom), j = d(() => A.value.length > 0), M = d(() => he.value || !j.value), N = d(() => h(_.modelValue));
		function P(e) {
			return N.value !== "" && h(e) === N.value;
		}
		function F(e) {
			v("update:modelValue", e);
		}
		let I = d(() => j.value && !M.value);
		function L(e) {
			return I.value ? e + 1 : e;
		}
		let R = d(() => {
			if (I.value && T.value) return 0;
			let e = A.value.findIndex((e) => P(e));
			return e === -1 ? 0 : L(e);
		});
		function ge() {
			return R.value === 0 ? 0 : -1;
		}
		function z(e) {
			return L(e) === R.value ? 0 : -1;
		}
		function B(e) {
			if (![
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft",
				"ArrowUp"
			].includes(e.key)) return;
			let t = e.currentTarget, n = Array.from(t.querySelectorAll("[role=\"radio\"]")), r = e.target.closest("[role=\"radio\"]"), i = r ? n.indexOf(r) : -1;
			i !== -1 && (n[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + n.length) % n.length]?.focus(), e.preventDefault());
		}
		function V(e) {
			w.value = !0, v("update:modelValue", e.detail.value);
		}
		function H() {
			w.value = !1;
		}
		function U() {
			!w.value && T.value && v("update:modelValue", D.value);
		}
		function W(e) {
			v("update:modelValue", e.target.value);
		}
		function G() {
			v("update:modelValue", "");
		}
		let K = se(), { toLocal: q } = le(), J = p(de, null), Y = p(ue, null), X = a({
			top: 0,
			left: 0
		});
		function _e() {
			if (!_.disabled) {
				if (!x.value) {
					let e = C.value?.getBoundingClientRect();
					if (e) {
						let t = e.bottom + 8 + 240 <= window.innerHeight ? e.bottom + 8 : Math.max(8, e.top - 240 - 8);
						X.value = q({
							top: t,
							left: e.left
						});
					}
				}
				x.value = !x.value;
			}
		}
		return (a, d) => (r(), c("div", { class: n(["tpl:flex tpl:items-center tpl:gap-2 tpl:relative", o.disabled && "tpl:opacity-60 tpl:cursor-not-allowed"]) }, [
			s("button", {
				ref_key: "swatchRef",
				ref: C,
				type: "button",
				disabled: o.disabled,
				"aria-label": o.ariaLabel || u(y).colorPicker.pickColor,
				title: o.ariaLabel || void 0,
				"aria-expanded": x.value,
				class: n([
					"tpl:shrink-0 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-0.5 tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
					o.disabled ? "tpl:cursor-not-allowed" : "tpl:cursor-pointer",
					x.value ? "tpl:border-[var(--tpl-primary)] tpl:shadow-[var(--tpl-ring)]" : !o.disabled && "hover:tpl:border-[var(--tpl-text-dim)]",
					o.size === "sm" ? "tpl:size-8" : "tpl:size-10"
				]),
				onClick: _e
			}, [s("span", {
				class: n(["tpl:block tpl:size-full tpl:rounded-[calc(var(--tpl-radius-sm)-2px)]", { "tpl-color-swatch-empty": T.value }]),
				style: t(T.value ? void 0 : { backgroundColor: E.value })
			}, null, 6)], 10, Me),
			!o.swatchOnly && M.value ? (r(), c("div", Ne, [s("input", {
				type: "text",
				class: n([u(b), "tpl:w-full"]),
				style: t(O.value ? { paddingRight: "2.25rem" } : void 0),
				value: E.value,
				placeholder: o.placeholder || u(y).colorPicker.notSet,
				disabled: o.disabled,
				"aria-label": u(y).colorPicker.hexValue,
				onInput: W
			}, null, 46, Pe), O.value ? (r(), c("button", {
				key: 0,
				type: "button",
				"aria-label": u(y).colorPicker.clear,
				title: u(y).colorPicker.clear,
				class: "tpl:absolute tpl:right-2 tpl:top-1/2 tpl:flex tpl:size-6 tpl:-translate-y-1/2 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)] hover:tpl:text-[var(--tpl-text)]",
				onClick: G
			}, [l(u(g), {
				size: 14,
				"stroke-width": 1.5
			})], 8, Fe)) : f("", !0)])) : f("", !0),
			(r(), te(ee, {
				to: u(K),
				disabled: !u(K)
			}, [l(ie, {
				"enter-active-class": "tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
				"enter-from-class": "tpl:opacity-0 tpl:scale-95 tpl:translate-y-1",
				"enter-to-class": "tpl:opacity-100 tpl:scale-100 tpl:translate-y-0",
				"leave-active-class": "tpl:transition-all tpl:duration-[80ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)]",
				"leave-from-class": "tpl:opacity-100 tpl:scale-100 tpl:translate-y-0",
				"leave-to-class": "tpl:opacity-0 tpl:scale-95 tpl:translate-y-1"
			}, {
				default: i(() => [x.value ? (r(), c("div", {
					key: 0,
					ref_key: "popoverRef",
					ref: S,
					"data-tpl-theme": u(Y),
					class: "tpl-color-popover tpl:absolute tpl:z-modal tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:p-3 tpl:shadow-lg",
					style: t({
						top: `${X.value.top}px`,
						left: `${X.value.left}px`,
						...u(J)
					})
				}, [
					j.value ? (r(), c("div", {
						key: 0,
						role: "radiogroup",
						"aria-label": u(y).colorPicker.presetColors,
						class: n(["tpl:flex tpl:flex-wrap tpl:gap-1.5", M.value && "tpl:mb-2"]),
						onKeydown: B
					}, [I.value ? (r(), c("button", {
						key: 0,
						type: "button",
						role: "radio",
						"aria-label": u(y).colorPicker.clear,
						title: u(y).colorPicker.clear,
						"aria-checked": T.value,
						tabindex: ge(),
						class: n(["tpl-color-swatch-empty tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:outline-none tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:focus-visible:ring-2 tpl:focus-visible:ring-[var(--tpl-primary)] tpl:focus-visible:ring-offset-1 tpl:focus-visible:ring-offset-[var(--tpl-bg-elevated)]", T.value ? "tpl:ring-2 tpl:ring-[var(--tpl-primary)] tpl:ring-offset-1 tpl:ring-offset-[var(--tpl-bg-elevated)]" : "hover:tpl:border-[var(--tpl-text-dim)]"]),
						onClick: G
					}, null, 10, Re)) : f("", !0), (r(!0), c(ne, null, e(A.value, (e, i) => (r(), c("button", {
						key: e,
						type: "button",
						role: "radio",
						"aria-label": e,
						title: e,
						"aria-checked": P(e),
						tabindex: z(i),
						style: t({ backgroundColor: e }),
						class: n(["tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:outline-none tpl:transition-all tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] tpl:focus-visible:ring-2 tpl:focus-visible:ring-[var(--tpl-primary)] tpl:focus-visible:ring-offset-1 tpl:focus-visible:ring-offset-[var(--tpl-bg-elevated)]", P(e) ? "tpl:ring-2 tpl:ring-[var(--tpl-primary)] tpl:ring-offset-1 tpl:ring-offset-[var(--tpl-bg-elevated)]" : "hover:tpl:border-[var(--tpl-text-dim)]"]),
						onClick: (t) => F(e)
					}, null, 14, ze))), 128))], 42, Le)) : f("", !0),
					M.value ? (r(), c("hex-color-picker", {
						key: 1,
						color: D.value,
						"aria-label": u(y).colorPicker.pickColor,
						onColorChanged: V,
						onPointerdown: H,
						onPointerup: U,
						onKeydown: d[0] ||= m((e) => x.value = !1, ["escape"])
					}, null, 40, Be)) : f("", !0),
					o.swatchOnly && M.value ? (r(), c("div", Ve, [s("input", {
						type: "text",
						class: n([u(b), "tpl:w-full"]),
						style: t(O.value ? { paddingRight: "2.25rem" } : void 0),
						value: E.value,
						placeholder: o.placeholder || u(y).colorPicker.notSet,
						disabled: o.disabled,
						"aria-label": u(y).colorPicker.hexValue,
						onChange: W,
						onKeydown: d[1] ||= m(re((e) => e.target.blur(), ["prevent"]), ["enter"])
					}, null, 46, He), O.value ? (r(), c("button", {
						key: 0,
						type: "button",
						"aria-label": u(y).colorPicker.clear,
						title: u(y).colorPicker.clear,
						class: "tpl:absolute tpl:right-2 tpl:top-1/2 tpl:flex tpl:size-6 tpl:-translate-y-1/2 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-sm)] tpl:text-[var(--tpl-text-dim)] tpl:transition-colors tpl:duration-[120ms] tpl:ease-[cubic-bezier(0.16,1,0.3,1)] hover:tpl:bg-[var(--tpl-bg-hover)] hover:tpl:text-[var(--tpl-text)]",
						onClick: G
					}, [l(u(g), {
						size: 14,
						"stroke-width": 1.5
					})], 8, Ue)) : f("", !0)])) : f("", !0)
				], 12, Ie)) : f("", !0)]),
				_: 1
			})], 8, ["to", "disabled"]))
		], 2));
	}
});
//#endregion
export { S as _, k as a, D as c, T as d, _ as f, w as g, me as h, j as i, C as l, y as m, A as n, E as o, v as p, he as r, O as s, We as t, x as u };
