import { F as e, M as t, T as n, V as r, Z as i, d as a, f as o, g as s, h as c, it as l, l as u, m as d, n as f, p, st as m, x as h, y as g } from "./draggable-BRF_Q_jB.js";
import { D as _ } from "./useEditorCore-CTYH6u4r.js";
import { U as v, V as y } from "./keys-CZOBuCQd.js";
import { n as b } from "./usePopoverPosition-Dm1jv3y5.js";
//#region src/components/TplModal.vue?vue&type=script&setup=true&lang.ts
var x = ["data-tpl-theme"], S = /* @__PURE__ */ h({
	__name: "TplModal",
	props: { visible: { type: Boolean } },
	emits: ["close", "keydown"],
	setup(h, { emit: S }) {
		let C = h, w = S, T = i(null), E = o(() => C.visible);
		_(T, E);
		let D = n(v), O = n(y, null), k = b();
		function A(e) {
			e.key === "Escape" && w("close"), w("keydown", e);
		}
		return (n, i) => l(k) ? (t(), d(a, {
			key: 0,
			to: l(k)
		}, [g(f, {
			"enter-active-class": "tpl:transition tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"enter-to-class": "tpl:opacity-100",
			"leave-active-class": "tpl:transition tpl:duration-100",
			"leave-from-class": "tpl:opacity-100",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: r(() => [h.visible ? (t(), s("div", {
				key: 0,
				"data-tpl-theme": l(D),
				class: "tpl tpl:fixed tpl:inset-0 tpl:z-modal tpl:flex tpl:items-center tpl:justify-center",
				style: m([{
					"background-color": "var(--tpl-overlay)",
					"backdrop-filter": "blur(8px)",
					"-webkit-backdrop-filter": "blur(8px)"
				}, l(O)]),
				onClick: i[0] ||= u((e) => w("close"), ["self"]),
				onKeydown: A
			}, [p("div", {
				ref_key: "dialogRef",
				ref: T
			}, [e(n.$slots, "default")], 512)], 44, x)) : c("", !0)]),
			_: 3
		})], 8, ["to"])) : c("", !0);
	}
});
//#endregion
export { S as t };

//# sourceMappingURL=TplModal-C1iguuZz.js.map