import { W as e, x as t } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { l as n } from "./keys-BI6VSUh4.js";
//#region src/composables/useCloudI18n.ts
function r(e, t) {
	return e.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : `{${n}}`);
}
function i(i) {
	let a = i ?? t(n, null);
	return {
		t: a ? e(a) ? a.value : a : null,
		format: r
	};
}
function a(e) {
	let { t, format: n } = i(e);
	if (!t) throw Error("useCloudI18nStrict() requires a cloud translations provider. Ensure the component is a descendant of CloudEditor.");
	return {
		t,
		format: n
	};
}
//#endregion
export { a as n, i as t };
