//#region src/utils/readableTextColor.ts
function e(e, i = {}) {
	let a = i.light ?? "#ffffff", o = i.dark ?? "#1f1f1f", s = t(e);
	if (!s) return a;
	let c = n(s), l = t(a), u = t(o), d = l ? n(l) : 1, f = u ? n(u) : 0;
	return r(c, d) >= r(c, f) ? a : o;
}
function t(e) {
	let t = e.trim().match(/^#?([\da-f]{3}|[\da-f]{6})$/i);
	if (!t) return null;
	let n = t[1];
	return n.length === 3 && (n = n.split("").map((e) => e + e).join("")), [
		parseInt(n.slice(0, 2), 16),
		parseInt(n.slice(2, 4), 16),
		parseInt(n.slice(4, 6), 16)
	];
}
function n([e, t, n]) {
	let r = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * r(e) + .7152 * r(t) + .0722 * r(n);
}
function r(e, t) {
	let [n, r] = e >= t ? [e, t] : [t, e];
	return (n + .05) / (r + .05);
}
//#endregion
export { e as t };
