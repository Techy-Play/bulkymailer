import { O as e, _ as t, g as n, l as r, nt as i, u as a } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
//#endregion
//#region src/components/TestEmailPanel.vue
var o = /* @__PURE__ */ t({
	__name: "TestEmailPanel",
	props: { feature: {} },
	setup(t) {
		let o = t, s = n(() => import("./TestEmailModal-KPFc5oSv.js"));
		function c(e) {
			o.feature.send(e);
		}
		return (n, o) => t.feature.isModalOpen.value ? (e(), r(i(s), {
			key: 0,
			visible: t.feature.isModalOpen.value,
			"allowed-recipients": t.feature.allowedRecipients.value,
			"default-recipient": t.feature.defaultRecipient.value,
			"is-sending": t.feature.isSending.value,
			"just-sent": t.feature.justSent.value,
			error: t.feature.error.value,
			onSend: c,
			onClose: o[0] ||= (e) => t.feature.close()
		}, null, 8, [
			"visible",
			"allowed-recipients",
			"default-recipient",
			"is-sending",
			"just-sent",
			"error"
		])) : a("", !0);
	}
});
//#endregion
export { o as default };
