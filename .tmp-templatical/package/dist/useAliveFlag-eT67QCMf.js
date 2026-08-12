import { T as e } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
//#region src/composables/useAliveFlag.ts
function t() {
	let t = { alive: !0 };
	return e(() => {
		t.alive = !1;
	}), t;
}
//#endregion
export { t };
