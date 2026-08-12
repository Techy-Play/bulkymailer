import { O as e, _ as t, d as n, g as r, l as i, nt as a, r as o, u as s } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
//#endregion
//#region src/components/SavedBlocksPanels.vue
var c = /* @__PURE__ */ t({
	__name: "SavedBlocksPanels",
	props: { feature: {} },
	setup(t) {
		let c = t, l = r(() => import("./SavedBlocksPickBar-DD5Ddv9t.js")), u = r(() => import("./SaveBlockDialog-R9PbMsy-.js")), d = r(() => import("./SavedBlocksBrowserModal-ttPAklPE.js"));
		function f(e, t) {
			c.feature.insert(e, t);
		}
		return (r, c) => (e(), n(o, null, [
			t.feature.isPicking.value ? (e(), i(a(l), {
				key: 0,
				count: t.feature.pickedCount.value,
				onConfirm: c[0] ||= (e) => t.feature.confirmPicking(),
				onCancel: c[1] ||= (e) => t.feature.cancelPicking()
			}, null, 8, ["count"])) : s("", !0),
			t.feature.isSaveDialogOpen.value ? (e(), i(a(u), {
				key: 1,
				visible: t.feature.isSaveDialogOpen.value,
				"picked-ids": [...t.feature.pickedIds.value],
				onClose: c[2] ||= (e) => t.feature.closeSaveDialog(),
				onSaved: c[3] ||= (e) => t.feature.refresh()
			}, null, 8, ["visible", "picked-ids"])) : s("", !0),
			t.feature.isBrowserOpen.value ? (e(), i(a(d), {
				key: 2,
				visible: t.feature.isBrowserOpen.value,
				onClose: c[4] ||= (e) => t.feature.closeBrowser(),
				onInsert: f
			}, null, 8, ["visible"])) : s("", !0)
		], 64));
	}
});
//#endregion
export { c as default };
