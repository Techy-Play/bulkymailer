import { s as e, x as t, y as n } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
//#region ../../node_modules/.pnpm/@lucide+vue@1.29.0_vue@3.5.41_typescript@6.0.3_/node_modules/@lucide/vue/dist/esm/shared/src/utils/isEmptyString.mjs
var r = (e) => e === "", i = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), a = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), o = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), s = (e) => {
	let t = o(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, c = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, l = /* @__PURE__ */ Symbol("lucide-icons");
function u() {
	return t(l, {});
}
//#endregion
//#region ../../node_modules/.pnpm/@lucide+vue@1.29.0_vue@3.5.41_typescript@6.0.3_/node_modules/@lucide/vue/dist/esm/Icon.mjs
var d = ({ name: t, iconNode: o, "icon-node": l, absoluteStrokeWidth: d, "absolute-stroke-width": f, strokeWidth: p, "stroke-width": m, size: h, color: g, ..._ }, { slots: v }) => {
	let { size: y, color: b, strokeWidth: x = 2, absoluteStrokeWidth: S = !1, class: C = "" } = u(), w = e(() => {
		let e = r(d) || r(f) || d === !0 || f === !0 || S === !0, t = p || m || x || c["stroke-width"];
		return e ? Number(t) * 24 / Number(h ?? y ?? c.width) : t;
	});
	return n("svg", {
		...c,
		..._,
		width: h ?? y ?? c.width,
		height: h ?? y ?? c.height,
		stroke: g ?? b ?? c.stroke,
		"stroke-width": w.value,
		class: i("lucide", C, ...t ? [`lucide-${a(s(t))}-icon`, `lucide-${a(t)}`] : ["lucide-icon"])
	}, [...(o ?? l ?? []).map((e) => n(...e)), ...v.default ? [v.default()] : []]);
}, f = (e, t) => (r, { slots: i, attrs: a }) => n(d, {
	...a,
	...r,
	iconNode: t,
	name: e
}, i.default ? { default: i.default } : void 0);
//#endregion
export { f as t };
