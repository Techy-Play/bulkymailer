import { Dt as e, O as t, R as n, Y as r, _ as i, c as a, d as o, h as s, i as c, j as l, l as u, nt as d, s as f, u as p, x as m } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { c as h, t as g } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { O as _ } from "./useEditorCore-BMbxdUbY.js";
import { n as v } from "./usePopoverPosition-D93u-EZm.js";
import { U as y, V as b } from "./keys-BI6VSUh4.js";
//#region src/components/TplModal.vue?vue&type=script&setup=true&lang.ts
var x = ["data-tpl-theme"], S = /* @__PURE__ */ i({
	__name: "TplModal",
	props: { visible: { type: Boolean } },
	emits: ["close", "keydown"],
	setup(i, { emit: S }) {
		let C = i, w = S, T = r(null), E = f(() => C.visible);
		_(T, E);
		let D = m(y), O = m(b, null), k = v();
		function A(e) {
			e.key === "Escape" && w("close"), w("keydown", e);
		}
		return (r, f) => d(k) ? (t(), u(c, {
			key: 0,
			to: d(k)
		}, [s(g, {
			"enter-active-class": "tpl:transition tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"enter-to-class": "tpl:opacity-100",
			"leave-active-class": "tpl:transition tpl:duration-100",
			"leave-from-class": "tpl:opacity-100",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: n(() => [i.visible ? (t(), o("div", {
				key: 0,
				"data-tpl-theme": d(D),
				class: "tpl tpl:fixed tpl:inset-0 tpl:z-modal tpl:flex tpl:items-center tpl:justify-center",
				style: e([{
					"background-color": "var(--tpl-overlay)",
					"backdrop-filter": "blur(8px)",
					"-webkit-backdrop-filter": "blur(8px)"
				}, d(O)]),
				onClick: f[0] ||= h((e) => w("close"), ["self"]),
				onKeydown: A
			}, [a("div", {
				ref_key: "dialogRef",
				ref: T
			}, [l(r.$slots, "default")], 512)], 44, x)) : p("", !0)]),
			_: 3
		})], 8, ["to"])) : p("", !0);
	}
});
//#endregion
export { S as t };
