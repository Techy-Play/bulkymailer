import { K as e, L as t, M as n, P as r, T as i, Z as a, c as o, ct as s, d as c, f as l, g as u, h as d, it as f, l as p, m, ot as h, p as g, st as _, u as v, v as y, x as b, y as x } from "./draggable-BRF_Q_jB.js";
import { D as S, E as C, S as w, x as T } from "./useEditorCore-CTYH6u4r.js";
import { t as E } from "./dist-BLF-S9_A.js";
import { G as D, O, T as k, U as ee, V as te, g as ne, v as A } from "./keys-CZOBuCQd.js";
import { t as j } from "./useI18n-aRMtgYRj.js";
import { n as M } from "./usePopoverPosition-Dm1jv3y5.js";
import { D as N, F as re, Rt as ie, S as ae, Vt as oe, _ as se, at as ce, dt as le, g as ue, h as de, l as fe, lt as pe, m as me, ot as he, st as ge, x as _e, y as ve, z as ye } from "./icons-DN008liP.js";
import { t as P } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as be, o as xe, r as Se, s as Ce, t as F } from "./ColorPicker-yxvrro60.js";
import { n as I, t as L } from "./RichTextEditorContent-BAriGldd.js";
//#region src/components/blocks/EmojiPickerDropdown.vue?vue&type=script&setup=true&lang.ts
var R = [
	"aria-label",
	"title",
	"aria-expanded"
], z = ["aria-label"], B = { class: "tpl:mb-1.5 tpl:text-[10px] tpl:font-medium tpl:tracking-wide tpl:text-[var(--tpl-text-muted)] tpl:uppercase" }, V = { class: "tpl:grid tpl:grid-cols-10 tpl:gap-0.5" }, H = ["aria-label", "onClick"], we = /* @__PURE__ */ b({
	__name: "EmojiPickerDropdown",
	emits: ["insert"],
	setup(e, { emit: t }) {
		let i = t, { categories: c, isOpen: m, toggle: _, close: y } = C(), { t: b, format: w } = j(), T = a(null), D = a(null), O = l(() => m.value);
		S(T, O), E(D, () => {
			m.value && y();
		});
		function k(e) {
			i("insert", e), y();
		}
		return (e, t) => (n(), u("div", {
			ref_key: "rootRef",
			ref: D,
			class: "tpl:relative"
		}, [g("button", {
			type: "button",
			class: h(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": f(m) }]),
			"aria-label": f(b).paragraphEditor.insertEmoji,
			title: f(b).paragraphEditor.insertEmoji,
			"aria-expanded": f(m),
			"aria-haspopup": "dialog",
			"aria-controls": "tpl-emoji-picker",
			onClick: t[0] ||= (...e) => f(_) && f(_)(...e)
		}, [x(f(N), {
			size: 16,
			"stroke-width": 2
		})], 10, R), f(m) ? (n(), u("div", {
			key: 0,
			id: "tpl-emoji-picker",
			ref_key: "pickerRef",
			ref: T,
			role: "dialog",
			"aria-modal": "false",
			"aria-label": f(b).paragraphEditor.insertEmoji,
			tabindex: "-1",
			class: "tpl-emoji-picker tpl:absolute tpl:top-full tpl:left-0 tpl:z-10 tpl:mt-2 tpl:w-72 tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-2 tpl:shadow-lg",
			onKeydown: t[1] ||= o(p((...e) => f(y) && f(y)(...e), ["stop", "prevent"]), ["esc"])
		}, [(n(!0), u(v, null, r(f(c), (e) => (n(), u("div", {
			key: e.key,
			class: "tpl:mb-2 tpl:last:mb-0"
		}, [g("div", B, s(f(b).emoji[e.key]), 1), g("div", V, [(n(!0), u(v, null, r(e.emojis, (e) => (n(), u("button", {
			key: e,
			type: "button",
			"aria-label": f(w)(f(b).paragraphEditor.emojiItemLabel, { emoji: e }),
			class: "tpl:flex tpl:size-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:border-none tpl:bg-transparent tpl:text-base tpl:transition-all tpl:duration-100 tpl:hover:scale-125 tpl:hover:bg-[var(--tpl-bg-active)]",
			onClick: (t) => k(e)
		}, s(e), 9, H))), 128))])]))), 128))], 40, z)) : d("", !0)], 512));
	}
}), U = [
	"aria-label",
	"title",
	"aria-pressed"
], W = /* @__PURE__ */ b({
	__name: "ToolbarIconButton",
	props: {
		icon: {},
		label: {},
		active: { type: Boolean },
		strokeWidth: {},
		size: {}
	},
	setup(e) {
		return (r, i) => (n(), u("button", {
			type: "button",
			class: h(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": e.active }]),
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.active ? "true" : "false"
		}, [(n(), m(t(e.icon), {
			size: e.size ?? 16,
			"stroke-width": e.strokeWidth ?? 2
		}, null, 8, ["size", "stroke-width"]))], 10, U));
	}
}), G = {}, K = {
	class: "tpl:mx-1 tpl:h-6 tpl:w-px tpl:bg-[var(--tpl-border)]",
	"aria-hidden": "true"
};
function q(e, t) {
	return n(), u("span", K);
}
var J = /*#__PURE__*/ P(G, [["render", q]]), Y = [
	"value",
	"aria-label",
	"title"
], X = { value: "" }, Te = ["value"], Z = /* @__PURE__ */ b({
	__name: "ToolbarSelect",
	props: {
		modelValue: {},
		options: {},
		label: {},
		placeholder: {},
		widthClass: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let i = t;
		function a(e) {
			i("update:modelValue", e.target.value);
		}
		function o(e) {
			return typeof e == "string" ? e : e.value;
		}
		function c(e) {
			return typeof e == "string" ? e : e.label;
		}
		return (t, i) => (n(), u("select", {
			class: h(["tpl:h-8 tpl:cursor-pointer tpl:rounded tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-2 tpl:text-xs tpl:text-[var(--tpl-text)] tpl:outline-none", e.widthClass ?? "tpl:w-20"]),
			value: e.modelValue,
			"aria-label": e.label,
			title: e.label,
			onChange: a
		}, [g("option", X, s(e.placeholder ?? ""), 1), (n(!0), u(v, null, r(e.options, (e) => (n(), u("option", {
			key: o(e),
			value: o(e)
		}, s(c(e)), 9, Te))), 128))], 42, Y));
	}
});
//#endregion
//#region src/utils/richTextColor.ts
function Q(e, t) {
	return e || t || "#000000";
}
//#endregion
//#region src/components/blocks/ParagraphToolbar.vue?vue&type=script&setup=true&lang.ts
var Ee = ["data-tpl-theme", "aria-label"], De = { class: "tpl:flex tpl:items-center tpl:gap-1" }, Oe = { class: "tpl:flex tpl:items-center tpl:gap-1" }, ke = ["aria-label", "title"], Ae = ["aria-label", "title"], $ = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:gap-2 tpl:px-2 tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, je = /* @__PURE__ */ b({
	__name: "ParagraphToolbar",
	props: {
		editor: {},
		toolbarPosition: {},
		isLoading: { type: Boolean },
		canRequestMergeTag: { type: Boolean },
		canInsertLogicTag: { type: Boolean }
	},
	emits: [
		"open-link-dialog",
		"add-merge-tag",
		"add-logic-tag"
	],
	setup(e, { emit: t }) {
		let r = e, a = t, o = i(te, null), p = i(ee, null), h = D(A, "ParagraphToolbar"), b = M(), S = i(O, null), C = i(k, null), w = i(ne, null), T = l(() => (S?.isOpen.value ?? !1) || (C?.isOpen.value ?? !1)), { t: E } = j(), N = h.fonts;
		function P(e) {
			r.editor?.chain().focus().insertContent(e).run();
		}
		function I(e) {
			return r.editor?.getAttributes("textStyle")[e] || "";
		}
		function L(e) {
			let t = r.editor?.chain().focus();
			e ? t?.setFontFamily(e).run() : t?.unsetFontFamily().run();
		}
		function R(e) {
			let t = r.editor?.chain().focus();
			e ? t?.setFontSize(e).run() : t?.unsetFontSize().run();
		}
		function z() {
			return r.editor?.isActive("link") ?? !1;
		}
		function B() {
			return r.editor?.getAttributes("link").color || "";
		}
		function V(e) {
			let t = r.editor?.chain().focus();
			t && (z() ? (t.extendMarkRange("link").updateAttributes("link", { color: e || null }), e && t.unsetColor(), t.run()) : e ? t.setColor(e).updateAttributes("link", { color: e }).run() : t.unsetColor().run());
		}
		function H() {
			let e = w?.content.value.settings;
			return z() ? Q(B(), e?.linkColor || e?.textColor) : Q(I("color"), e?.textColor);
		}
		function U() {
			return z() ? B() : I("color");
		}
		function G() {
			return r.editor?.getAttributes("paragraph").lineHeight || "";
		}
		function K(e) {
			let t = r.editor?.chain().focus();
			e ? t?.setLineHeight(e).run() : t?.unsetLineHeight().run();
		}
		function q(e) {
			let t = r.editor?.chain().focus();
			e && e !== "normal" ? t?.setLetterSpacing(e).run() : t?.unsetLetterSpacing().run();
		}
		function Y() {
			return r.editor?.getAttributes("highlight").color || "";
		}
		function X(e) {
			let t = r.editor?.chain().focus();
			e ? t?.setHighlight({ color: e }).run() : t?.unsetHighlight().run();
		}
		return (t, r) => f(b) && !T.value ? (n(), m(c, {
			key: 0,
			to: f(b)
		}, [g("div", {
			"data-tpl-theme": f(p),
			role: "toolbar",
			"aria-label": f(E).paragraphEditor.toolbar,
			class: "tpl tpl-text-toolbar tpl:absolute tpl:z-popover tpl:flex tpl:gap-1 tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:shadow-lg",
			style: _({
				...f(o),
				top: `${e.toolbarPosition.top}px`,
				left: `${e.toolbarPosition.left}px`,
				transform: "translateY(-100%)",
				flexDirection: "column"
			})
		}, [!e.isLoading && e.editor ? (n(), u(v, { key: 0 }, [g("div", De, [
			x(Z, {
				"model-value": I("fontFamily"),
				options: f(N),
				label: f(E).paragraphEditor.fontFamily,
				placeholder: f(E).paragraphEditor.defaultFont,
				"width-class": "tpl:w-32",
				"onUpdate:modelValue": L
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"placeholder"
			]),
			x(Z, {
				"model-value": I("fontSize"),
				options: f(xe),
				label: f(E).paragraphEditor.fontSize,
				placeholder: f(E).paragraphEditor.defaultSize,
				"width-class": "tpl:w-20",
				"onUpdate:modelValue": R
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"placeholder"
			]),
			x(J),
			x(F, {
				"swatch-only": "",
				size: "sm",
				"data-testid": "text-color-picker",
				"model-value": U(),
				"seed-color": H(),
				"aria-label": f(E).paragraphEditor.textColor,
				"onUpdate:modelValue": V
			}, null, 8, [
				"model-value",
				"seed-color",
				"aria-label"
			]),
			x(F, {
				"swatch-only": "",
				size: "sm",
				"data-testid": "highlight-color-picker",
				"model-value": Y(),
				"seed-color": f(Se),
				"aria-label": f(E).paragraphEditor.highlightColor,
				"onUpdate:modelValue": X
			}, null, 8, [
				"model-value",
				"seed-color",
				"aria-label"
			]),
			x(J),
			x(W, {
				icon: f(oe),
				label: f(E).paragraphEditor.bold,
				active: e.editor.isActive("bold"),
				"stroke-width": 2.5,
				onClick: r[0] ||= (t) => e.editor.chain().focus().toggleBold().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(le),
				label: f(E).paragraphEditor.italic,
				active: e.editor.isActive("italic"),
				onClick: r[1] ||= (t) => e.editor.chain().focus().toggleItalic().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(fe),
				label: f(E).paragraphEditor.underline,
				active: e.editor.isActive("underline"),
				onClick: r[2] ||= (t) => e.editor.chain().focus().toggleUnderline().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(ae),
				label: f(E).paragraphEditor.strikethrough,
				active: e.editor.isActive("strike"),
				onClick: r[3] ||= (t) => e.editor.chain().focus().toggleStrike().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(J),
			x(W, {
				icon: f(_e),
				label: f(E).paragraphEditor.subscript,
				active: e.editor.isActive("subscript"),
				onClick: r[4] ||= (t) => e.editor.chain().focus().toggleSubscript().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(ve),
				label: f(E).paragraphEditor.superscript,
				active: e.editor.isActive("superscript"),
				onClick: r[5] ||= (t) => e.editor.chain().focus().toggleSuperscript().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(J),
			x(W, {
				icon: f(pe),
				label: f(E).paragraphEditor.addLink,
				active: e.editor.isActive("link"),
				onClick: r[6] ||= (e) => a("open-link-dialog")
			}, null, 8, [
				"icon",
				"label",
				"active"
			])
		]), g("div", Oe, [
			x(W, {
				icon: f(he),
				label: f(E).paragraphEditor.bulletList,
				active: e.editor.isActive("bulletList"),
				onClick: r[7] ||= (t) => e.editor.chain().focus().toggleBulletList().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(ge),
				label: f(E).paragraphEditor.numberedList,
				active: e.editor.isActive("orderedList"),
				onClick: r[8] ||= (t) => e.editor.chain().focus().toggleOrderedList().run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(J),
			x(W, {
				icon: f(me),
				label: f(E).paragraphEditor.alignLeft,
				active: e.editor.isActive({ textAlign: "left" }),
				onClick: r[9] ||= (t) => e.editor.chain().focus().setTextAlign("left").run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(se),
				label: f(E).paragraphEditor.alignCenter,
				active: e.editor.isActive({ textAlign: "center" }),
				onClick: r[10] ||= (t) => e.editor.chain().focus().setTextAlign("center").run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(ue),
				label: f(E).paragraphEditor.alignRight,
				active: e.editor.isActive({ textAlign: "right" }),
				onClick: r[11] ||= (t) => e.editor.chain().focus().setTextAlign("right").run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(W, {
				icon: f(de),
				label: f(E).paragraphEditor.alignJustify,
				active: e.editor.isActive({ textAlign: "justify" }),
				onClick: r[12] ||= (t) => e.editor.chain().focus().setTextAlign("justify").run()
			}, null, 8, [
				"icon",
				"label",
				"active"
			]),
			x(J),
			x(Z, {
				"model-value": G(),
				options: f(be),
				label: f(E).paragraphEditor.lineHeight,
				placeholder: "LH",
				"width-class": "tpl:w-16",
				"onUpdate:modelValue": K
			}, null, 8, [
				"model-value",
				"options",
				"label"
			]),
			x(Z, {
				"model-value": I("letterSpacing"),
				options: f(Ce),
				label: f(E).paragraphEditor.letterSpacing,
				placeholder: "LS",
				"width-class": "tpl:w-20",
				"onUpdate:modelValue": q
			}, null, 8, [
				"model-value",
				"options",
				"label"
			]),
			x(J),
			x(W, {
				icon: f(ye),
				label: f(E).paragraphEditor.clearFormatting,
				onClick: r[13] ||= (t) => e.editor.chain().focus().clearNodes().unsetAllMarks().run()
			}, null, 8, ["icon", "label"]),
			x(J),
			x(we, { onInsert: P }),
			e.canRequestMergeTag ? (n(), u(v, { key: 0 }, [x(J), g("button", {
				type: "button",
				class: "tpl:flex tpl:h-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)]",
				"aria-label": f(E).mergeTag.insert,
				title: f(E).mergeTag.insert,
				onClick: r[14] ||= (e) => a("add-merge-tag")
			}, [x(f(re), {
				size: 16,
				"stroke-width": 2
			}), y(" " + s(f(E).mergeTag.insertShort), 1)], 8, ke)], 64)) : d("", !0),
			e.canInsertLogicTag ? (n(), u(v, { key: 1 }, [x(J), g("button", {
				type: "button",
				class: "tpl:flex tpl:h-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)]",
				"aria-label": f(E).logicTag.insert,
				title: f(E).logicTag.insert,
				"data-testid": "insert-logic-button",
				onClick: r[15] ||= (e) => a("add-logic-tag")
			}, [x(f(ie), {
				size: 16,
				"stroke-width": 2
			}), y(" " + s(f(E).logicTag.insertShort), 1)], 8, Ae)], 64)) : d("", !0)
		])], 64)) : (n(), u("div", $, [x(f(ce), {
			class: "tpl-spinner",
			size: 14,
			"stroke-width": 2
		}), y(" " + s(f(E).errors.editorLoading), 1)]))], 12, Ee)], 8, ["to"])) : d("", !0);
	}
}), Me = { class: "tpl-text-editor-wrapper tpl:relative" }, Ne = /* @__PURE__ */ b({
	__name: "ParagraphEditor",
	props: {
		block: {},
		toolbarPosition: {}
	},
	emits: ["done"],
	setup(t, { emit: r }) {
		let i = t, a = r, o = M(), { editor: s, EditorContent: c, isLoading: l, initError: d, retry: p, showLinkDialog: m, linkUrl: h, linkColor: g, linkDialogRef: _, canRequestMergeTag: v, canInsertLogicTag: y, openLinkDialog: b, insertLink: S, removeLink: C, closeLinkDialog: E, handleLinkKeydown: D, handleAddMergeTag: O, handleAddLogicTag: k } = T({
			blockId: () => i.block.id,
			blockContent: () => i.block.content,
			onDone: () => a("done"),
			editorName: "ParagraphEditor",
			async loadExtensions({ mergeTags: e, syntax: t, triggerChar: n, autocompleteEnabled: r, suggestionEmptyText: i }) {
				let [{ Editor: a, EditorContent: s }, { default: c }, { default: l }, { default: u }, { default: d }, { default: f }, { default: p }, { TextStyle: m }, { default: h }, { default: g }, { default: _ }, { MergeTagNode: v, MergeTagSuggestion: y, LogicMergeTagNode: b, FontSize: x, LineHeight: S, LetterSpacing: C }] = await Promise.all([
					import("./tiptap-CgwK_fKJ.js").then((e) => e.r),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.i),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.l),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.a),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.c),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.s),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.o),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.p),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.f),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.d),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.u),
					import("./extensions-yNQlgLNE.js")
				]);
				return {
					TiptapEditor: a,
					EC: s,
					extensions: [
						c.configure({
							heading: !1,
							codeBlock: !1,
							blockquote: !1,
							horizontalRule: !1,
							link: !1,
							underline: !1
						}),
						u,
						d,
						f,
						w(l).configure({
							openOnClick: !1,
							HTMLAttributes: {
								target: "_blank",
								rel: "noopener noreferrer"
							}
						}),
						p.configure({ types: ["paragraph"] }),
						m,
						h,
						g,
						_.configure({ multicolor: !0 }),
						x,
						S,
						C,
						v.configure({
							mergeTags: e,
							syntax: t
						}),
						b.configure({ syntax: t }),
						...r && n && e.length > 0 ? [y.configure({
							mergeTags: e,
							char: n,
							emptyText: i,
							popoverRoot: o
						})] : []
					]
				};
			}
		});
		return (r, i) => (n(), u("div", Me, [
			x(je, {
				editor: f(s),
				"toolbar-position": t.toolbarPosition,
				"is-loading": f(l),
				"can-request-merge-tag": f(v),
				"can-insert-logic-tag": f(y),
				onOpenLinkDialog: f(b),
				onAddMergeTag: f(O),
				onAddLogicTag: f(k)
			}, null, 8, [
				"editor",
				"toolbar-position",
				"is-loading",
				"can-request-merge-tag",
				"can-insert-logic-tag",
				"onOpenLinkDialog",
				"onAddMergeTag",
				"onAddLogicTag"
			]),
			x(L, {
				editor: f(s),
				"editor-content": f(c),
				"is-loading": f(l),
				"init-error": f(d),
				onRetry: f(p)
			}, null, 8, [
				"editor",
				"editor-content",
				"is-loading",
				"init-error",
				"onRetry"
			]),
			x(I, {
				visible: f(m),
				"is-editing-link": f(s)?.isActive("link") ?? !1,
				"dialog-ref": f(_),
				"onUpdate:dialogRef": i[0] ||= (t) => e(_) ? _.value = t : null,
				"link-url": f(h),
				"onUpdate:linkUrl": i[1] ||= (t) => e(h) ? h.value = t : null,
				"link-color": f(g),
				"onUpdate:linkColor": i[2] ||= (t) => e(g) ? g.value = t : null,
				onClose: f(E),
				onInsert: f(S),
				onRemove: f(C),
				onKeydown: f(D)
			}, null, 8, [
				"visible",
				"is-editing-link",
				"dialog-ref",
				"link-url",
				"link-color",
				"onClose",
				"onInsert",
				"onRemove",
				"onKeydown"
			])
		]));
	}
});
//#endregion
export { Ne as default };

//# sourceMappingURL=ParagraphEditor-o4hs9mgy.js.map