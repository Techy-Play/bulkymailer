import { W as e, x as t } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { H as n } from "./keys-BI6VSUh4.js";
//#region src/composables/useI18n.ts
function r(r) {
	let i = r ?? t(n, null);
	if (!i) throw Error("useI18n() requires a translations provider. Ensure the component is a descendant of Editor or CloudEditor.");
	let a = e(i) ? i.value : i;
	function o(e, t) {
		return e.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : `{${n}}`);
	}
	return {
		t: a,
		format: o
	};
}
//#endregion
export { r as t };
