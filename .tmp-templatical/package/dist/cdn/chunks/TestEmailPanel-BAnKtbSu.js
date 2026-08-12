import { M as e, b as t, h as n, it as r, m as i, x as a } from "./draggable-BRF_Q_jB.js";
//#endregion
//#region src/components/TestEmailPanel.vue
var o = /* @__PURE__ */ a({
	__name: "TestEmailPanel",
	props: { feature: {} },
	setup(a) {
		let o = a, s = t(() => import("./TestEmailModal-_RbTD787.js"));
		function c(e) {
			o.feature.send(e);
		}
		return (t, o) => a.feature.isModalOpen.value ? (e(), i(r(s), {
			key: 0,
			visible: a.feature.isModalOpen.value,
			"allowed-recipients": a.feature.allowedRecipients.value,
			"default-recipient": a.feature.defaultRecipient.value,
			"is-sending": a.feature.isSending.value,
			"just-sent": a.feature.justSent.value,
			error: a.feature.error.value,
			onSend: c,
			onClose: o[0] ||= (e) => a.feature.close()
		}, null, 8, [
			"visible",
			"allowed-recipients",
			"default-recipient",
			"is-sending",
			"just-sent",
			"error"
		])) : n("", !0);
	}
});
//#endregion
export { o as default };

//# sourceMappingURL=TestEmailPanel-BAnKtbSu.js.map