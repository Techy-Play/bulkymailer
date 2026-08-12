import { C as e, Dt as t, N as n, O as r, Ot as i, P as a, _ as o, c as s, d as c, h as l, i as u, l as d, m as f, nt as p, s as m, u as h, x as g, z as _ } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as v, c as y } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { n as b } from "./usePopoverPosition-D93u-EZm.js";
import { U as x, V as S, g as C } from "./keys-BI6VSUh4.js";
import { t as w } from "./useI18n-BkHfCWC6.js";
import { t as T } from "./createLucideIcon-D7GKhya2.js";
import { t as E } from "./x-B4WnJVRx.js";
import { t as D } from "./ColorPicker-VPq4ASC8.js";
var O = T("bold", [["path", {
	d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
	key: "mg9rjx"
}]]), k = T("italic", [
	["line", {
		x1: "19",
		x2: "10",
		y1: "4",
		y2: "4",
		key: "15jd3p"
	}],
	["line", {
		x1: "14",
		x2: "5",
		y1: "20",
		y2: "20",
		key: "bu0au3"
	}],
	["line", {
		x1: "15",
		x2: "9",
		y1: "4",
		y2: "20",
		key: "uljnxc"
	}]
]), A = T("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), j = ["data-tpl-theme"], M = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-5 tpl:py-4" }, N = {
	id: "tpl-link-dialog-title",
	class: "tpl:m-0 tpl:text-sm tpl:font-semibold tpl:text-[var(--tpl-text)]"
}, P = ["aria-label"], F = { class: "tpl:p-5" }, I = { class: "tpl:mb-4 tpl:last:mb-0" }, L = {
	for: "tpl-link-dialog-url",
	class: "tpl:mb-1.5 tpl:block tpl:text-xs tpl:font-medium tpl:tracking-wide tpl:text-[var(--tpl-text-muted)] tpl:uppercase"
}, R = ["placeholder"], z = { class: "tpl:mb-4 tpl:last:mb-0" }, B = { class: "tpl:mb-1.5 tpl:block tpl:text-xs tpl:font-medium tpl:tracking-wide tpl:text-[var(--tpl-text-muted)] tpl:uppercase" }, V = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-t tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:px-5 tpl:py-4" }, H = { class: "tpl:ml-auto tpl:flex tpl:gap-2" }, U = /* @__PURE__ */ o({
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
		let o = a(e, "linkUrl"), f = a(e, "linkColor"), T = a(e, "dialogRef"), O = n, k = g(S, null), A = g(x, null), U = b(), W = g(C, null), G = m(() => W?.content.value.settings.linkColor || "#2c85de"), { t: K } = w();
		return (n, a) => p(U) ? (r(), d(u, {
			key: 0,
			to: p(U)
		}, [e.visible ? (r(), c("div", {
			key: 0,
			"data-tpl-theme": p(A),
			class: "tpl tpl-link-dialog tpl:fixed tpl:inset-0 tpl:z-modal tpl:flex tpl:items-center tpl:justify-center",
			style: t(p(k)),
			onClick: a[7] ||= y((e) => O("close"), ["self"])
		}, [s("div", {
			ref: (e) => T.value = e,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "tpl-link-dialog-title",
			class: "tpl:w-[400px] tpl:overflow-hidden tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:shadow-lg"
		}, [
			s("div", M, [s("h4", N, i(e.isEditingLink ? p(K).linkDialog.editLink : p(K).linkDialog.insertLink), 1), s("button", {
				type: "button",
				"aria-label": p(K).linkDialog.cancel,
				class: "tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:border-none tpl:bg-transparent tpl:p-0 tpl:text-[var(--tpl-text-muted)] tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
				onClick: a[0] ||= (e) => O("close")
			}, [l(p(E), {
				size: 16,
				"stroke-width": 2
			})], 8, P)]),
			s("div", F, [s("div", I, [s("label", L, i(p(K).linkDialog.urlLabel), 1), _(s("input", {
				id: "tpl-link-dialog-url",
				"onUpdate:modelValue": a[1] ||= (e) => o.value = e,
				type: "url",
				class: "tpl:w-full tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2.5 tpl:text-sm tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:outline-none tpl:placeholder:text-[var(--tpl-text-dim)] tpl:focus:border-[var(--tpl-primary)] tpl:focus:shadow-[0_0_0_3px_var(--tpl-primary-light)]",
				placeholder: p(K).linkDialog.urlPlaceholder,
				autofocus: "",
				onKeydown: a[2] ||= (e) => O("keydown", e)
			}, null, 40, R), [[v, o.value]])]), s("div", z, [s("label", B, i(p(K).linkDialog.colorLabel), 1), l(D, {
				"model-value": f.value,
				"seed-color": G.value,
				"onUpdate:modelValue": a[3] ||= (e) => f.value = e
			}, null, 8, ["model-value", "seed-color"])])]),
			s("div", V, [e.isEditingLink ? (r(), c("button", {
				key: 0,
				type: "button",
				class: "tpl:inline-flex tpl:cursor-pointer tpl:items-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-danger)] tpl:bg-transparent tpl:px-4 tpl:py-2 tpl:text-[13px] tpl:font-medium tpl:text-[var(--tpl-danger)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-danger-light)]",
				onClick: a[4] ||= (e) => O("remove")
			}, i(p(K).linkDialog.removeLink), 1)) : h("", !0), s("div", H, [s("button", {
				type: "button",
				class: "tpl:inline-flex tpl:cursor-pointer tpl:items-center tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-transparent tpl:px-4 tpl:py-2 tpl:text-[13px] tpl:font-medium tpl:text-[var(--tpl-text-muted)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-hover)] tpl:hover:text-[var(--tpl-text)]",
				onClick: a[5] ||= (e) => O("close")
			}, i(p(K).linkDialog.cancel), 1), s("button", {
				type: "button",
				class: "tpl:inline-flex tpl:cursor-pointer tpl:items-center tpl:rounded-md tpl:border-none tpl:bg-[var(--tpl-primary)] tpl:px-4 tpl:py-2 tpl:text-[13px] tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-primary-hover)] tpl:text-[var(--tpl-bg)]",
				onClick: a[6] ||= (e) => O("insert")
			}, i(e.isEditingLink ? p(K).linkDialog.updateLink : p(K).linkDialog.insertLink), 1)])])
		], 512)], 12, j)) : h("", !0)], 8, ["to"])) : h("", !0);
	}
}), W = {
	key: 0,
	class: "tpl-text-editable tpl:min-h-[1.5em] tpl:rounded tpl:border tpl:border-dashed tpl:border-[var(--tpl-primary)] tpl:p-2"
}, G = { class: "tpl:animate-pulse tpl:text-[var(--tpl-text-dim)]" }, K = {
	key: 1,
	class: "tpl-text-editable tpl:min-h-[1.5em] tpl:rounded tpl:border tpl:border-dashed tpl:p-2 tpl:text-center tpl:text-xs tpl:border-[var(--tpl-danger)] tpl:text-[var(--tpl-text-muted)]"
}, q = /* @__PURE__ */ o({
	__name: "RichTextEditorContent",
	props: {
		editor: {},
		editorContent: {},
		isLoading: { type: Boolean },
		initError: {}
	},
	emits: ["retry"],
	setup(e, { emit: t }) {
		let a = t, { t: o } = w();
		return (t, l) => e.isLoading ? (r(), c("div", W, [s("div", G, i(p(o).errors.editorLoading), 1)])) : e.initError ? (r(), c("div", K, [f(i(p(o).errors.editorLoadFailed) + " ", 1), s("button", {
			class: "tpl:ml-1 tpl:cursor-pointer tpl:border-none tpl:bg-transparent tpl:p-0 tpl:underline tpl:text-[var(--tpl-primary)]",
			onClick: l[0] ||= (e) => a("retry")
		}, i(p(o).errors.retry), 1)])) : e.editorContent && e.editor ? (r(), d(n(e.editorContent), {
			key: 2,
			editor: e.editor,
			class: "tpl-text-editable tpl:min-h-[1.5em] tpl:rounded tpl:border tpl:border-dashed tpl:border-[var(--tpl-primary)] tpl:p-2"
		}, null, 8, ["editor"])) : h("", !0);
	}
});
//#endregion
export { O as a, k as i, U as n, A as r, q as t };
