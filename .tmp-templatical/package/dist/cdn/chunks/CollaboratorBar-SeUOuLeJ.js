import { M as e, P as t, ct as n, f as r, g as i, h as a, it as o, m as s, p as c, st as l, u, x as d } from "./draggable-BRF_Q_jB.js";
import "./useEditorCore-CTYH6u4r.js";
import { a as f, i as p } from "./icons-DN008liP.js";
import { n as m } from "./useCloudI18n-CML0BxqX.js";
import { t as h } from "./readableTextColor-f8Kykfnh.js";
//#region src/cloud/components/CollaboratorBar.vue?vue&type=script&setup=true&lang.ts
var g = { class: "tpl-collaborator-bar tpl:flex tpl:items-center tpl:gap-2" }, _ = ["title"], v = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:-space-x-1.5"
}, y = ["title"], b = ["title"], x = 3, S = /* @__PURE__ */ d({
	__name: "CollaboratorBar",
	props: {
		collaborators: {},
		isConnected: { type: Boolean }
	},
	setup(d) {
		let S = d, { t: C } = m(), w = r(() => S.collaborators.slice(0, x)), T = r(() => S.collaborators.slice(x)), E = r(() => T.value.length), D = r(() => T.value.map((e) => e.name).join("\n"));
		function O(e) {
			let t = e.trim().split(/\s+/);
			return t.length >= 2 ? (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase() : e.charAt(0).toUpperCase();
		}
		return (r, m) => (e(), i("div", g, [c("div", {
			class: "tpl:flex tpl:items-center tpl:gap-1 tpl:text-[11px]",
			style: l({ color: d.isConnected ? "var(--tpl-success)" : "var(--tpl-text-muted)" }),
			title: d.isConnected ? o(C).collaboration.connected : o(C).collaboration.disconnected
		}, [d.isConnected ? (e(), s(o(p), {
			key: 0,
			size: 12,
			"stroke-width": 2
		})) : (e(), s(o(f), {
			key: 1,
			size: 12,
			"stroke-width": 2
		}))], 12, _), d.collaborators.length > 0 ? (e(), i("div", v, [(e(!0), i(u, null, t(w.value, (t) => (e(), i("div", {
			key: t.id,
			class: "tpl-collaborator-avatar tpl:relative tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-2 tpl:text-[10px] tpl:font-bold tpl:transition-transform tpl:duration-150 tpl:hover:z-10 tpl:hover:scale-110 tpl:border-[var(--tpl-bg)]",
			style: l({
				backgroundColor: t.color,
				color: o(h)(t.color)
			}),
			title: t.name
		}, n(O(t.name)), 13, y))), 128)), E.value > 0 ? (e(), i("div", {
			key: 0,
			class: "tpl:relative tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-2 tpl:text-[9px] tpl:font-bold tpl:border-[var(--tpl-bg)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)]",
			title: D.value
		}, " +" + n(E.value), 9, b)) : a("", !0)])) : a("", !0)]));
	}
});
//#endregion
export { S as default };

//# sourceMappingURL=CollaboratorBar-SeUOuLeJ.js.map