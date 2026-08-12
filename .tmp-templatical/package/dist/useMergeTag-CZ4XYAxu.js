import { Y as e, x as t } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { D as n, P as r, a as i } from "./dist-CQ0fVBQ3.js";
import { A as a, D as o, E as s, N as c, O as l } from "./keys-BI6VSUh4.js";
//#region src/composables/useMergeTag.ts
function u() {
	let u = t(s, []), d = t(a, i.liquid), f = t(c, null), p = t(o, !0), m = t(l, null), h = e(!1);
	function g(e) {
		return r(e, d);
	}
	function _(e) {
		return n(e, u);
	}
	async function v() {
		if (f) {
			h.value = !0;
			try {
				return await f();
			} finally {
				h.value = !1;
			}
		}
		if (u.length > 0 && m) {
			h.value = !0;
			try {
				return await m.open(u);
			} finally {
				h.value = !1;
			}
		}
		return null;
	}
	return {
		mergeTags: u,
		isRequesting: h,
		canRequestMergeTag: !!f || u.length > 0,
		autocomplete: p,
		syntax: d,
		isMergeTagValue: g,
		getMergeTagLabel: _,
		requestMergeTag: v
	};
}
//#endregion
export { u as t };
