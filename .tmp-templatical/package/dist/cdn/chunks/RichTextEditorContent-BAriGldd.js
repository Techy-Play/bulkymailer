import { E as e, H as t, L as n, M as r, R as i, T as a, ct as o, d as s, f as c, g as l, h as u, it as d, l as f, m as p, o as m, p as h, st as g, v as _, x as v, y } from "./draggable-BRF_Q_jB.js";
import { U as b, V as x, g as S } from "./keys-CZOBuCQd.js";
import { t as C } from "./useI18n-aRMtgYRj.js";
import { n as w } from "./usePopoverPosition-Dm1jv3y5.js";
import { n as T } from "./icons-DN008liP.js";
import { t as E } from "./ColorPicker-yxvrro60.js";
//#region src/components/blocks/RichTextLinkDialog.vue?vue&type=script&setup=true&lang.ts
var D = ["data-tpl-theme"], O = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-5 tpl:py-4" }, k = {
	id: "tpl-link-dialog-title",
	class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
}, A = ["aria-label"], j = { class: "tpl:p-5" }, M = { class: "tpl:mb-4 tpl:last:mb-0" }, N = {
	for: "tpl-link-dialog-url",
	class: "tpl:mb-1.5 tpl:block tpl:text-xs tpl:font-medium tpl:tracking-wide tpl:text-[var(--tpl-text-muted)] tpl:uppercase"
}, P = ["placeholder"], F = { class: "tpl:mb-4 tpl:last:mb-0" }, I = { class: "tpl:mb-1.5 tpl:block tpl:text-xs tpl:font-medium tpl:tracking-wide tpl:text-[var(--tpl-text-muted)] tpl:uppercase" }, L = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-t tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:px-5 tpl:py-4" }, R = { class: "tpl:ml-auto tpl:flex tpl:gap-2" }, z = /* @__PURE__ */ v({
	__name: "RichTextLinkDialog",
	props: /*@__PURE__*/ e({
		visible: { type: Boolean },
		isEditingLink: { type: Boolean }
	}, {
		linkUrl: { required: !0 },
		linkUrlModifiers: {},
		linkColor: { default: "" },
		linkColorModifiers: {},
		dialogRef: { required: !0 },
		dialogRefModifiers: {}
	}),
	emits: /*@__PURE__*/ e([
		"close",
		"insert",
		"remove",
		"keydown"
	], [
		"update:linkUrl",
		"update:linkColor",
		"update:dialogRef"
	]),
	setup(e, { emit: n }) {
		let _ = i(e, "linkUrl"), v = i(e, "linkColor"), z = i(e, "dialogRef"), B = n, V = a(x, null), H = a(b, null), U = w(), W = a(S, null), G = c(() => W?.content.value.settings.linkColor || "#2c85de"), { t: K } = C();
		return (n, i) => d(U) ? (r(), p(s, {
			key: 0,
			to: d(U)
		}, [e.visible ? (r(), l("div", {
			key: 0,
			"data-tpl-theme": d(H),
			class: "tpl tpl-link-dialog tpl:fixed tpl:inset-0 tpl:z-modal tpl:flex tpl:items-center tpl:justify-center",
			style: g(d(V)),
			onClick: i[7] ||= f((e) => B("close"), ["self"])
		}, [h("div", {
			ref: (e) => z.value = e,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "tpl-link-dialog-title",
			class: "tpl:w-[400px] tpl:overflow-hidden tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:shadow-lg"
		}, [
			h("div", O, [h("h4", k, o(e.isEditingLink ? d(K).linkDialog.editLink : d(K).linkDialog.insertLink), 1), h("button", {
				type: "button",
				"aria-label": d(K).linkDialog.cancel,
				class: "tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:border-none tpl:bg-transparent tpl:p-0 tpl:text-[var(--tpl-text-muted)] tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
				onClick: i[0] ||= (e) => B("close")
			}, [y(d(T), {
				size: 16,
				"stroke-width": 2
			})], 8, A)]),
			h("div", j, [h("div", M, [h("label", N, o(d(K).linkDialog.urlLabel), 1), t(h("input", {
				id: "tpl-link-dialog-url",
				"onUpdate:modelValue": i[1] ||= (e) => _.value = e,
				type: "url",
				class: "tpl:w-full tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2.5 tpl:text-sm tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:outline-none tpl:placeholder:text-[var(--tpl-text-dim)] tpl:focus:border-[var(--tpl-primary)] tpl:focus:shadow-[0_0_0_3px_var(--tpl-primary-light)]",
				placeholder: d(K).linkDialog.urlPlaceholder,
				autofocus: "",
				onKeydown: i[2] ||= (e) => B("keydown", e)
			}, null, 40, P), [[m, _.value]])]), h("div", F, [h("label", I, o(d(K).linkDialog.colorLabel), 1), y(E, {
				"model-value": v.value,
				"seed-color": G.value,
				"onUpdate:modelValue": i[3] ||= (e) => v.value = e
			}, null, 8, ["model-value", "seed-color"])])]),
			h("div", L, [e.isEditingLink ? (r(), l("button", {
				key: 0,
				type: "button",
				class: "tpl:inline-flex tpl:cursor-pointer tpl:items-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-danger)] tpl:bg-transparent tpl:px-4 tpl:py-2 tpl:text-[13px] tpl:font-medium tpl:text-[var(--tpl-danger)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-danger-light)]",
				onClick: i[4] ||= (e) => B("remove")
			}, o(d(K).linkDialog.removeLink), 1)) : u("", !0), h("div", R, [h("button", {
				type: "button",
				class: "tpl:inline-flex tpl:cursor-pointer tpl:items-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-transparent tpl:px-4 tpl:py-2 tpl:text-[13px] tpl:font-medium tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
				onClick: i[5] ||= (e) => B("close")
			}, o(d(K).linkDialog.cancel), 1), h("button", {
				type: "button",
				class: "tpl:inline-flex tpl:cursor-pointer tpl:items-center tpl:rounded-md tpl:border-none tpl:bg-[var(--tpl-primary)] tpl:px-4 tpl:py-2 tpl:text-[13px] tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-primary-hover)] tpl:text-[var(--tpl-bg)]",
				onClick: i[6] ||= (e) => B("insert")
			}, o(e.isEditingLink ? d(K).linkDialog.updateLink : d(K).linkDialog.insertLink), 1)])])
		], 512)], 12, D)) : u("", !0)], 8, ["to"])) : u("", !0);
	}
}), B = {
	key: 0,
	class: "tpl-text-editable tpl:min-h-[1.5em] tpl:rounded tpl:border tpl:border-dashed tpl:border-[var(--tpl-primary)] tpl:p-2"
}, V = { class: "tpl:animate-pulse tpl:text-[var(--tpl-text-dim)]" }, H = {
	key: 1,
	class: "tpl-text-editable tpl:min-h-[1.5em] tpl:rounded tpl:border tpl:border-dashed tpl:p-2 tpl:text-center tpl:text-xs tpl:border-[var(--tpl-danger)] tpl:text-[var(--tpl-text-muted)]"
}, U = /* @__PURE__ */ v({
	__name: "RichTextEditorContent",
	props: {
		editor: {},
		editorContent: {},
		isLoading: { type: Boolean },
		initError: {}
	},
	emits: ["retry"],
	setup(e, { emit: t }) {
		let i = t, { t: a } = C();
		return (t, s) => e.isLoading ? (r(), l("div", B, [h("div", V, o(d(a).errors.editorLoading), 1)])) : e.initError ? (r(), l("div", H, [_(o(d(a).errors.editorLoadFailed) + " ", 1), h("button", {
			class: "tpl:ml-1 tpl:cursor-pointer tpl:border-none tpl:bg-transparent tpl:p-0 tpl:underline tpl:text-[var(--tpl-primary)]",
			onClick: s[0] ||= (e) => i("retry")
		}, o(d(a).errors.retry), 1)])) : e.editorContent && e.editor ? (r(), p(n(e.editorContent), {
			key: 2,
			editor: e.editor,
			class: "tpl-text-editable tpl:min-h-[1.5em] tpl:rounded tpl:border tpl:border-dashed tpl:border-[var(--tpl-primary)] tpl:p-2"
		}, null, 8, ["editor"])) : u("", !0);
	}
});
//#endregion
export { z as n, U as t };

//# sourceMappingURL=RichTextEditorContent-BAriGldd.js.map