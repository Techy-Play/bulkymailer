import { T as e, Z as t } from "./draggable-BRF_Q_jB.js";
import { F as n } from "./keys-CZOBuCQd.js";
//#region src/utils/resolveColorsConfig.ts
var r = {
	presets: [],
	allowCustom: !0,
	allowCustomIgnored: !1,
	invalidPresets: []
}, i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
function a(e, t = r) {
	let n, a;
	if (e?.presets === void 0) n = t.presets, a = [];
	else {
		n = [], a = [];
		for (let t of e.presets) i.test(t) ? n.push(t) : a.push(t);
	}
	let o = e?.allowCustom ?? t.allowCustom, s = !o && n.length === 0;
	return {
		presets: n,
		allowCustom: s ? !0 : o,
		allowCustomIgnored: s,
		invalidPresets: a
	};
}
//#endregion
//#region src/utils/color.ts
function o(e) {
	let t = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(e.trim());
	if (!t) return e;
	let n = (e) => Number(e).toString(16).padStart(2, "0");
	return `#${n(t[1])}${n(t[2])}${n(t[3])}`;
}
function s(e) {
	let t = o(e), n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t);
	return n ? `#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}`.toLowerCase() : /^#[0-9a-f]{6}$/i.test(t) ? t.toLowerCase() : t;
}
//#endregion
//#region src/composables/usePopoverRoot.ts
function c() {
	return e(n, t(null));
}
//#endregion
//#region src/composables/usePopoverPosition.ts
function l() {
	let e = c();
	function t(t) {
		let n = e.value?.getBoundingClientRect();
		return n ? {
			top: t.top - n.top,
			left: t.left - n.left
		} : {
			top: t.top,
			left: t.left
		};
	}
	return { toLocal: t };
}
//#endregion
export { r as a, o as i, c as n, a as o, s as r, l as t };

//# sourceMappingURL=usePopoverPosition-Dm1jv3y5.js.map