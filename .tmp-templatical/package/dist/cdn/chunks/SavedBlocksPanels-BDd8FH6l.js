import { M as e, b as t, g as n, h as r, it as i, m as a, u as o, x as s } from "./draggable-BRF_Q_jB.js";
//#endregion
//#region src/components/SavedBlocksPanels.vue
var c = /* @__PURE__ */ s({
	__name: "SavedBlocksPanels",
	props: { feature: {} },
	setup(s) {
		let c = s, l = t(() => import("./SavedBlocksPickBar-BNkLe8In.js")), u = t(() => import("./SaveBlockDialog-D3-oILb5.js")), d = t(() => import("./SavedBlocksBrowserModal-jMnNd4wn.js"));
		function f(e, t) {
			c.feature.insert(e, t);
		}
		return (t, c) => (e(), n(o, null, [
			s.feature.isPicking.value ? (e(), a(i(l), {
				key: 0,
				count: s.feature.pickedCount.value,
				onConfirm: c[0] ||= (e) => s.feature.confirmPicking(),
				onCancel: c[1] ||= (e) => s.feature.cancelPicking()
			}, null, 8, ["count"])) : r("", !0),
			s.feature.isSaveDialogOpen.value ? (e(), a(i(u), {
				key: 1,
				visible: s.feature.isSaveDialogOpen.value,
				"picked-ids": [...s.feature.pickedIds.value],
				onClose: c[2] ||= (e) => s.feature.closeSaveDialog(),
				onSaved: c[3] ||= (e) => s.feature.refresh()
			}, null, 8, ["visible", "picked-ids"])) : r("", !0),
			s.feature.isBrowserOpen.value ? (e(), a(i(d), {
				key: 2,
				visible: s.feature.isBrowserOpen.value,
				onClose: c[4] ||= (e) => s.feature.closeBrowser(),
				onInsert: f
			}, null, 8, ["visible"])) : r("", !0)
		], 64));
	}
});
//#endregion
export { c as default };

//# sourceMappingURL=SavedBlocksPanels-BDd8FH6l.js.map