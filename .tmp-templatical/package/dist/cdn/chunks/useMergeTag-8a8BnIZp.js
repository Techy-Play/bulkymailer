import { T as e, Z as t } from "./draggable-BRF_Q_jB.js";
import { f as n, o as r, r as i } from "./src-CZjSXPYq.js";
import { A as a, D as o, E as s, N as c, O as l } from "./keys-CZOBuCQd.js";
//#region src/composables/useMergeTag.ts
function u() {
	let u = e(s, []), d = e(a, i.liquid), f = e(c, null), p = e(o, !0), m = e(l, null), h = t(!1);
	function g(e) {
		return n(e, d);
	}
	function _(e) {
		return r(e, u);
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

//# sourceMappingURL=useMergeTag-8a8BnIZp.js.map