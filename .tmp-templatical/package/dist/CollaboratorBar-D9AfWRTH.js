import { A as e, Dt as t, O as n, Ot as r, _ as i, c as a, d as o, l as s, nt as c, r as l, s as u, u as d } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import "./useEditorCore-BMbxdUbY.js";
import { t as f } from "./createLucideIcon-D7GKhya2.js";
import { n as p } from "./useCloudI18n-KgIWl-IE.js";
import { t as m } from "./readableTextColor-f8Kykfnh.js";
var h = f("wifi-off", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 5.17-2.69",
		key: "1dl1wf"
	}],
	["path", {
		d: "M19 12.859a10 10 0 0 0-2.007-1.523",
		key: "4k23kn"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 4.177-2.643",
		key: "1grhjp"
	}],
	["path", {
		d: "M22 8.82a15 15 0 0 0-11.288-3.764",
		key: "z3jwby"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]), g = f("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]), _ = { class: "tpl-collaborator-bar tpl:flex tpl:items-center tpl:gap-2" }, v = ["title"], y = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:-space-x-1.5"
}, b = ["title"], x = ["title"], S = 3, C = /* @__PURE__ */ i({
	__name: "CollaboratorBar",
	props: {
		collaborators: {},
		isConnected: { type: Boolean }
	},
	setup(i) {
		let f = i, { t: C } = p(), w = u(() => f.collaborators.slice(0, S)), T = u(() => f.collaborators.slice(S)), E = u(() => T.value.length), D = u(() => T.value.map((e) => e.name).join("\n"));
		function O(e) {
			let t = e.trim().split(/\s+/);
			return t.length >= 2 ? (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase() : e.charAt(0).toUpperCase();
		}
		return (u, f) => (n(), o("div", _, [a("div", {
			class: "tpl:flex tpl:items-center tpl:gap-1 tpl:text-[11px]",
			style: t({ color: i.isConnected ? "var(--tpl-success)" : "var(--tpl-text-muted)" }),
			title: i.isConnected ? c(C).collaboration.connected : c(C).collaboration.disconnected
		}, [i.isConnected ? (n(), s(c(g), {
			key: 0,
			size: 12,
			"stroke-width": 2
		})) : (n(), s(c(h), {
			key: 1,
			size: 12,
			"stroke-width": 2
		}))], 12, v), i.collaborators.length > 0 ? (n(), o("div", y, [(n(!0), o(l, null, e(w.value, (e) => (n(), o("div", {
			key: e.id,
			class: "tpl-collaborator-avatar tpl:relative tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-2 tpl:text-[10px] tpl:font-bold tpl:transition-transform tpl:duration-150 tpl:hover:z-10 tpl:hover:scale-110 tpl:border-[var(--tpl-bg)]",
			style: t({
				backgroundColor: e.color,
				color: c(m)(e.color)
			}),
			title: e.name
		}, r(O(e.name)), 13, b))), 128)), E.value > 0 ? (n(), o("div", {
			key: 0,
			class: "tpl:relative tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-2 tpl:text-[9px] tpl:font-bold tpl:border-[var(--tpl-bg)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-muted)]",
			title: D.value
		}, " +" + r(E.value), 9, x)) : d("", !0)])) : d("", !0)]));
	}
});
//#endregion
export { C as default };
